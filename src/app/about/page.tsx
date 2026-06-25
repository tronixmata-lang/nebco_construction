import type { Metadata } from "next";
import { AboutCoreValuesSection } from "@/components/sections/AboutCoreValuesSection";
import { AboutCredentialsSection } from "@/components/sections/AboutCredentialsSection";
import { AboutLeadershipSection } from "@/components/sections/AboutLeadershipSection";
import { AboutMissionSection } from "@/components/sections/AboutMissionSection";
import { AboutStorySection } from "@/components/sections/AboutStorySection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
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
  const {
    about: aboutContent,
    aboutPageIntro,
    certificateSection,
    pageHeroImages,
    chairmanMessage,
  } = await getSiteContent();
  const certificates = await getCertificates();

  return (
    <>
      <JsonLd data={breadcrumbSchema("/about")} />
      <PageIntro
        eyebrow={aboutPageIntro.eyebrow}
        title={aboutPageIntro.title}
        description={aboutPageIntro.description}
        backgroundImage={pageHeroImages.about}
        backgroundAlt={aboutPageIntro.backgroundAlt}
      />

      <AboutStorySection history={aboutContent.history} />

      <AboutMissionSection mission={aboutContent.mission} vision={aboutContent.vision} />

      <AboutLeadershipSection message={chairmanMessage} />

      <AboutCoreValuesSection values={aboutContent.values} />

      <ValuePillars
        id="why-nebco"
        variant="muted"
        eyebrow="The NEBCO Difference"
        title="Why Clients Choose NEBCO"
        description="A reputation built on quality craftsmanship, transparency, and results clients can rely on."
        columns="three"
        revealOnScroll
      />

      <AboutCredentialsSection
        eyebrow={certificateSection.title}
        title="Recognized Credentials, Earned Reputation"
        description={certificateSection.description}
        certificates={certificates}
      />

      <CtaBanner />
    </>
  );
}
