import { getValuePillars } from "@/lib/data/content";
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

      <ValuePillarsGrid pillars={valuePillars} columns={columns} />
    </Section>
  );
}
