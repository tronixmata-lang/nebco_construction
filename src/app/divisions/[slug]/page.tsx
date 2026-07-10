import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { divisionIcons } from "@/lib/division-icons";
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
import { TrustedBadge } from "@/components/ui/TrustedBadge";
import { Section } from "@/components/ui/Section";
import { getDivisions, getSiteContent } from "@/lib/data/content";
import { getDivisionProfileBySlug } from "@/lib/data/divisions";
import { getProjects } from "@/lib/data/projects";
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
  const heroImage = division.heroImage ?? pageHeroImages.divisions;
  const featuredProjects = projects.slice(0, 3).map((project) => ({
    slug: project.slug,
    title: project.title,
    location: project.location,
    image: project.image ?? project.images?.[0] ?? "/images/home.jpg",
  }));

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
        showStats={false}
        backgroundImage={heroImage}
        backgroundAlt={`${division.name}, NEBCO`}
      />

      <Section className="pt-10 md:pt-14" glow="primary">
        <ScrollReveal>
          <div className="mx-auto mb-10 flex max-w-6xl flex-col gap-4 rounded-sm border border-accent/30 bg-accent/5 px-6 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-8">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-neutral text-primary">
              {divisionIcons[division.id]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                Vertical Highlight
              </p>
              <p className="mt-1 text-base font-medium leading-relaxed text-secondary sm:text-lg">
                {division.highlight}
              </p>
            </div>
            <TrustedBadge label="A-Class" className="self-start sm:self-center" />
          </div>
        </ScrollReveal>

        <DivisionOverviewReveal
          overview={division.overview}
          image={heroImage}
          imageAlt={`${division.name} project showcase`}
          divisionName={division.shortName}
        />
      </Section>

      <Section variant="muted" className="py-14 md:py-20" glow="accent">
        <DivisionCapabilitiesSection
          capabilities={division.capabilities}
          divisionName={division.shortName}
        />
      </Section>

      <Section className="py-14 md:py-20" glow="none">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">How We Deliver</p>
          <h2 className="mt-3 font-display text-2xl text-secondary sm:text-3xl">Our Delivery Process</h2>
          <p className="mt-4 text-base text-text-muted">
            A structured approach that keeps scope, quality, and timelines aligned from first consultation
            through final handover.
          </p>
        </ScrollReveal>
        <div className="mt-10">
          <DivisionProcessFlow steps={division.process} />
        </div>
      </Section>

      <Section variant="muted" className="py-14 md:py-20" glow="primary">
        <DivisionCommitments commitments={division.commitments} />
      </Section>

      <Section className="py-14 md:py-20" glow="none">
        <DivisionBookingSection divisionSlug={division.id} divisionName={division.name} />
      </Section>

      <Section className="py-14 md:py-20" glow="accent">
        <DivisionProjectsPreview projects={featuredProjects} />
      </Section>

      <Section variant="muted" className="py-14 md:py-20" glow="none">
        <DivisionOtherVerticals divisions={otherDivisions} />
      </Section>

      <CtaBanner />
    </>
  );
}
