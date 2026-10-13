import Hero from "@/components/sections/Hero";
import CredibilityBar from "@/components/sections/CredibilityBar";
import CoursesPreview from "@/components/sections/CoursesPreview";
import ShortsCarousel from "@/components/sections/ShortsCarousel";
import InstitutesSection from "@/components/sections/InstitutesSection";
import GetTheApp from "@/components/sections/GetTheApp";

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <CoursesPreview />
      <ShortsCarousel />
      <InstitutesSection />
      <GetTheApp />
    </>
  );
}
