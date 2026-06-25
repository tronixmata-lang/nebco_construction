import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const milestones = [
  { value: "1995", label: "Established", detail: "Founded under the Shah Group vision" },
  { value: "2001", label: "Officially Registered", detail: "Formal incorporation in Nepal" },
  { value: "A-Class", label: "Construction License", detail: "Highest tier licensing in Nepal" },
  { value: "Shah Group", label: "Parent Company", detail: "Part of a trusted business legacy" },
] as const;

type AboutStorySectionProps = {
  history: string;
};

export function AboutStorySection({ history }: AboutStorySectionProps) {
  return (
    <Section className="pt-10 md:pt-14">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Our Story"
            title="Three Decades of Trusted Delivery"
            description={history}
          />

          <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {milestones.map((item) => (
              <div
                key={item.label}
                className="rounded-sm border border-neutral-border bg-neutral p-5"
              >
                <dt className="font-display text-xl text-primary">{item.value}</dt>
                <dd className="mt-1 text-sm font-semibold text-secondary">{item.label}</dd>
                <dd className="mt-1 text-sm leading-relaxed text-text-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-neutral-border bg-neutral-muted shadow-sm">
            <Image
              src="/images/site/1-7_11zon-scaled.jpg"
              alt="A NEBCO construction project in progress"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
