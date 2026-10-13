#!/usr/bin/env node
// Processes student photos from C:\Users\u\prakruthi-assets\students\
// (read-only, never modified) into 400x400 WebP thumbnails in
// public/students/. Two files for the same person (e.g. "Swathi
// peravali.jpeg" and "swathi peravali (2).jpeg") are deduped by a
// case/spacing/"(N)"-insensitive key, keeping whichever has more pixels.
// Crop uses sharp's attention strategy (face/subject-aware), not a plain
// center crop.

import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "C:\\Users\\u\\prakruthi-assets\\students";
const OUT_DIR = path.resolve("public/students");
const SIZE = 400;
const TARGET_BYTES = 30 * 1000;
const START_QUALITY = 75;
const MIN_QUALITY = 40;

function dedupeKey(nameNoExt) {
  return nameNoExt
    .replace(/\s*\(\d+\)\s*$/, "") // drop a trailing " (2)" etc.
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function titleCase(nameNoExt) {
  const base = nameNoExt.replace(/\s*\(\d+\)\s*$/, "").trim();
  return base
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const files = (await readdir(SRC_DIR)).filter((f) => /\.jpe?g$/i.test(f)).sort();

  // Gather metadata for every file first, so dedup can pick the higher-res one.
  const entries = [];
  for (const file of files) {
    const fullPath = path.join(SRC_DIR, file);
    const meta = await sharp(fullPath).metadata();
    const nameNoExt = file.replace(/\.jpe?g$/i, "");
    entries.push({
      file,
      fullPath,
      key: dedupeKey(nameNoExt),
      displayName: titleCase(nameNoExt),
      area: (meta.width ?? 0) * (meta.height ?? 0),
      width: meta.width,
      height: meta.height,
    });
  }

  const byKey = new Map();
  for (const e of entries) {
    const existing = byKey.get(e.key);
    if (!existing || e.area > existing.area) byKey.set(e.key, e);
  }
  const kept = [...byKey.values()].sort((a, b) => a.displayName.localeCompare(b.displayName));
  const skipped = entries.filter((e) => byKey.get(e.key) !== e);

  await mkdir(OUT_DIR, { recursive: true });

  const results = [];
  for (const e of kept) {
    const slug = slugify(e.displayName);
    const outputPath = path.join(OUT_DIR, `${slug}.webp`);

    let quality = START_QUALITY;
    let buffer;
    while (true) {
      buffer = await sharp(e.fullPath)
        .resize(SIZE, SIZE, { fit: "cover", position: sharp.strategy.attention })
        .webp({ quality })
        .toBuffer();
      if (buffer.length <= TARGET_BYTES || quality <= MIN_QUALITY) break;
      quality -= 10;
    }

    await writeFile(outputPath, buffer);
    results.push({ name: e.displayName, slug, file: e.file, bytes: buffer.length, quality });
    console.log(`${e.file} (${e.width}x${e.height}) -> students/${slug}.webp: q${quality}, ${buffer.length} bytes`);
  }

  console.log(`\nKept ${kept.length} students.`);
  if (skipped.length > 0) {
    console.log("Skipped as duplicates (lower resolution):");
    for (const s of skipped) console.log(`  - ${s.file} (${s.width}x${s.height}) — duplicate of "${byKey.get(s.key).file}"`);
  }
  console.log(`\nAny over ${TARGET_BYTES} bytes target: ${results.filter((r) => r.bytes > TARGET_BYTES).map((r) => r.slug).join(", ") || "none"}`);
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
