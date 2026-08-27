import Container from "@/components/ui/Container";

const PLACEHOLDER_SLOTS = 6;

export default function SuccessStories() {
  return (
    <section className="bg-white py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Success Stories
          </h2>
          <p className="mt-3 text-sm text-navy/60 sm:text-base">
            Real selections from real students — added as results are confirmed.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: PLACEHOLDER_SLOTS }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-2xl border border-dashed border-navy/15 bg-cream p-6 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy/5 text-navy/30">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="mt-4 text-sm text-navy/50">Success story coming soon</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
