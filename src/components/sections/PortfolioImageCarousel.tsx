"use client";

import { CmsImage } from "@/components/ui/CmsImage";
import { useEffect, useState } from "react";
import type { Project } from "@/types";

const INTERVAL_MS = 2000;

type PortfolioImageCarouselProps = {
  projects: Pick<Project, "id" | "title" | "location" | "image">[];
  foundingYear?: string;
  badgeLabel?: string;
};

export function PortfolioImageCarousel({
  projects,
  foundingYear = "1995",
  badgeLabel = "Licensed Builder",
}: PortfolioImageCarouselProps) {
  const portfolioImages = projects.map((project) => ({
    id: project.id,
    src: project.image?.trim() ?? "",
    alt: `${project.title}, Your Company construction project in ${project.location}`,
  }));
  const hasAnyImage = portfolioImages.some((image) => image.src);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (portfolioImages.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % portfolioImages.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [portfolioImages.length]);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-neutral-border bg-neutral-muted shadow-xl">
      {hasAnyImage ? (
        portfolioImages.map((image, index) =>
          image.src ? (
            <CmsImage
              key={image.id}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              priority={index === 0}
              className={`absolute inset-0 object-cover transition-opacity duration-500 ease-in-out ${
                index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
            />
          ) : (
            <div
              key={image.id}
              className={`absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center transition-opacity duration-500 ${
                index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
              }`}
              role="img"
              aria-label="Your project photo"
            >
              <span className="font-label text-[10px] tracking-[0.16em] text-secondary/60 uppercase">
                Your logo
              </span>
              <span className="font-display text-xl text-secondary/80">Your project photo</span>
              <span className="max-w-xs text-xs text-text-muted">
                Featured portfolio images appear here after you upload projects
              </span>
            </div>
          ),
        )
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center"
          role="img"
          aria-label="Your project photo"
        >
          <span className="font-label text-[10px] tracking-[0.16em] text-secondary/60 uppercase">
            Your logo
          </span>
          <span className="font-display text-xl text-secondary/80">Your project photo</span>
          <span className="max-w-xs text-xs text-text-muted">
            Featured portfolio images appear here after you upload projects
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 z-20 bg-secondary/10" />

      <div className="absolute bottom-5 left-5 z-20 rounded-sm bg-primary px-5 py-3 shadow-lg">
        <p className="font-label text-xs text-neutral/80">Since {foundingYear}</p>
        <p className="font-display text-lg text-neutral">{badgeLabel}</p>
      </div>

      {portfolioImages.length > 0 && (
        <div className="absolute bottom-5 right-5 z-20 rounded-sm bg-secondary/70 px-3 py-1.5 text-xs font-medium tracking-wide text-neutral backdrop-blur-sm">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(portfolioImages.length).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}
