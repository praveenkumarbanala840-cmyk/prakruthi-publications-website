import { emptyExamContent, type ExamContent } from "@/data/types";

// TODO(client): fill in overview, syllabus, batches, testimonials, faq, previousPapers.
// DSC is the highest priority exam (December exam window) — see build brief section 9.
export const dsc: ExamContent = {
  ...emptyExamContent(
    "ap-dsc",
    "AP DSC — Andhra Pradesh District Selection Committee",
    "AP DSC"
  ),

  syllabusDownload: {
    title: "AP DSC 2026 Suggestive Syllabus (PDF)",
    description:
      "Official suggestive syllabus released by the Department of School Education, Government of Andhra Pradesh (SCERT AP). 305 pages, about 4.6 MB. Always check the final DSC notification for the posts and details.",
    fileUrl: "/downloads/ap-dsc-2026-suggestive-syllabus.pdf",
  },
};
