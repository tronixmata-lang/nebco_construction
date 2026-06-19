import Link from "next/link";
import { getDivisions } from "@/lib/data/content";
import { divisionIcons } from "@/lib/division-icons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DivisionCardHeader } from "@/components/ui/DivisionCardHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function BusinessDivisions() {
  const divisions = await getDivisions();

  return (
    <Section variant="muted" id="divisions">
      <SectionHeader
        eyebrow="Our Divisions"
        title="Integrated Solutions Across Three Core Businesses"
        description="NEBCO operates through three strategically connected divisions, each delivering specialized expertise while working together to create comprehensive development solutions."
        align="center"
        className="mx-auto"
      />

      <div className="grid gap-8 md:grid-cols-3">
        {divisions.map((division) => (
          <Card key={division.id} hover className="flex flex-col text-center md:text-left">
            <DivisionCardHeader icon={divisionIcons[division.id]} />
            <h3 className="mt-5 font-display text-xl text-secondary">{division.name}</h3>
            <p className="mt-1 text-sm font-medium text-accent">{division.tagline}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">{division.description}</p>
            <Link href={division.href} className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark md:justify-start">
              Explore {division.shortName}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button href="/divisions" variant="outline">View All Divisions</Button>
      </div>
    </Section>
  );
}
