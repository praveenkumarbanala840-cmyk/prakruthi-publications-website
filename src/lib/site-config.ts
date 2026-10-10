// Central place for facts that are safe to reuse across the site.
// Every value here must trace back to something the client actually provided —
// do not add stats, counts, or claims that aren't confirmed.

export const siteConfig = {
  name: "Prakruthi Publications",
  tagline: "Government Exam Coaching for Andhra Pradesh",
  domain: "https://tangerine-granita-8c9902.netlify.app", // TODO: replace once a custom domain is connected

  // The 3 anchor stats — reused in Hero, credibility bar, course pages, About.
  stats: {
    studentsTrained: "15,000+",
    yearsExperience: "8+",
    studentsSelected: "1000+",
  },

  // TODO(client): confirm real Play Store URL.
  playStoreUrl: "https://play.google.com/store/apps/details?id=REPLACE_ME",

  // TODO(client): confirm WhatsApp business number.
  whatsappNumber: "", // e.g. "919999999999" (country code, no +/spaces)
  whatsappMessage: "Hi, I'd like to know more about your courses.",

  instagramUrl: "https://www.instagram.com/prakruthipublications/",

  // TODO(client): confirm email, phone/IVR, YouTube handle.
  contactEmail: "",
  phone: "",
  youtubeUrl: "",
} as const;

export function whatsappLink(message: string = siteConfig.whatsappMessage) {
  const number = siteConfig.whatsappNumber;
  const text = encodeURIComponent(message);
  return number ? `https://wa.me/${number}?text=${text}` : "#";
}

export interface ExamNavItem {
  slug: string;
  name: string;
  shortName: string;
  badge: string;
  hasFullCoursePage: boolean;
  order: number;
  visible: boolean; // false = kept in code, hidden from homepage grid / header / footer
}

// Gurukulalu is flagged per the client's open question in the brief — confirm
// whether it needs a full course page or stays a listing-only entry.
// To add a new exam to the visible set later: set visible: true and an order
// — no other code changes needed (Header/Footer/CoursesPreview all derive
// from visibleExams below).
export const exams: ExamNavItem[] = [
  { slug: "ap-tet", name: "AP TET - Teacher Eligibility Test", shortName: "AP TET", badge: "AP TET", hasFullCoursePage: true, order: 1, visible: true },
  { slug: "ap-dsc", name: "AP DSC — Andhra Pradesh District Selection Committee", shortName: "AP DSC", badge: "AP DSC", hasFullCoursePage: true, order: 2, visible: true },
  { slug: "ts-tet", name: "TS TET - Telangana State Teacher Eligibility Test", shortName: "TS TET", badge: "TS TET", hasFullCoursePage: true, order: 3, visible: true },
  { slug: "ts-dsc", name: "TS DSC - Telangana State District Selection Committee", shortName: "TS DSC", badge: "TS DSC", hasFullCoursePage: true, order: 4, visible: true },
  { slug: "hwo", name: "HWO — Health & Welfare Officer", shortName: "HWO", badge: "HWO", hasFullCoursePage: true, order: 5, visible: false },
  { slug: "apset", name: "APSET", shortName: "APSET", badge: "SET", hasFullCoursePage: true, order: 6, visible: false },
  { slug: "deo", name: "DEO — District Education Officer", shortName: "DEO", badge: "DEO", hasFullCoursePage: true, order: 7, visible: false },
  { slug: "cdpo", name: "CDPO — Child Development Project Officer", shortName: "CDPO", badge: "CDPO", hasFullCoursePage: true, order: 8, visible: false },
  { slug: "gurukulalu", name: "Gurukulalu", shortName: "Gurukulalu", badge: "GKL", hasFullCoursePage: false, order: 9, visible: false },
];

export const visibleExams: ExamNavItem[] = [...exams]
  .filter((exam) => exam.visible)
  .sort((a, b) => a.order - b.order);

export const articleTypes = [
  { slug: "syllabus-2026", label: "Syllabus 2026" },
  { slug: "exam-pattern", label: "Exam Pattern" },
  { slug: "previous-papers", label: "Previous Papers" },
  { slug: "preparation-tips", label: "Preparation Tips" },
] as const;
