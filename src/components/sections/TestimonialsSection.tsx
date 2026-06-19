import { getStats, getTestimonials } from "@/lib/data/content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();
  const companyStats = await getStats();
  const trustStats = companyStats.filter((stat) =>
    ["clients", "completed", "years"].includes(stat.id),
  );

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
          <div key={stat.id} className="px-2 py-5 text-center sm:px-4 sm:py-6">
            <p className="font-display text-xl text-primary sm:text-2xl md:text-3xl">{stat.value}</p>
            <p className="mt-1 text-[10px] font-medium tracking-wide text-text-muted uppercase sm:text-xs">{stat.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
