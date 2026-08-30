#!/usr/bin/env node
/**
 * Generates public/sitemap.xml and public/robots.txt from the single source of
 * truth in src/seo/routeMeta.ts, so a new route can never be added without also
 * appearing in the sitemap. Run automatically before every build.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://www.shahagro.com";

const source = readFileSync(resolve(root, "src/seo/routeMeta.ts"), "utf8");
// Route keys are the quoted "/..." properties of the ROUTE_META object literal.
const body = source.slice(source.indexOf("ROUTE_META"));
const routes = [...body.matchAll(/^\s{2}"(\/[^"]*)":/gm)].map((m) => m[1]);

if (routes.length === 0) {
  console.error("generate-sitemap: no routes found in src/seo/routeMeta.ts");
  process.exit(1);
}

const lastmod = new Date().toISOString().slice(0, 10);
const priority = (r) => (r === "/" ? "1.0" : r.startsWith("/products/") ? "0.9" : "0.7");
const changefreq = (r) => (r === "/" ? "weekly" : "monthly");

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${SITE}${r === "/" ? "/" : r}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq(r)}</changefreq>
    <priority>${priority(r)}</priority>
  </url>`
  )
  .join("\n");

writeFileSync(
  resolve(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
);

writeFileSync(
  resolve(root, "public/robots.txt"),
  `User-agent: *
Allow: /

# Explicit allows for crawlers that read per-agent blocks first.
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

# AI crawlers — allowed, so the brand is citable in AI answers.
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
);

console.log(`generate-sitemap: wrote ${routes.length} URLs to public/sitemap.xml`);
