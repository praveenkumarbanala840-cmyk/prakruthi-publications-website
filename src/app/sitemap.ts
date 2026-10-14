import type { MetadataRoute } from "next";
import { siteConfig, visibleExams } from "@/lib/site-config";
import { getExamBySlug } from "@/data/exams";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;

  const staticRoutes = ["", "/about", "/contact", "/resources"].map((path) => ({
    url: `${base}${path}`,
  }));

  const courseRoutes = visibleExams
    .filter((exam) => exam.hasFullCoursePage)
    .map((exam) => ({ url: `${base}/courses/${exam.slug}` }));

  const articleRoutes = visibleExams.flatMap((exam) => {
    const articles = getExamBySlug(exam.slug)?.availableArticles ?? [];
    return articles.map((article) => ({ url: `${base}/exams/${exam.slug}/${article}` }));
  });

  return [...staticRoutes, ...courseRoutes, ...articleRoutes];
}
