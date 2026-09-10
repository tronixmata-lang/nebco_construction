import type { Metadata } from "next";
import { PrintGuide } from "@/components/divisions/consulting/PrintGuide";
import { createStaticPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/building-permit-checklist", {
    title: "Nepal Building Permit Checklist",
    description:
      "A practical checklist of documents Nepal municipalities typically require before a building permit is approved.",
  });
}

export default function BuildingPermitChecklistPage() {
  return (
    <PrintGuide
      eyebrow="NEBCO Consulting"
      title="Nepal Building Permit Checklist"
      intro="Municipalities differ, but these are the files that usually have to exist before a drawing is stamped. Confirm the current list with the ward and municipality that will actually approve your site."
      bookHref="/divisions/consulting#book-consultation"
      sections={[
        {
          title: "Land and ownership",
          items: [
            "Lalpurja / ownership certificate matching the kitta on the survey.",
            "Trace map / cadastral map and boundary confirmation.",
            "Encumbrance and road-access note.",
            "Citizenship or NRN identity papers for the applicant or attorney.",
          ],
        },
        {
          title: "Drawings and design",
          items: [
            "Architectural drawings and floor plans to municipal scale.",
            "Structural drawings and design note, including seismic provisions.",
            "Site plan showing setbacks, coverage, and neighbouring plots.",
            "Soil test report where the municipality or the engineer requires it.",
          ],
        },
        {
          title: "Applications and fees",
          items: [
            "Municipality application form and prescribed fees.",
            "Ward recommendation where required.",
            "NOCs from utilities or neighbours if the site triggers them.",
            "Power of Attorney if the owner is abroad.",
          ],
        },
      ]}
    />
  );
}
