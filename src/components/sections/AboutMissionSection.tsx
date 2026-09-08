import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { AboutMissionReveal } from "@/components/sections/about/AboutMissionReveal";

type AboutMissionSectionProps = {
  mission: string;
  vision: string;
  ethos: string;
};

export function AboutMissionSection({ mission, vision, ethos }: AboutMissionSectionProps) {
  return (
    <Section
      className="about-mission-section relative overflow-hidden bg-neutral pt-6 pb-8 md:pt-8 md:pb-10"
      glow="none"
    >
      <div
        className="about-mission-section__wash pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full bg-accent/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-primary/6 blur-3xl"
        aria-hidden="true"
      />

      <ScrollReveal>
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <p className="font-label text-sm text-accent">Purpose & Direction</p>
          <span className="mx-auto mt-4 block h-px w-10 bg-accent" aria-hidden="true" />
          <h2 className="mt-4 font-display text-3xl tracking-tight text-secondary sm:text-4xl">
            Mission, Vision & Ethos
          </h2>
          <span className="mx-auto mt-4 block h-0.5 w-12 rounded-full bg-primary" aria-hidden="true" />
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-text-muted">
            The principles that define how we build, how we grow, and how we partner with clients
            and communities across Nepal and beyond.
          </p>
        </div>
      </ScrollReveal>

      <AboutMissionReveal mission={mission} vision={vision} ethos={ethos} />
    </Section>
  );
}
