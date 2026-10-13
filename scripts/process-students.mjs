#!/usr/bin/env node
// Validates the student photos referenced by src/data/reviews.ts.
//
// IMPORTANT: this script no longer crops or generates anything. The
// photos in public/students/ are produced outside this repo by a
// face-detection pipeline (C:\Users\u\prakruthi-assets\students-cropped\)
// and copied in as-is — do NOT regenerate them here with sharp's
// attention/entropy crop, which gives a visibly worse, non-face-aware
// result than the real face detection already used upstream.
//
// This just checks: every photo path reviews.ts points to exists in
// public/students/, is a 400x400 image, and is WebP.

import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const REPO_ROOT = path.resolve(import.meta.dirname, "..");
const REVIEWS_PATH = path.join(REPO_ROOT, "src", "data", "reviews.ts");

function extractPhotoPaths(source) {
  const matches = source.matchAll(/photo:\s*"([^"]+)"/g);
  return [...matches].map((m) => m[1]);
}

async function main() {
  const source = await readFile(REVIEWS_PATH, "utf8");
  const photoPaths = extractPhotoPaths(source);

  if (photoPaths.length === 0) {
    console.error("No photo paths found in reviews.ts — check the regex still matches the file's shape.");
    process.exit(1);
  }

  let failures = 0;
  for (const photoPath of photoPaths) {
    const relative = photoPath.replace(/^\//, "");
    const fullPath = path.join(REPO_ROOT, "public", relative);

    try {
      await stat(fullPath);
    } catch {
      console.error(`MISSING: ${photoPath} (expected at public/${relative})`);
      failures++;
      continue;
    }

    const meta = await sharp(fullPath).metadata();
    const ok = meta.width === 400 && meta.height === 400 && meta.format === "webp";
    if (!ok) {
      console.error(
        `BAD: ${photoPath} is ${meta.width}x${meta.height} ${meta.format} (expected 400x400 webp)`
      );
      failures++;
      continue;
    }

    console.log(`OK: ${photoPath} (400x400 webp)`);
  }

  console.log(`\n${photoPaths.length} photo(s) checked, ${failures} failure(s).`);
  if (failures > 0) process.exit(1);
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
