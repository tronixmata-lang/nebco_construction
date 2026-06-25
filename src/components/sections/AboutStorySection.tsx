import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AboutStoryReveal } from "@/components/sections/about/AboutStoryReveal";
import { AboutTimelineScroll } from "@/components/sections/about/AboutTimelineScroll";

const milestones = [
  { year: "1995", title: "Founded", detail: "Established under the Shah Group vision" },
  { year: "2001", title: "Registered", detail: "Formal incorporation in Nepal" },
  { year: "A-Class", title: "Licensed", detail: "Highest-tier construction credentials" },
  { year: "Today", title: "Trusted", detail: "Projects across Nepal and beyond" },
] as const;

type AboutStorySectionProps = {
  history: string;
};

export function AboutStorySection({ history }: AboutStorySectionProps) {
  return (
    <Section className="pt-14 md:pt-20" glow="primary">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
        <div>
          <ScrollReveal>
            <SectionHeader
              eyebrow="Our Story"
              title="Three Decades of Trusted Delivery"
              description={history}
            />
          </ScrollReveal>

          <AboutTimelineScroll milestones={milestones} />
        </div>

        <AboutStoryReveal />
      </div>
    </Section>
  );
}
