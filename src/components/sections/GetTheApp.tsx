import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import PhoneMockup from "@/components/ui/PhoneMockup";
import Reveal from "@/components/ui/Reveal";
import { siteConfig, whatsappLink } from "@/lib/site-config";

function findPlayBadge(): { src: string; width: number; height: number } | null {
  const candidates = [
    { name: "google-play-badge.webp" },
    { name: "google-play-badge.png" },
    { name: "google-play-badge.svg" },
  ];
  for (const { name } of candidates) {
    const full = path.join(process.cwd(), "public", "brand", name);
    if (fs.existsSync(full)) {
      // Real pixel dimensions for the known badge; next/image needs an
      // accurate width/height to size it correctly without distortion.
      const { width, height } = name === "google-play-badge.webp" ? { width: 1280, height: 380 } : { width: 202, height: 60 };
      return { src: `/brand/${name}`, width, height };
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

function OnlineClassesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-mint">
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 8.3 14.5 10l-4.5 1.7V8.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function StudyMaterialsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-mint">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15.5a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 0 4 22V5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 8h8M8 11h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PracticeTestsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-mint">
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.5 8.5 10 10l3-3M8.5 14.5 10 16l3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 8.5h.01M15 14.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ExamGuidanceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-mint">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.5 9.5 13 13l-3.5 1.5L11 11l3.5-1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const TILES = [
  { label: "Online Classes", Icon: OnlineClassesIcon },
  { label: "Study Materials", Icon: StudyMaterialsIcon },
  { label: "Practice Tests", Icon: PracticeTestsIcon },
  { label: "Exam Guidance", Icon: ExamGuidanceIcon },
];

export default function GetTheApp() {
  const badge = findPlayBadge();

  return (
    <section className="relative overflow-hidden bg-ink py-14 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #00E8A0 0%, transparent 45%), radial-gradient(circle at 80% 60%, #00E8A0 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <Reveal variant="fade-up">
              <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl lg:text-left">
                Get the App
              </h2>
            </Reveal>

            {/* Phone sits right after the heading on mobile; moves to its own
                column on desktop (see the lg:-only copy below). */}
            <div className="mt-8 flex justify-center lg:hidden">
              <PhoneMockup />
            </div>

            <Reveal variant="fade-up">
              <p className="mt-6 text-center text-sm text-white/70 sm:text-base lg:text-left">
                Download the Prakruthi Publications app to start learning anytime, anywhere.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {TILES.map(({ label, Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3"
                  >
                    <Icon />
                    <span className="text-xs font-semibold text-white sm:text-sm">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center lg:justify-start">
                {badge ? (
                  <a
                    href={siteConfig.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get it on Google Play"
                  >
                    <Image
                      src={badge.src}
                      alt="Get it on Google Play"
                      width={badge.width}
                      height={badge.height}
                      className="h-[52px] w-auto"
                    />
                  </a>
                ) : (
                  <LinkButton href={siteConfig.playStoreUrl} size="lg" className="gap-2">
                    <PhoneIcon />
                    Install the App
                  </LinkButton>
                )}
              </div>

              <p className="mt-4 text-center text-sm text-white/60 lg:text-left">
                Questions?{" "}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-mint hover:underline"
                >
                  Ask on WhatsApp
                </a>
              </p>
            </Reveal>
          </div>

          <div className="mt-10 hidden justify-center lg:mt-0 lg:flex">
            <PhoneMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
