import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { PageIntro } from "@/components/layout/PageIntro";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSiteContent } from "@/lib/data/content";
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
  const [projects, { pageHeroImages }] = await Promise.all([
    getProjects(),
    getSiteContent(),
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema("/portfolio")} />
      <PageIntro
        eyebrow="Our Work"
        title="Project Portfolio"
        description="A visual showcase of trusted delivery across residential, commercial, and infrastructure projects in Nepal and beyond."
        backgroundImage={pageHeroImages.portfolio}
        backgroundAlt="NEBCO construction cranes at a project site"
      />

      <Section className="pt-10 md:pt-14" glow="primary">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Proven Results"
            title="Esteemed Projects"
            description="Every project reflects NEBCO's commitment to quality craftsmanship, transparency, and on-time delivery."
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <PortfolioGrid projects={projects} />
        </ScrollReveal>
      </Section>

      <CtaBanner />
    </>
  );
}
