import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { cn } from "@/lib/utils";

const valueIcons = [
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
] as const;

type AboutCoreValuesSectionProps = {
  values: string[];
};

export function AboutCoreValuesSection({ values }: AboutCoreValuesSectionProps) {
  return (
    <Section variant="muted" className="py-14 md:py-20" glow="none">
      <ScrollReveal>
        <SectionHeader
          eyebrow="What We Stand For"
          title="Our Core Values"
          description="The principles that guide every project, partnership, and decision we make."
          align="center"
          className="mx-auto"
        />
      </ScrollReveal>

      <StaggerReveal
        className="about-values-grid mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        staggerMs={80}
      >
        {values.map((value, index) => (
          <article
            key={`${value}-${index}`}
            className="about-value-card group relative flex min-h-[11.5rem] flex-col overflow-hidden rounded-sm border border-neutral-border/90 bg-neutral p-6 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.12)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-accent/55 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)] sm:min-h-[12rem] sm:p-7"
          >
            <span
              className="about-value-card__wash pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
            <span
              className="about-value-card__index pointer-events-none absolute top-4 right-5 font-display text-5xl leading-none text-secondary/[0.06] transition-colors duration-300 group-hover:text-accent/15 sm:text-6xl"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="relative flex items-start justify-between gap-4">
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300",
                  index % 2 === 0
                    ? "border-primary/15 bg-primary/5 text-primary group-hover:border-primary/30 group-hover:bg-primary/10"
                    : "border-accent/25 bg-accent/8 text-accent group-hover:border-accent/45 group-hover:bg-accent/12",
                )}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={valueIcons[index % valueIcons.length]} />
                </svg>
              </span>
              <span className="font-mono text-xs font-semibold tracking-[0.18em] text-primary/45 uppercase">
                Value {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="relative mt-auto pt-8 font-display text-lg leading-snug text-secondary transition-colors duration-300 group-hover:text-primary sm:text-[1.2rem]">
              {value}
            </h3>

            <span
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
              aria-hidden="true"
            />
          </article>
        ))}
      </StaggerReveal>
    </Section>
  );
}
