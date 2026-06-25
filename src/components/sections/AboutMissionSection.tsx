import { MissionVisionCards } from "@/components/sections/MissionVisionCards";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

type AboutMissionSectionProps = {
  mission: string;
  vision: string;
};

export function AboutMissionSection({ mission, vision }: AboutMissionSectionProps) {
  return (
    <Section variant="muted">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Purpose & Direction"
          title="Mission & Vision"
          description="The principles that guide our work and define our long-term commitment to clients and communities."
          align="center"
          className="mx-auto"
        />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <div className="mt-10">
          <MissionVisionCards mission={mission} vision={vision} />
        </div>
      </ScrollReveal>
    </Section>
  );
}
