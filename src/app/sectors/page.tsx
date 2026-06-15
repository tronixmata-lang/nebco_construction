import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { IndustrySectors } from "@/components/sections/IndustrySectors";

export const metadata: Metadata = {
  title: "Industry Sectors",
  description:
    "NEBCO serves infrastructure, real estate, commercial, industrial, investment, and consulting sectors.",
};

export default function SectorsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Industries"
        title="Sectors We Serve"
        description="Our expertise spans six key sectors, backed by A-Class credentials and a proven track record across Nepal."
      />

      <IndustrySectors showHeader={false} className="pt-10 md:pt-14" />
    </>
  );
}
