"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { institutes, type InstitutePoster } from "@/data/institutes";

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

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: InstitutePoster[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const item = items[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && index > 0) onNavigate(index - 1);
      if (e.key === "ArrowRight" && index < items.length - 1) onNavigate(index + 1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, items.length, onClose, onNavigate]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta > 0 && index > 0) onNavigate(index - 1);
    if (delta < 0 && index < items.length - 1) onNavigate(index + 1);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <CloseIcon />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(index - 1);
        }}
        disabled={index === 0}
        aria-label="Previous institute"
        className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-opacity hover:bg-white/20 disabled:opacity-0 sm:left-4"
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(index + 1);
        }}
        disabled={index === items.length - 1}
        aria-label="Next institute"
        className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-opacity hover:bg-white/20 disabled:opacity-0 sm:right-4"
      >
        <ChevronIcon direction="right" />
      </button>

      <div className="relative h-[90vh] w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <Image src={item.src} alt={item.alt} fill sizes="90vw" className="object-contain" />
      </div>
    </div>
  );
}

export default function InstitutesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sidePad, setSidePad] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Pads the track so the first and last cards can also scroll to center.
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
  }, []);

  if (institutes.length === 0) return null;

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(institutes.length - 1, index));
    const track = trackRef.current;
    const card = track?.children[clamped] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    setActiveIndex(clamped);
  }

  // Debounced scroll-settle handler: follows the card closest to center,
  // whether the user dragged the scrollbar, swiped, or used the buttons.
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
    <section className="bg-ink py-8">
      <Container>
        <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
          Where GS Rao Has Taught
        </h2>
        <p className="mx-auto mt-1 max-w-md text-center text-sm text-white/60">
          A selection of institutes across Andhra Pradesh and Telangana.
        </p>

        <div
          ref={trackRef}
          role="region"
          aria-label="Institute posters"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          style={{ paddingLeft: sidePad, paddingRight: sidePad }}
          className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden scroll-smooth focus:outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {institutes.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`View larger: ${item.alt}`}
                className={`relative aspect-[3/4] w-[min(58vw,210px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-mint/40 bg-ink-light shadow-lg transition-all duration-300 sm:w-[200px] ${
                  isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"
                }`}
              >
                <Image
                  src={item.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="210px"
                  loading="lazy"
                  className="scale-110 object-cover blur-[24px] brightness-[0.4]"
                />
                <div className="absolute inset-0 p-2.5">
                  <div className="relative h-full w-full">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 58vw, 200px"
                      loading="lazy"
                      className="object-contain"
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {institutes.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous institute"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-mint bg-black/30 text-mint transition-colors hover:bg-mint hover:text-ink focus-visible:bg-mint focus-visible:text-ink focus-visible:outline-none disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronIcon direction="left" />
            </button>
            <span className="min-w-[3.5rem] text-center text-sm font-medium tabular-nums text-white/70">
              {activeIndex + 1} / {institutes.length}
            </span>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === institutes.length - 1}
              aria-label="Next institute"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-mint bg-black/30 text-mint transition-colors hover:bg-mint hover:text-ink focus-visible:bg-mint focus-visible:text-ink focus-visible:outline-none disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        )}
      </Container>

      {lightboxIndex !== null && (
        <Lightbox
          items={institutes}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
