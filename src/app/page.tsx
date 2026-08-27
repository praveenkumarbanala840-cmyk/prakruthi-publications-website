import Hero from "@/components/sections/Hero";
import CredibilityBar from "@/components/sections/CredibilityBar";
import CoursesPreview from "@/components/sections/CoursesPreview";
import SuccessStories from "@/components/sections/SuccessStories";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import { allExams } from "@/data/exams";

export default function Home() {
  const allTestimonials = allExams.flatMap((exam) => exam.testimonials);

  return (
    <>
      <Hero />
      <CredibilityBar />
      <CoursesPreview />
      <SuccessStories />
      <TestimonialCarousel testimonials={allTestimonials} />
    </>
  );
}
