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

  const title = `${exam.name} Coaching`;
  const description = `${exam.name} coaching from Prakruthi Publications — syllabus coverage, batch timings, and exam-focused preparation for ${exam.shortName} aspirants in Andhra Pradesh.`;

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
