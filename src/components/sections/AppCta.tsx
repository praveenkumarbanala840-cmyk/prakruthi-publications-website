import { LinkButton } from "@/components/ui/Button";
import { siteConfig, whatsappLink } from "@/lib/site-config";

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Join Today / Ask on WhatsApp CTA row, shared by course pages and About. */
export default function AppCta({ whatsappMessage }: { whatsappMessage?: string }) {
  return (
    <>
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center sm:gap-6">
        <LinkButton href={siteConfig.playStoreUrl} size="lg" className="w-full sm:w-auto">
          Join Today
        </LinkButton>
        <LinkButton href={whatsappLink(whatsappMessage)} variant="outline" size="lg" className="w-full sm:w-auto">
          Ask on WhatsApp
        </LinkButton>
      </div>
      <p className="mt-4 flex items-center justify-center gap-2 text-sm text-charcoal/60">
        <PhoneIcon />
        Courses are available in the Prakruthi Publications app on Google Play.
      </p>
    </>
  );
}
