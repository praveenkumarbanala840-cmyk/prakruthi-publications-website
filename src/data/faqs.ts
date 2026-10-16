// Home-page FAQ. Answers must not include fees, dates, vacancies,
// results, selection claims, or any fact the professor has not
// confirmed in writing. When in doubt, leave it out.
//
// Topics still pending professor confirmation (do NOT add entries for
// these yet — wait for confirmed wording):
// - How psychology is weighted/tested within each specific exam (AP TET,
//   AP DSC, TS TET, TS DSC)
// - Understanding vs. memorising — the professor's specific teaching
//   philosophy/approach, beyond the general "starts from basics" claim
// - Whether classes are live, recorded, or both
// - What books/study materials are included and how students get them
// - Whether counselling/mentorship support is offered and what it covers

export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "Who is GS Rao?",
    answer:
      "Prof. GS Rao is a faculty of psychology, a counselling psychologist and an author, and the founder of Mirror Minds. Prakruthi Publications is his platform for classes, books and study material, built to make psychology simple for TET and DSC aspirants.",
  },
  {
    question: "Which exams do you cover?",
    answer: "AP TET, AP DSC, TS TET and TS DSC.",
  },
  {
    question: "I find psychology difficult. Can I still start?",
    answer:
      "Yes. The teaching starts from the basics and explains each topic in simple language with examples, so you do not need any earlier background in the subject.",
  },
  {
    question: "How do I join?",
    answer:
      "Download the Prakruthi Publications app from the Google Play Store and enrol there. If you have a question before joining, message us on WhatsApp.",
  },
  {
    question: "Where can I find previous papers and the syllabus?",
    answer:
      "Each exam page on this website has previous papers. The AP DSC page also has the suggestive syllabus to download. For official notifications, dates and eligibility, always check the official recruitment website, because these can change.",
  },
  {
    question: "Do you guarantee selection?",
    answer:
      "No one can honestly guarantee selection in a competitive exam. We help you understand psychology clearly and prepare with confidence; your overall preparation and the exam itself decide the result.",
  },
  {
    question: "How do I contact you?",
    answer: "Email, call or WhatsApp us, or use the Contact page.",
  },
];
