"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type DivisionOverviewRevealProps = {
  overview: string;
  image: string;
  imageAlt: string;
  divisionName: string;
};

export function DivisionOverviewReveal({
  overview,
  image,
  imageAlt,
  divisionName,
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
        "division-overview grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16",
        visible && "division-overview--visible",
      )}
    >
      <div
        className="division-overview__media relative aspect-[4/3] overflow-hidden rounded-sm border border-accent/30 bg-neutral-muted shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)]"
        style={{ "--reveal-delay": "0ms" } as CSSProperties}
      >
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-sm border border-accent/40 bg-neutral/95 px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-accent uppercase">
          {divisionName}
        </span>
      </div>

      <div className="division-overview__copy" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Vertical Overview</p>
        <h2 className="mt-3 font-display text-2xl text-secondary sm:text-3xl">Built for Serious Projects</h2>
        <span className="mt-4 block h-0.5 w-14 rounded-full bg-primary" aria-hidden="true" />
        <p className="mt-6 text-base leading-relaxed text-text-muted sm:text-lg">{overview}</p>
      </div>
    </div>
  );
}
