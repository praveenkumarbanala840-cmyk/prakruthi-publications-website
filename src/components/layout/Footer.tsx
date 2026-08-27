import Link from "next/link";
import Container from "@/components/ui/Container";
import { exams, siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy/10 bg-navy text-white/80">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
              PP
            </span>
            {siteConfig.name}
          </div>
          <p className="mt-3 text-sm leading-relaxed">
            Coaching for DSC, APSET, DEO, CDPO, HWO and Gurukulalu government
            exams in Andhra Pradesh.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
            Courses
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {exams.map((exam) => (
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
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
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
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-gold">
            Contact
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{siteConfig.contactEmail || "Email coming soon"}</li>
            <li>{siteConfig.phone || "Phone coming soon"}</li>
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
