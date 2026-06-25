import type { Metadata } from "next";

import { AboutCoreValuesSection } from "@/components/sections/AboutCoreValuesSection";

import { AboutLeadershipSection } from "@/components/sections/AboutLeadershipSection";

import { AboutMissionSection } from "@/components/sections/AboutMissionSection";

import { AboutStorySection } from "@/components/sections/AboutStorySection";

import { CertificateGallery } from "@/components/sections/CertificateGallery";

import { StatsBar } from "@/components/sections/StatsBar";

import { ValuePillars } from "@/components/sections/ValuePillars";

import { PageIntro } from "@/components/layout/PageIntro";

import { JsonLd } from "@/components/seo/JsonLd";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { Section } from "@/components/ui/Section";

import { SectionHeader } from "@/components/ui/SectionHeader";

import { getCertificates, getSiteContent } from "@/lib/data/content";

import { createStaticPageMetadata } from "@/lib/seo-metadata";

import { breadcrumbSchema } from "@/lib/seo";



export async function generateMetadata(): Promise<Metadata> {

  return createStaticPageMetadata("/about", {

    title: "About Us",

    description:

      "Learn about NEBCO's history, mission, vision, and values as Nepal's trusted A-Class construction company, established in 1995 under the Shah Group.",

  });

}



export default async function AboutPage() {

  const { about: aboutContent, certificateSection, pageHeroImages, chairmanMessage } =

    await getSiteContent();

  const certificates = await getCertificates();



  return (

    <>

      <JsonLd data={breadcrumbSchema("/about")} />

      <PageIntro

        eyebrow="About NEBCO"

        title="Building Confidence. Creating Value."

        description="For over three decades, NEBCO has been a trusted partner in construction, investment, and consulting across Nepal and beyond."

        backgroundImage={pageHeroImages.about}

        backgroundAlt="NEBCO construction project in progress"

      />



      <StatsBar />



      <AboutStorySection history={aboutContent.history} />



      <AboutMissionSection mission={aboutContent.mission} vision={aboutContent.vision} />



      <AboutLeadershipSection message={chairmanMessage} />



      <AboutCoreValuesSection values={aboutContent.values} />



      <ScrollReveal>

        <ValuePillars

          id="why-nebco"

          variant="default"

          eyebrow="The NEBCO Difference"

          title="Why Clients Choose NEBCO"

          description="A reputation built on quality craftsmanship, transparency, and results clients can rely on."

          columns="three"

        />

      </ScrollReveal>



      <Section variant="default" glow="none">
        <ScrollReveal>
          <SectionHeader
            eyebrow={certificateSection.title}
            title="Recognized Credentials, Earned Reputation"
            description={certificateSection.description}
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>

          <CertificateGallery certificates={certificates} />

        </ScrollReveal>

      </Section>

    </>

  );

}

