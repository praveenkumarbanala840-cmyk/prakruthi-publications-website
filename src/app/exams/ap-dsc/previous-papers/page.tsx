import type { Metadata } from "next";
import ArticlePageTemplate from "@/components/templates/ArticlePageTemplate";
import PapersExplorer from "@/components/sections/PapersExplorer";
import { dsc } from "@/data/exams";
import { papersByExam } from "@/data/papers";

const papers = papersByExam("ap-dsc");
const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => a - b);
const yearsLabel = years.join(", ");

export const metadata: Metadata = {
  title: `AP DSC Previous Papers (${yearsLabel}) — ${papers.length} Papers`,
  description: `${papers.length} official AP DSC previous question paper PDFs from ${yearsLabel} — unedited, sourced directly from the official AP DSC portal.`,
  alternates: { canonical: "/exams/ap-dsc/previous-papers" },
};

export default function DscPreviousPapersPage() {
  return (
    <ArticlePageTemplate
      exam={dsc}
      articleSlug="previous-papers"
      availableArticleSlugs={["previous-papers"]}
      title={`AP DSC Previous Papers (${yearsLabel}) — Download`}
      intro="Official AP DSC question papers, unedited and downloadable as-is."
      sourceNote="Source: AP DSC official portal. Original pages unedited; Prakruthi cover page and footer added."
    >
      {papers.length > 0 ? (
        <PapersExplorer papers={papers} />
      ) : (
        <div className="rounded-2xl border border-dashed border-charcoal/20 bg-white/60 p-8 text-center">
          <p className="text-sm text-charcoal/60">Papers are being added.</p>
        </div>
      )}
    </ArticlePageTemplate>
  );
}
