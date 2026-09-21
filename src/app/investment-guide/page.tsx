import type { Metadata } from "next";
import { InvestmentGuideDocument } from "@/components/divisions/investment/InvestmentGuideDocument";
import { createStaticPageMetadata } from "@/lib/seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/investment-guide", {
    title: "Your Company Investment Guide",
    description:
      "Your Company investment products, process, and legal notes for apartments, plots, joint ventures, off-plan, land banking, and rental-ready packages in Nepal.",
  });
}

export default function InvestmentGuidePage() {
  return <InvestmentGuideDocument />;
}
