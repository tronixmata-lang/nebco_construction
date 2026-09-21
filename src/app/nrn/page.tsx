import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { NrnFeatureShowcase } from "@/components/nrn/NrnFeatureShowcase";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { nrnFeatureCategories, nrnPageIntro } from "@/content/nrn";
import { getSiteContent } from "@/lib/data/content";
import { createStaticPageMetadata } from "@/lib/seo-metadata";
import { breadcrumbSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/nrn", {
    title: "NRN Services",
    description:
      "Build in Nepal from abroad with Your Company, verified credentials, milestone payments, GPS-tagged progress, and a dedicated NRN client portal.",
  });
}

export default async function NrnPage() {
  const { pageHeroImages } = await getSiteContent();

  return (
    <>
      <JsonLd data={breadcrumbSchema("/nrn")} />
      <PageIntro
        eyebrow={nrnPageIntro.eyebrow}
        title={nrnPageIntro.title}
        description={nrnPageIntro.description}
        backgroundImage={pageHeroImages.nrn}
        backgroundAlt={nrnPageIntro.backgroundAlt}
      />

      <Section className="overflow-visible py-0 pt-6 md:pt-8" glow="primary" containerClassName="max-w-none px-0">
        <NrnFeatureShowcase categories={nrnFeatureCategories} />
      </Section>

      <CtaBanner />
    </>
  );
}
