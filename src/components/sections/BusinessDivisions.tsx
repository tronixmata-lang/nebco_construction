import { getDivisions, getSiteContent } from "@/lib/data/content";
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
  const [{ homepageSections }, divisions] = await Promise.all([
    getSiteContent(),
    getDivisions(),
  ]);
  const ordered = orderDivisionsForHomepage(divisions);

  return (
    <Section variant="muted" id="divisions">
      <SectionHeader
        eyebrow={homepageSections.divisions.eyebrow}
        title={homepageSections.divisions.title}
        description={homepageSections.divisions.description}
        align="center"
        className="mx-auto"
      />

      <div className="grid items-stretch gap-8 md:grid-cols-3">
        {ordered.map((division) => (
          <DivisionFlipCard
            key={division.id}
            division={division}
            featured={division.id === "consulting"}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button href="/divisions" variant="outline">
          View Our Verticals
        </Button>
      </div>
    </Section>
  );
}
