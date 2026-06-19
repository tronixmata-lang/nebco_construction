import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProjects } from "@/lib/data/projects";
import { createStaticPageMetadata } from "@/lib/seo-metadata";
import { breadcrumbSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/portfolio", {
    title: "Project Portfolio",
    description:
      "Explore NEBCO's portfolio of commercial, residential, infrastructure, and industrial construction projects across Kathmandu and Nepal.",
  });
}

export default async function PortfolioPage() {
  const projects = await getProjects();

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
        <PortfolioGrid projects={projects} />
      </Section>
    </>
  );
}
