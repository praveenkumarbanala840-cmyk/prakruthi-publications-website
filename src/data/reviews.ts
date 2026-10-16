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
  {
    name: "Balu",
    photo: "/students/balu.webp",
    review:
      "GS Rao sir makes tough psychology theories easy to understand. The way he explains stays in your mind, even for the hardest topics.",
  },
  {
    name: "Basheeda",
    photo: "/students/basheedha.webp",
    review:
      "He doesn't just give answers to the question papers. He explains why each option is right or wrong, and that has made me more confident for the exam.",
  },
  {
    name: "Chalapathi",
    photo: "/students/chalapathi.webp",
    review:
      "His books and study materials make difficult concepts simple and connect theory with practice. They gave me clear direction for my exam preparation.",
  },
  {
    name: "Faseesha",
    photo: "/students/faseesha.webp",
    review:
      "His counselling helped me deal with exam stress and self-doubt. I feel calmer now, and I'm preparing with fresh determination.",
  },
  {
    name: "Ganga Raju",
    photo: "/students/ganga-raju.webp",
    review:
      "Nine years of teaching shows in his classes, books and personal guidance. He is making good psychology education available to everyone.",
  },
  {
    name: "Karishma",
    photo: "/students/karishma.webp",
    review:
      "I was preparing for DSC and found psychology very hard at first. GS Rao sir explains every topic in a simple way. His classes and book explanations helped me understand better, and his support gave me the confidence to keep trying.",
  },
  {
    name: "Likitha",
    photo: "/students/likitha.webp",
    review:
      "Psychology was my weak point in DSC preparation. Sir explains with good examples, and his classes and books made difficult concepts easy. His guidance motivated me to prepare better.",
  },
  {
    name: "Madhu",
    photo: "/students/madhu.webp",
    review:
      "Psychology felt difficult when I started DSC preparation, but sir's classes made the topics easy. Whenever I was confused, his guidance kept me going.",
  },
  {
    name: "Malleswara Rao",
    photo: "/students/malleswara-rao.webp",
    review:
      "Psychology was difficult for me at first. GS Rao sir explains every topic simply, and now I feel more confident about my DSC preparation.",
  },
  {
    name: "Praveen",
    photo: "/students/praveen.webp",
    review:
      "Sir's classes are very useful for DSC aspirants. He explains important topics clearly, so you understand the subject instead of just memorising answers. I really like his teaching style.",
  },
  {
    name: "Rajaram",
    photo: "/students/rajaram.webp",
    review:
      "I use sir's books along with his classes. The explanations are easy to follow, and I can revise important psychology topics whenever I have time.",
  },
  {
    name: "Rajya Laxmi",
    photo: "/students/rajya-laxmi.webp",
    review:
      "During DSC preparation I often felt stressed and confused about what to study. Sir's guidance helped me stay focused and prepare in a better way.",
  },
  {
    name: "Ramachandra",
    photo: "/students/ramachandra.webp",
    review:
      "What I like most is how sir explains difficult topics with simple examples. Psychology feels interesting now, and I learn step by step.",
  },
  {
    name: "Safan",
    photo: "/students/safan.webp",
    review:
      "I used to find psychology confusing, especially when different theories sounded similar. Sir explains them with simple examples, which makes it much easier to understand and remember during revision.",
  },
  {
    name: "Samuel",
    photo: "/students/samuel.webp",
    review:
      "For TET and DSC preparation, having clear concepts is very important. Sir's teaching helps me understand the subject properly instead of depending only on memorised answers.",
  },
  {
    name: "Sharmila",
    photo: "/students/sharmila.webp",
    review:
      "The online classes are convenient because I can study from home and revise the topics according to my schedule. This flexibility is helpful when managing other subjects during exam preparation.",
  },
  {
    name: "Sivakrishna",
    photo: "/students/sivakrishna.webp",
    review:
      "I like the way Sir connects psychology concepts with exam-oriented questions. It helps me understand how a topic can be tested and what I should focus on while preparing.",
  },
  {
    name: "Sunil",
    photo: "/students/sunil.webp",
    review:
      "As someone who struggled with psychology basics, I found Sir's explanations helpful. He breaks complicated topics into smaller parts, so learning the subject feels less overwhelming.",
  },
  {
    name: "Suresh",
    photo: "/students/suresh.webp",
    review:
      "The study materials are organised in a way that makes revision easier. I can go back to important concepts without having to search through too many different resources.",
  },
  {
    name: "Swathi Peravali",
    photo: "/students/swathi-peravali.webp",
    review:
      "Earlier, I found it difficult to differentiate between psychological theories and their key points. The examples used in class have helped me understand the differences more clearly.",
  },
  {
    name: "Taruna",
    photo: "/students/taruna.webp",
    review:
      "One thing I appreciate about learning online is being able to revisit lessons when I need more clarity. It helps me revise difficult topics at my own pace.",
  },
  {
    name: "Venkat",
    photo: "/students/venkat.webp",
    review:
      "Sir focuses on explaining the meaning behind each concept rather than simply asking us to remember definitions. That approach makes psychology easier to study and revise.",
  },
  {
    name: "Vishnupriya",
    photo: "/students/vishnupriya.webp",
    review:
      "Preparing for competitive exams can feel stressful at times. Sir's teaching gives me a clearer understanding of what I am studying, and that makes it easier to stay focused on my preparation.",
  },
];
