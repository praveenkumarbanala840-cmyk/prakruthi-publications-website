import Hero from "@/components/sections/Hero";
import CredibilityBar from "@/components/sections/CredibilityBar";
import CoursesPreview from "@/components/sections/CoursesPreview";
import ShortsCarousel from "@/components/sections/ShortsCarousel";
import InstitutesSection from "@/components/sections/InstitutesSection";
import Reviews from "@/components/sections/Reviews";
import Faq from "@/components/sections/Faq";
import GetTheApp from "@/components/sections/GetTheApp";
import { reviews } from "@/data/reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <CoursesPreview />
      <ShortsCarousel />
      <InstitutesSection />
      <Reviews reviews={reviews} />
      <Faq />
      <GetTheApp />
    </>
  );
}
