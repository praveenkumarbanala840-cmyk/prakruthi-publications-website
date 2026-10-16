"use client";

import { useMemo, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import ClickToLoadVideo from "@/components/ui/ClickToLoadVideo";
import Reveal from "@/components/ui/Reveal";
import { shortVideos, shortsHeading, shortsSubheading } from "@/data/videos";
import { siteConfig } from "@/lib/site-config";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

export default function ShortsCarousel() {
  const slides = useMemo(() => shortVideos.filter((v) => v.youtubeId), []);

  const trackRef = useRef<HTMLDivElement>(null);
  const scrollDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammaticScroll = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  // Only one slide's player is ever loaded at a time — navigating away
  // unloads it (equivalent to pausing: the iframe is removed).
  const [loadedIndex, setLoadedIndex] = useState<number | null>(null);

  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  if (slides.length === 0) return null;

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    isProgrammaticScroll.current = true;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  function navigateTo(index: number) {
    if (index === activeIndex) return;
    setActiveIndex(index);
    scrollToIndex(index);
    setLoadedIndex((prev) => (prev === index ? prev : null));
  }

  // Debounced scroll-settle handler: detects which card the user swiped
  // to and treats it the same as an arrow/dot navigation.
  function handleScroll() {
    if (isProgrammaticScroll.current) {
      isProgrammaticScroll.current = false;
    }
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
      if (closest !== activeIndex) navigateTo(closest);
    }, 120);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft" && activeIndex > 0) navigateTo(activeIndex - 1);
    if (e.key === "ArrowRight" && activeIndex < slides.length - 1) navigateTo(activeIndex + 1);
  }

  return (
    <section className="bg-ink py-14 sm:py-20">
      <Container>
        <Reveal variant="fade-up">
          <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">{shortsHeading}</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-white/60">{shortsSubheading}</p>
        </Reveal>

        <div
          role="region"
          aria-label="Short video clips"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="relative mt-10 focus:outline-none"
        >
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-[12vw] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((slide, i) => {
              const isActive = i === activeIndex;

              return (
                <div
                  key={slide.youtubeId ?? i}
                  className={`relative shrink-0 snap-center transition-all duration-300 ${
                    isActive ? "scale-100 opacity-100" : "scale-90 opacity-40"
                  }`}
                  style={{ width: "min(78vw, 300px)" }}
                >
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <ClickToLoadVideo
                      youtubeId={slide.youtubeId!}
                      title={`Clip ${i + 1}`}
                      aspect="short"
                      loaded={loadedIndex === i}
                      onPlay={() => setLoadedIndex(i)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => navigateTo(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                aria-label="Previous clip"
                className="absolute left-1 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 text-ink shadow-md transition-opacity hover:bg-white disabled:opacity-0 sm:flex"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => navigateTo(Math.min(slides.length - 1, activeIndex + 1))}
                disabled={activeIndex === slides.length - 1}
                aria-label="Next clip"
                className="absolute right-1 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 text-ink shadow-md transition-opacity hover:bg-white disabled:opacity-0 sm:flex"
              >
                <ChevronIcon direction="right" />
              </button>
            </>
          )}
        </div>

        {slides.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => navigateTo(i)}
                aria-label={`Go to clip ${i + 1}`}
                aria-current={i === activeIndex}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex ? "w-6 bg-mint" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {siteConfig.instagramUrl && (
          <div className="mt-8 flex justify-center">
            <LinkButton
              href={siteConfig.instagramUrl}
              variant="outline"
              size="md"
              className="border-white text-white hover:bg-white hover:text-ink"
            >
              Follow @prakruthipublications
            </LinkButton>
          </div>
        )}
      </Container>
    </section>
  );
}
