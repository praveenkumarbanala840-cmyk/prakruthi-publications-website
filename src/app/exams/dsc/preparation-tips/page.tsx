import type { Metadata } from "next";
import Link from "next/link";
import ArticlePageTemplate from "@/components/templates/ArticlePageTemplate";
import { ArticleH2, ArticleP, ArticleList, ArticleCallout } from "@/components/ui/ArticleContent";
import { dsc } from "@/data/exams";

export const metadata: Metadata = {
  title: "AP DSC Preparation Tips — How to Prepare for AP DSC 2026",
  description:
    "Practical AP DSC preparation strategy: how to prioritize Content & Methodology, structure your study plan, and use previous papers and mock tests effectively.",
  alternates: { canonical: "/exams/dsc/preparation-tips" },
};

export default function DscPreparationTipsPage() {
  return (
    <ArticlePageTemplate
      exam={dsc}
      articleSlug="preparation-tips"
      title="AP DSC Preparation Tips — How to Prepare for AP DSC 2026"
      intro="A focused strategy matters more than the number of hours you study. Here's how to structure your AP DSC preparation around the actual exam weightage."
    >
      <div>
        <ArticleH2>1. Prioritize by Marks Weightage</ArticleH2>
        <div className="mt-4 space-y-3">
          <ArticleP>
            Content &amp; Methodology carries 60 of 80 marks for the SGT written
            test — the single largest section by far. Give it the majority of
            your study time before spreading effort across General Knowledge,
            Perspectives in Education, and Educational Psychology. See the full{" "}
            <Link href="/exams/dsc/syllabus-2026" className="font-semibold text-gold hover:underline">
              syllabus breakdown
            </Link>{" "}
            to plan accordingly.
          </ArticleP>
        </div>
      </div>

      <div>
        <ArticleH2>2. Build a Realistic Study Schedule</ArticleH2>
        <div className="mt-4">
          <ArticleList
            items={[
              "Break your syllabus into weekly targets rather than trying to cover everything at once",
              "Revisit topics you've already studied on a rolling cycle — spaced revision beats one-time reading",
              "Set aside fixed time for weak subjects instead of only studying what feels comfortable",
            ]}
          />
        </div>
      </div>

      <div>
        <ArticleH2>3. Practice Under Real Exam Conditions</ArticleH2>
        <div className="mt-4">
          <ArticleP>
            Since there&apos;s no negative marking in the AP DSC written test,
            attempt every question during practice too — build the habit of
            making an informed guess rather than skipping. Time yourself
            against the actual 150-minute format so pacing isn&apos;t a
            surprise on exam day. See the full{" "}
            <Link href="/exams/dsc/exam-pattern" className="font-semibold text-gold hover:underline">
              exam pattern
            </Link>{" "}
            for the exact format.
          </ArticleP>
        </div>
      </div>

      <div>
        <ArticleH2>4. Use Previous Papers</ArticleH2>
        <div className="mt-4">
          <ArticleP>
            Previous papers show you the actual difficulty level and question
            style, not just the syllabus topics. We&apos;re compiling AP DSC{" "}
            <Link href="/exams/dsc/previous-papers" className="font-semibold text-gold hover:underline">
              previous papers and analysis
            </Link>{" "}
            — check back as this section grows.
          </ArticleP>
        </div>
      </div>

      <div>
        <ArticleH2>5. Track the Official Notification</ArticleH2>
        <div className="mt-4">
          <ArticleP>
            The AP Mega DSC 2026 notification is expected in October 2026, with
            the exam likely in December 2026. Keep an eye on the official
            portal (cse.ap.gov.in) for confirmed dates, eligibility, and any
            syllabus updates.
          </ArticleP>
        </div>
      </div>

      <ArticleCallout>
        Studying alone makes it easy to lose track of what actually matters for
        marks. A structured course keeps your prep aligned to the real exam
        weightage instead of guesswork.
      </ArticleCallout>
    </ArticlePageTemplate>
  );
}
