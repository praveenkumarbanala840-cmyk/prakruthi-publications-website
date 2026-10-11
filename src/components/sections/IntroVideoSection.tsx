"use client";

import { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { introVideo, introHeading } from "@/data/videos";

export default function IntroVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!introVideo.src) return null;

  function handlePlay() {
    const el = videoRef.current;
    if (!el) return;
    // Called directly inside the click handler so this counts as a user
    // gesture — required for unmuted playback to be allowed.
    el.play().catch(() => {
      // Rejected (e.g. autoplay policy) — stay on the poster, never throw.
    });
  }

  return (
    <section className="bg-surface py-14 sm:py-20">
      <Container>
        <h2 className="text-center font-display text-2xl font-bold text-charcoal sm:text-3xl">
          {introHeading}
        </h2>

        <div className="relative mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-lg">
          <video
            ref={videoRef}
            src={`${introVideo.src}#t=0.1`}
            preload="metadata"
            controls={playing}
            playsInline
            className="aspect-video w-full object-contain"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play intro video"
              className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/25"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-transform hover:scale-105 sm:h-24 sm:w-24">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
