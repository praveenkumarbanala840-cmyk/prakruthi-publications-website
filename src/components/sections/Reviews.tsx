import Image from "next/image";
import Container from "@/components/ui/Container";
import type { Review } from "@/data/reviews";

// Loop duration = items.length * SECONDS_PER_CARD, set as one CSS
// variable (--reviews-marquee-duration, see globals.css) so the speed
// can be tuned from a single place.
const SECONDS_PER_CARD = 6;

function QuoteIcon() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true" className="text-mint/20">
      <path
        d="M0 16.5C0 7.5 5.5 1.5 14 0l1.5 4C9 5.5 6.5 9 6 13.5h8V28H0V16.5Zm20 0C20 7.5 25.5 1.5 34 0l1.5 4C29 5.5 26.5 9 26 13.5h8V28H20V16.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Star({ fraction }: { fraction: number }) {
  const clamped = Math.max(0, Math.min(1, fraction));
  return (
    <span className="relative inline-block h-4 w-4">
      <svg viewBox="0 0 20 20" className="absolute inset-0 h-full w-full text-white/25" aria-hidden="true">
        <path
          d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L10 1.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <span className="absolute inset-0 overflow-hidden" style={{ width: `${clamped * 100}%` }}>
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-mint" aria-hidden="true">
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.74 1-5.8-4.21-4.1 5.82-.85L10 1.5z" fill="currentColor" />
        </svg>
      </span>
    </span>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} fraction={rating - i} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="relative flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-md transition-shadow duration-300 hover:shadow-[0_0_28px_rgba(0,232,160,0.18)]">
      <QuoteIcon />
      <p className="line-clamp-5 flex-1 text-sm leading-relaxed text-white/85">{review.review}</p>

      <div className="flex items-center gap-3 border-t border-white/10 pt-4">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-mint/60">
          <Image src={review.photo} alt={review.name} fill sizes="48px" className="object-cover" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">{review.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {review.exam && (
              <span className="rounded-full bg-mint/15 px-2.5 py-0.5 text-[10px] font-semibold text-mint">
                {review.exam}
              </span>
            )}
            {typeof review.rating === "number" && <StarRow rating={review.rating} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const items = reviews.filter((r) => r.review.trim().length > 0);

  if (items.length === 0) return null;

  // Rendered twice so the -50% loop is seamless (see .reviews-marquee-track
  // in globals.css). The second copy is presentational only.
  const cards = [...items, ...items];
  const duration = `${items.length * SECONDS_PER_CARD}s`;

  return (
    <section className="bg-ink py-14 sm:py-20">
      <Container>
        <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">Student Reviews</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-white/60">What our students say in their own words.</p>

        <div
          className="reviews-marquee-viewport relative mt-10"
          role="region"
          aria-label="Student reviews"
          tabIndex={0}
        >
          <div
            className="reviews-marquee-track flex gap-4"
            style={{ ["--reviews-marquee-duration" as string]: duration }}
          >
            {cards.map((review, i) => {
              const isDuplicate = i >= items.length;
              return (
                <div
                  key={`${review.photo}-${i}`}
                  aria-hidden={isDuplicate ? "true" : undefined}
                  tabIndex={isDuplicate ? -1 : undefined}
                  className="w-[82vw] max-w-[320px] shrink-0 snap-center sm:w-[300px]"
                >
                  <ReviewCard review={review} />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
