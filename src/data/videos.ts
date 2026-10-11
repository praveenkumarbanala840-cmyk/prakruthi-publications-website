// Local-only video test. The actual .mp4 files live in public/test-videos/,
// which is gitignored (see .gitignore) — never committed. `src` is a local
// file for now; `youtubeId` is reserved so a future swap to YouTube-hosted
// video doesn't need a data-shape change, but it is NOT implemented yet.

export interface VideoSource {
  src?: string; // path under /test-videos/... (local, gitignored)
  youtubeId?: string; // reserved for later — not read yet
}

export interface PromoVideoData extends VideoSource {
  title?: string;
}

export type ShortVideoData = VideoSource;

export const shortsHeading = "Learn Free on Instagram";
export const shortsSubheading = "Short clips by GS Rao, free on our Instagram page.";

// false = each slide needs a tap to play, with sound (default — browsers
// block unmuted autoplay anyway). true = the active slide autoplays
// muted with a mute/unmute button. See ShortsCarousel for the exact
// behavior each mode drives.
export const mutedAutoplay = false;

// Shared fallback used by course pages that don't have their own
// exam.introVideo set. Not shown on the home page.
export const promoVideo: PromoVideoData = {
  src: "/test-videos/intro.mp4",
};

export const shortVideos: ShortVideoData[] = [
  { src: "/test-videos/testimonial-1.mp4" },
  { src: "/test-videos/testimonial-2.mp4" },
  { src: "/test-videos/testimonial-3.mp4" },
  { src: "/test-videos/testimonial-4.mp4" },
  { src: "/test-videos/testimonial-5.mp4" },
];
