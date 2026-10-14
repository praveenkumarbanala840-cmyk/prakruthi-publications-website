export interface Testimonial {
  name: string;
  exam: string; // exam slug this testimonial should be tagged/filtered under
  year?: string;
  role?: string; // e.g. "Selected — School Assistant"
  quote: string;
  photoUrl?: string;
  videoUrl?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SyllabusSection {
  heading: string;
  topics: string[];
}

export interface BatchInfo {
  mode: string; // e.g. "Online", "Offline", "Hybrid"
  timing: string;
  fee: string;
  startDate?: string;
}

export interface PreviousPaper {
  year: string;
  subject: string;
  paperLabel: string;
  pdfUrl: string;
}

export interface CourseVideo {
  youtubeId: string;
  title?: string;
}

export interface Review {
  name: string;
  exam: string;
  quote: string;
  stars: 1 | 2 | 3 | 4 | 5;
}

export interface CoursePrice {
  amount: string; // e.g. "₹1,999" — a plain string so the client can format it
}

export interface CourseOffer {
  description: string;
  validUntil: string; // ISO date (YYYY-MM-DD) — offer auto-hides after this date
}

export interface SyllabusDownload {
  title: string;
  description: string;
  fileUrl: string; // path under /downloads/...
}

export interface ExamContent {
  slug: string;
  name: string;
  shortName: string;
  hasFullCoursePage: boolean;
  thumbnailUrl?: string;
  overview: string;
  syllabus: SyllabusSection[];
  batches: BatchInfo[];
  testimonials: Testimonial[];
  faq: FaqItem[];
  previousPapers: PreviousPaper[];
  sourceAuthority?: string; // official board name, cited near paper downloads

  // Which /exams/<slug>/<article> pages actually exist for this exam, so
  // course/article pages never link to a page that isn't built. Defaults to
  // all 4 (matching the exams that already have the full set).
  availableArticles: ("syllabus-2026" | "exam-pattern" | "previous-papers" | "preparation-tips")[];

  // Rich video-course fields (course page hero/video/lessons/shorts/reviews/price).
  // All optional — each section hides when its field is empty/undefined.
  heroHeadline?: string;
  heroSecondaryCta?: { label: string; href: string }; // overrides the default "WhatsApp Enquiry" hero button
  introVideo?: CourseVideo;
  lessons?: string[]; // ordered list of video/lesson titles
  shorts?: CourseVideo[];
  reviews?: Review[];
  price?: CoursePrice;
  offer?: CourseOffer;
  syllabusDownload?: SyllabusDownload;

  // When true, CoursePageTemplate renders only the hero, credibility block,
  // how-to-enroll strip, related-articles, and final CTA — no batch-timings
  // placeholder, testimonials placeholder, FAQ placeholder, or price/offer
  // section. For exams with no real content of any kind yet (so the page
  // never shows a "finalized soon" box for content that was never promised).
  minimalCourse?: boolean;
}

/** Placeholder content-data shell for an exam not yet filled in by the client. */
export function emptyExamContent(
  slug: string,
  name: string,
  shortName: string,
  hasFullCoursePage = true
): ExamContent {
  return {
    slug,
    name,
    shortName,
    hasFullCoursePage,
    overview: "",
    syllabus: [],
    batches: [],
    testimonials: [],
    faq: [],
    previousPapers: [],
    availableArticles: ["syllabus-2026", "exam-pattern", "previous-papers", "preparation-tips"],
  };
}
