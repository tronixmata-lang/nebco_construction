"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectorIcon } from "@/components/sectors/sector-icons";
import { TrustedBadge } from "@/components/ui/TrustedBadge";
import { cn } from "@/lib/utils";
import type { IndustrySector } from "@/types";

type SectorAtlasCardProps = {
  sector: IndustrySector;
  index: number;
};

export function SectorAtlasCard({ sector, index }: SectorAtlasCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const reversed = index % 2 === 1;
  const imageSrc = sector.image ?? "/images/pexels-enrique-11376668.jpg";

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      style={{ "--sector-index": index } as CSSProperties}
      className={cn(
        "sector-atlas-card group relative",
        visible && "sector-atlas-card--visible",
        reversed && "sector-atlas-card--reversed",
      )}
    >
      <div
        className={cn(
          "sector-atlas-card__line absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-primary via-accent to-transparent lg:block",
          index === 0 ? "top-8" : "top-0",
        )}
        aria-hidden="true"
      />
      <span
        className="sector-atlas-card__node absolute left-4 top-10 z-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-neutral lg:block"
        aria-hidden="true"
      />

      <Link
        href={`/sectors/${sector.id}`}
        className={cn(
          "sector-atlas-card__link relative ml-0 grid overflow-hidden rounded-sm border border-accent/35 bg-neutral shadow-[0_10px_40px_-16px_rgba(0,0,0,0.15)] lg:ml-12 lg:grid-cols-2",
          reversed && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div className="sector-atlas-card__media relative min-h-[240px] overflow-hidden bg-secondary sm:min-h-[280px]">
          <div className="sector-atlas-card__media-inner absolute inset-0">
            <Image
              src={imageSrc}
              alt={sector.title}
              fill
              className="sector-atlas-card__image object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-secondary/20" />
            <span className="sector-atlas-card__index absolute left-4 top-4 font-mono text-4xl font-bold text-neutral/20 sm:text-5xl">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="sector-atlas-card__content relative flex flex-col p-6 sm:p-8 lg:p-10">
          <span
            className="sector-atlas-card__top-bar absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary"
            aria-hidden="true"
          />

          <div className="sector-atlas-card__content-inner flex flex-1 flex-col">
            <div className="sector-atlas-card__reveal-item flex items-center justify-between gap-4">
              <span className="sector-atlas-card__icon flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                <SectorIcon id={sector.id} />
              </span>
              <TrustedBadge label="Proven" />
            </div>

            <h3 className="sector-atlas-card__reveal-item mt-6 font-display text-2xl text-secondary transition-colors group-hover:text-primary sm:text-3xl">
              {sector.title}
            </h3>
            <span
              className="sector-atlas-card__accent-line sector-atlas-card__reveal-item mt-4 h-0.5 w-12 rounded-full bg-accent"
              aria-hidden="true"
            />

            <p className="sector-atlas-card__reveal-item mt-5 flex-1 text-sm leading-relaxed text-text-muted sm:text-base">
              {sector.description}
            </p>

            <div className="sector-atlas-card__reveal-item mt-6 flex flex-col gap-4 border-t border-neutral-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-primary uppercase">
                <svg
                  className="sector-atlas-card__check h-4 w-4 shrink-0 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path className="sector-atlas-card__check-path" d="M20 6 9 17l-5-5" />
                </svg>
                {sector.highlight}
              </p>
              <span className="sector-atlas-card__cta inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                Explore Sector
                <span className="sector-atlas-card__arrow" aria-hidden="true">
                  &rarr;
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
