import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { papersByExam } from "@/data/papers";

const SUMMARY_CARD_THRESHOLD = 20;

const groupDefs = [
  {
    exam: "ap-tet" as const,
    label: "AP TET",
    source: "Source: AP TET official portal. Original pages unedited; Prakruthi cover page and footer added.",
    previousPapersHref: "/exams/ap-tet/previous-papers",
  },
  {
    exam: "ap-dsc" as const,
    label: "AP DSC",
    source: "Source: AP DSC official portal. Original pages unedited; Prakruthi cover page and footer added.",
    previousPapersHref: "/exams/ap-dsc/previous-papers",
  },
  {
    exam: "ts-tet" as const,
    label: "TS TET",
    source: "Source: TS TET official portal. Original pages unedited; Prakruthi cover page and footer added.",
    previousPapersHref: "/exams/ts-tet/previous-papers",
  },
  {
    exam: "ts-dsc" as const,
    label: "TS DSC",
    source: "Source: TS DSC official portal. Original pages unedited; Prakruthi cover page and footer added.",
    previousPapersHref: "/exams/ts-dsc/previous-papers",
  },
];

const groups = groupDefs
  .map((def) => ({ ...def, papers: papersByExam(def.exam) }))
  .filter((group) => group.papers.length > 0);

const groupLabels = groups.map((g) => g.label);
const labelList =
  groupLabels.length <= 1
    ? groupLabels.join("")
    : `${groupLabels.slice(0, -1).join(", ")} and ${groupLabels[groupLabels.length - 1]}`;

export const metadata: Metadata = {
  title: "Resources — Previous Papers",
  description: `Official previous-year question paper PDFs for ${labelList} — unedited, sourced directly from the official government portal.`,
  alternates: { canonical: "/resources" },
};

function formatDisplayDate(iso: string) {
  const [, month, day] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]}`;
}

export default function ResourcesPage() {
  return (
    <>
      <section className="border-b border-charcoal/10 bg-white">
        <Container className="py-10 sm:py-14">
          <h1 className="font-display text-3xl font-extrabold text-charcoal sm:text-4xl">
            Resources
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-charcoal/70 sm:text-base">
            Official previous-year question papers, organized by exam.
          </p>
        </Container>
      </section>

      <Container className="max-w-3xl py-10">
        <div className="space-y-12">
          {groups.map((group) => (
            <div key={group.exam}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-xl font-bold text-charcoal">{group.label}</h2>
                <p className="text-xs text-charcoal/50">{group.source}</p>
              </div>

              {group.papers.length > SUMMARY_CARD_THRESHOLD ? (
                <Link
                  href={group.previousPapersHref}
                  className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-charcoal/10 bg-white p-5 transition-colors hover:border-teal"
                >
                  <div>
                    <p className="font-display font-bold text-charcoal">
                      {group.label} &mdash; {group.papers.length} papers
                    </p>
                    <p className="mt-1 text-sm text-charcoal/60">
                      Search, filter, and download every paper
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-teal">View all &rarr;</span>
                </Link>
              ) : (
                <ul className="mt-4 divide-y divide-charcoal/10 rounded-xl border border-charcoal/10 bg-white">
                  {group.papers.map((paper) => (
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
              )}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
