import Link from "next/link";
import Container from "@/components/ui/Container";
import { allPapers } from "@/data/papers";
import { visibleExams } from "@/lib/site-config";

function formatDisplayDate(iso: string) {
  const [year, month, day] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
}

export default function LatestPapers() {
  const visibleSlugs = new Set(visibleExams.map((e) => e.slug));
  const badgeBySlug = new Map(visibleExams.map((e) => [e.slug, e.badge]));

  const latest = allPapers
    .filter((p): p is typeof p & { date: string } => Boolean(p.published && p.date && visibleSlugs.has(p.exam)))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  if (latest.length === 0) return null;

  return (
    <section className="bg-ink py-14 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Latest Free Papers</h2>
            <p className="mt-2 text-sm text-white/60">Recently added previous-year question papers.</p>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-1 text-sm font-semibold text-mint hover:underline"
          >
            View all papers
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((paper) => (
            <li key={paper.path} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-mint">
                  {badgeBySlug.get(paper.exam) ?? paper.exam}
                </span>
                <span className="text-xs text-white/50">{formatDisplayDate(paper.date)}</span>
              </div>
              <p className="text-sm font-medium leading-snug text-white">{paper.title}</p>
              <a
                href={paper.path}
                download
                className="mt-auto inline-flex w-fit items-center rounded-full bg-mint px-3 py-1.5 text-xs font-semibold text-black hover:bg-mint-dark"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
