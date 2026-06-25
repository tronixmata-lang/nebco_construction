import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { divisionIcons } from "@/lib/division-icons";
import { PageIntro } from "@/components/layout/PageIntro";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/ContentCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { DivisionCardHeader } from "@/components/ui/DivisionCardHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { getDivisionBySlug, getDivisions, getSiteContent } from "@/lib/data/content";
import { breadcrumbSchema, createPageMetadata, serviceSchema } from "@/lib/seo";

type DivisionPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const divisions = await getDivisions();
  return divisions.map((division) => ({ slug: division.slug }));
}

export async function generateMetadata({ params }: DivisionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const division = await getDivisionBySlug(slug);
  if (!division) return { title: "Vertical Not Found" };
  return createPageMetadata({ title: division.name, description: division.description, path: `/divisions/${division.slug}` });
}

export default async function DivisionPage({ params }: DivisionPageProps) {
  const { slug } = await params;
  const division = await getDivisionBySlug(slug);
  if (!division) notFound();

  const [divisions, { pageHeroImages }] = await Promise.all([
    getDivisions(),
    getSiteContent(),
  ]);
  const otherDivisions = divisions.filter((d) => d.slug !== slug);

  return (
    <>
      <JsonLd data={[serviceSchema(division), breadcrumbSchema(`/divisions/${division.slug}`, division.name)]} />
      <PageIntro
        eyebrow="Our Vertical"
        title={division.name}
        description={division.tagline}
        breadcrumbLabel={division.name}
        backgroundImage={pageHeroImages.divisions}
        backgroundAlt={`${division.name} — NEBCO`}
      />
      <Section className="pt-10 md:pt-14" glow="primary">
        <ScrollReveal>
          <DivisionCardHeader icon={divisionIcons[division.id]} />
          <SectionHeader title="Overview" description={division.description} className="mt-6" />
        </ScrollReveal>
      </Section>
      <Section variant="muted" glow="accent">
        <ScrollReveal>
          <SectionHeader title="Our Services" description="Specialized capabilities delivered with NEBCO's trusted quality standards." />
        </ScrollReveal>
        <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerMs={70}>
          {division.services.map((service: string) => (
            <ContentCard key={service} className="p-5">
              <p className="font-medium text-secondary">{service}</p>
            </ContentCard>
          ))}
        </StaggerReveal>
      </Section>
      <Section glow="primary">
        <ScrollReveal>
          <SectionHeader title="Other Verticals" align="center" className="mx-auto" />
        </ScrollReveal>
        <StaggerReveal className="grid gap-6 md:grid-cols-2" staggerMs={100}>
          {otherDivisions.map((other) => (
            <ContentCard key={other.id} className="p-6 text-center sm:text-left">
              <span className="flex h-10 w-10 items-center justify-center text-primary">{divisionIcons[other.id]}</span>
              <h3 className="mt-4 font-display text-lg font-bold text-secondary">{other.name}</h3>
              <p className="mt-2 text-sm text-text-muted">{other.description}</p>
              <div className="mt-4"><Button href={other.href} variant="outline" size="sm">Explore {other.shortName}</Button></div>
            </ContentCard>
          ))}
        </StaggerReveal>
      </Section>
      <CtaBanner />
    </>
  );
}
