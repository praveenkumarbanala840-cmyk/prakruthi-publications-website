import type { Metadata } from "next";
import ArticlePageTemplate from "@/components/templates/ArticlePageTemplate";
import PapersExplorer from "@/components/sections/PapersExplorer";
import { tsTet } from "@/data/exams";
import { papersByExam } from "@/data/papers";

const papers = papersByExam("ts-tet");

export const metadata: Metadata = {
  title:
    papers.length > 0
      ? `TS TET Previous Papers — ${papers.length} Papers`
      : "TS TET Previous Papers",
  description:
    papers.length > 0
      ? `${papers.length} official TS TET previous question paper PDFs — unedited, sourced directly from the official portal. Also searched as TG TET.`
      : "Official TS TET previous question papers will be added here as they become available. Also searched as TG TET.",
  alternates: { canonical: "/exams/ts-tet/previous-papers" },
};

export default function TsTetPreviousPapersPage() {
  return (
    <ArticlePageTemplate
      exam={tsTet}
      articleSlug="previous-papers"
      availableArticleSlugs={["previous-papers"]}
      title="TS TET Previous Papers"
      intro="Official TS TET question papers, unedited and downloadable as-is."
      sourceNote="Source: TS TET official portal. Original pages unedited; Prakruthi cover page and footer added."
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
