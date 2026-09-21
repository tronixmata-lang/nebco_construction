import { ConsultingClients } from "@/components/divisions/consulting/ConsultingClients";
import { ConsultingPackages } from "@/components/divisions/consulting/ConsultingPackages";
import { ConsultingResources } from "@/components/divisions/consulting/ConsultingResources";
import { ConsultingServices } from "@/components/divisions/consulting/ConsultingServices";
import { ConsultingWhy } from "@/components/divisions/consulting/ConsultingWhy";
import { DivisionBookingSection } from "@/components/divisions/ConsultingBookingSection";
import { DivisionProcessFlow } from "@/components/divisions/DivisionProcessFlow";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { consultingPage } from "@/content/consulting-page";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";
import type { DivisionProfile } from "@/types";

type ConsultingDivisionPageProps = {
  division: DivisionProfile;
};

export function ConsultingDivisionPage({ division }: ConsultingDivisionPageProps) {
  const { hero, process } = consultingPage;
  const heroImage = division.heroImage ?? hero.image;
  const processSteps = division.process.length > 0 ? division.process : process;

  return (
    <>
      <JsonLd data={[serviceSchema(division), breadcrumbSchema("/divisions/consulting", division.name)]} />
      <PageIntro
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbLabel={division.name}
        backgroundImage={heroImage}
        backgroundAlt="Architectural drawings and consulting at Your Company"
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

      <Section id="services" className="scroll-mt-24 pt-10 pb-12 md:pt-12 md:pb-16" variant="muted" glow="accent">
        <ConsultingServices capabilities={division.capabilities} />
      </Section>

      <Section variant="dark" className="border-y border-accent/20 pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <ConsultingClients />
      </Section>

      <Section className="pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Process"
            title="From a free call to a deliverable"
            description="Initial call, scope, engagement, report, then follow-up, including a path into construction if you proceed."
            align="center"
            compact
            showRules={false}
            className="mx-auto"
          />
        </ScrollReveal>
        <DivisionProcessFlow steps={[...processSteps]} />
      </Section>

      <Section id="packages" className="scroll-mt-24 pt-10 pb-12 md:pt-12 md:pb-16" variant="muted" glow="primary">
        <ConsultingPackages />
      </Section>

      <Section variant="dark" className="border-y border-accent/20 pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <ConsultingWhy />
      </Section>

      <Section className="pt-10 pb-6 md:pt-12 md:pb-6" glow="none">
        <ConsultingResources />
      </Section>

      <Section id="book-consultation" className="scroll-mt-24 py-6 md:py-8" glow="none">
        <DivisionBookingSection
          divisionSlug={division.id}
          divisionName={division.name}
          eyebrow="Free 30-min call"
          title="Book your free 30-min call"
          description="Choose a date and time. Tell us whether you need a quote, a feasibility, or help with a stalled contractor."
        />
      </Section>
    </>
  );
}
