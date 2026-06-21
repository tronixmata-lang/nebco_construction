import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { DivisionFlipCard } from "@/components/sections/DivisionFlipCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { pageHeroImages } from "@/config/page-images";
import { getDivisions } from "@/lib/data/content";
import { createStaticPageMetadata } from "@/lib/seo-metadata";
import { breadcrumbSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/divisions", {
    title: "Business Divisions",
    description:
      "Explore NEBCO's three integrated business divisions: NEBCO Construction, NEBCO Investment, and NEBCO Consulting in Nepal.",
  });
}

export default async function DivisionsPage() {
  const divisions = await getDivisions();

  return (
    <>
      <JsonLd data={breadcrumbSchema("/divisions")} />
      <PageIntro
        eyebrow="Our Divisions"
        title="Integrated Business Structure"
        description="Three strategically connected divisions delivering comprehensive, trusted development solutions across Nepal."
        backgroundImage={pageHeroImages.divisions}
        backgroundAlt="NEBCO integrated construction and development"
      />
      <Section className="pt-10 md:pt-14" glow="accent">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Three Core Businesses"
            title="Specialized Expertise, Unified Delivery"
            description="Each division brings deep capability while working together as one trusted partner from concept to completion."
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
        <StaggerReveal className="grid items-stretch gap-8 lg:grid-cols-3" staggerMs={120}>
          {divisions.map((division) => (
            <DivisionFlipCard
              key={division.id}
              division={division}
              featured={division.id === "consulting"}
            />
          ))}
        </StaggerReveal>
      </Section>
      <Section variant="muted" glow="primary">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-2xl text-secondary">Need a solution that spans multiple divisions?</p>
          <p className="mt-3 text-text-muted">NEBCO&apos;s integrated structure means one trusted partner for construction, investment, and consulting — from concept to completion.</p>
          <div className="mt-8"><Button href="/contact">Contact Our Team</Button></div>
        </ScrollReveal>
      </Section>
      <CtaBanner />
    </>
  );
}
