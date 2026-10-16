import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { visibleExams } from "@/lib/site-config";

export default function CoursesPreview() {
  return (
    <section id="choose-your-exam" className="scroll-mt-16 py-16">
      <Container>
        <Reveal variant="fade-up" className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
            Choose Your Exam
          </h2>
          <p className="mt-3 text-sm text-charcoal/60 sm:text-base">
            Structured courses for major Andhra Pradesh and Telangana government exams.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleExams.map((exam, i) => {
            const href = exam.hasFullCoursePage ? `/courses/${exam.slug}` : "/resources";
            return (
              <Reveal key={exam.slug} variant="fade-up" index={i} className="h-full">
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm transition-all motion-safe:hover:-translate-y-1 hover:border-teal hover:shadow-md motion-safe:active:scale-[0.98]"
                >
                  <div className="flex h-12 w-fit min-w-12 items-center justify-center rounded-xl bg-charcoal/5 px-2 font-display text-xs font-bold text-charcoal group-hover:bg-teal/10 group-hover:text-teal">
                    {exam.badge}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-charcoal">
                    {exam.name}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                    {exam.hasFullCoursePage ? "View Course" : "Learn More"}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
