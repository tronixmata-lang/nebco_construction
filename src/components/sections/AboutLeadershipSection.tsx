import { ChairmanMessageSection } from "@/components/sections/ChairmanMessageSection";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import type { ChairmanMessageData } from "@/components/sections/ChairmanMessageSection";

type AboutLeadershipSectionProps = {
  message: ChairmanMessageData;
};

export function AboutLeadershipSection({ message }: AboutLeadershipSectionProps) {
  return (
    <Section id="leadership">
      <ScrollReveal>
        <ChairmanMessageSection
          message={message}
          variant="light"
          quoteVariant="standard"
          decorative={false}
          eyebrow="Chairman's Message"
        >
          <Button href="/leadership" variant="outline">
            Meet Our Leadership
          </Button>
        </ChairmanMessageSection>
      </ScrollReveal>
    </Section>
  );
}
