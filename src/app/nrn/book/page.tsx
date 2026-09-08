import type { Metadata } from "next";
import Link from "next/link";
import { NrnAppointmentForm } from "@/components/nrn/NrnAppointmentForm";
import { CmsImage } from "@/components/ui/CmsImage";
import { PageIntro } from "@/components/layout/PageIntro";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ContentCard } from "@/components/ui/ContentCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { nrnExperts } from "@/content/nrn";
import { siteConfig } from "@/config/site";
import { getSiteContent } from "@/lib/data/content";
import { createStaticPageMetadata } from "@/lib/seo-metadata";
import { breadcrumbSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/nrn/book", {
    title: "Book an NRN Appointment",
    description:
      "Book a 30-minute NRN consultation with a NEBCO specialist. Choose a time that works from the Gulf, Europe, Australia, or the US.",
  });
}

const STEPS = [
  {
    title: "30 minutes, one topic",
    body: "Ownership, power of attorney, tax, remittance, or land title. You leave with a clear next step.",
  },
  {
    title: "Timed to your clock",
    body: "Slots run 6 AM to 10 PM Nepal time so Gulf, Europe, and US evenings are covered.",
  },
  {
    title: "Confirmed in writing",
    body: "We reply on WhatsApp or email with the specialist, the time, and what to have ready.",
  },
];

type NrnBookPageProps = {
  searchParams: Promise<{ expert?: string; topic?: string }>;
};

export default async function NrnBookPage({ searchParams }: NrnBookPageProps) {
  const [{ pageHeroImages }, params] = await Promise.all([
    getSiteContent(),
    searchParams,
  ]);

  const selectedExpert = nrnExperts.find((person) => person.name === params.expert);

  return (
    <div className="font-medium">
      <JsonLd data={breadcrumbSchema("/nrn/book", "Book Appointment")} />
      <PageIntro
        eyebrow="Book Appointment"
        title="Sit with a Specialist from Abroad"
        description="Request a 30-minute NRN call. We confirm the slot and the desk, then you decide with a clear next step."
        breadcrumbLabel="Book Appointment"
        showStats={false}
        backgroundImage={pageHeroImages.nrn}
        backgroundAlt="NEBCO specialist consultation for NRN clients"
      />

      <Section variant="muted" className="pt-8 pb-8 md:pt-10 md:pb-10" glow="primary">
        <div className="grid gap-8 lg:grid-cols-5 lg:items-start lg:gap-12">
          <ScrollReveal className="lg:col-span-3">
            <ContentCard hover={false} className="nrn-book-form p-6 sm:p-8 md:p-10">
              <SectionHeader
                eyebrow="Appointment request"
                title="Choose a time that works"
                description="Tell us who you want to see and when. We will confirm within two business days."
                className="nrn-section-header mb-8"
              />
              <NrnAppointmentForm />
            </ContentCard>
          </ScrollReveal>

          <aside className="space-y-4 lg:col-span-2">
            {selectedExpert && (
              <ScrollReveal>
                <ContentCard hover={false} className="overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <CmsImage
                      src={selectedExpert.image}
                      alt={selectedExpert.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-label text-xs tracking-wider text-accent uppercase">Your specialist</p>
                    <h3 className="mt-2 font-display text-xl font-bold text-secondary">{selectedExpert.name}</h3>
                    <p className="mt-1 text-sm text-accent">{selectedExpert.experience}</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-muted">{selectedExpert.description}</p>
                    {params.topic && (
                      <p className="mt-4 border-t border-neutral-border pt-3 text-sm text-secondary">
                        Topic: {params.topic}
                      </p>
                    )}
                  </div>
                </ContentCard>
              </ScrollReveal>
            )}

            <StaggerReveal className="space-y-4" staggerMs={80}>
              {STEPS.map((step, index) => (
                <ContentCard key={step.title} className="p-6">
                  <p className="font-label text-xs tracking-wider text-accent uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-lg text-secondary">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.body}</p>
                </ContentCard>
              ))}
            </StaggerReveal>

            <ScrollReveal>
              <ContentCard accent="accent" className="border-primary/20 bg-primary/5 p-6">
                <h3 className="font-display text-lg text-secondary">Prefer WhatsApp?</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  Message the NRN desk or write to us. We will still confirm the slot in writing.
                </p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="mt-3 block text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                >
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-1 block text-sm text-text-muted transition-colors hover:text-primary"
                >
                  {siteConfig.email}
                </a>
                <Link href="/nrn" className="mt-4 inline-flex items-center gap-1 font-label text-xs text-primary">
                  Back to NRN services
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </ContentCard>
            </ScrollReveal>
          </aside>
        </div>
      </Section>

      <Section className="pt-6 pb-8 md:pt-8 md:pb-10" glow="accent">
        <ScrollReveal>
          <SectionHeader
            eyebrow="The NRN desk"
            title="Specialists Who Work with Families Abroad"
            description="The same people you see on the NRN page. Pick one on the form, or leave it open and we will match the topic."
            align="center"
            className="nrn-section-header mx-auto mb-8 md:mb-10"
          />
        </ScrollReveal>
        <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerMs={80}>
          {nrnExperts.map((person) => (
            <ContentCard key={person.name} className="overflow-hidden">
              <div className="relative aspect-[16/10]">
                <CmsImage
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-secondary">{person.name}</h3>
                <p className="mt-1 text-xs font-medium text-accent">{person.experience}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{person.description}</p>
              </div>
            </ContentCard>
          ))}
        </StaggerReveal>
      </Section>

      <CtaBanner className="pt-8 pb-10 md:pt-10 md:pb-12" />
    </div>
  );
}
