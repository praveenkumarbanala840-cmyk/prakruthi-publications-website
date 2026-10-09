"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/data/types";

const AUTO_ROTATE_MS = 6000;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill={i < count ? "#70C828" : "none"}
          stroke={i < count ? "#70C828" : "currentColor"}
          strokeWidth="1.2"
          className={i < count ? "" : "text-charcoal/20"}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6L1.4 7.7l6-.7z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reviews.length <= 1 || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, AUTO_ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reviews.length, paused]);

  if (reviews.length === 0) return null;

  const current = reviews[index];
  const goPrev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const goNext = () => setIndex((i) => (i + 1) % reviews.length);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl font-bold text-charcoal sm:text-3xl">
          Student Reviews
        </h2>

        <div
          className="relative mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <div className="rounded-2xl border border-charcoal/10 bg-surface p-6 sm:p-8">
            <Stars count={current.stars} />
            <p className="mt-4 text-base leading-relaxed text-charcoal/85">
              &ldquo;{current.quote}&rdquo;
            </p>
            <p className="mt-4 text-sm font-semibold text-charcoal">
              {current.name}
              <span className="font-normal text-charcoal/60"> &middot; {current.exam}</span>
            </p>
          </div>

          {reviews.length > 1 && (
            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal hover:border-teal hover:text-teal"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M11 1 3 7l8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-6 bg-teal" : "w-2 bg-charcoal/20"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/15 text-charcoal hover:border-teal hover:text-teal"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 1l8 6-8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
