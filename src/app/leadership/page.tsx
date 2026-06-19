import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getLeaders, getSiteContent } from "@/lib/data/content";
import { createStaticPageMetadata } from "@/lib/seo-metadata";
import { breadcrumbSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/leadership", {
    title: "Leadership",
    description:
      "Meet the leadership team behind NEBCO's vision for integrated construction, investment, and consulting across Nepal.",
  });
}

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default async function LeadershipPage() {
  const { chairmanMessage } = await getSiteContent();
  const leaders = await getLeaders();

  return (
    <>
      <JsonLd data={breadcrumbSchema("/leadership")} />
      <PageIntro eyebrow="Leadership" title="Guiding Vision, Driving Excellence" description="Decades of experience in construction, investment, and consulting — led with integrity under the Shah Group." />
      <Section variant="dark" className="pt-10 md:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-8 text-sm font-semibold tracking-[0.2em] text-accent uppercase">Chairman&apos;s Message</p>
          <blockquote className="font-display text-xl leading-relaxed font-medium text-neutral md:text-2xl">&ldquo;{chairmanMessage.quote}&rdquo;</blockquote>
          <p className="mt-6 font-semibold text-neutral">{chairmanMessage.author}</p>
          <p className="text-sm text-neutral/60">{chairmanMessage.role}</p>
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Our Team" title="Leadership Team" description="The people who lead NEBCO's strategic direction and operational excellence." align="center" className="mx-auto" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((leader) => (
            <div key={leader.id} className="group rounded-sm border border-neutral-border bg-neutral p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary font-display text-lg text-neutral">{getInitials(leader.name)}</div>
              <h3 className="font-display text-lg text-secondary">{leader.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{leader.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">{leader.bio}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
