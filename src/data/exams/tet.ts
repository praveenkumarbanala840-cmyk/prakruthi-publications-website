import { emptyExamContent, type ExamContent } from "@/data/types";

// TODO(professor): fill in overview, lessons, intro video, shorts, reviews,
// FAQ, price and offer. See the data-fields checklist for the full list —
// nothing below is invented; empty fields render as hidden sections or
// honest "coming soon" placeholders.
export const tet: ExamContent = {
  ...emptyExamContent("ap-tet", "AP TET - Teacher Eligibility Test", "AP TET"),

  // Only syllabus-2026 and exam-pattern are deliberately omitted — TET has
  // no syllabus/exam-pattern article pages yet (see build instructions).
  availableArticles: ["previous-papers"],

  heroHeadline: "AP TET 2026 - Psychology with GS Rao",
  heroSecondaryCta: { label: "Previous Papers", href: "/exams/ap-tet/previous-papers" },

  // TODO(professor): YouTube video ID for the course intro video.
  // introVideo: { youtubeId: "", title: "" },

  // TODO(professor): ordered list of lesson/video titles.
  lessons: [],

  // TODO(professor): YouTube video IDs for Shorts clips.
  shorts: [],

  // TODO(professor): real student reviews only — name, exam, quote, 1-5 stars.
  reviews: [],

  // TODO(professor): price as a plain string, e.g. "₹1,999".
  // price: { amount: "" },

  // TODO(professor): optional limited-time offer. validUntil is ISO
  // (YYYY-MM-DD) — the offer stops showing automatically after that date.
  // offer: { description: "", validUntil: "" },
};
