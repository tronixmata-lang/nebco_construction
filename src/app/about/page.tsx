import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/layout/PageIntro";
import { CertificateGallery } from "@/components/sections/CertificateGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LeadershipMessage } from "@/components/sections/LeadershipMessage";
import { MissionVisionCards } from "@/components/sections/MissionVisionCards";
import { CoreValuesArrowFlow } from "@/components/sections/CoreValuesArrowFlow";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContentCard } from "@/components/ui/ContentCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { pageHeroImages } from "@/config/page-images";
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

const storyHighlights = [
  { value: "1995", label: "Established" },
  { value: "2001", label: "Officially Registered" },
  { value: "A-Class", label: "Construction License" },
  { value: "Shah Group", label: "Parent Company" },
];

export default async function AboutPage() {
  const { about: aboutContent, certificateSection } = await getSiteContent();
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

      <Section className="pt-10 md:pt-14" glow="primary">
        <ScrollReveal>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeader
                eyebrow="Our Story"
                title="Three Decades of Trust, Built One Project at a Time"
                description={aboutContent.history}
              />
              <StaggerReveal className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8" staggerMs={70}>
                {storyHighlights.map((item) => (
                  <ContentCard key={item.label} className="p-4 text-center sm:p-5 md:text-left">
                    <p className="font-display text-2xl text-primary">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold tracking-wide text-text-muted uppercase">{item.label}</p>
                  </ContentCard>
                ))}
              </StaggerReveal>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl">
                <Image
                  src="/images/site/1-7_11zon-scaled.jpg"
                  alt="A NEBCO construction project in progress"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-secondary/25" />
              </div>
              <div className="absolute -top-5 -left-5 -z-10 hidden h-32 w-32 border-l-4 border-t-4 border-accent lg:block" />
              <div className="absolute -bottom-5 -right-5 -z-10 hidden h-32 w-32 border-b-4 border-r-4 border-primary lg:block" />
              <div className="absolute -bottom-4 left-1/2 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-sm bg-primary px-5 py-3 shadow-lg sm:-bottom-6 sm:left-6 sm:max-w-none sm:translate-x-0 sm:px-6 sm:py-4">
                <p className="font-display text-2xl text-neutral sm:text-3xl">30+</p>
                <p className="text-xs font-medium tracking-widest text-neutral/80 uppercase">Years of Excellence</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <Section variant="muted" glow="accent">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Purpose & Direction"
            title="What Drives Us Forward"
            description="Our mission and vision guide every project, partnership, and decision we make."
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <MissionVisionCards mission={aboutContent.mission} vision={aboutContent.vision} />
        </ScrollReveal>
      </Section>

      <ScrollReveal>
        <LeadershipMessage />
      </ScrollReveal>

      <Section glow="primary">
        <ScrollReveal>
          <SectionHeader
            eyebrow="What We Stand For"
            title="Our Core Values"
            description="The principles that guide every project, partnership, and decision we make."
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <CoreValuesArrowFlow values={aboutContent.values} />
        </ScrollReveal>
      </Section>

      <ScrollReveal>
        <ValuePillars
          id="why-nebco"
          variant="muted"
          eyebrow="The NEBCO Difference"
          title="Why Clients Choose NEBCO"
          description="A reputation built on quality craftsmanship, transparency, and results clients can rely on."
          columns="three"
        />
      </ScrollReveal>

      <Section variant="dark" glow="accent">
        <ScrollReveal>
          <SectionHeader
            eyebrow={certificateSection.title}
            title="Recognized Credentials, Earned Reputation"
            description={certificateSection.description}
            align="center"
            className="mx-auto"
            dark
          />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <CertificateGallery certificates={certificates} />
        </ScrollReveal>
      </Section>

      <CtaBanner />
    </>
  );
}
