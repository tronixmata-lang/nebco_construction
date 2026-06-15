import type { Metadata } from "next";
import Link from "next/link";
import { divisions } from "@/content/divisions";
import { divisionIcons } from "@/lib/division-icons";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { TrustedBadge } from "@/components/ui/TrustedBadge";

export const metadata: Metadata = {
  title: "Business Divisions",
  description:
    "Explore NEBCO's three integrated business divisions: Construction, Investment, and Consulting.",
};

export default function DivisionsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our Divisions"
        title="Integrated Business Structure"
        description="Three strategically connected divisions delivering comprehensive, trusted development solutions across Nepal."
      />

      <Section className="pt-10 md:pt-14">
        <div className="grid gap-8 lg:grid-cols-3">
          {divisions.map((division) => (
            <div
              key={division.id}
              className="group flex flex-col overflow-hidden rounded-sm border border-neutral-border bg-neutral p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <span className="mb-6 block h-0.5 w-12 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

              <div className="flex items-start justify-between gap-3">
                <span className="flex h-14 w-14 items-center justify-center text-primary">
                  {divisionIcons[division.id]}
                </span>
                <TrustedBadge />
              </div>

              <h2 className="mt-5 font-display text-2xl font-bold text-secondary">
                {division.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-accent">{division.tagline}</p>
              <p className="mt-4 flex-1 leading-relaxed text-text-muted">
                {division.description}
              </p>

              <ul className="mt-6 space-y-3">
                {division.services.map((service) => (
                  <li key={service} className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="mt-0.5 text-primary" aria-hidden="true">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    {service}
                  </li>
                ))}
              </ul>

              <Link
                href={division.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                Explore {division.shortName}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-2xl font-bold text-secondary">
            Need a solution that spans multiple divisions?
          </p>
          <p className="mt-3 text-text-muted">
            NEBCO&apos;s integrated structure means one trusted partner for
            construction, investment, and consulting — from concept to completion.
          </p>
          <div className="mt-8">
            <Button href="/contact">Contact Our Team</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
