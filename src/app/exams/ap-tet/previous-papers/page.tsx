import type { Metadata } from "next";
import ArticlePageTemplate from "@/components/templates/ArticlePageTemplate";
import { tet } from "@/data/exams";
import { papersByExam } from "@/data/papers";

export const metadata: Metadata = {
  title: "AP TET Previous Papers — Download",
  description:
    "Official AP TET previous question paper PDFs — unedited, sourced directly from the official AP TET portal.",
  alternates: { canonical: "/exams/ap-tet/previous-papers" },
};

function formatDisplayDate(iso: string) {
  const [, month, day] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]}`;
}

export default function TetPreviousPapersPage() {
  const papers = papersByExam("ap-tet");

  return (
    <ArticlePageTemplate
      exam={tet}
      articleSlug="previous-papers"
      availableArticleSlugs={["previous-papers"]}
      title="AP TET Previous Papers — Download"
      intro="Official AP TET question papers, unedited and downloadable as-is."
      sourceNote="Source: AP TET official portal. Original pages unedited; Prakruthi cover page and footer added."
    >
      {papers.length > 0 ? (
        <ul className="divide-y divide-charcoal/10 rounded-xl border border-charcoal/10 bg-white">
          {papers.map((paper) => (
            <li
              key={paper.path}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-charcoal">{paper.title}</p>
                <p className="text-xs text-charcoal/50">
                  {formatDisplayDate(paper.date)} {paper.year} &middot; {paper.size} MB
                </p>
              </div>
              <a
                href={paper.path}
                download
                className="shrink-0 rounded-full bg-mint px-4 py-1.5 text-xs font-semibold text-black hover:bg-mint-dark"
              >
                Download PDF
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-charcoal/20 bg-white/60 p-8 text-center">
          <p className="text-sm text-charcoal/60">Papers are being added.</p>
        </div>
      )}
    </ArticlePageTemplate>
  );
}
