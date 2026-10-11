import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { appScreenshots } from "@/data/appScreenshots";

const CHIPS = ["Online Classes", "Study Materials", "Practice Tests", "Exam Guidance"];

function findPlayBadge(): string | null {
  for (const name of ["google-play-badge.png", "google-play-badge.svg"]) {
    if (fs.existsSync(path.join(process.cwd(), "public", "brand", name))) {
      return `/brand/${name}`;
    }
  }
  return null;
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function GetTheApp() {
  const badgeSrc = findPlayBadge();

  return (
    <section className="bg-surface py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">Get the App</h2>
          <p className="mt-3 text-sm text-charcoal/60 sm:text-base">
            Download the Prakruthi Publications app to start learning anytime, anywhere.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-charcoal/10 bg-white px-4 py-1.5 text-xs font-semibold text-charcoal"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            {badgeSrc ? (
              <a
                href={siteConfig.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
              >
                <Image src={badgeSrc} alt="Get it on Google Play" width={202} height={60} className="h-14 w-auto" />
              </a>
            ) : (
              <LinkButton href={siteConfig.playStoreUrl} size="lg" className="gap-2">
                <PhoneIcon />
                Install the App
              </LinkButton>
            )}
          </div>
        </div>

        {appScreenshots.length > 0 && (
          <div className="mt-12 flex justify-center gap-4 overflow-x-auto px-4">
            {appScreenshots.map((file) => (
              <div
                key={file}
                className="shrink-0 overflow-hidden rounded-[2rem] border-4 border-charcoal/10 bg-white shadow-lg"
              >
                <Image
                  src={`/app-screenshots/${file}`}
                  alt=""
                  width={220}
                  height={460}
                  className="h-auto w-36 sm:w-40"
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
