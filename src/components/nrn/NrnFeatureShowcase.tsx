"use client";

import type { NrnFeatureCategory } from "@/content/nrn";
import { NrnExpertConsult } from "@/components/nrn/NrnExpertConsult";
import { NrnFeatureTable } from "@/components/nrn/NrnFeatureTable";
import { NrnCommunityCards } from "@/components/nrn/NrnCommunityCards";
import { NrnFeatureTimeline } from "@/components/nrn/NrnFeatureTimeline";
import { NrnPortalShowcase } from "@/components/nrn/NrnPortalShowcase";
import { NrnServiceBlogs } from "@/components/nrn/NrnServiceBlogs";
import { NrnTargetVenn } from "@/components/nrn/NrnTargetVenn";
import { NrnTrustGrid } from "@/components/nrn/NrnTrustGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

type NrnFeatureShowcaseProps = {
  categories: NrnFeatureCategory[];
};

export function NrnFeatureShowcase({ categories }: NrnFeatureShowcaseProps) {
  return (
    <div className="nrn-showcase pb-8 md:pb-10">
      {categories.map((category, categoryIndex) => {
        const isTrust = category.id === "trust";
        const isTarget = category.id === "target";
        const isPortal = category.id === "portal";
        const isLegal = category.id === "legal";
        const isComm = category.id === "comm";
        const isServices = category.id === "services";
        const isContent = category.id === "content";

        return (
          <section
            key={category.id}
            className={cn(
              "pb-8 last:pb-0 md:pb-10",
              categoryIndex > 0 && "pt-8 md:pt-10",
            )}
          >
            <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-16">
              <SectionHeader
                eyebrow={category.eyebrow}
                title={category.title}
                description={category.description}
                align="center"
                className={cn("mx-auto", isLegal ? "mb-3 md:mb-4" : "mb-8 md:mb-10")}
              />
            </div>

            {isTrust ? (
              <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
                <NrnTrustGrid features={category.features} />
              </div>
            ) : isTarget ? (
              <div className="nrn-target-block px-6 sm:px-10 lg:px-16">
                <NrnTargetVenn features={category.features} />
              </div>
            ) : isPortal ? (
              <NrnPortalShowcase category={category} />
            ) : isLegal ? (
              <div className="nrn-network-wrap px-6 sm:px-10 lg:px-16">
                <NrnExpertConsult category={category} />
              </div>
            ) : isComm ? (
              <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
                <NrnFeatureTable features={category.features} />
              </div>
            ) : isServices ? (
              <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
                <NrnServiceBlogs />
              </div>
            ) : isContent ? (
              <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
                <NrnCommunityCards features={category.features} />
              </div>
            ) : (
              <div className="nrn-showcase__timeline px-[clamp(1rem,4vw,5.5rem)]">
                <NrnFeatureTimeline features={category.features} />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
