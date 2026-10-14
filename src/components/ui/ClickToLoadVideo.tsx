"use client";

import { useState } from "react";

interface ClickToLoadVideoProps {
  youtubeId: string;
  title?: string;
  aspect?: "video" | "short"; // 16:9 vs 9:16
  label?: string; // small badge shown on the thumbnail, e.g. "Course"
  // Controlled mode: pass both to let a parent (e.g. a carousel) own
  // whether the player is loaded, so it can unload it again (navigate
  // away = stop). Omit both for normal uncontrolled usage.
  loaded?: boolean;
  onPlay?: () => void;
}

export default function ClickToLoadVideo({
  youtubeId,
  title,
  aspect = "video",
  label,
  loaded: loadedProp,
  onPlay,
}: ClickToLoadVideoProps) {
  const [internalLoaded, setInternalLoaded] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const isControlled = loadedProp !== undefined;
  const loaded = isControlled ? loadedProp : internalLoaded;
  const aspectClass = aspect === "short" ? "aspect-[9/16]" : "aspect-video";

  function handlePlay() {
    if (!isControlled) setInternalLoaded(true);
    onPlay?.();
  }

  if (loaded) {
    return (
      <div className={`${aspectClass} w-full overflow-hidden rounded-xl bg-black`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
          title={title || "Video"}
          className="h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          loading="lazy"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={`group relative ${aspectClass} w-full overflow-hidden rounded-xl bg-black`}
      aria-label={`Play video${title ? `: ${title}` : ""}`}
    >
      {posterFailed ? (
        <div className="absolute inset-0 bg-teal" aria-hidden="true" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
          alt={title || "Video thumbnail"}
          loading="lazy"
          onError={() => setPosterFailed(true)}
          className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-60"
        />
      )}
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
