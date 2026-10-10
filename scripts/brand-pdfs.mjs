#!/usr/bin/env node
// Prepends a generated A4 branded cover page to a previous-year question
// paper PDF, and adds a small footer strip under every page (cover
// included). Original page content is embedded unchanged at 100% scale —
// nothing is drawn over it. The input file is never modified.
//
// CLI usage (derives title/date/shift from the file name):
//   node scripts/brand-pdfs.mjs <input.pdf> <output.pdf>
//
// Programmatic usage (caller supplies meta, e.g. from papers.ts):
//   import { brandPdf } from "./brand-pdfs.mjs";
//   await brandPdf({ inputPath, outputPath, meta });

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// Left empty on purpose — the cover must not print a website URL.
const WEBSITE_URL = "";

const TAGLINE = "Psychology with GS Rao";
const FOOTER_TEXT = "Prakruthi Publications | GS Rao";
const FOOTER_SIZE = 13;
const FOOTER_COLOR_RGB = [0x8b / 255, 0x00 / 255, 0x00 / 255]; // #8B0000
const LOGO_PATH = path.resolve("public/brand/logo.png");

const CM_TO_PT = 28.3464566929;
const LOGO_WIDTH = 6 * CM_TO_PT; // ~6 cm, keep aspect ratio (logo is square)

const PAGE_WIDTH = 595.28; // A4 portrait, points
const PAGE_HEIGHT = 841.89;
const FOOTER_HEIGHT = 32;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

export const EXAM_NAMES = {
  tet: "AP TET - Teacher Eligibility Test",
  dsc: "AP DSC - Andhra Pradesh District Selection Committee",
  hwo: "AP HWO - Health & Welfare Officer",
};

const MONTHS = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Short codes (IA, 1A, IIA, SS, MS, LAN, SGT, ...) are kept uppercase as
// they appear in source file names — not guessed or corrected. Everything
// else (Telugu, Hindi, Sanskrit, Urdu, Paper) is title-cased.
const UPPER_TOKENS = new Set(["ia", "1a", "iia", "ii", "a", "lan", "ss", "ms", "sgt"]);

function titleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function formatToken(token) {
  return UPPER_TOKENS.has(token.toLowerCase()) ? token.toUpperCase() : titleCase(token);
}

/** Derives exam name, display title, ISO date, and shift from a paper's file name. */
export function parseFileName(filePath) {
  const base = path.basename(filePath, ".pdf");
  const match = base.match(
    /^ap-([a-z]+)-(.+)-(\d{1,2})(?:st|nd|rd|th)-([a-z]+)-(\d{4})-shift-?(\d)$/i
  );
  if (!match) {
    throw new Error(`File name doesn't match the expected pattern: ${base}`);
  }
  const [, examSlug, codeTokensRaw, day, monthName, year, shift] = match;
  const month = MONTHS[monthName.toLowerCase()];
  if (!month) throw new Error(`Unrecognized month in file name: ${monthName}`);

  const examName = EXAM_NAMES[examSlug.toLowerCase()] ?? `AP ${examSlug.toUpperCase()}`;
  const examBadge = examSlug.toUpperCase();
  const codeLabel = codeTokensRaw.split("-").map(formatToken).join(" ");
  const monthLabel = titleCase(monthName);
  const dayNum = parseInt(day, 10);

  const paperTitle = `AP ${examBadge} ${year} - ${codeLabel} - ${dayNum} ${monthLabel} ${year}, Shift ${shift}`;
  const isoDate = `${year}-${String(month).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

  return { examName, examBadge, paperTitle, isoDate, dayNum, monthLabel, year, shift };
}

/** Derives the same meta shape as parseFileName(), but from a papers.ts entry. */
export function metaFromPapersEntry(entry, examBadge) {
  const [year, month, day] = entry.date.split("-").map(Number);
  return {
    examName: EXAM_NAMES[examBadge.toLowerCase()] ?? `AP ${examBadge}`,
    examBadge: examBadge.toUpperCase(),
    paperTitle: entry.title,
    isoDate: entry.date,
    dayNum: day,
    monthLabel: MONTH_LABELS[month - 1],
    year: String(year),
    shift: String(entry.shift),
  };
}

function wrapText(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawCentered(page, text, { y, size, font, color, pageWidth = PAGE_WIDTH }) {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: (pageWidth - width) / 2, y, size, font, color });
}

function drawFooter(page, pageWidth, boldFont) {
  drawCentered(page, FOOTER_TEXT, {
    y: FOOTER_HEIGHT / 2 - FOOTER_SIZE / 2 + 1,
    size: FOOTER_SIZE,
    font: boldFont,
    color: rgb(...FOOTER_COLOR_RGB),
    pageWidth,
  });
}

/**
 * Brands a single PDF: generated cover (from `meta`) + footer strip on every
 * page. `meta` has the same shape as parseFileName()'s return value.
 */
export async function brandPdf({ inputPath, outputPath, meta }) {
  const inputBytes = await readFile(inputPath); // input is only ever read, never written to
  const srcDoc = await PDFDocument.load(inputBytes);
  const inputPageCount = srcDoc.getPageCount();

  const outDoc = await PDFDocument.create();
  const regularFont = await outDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await outDoc.embedFont(StandardFonts.HelveticaBold);
  const italicFont = await outDoc.embedFont(StandardFonts.HelveticaOblique);

  const ink = rgb(0, 0.04, 0.04); // #000A0A
  const teal = rgb(0, 0.478, 0.369); // #007A5E
  const gray = rgb(0.4, 0.4, 0.4);

  const hasLogo = existsSync(LOGO_PATH);

  // ---- Cover page ----
  const cover = outDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT + FOOTER_HEIGHT]);
  let y = PAGE_HEIGHT + FOOTER_HEIGHT - 90;

  if (hasLogo) {
    const logoBytes = await readFile(LOGO_PATH);
    const logoImage = await outDoc.embedPng(logoBytes);
    const logoHeight = (logoImage.height / logoImage.width) * LOGO_WIDTH;
    cover.drawImage(logoImage, {
      x: (PAGE_WIDTH - LOGO_WIDTH) / 2,
      y: y - logoHeight,
      width: LOGO_WIDTH,
      height: logoHeight,
    });
    y -= logoHeight + 26;
  }
  // If the logo is present, no text wordmark is drawn alongside it.

  drawCentered(cover, TAGLINE, { y, size: 14, font: italicFont, color: gray });
  y -= 50;

  cover.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_WIDTH - MARGIN, y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.85),
  });
  y -= 46;

  drawCentered(cover, meta.examName, { y, size: 20, font: boldFont, color: ink });
  y -= 34;

  for (const line of wrapText(meta.paperTitle, boldFont, 16, CONTENT_WIDTH)) {
    drawCentered(cover, line, { y, size: 16, font: boldFont, color: ink });
    y -= 22;
  }
  y -= 10;

  // Callers that don't have a reliable day/month/year/shift (meta omits
  // them rather than guessing) skip this line entirely instead of printing
  // "undefined".
  const hasDateShift = meta.dayNum != null && meta.monthLabel && meta.year && meta.shift != null;
  if (hasDateShift) {
    drawCentered(cover, `${meta.dayNum} ${meta.monthLabel} ${meta.year}  ·  Shift ${meta.shift}`, {
      y,
      size: 13,
      font: regularFont,
      color: teal,
    });
    y -= 50;
  } else {
    y -= 20;
  }

  // meta.sourceLine lets a caller override the default AP "official
  // portal" wording (e.g. when that claim hasn't been confirmed for the
  // exam being branded).
  const sourceLine =
    meta.sourceLine ?? `Source: AP ${meta.examBadge} official portal. Original question paper follows, unedited.`;
  for (const line of wrapText(sourceLine, regularFont, 11, CONTENT_WIDTH)) {
    drawCentered(cover, line, { y, size: 11, font: regularFont, color: gray });
    y -= 16;
  }

  if (WEBSITE_URL) {
    y -= 10;
    drawCentered(cover, WEBSITE_URL, { y, size: 11, font: regularFont, color: teal });
  }

  drawFooter(cover, PAGE_WIDTH, boldFont);

  // ---- Original pages, embedded unchanged at 100% scale, with the same
  // footer strip added below. Handles /Rotate and non-zero MediaBox origin
  // because embedPage()/embedPages() capture each page's final rotated
  // appearance. Embedding all pages in ONE embedPages() call (instead of
  // one embedPage() call per page) lets pdf-lib's internal object copier
  // share a single cache across all pages, so fonts/resources common to
  // multiple pages are copied once instead of once per page. ----
  const srcPages = srcDoc.getPages();
  const embeddedPages = await outDoc.embedPages(srcPages);
  for (const embedded of embeddedPages) {
    const { width: ew, height: eh } = embedded;

    const newPage = outDoc.addPage([ew, eh + FOOTER_HEIGHT]);
    newPage.drawPage(embedded, { x: 0, y: FOOTER_HEIGHT, width: ew, height: eh });
    drawFooter(newPage, ew, boldFont);
  }

  outDoc.setTitle(meta.paperTitle);

  const outputBytes = await outDoc.save();
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, outputBytes);

  return {
    inputPath,
    outputPath,
    inputPageCount,
    outputPageCount: outDoc.getPageCount(),
    inputBytes: inputBytes.length,
    outputBytes: outputBytes.length,
    title: meta.paperTitle,
    hasLogo,
  };
}

async function main() {
  const [, , inputPath, outputPath] = process.argv;
  if (!inputPath || !outputPath) {
    console.error("Usage: node scripts/brand-pdfs.mjs <input.pdf> <output.pdf>");
    process.exit(1);
  }
  const meta = parseFileName(inputPath);
  const result = await brandPdf({ inputPath, outputPath, meta });
  console.log(JSON.stringify(result, null, 2));
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
