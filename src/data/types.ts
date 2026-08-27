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
  };
}
