"use client";

import { useRef, useState } from "react";

interface LocalVideoPlayerProps {
  src: string;
  ariaLabel?: string;
  aspect?: "video" | "short"; // 16:9 vs 9:16
}

/**
 * Plays a local .mp4: poster frame (via a #t=0.1 fragment, no separate
 * image asset), a large play button, no autoplay. Clicking plays WITH
 * sound — the play() call happens directly inside the click handler so
 * it counts as a user gesture. Once playing, native controls take over
 * (pause/seek/volume/fullscreen).
 */
export default function LocalVideoPlayer({ src, ariaLabel = "Play video", aspect = "video" }: LocalVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const aspectClass = aspect === "short" ? "aspect-[9/16]" : "aspect-video";

  function handlePlay() {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      // Rejected (e.g. autoplay policy) — stay on the poster, never throw.
    });
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-black shadow-lg ${aspectClass}`}>
      <video
        ref={videoRef}
        src={`${src}#t=0.1`}
        preload="metadata"
        controls={playing}
        playsInline
        className="h-full w-full object-contain"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={ariaLabel}
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
  );
}
