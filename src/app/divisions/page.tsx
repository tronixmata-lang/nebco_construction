import type { Metadata } from "next";
import Link from "next/link";
import { divisionIcons } from "@/lib/division-icons";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { DivisionCardHeader } from "@/components/ui/DivisionCardHeader";
import { Section } from "@/components/ui/Section";
import { getDivisions } from "@/lib/data/content";
import { createStaticPageMetadata } from "@/lib/seo-metadata";
import { breadcrumbSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/divisions", {
    title: "Business Divisions",
    description:
      "Explore NEBCO's three integrated business divisions: NEBCO Construction, NEBCO Investment, and NEBCO Consulting in Nepal.",
  });
}

export default async function DivisionsPage() {
  const divisions = await getDivisions();

  return (
    <>
      <JsonLd data={breadcrumbSchema("/divisions")} />
      <PageIntro eyebrow="Our Divisions" title="Integrated Business Structure" description="Three strategically connected divisions delivering comprehensive, trusted development solutions across Nepal." />
      <Section className="pt-10 md:pt-14">
        <div className="grid gap-8 lg:grid-cols-3">
          {divisions.map((division) => (
            <div key={division.id} className="group flex flex-col overflow-hidden rounded-sm border border-neutral-border bg-neutral p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl sm:p-8 md:text-left">
              <DivisionCardHeader icon={divisionIcons[division.id]} />
              <h2 className="mt-5 font-display text-2xl text-secondary">{division.name}</h2>
              <p className="mt-1 text-sm font-medium text-accent">{division.tagline}</p>
              <p className="mt-4 flex-1 leading-relaxed text-text-muted">{division.description}</p>
              <ul className="mt-6 space-y-3 text-left">
                {division.services.map((service) => (
                  <li key={service} className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="mt-0.5 text-primary" aria-hidden="true">✓</span>
                    {service}
                  </li>
                ))}
              </ul>
              <Link href={division.href} className="mt-8 inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark md:justify-start">
                Explore {division.shortName}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="muted">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-2xl text-secondary">Need a solution that spans multiple divisions?</p>
          <p className="mt-3 text-text-muted">NEBCO&apos;s integrated structure means one trusted partner for construction, investment, and consulting — from concept to completion.</p>
          <div className="mt-8"><Button href="/contact">Contact Our Team</Button></div>
        </div>
      </Section>
    </>
  );
}
