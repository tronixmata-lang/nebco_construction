import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { SectorCapabilityGrid } from "@/components/sectors/SectorCapabilityGrid";
import { SectorIcon } from "@/components/sectors/sector-icons";
import { ChairmanMessageSection } from "@/components/sections/ChairmanMessageSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LeaderMessageBody } from "@/components/leadership/LeaderMessageBody";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { getSiteContent } from "@/lib/data/content";
import { getAllSectorIds, getSectorProfileById } from "@/lib/data/sectors";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

type SectorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const ids = await getAllSectorIds();
  return ids.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = await getSectorProfileById(slug);
  if (!sector) return { title: "Sector Not Found" };

  return createPageMetadata({
    title: `${sector.title} | Industry Sectors`,
    description: sector.description,
    path: `/sectors/${sector.id}`,
    image: sector.image,
  });
}

export default async function SectorDetailPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const [sector, { pageHeroImages }] = await Promise.all([
    getSectorProfileById(slug),
    getSiteContent(),
  ]);

  if (!sector) notFound();

  const heroImage = sector.image ?? pageHeroImages.sectors;

  return (
    <>
      <JsonLd data={breadcrumbSchema(`/sectors/${sector.id}`, sector.title)} />
      <PageIntro
        eyebrow="Industry Sector"
        title={sector.title}
        description={sector.description}
        breadcrumbLabel={sector.title}
        showStats={false}
        backgroundImage={heroImage}
        backgroundAlt={`${sector.title}, NEBCO Construction`}
      />

      <Section className="pt-10 md:pt-14" glow="none">
        <ScrollReveal>
          <div className="mx-auto mb-10 flex max-w-6xl items-center gap-4 rounded-sm border border-accent/30 bg-accent/5 px-6 py-4 sm:px-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-neutral text-primary">
              <SectorIcon id={sector.id} className="[&_svg]:h-6 [&_svg]:w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                Sector Highlight
              </p>
              <p className="mt-1 font-medium text-secondary">{sector.highlight}</p>
            </div>
          </div>

          <ChairmanMessageSection
            message={{
              quote: sector.message.quote,
              author: sector.title,
              role: "NEBCO Industry Expertise",
              image: sector.image,
            }}
            variant="light"
            quoteVariant="standard"
            decorative
            eyebrow="Sector Perspective"
          />
        </ScrollReveal>

        {sector.message.body && sector.message.body.length > 0 && (
          <ScrollReveal delay={100} className="mt-14 md:mt-16">
            <LeaderMessageBody paragraphs={sector.message.body} />
          </ScrollReveal>
        )}
      </Section>

      <Section variant="muted" glow="primary">
        <ScrollReveal>
          <SectorCapabilityGrid capabilities={sector.capabilities} sectorTitle={sector.title} />
        </ScrollReveal>
        <ScrollReveal delay={120} className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">
            Discuss Your Project
          </Button>
          <Button href="/sectors" variant="outline">
            All Sectors
          </Button>
          <Button href="/portfolio" variant="ghost">
            View Portfolio
          </Button>
        </ScrollReveal>
      </Section>

      <CtaBanner />
    </>
  );
}
