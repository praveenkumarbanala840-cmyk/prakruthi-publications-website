import Image from "next/image";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig, visibleExams } from "@/lib/site-config";

const PHOTO_MASK =
  "linear-gradient(to right, transparent 0%, black 20%), linear-gradient(to top, transparent 0%, black 16%)";

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
      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            <p className="inline-block rounded-full bg-mint/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-mint">
              {visibleExams.map((exam) => exam.shortName).join(" · ")} Coaching
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              {siteConfig.stats.studentsTrained} Students Trained for
              <span className="text-mint"> Government Exam Success</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">
              Prakruthi Publications provides structured, exam-focused coaching
              for Andhra Pradesh government exam aspirants — from syllabus to
              selection.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
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

          <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0 lg:max-w-md">
            <div className="text-center lg:text-left">
              <p className="font-display text-lg font-bold text-white">GS Rao</p>
              <p className="text-sm text-white/60">Psychology with GS Rao</p>
            </div>

            <div className="relative mt-4">
              <div
                className="absolute inset-0 -z-10 scale-110 rounded-full bg-mint/25 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="relative aspect-[1195/1316] overflow-hidden rounded-[2rem] ring-1 ring-mint/50 shadow-[0_0_50px_-5px_rgba(0,232,160,0.35)]"
                style={{
                  maskImage: PHOTO_MASK,
                  WebkitMaskImage: PHOTO_MASK,
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}
              >
                <Image
                  src="/brand/professor-hero.webp"
                  alt="GS Rao - Psychology with GS Rao"
                  fill
                  priority
                  sizes="(max-width: 1024px) 320px, 420px"
                  className="object-contain"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-teal/15 mix-blend-soft-light"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
