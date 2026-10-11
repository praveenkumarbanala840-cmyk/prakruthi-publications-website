// Local-only video test for the home page. The actual .mp4 files live in
// public/test-videos/, which is gitignored (see .gitignore) — never
// committed. `src` is a local file for now; `youtubeId` is reserved so a
// future swap to YouTube-hosted video doesn't need a data-shape change,
// but it is NOT implemented yet (IntroVideoSection / VideoTestimonials
// only read `src`).

export interface VideoSource {
  src?: string; // path under /test-videos/... (local, gitignored)
  youtubeId?: string; // reserved for later — not read yet
}

export interface IntroVideoData extends VideoSource {
  title?: string;
}

export interface TestimonialVideoData extends VideoSource {
  name?: string;
  exam?: string;
  quote?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export const introHeading = "Know Prakruthi Publications in 1 Minute";
export const testimonialsHeading = "What Our Students Say";

// false = each slide needs a tap to play, with sound (default — browsers
// block unmuted autoplay anyway). true = the active slide autoplays
// muted with a mute/unmute button. See VideoTestimonials for the exact
// behavior each mode drives.
export const mutedAutoplay = false;

// No title text invented — the heading above already labels the video.
export const introVideo: IntroVideoData = {
  src: "/test-videos/intro.mp4",
};

// No name/exam/quote/rating invented for any of these — only shown when
// actually provided.
export const testimonialVideos: TestimonialVideoData[] = [
  { src: "/test-videos/testimonial-1.mp4" },
  { src: "/test-videos/testimonial-2.mp4" },
  { src: "/test-videos/testimonial-3.mp4" },
  { src: "/test-videos/testimonial-4.mp4" },
  { src: "/test-videos/testimonial-5.mp4" },
];
