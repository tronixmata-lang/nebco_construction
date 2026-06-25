import { getSiteContent, getValuePillars } from "@/lib/data/content";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ValuePillarsGrid } from "@/components/sections/ValuePillarsGrid";

type ValuePillarsProps = {
  showHeader?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  variant?: "default" | "muted" | "dark";
  id?: string;
  columns?: "five" | "three";
  revealOnScroll?: boolean;
};

export async function ValuePillars({
  showHeader = true,
  eyebrow,
  title,
  description,
  variant = "default",
  id = "values",
  columns = "five",
  revealOnScroll = false,
}: ValuePillarsProps = {}) {
  const [valuePillars, { homepageSections }] = await Promise.all([
    getValuePillars(),
    getSiteContent(),
  ]);

  const heading = {
    eyebrow: eyebrow ?? homepageSections.valuePillars.eyebrow,
    title: title ?? homepageSections.valuePillars.title,
    description: description ?? homepageSections.valuePillars.description,
  };

  return (
    <Section id={id} variant={variant} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-neutral-border" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      {showHeader && (
        <ScrollReveal>
          <SectionHeader
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
      )}

      <ValuePillarsGrid pillars={valuePillars} columns={columns} revealOnScroll={revealOnScroll} />
    </Section>
  );
}
