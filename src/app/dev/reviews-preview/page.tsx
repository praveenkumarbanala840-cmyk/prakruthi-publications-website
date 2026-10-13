import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reviews from "@/components/sections/Reviews";
import type { Review } from "@/data/reviews";

// Dev-only: lets us see the Reviews carousel styled and populated before
// any real review text exists. Never reachable in production.
export const metadata: Metadata = {
  title: "Reviews preview (dev only)",
  robots: { index: false, follow: false },
};

// Obviously-fake sample text + a mix of ratings (none, 4, 4.5, 5) to check
// every card state. Names are generic placeholders, not real students —
// the photos are only here to check image rendering, not to attribute
// invented quotes to a specific person.
const SAMPLE_REVIEWS: Review[] = [
  {
    name: "Sample Student 1",
    photo: "/students/balu.webp",
    exam: "AP TET",
    review: "Sample review text goes here. Sample review text goes here. Sample review text goes here.",
  },
  {
    name: "Sample Student 2",
    photo: "/students/basheedha.webp",
    exam: "AP DSC",
    review: "Sample review text goes here. Sample review text goes here.",
    rating: 4,
  },
  {
    name: "Sample Student 3",
    photo: "/students/chalapathi.webp",
    review: "Sample review text goes here. Sample review text goes here. Sample review text goes here. Sample review text goes here.",
    rating: 4.5,
  },
  {
    name: "Sample Student 4",
    photo: "/students/faseesha.webp",
    exam: "TS TET",
    review: "Sample review text goes here.",
    rating: 5,
  },
  {
    name: "Sample Student 5",
    photo: "/students/karishma.webp",
    review: "Sample review text goes here. Sample review text goes here.",
  },
  {
    name: "Sample Student 6",
    photo: "/students/likitha.webp",
    exam: "TS DSC",
    review: "Sample review text goes here. Sample review text goes here. Sample review text goes here.",
    rating: 4.5,
  },
];

export default function ReviewsPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="bg-ink pt-10">
      <p className="mx-auto max-w-6xl px-4 text-center text-xs font-semibold uppercase tracking-wide text-mint/70">
        Dev-only preview — sample text, not real reviews — not linked from the live site
      </p>
      <Reviews reviews={SAMPLE_REVIEWS} />
    </div>
  );
}
