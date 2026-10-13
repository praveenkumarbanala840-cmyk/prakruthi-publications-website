// Student Reviews. One entry per student photo in public/students/.
//
// review and rating must come verbatim from the student's own message —
// never invent or paraphrase either. rating is optional; when given, it
// must be one of 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5 (half-star steps).
// exam is the exam slug/short label this student is associated with, if
// known — also optional.
//
// An entry with an empty review is simply not shown (see Reviews.tsx) —
// fill in `review` (and optionally `rating`) once the real text arrives.

export interface Review {
  name: string;
  exam?: string;
  photo: string;
  review: string;
  rating?: number;
}

export const reviews: Review[] = [
  { name: "Balu", photo: "/students/balu.webp", review: "" },
  { name: "Basheedha", photo: "/students/basheedha.webp", review: "" },
  { name: "Chalapathi", photo: "/students/chalapathi.webp", review: "" },
  { name: "Faseesha", photo: "/students/faseesha.webp", review: "" },
  { name: "Ganga Raju", photo: "/students/ganga-raju.webp", review: "" },
  { name: "Karishma", photo: "/students/karishma.webp", review: "" },
  { name: "Likitha", photo: "/students/likitha.webp", review: "" },
  { name: "Madhu", photo: "/students/madhu.webp", review: "" },
  { name: "Malleswara Rao", photo: "/students/malleswara-rao.webp", review: "" },
  { name: "Praveen", photo: "/students/praveen.webp", review: "" },
  { name: "Rajaram", photo: "/students/rajaram.webp", review: "" },
  { name: "Rajya Laxmi", photo: "/students/rajya-laxmi.webp", review: "" },
  { name: "Ramachandra", photo: "/students/ramachandra.webp", review: "" },
  { name: "Safan", photo: "/students/safan.webp", review: "" },
  { name: "Samuel", photo: "/students/samuel.webp", review: "" },
  { name: "Sharmila", photo: "/students/sharmila.webp", review: "" },
  { name: "Sivakrishna", photo: "/students/sivakrishna.webp", review: "" },
  { name: "Sunil", photo: "/students/sunil.webp", review: "" },
  { name: "Suresh", photo: "/students/suresh.webp", review: "" },
  { name: "Swathi Peravali", photo: "/students/swathi-peravali.webp", review: "" },
  { name: "Taruna", photo: "/students/taruna.webp", review: "" },
  { name: "Venkat", photo: "/students/venkat.webp", review: "" },
  { name: "Vishnupriya", photo: "/students/vishnupriya.webp", review: "" },
];
