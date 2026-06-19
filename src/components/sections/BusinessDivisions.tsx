import { getDivisions } from "@/lib/data/content";
import { Button } from "@/components/ui/Button";
import { DivisionFlipCard } from "@/components/sections/DivisionFlipCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Division } from "@/types";

const homepageDivisionOrder = ["construction", "consulting", "investment"] as const;

function orderDivisionsForHomepage(divisions: Division[]) {
  return homepageDivisionOrder
    .map((id) => divisions.find((division) => division.id === id))
    .filter((division): division is Division => Boolean(division));
}

export async function BusinessDivisions() {
  const divisions = orderDivisionsForHomepage(await getDivisions());

  return (
    <Section variant="muted" id="divisions">
      <SectionHeader
        eyebrow="Our Divisions"
        title="Integrated Solutions Across Three Core Businesses"
        description="NEBCO operates through three strategically connected divisions, each delivering specialized expertise while working together to create comprehensive development solutions."
        align="center"
        className="mx-auto"
      />

      <div className="grid items-stretch gap-8 md:grid-cols-3">
        {divisions.map((division) => (
          <DivisionFlipCard
            key={division.id}
            division={division}
            featured={division.id === "consulting"}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button href="/divisions" variant="outline">
          View All Divisions
        </Button>
      </div>
    </Section>
  );
}
