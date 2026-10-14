import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { visibleExams, siteConfig, whatsappLink } from "@/lib/site-config";

function examListText() {
  const names = visibleExams.map((exam) => exam.shortName);
  return names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.01 2C6.48 2 2 6.35 2 11.73c0 1.9.55 3.68 1.5 5.19L2 22l5.27-1.37a10.4 10.4 0 0 0 4.74 1.14h.01c5.52 0 10-4.35 10-9.73C22 6.35 17.53 2 12.01 2Zm5.85 13.88c-.25.68-1.44 1.31-1.99 1.35-.51.05-1.03.24-3.46-.72-2.93-1.16-4.8-4.08-4.94-4.27-.15-.19-1.18-1.55-1.18-2.96 0-1.4.75-2.09 1.02-2.38.27-.28.58-.35.78-.35.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2.02.9 2.16.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.37-.44.5-.15.15-.3.31-.13.6.17.29.75 1.23 1.62 2 .35.32 3.42 1.86 3.53 2.02.11.15.05.62-.13.98Z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" />
    </svg>
  );
}

const SOCIAL_ICON_CLASS =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-mint hover:text-mint";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink pb-16 text-white/80 md:pb-0">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex min-w-0 items-center gap-2 font-display text-lg font-bold text-white">
            <Image src="/brand/logo.png" alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-full" />
            <span className="truncate">{siteConfig.name}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed">
            Coaching for {examListText()} government exams in Andhra Pradesh and Telangana.
          </p>

          <div className="mt-4 flex items-center gap-2">
            {siteConfig.instagramUrl && (
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={SOCIAL_ICON_CLASS}
              >
                <InstagramIcon />
              </a>
            )}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={SOCIAL_ICON_CLASS}
            >
              <WhatsAppIcon />
            </a>
            <a
              href={siteConfig.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
              className={SOCIAL_ICON_CLASS}
            >
              <PlayStoreIcon />
            </a>
            {siteConfig.youtubeUrl && (
              <a
                href={siteConfig.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className={SOCIAL_ICON_CLASS}
              >
                <YouTubeIcon />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-mint">
            Courses
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {visibleExams.map((exam) => (
              <li key={exam.slug}>
                <Link
                  href={exam.hasFullCoursePage ? `/courses/${exam.slug}` : "/resources"}
                  className="hover:text-white"
                >
                  {exam.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-mint">
            Site
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">About</Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-white">Resources</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-mint">
            Contact
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.contactEmail ? (
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white">
                  {siteConfig.contactEmail}
                </a>
              </li>
            ) : (
              <li>Email coming soon</li>
            )}
            {siteConfig.contactPhone ? (
              <li>
                <a
                  href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}
                  className="hover:text-white"
                >
                  {siteConfig.contactPhone}
                </a>
              </li>
            ) : (
              <li>Phone coming soon</li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-4">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-white/60 sm:flex-row">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
