import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { AboutMissionReveal } from "@/components/sections/about/AboutMissionReveal";

type AboutMissionSectionProps = {
  mission: string;
  vision: string;
};

export function AboutMissionSection({ mission, vision }: AboutMissionSectionProps) {
  return (
    <Section className="bg-neutral py-14 md:py-20" glow="none">
      <ScrollReveal>
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">Purpose & Direction</p>
          <span className="mx-auto mt-4 block h-0.5 w-12 rounded-full bg-primary" aria-hidden="true" />
          <h2 className="mt-5 font-display text-3xl tracking-tight text-secondary sm:text-4xl">
            Mission & Vision
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">
            The principles that guide our work and define our long-term commitment to clients and
            communities.
          </p>
        </div>
      </ScrollReveal>

      <AboutMissionReveal mission={mission} vision={vision} />
    </Section>
  );
}
