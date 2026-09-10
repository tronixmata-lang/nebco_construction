import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConsultingDivisionPage } from "@/components/divisions/consulting/ConsultingDivisionPage";
import { ConstructionDivisionPage } from "@/components/divisions/construction/ConstructionDivisionPage";
import { InvestmentDivisionPage } from "@/components/divisions/investment/InvestmentDivisionPage";
import {
  DivisionCapabilitiesSection,
  DivisionCommitments,
  DivisionProjectsPreview,
} from "@/components/divisions/DivisionDetailSections";
import { DivisionOtherVerticals } from "@/components/divisions/DivisionOtherVerticals";
import { DivisionBookingSection } from "@/components/divisions/ConsultingBookingSection";
import { DivisionOverviewReveal } from "@/components/divisions/DivisionOverviewReveal";
import { DivisionProcessFlow } from "@/components/divisions/DivisionProcessFlow";
import { PageIntro } from "@/components/layout/PageIntro";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDivisions, getSiteContent } from "@/lib/data/content";
import { getDivisionProfileBySlug } from "@/lib/data/divisions";
import { getProjects } from "@/lib/data/projects";
import { breadcrumbSchema, createPageMetadata, serviceSchema } from "@/lib/seo";
import type { Project } from "@/types";

type DivisionPageProps = {
  params: Promise<{ slug: string }>;
};

const DIVISION_PROJECT_CATEGORIES: Record<string, Project["category"][]> = {
  construction: ["residential", "commercial", "industrial"],
  investment: ["infrastructure", "commercial"],
  consulting: ["residential", "commercial", "infrastructure"],
};

const DIVISION_OVERVIEW_STATS: Record<string, Array<{ value: string; label: string }>> = {
  investment: [
    { value: "35+", label: "Years of Trust" },
    { value: "Scale", label: "Infrastructure" },
    { value: "Shah Group", label: "Backed" },
  ],
  consulting: [
    { value: "Design", label: "To Delivery" },
    { value: "A-Class", label: "Standards" },
    { value: "Owner", label: "Advisory" },
  ],
};

function featuredProjectsForDivision(slug: string, projects: Project[]) {
  const categories = DIVISION_PROJECT_CATEGORIES[slug];
  const pool = categories
    ? projects.filter((project) => categories.includes(project.category))
    : projects;
  const source = pool.length >= 3 ? pool : projects;

  const picked: Project[] = [];
  if (categories) {
    for (const category of categories) {
      const match = source.find(
        (project) => project.category === category && !picked.some((item) => item.id === project.id),
      );
      if (match) picked.push(match);
    }
  }

  for (const project of source) {
    if (picked.length >= 3) break;
    if (!picked.some((item) => item.id === project.id)) picked.push(project);
  }

  return picked.slice(0, 3);
}

export async function generateStaticParams() {
  const divisions = await getDivisions();
  return divisions.map((division) => ({ slug: division.slug }));
}

export async function generateMetadata({ params }: DivisionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const division = await getDivisionProfileBySlug(slug);
  if (!division) return { title: "Vertical Not Found" };
  return createPageMetadata({
    title: division.name,
    description: division.overview,
    path: `/divisions/${division.slug}`,
    image: division.heroImage,
  });
}

export default async function DivisionPage({ params }: DivisionPageProps) {
  const { slug } = await params;
  const division = await getDivisionProfileBySlug(slug);
  if (!division) notFound();

  const [{ pageHeroImages }, divisions, projects] = await Promise.all([
    getSiteContent(),
    getDivisions(),
    getProjects(),
  ]);

  const otherDivisions = divisions.filter((d) => d.slug !== slug);

  if (slug === "construction") {
    return (
      <ConstructionDivisionPage
        division={division}
        projects={projects}
      />
    );
  }

  if (slug === "investment") {
    return <InvestmentDivisionPage division={division} />;
  }

  if (slug === "consulting") {
    return <ConsultingDivisionPage division={division} />;
  }

  const heroImage = division.heroImage ?? pageHeroImages.divisions;
  const featuredProjects = featuredProjectsForDivision(slug, projects);
  const overviewStats = DIVISION_OVERVIEW_STATS[slug];

  return (
    <>
      <JsonLd
        data={[serviceSchema(division), breadcrumbSchema(`/divisions/${division.slug}`, division.name)]}
      />
      <PageIntro
        eyebrow="Our Vertical"
        title={division.name}
        description={division.tagline}
        breadcrumbLabel={division.name}
        backgroundImage={heroImage}
        backgroundAlt={`${division.name}, NEBCO`}
      />

      <Section className="pt-10 pb-10 md:pt-14 md:pb-14" glow="primary">
        <DivisionOverviewReveal
          overview={division.overview}
          image={heroImage}
          imageAlt={`${division.name} project showcase`}
          divisionName={division.shortName}
          stats={overviewStats}
          title="Built for Serious Projects"
        />
      </Section>

      <Section variant="muted" className="pt-10 pb-12 md:pt-12 md:pb-16" glow="accent">
        <DivisionCapabilitiesSection
          capabilities={division.capabilities}
          divisionName={division.shortName}
        />
      </Section>

      <Section className="pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <ScrollReveal>
          <SectionHeader
            eyebrow="How We Deliver"
            title="Our Delivery Process"
            description="A structured approach that keeps scope, quality, and timelines aligned from first consultation through final handover."
            align="center"
            className="mx-auto mb-10 md:mb-12"
          />
        </ScrollReveal>
        <DivisionProcessFlow steps={division.process} />
      </Section>

      <Section variant="dark" className="border-y border-accent/20 pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <DivisionCommitments commitments={division.commitments} />
      </Section>

      <Section id="book-consultation" className="pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <DivisionBookingSection divisionSlug={division.id} divisionName={division.name} />
      </Section>

      <Section className="pt-10 pb-12 md:pt-12 md:pb-16" glow="accent">
        <DivisionProjectsPreview projects={featuredProjects} />
      </Section>

      <Section variant="muted" className="pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <DivisionOtherVerticals divisions={otherDivisions} />
      </Section>

      <CtaBanner className="pt-10 pb-12 md:pt-12 md:pb-16" />
    </>
  );
}
