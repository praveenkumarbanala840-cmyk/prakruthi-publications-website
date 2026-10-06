@AGENTS.md

# Prakruthi Publications — Project Decisions

## Project

Website for Professor GS Rao, brand "Prakruthi Publications - Psychology with GS Rao".

Exams covered: DSC, APSET, DEO, CDPO, HWO, Gurukulalu, and TET.

Goals:
- Rank on Google for exam searches.
- Convert Instagram traffic into Play Store app installs.

## Architecture

- Next.js on Netlify.
- One reusable `ArticlePageTemplate` for all exams.
- Course pages (`/courses/<exam>`) sell; article pages (`/exams/<exam>/...`) rank.
- Pages are generated from per-exam data files.

## Honesty rules

- No fabricated stats, testimonials, success stories, or papers.
- Every claim must trace to the client.
- Do not publish "3+6", "85 Faculty", "Video classes", or combo packs until the client confirms in writing.
- Anchor stats: 8+ years, 1000+ selected in government jobs, 15,000+ trained.
- Student testimonials: draft quote → real student confirms on WhatsApp → then publish.

## CTA

- One label, "Enroll Now", linking to the Play Store everywhere.
- WhatsApp is secondary (wa.me with pre-filled course message).
- Email is tertiary.
- No web checkout.

## Previous papers

- Only official government PDFs, unedited, source cited.
- Latest cycle only (about 28–30 PDFs: TET ~20, DSC ~10, HWO ~5).
- Telugu medium only.
- No analysis or weightage for now.
- Do not guess what codes like IA, HH, VH mean.
- Raw files live outside the repo, in `Documents\prakruthi-papers-raw`.
- Website file names: lowercase with hyphens.
- The data file is multi-exam, so DSC/HWO can be added without code changes.

## Workflow

- Batch changes into one commit and ask before pushing (Netlify free plan: 300 credits/month, each production deploy costs 15).
- Never claim a visual or browser check passed unless the browser tool actually worked.
- Reply in English only.
