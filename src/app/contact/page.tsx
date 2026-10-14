import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Prakruthi Publications on WhatsApp, Instagram, or the app.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-charcoal/10 bg-white">
        <Container className="py-10 sm:py-14">
          <h1 className="font-display text-3xl font-extrabold text-charcoal sm:text-4xl">
            Contact
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-charcoal/70 sm:text-base">
            The fastest way to reach us is WhatsApp. You can also enroll directly through the app.
          </p>
        </Container>
      </section>

      <Container className="max-w-2xl py-10">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <LinkButton href={siteConfig.playStoreUrl} size="lg">
              Enroll Now
            </LinkButton>
            <LinkButton href={whatsappLink()} variant="outline" size="lg">
              Message on WhatsApp
            </LinkButton>
          </div>

          <p className="text-sm text-charcoal/60">
            Also on Instagram:{" "}
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal hover:underline"
            >
              @prakruthipublications
            </a>
          </p>

          {(siteConfig.contactEmail || siteConfig.contactPhone) && (
            <ul className="space-y-1 text-sm text-charcoal/70">
              {siteConfig.contactEmail && (
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-semibold text-teal hover:underline"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </li>
              )}
              {siteConfig.contactPhone && (
                <li>
                  Phone:{" "}
                  <a
                    href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}
                    className="font-semibold text-teal hover:underline"
                  >
                    {siteConfig.contactPhone}
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
      </Container>
    </>
  );
}
