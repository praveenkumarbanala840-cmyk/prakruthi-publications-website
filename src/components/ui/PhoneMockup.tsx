"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { appScreenshots } from "@/data/appScreenshots";

/**
 * A generic, hand-drawn phone frame (no real device brand) with a soft mint
 * glow and a gentle floating animation. Shows real app screenshots as a
 * swipeable row when any are listed in appScreenshots.ts, otherwise falls
 * back to the logo + wordmark on a dark teal gradient. Never draws fake
 * app UI.
 */
export default function PhoneMockup() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasScreenshots = appScreenshots.length > 0;

  useEffect(() => {
    return () => {
      if (scrollDebounce.current) clearTimeout(scrollDebounce.current);
    };
  }, []);

  function handleScroll() {
    if (scrollDebounce.current) clearTimeout(scrollDebounce.current);
    scrollDebounce.current = setTimeout(() => {
      const track = trackRef.current;
      if (!track) return;
      const index = Math.round(track.scrollLeft / track.clientWidth);
      setActiveIndex(Math.max(0, Math.min(appScreenshots.length - 1, index)));
    }, 100);
  }

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        {/* Soft mint glow behind the phone */}
        <div
          className="absolute left-1/2 top-1/2 -z-10 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/25 blur-3xl"
          aria-hidden="true"
        />

        <div className="animate-float w-[220px] sm:w-[260px]">
          {/* Phone bezel */}
          <div className="relative aspect-[9/19] w-full rounded-[2.2rem] border-[6px] border-charcoal/80 bg-ink shadow-2xl ring-1 ring-white/10">
            {/* Camera dot */}
            <div
              className="absolute left-1/2 top-2 z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-black/60"
              aria-hidden="true"
            />

            {/* Screen */}
            <div className="absolute inset-[6px] overflow-hidden rounded-[1.6rem]">
              {hasScreenshots ? (
                <div
                  ref={trackRef}
                  onScroll={handleScroll}
                  className="flex h-full w-full snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {appScreenshots.map((file) => (
                    <div key={file} className="relative h-full w-full shrink-0 snap-center">
                      <Image src={`/app-screenshots/${file}`} alt="" fill sizes="260px" className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-teal-dark to-ink p-4 text-center">
                  <Image src="/brand/logo.png" alt="" width={56} height={56} className="h-14 w-14 rounded-full" />
                  <p className="font-display text-xs font-bold leading-snug text-white">Prakruthi Publications</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {hasScreenshots && appScreenshots.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {appScreenshots.map((file, i) => (
            <span
              key={file}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? "w-4 bg-mint" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
