// Previous-year question paper PDFs, grouped by exam.
// Only official, unedited government PDFs belong here — see CLAUDE.md
// "Previous papers" section. Codes in `title` (IA, IIA, 1A, SS, MS, LAN)
// are kept exactly as they appear in the source file names — do not
// "correct" or reinterpret them.
//
// To add a new exam's papers later: add rows to the matching array
// below (or a new exam's array) and drop the PDFs into
// public/papers/<exam>/ — no template or page code changes needed.

export interface PreviousPaper {
  exam: "tet" | "dsc" | "hwo";
  year: number;
  date: string; // ISO (YYYY-MM-DD)
  title: string;
  shift: 1 | 2;
  path: string; // public/ path to the PDF
  size: number; // MB, decimal (bytes / 1,000,000), rounded to 1 decimal
  published: boolean; // false = row/file kept, just hidden from /resources
}

export const tetPapers: PreviousPaper[] = [
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-05",
    title: "AP TET 2026 - Paper IIA LAN Telugu - 5 Aug 2026, Shift 1",
    shift: 1,
    path: "/papers/tet/ap-tet-paper-iia-lan-telugu-05th-aug-2026-shift-1.pdf",
    size: 4.9,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-05",
    title: "AP TET 2026 - Paper IIA LAN Telugu - 5 Aug 2026, Shift 2",
    shift: 2,
    path: "/papers/tet/ap-tet-paper-iia-lan-telugu-05th-aug-2026-shift-2.pdf",
    size: 5.7,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-06",
    title: "AP TET 2026 - IIA LAN Telugu - 6 Aug 2026, Shift 1",
    shift: 1,
    path: "/papers/tet/ap-tet-iia-lan-telugu-06th-aug-2026-shift-1.pdf",
    size: 5.1,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-06",
    title: "AP TET 2026 - IIA LAN Telugu Sanskrit - 6 Aug 2026, Shift 1",
    shift: 1,
    path: "/papers/tet/ap-tet-iia-lan-telugu-sanskrit-06th-aug-2026-shift-1.pdf",
    size: 5.1,
    published: false,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-06",
    title: "AP TET 2026 - IIA Telugu Hindi - 6 Aug 2026, Shift 1",
    shift: 1,
    path: "/papers/tet/ap-tet-iia-telugu-hindi-06th-aug-2026-shift-1.pdf",
    size: 4.9,
    published: false,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-06",
    title: "AP TET 2026 - Paper IIA LAN Telugu Urdu - 6 Aug 2026, Shift 1",
    shift: 1,
    path: "/papers/tet/ap-tet-paper-iia-lan-telugu-urdu-06th-aug-2026-shift1.pdf",
    size: 4.8,
    published: false,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-06",
    title: "AP TET 2026 - SGT IA Telugu - 6 Aug 2026, Shift 2",
    shift: 2,
    path: "/papers/tet/ap-tet-sgt-ia-telugu-06th-aug-2026-shift-2.pdf",
    size: 5.8,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-07",
    title: "AP TET 2026 - SGT IA Telugu - 7 Aug 2026, Shift 1",
    shift: 1,
    path: "/papers/tet/ap-tet-sgt-ia-telugu-07th-aug-2026-shift-1.pdf",
    size: 5.3,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-07",
    title: "AP TET 2026 - SGT 1A Telugu - 7 Aug 2026, Shift 2",
    shift: 2,
    path: "/papers/tet/ap-tet-sgt-1a-telugu-07th-aug-2026-shift-2.pdf",
    size: 6.1,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-08",
    title: "AP TET 2026 - SGT IA Telugu - 8 Aug 2026, Shift 1",
    shift: 1,
    path: "/papers/tet/ap-tet-sgt-ia-telugu-08th-aug-2026-shift-1.pdf",
    size: 6.1,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-08",
    title: "AP TET 2026 - SGT IA Telugu - 8 Aug 2026, Shift 2",
    shift: 2,
    path: "/papers/tet/ap-tet-sgt-ia-telugu-08th-aug-2026-shift-2.pdf",
    size: 5.7,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-09",
    title: "AP TET 2026 - SGT IA Telugu - 9 Aug 2026, Shift 1",
    shift: 1,
    path: "/papers/tet/ap-tet-sgt-ia-telugu-09th-aug-2026-shift-1.pdf",
    size: 6.0,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-09",
    title: "AP TET 2026 - SGT IA Telugu - 9 Aug 2026, Shift 2",
    shift: 2,
    path: "/papers/tet/ap-tet-sgt-ia-telugu-09th-aug-2026-shift-2.pdf",
    size: 6.2,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-10",
    title: "AP TET 2026 - SGT IA Telugu - 10 Aug 2026, Shift 1",
    shift: 1,
    path: "/papers/tet/ap-tet-sgt-ia-telugu-10th-aug-2026-shift-1.pdf",
    size: 5.2,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-10",
    title: "AP TET 2026 - Paper IIA SS Telugu - 10 Aug 2026, Shift 2",
    shift: 2,
    path: "/papers/tet/ap-tet-paper-iia-ss-telugu-10th-aug-2026-shift-2.pdf",
    size: 6.3,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-11",
    title: "AP TET 2026 - Paper IIA SS Telugu - 11 Aug 2026, Shift 1",
    shift: 1,
    path: "/papers/tet/ap-tet-paper-iia-ss-telugu-11th-aug-2026-shift-1.pdf",
    size: 6.0,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-11",
    title: "AP TET 2026 - Paper II A SS Telugu - 11 Aug 2026, Shift 2",
    shift: 2,
    path: "/papers/tet/ap-tet-paper-ii-a-ss-telugu-11th-aug-2026-shift-2.pdf",
    size: 6.0,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-12",
    title: "AP TET 2026 - Paper IIA MS Telugu - 12 Aug 2026, Shift 2",
    shift: 2,
    path: "/papers/tet/ap-tet-paper-iia-ms-telugu-12th-aug-2026-shift-2.pdf",
    size: 6.0,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-13",
    title: "AP TET 2026 - Paper IIA MS Telugu - 13 Aug 2026, Shift 1",
    shift: 1,
    path: "/papers/tet/ap-tet-paper-iia-ms-telugu-13th-aug-2026-shift-1.pdf",
    size: 6.4,
    published: true,
  },
  {
    exam: "tet",
    year: 2026,
    date: "2026-08-14",
    title: "AP TET 2026 - Paper IIA MS Telugu - 14 Aug 2026, Shift 2",
    shift: 2,
    path: "/papers/tet/ap-tet-paper-iia-ms-telugu-14th-aug-2026-shift-2.pdf",
    size: 5.8,
    published: true,
  },
];

// Not yet available — add rows here once official PDFs are sourced.
export const dscPapers: PreviousPaper[] = [];

// Not yet available — add rows here once official PDFs are sourced.
export const hwoPapers: PreviousPaper[] = [];

export const allPapers: PreviousPaper[] = [...tetPapers, ...dscPapers, ...hwoPapers];

export function papersByExam(exam: PreviousPaper["exam"]): PreviousPaper[] {
  return allPapers
    .filter((p) => p.exam === exam && p.published)
    .sort((a, b) => b.date.localeCompare(a.date));
}
