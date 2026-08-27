import type { Metadata } from "next";
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
  title: "AP DSC Syllabus 2026 — Subject-Wise Breakdown",
  description:
    "AP DSC Syllabus 2026 subject-wise breakdown for SGT and School Assistant posts — General Knowledge, Perspectives in Education, Educational Psychology, and Content & Methodology, with official marks weightage.",
  alternates: { canonical: "/exams/dsc/syllabus-2026" },
};

export default function DscSyllabusPage() {
  return (
    <ArticlePageTemplate
      exam={dsc}
      articleSlug="syllabus-2026"
      title="AP DSC Syllabus 2026 — Subject-Wise Breakdown"
      intro="The AP DSC (Andhra Pradesh District Selection Committee) exam covers General Knowledge, Perspectives in Education, Educational Psychology, and Content & Methodology for your teaching subject. Here's the established subject-wise structure to plan your preparation around."
      sourceNote="The AP Mega DSC 2026 notification is expected in October 2026, with the exam likely in December 2026. The breakdown below reflects the established AP DSC exam pattern from prior recruitment cycles — always cross-check the final syllabus against the official notification at cse.ap.gov.in once released."
    >
      <div>
        <ArticleH2>How the AP DSC Syllabus Is Structured</ArticleH2>
        <div className="mt-4 space-y-4">
          <ArticleP>
            For the Secondary Grade Teacher (SGT) post, the written test (Teacher
            Recruitment Test) carries 80 marks, split across four parts. Content
            &amp; Methodology — your subject-specific teaching knowledge — carries
            the largest share of the marks by a wide margin.
          </ArticleP>
        </div>
      </div>

      <div>
        <ArticleH3>SGT Written Test — Marks Distribution</ArticleH3>
        <div className="mt-3">
          <ArticleTable
            columns={[
              { key: "part", label: "Part" },
              { key: "marks", label: "Marks" },
            ]}
            rows={[
              { part: "General Knowledge & Current Affairs", marks: "8" },
              { part: "Perspectives in Education", marks: "4" },
              { part: "Educational Psychology (Child Psychology & Pedagogy)", marks: "8" },
              { part: "Content & Methodology (subject-specific)", marks: "60" },
            ]}
          />
        </div>
      </div>

      <div>
        <ArticleH3>Content &amp; Methodology Subjects (SGT)</ArticleH3>
        <div className="mt-3">
          <ArticleList
            items={[
              "Telugu / other Language I",
              "English (Language II)",
              "Mathematics",
              "Environmental Studies / Science",
              "Social Studies",
            ]}
          />
        </div>
      </div>

      <div>
        <ArticleH3>Other Posts</ArticleH3>
        <div className="mt-3">
          <ArticleP>
            The DSC recruitment also covers School Assistant, TGT, PGT, Principal,
            and PET posts, each with its own subject-specific Content &amp;
            Methodology weightage. School Assistant follows a similar written-test
            format (160 questions, 80 marks). Exact marks splits for TGT, PGT,
            Principal, and PET will be confirmed in the official notification.
          </ArticleP>
        </div>
      </div>

      <ArticleCallout>
        Selection combines the written test (80% weightage) with your AP TET
        score (20% weightage) for a final 100-mark score.
      </ArticleCallout>
    </ArticlePageTemplate>
  );
}
