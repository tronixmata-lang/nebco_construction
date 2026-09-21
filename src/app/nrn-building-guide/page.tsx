import type { Metadata } from "next";
import { PrintGuide } from "@/components/divisions/consulting/PrintGuide";
import { createStaticPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/nrn-building-guide", {
    title: "NRN Guide to Building in Nepal",
    description:
      "Your Company's NRN guide to land, permits, Power of Attorney, and briefing a builder in Nepal from abroad.",
  });
}

export default function NrnBuildingGuidePage() {
  return (
    <PrintGuide
      eyebrow="Your Company Consulting"
      title="NRN Guide to Building in Nepal"
      intro="Land, permits, Power of Attorney, and how to brief a builder when you cannot walk the site every week."
      bookHref="/divisions/consulting#book-consultation"
      sections={[
        {
          title: "Before you send money",
          items: [
            "Confirm what you can legally hold under Nepal's NRN framework.",
            "Verify title, encumbrances, access, and whether the land is actually buildable.",
            "Do not pay a contractor on a photo and a relative's enthusiasm.",
          ],
        },
        {
          title: "Paperwork from abroad",
          items: [
            "Power of Attorney from your country of residence through to registration in Nepal.",
            "Municipality drawings and building permit sequence.",
            "IRD and tax referrals when rental or sale is part of the plan.",
          ],
        },
        {
          title: "How Your Company consulting helps",
          items: [
            "Feasibility: is the land buildable, and at what cost band.",
            "Drawings, BOQ, and a timeline you can hold.",
            "Video-call consulting if you cannot fly in for the first session.",
            "A clean handoff to Your Construction Company if you then build.",
          ],
        },
      ]}
    />
  );
}
