#!/usr/bin/env node
/**
 * Post-build prerender. Serves the freshly built dist/, visits every route in
 * ROUTE_META with headless Chromium, and writes the fully rendered HTML back to
 * dist/<route>/index.html.
 *
 * Why: the app is a client-rendered SPA, so without this step every crawler that
 * does not execute JavaScript — Bing, WhatsApp, Facebook, LinkedIn, GPTBot,
 * PerplexityBot — receives an empty <div id="root"> and no per-route metadata.
 * Googlebot does render JS, but only on a delayed second pass.
 *
 * The client hydrates this markup instead of re-rendering it (see src/main.tsx),
 * so it also removes a full render from the critical path on first paint.
 */
import { createServer } from "node:http";
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const source = readFileSync(join(root, "src/seo/routeMeta.ts"), "utf8");
const body = source.slice(source.indexOf("ROUTE_META"));
const routes = [...body.matchAll(/^\s{2}"(\/[^"]*)":/gm)].map((m) => m[1]);

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".woff": "font/woff", ".woff2": "font/woff2", ".otf": "font/otf",
  ".ttf": "font/ttf", ".mp4": "video/mp4", ".ico": "image/x-icon",
  ".xml": "application/xml", ".txt": "text/plain",
};

// Static file server with SPA fallback, mirroring staticwebapp.config.json.
const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  let file = join(dist, urlPath);
  if (!existsSync(file) || urlPath.endsWith("/")) file = join(dist, "index.html");
  if (!existsSync(file)) file = join(dist, "index.html");
  try {
    const data = readFileSync(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(500).end("error");
  }
});

const port = await new Promise((ok) => server.listen(0, () => ok(server.address().port)));
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// Components that render very large decorative DOM (the world map) check this flag
// and skip rendering, keeping the static HTML small. They mount normally in a real
// browser, and because they start hidden there too, hydration still matches.
await page.addInitScript(() => {
  window.__PRERENDER__ = true;
});

let written = 0;
const failures = [];

for (const route of routes) {
  try {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 45000 });
    // RouteSeo writes the title in an effect; wait for it to differ from the shell.
    await page.waitForFunction(() => document.querySelector("#root")?.children.length > 0, { timeout: 20000 });

    // Sections reveal themselves on scroll via IntersectionObserver. Walk the page
    // so every section has fired before the snapshot, otherwise the captured HTML
    // holds content still sitting at opacity:0.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 180));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 250));
    });
    await page.waitForTimeout(400);

    const html = await page.evaluate(() => {
      const rootEl = document.getElementById("root");
      if (rootEl) rootEl.setAttribute("data-prerendered", "true"); // informational only
      return "<!doctype html>\n" + document.documentElement.outerHTML;
    });

    const outDir = route === "/" ? dist : join(dist, route);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html);
    written++;
    console.log(`  prerendered ${route}`);
  } catch (err) {
    failures.push(`${route}: ${err.message.split("\n")[0]}`);
  }
}

await browser.close();
server.close();

if (failures.length) {
  console.error(`prerender: ${failures.length} route(s) FAILED:`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1); // never ship a partially prerendered build
}
console.log(`prerender: ${written}/${routes.length} routes written`);
