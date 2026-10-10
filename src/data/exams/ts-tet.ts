import { emptyExamContent, type ExamContent } from "@/data/types";

// Telangana State TET. No content yet — do not copy AP TET's data here.
// minimalCourse keeps the course page to just hero + Enroll Now + (once
// papers exist) a Previous Papers button; no placeholder sections for
// content that hasn't been confirmed for this exam.
export const tsTet: ExamContent = {
  ...emptyExamContent("ts-tet", "TS TET - Telangana State Teacher Eligibility Test", "TS TET"),
  availableArticles: ["previous-papers"],
  minimalCourse: true,
};
