import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/layout/PageIntro";
import { CertificateGallery } from "@/components/sections/CertificateGallery";
import { ValuePillars } from "@/components/sections/ValuePillars";
import { JsonLd } from "@/components/seo/JsonLd";
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
      />

      <Section className="pt-10 md:pt-14">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Our Story"
              title="Three Decades of Trust, Built One Project at a Time"
              description={aboutContent.history}
            />
            <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8">
              {storyHighlights.map((item) => (
                <div key={item.label} className="rounded-sm border border-neutral-border bg-neutral-muted p-4 text-center transition-colors hover:border-primary/20 sm:p-5 md:text-left">
                  <dt className="font-display text-2xl text-primary">{item.value}</dt>
                  <dd className="mt-1 text-xs font-semibold tracking-wide text-text-muted uppercase">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl">
              <Image src="/images/site/1-7_11zon-scaled.jpg" alt="A NEBCO construction project in progress" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
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
      </Section>

      <Section variant="muted">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-sm border border-neutral-border bg-neutral p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl sm:p-8 md:p-10 md:text-left">
            <span className="absolute top-0 left-0 h-1 w-full bg-primary" />
            <h2 className="mt-6 font-display text-2xl text-secondary">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-text-muted">{aboutContent.mission}</p>
          </div>
          <div className="group relative overflow-hidden rounded-sm border border-neutral-border bg-neutral p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl sm:p-8 md:p-10 md:text-left">
            <span className="absolute top-0 left-0 h-1 w-full bg-accent" />
            <h2 className="mt-6 font-display text-2xl text-secondary">Our Vision</h2>
            <p className="mt-4 leading-relaxed text-text-muted">{aboutContent.vision}</p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="What We Stand For" title="Our Core Values" description="The principles that guide every project, partnership, and decision we make." align="center" className="mx-auto" />
        <div className="mx-auto grid max-w-5xl gap-px overflow-hidden rounded-sm border border-neutral-border bg-neutral-border sm:grid-cols-2 lg:grid-cols-3">
          {aboutContent.values.map((value, index) => (
            <div key={value} className="group flex flex-col gap-4 bg-neutral p-6 text-center transition-all duration-300 hover:bg-neutral-muted sm:p-8 sm:text-left">
              <span className="font-display text-2xl text-accent transition-colors group-hover:text-primary">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-base font-medium leading-relaxed text-secondary">{value}</p>
            </div>
          ))}
        </div>
      </Section>

      <ValuePillars id="why-nebco" variant="muted" eyebrow="The NEBCO Difference" title="Why Clients Choose NEBCO" description="A reputation built on quality craftsmanship, transparency, and results clients can rely on." columns="three" />

      <Section variant="dark">
        <SectionHeader eyebrow={certificateSection.title} title="Recognized Credentials, Earned Reputation" description={certificateSection.description} align="center" className="mx-auto" dark />
        <CertificateGallery certificates={certificates} />
        <div className="mt-10 text-center">
          <Link href="/leadership" className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase transition-colors hover:text-accent-light">
            Meet Our Leadership
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Section>
    </>
  );
}
