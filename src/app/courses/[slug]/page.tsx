import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePageTemplate from "@/components/templates/CoursePageTemplate";
import { allExams, getExamBySlug } from "@/data/exams";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return allExams.filter((exam) => exam.hasFullCoursePage).map((exam) => ({ slug: exam.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam || !exam.hasFullCoursePage) return {};

  const region = exam.slug.startsWith("ts-") ? "Telangana" : "Andhra Pradesh";
  const tgAlias = exam.shortName.startsWith("TS ") ? exam.shortName.replace("TS ", "TG ") : null;
  const aliasNote = tgAlias ? ` Also searched as ${tgAlias}.` : "";

  const title = `${exam.name} Coaching`;
  const description = exam.minimalCourse
    ? `${exam.name} coaching from Prakruthi Publications for ${exam.shortName} aspirants in ${region}.${aliasNote}`
    : `${exam.name} coaching from Prakruthi Publications — syllabus coverage, batch timings, and exam-focused preparation for ${exam.shortName} aspirants in ${region}.${aliasNote}`;

  return {
    title,
    description,
    alternates: { canonical: `/courses/${exam.slug}` },
    openGraph: {
      title,
      description,
      url: `/courses/${exam.slug}`,
      siteName: siteConfig.name,
      images: [{ url: "/og/share.png", width: 1200, height: 630, alt: siteConfig.name }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og/share.png"],
    },
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exam = getExamBySlug(slug);

  if (!exam || !exam.hasFullCoursePage) {
    notFound();
  }

  return <CoursePageTemplate exam={exam} />;
}
