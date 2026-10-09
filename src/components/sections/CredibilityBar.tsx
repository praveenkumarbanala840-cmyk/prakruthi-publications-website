import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { value: siteConfig.stats.yearsExperience, label: "Years of Experience" },
  { value: siteConfig.stats.studentsSelected, label: "Selected in Government Jobs" },
  { value: siteConfig.stats.studentsTrained, label: "Students Trained" },
];

export default function CredibilityBar() {
  return (
    <section className="border-b border-charcoal/10 bg-white">
      <Container className="grid grid-cols-3 divide-x divide-charcoal/10 py-8">
        {stats.map((stat) => (
          <div key={stat.label} className="px-2 text-center sm:px-4">
            <p className="font-display text-2xl font-extrabold text-charcoal sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-charcoal/60 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
