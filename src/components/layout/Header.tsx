"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { visibleExams, siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-sm font-bold text-black">
            PP
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setCoursesOpen(true)}
            onMouseLeave={() => setCoursesOpen(false)}
          >
            <button
              className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
              aria-expanded={coursesOpen}
            >
              Courses
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {coursesOpen && (
              <div className="absolute left-0 top-full w-64 rounded-xl border border-white/10 bg-ink-light p-2 shadow-lg">
                {visibleExams.map((exam) => (
                  <Link
                    key={exam.slug}
                    href={exam.hasFullCoursePage ? `/courses/${exam.slug}` : "/resources"}
                    className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10"
                  >
                    {exam.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}

          <LinkButton href={siteConfig.playStoreUrl} size="sm" className="ml-2">
            Enroll Now
          </LinkButton>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {menuOpen && (
        <div className="border-t border-white/10 bg-ink md:hidden">
          <Container className="flex flex-col gap-1 py-3">
            <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-white/50">
              Courses
            </p>
            {visibleExams.map((exam) => (
              <Link
                key={exam.slug}
                href={exam.hasFullCoursePage ? `/courses/${exam.slug}` : "/resources"}
                className="rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {exam.name}
              </Link>
            ))}
            <div className="my-1 border-t border-white/10" />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <LinkButton href={siteConfig.playStoreUrl} size="sm" className="mt-2">
              Enroll Now
            </LinkButton>
          </Container>
        </div>
      )}
    </header>
  );
}
