import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CoreValuesHoneycomb } from "@/components/sections/CoreValuesHoneycomb";

type AboutCoreValuesSectionProps = {
  values: string[];
};

export function AboutCoreValuesSection({ values }: AboutCoreValuesSectionProps) {
  return (
    <Section variant="muted" className="pt-6 pb-6 md:pt-8 md:pb-8" glow="none">
      <ScrollReveal>
        <SectionHeader
          eyebrow="What We Stand For"
          title="Our Core Values"
          description="The principles that guide every project, partnership, and decision we make."
          align="center"
          className="mx-auto"
        />
      </ScrollReveal>

      <CoreValuesHoneycomb values={values} />
    </Section>
  );
}
