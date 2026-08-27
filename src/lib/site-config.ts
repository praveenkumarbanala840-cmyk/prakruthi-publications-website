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

  // TODO(client): confirm email, phone/IVR, YouTube handle.
  contactEmail: "",
  phone: "",
  youtubeUrl: "",
  instagramUrl: "",
} as const;

export function whatsappLink(message = siteConfig.whatsappMessage) {
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
}

// Gurukulalu is flagged per the client's open question in the brief — confirm
// whether it needs a full course page or stays a listing-only entry.
export const exams: ExamNavItem[] = [
  { slug: "dsc", name: "DSC — District Selection Committee", shortName: "DSC", badge: "DSC", hasFullCoursePage: true },
  { slug: "apset", name: "APSET", shortName: "APSET", badge: "SET", hasFullCoursePage: true },
  { slug: "deo", name: "DEO — District Education Officer", shortName: "DEO", badge: "DEO", hasFullCoursePage: true },
  { slug: "cdpo", name: "CDPO — Child Development Project Officer", shortName: "CDPO", badge: "CDPO", hasFullCoursePage: true },
  { slug: "hwo", name: "HWO — Health & Welfare Officer", shortName: "HWO", badge: "HWO", hasFullCoursePage: true },
  { slug: "gurukulalu", name: "Gurukulalu", shortName: "Gurukulalu", badge: "GKL", hasFullCoursePage: false },
];

export const articleTypes = [
  { slug: "syllabus-2026", label: "Syllabus 2026" },
  { slug: "exam-pattern", label: "Exam Pattern" },
  { slug: "previous-papers", label: "Previous Papers" },
  { slug: "preparation-tips", label: "Preparation Tips" },
] as const;
