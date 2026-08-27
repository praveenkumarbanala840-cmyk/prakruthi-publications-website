import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { articleTypes, siteConfig, whatsappLink } from "@/lib/site-config";
import type { ExamContent } from "@/data/types";

interface ArticlePageTemplateProps {
  exam: ExamContent;
  articleSlug: (typeof articleTypes)[number]["slug"];
  title: string;
  intro: string;
  sourceNote?: string;
  children: ReactNode;
}

export default function ArticlePageTemplate({
  exam,
  articleSlug,
  title,
  intro,
  sourceNote,
  children,
}: ArticlePageTemplateProps) {
  const otherArticles = articleTypes.filter((a) => a.slug !== articleSlug);

  return (
    <article>
      <section className="border-b border-navy/10 bg-white">
        <Container className="py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-navy/50">
            <Link href="/" className="hover:text-navy">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/courses/${exam.slug}`} className="hover:text-navy">{exam.shortName}</Link>
            <span className="mx-2">/</span>
            <span className="text-navy/70">{title}</span>
          </nav>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/75">{intro}</p>
          {sourceNote && (
            <p className="mt-3 max-w-2xl text-xs text-navy/50">{sourceNote}</p>
          )}
        </Container>
      </section>

      <Container className="max-w-3xl py-10">
        <div className="space-y-8">{children}</div>

        <div className="mt-12 rounded-2xl border border-gold/30 bg-navy p-6 text-center text-white sm:p-8">
          <p className="font-display text-lg font-bold sm:text-xl">
            Want guided, structured {exam.shortName} preparation?
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <LinkButton href={`/courses/${exam.slug}`} size="md">
              View {exam.shortName} Course
            </LinkButton>
            <LinkButton
              href={whatsappLink(`Hi, I have a question about ${exam.shortName} preparation.`)}
              variant="outline"
              size="md"
              className="border-white text-white hover:bg-white hover:text-navy"
            >
              Ask on WhatsApp
            </LinkButton>
          </div>
        </div>
      </Container>

      <section className="border-t border-navy/10 bg-white py-12">
        <Container>
          <h2 className="font-display text-lg font-bold text-navy">
            More {exam.shortName} Resources
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {otherArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/exams/${exam.slug}/${a.slug}`}
                className="group rounded-xl border border-navy/10 bg-cream p-4 transition-all hover:-translate-y-0.5 hover:border-gold"
              >
                <p className="font-semibold text-navy">{a.label}</p>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-gold">
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

      <section className="bg-navy py-12 text-center text-white">
        <Container>
          <h2 className="font-display text-xl font-bold sm:text-2xl">
            Ready to start your {exam.shortName} preparation?
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <LinkButton href={siteConfig.playStoreUrl} size="md">
              Enroll via App
            </LinkButton>
            <LinkButton
              href={`/courses/${exam.slug}`}
              variant="outline"
              size="md"
              className="border-white text-white hover:bg-white hover:text-navy"
            >
              View Course Details
            </LinkButton>
          </div>
        </Container>
      </section>
    </article>
  );
}
