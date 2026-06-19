import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { divisionIcons } from "@/lib/division-icons";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { DivisionCardHeader } from "@/components/ui/DivisionCardHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDivisionBySlug, getDivisions } from "@/lib/data/content";
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
  if (!division) return { title: "Division Not Found" };
  return createPageMetadata({ title: division.name, description: division.description, path: `/divisions/${division.slug}` });
}

export default async function DivisionPage({ params }: DivisionPageProps) {
  const { slug } = await params;
  const division = await getDivisionBySlug(slug);
  if (!division) notFound();

  const divisions = await getDivisions();
  const otherDivisions = divisions.filter((d) => d.slug !== slug);

  return (
    <>
      <JsonLd data={[serviceSchema(division), breadcrumbSchema(`/divisions/${division.slug}`, division.name)]} />
      <PageIntro eyebrow="Business Division" title={division.name} description={division.tagline} breadcrumbLabel={division.name} />
      <Section className="pt-10 md:pt-14">
        <DivisionCardHeader icon={divisionIcons[division.id]} />
        <SectionHeader title="Overview" description={division.description} className="mt-6" />
      </Section>
      <Section variant="muted">
        <SectionHeader title="Our Services" description="Specialized capabilities delivered with NEBCO's trusted quality standards." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {division.services.map((service: string) => (
            <div key={service} className="rounded-sm border border-neutral-border bg-neutral p-5 transition-colors hover:border-primary/30">
              <p className="font-medium text-secondary">{service}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeader title="Other Divisions" align="center" className="mx-auto" />
        <div className="grid gap-6 md:grid-cols-2">
          {otherDivisions.map((other) => (
            <div key={other.id} className="group rounded-sm border border-neutral-border bg-neutral p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:text-left">
              <span className="flex h-10 w-10 items-center justify-center text-primary">{divisionIcons[other.id]}</span>
              <h3 className="mt-4 font-display text-lg font-bold text-secondary">{other.name}</h3>
              <p className="mt-2 text-sm text-text-muted">{other.description}</p>
              <div className="mt-4"><Button href={other.href} variant="outline" size="sm">Explore {other.shortName}</Button></div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
