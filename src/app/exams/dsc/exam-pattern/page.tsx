import type { Metadata } from "next";
import Link from "next/link";
import ArticlePageTemplate from "@/components/templates/ArticlePageTemplate";
import {
  ArticleH2,
  ArticleH3,
  ArticleP,
  ArticleList,
  ArticleTable,
  ArticleCallout,
} from "@/components/ui/ArticleContent";
import { dsc } from "@/data/exams";

export const metadata: Metadata = {
  title: "AP DSC Exam Pattern 2026 — Marks, Duration & Selection Process",
  description:
    "AP DSC exam pattern 2026: written test structure, marks, duration, negative marking policy, and how the AP TET score factors into final selection.",
  alternates: { canonical: "/exams/dsc/exam-pattern" },
};

export default function DscExamPatternPage() {
  return (
    <ArticlePageTemplate
      exam={dsc}
      articleSlug="exam-pattern"
      title="AP DSC Exam Pattern 2026 — Marks, Duration & Selection Process"
      intro="The AP DSC written test (Teacher Recruitment Test) is a computer-based exam, with the final selection combining your written test score and AP TET score."
      sourceNote="The AP Mega DSC 2026 notification is expected in October 2026, with the exam likely in December 2026. Details below reflect the established AP DSC exam pattern from prior recruitment cycles — confirm final specifics against the official notification at cse.ap.gov.in."
    >
      <div>
        <ArticleH2>Selection Process</ArticleH2>
        <div className="mt-4">
          <ArticleP>
            Final selection is based on two components combined into a 100-mark
            score:
          </ArticleP>
          <div className="mt-3">
            <ArticleTable
              columns={[
                { key: "component", label: "Component" },
                { key: "weightage", label: "Weightage" },
              ]}
              rows={[
                { component: "Written Test (TRT)", weightage: "80%" },
                { component: "AP TET Score", weightage: "20%" },
              ]}
            />
          </div>
        </div>
      </div>

      <div>
        <ArticleH2>Written Test Format</ArticleH2>
        <div className="mt-4 space-y-3">
          <ArticleList
            items={[
              "Mode: Online (computer-based test)",
              "Question type: Multiple choice",
              "School Assistant: 160 questions, 80 marks, 150 minutes (2 hours 30 minutes)",
              "Marking: 0.5 marks per correct answer",
              "No negative marking for wrong answers",
            ]}
          />
        </div>
      </div>

      <ArticleCallout>
        Since there&apos;s no negative marking, attempt every question — an
        unattempted question and a wrong answer both score zero, so a reasoned
        guess is always better than leaving it blank.
      </ArticleCallout>

      <div>
        <ArticleH3>SGT Marks Breakdown</ArticleH3>
        <div className="mt-3">
          <ArticleP>
            For the SGT post, the 80-mark written test splits into four parts —
            see the full breakdown on the{" "}
            <Link href="/exams/dsc/syllabus-2026" className="font-semibold text-gold hover:underline">
              AP DSC Syllabus 2026
            </Link>{" "}
            page.
          </ArticleP>
        </div>
      </div>
    </ArticlePageTemplate>
  );
}
