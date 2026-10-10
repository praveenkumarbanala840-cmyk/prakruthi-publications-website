import type { Metadata } from "next";
import ArticlePageTemplate from "@/components/templates/ArticlePageTemplate";
import PapersExplorer from "@/components/sections/PapersExplorer";
import { tsDsc } from "@/data/exams";
import { papersByExam } from "@/data/papers";

const papers = papersByExam("ts-dsc");

export const metadata: Metadata = {
  title:
    papers.length > 0
      ? `TS DSC Previous Papers — ${papers.length} Papers`
      : "TS DSC Previous Papers",
  description:
    papers.length > 0
      ? `${papers.length} official TS DSC previous question paper PDFs — unedited, sourced directly from the official portal. Also searched as TG DSC.`
      : "Official TS DSC previous question papers will be added here as they become available. Also searched as TG DSC.",
  alternates: { canonical: "/exams/ts-dsc/previous-papers" },
};

export default function TsDscPreviousPapersPage() {
  return (
    <ArticlePageTemplate
      exam={tsDsc}
      articleSlug="previous-papers"
      availableArticleSlugs={["previous-papers"]}
      title="TS DSC Previous Papers"
      intro="Official TS DSC question papers, unedited and downloadable as-is."
      sourceNote="Source: TS DSC official portal. Original pages unedited; Prakruthi cover page and footer added."
    >
      {papers.length > 0 ? (
        <PapersExplorer papers={papers} />
      ) : (
        <div className="rounded-2xl border border-dashed border-charcoal/20 bg-white/60 p-8 text-center">
          <p className="text-sm text-charcoal/60">Papers will be added soon.</p>
        </div>
      )}
    </ArticlePageTemplate>
  );
}
