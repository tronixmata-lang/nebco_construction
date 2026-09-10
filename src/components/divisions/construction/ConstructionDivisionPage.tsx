import { ConstructionBeforeAfter } from "@/components/divisions/construction/ConstructionBeforeAfter";
import { ConstructionPortfolio } from "@/components/divisions/construction/ConstructionPortfolio";
import { ConstructionServices } from "@/components/divisions/construction/ConstructionServices";
import { ConstructionStandards } from "@/components/divisions/construction/ConstructionStandards";
import { ConstructionWhy } from "@/components/divisions/construction/ConstructionWhy";
import { DivisionBookingSection } from "@/components/divisions/ConsultingBookingSection";
import { DivisionProcessFlow } from "@/components/divisions/DivisionProcessFlow";
import { PageIntro } from "@/components/layout/PageIntro";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { constructionPage } from "@/content/construction-page";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";
import type { DivisionProfile, Project } from "@/types";

type ConstructionDivisionPageProps = {
  division: DivisionProfile;
  projects: Project[];
};

export function ConstructionDivisionPage({
  division,
  projects,
}: ConstructionDivisionPageProps) {
  const { hero, flagship, process, bottomCta } = constructionPage;
  const heroImage = division.heroImage ?? "/images/site/1-7_11zon-scaled.jpg";
  const processSteps = division.process.length > 0 ? division.process : process;

  return (
    <>
      <JsonLd data={[serviceSchema(division), breadcrumbSchema("/divisions/construction", division.name)]} />
      <PageIntro
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbLabel={division.name}
        backgroundImage={heroImage}
        backgroundAlt="NEBCO flagship construction in Nepal"
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={hero.primaryCta.href} size="lg">
            {hero.primaryCta.label}
          </Button>
          <Button
            href={hero.secondaryCta.href}
            variant="outline"
            size="lg"
            className="border-neutral/80 text-neutral hover:bg-neutral hover:text-secondary"
          >
            {hero.secondaryCta.label}
          </Button>
        </div>
      </PageIntro>

      <Section className="scroll-mt-24 pt-10 pb-12 md:pt-14 md:pb-16" glow="primary">
        <ConstructionBeforeAfter {...flagship} />
      </Section>

      <Section variant="muted" className="scroll-mt-24 pt-10 pb-12 md:pt-12 md:pb-16" glow="accent">
        <ConstructionServices services={division.capabilities} />
      </Section>

      <Section className="pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <ScrollReveal>
          <SectionHeader
            eyebrow="How It Works"
            title="Five steps from first meeting to warranty"
            description="Consultation, design and BOQ, contract, construction, then handover with a structural warranty."
            align="center"
            compact
            className="mx-auto"
          />
        </ScrollReveal>
        <DivisionProcessFlow steps={[...processSteps]} />
      </Section>

      <Section variant="dark" className="border-y border-accent/20 pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <ConstructionWhy />
      </Section>

      <Section className="scroll-mt-24 pt-10 pb-12 md:pt-12 md:pb-16" glow="accent">
        <ConstructionPortfolio projects={projects} />
      </Section>

      <Section variant="muted" className="pt-8 pb-10 md:pt-10 md:pb-12" glow="none">
        <ConstructionStandards />
      </Section>

      <Section
        id="book-consultation"
        className="scroll-mt-24 pt-10 pb-12 md:pt-12 md:pb-16"
        glow="none"
      >
        <DivisionBookingSection
          divisionSlug={division.id}
          divisionName={division.name}
          eyebrow="Talk to an Engineer"
          title="Talk to an engineer"
          description="Book a session with the construction team. Bring your site, drawings, or questions about scope and cost."
        />
      </Section>

      <CtaBanner
        className="pt-10 pb-12 md:pt-12 md:pb-16"
        title={bottomCta.title}
        description={bottomCta.description}
        primaryCta={{ label: bottomCta.primaryLabel, href: "#book-consultation" }}
        secondaryCta={{ label: bottomCta.engineerLabel, href: "#book-consultation" }}
      />
    </>
  );
}
