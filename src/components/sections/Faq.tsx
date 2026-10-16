import Link from "next/link";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { faqs } from "@/data/faqs";

const LINK_CLASS = "font-semibold text-mint hover:underline";

function splitOnce(text: string, marker: string): [string, string] {
  const idx = text.indexOf(marker);
  if (idx === -1) return [text, ""];
  return [text.slice(0, idx), text.slice(idx + marker.length)];
}

// Answers are stored as plain verbatim strings in src/data/faqs.ts; a
// few need specific words turned into links sourced from siteConfig.
// Splitting the stored string at render time (rather than hardcoding
// the surrounding text here) keeps the rendered copy guaranteed
// identical to the verbatim text in the data file.
function renderAnswer(question: string, answer: string) {
  if (question === "How do I join?") {
    const [before, rest] = splitOnce(answer, "Google Play Store");
    const [mid, after] = splitOnce(rest, "message us on WhatsApp");
    return (
      <>
        {before}
        <a href={siteConfig.playStoreUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          Google Play Store
        </a>
        {mid}
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          message us on WhatsApp
        </a>
        {after}
      </>
    );
  }

  if (question === "Where can I find previous papers and the syllabus?") {
    const [before, rest] = splitOnce(answer, "exam page");
    const [mid, after] = splitOnce(rest, "AP DSC page");
    return (
      <>
        {before}
        <Link href="/resources" className={LINK_CLASS}>
          exam page
        </Link>
        {mid}
        <Link href="/courses/ap-dsc" className={LINK_CLASS}>
          AP DSC page
        </Link>
        {after}
      </>
    );
  }

  if (question === "How do I contact you?") {
    let rest = answer;
    interface LinkPart {
      label: string;
      href: string;
      internal?: boolean;
      external?: boolean;
    }
    const parts: (string | LinkPart)[] = [];

    const addLink = (marker: string, link: LinkPart | null) => {
      const [before, after] = splitOnce(rest, marker);
      parts.push(before);
      parts.push(link ?? marker);
      rest = after;
    };

    addLink(
      "Email",
      siteConfig.contactEmail ? { label: "Email", href: `mailto:${siteConfig.contactEmail}` } : null
    );
    addLink(
      "call",
      siteConfig.contactPhone
        ? { label: "call", href: `tel:${siteConfig.contactPhone.replace(/\s+/g, "")}` }
        : null
    );
    addLink(
      "WhatsApp",
      siteConfig.whatsappNumber ? { label: "WhatsApp", href: whatsappLink(), external: true } : null
    );
    addLink("Contact page", { label: "Contact page", href: "/contact", internal: true });
    parts.push(rest);

    return (
      <>
        {parts.map((part, i) => {
          if (typeof part === "string") return <span key={i}>{part}</span>;
          if (part.internal) {
            return (
              <Link key={i} href={part.href} className={LINK_CLASS}>
                {part.label}
              </Link>
            );
          }
          if (part.external) {
            return (
              <a key={i} href={part.href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                {part.label}
              </a>
            );
          }
          return (
            <a key={i} href={part.href} className={LINK_CLASS}>
              {part.label}
            </a>
          );
        })}
      </>
    );
  }

  return answer;
}

export default function Faq() {
  if (faqs.length === 0) return null;

  return (
    <section className="bg-ink py-14 sm:py-20">
      <Container className="max-w-3xl">
        <Reveal variant="fade-up">
          <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <Reveal variant="fade-up" className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/10 bg-white/5 open:border-mint/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-base font-bold text-white marker:content-none sm:text-lg">
                {faq.question}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-mint transition-transform duration-200 group-open:rotate-180"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="faq-answer px-5 pb-5 text-sm leading-relaxed text-white/75 sm:text-base">
                {renderAnswer(faq.question, faq.answer)}
              </p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
