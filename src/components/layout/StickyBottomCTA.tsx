import { LinkButton } from "@/components/ui/Button";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export default function StickyBottomCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/10 bg-white/95 backdrop-blur shadow-[0_-2px_12px_rgba(16,27,46,0.08)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-gold">
            PP
          </span>
          <span className="truncate text-sm font-semibold text-navy hidden sm:inline">
            {siteConfig.name}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-navy/15 text-navy hover:border-navy/40"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.01 2C6.48 2 2 6.35 2 11.73c0 1.9.55 3.68 1.5 5.19L2 22l5.27-1.37a10.4 10.4 0 0 0 4.74 1.14h.01c5.52 0 10-4.35 10-9.73C22 6.35 17.53 2 12.01 2Zm5.85 13.88c-.25.68-1.44 1.31-1.99 1.35-.51.05-1.03.24-3.46-.72-2.93-1.16-4.8-4.08-4.94-4.27-.15-.19-1.18-1.55-1.18-2.96 0-1.4.75-2.09 1.02-2.38.27-.28.58-.35.78-.35.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2.02.9 2.16.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.37-.44.5-.15.15-.3.31-.13.6.17.29.75 1.23 1.62 2 .35.32 3.42 1.86 3.53 2.02.11.15.05.62-.13.98Z" />
            </svg>
          </a>
          <LinkButton href={siteConfig.playStoreUrl} size="sm">
            Enroll / Get the App
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
