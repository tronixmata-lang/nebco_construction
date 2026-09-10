import { InvestmentCalculator } from "@/components/divisions/investment/InvestmentCalculator";
import { InvestmentLegal } from "@/components/divisions/investment/InvestmentLegal";
import { InvestmentPartners } from "@/components/divisions/investment/InvestmentPartners";
import { InvestmentPortal } from "@/components/divisions/investment/InvestmentPortal";
import { InvestmentProducts } from "@/components/divisions/investment/InvestmentProducts";
import { InvestmentWhy } from "@/components/divisions/investment/InvestmentWhy";
import { DivisionBookingSection } from "@/components/divisions/ConsultingBookingSection";
import { DivisionProcessFlow } from "@/components/divisions/DivisionProcessFlow";
import { PageIntro } from "@/components/layout/PageIntro";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { investmentPage } from "@/content/investment-page";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";
import type { DivisionProfile } from "@/types";

type InvestmentDivisionPageProps = {
  division: DivisionProfile;
};

export function InvestmentDivisionPage({ division }: InvestmentDivisionPageProps) {
  const { hero, process, bottomCta } = investmentPage;
  const heroImage = division.heroImage ?? investmentPage.hero.image;
  const processSteps = division.process.length > 0 ? division.process : process;

  return (
    <>
      <JsonLd data={[serviceSchema(division), breadcrumbSchema("/divisions/investment", division.name)]} />
      <PageIntro
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbLabel={division.name}
        backgroundImage={heroImage}
        backgroundAlt="Modern NEBCO-backed building in Nepal"
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

      <Section id="products" className="scroll-mt-24 pt-10 pb-12 md:pt-12 md:pb-16" variant="muted" glow="accent">
        <InvestmentProducts products={division.capabilities} />
      </Section>

      <Section variant="dark" className="border-y border-accent/20 pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <InvestmentWhy />
      </Section>

      <Section className="pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Investment Process"
            title="From product choice to returns"
            description="Choose product, due diligence, agreement, construction or acquisition, rental management, then returns."
            align="center"
            compact
            className="mx-auto"
          />
        </ScrollReveal>
        <DivisionProcessFlow steps={[...processSteps]} />
      </Section>

      <Section id="calculator" className="scroll-mt-24 pt-10 pb-12 md:pt-12 md:pb-16" variant="muted" glow="primary">
        <InvestmentCalculator />
      </Section>

      <Section id="legal" className="scroll-mt-24 pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <InvestmentLegal />
      </Section>

      <Section className="pt-10 pb-12 md:pt-12 md:pb-16" variant="muted" glow="none">
        <InvestmentPortal />
      </Section>

      <Section className="pt-10 pb-12 md:pt-12 md:pb-16" glow="accent">
        <InvestmentPartners />
      </Section>

      <Section id="book-consultation" className="scroll-mt-24 pt-10 pb-12 md:pt-12 md:pb-16" glow="none">
        <DivisionBookingSection
          divisionSlug={division.id}
          divisionName={division.name}
          eyebrow="Talk to an Advisor"
          title="Book a free investment call"
          description="Choose a date and time. Bring a budget, a city, and the product you want to underwrite. We will follow up with the investment guide."
        />
      </Section>

      <CtaBanner
        className="pt-10 pb-12 md:pt-12 md:pb-16"
        title={bottomCta.title}
        description={bottomCta.description}
        primaryCta={{ label: bottomCta.primaryLabel, href: "#book-consultation" }}
        secondaryCta={{ label: bottomCta.secondaryLabel, href: bottomCta.guideHref }}
      />
    </>
  );
}
