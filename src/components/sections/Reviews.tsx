"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import type { Review } from "@/data/reviews";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true" className="text-mint/20">
      <path
        d="M0 16.5C0 7.5 5.5 1.5 14 0l1.5 4C9 5.5 6.5 9 6 13.5h8V28H0V16.5Zm20 0C20 7.5 25.5 1.5 34 0l1.5 4C29 5.5 26.5 9 26 13.5h8V28H20V16.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Star({ fraction }: { fraction: number }) {
  const clamped = Math.max(0, Math.min(1, fraction));
  return (
    <span className="relative inline-block h-4 w-4">
      <svg viewBox="0 0 20 20" className="absolute inset-0 h-full w-full text-white/25" aria-hidden="true">
        <path
          d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L10 1.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${clamped * 100}%` }}>
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-mint" aria-hidden="true">
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L10 1.5z" fill="currentColor" />
        </svg>
      </span>
    </span>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} fraction={rating - i} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="relative flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-md transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(0,232,160,0.18)]">
      <QuoteIcon />
      <p className="line-clamp-5 flex-1 text-sm leading-relaxed text-white/85">{review.review}</p>

      <div className="flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-mint/60">
          <Image src={review.photo} alt={review.name} fill sizes="48px" className="object-cover" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">{review.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {review.exam && (
              <span className="rounded-full bg-mint/15 px-2.5 py-0.5 text-[10px] font-semibold text-mint">
                {review.exam}
              </span>
            )}
            {typeof review.rating === "number" && <StarRow rating={review.rating} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const items = reviews.filter((r) => r.review.trim().length > 0);

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sidePad, setSidePad] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      const card = track!.children[0] as HTMLElement | undefined;
      if (!card) return;
      setSidePad(Math.max(0, (track!.clientWidth - card.clientWidth) / 2));
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [items.length]);

  // Auto-scroll to the next card every few seconds; paused on hover/touch
  // (see the handlers on the track below) and whenever the user prefers
  // reduced motion.
  useEffect(() => {
    if (isPaused || prefersReducedMotion || items.length <= 1) return;
    const id = setInterval(() => {
      goTo((activeIndex + 1) % items.length);
    }, 4000);
    return () => clearInterval(id);
    // goTo is a plain function (not memoized) that only reads activeIndex
    // via its own parameter, so omitting it here avoids re-subscribing the
    // timer on every unrelated render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, activeIndex, items.length, prefersReducedMotion]);

  if (items.length === 0) return null;

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    const track = trackRef.current;
    const card = track?.children[clamped] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    setActiveIndex(clamped);
  }

  function handleScroll() {
    if (scrollDebounce.current) clearTimeout(scrollDebounce.current);
    scrollDebounce.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const elCenter = el.offsetLeft + el.clientWidth / 2;
        const dist = Math.abs(elCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    }, 100);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    if (e.key === "ArrowRight") goTo(activeIndex + 1);
  }

  return (
    <section className="bg-ink py-14 sm:py-20">
      <Container>
        <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">Student Reviews</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-white/60">What our students say in their own words.</p>

        <div className="relative mt-10">
          <div
            ref={trackRef}
            role="region"
            aria-label="Student reviews"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            style={{ paddingLeft: sidePad, paddingRight: sidePad }}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth focus:outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((review) => (
              <div key={review.photo} className="w-[82vw] max-w-[320px] shrink-0 snap-center sm:w-[300px]">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {items.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous review"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-mint bg-black/30 text-mint transition-colors hover:bg-mint hover:text-ink focus-visible:bg-mint focus-visible:text-ink focus-visible:outline-none disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === items.length - 1}
              aria-label="Next review"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-mint bg-black/30 text-mint transition-colors hover:bg-mint hover:text-ink focus-visible:bg-mint focus-visible:text-ink focus-visible:outline-none disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
