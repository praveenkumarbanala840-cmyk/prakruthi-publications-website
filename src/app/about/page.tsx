import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import InstitutesSection from "@/components/sections/InstitutesSection";
import AppCta from "@/components/sections/AppCta";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";
import { aboutBio } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — ${siteConfig.stats.yearsExperience} years of experience, ${siteConfig.stats.studentsSelected} selected, ${siteConfig.stats.studentsTrained} students trained.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink py-14 text-white sm:py-20">
        <Container className="max-w-2xl text-center">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">About {siteConfig.name}</h1>

          <Reveal variant="fade-up">
            {aboutBio.text && (
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75">{aboutBio.text}</p>
            )}

            <div className="mx-auto mt-8 flex max-w-md justify-center gap-8 sm:gap-12">
              {[
                { value: siteConfig.stats.yearsExperience, label: "Years Experience" },
                { value: siteConfig.stats.studentsSelected, label: "Selected" },
                { value: siteConfig.stats.studentsTrained, label: "Trained" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl font-extrabold text-mint sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <InstitutesSection />

      <section className="bg-surface py-14">
        <Container className="max-w-2xl text-center">
          <Reveal variant="fade-up">
            <AppCta />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
