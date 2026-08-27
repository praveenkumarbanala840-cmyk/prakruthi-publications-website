import type { Metadata } from "next";
import Link from "next/link";
import ArticlePageTemplate from "@/components/templates/ArticlePageTemplate";
import {
  ArticleH2,
  ArticleP,
  ArticlePlaceholder,
} from "@/components/ui/ArticleContent";
import { dsc } from "@/data/exams";
import { whatsappLink } from "@/lib/site-config";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "AP DSC Previous Papers — Download & Analysis",
  description:
    "AP DSC previous year question papers with answer key highlights and topic-wise analysis — download PDFs from the official source and study frequently-repeated questions.",
  alternates: { canonical: "/exams/dsc/previous-papers" },
};

export default function DscPreviousPapersPage() {
  return (
    <ArticlePageTemplate
      exam={dsc}
      articleSlug="previous-papers"
      title="AP DSC Previous Papers — Download & Analysis"
      intro="Solving previous AP DSC papers is one of the most reliable ways to understand question difficulty, recurring topics, and time management for the real exam."
      sourceNote="Papers on this page will be sourced directly from the official AP DSC portal (cse.ap.gov.in) and linked here unedited, with our own written analysis reviewed by our faculty for accuracy before publishing."
    >
      <div>
        <ArticleH2>Question Papers</ArticleH2>
        <div className="mt-4">
          <ArticlePlaceholder>
            Previous year papers are being sourced from the official AP DSC
            portal and will be added here as downloadable PDFs, organized by
            year, subject, and paper.
          </ArticlePlaceholder>
        </div>
      </div>

      <div>
        <ArticleH2>Answer Key Highlights</ArticleH2>
        <div className="mt-4">
          <ArticlePlaceholder>
            A faculty-reviewed breakdown of important questions with
            explanations will be published here once the source papers are
            available and the analysis has been checked for accuracy.
          </ArticlePlaceholder>
        </div>
      </div>

      <div>
        <ArticleH2>Frequently Repeated Questions</ArticleH2>
        <div className="mt-4">
          <ArticlePlaceholder>
            Coming soon — topics and questions that recur across multiple years
            of AP DSC papers, identified once we have the full set of papers to
            compare.
          </ArticlePlaceholder>
        </div>
      </div>

      <div>
        <ArticleH2>Topic-Wise Weightage</ArticleH2>
        <div className="mt-4 space-y-3">
          <ArticleP>
            Content &amp; Methodology carries the largest share of marks in the
            official exam pattern (60 of 80 marks for SGT — see the{" "}
            <Link href="/exams/dsc/exam-pattern" className="font-semibold text-gold hover:underline">
              exam pattern breakdown
            </Link>
            ). A precise topic-wise weightage derived from actual past papers
            will be added here once that analysis is complete.
          </ArticleP>
        </div>
      </div>

      <div className="rounded-xl border border-navy/10 bg-cream p-5 text-center">
        <p className="text-sm text-navy/70">
          Have AP DSC previous papers you&apos;d like included, or a question
          about a specific year?
        </p>
        <LinkButton
          href={whatsappLink("Hi, I have AP DSC previous papers I'd like to share / ask about.")}
          variant="secondary"
          size="sm"
          className="mt-3"
        >
          Message on WhatsApp
        </LinkButton>
      </div>
    </ArticlePageTemplate>
  );
}
