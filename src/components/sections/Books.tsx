import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { books } from "@/data/books";

// Shown purely to showcase Prof. Rao's published work — not for sale here.
// No price, buy link, rating, or availability claim belongs in this
// component; see the comment at the top of src/data/books.ts.
export default function Books() {
  if (books.length === 0) return null;

  const sorted = [...books].sort((a, b) => a.order - b.order);

  return (
    <section className="bg-ink py-14 sm:py-20">
      <Container>
        <Reveal variant="fade-up" className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Books by Prof. GS Rao</h2>
          <p className="mt-2 text-sm text-white/60 sm:text-base">Study material prepared by Prof. GS Rao</p>
        </Reveal>

        <div
          className="mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-2 sm:justify-items-center sm:gap-x-8 sm:gap-y-14 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {sorted.map((book, i) => (
            <Reveal key={book.cover} variant="fade-up" index={i} className="shrink-0 snap-center">
              <figure
                tabIndex={0}
                className="book-tilt group w-[150px] cursor-default rounded-md outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:w-[180px]"
              >
                <div className="book-tilt-cover relative aspect-[3/4] w-full overflow-hidden rounded-r-md rounded-l-[2px] bg-ink-light">
                  <Image
                    src={book.cover}
                    alt={book.alt}
                    fill
                    sizes="(max-width: 640px) 150px, 180px"
                    loading="lazy"
                    className="object-cover"
                  />
                  <span className="book-tilt-spine" aria-hidden="true" />
                  <span className="book-tilt-edge-right" aria-hidden="true" />
                  <span className="book-tilt-edge-bottom" aria-hidden="true" />
                </div>
                <figcaption className="mt-5 text-center text-sm font-medium leading-snug text-white/80">
                  {book.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
