import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-ink text-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-mint">404</p>
        <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-white/70">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <LinkButton href="/" size="lg">
            Go Home
          </LinkButton>
          <LinkButton
            href="/#choose-your-exam"
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-ink"
          >
            View Courses
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
