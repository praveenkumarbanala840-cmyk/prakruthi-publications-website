import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #C9A227 0%, transparent 45%), radial-gradient(circle at 80% 60%, #C9A227 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <p className="inline-block rounded-full bg-gold/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-gold">
            DSC · APSET · DEO · CDPO · HWO · Gurukulalu Coaching
          </p>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {siteConfig.stats.studentsTrained} Students Trained for
            <span className="text-gold"> Government Exam Success</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Prakruthi Publications provides structured, exam-focused coaching
            for Andhra Pradesh government exam aspirants — from syllabus to
            selection.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/courses/dsc" size="lg">
              View Courses
            </LinkButton>
            <LinkButton href={siteConfig.playStoreUrl} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy">
              Get the App
            </LinkButton>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/40">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 16l5-4 3 3 3-2 5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <p className="text-xs">Professor photo coming soon</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
