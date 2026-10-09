"use client";

import { useState } from "react";

interface ClickToLoadVideoProps {
  youtubeId: string;
  title?: string;
  aspect?: "video" | "short"; // 16:9 vs 9:16
  label?: string; // small badge shown on the thumbnail, e.g. "Course"
}

export default function ClickToLoadVideo({
  youtubeId,
  title,
  aspect = "video",
  label,
}: ClickToLoadVideoProps) {
  const [loaded, setLoaded] = useState(false);
  const aspectClass = aspect === "short" ? "aspect-[9/16]" : "aspect-video";

  if (loaded) {
    return (
      <div className={`${aspectClass} w-full overflow-hidden rounded-xl bg-black`}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={title || "Video"}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className={`group relative ${aspectClass} w-full overflow-hidden rounded-xl bg-black`}
      aria-label={`Play video${title ? `: ${title}` : ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title || "Video thumbnail"}
        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-60"
      />
      {label && (
        <span className="absolute left-3 top-3 rounded-full bg-mint px-3 py-1 text-xs font-semibold text-black">
          {label}
        </span>
      )}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint text-black shadow-lg transition-transform group-hover:scale-110">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      {title && (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-sm font-medium text-white">
          {title}
        </span>
      )}
    </button>
  );
}
