import Link from "next/link";
import Container from "@/components/ui/Container";
import { papersByExam } from "@/data/papers";
import type { ExamContent } from "@/data/types";

const PAPER_EXAM_SLUGS = ["ap-tet", "ap-dsc", "ts-tet", "ts-dsc", "hwo"] as const;

export function getPapers(slug: string) {
  return (PAPER_EXAM_SLUGS as readonly string[]).includes(slug)
    ? papersByExam(slug as (typeof PAPER_EXAM_SLUGS)[number])
    : [];
}

export default function CourseOverviewPapers({ exam }: { exam: ExamContent }) {
  const lessons = exam.lessons ?? [];
  const papers = getPapers(exam.slug).slice(0, 4);

  if (lessons.length === 0 && papers.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
              Course Overview
            </h2>
            {lessons.length > 0 ? (
              <ol className="mt-6 space-y-3">
                {lessons.map((lesson, i) => (
                  <li key={lesson} className="flex gap-3 text-sm text-charcoal/80 sm:text-base">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs font-bold text-teal">
                      {i + 1}
                    </span>
                    {lesson}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-6 text-sm text-charcoal/60">
                Lesson list is being finalized.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-charcoal/10 bg-surface p-6">
            <h3 className="font-display text-lg font-bold text-charcoal">
              Free: {exam.shortName} Previous Papers
            </h3>
            {papers.length > 0 ? (
              <ul className="mt-4 divide-y divide-charcoal/10">
                {papers.map((paper) => (
                  <li key={paper.path} className="flex items-center justify-between gap-3 py-3">
                    <p className="text-sm text-charcoal/80">{paper.title}</p>
                    <a
                      href={paper.path}
                      download
                      className="shrink-0 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-black hover:bg-mint-dark"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-charcoal/60">Coming soon.</p>
            )}
            <Link
              href={`/exams/${exam.slug}/previous-papers`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline"
            >
              View all
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
