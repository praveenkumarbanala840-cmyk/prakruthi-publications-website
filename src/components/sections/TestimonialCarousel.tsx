"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/data/types";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  title?: string;
}

export default function TestimonialCarousel({
  testimonials,
  title = "What Our Students Say",
}: TestimonialCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || testimonials.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce((best, entry) =>
          entry.intersectionRatio > (best?.intersectionRatio ?? 0) ? entry : best
        , entries[0]);
        if (mostVisible?.isIntersecting) {
          const index = cardRefs.current.findIndex((el) => el === mostVisible.target);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { root: track, threshold: [0.6] }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [testimonials.length]);

  const scrollToIndex = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  if (testimonials.length === 0) {
    return (
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-navy sm:text-3xl">
            {title}
          </h2>
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-dashed border-navy/20 bg-white/60 p-8 text-center">
            <p className="text-sm text-navy/60">
              Real student stories are on their way — check back soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl font-bold text-navy sm:text-3xl">
          {title}
        </h2>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[10%] pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`flex w-[80%] shrink-0 snap-center flex-col rounded-2xl border p-6 shadow-sm transition-all duration-300 sm:w-[55%] lg:w-[38%] ${
                i === activeIndex
                  ? "scale-100 opacity-100 border-gold bg-white"
                  : "scale-95 opacity-60 border-navy/10 bg-white/70"
              }`}
            >
              {t.videoUrl ? (
                <video
                  src={t.videoUrl}
                  controls
                  className="mb-4 aspect-video w-full rounded-lg bg-navy/5 object-cover"
                />
              ) : (
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-sm font-bold text-navy">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-xs text-navy/60">
                      {t.exam.toUpperCase()}
                      {t.year ? ` · ${t.year}` : ""}
                    </p>
                  </div>
                </div>
              )}
              <p className="text-sm leading-relaxed text-charcoal/80">&ldquo;{t.quote}&rdquo;</p>
              {t.role && <p className="mt-3 text-xs font-semibold text-gold">{t.role}</p>}
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? "w-6 bg-gold" : "w-2 bg-navy/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
