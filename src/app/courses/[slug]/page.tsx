import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePageTemplate from "@/components/templates/CoursePageTemplate";
import { allExams, getExamBySlug } from "@/data/exams";

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
