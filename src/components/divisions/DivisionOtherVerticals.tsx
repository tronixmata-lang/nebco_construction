import { DivisionIcon } from "@/lib/division-icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { Button } from "@/components/ui/Button";
import type { Division } from "@/types";

type DivisionOtherVerticalsProps = {
  divisions: Division[];
};

export function DivisionOtherVerticals({ divisions }: DivisionOtherVerticalsProps) {
  if (divisions.length === 0) return null;

  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Integrated Group"
          title="Explore Other Verticals"
          description="NEBCO's verticals work together so clients can move from advisory and investment through construction with one trusted partner."
          align="center"
          className="mx-auto mb-8 md:mb-10"
        />
      </ScrollReveal>

      <StaggerReveal className="grid gap-6 md:grid-cols-2" staggerMs={100}>
        {divisions.map((division) => (
          <article
            key={division.id}
            className="group relative overflow-hidden rounded-sm border border-neutral-border bg-neutral p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg sm:p-8"
          >
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            <span className="flex shrink-0 items-center justify-start">
              <DivisionIcon id={division.id} className="division-mark" />
            </span>
            <h3 className="mt-5 font-display text-2xl text-secondary">{division.name}</h3>
            <p className="mt-1 text-sm font-medium text-accent">{division.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{division.description}</p>
            <div className="mt-6">
              <Button href={division.href} variant="outline" size="sm">
                Explore {division.shortName}
              </Button>
            </div>
          </article>
        ))}
      </StaggerReveal>
    </div>
  );
}
