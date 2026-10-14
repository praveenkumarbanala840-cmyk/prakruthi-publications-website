// Short clips on the home page are YouTube-hosted and rendered via
// ClickToLoadVideo: a poster image only, no iframe (and no YouTube
// script) until the user clicks play. The promo video shared by course
// pages that don't have their own intro video is not set yet
// (youtubeId empty) — in production that section stays hidden until a
// real id lands here. The local src below is a dev-only convenience
// fallback (see CoursePageTemplate) and is never rendered in production.

export interface VideoSource {
  src?: string; // local path under /test-videos/... — dev-only, gitignored, never used in production
  youtubeId?: string; // YouTube video id, embedded via youtube-nocookie.com on click
}

export interface PromoVideoData extends VideoSource {
  title?: string;
}

export type ShortVideoData = VideoSource;

export const shortsHeading = "Learn Free on Instagram";
export const shortsSubheading = "Short clips by GS Rao, free on our Instagram page.";

// Shared fallback used by course pages that don't have their own
// exam.introVideo set. Not shown on the home page.
export const promoVideo: PromoVideoData = {
  src: "/test-videos/intro.mp4",
  youtubeId: "",
};

export const shortVideos: ShortVideoData[] = [
  { youtubeId: "WsgmwQZl_7s" },
  { youtubeId: "Ezc38avvdrQ" },
  { youtubeId: "-tfWyCRdyYQ" },
  { youtubeId: "vHHf9nczrZA" },
  { youtubeId: "2wpud4sIBXg" },
];
