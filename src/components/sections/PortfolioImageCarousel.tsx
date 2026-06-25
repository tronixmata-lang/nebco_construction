"use client";

import { CmsImage } from "@/components/ui/CmsImage";
import { useEffect, useState } from "react";
import type { Project } from "@/types";

const INTERVAL_MS = 2000;

type PortfolioImageCarouselProps = {
  projects: Pick<Project, "id" | "title" | "location" | "image">[];
};

export function PortfolioImageCarousel({ projects }: PortfolioImageCarouselProps) {
  const portfolioImages = projects.map((project) => ({
    id: project.id,
    src: project.image,
    alt: `${project.title} — NEBCO construction project in ${project.location}`,
  }));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % portfolioImages.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-xl">
      {portfolioImages.map((image, index) => (
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
      ))}

      <div className="pointer-events-none absolute inset-0 z-20 bg-secondary/20" />

      <div className="absolute bottom-5 left-5 z-20 rounded-sm bg-primary px-5 py-3 shadow-lg">
        <p className="text-xs font-semibold tracking-widest text-neutral/80 uppercase">
          Since 1995
        </p>
        <p className="font-display text-lg text-neutral">
          A-Class Certified
        </p>
      </div>

      <div className="absolute bottom-5 right-5 z-20 rounded-sm bg-secondary/70 px-3 py-1.5 text-xs font-medium tracking-wide text-neutral backdrop-blur-sm">
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(portfolioImages.length).padStart(2, "0")}
      </div>
    </div>
  );
}
