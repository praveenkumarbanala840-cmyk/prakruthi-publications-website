import Container from "@/components/ui/Container";

const steps = [
  { number: 1, label: "Tap Enroll Now" },
  { number: 2, label: "Install the app" },
  { number: 3, label: "Choose your course" },
];

export default function HowToEnrollStrip() {
  return (
    <section className="bg-surface py-12">
      <Container>
        <h2 className="text-center font-display text-xl font-bold text-charcoal sm:text-2xl">
          How to Enroll
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-mint">
                {step.number}
              </span>
              <p className="mt-3 text-sm font-semibold text-charcoal">{step.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
