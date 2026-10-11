"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { institutes, type InstitutePoster } from "@/data/institutes";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (institutes.length === 0) return null;

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[0] as HTMLElement | undefined;
    const step = card ? card.clientWidth + 16 : 240;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section className="bg-ink py-14 sm:py-20">
      <Container>
        <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
          Where GS Rao Has Taught
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-white/60">
          A selection of institutes across Andhra Pradesh and Telangana.
        </p>

        <div className="relative mt-10">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {institutes.map((item, i) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`View larger: ${item.alt}`}
                className="relative aspect-[3/4] w-[min(70vw,260px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-mint/40 bg-ink-light shadow-lg sm:w-60"
              >
                <Image
                  src={item.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="260px"
                  loading="lazy"
                  className="scale-110 object-cover blur-[24px] brightness-[0.4]"
                />
                <div className="absolute inset-0 p-3">
                  <div className="relative h-full w-full">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 70vw, 240px"
                      loading="lazy"
                      className="object-contain"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {institutes.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Scroll institutes left"
                className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition-colors hover:bg-white md:flex"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Scroll institutes right"
                className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition-colors hover:bg-white md:flex"
              >
                <ChevronIcon direction="right" />
              </button>
            </>
          )}
        </div>
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
