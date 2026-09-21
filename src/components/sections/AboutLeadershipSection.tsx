import { AboutChairmanReveal } from "@/components/sections/about/AboutChairmanReveal";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Link from "next/link";
import type { ChairmanMessageData } from "@/components/sections/ChairmanMessageSection";

type AboutLeadershipSectionProps = {
  message: ChairmanMessageData;
};

export function AboutLeadershipSection({ message }: AboutLeadershipSectionProps) {
  return (
    <Section id="leadership" variant="muted" className="about-leadership-section pt-6 pb-8 md:pt-8 md:pb-10" glow="none">
      <div
        className="about-leadership-section__wash pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />

      <ScrollReveal>
        <SectionHeader
          eyebrow="Leadership"
          title="Words From Our Leadership"
          description="Three decades of building with integrity — guided by the standards and vision of the Your Group."
          align="center"
          className="mx-auto mb-8 md:mb-10"
        />
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <AboutChairmanReveal message={message} eyebrow="Chairman's Message">
          <Link href="/leadership" className="about-chairman-showcase__cta-btn group inline-flex items-center gap-3">
            <span>Meet Our Leadership</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </AboutChairmanReveal>
      </ScrollReveal>
    </Section>
  );
}
