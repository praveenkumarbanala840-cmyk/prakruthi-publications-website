import Hero from "@/components/sections/Hero";
import CoursesPreview from "@/components/sections/CoursesPreview";
import InstitutesSection from "@/components/sections/InstitutesSection";
import ShortsCarousel from "@/components/sections/ShortsCarousel";
import GetTheApp from "@/components/sections/GetTheApp";

export default function Home() {
  return (
    <>
      <Hero />
      <CoursesPreview />
      <InstitutesSection />
      <ShortsCarousel />
      <GetTheApp />
    </>
  );
}
