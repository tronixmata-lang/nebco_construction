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
    <Section id="leadership" variant="muted" className="py-14 md:py-20" glow="none">
      <div className="about-leadership-shell mx-auto max-w-6xl rounded-sm border border-neutral-border bg-neutral px-6 py-10 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.2)] sm:px-10 sm:py-12 lg:px-14">
        <ScrollReveal>
          <ChairmanMessageSection
            message={message}
            variant="light"
            quoteVariant="standard"
            decorative
            eyebrow="Chairman's Message"
          >
            <Button href="/leadership" variant="outline">
              Meet Our Leadership
            </Button>
          </ChairmanMessageSection>
        </ScrollReveal>
      </div>
    </Section>
  );
}
