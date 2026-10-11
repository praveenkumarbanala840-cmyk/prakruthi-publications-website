"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { testimonialVideos, testimonialsHeading, mutedAutoplay } from "@/data/videos";

type SlideState = "poster" | "playing" | "ended";

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={`ml-0.5 ${className}`}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
  );
}

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

function FullscreenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MuteIcon({ muted }: { muted: boolean }) {
  return muted ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
      <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
      <path
        d="M15.5 8.5a5 5 0 010 7M18 6a9 9 0 010 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarRow({ rating }: { rating: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex items-center justify-center gap-0.5" aria-label={`Rated ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill={n <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
          className={n <= rating ? "text-mint" : "text-charcoal/25"}
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function VideoTestimonials() {
  const slides = useMemo(() => testimonialVideos.filter((t) => t.src), []);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProgrammaticScroll = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [slideStates, setSlideStates] = useState<SlideState[]>(() => slides.map(() => "poster"));
  const [hasInteracted, setHasInteracted] = useState(false); // sound-mode: played at least one video
  const [isMuted, setIsMuted] = useState(mutedAutoplay);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const setSlideState = (index: number, state: SlideState) => {
    setSlideStates((prev) => {
      const next = [...prev];
      next[index] = state;
      return next;
    });
  };

  // Pause every video except the active one whenever the active index
  // changes, or when the carousel leaves view / the tab is hidden.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== activeIndex) video.pause();
    });
  }, [activeIndex]);

  useEffect(() => {
    if (!inView || !tabVisible) {
      videoRefs.current.forEach((video) => video?.pause());
    }
  }, [inView, tabVisible]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // mutedAutoplay mode: the active slide autoplays muted whenever it
  // changes, as long as the carousel is visible and motion isn't reduced.
  // This doesn't need a user gesture, so it's effect-driven rather than
  // tied to a click/touch handler.
  useEffect(() => {
    if (!mutedAutoplay || prefersReducedMotion || !inView || !tabVisible) return;
    const video = videoRefs.current[activeIndex];
    if (!video) return;
    video.muted = isMuted;
    video.currentTime = 0;
    video.play().catch(() => {
      // Rejected — leave it on the poster, never throw.
    });
  }, [activeIndex, inView, tabVisible, prefersReducedMotion, isMuted]);

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

  /**
   * Navigates to `index`. Called directly from click/touch handlers so the
   * sound-mode "autoplay next slide" call below runs inside the same user
   * gesture — a prerequisite for unmuted play() to be allowed.
   */
  function navigateTo(index: number) {
    if (index === activeIndex) return;
    setActiveIndex(index);
    scrollToIndex(index);

    if (!mutedAutoplay && hasInteracted) {
      const video = videoRefs.current[index];
      if (video) {
        video.muted = false;
        video.currentTime = 0;
        video.play().then(() => setSlideState(index, "playing")).catch(() => setSlideState(index, "poster"));
      }
    }
  }

  function handleManualPlay(index: number) {
    const video = videoRefs.current[index];
    if (!video) return;
    video.muted = mutedAutoplay ? isMuted : false;
    video
      .play()
      .then(() => {
        setSlideState(index, "playing");
        if (!mutedAutoplay) setHasInteracted(true);
      })
      .catch(() => setSlideState(index, "poster"));
  }

  function handleReplay(index: number) {
    const video = videoRefs.current[index];
    if (!video) return;
    video.currentTime = 0;
    handleManualPlay(index);
  }

  function toggleMute() {
    const next = !isMuted;
    setIsMuted(next);
    const video = videoRefs.current[activeIndex];
    if (video) video.muted = next;
  }

  function requestFullscreen(index: number) {
    const video = videoRefs.current[index];
    video?.requestFullscreen?.().catch(() => {
      // Fullscreen request can be rejected by the browser — ignore.
    });
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
    <section ref={sectionRef} className="bg-ink py-14 sm:py-20">
      <Container>
        <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
          {testimonialsHeading}
        </h2>

        <div
          role="region"
          aria-label="Student testimonial videos"
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
              const state = slideStates[i] ?? "poster";
              const isActive = i === activeIndex;

              return (
                <div
                  key={slide.src ?? i}
                  className={`relative shrink-0 snap-center transition-all duration-300 ${
                    isActive ? "scale-100 opacity-100" : "scale-90 opacity-40"
                  }`}
                  style={{ width: "min(78vw, 300px)" }}
                >
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-xl">
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el;
                      }}
                      src={slide.src ? `${slide.src}#t=0.1` : undefined}
                      preload="metadata"
                      playsInline
                      muted={mutedAutoplay ? isMuted && isActive : false}
                      className="h-full w-full object-contain"
                      onPlay={() => setSlideState(i, "playing")}
                      onPause={() => setSlideState(i, "poster")}
                      onEnded={() => setSlideState(i, "ended")}
                    />

                    {isActive && state !== "playing" && (
                      <button
                        type="button"
                        onClick={() => (state === "ended" ? handleReplay(i) : handleManualPlay(i))}
                        aria-label={state === "ended" ? `Replay testimonial ${i + 1}` : `Play testimonial ${i + 1} with sound`}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 transition-colors hover:bg-black/35"
                      >
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-transform hover:scale-105">
                          {state === "ended" ? <ReplayIcon /> : <PlayIcon />}
                        </span>
                        {state === "poster" && !mutedAutoplay && (
                          <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                            Tap to play with sound
                          </span>
                        )}
                        {state === "ended" && (
                          <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">Replay</span>
                        )}
                      </button>
                    )}

                    {isActive && (
                      <div className="absolute right-2 top-2 flex gap-1.5">
                        {mutedAutoplay && (
                          <button
                            type="button"
                            onClick={toggleMute}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/70"
                          >
                            <MuteIcon muted={isMuted} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => requestFullscreen(i)}
                          aria-label="Fullscreen"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/70"
                        >
                          <FullscreenIcon />
                        </button>
                      </div>
                    )}
                  </div>

                  {isActive && (slide.rating || slide.quote || slide.name) && (
                    <div className="mt-3 text-center">
                      {slide.rating && (
                        <div className="mb-1">
                          <StarRow rating={slide.rating} />
                        </div>
                      )}
                      {slide.quote && <p className="text-sm italic text-white/85">&ldquo;{slide.quote}&rdquo;</p>}
                      {(slide.name || slide.exam) && (
                        <p className="mt-1 text-xs font-semibold text-white/60">
                          {slide.name}
                          {slide.name && slide.exam && " — "}
                          {slide.exam}
                        </p>
                      )}
                    </div>
                  )}
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
                aria-label="Previous testimonial"
                className="absolute left-1 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/90 p-2 text-ink shadow-md transition-opacity hover:bg-white disabled:opacity-0 sm:flex"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => navigateTo(Math.min(slides.length - 1, activeIndex + 1))}
                disabled={activeIndex === slides.length - 1}
                aria-label="Next testimonial"
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
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === activeIndex}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex ? "w-6 bg-mint" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
