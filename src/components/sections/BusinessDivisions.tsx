import { getDivisions, getSiteContent } from "@/lib/data/content";
import { VerticalsScrollShowcase } from "@/components/sections/VerticalsScrollShowcase";
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
    <VerticalsScrollShowcase
      eyebrow={homepageSections.divisions.eyebrow}
      title={homepageSections.divisions.title}
      description={homepageSections.divisions.description}
      divisions={ordered}
    />
  );
}
