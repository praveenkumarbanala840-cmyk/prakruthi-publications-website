import Link from "next/link";
import Container from "@/components/ui/Container";
import { exams } from "@/lib/site-config";

export default function CoursesPreview() {
  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Choose Your Exam
          </h2>
          <p className="mt-3 text-sm text-navy/60 sm:text-base">
            Structured courses for every major Andhra Pradesh government exam.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => {
            const href = exam.hasFullCoursePage ? `/courses/${exam.slug}` : "/resources";
            return (
              <Link
                key={exam.slug}
                href={href}
                className="group flex flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 font-display text-sm font-bold text-navy group-hover:bg-gold/15 group-hover:text-gold">
                  {exam.badge}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">
                  {exam.name}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  {exam.hasFullCoursePage ? "View Course" : "Learn More"}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
