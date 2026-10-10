import { emptyExamContent, type ExamContent } from "@/data/types";

// Telangana State DSC. No content yet — do not copy AP DSC's data here.
// minimalCourse keeps the course page to just hero + Enroll Now + (once
// papers exist) a Previous Papers button; no placeholder sections for
// content that hasn't been confirmed for this exam.
export const tsDsc: ExamContent = {
  ...emptyExamContent("ts-dsc", "TS DSC - Telangana State District Selection Committee", "TS DSC"),
  availableArticles: ["previous-papers"],
  minimalCourse: true,
};
