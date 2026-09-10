"use client";

import { CmsImage } from "@/components/ui/CmsImage";
import { TrustedBadge } from "@/components/ui/TrustedBadge";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type OverviewStat = {
  value: string;
  label: string;
};

type DivisionOverviewRevealProps = {
  overview: string;
  image: string;
  imageAlt: string;
  divisionName: string;
  title?: string;
  badge?: string;
  stats?: OverviewStat[];
};

export function DivisionOverviewReveal({
  overview,
  image,
  imageAlt,
  divisionName,
  title = "Built for Serious Projects",
  badge,
  stats,
}: DivisionOverviewRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
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
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "division-overview grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16",
        visible && "division-overview--visible",
      )}
    >
      <div
        className="division-overview__media division-frame relative aspect-[4/3] overflow-hidden rounded-sm border border-accent/35 bg-neutral-muted shadow-[0_28px_60px_-28px_rgba(0,0,0,0.35)]"
        style={{ "--reveal-delay": "0ms" } as CSSProperties}
      >
        <CmsImage src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/55 via-secondary/10 to-transparent" />
        <span className="division-frame__corner division-frame__corner--tl" aria-hidden="true" />
        <span className="division-frame__corner division-frame__corner--tr" aria-hidden="true" />
        <span className="division-frame__corner division-frame__corner--bl" aria-hidden="true" />
        <span className="division-frame__corner division-frame__corner--br" aria-hidden="true" />
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
          <span className="font-label rounded-sm border border-accent/45 bg-neutral/95 px-3 py-1.5 text-[10px] text-accent">
            {divisionName}
          </span>
          {badge ? <TrustedBadge label={badge} className="bg-neutral/95" /> : null}
        </div>
      </div>

      <div className="division-overview__copy" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
        <p className="font-label text-xs text-accent">Vertical Overview</p>
        <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight text-secondary sm:text-4xl">{title}</h2>
        <span className="mt-5 block h-0.5 w-16 rounded-full bg-primary" aria-hidden="true" />
        <p className="mt-6 text-base leading-relaxed text-text-muted sm:text-lg">{overview}</p>

        {stats && stats.length > 0 ? (
          <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-neutral-border pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-xl text-primary sm:text-2xl">{stat.value}</dt>
                <dd className="font-label mt-1 text-[10px] text-text-muted sm:text-xs">{stat.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </div>
  );
}
