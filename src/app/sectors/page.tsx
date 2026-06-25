import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { SectorShowcaseList } from "@/components/sectors/SectorShowcaseList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSiteContent } from "@/lib/data/content";
import { createStaticPageMetadata } from "@/lib/seo-metadata";
import { breadcrumbSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/sectors", {
    title: "Industry Sectors",
    description:
      "NEBCO serves residential, commercial, infrastructure, real estate, industrial, and consulting sectors across Kathmandu and Nepal.",
  });
}

export default async function SectorsPage() {
  const { pageHeroImages } = await getSiteContent();

  return (
    <>
      <JsonLd data={breadcrumbSchema("/sectors")} />
      <PageIntro
        eyebrow="Industries"
        title="Sectors We Serve"
        description="Our expertise spans six key sectors, backed by A-Class credentials and a proven track record across Nepal."
        backgroundImage={pageHeroImages.sectors}
        backgroundAlt="NEBCO infrastructure and construction sectors"
      />

      <Section className="pt-10 md:pt-14" glow="none">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Sector Atlas"
            title="Explore Our Industry Expertise"
            description="Select a sector to view capabilities, perspective, and how NEBCO delivers value in each field."
            align="center"
            className="mx-auto mb-12"
          />
        </ScrollReveal>
        <SectorShowcaseList />
      </Section>

      <CtaBanner />
    </>
  );
}
