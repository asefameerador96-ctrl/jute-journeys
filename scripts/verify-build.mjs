#!/usr/bin/env node
/**
 * Smoke-tests the built dist/ in a real browser: loads every prerendered route,
 * fails on any console error or hydration warning, and asserts that the map
 * (which is skipped during prerender) still appears for real visitors.
 */
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const source = readFileSync(join(root, "src/seo/routeMeta.ts"), "utf8");
const routes = [...source.slice(source.indexOf("ROUTE_META")).matchAll(/^\s{2}"(\/[^"]*)":/gm)].map((m) => m[1]);

const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff": "font/woff",
  ".woff2": "font/woff2", ".otf": "font/otf", ".ttf": "font/ttf", ".mp4": "video/mp4", ".ico": "image/x-icon",
  ".xml": "application/xml", ".txt": "text/plain" };

const server = createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = join(dist, p);
  // Serve the prerendered per-route file, mirroring Azure Static Web Apps.
  if (existsSync(join(file, "index.html"))) file = join(file, "index.html");
  if (!existsSync(file) || p.endsWith("/")) file = join(dist, p, "index.html");
  if (!existsSync(file)) file = join(dist, "index.html");
  try {
    res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  } catch { res.writeHead(500).end("err"); }
});
const port = await new Promise((ok) => server.listen(0, () => ok(server.address().port)));

const browser = await chromium.launch();
const problems = [];

for (const route of routes) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (m) => {
    const t = m.text();
    if (m.type() === "error" || /hydrat|did not match|Minified React error/i.test(t)) errors.push(t);
  });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

  await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1200);

  const title = await page.title();
  const textLen = (await page.evaluate(() => document.body.innerText.length)) || 0;
  if (textLen < 500) errors.push(`only ${textLen} chars of visible text after hydration`);

  if (route === "/") {
    const hasMap = await page.evaluate(() => !!document.querySelector(".rsm-svg"));
    if (!hasMap) errors.push("world map did not render for a real visitor");
  }

  // Ignore third-party font/CDN noise that does not affect the page.
  const real = errors.filter((e) => !/favicon|net::ERR_|Failed to load resource/i.test(e));
  if (real.length) problems.push({ route, errors: real });
  console.log(`  ${real.length ? "FAIL" : "ok  "} ${route}  "${title.slice(0, 60)}"  ${textLen} chars`);
  await page.close();
}

await browser.close();
server.close();

if (problems.length) {
  console.error("\nverify-build FAILED:");
  for (const p of problems) console.error(`  ${p.route}\n    ${p.errors.join("\n    ")}`);
  process.exit(1);
}
console.log(`\nverify-build: all ${routes.length} routes render cleanly`);
