import Link from "next/link";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import ClickToLoadVideo from "@/components/ui/ClickToLoadVideo";
import CourseOverviewPapers, { getPapers } from "@/components/sections/CourseOverviewPapers";
import ShortsRow from "@/components/sections/ShortsRow";
import ReviewsCarousel from "@/components/sections/ReviewsCarousel";
import PriceOfferSection from "@/components/sections/PriceOfferSection";
import HowToEnrollStrip from "@/components/sections/HowToEnrollStrip";
import { articleTypes, siteConfig, whatsappLink } from "@/lib/site-config";
import type { ExamContent } from "@/data/types";

export default function CoursePageTemplate({ exam }: { exam: ExamContent }) {
  const richHero = Boolean(exam.heroHeadline);
  const hasPreviousPapers =
    exam.availableArticles.includes("previous-papers") && getPapers(exam.slug).length > 0;
  const secondaryCta =
    exam.heroSecondaryCta ??
    (hasPreviousPapers
      ? { label: "Previous Papers", href: `/exams/${exam.slug}/previous-papers` }
      : { label: "WhatsApp Enquiry", href: whatsappLink(`Hi, I'd like details about the ${exam.shortName} course.`) });

  return (
    <>
      {/* Course hero */}
      <section className="bg-ink text-white">
        <Container className="py-14 sm:py-20">
          <p className="inline-block rounded-full bg-mint/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-mint">
            Course
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            {exam.heroHeadline ?? `${exam.name} Coaching`}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            {exam.overview ||
              `Structured, exam-focused coaching for ${exam.shortName} aspirants — from syllabus coverage to selection. Full course details are being finalized; enroll or message us on WhatsApp for the latest batch information.`}
          </p>

          {richHero && (
            <div className="mt-6 flex gap-6">
              {[
                { value: siteConfig.stats.yearsExperience, label: "Years Experience" },
                { value: siteConfig.stats.studentsSelected, label: "Selected" },
                { value: siteConfig.stats.studentsTrained, label: "Trained" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-xl font-extrabold text-mint">{stat.value}</p>
                  <p className="text-xs text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href={siteConfig.playStoreUrl} size="lg">
              Enroll Now
            </LinkButton>
            <LinkButton
              href={secondaryCta.href}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-ink"
            >
              {secondaryCta.label}
            </LinkButton>
          </div>
        </Container>
      </section>

      {/* Professor credibility block (merged into hero instead for rich/video courses) */}
      {!richHero && (
        <section className="border-b border-charcoal/10 bg-white">
          <Container className="flex flex-col items-center gap-6 py-8 text-center sm:flex-row sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-charcoal/5 text-charcoal/30">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-6">
                {[
                  { value: siteConfig.stats.yearsExperience, label: "Years Experience" },
                  { value: siteConfig.stats.studentsSelected, label: "Selected" },
                  { value: siteConfig.stats.studentsTrained, label: "Trained" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-xl font-extrabold text-charcoal">{stat.value}</p>
                    <p className="text-xs text-charcoal/60">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="text-sm font-semibold text-teal hover:underline">
                Meet our founder &rarr;
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Course intro video */}
      {exam.introVideo && (
        <section className="bg-white py-16">
          <Container className="max-w-2xl">
            <ClickToLoadVideo
              youtubeId={exam.introVideo.youtubeId}
              title={exam.introVideo.title}
              label="Course"
            />
          </Container>
        </section>
      )}

      {/* Course overview (lessons) + free previous papers */}
      <CourseOverviewPapers exam={exam} />

      {/* Syllabus breakdown — hidden entirely if there's neither real syllabus
          data nor a syllabus article page to point to, so it never links to
          a page that doesn't exist (e.g. TET has no syllabus-2026 page). */}
      {(exam.syllabus.length > 0 || exam.availableArticles.includes("syllabus-2026")) && (
        <section className="py-16">
          <Container>
            <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
              Syllabus Breakdown
            </h2>
            {exam.syllabus.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {exam.syllabus.map((section) => (
                  <div key={section.heading} className="rounded-2xl border border-charcoal/10 bg-white p-6">
                    <h3 className="font-display font-bold text-charcoal">{section.heading}</h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-charcoal/75">
                      {section.topics.map((topic) => (
                        <li key={topic} className="flex gap-2">
                          <span className="text-teal">&bull;</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-charcoal/20 bg-white/60 p-8 text-center">
                <p className="text-sm text-charcoal/60">
                  Detailed syllabus is being finalized. See the full{" "}
                  <Link href={`/exams/${exam.slug}/syllabus-2026`} className="font-semibold text-teal hover:underline">
                    {exam.shortName} Syllabus 2026
                  </Link>{" "}
                  breakdown, or message us on WhatsApp.
                </p>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Batch timings and fees */}
      <section className="bg-white py-16">
        <Container>
          <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
            Batch Timings &amp; Fees
          </h2>
          {exam.batches.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {exam.batches.map((batch, i) => (
                <div key={i} className="rounded-2xl border border-charcoal/10 bg-surface p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal">{batch.mode}</p>
                  <p className="mt-2 font-display text-lg font-bold text-charcoal">{batch.timing}</p>
                  <p className="mt-1 text-sm text-charcoal/70">{batch.fee}</p>
                  {batch.startDate && (
                    <p className="mt-2 text-xs text-charcoal/60">Starts {batch.startDate}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-charcoal/20 bg-surface p-8 text-center">
              <p className="text-sm text-charcoal/60">
                Batch schedule and fees are being finalized — message us on WhatsApp for the latest information.
              </p>
              <LinkButton
                href={whatsappLink(`Hi, I'd like to know the batch timings and fees for ${exam.shortName}.`)}
                variant="secondary"
                size="sm"
                className="mt-4"
              >
                Ask on WhatsApp
              </LinkButton>
            </div>
          )}
        </Container>
      </section>

      {/* Short clips */}
      <ShortsRow shorts={exam.shorts ?? []} />

      {/* Testimonials, filtered by exam */}
      <TestimonialCarousel
        testimonials={exam.testimonials}
        title={`What Our ${exam.shortName} Students Say`}
      />

      {/* Student reviews (star ratings) */}
      <ReviewsCarousel reviews={exam.reviews ?? []} />

      {/* FAQ */}
      <section className="bg-white py-16">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
            Frequently Asked Questions
          </h2>
          {exam.faq.length > 0 ? (
            <>
              <div className="mt-8 divide-y divide-charcoal/10">
                {exam.faq.map((item) => (
                  <details key={item.question} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-charcoal">
                      {item.question}
                      <span className="ml-4 shrink-0 text-teal transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/75">{item.answer}</p>
                  </details>
                ))}
              </div>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: exam.faq.map((item) => ({
                      "@type": "Question",
                      name: item.question,
                      acceptedAnswer: { "@type": "Answer", text: item.answer },
                    })),
                  }),
                }}
              />
            </>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-charcoal/20 bg-surface p-8 text-center">
              <p className="text-sm text-charcoal/60">
                FAQs for {exam.shortName} are coming soon — reach out on WhatsApp with your questions.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Price and offer */}
      <PriceOfferSection price={exam.price} offer={exam.offer} />

      {/* How to enroll */}
      <HowToEnrollStrip />

      {/* Related articles */}
      {(() => {
        const availableArticles = articleTypes.filter((a) => exam.availableArticles.includes(a.slug));
        if (availableArticles.length === 0) return null;
        return (
          <section className="py-16">
            <Container>
              <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
                {exam.shortName} Exam Resources
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {availableArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/exams/${exam.slug}/${article.slug}`}
                    className="group rounded-xl border border-charcoal/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-teal hover:shadow-md"
                  >
                    <p className="font-display font-bold text-charcoal">{article.label}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                      Read
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        );
      })()}

      {/* Final enroll CTA */}
      <section className="bg-ink py-14 text-center text-white">
        <Container>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Ready to start your {exam.shortName} preparation?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <LinkButton href={siteConfig.playStoreUrl} size="lg">
              Enroll Now
            </LinkButton>
            <LinkButton
              href={whatsappLink(`Hi, I'd like to enroll in the ${exam.shortName} course.`)}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-ink"
            >
              WhatsApp Us
            </LinkButton>
            {siteConfig.instagramUrl && (
              <LinkButton
                href={siteConfig.instagramUrl}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-ink"
              >
                Free content on Instagram
              </LinkButton>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
