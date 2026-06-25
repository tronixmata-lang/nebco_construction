import { CoreValuesArrowFlow } from "@/components/sections/CoreValuesArrowFlow";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

type AboutCoreValuesSectionProps = {
  values: string[];
};

export function AboutCoreValuesSection({ values }: AboutCoreValuesSectionProps) {
  return (
    <Section variant="muted">
      <ScrollReveal>
        <SectionHeader
          eyebrow="What We Stand For"
          title="Our Core Values"
          description="The principles that guide every project, partnership, and decision we make."
          align="center"
          className="mx-auto"
        />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <div className="mt-10">
          <CoreValuesArrowFlow values={values} />
        </div>
      </ScrollReveal>
    </Section>
  );
}
