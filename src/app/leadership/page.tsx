import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { ChairmanMessageSection } from "@/components/sections/ChairmanMessageSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LeadershipTeam } from "@/components/sections/LeadershipTeam";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig, NEBCO_FACEBOOK_URL } from "@/config/site";
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

export default async function LeadershipPage() {
  const [{ chairmanMessage, pageHeroImages }, leaders] = await Promise.all([
    getSiteContent(),
    getLeaders(),
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema("/leadership")} />
      <PageIntro
        eyebrow="Leadership"
        title="Guiding Vision, Driving Excellence"
        description="Decades of experience in construction, investment, and consulting, led with integrity under the Shah Group."
        backgroundImage={pageHeroImages.leadership}
        backgroundAlt="NEBCO leadership and construction team"
      />
      <Section className="pt-10 md:pt-14" glow="none">
        <ScrollReveal>
          <ChairmanMessageSection
            message={chairmanMessage}
            variant="light"
            quoteVariant="standard"
            decorative
          />
        </ScrollReveal>
      </Section>
      <Section variant="muted" glow="primary">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Our Team"
            title="Leadership Team"
            description="The people who lead NEBCO's strategic direction and operational excellence."
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <LeadershipTeam
            leaders={leaders}
            socialFallback={{
              facebook: siteConfig.social.facebook || NEBCO_FACEBOOK_URL,
              linkedin: siteConfig.social.linkedin || undefined,
            }}
          />
        </ScrollReveal>
      </Section>
      <CtaBanner />
    </>
  );
}

