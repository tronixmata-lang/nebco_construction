import { getValuePillars } from "@/lib/data/content";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const pillarIcons: Record<string, React.ReactNode> = {
  quality: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  integrity: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  timely: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  innovation: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  value: (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

type ValuePillarsProps = {
  showHeader?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  variant?: "default" | "muted" | "dark";
  id?: string;
  columns?: "five" | "three";
};

const gridClasses = {
  five: "grid gap-6 sm:grid-cols-2 lg:grid-cols-5",
  three: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
};

export async function ValuePillars({
  showHeader = true,
  eyebrow = "Why NEBCO",
  title = "Our Core Values",
  description = "Five pillars that define how we work, how we partner, and how we deliver lasting results.",
  variant = "default",
  id = "values",
  columns = "five",
}: ValuePillarsProps = {}) {
  const valuePillars = await getValuePillars();

  return (
    <Section id={id} variant={variant} className="relative overflow-hidden">
      {/* Artistic backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-neutral-border" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      {showHeader && (
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mx-auto"
        />
      )}

      <div className={gridClasses[columns]}>
        {valuePillars.map((pillar) => (
          <div
            key={pillar.id}
            className="group relative flex flex-col items-center overflow-hidden rounded-sm border border-neutral-border bg-neutral px-6 pb-8 pt-10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
          >
            {/* Animated top accent bar */}
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

            <div className="relative mb-6 flex h-14 w-14 items-center justify-center text-primary">
              {pillarIcons[pillar.icon]}
            </div>

            <h3 className="font-display text-lg text-secondary">
              {pillar.title}
            </h3>
            <span className="mt-3 h-0.5 w-8 rounded-full bg-accent transition-all duration-300 group-hover:w-14" />
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
