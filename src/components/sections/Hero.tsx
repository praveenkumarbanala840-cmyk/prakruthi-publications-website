import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig, visibleExams } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #00E8A0 0%, transparent 45%), radial-gradient(circle at 80% 60%, #00E8A0 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-block rounded-full bg-mint/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-mint">
            {visibleExams.map((exam) => exam.shortName).join(" · ")} Coaching
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {siteConfig.stats.studentsTrained} Students Trained for
            <span className="text-mint"> Government Exam Success</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Prakruthi Publications provides structured, exam-focused coaching
            for Andhra Pradesh government exam aspirants — from syllabus to
            selection.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LinkButton href={siteConfig.playStoreUrl} size="lg">
              Enroll Now
            </LinkButton>
            <LinkButton
              href="#choose-your-exam"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-ink"
            >
              View Courses
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
