import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { InsightCard } from "@/components/insights/InsightCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { pageHeroImages } from "@/config/page-images";
import { getInsights } from "@/lib/data/insights";
import { createStaticPageMetadata } from "@/lib/seo-metadata";
import { breadcrumbSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/insights", {
    title: "Insights & News",
    description:
      "Industry perspectives on construction, earthquake-resistant building, infrastructure development, investment, and project management in Nepal.",
  });
}

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <>
      <JsonLd data={breadcrumbSchema("/insights")} />
      <PageIntro
        eyebrow="Insights"
        title="Industry Perspectives"
        description="Thought leadership on construction trends, infrastructure development, and trusted project delivery in Nepal."
        backgroundImage={pageHeroImages.insights}
        backgroundAlt="NEBCO construction insights and industry news"
      />
      <Section className="pt-10 md:pt-14" glow="primary">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Knowledge & Expertise"
            title="Latest Articles"
            description="Expert guidance from NEBCO's decades of experience in construction and development."
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
        <StaggerReveal className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerMs={100}>
          {insights.map((article) => (
            <InsightCard key={article.id} article={article} />
          ))}
        </StaggerReveal>
      </Section>
      <CtaBanner />
    </>
  );
}
