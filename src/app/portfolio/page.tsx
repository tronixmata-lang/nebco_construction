import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PageIntro } from "@/components/layout/PageIntro";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Project Portfolio",
  description:
    "Explore NEBCO's portfolio of commercial, residential, infrastructure, and industrial projects.",
};

export default function PortfolioPage() {
  return (
    <>
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
