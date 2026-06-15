import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Project Portfolio",
  description:
    "Explore NEBCO's portfolio of commercial, residential, infrastructure, and industrial construction projects across Kathmandu and Nepal.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/portfolio")} />
      <PageIntro
        eyebrow="Our Work"
        title="Project Portfolio"
        description="A visual showcase of trusted delivery across residential, commercial, and infrastructure projects in Nepal and beyond."
      />

      <Section className="pt-10 md:pt-14">
        <SectionHeader
          eyebrow="Proven Results"
          title="Esteemed Projects"
          description="Every project reflects NEBCO's commitment to quality craftsmanship, transparency, and on-time delivery."
          align="center"
          className="mx-auto"
        />
        <PortfolioGrid />
      </Section>
    </>
  );
}
