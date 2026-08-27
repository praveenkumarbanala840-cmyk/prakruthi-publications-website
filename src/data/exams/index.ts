import { dsc } from "@/data/exams/dsc";
import { apset } from "@/data/exams/apset";
import { deo } from "@/data/exams/deo";
import { cdpo } from "@/data/exams/cdpo";
import { hwo } from "@/data/exams/hwo";
import { gurukulalu } from "@/data/exams/gurukulalu";
import type { ExamContent } from "@/data/types";

export const allExams: ExamContent[] = [dsc, apset, deo, cdpo, hwo, gurukulalu];

export function getExamBySlug(slug: string): ExamContent | undefined {
  return allExams.find((exam) => exam.slug === slug);
}

export { dsc, apset, deo, cdpo, hwo, gurukulalu };
