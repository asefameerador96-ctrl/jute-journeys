#!/usr/bin/env node
/**
 * One-off asset conversion: re-encodes every raster image under src/assets and
 * public/ to WebP, capping the long edge at MAX_EDGE.
 *
 * The gallery shipped as ~6 MB PNGs (167 MB of images in total), which dominated
 * Largest Contentful Paint on mobile. WebP at q82 gives visually identical output
 * at roughly 2-4% of the bytes.
 *
 * After conversion it rewrites the matching import paths in src/ so nothing has to
 * be updated by hand. Originals are deleted only after their WebP is written.
 */
import { readdirSync, statSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const MAX_EDGE = 1920;
const QUALITY = 82;
const CONVERTIBLE = new Set([".png", ".jpg", ".jpeg"]);
// public/ is deliberately excluded: favicon.png and og-image.png are referenced by
// absolute URL from index.html, and Facebook/WhatsApp do not reliably render WebP
// Open Graph images.
const SCAN_DIRS = ["src/assets"];
const CODE_DIRS = ["src"];
const CODE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".html"]);

function walk(dir) {
  const out = [];
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const images = SCAN_DIRS.flatMap(walk).filter((f) => CONVERTIBLE.has(extname(f).toLowerCase()));
if (!images.length) {
  console.log("optimize-images: nothing to convert");
  process.exit(0);
}

let before = 0;
let after = 0;
const renames = [];

for (const file of images) {
  const target = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const originalBytes = statSync(file).size;
  try {
    const img = sharp(file, { limitInputPixels: false });
    const meta = await img.metadata();
    const resized =
      meta.width > MAX_EDGE || meta.height > MAX_EDGE
        ? img.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
        : img;
    await resized.webp({ quality: QUALITY, effort: 5 }).toFile(target);
    const newBytes = statSync(target).size;
    before += originalBytes;
    after += newBytes;
    unlinkSync(file);
    renames.push(basename(file));
  } catch (err) {
    console.error(`  FAILED ${file}: ${err.message}`);
  }
}

// Rewrite references in source files (imports, url() in CSS, src= in HTML).
const codeFiles = CODE_DIRS.flatMap(walk).filter((f) => CODE_EXT.has(extname(f)));
let touched = 0;
for (const f of codeFiles) {
  const original = readFileSync(f, "utf8");
  let updated = original;
  for (const base of renames) {
    const webp = base.replace(/\.(png|jpe?g)$/i, ".webp");
    if (base !== webp && updated.includes(base)) {
      updated = updated.split(base).join(webp);
    }
  }
  if (updated !== original) {
    writeFileSync(f, updated);
    touched++;
  }
}

const mb = (n) => (n / 1048576).toFixed(1);
console.log(
  `optimize-images: ${renames.length} images ${mb(before)} MB -> ${mb(after)} MB ` +
    `(${(100 - (after / before) * 100).toFixed(1)}% smaller); updated ${touched} source files`
);
