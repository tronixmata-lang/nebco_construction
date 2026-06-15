import { companyStats, testimonials } from "@/content/homepage";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";

const trustStats = companyStats.filter((stat) =>
  ["clients", "completed", "years"].includes(stat.id),
);

export function TestimonialsSection() {
  return (
    <Section variant="muted" id="testimonials" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <SectionHeader
        eyebrow="Trusted Partners"
        title="What Our Clients Say"
        description="Real feedback from homeowners, commercial clients, and hospitality partners who chose NEBCO for quality, transparency, and on-time delivery."
        align="center"
        className="mx-auto"
      />

      <TestimonialsCarousel testimonials={testimonials} />

      <div className="mt-12 grid grid-cols-3 divide-x divide-neutral-border rounded-sm border border-neutral-border bg-neutral">
        {trustStats.map((stat) => (
          <div key={stat.id} className="px-4 py-6 text-center">
            <p className="font-display text-2xl font-bold text-primary md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium tracking-wide text-text-muted uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
