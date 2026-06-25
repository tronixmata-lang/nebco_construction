"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AboutMissionRevealProps = {
  mission: string;
  vision: string;
};

export function AboutMissionReveal({ mission, vision }: AboutMissionRevealProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = gridRef.current;
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className={cn(
        "about-mission-reveal mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16",
        visible && "about-mission-reveal--visible",
      )}
    >
      <article
        className="about-mission-panel about-mission-panel--mission about-mission-reveal__panel flex h-full flex-col p-0 sm:p-0 lg:border-r lg:border-neutral-border lg:pr-12"
        style={{ "--panel-index": 0 } as CSSProperties}
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Our Mission</p>
        <h3 className="mt-4 font-display text-2xl text-secondary sm:text-3xl">Build With Purpose</h3>
        <span className="mt-5 h-0.5 w-14 rounded-full bg-primary" aria-hidden="true" />
        <p className="mt-6 flex-1 text-base leading-relaxed text-text-muted sm:text-lg">{mission}</p>
      </article>

      <article
        className="about-mission-panel about-mission-panel--vision about-mission-reveal__panel flex h-full flex-col p-0 sm:p-0 lg:pl-12"
        style={{ "--panel-index": 1 } as CSSProperties}
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Our Vision</p>
        <h3 className="mt-4 font-display text-2xl text-secondary sm:text-3xl">Lead With Trust</h3>
        <span className="mt-5 h-0.5 w-14 rounded-full bg-accent" aria-hidden="true" />
        <p className="mt-6 flex-1 text-base leading-relaxed text-text-muted sm:text-lg">{vision}</p>
      </article>
    </div>
  );
}
