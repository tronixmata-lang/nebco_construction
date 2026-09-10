"use client";

import { useEffect, useState } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { constructionPage } from "@/content/construction-page";
import { cn } from "@/lib/utils";

const STANDARDS = constructionPage.standards;
const ROTATE_MS = 5200;

export function ConstructionStandards() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = STANDARDS[active];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % STANDARDS.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Technology & Standards"
          title="How the building is specified"
          description="Seismic design, coordinated drawings, and material certificates before the first pour."
          align="center"
          compact
          className="mx-auto mb-5 md:mb-6"
        />
      </ScrollReveal>

      <div
        className="construction-standards-spotlight mx-auto max-w-4xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-0" role="tablist" aria-label="Specification standards">
          {STANDARDS.map((item, index) => (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={cn(
                "relative px-3 py-2.5 text-left transition-colors sm:flex-1 sm:text-center",
                active === index ? "text-primary" : "text-text-muted hover:text-secondary",
              )}
            >
              <span className="font-display text-2xl leading-none text-accent sm:text-3xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-0.5 block font-display text-base leading-snug sm:text-lg">{item.title}</span>
              <span
                className={cn(
                  "construction-standards-spotlight__tab absolute inset-x-4 bottom-0 h-0.5 origin-left bg-primary",
                  active === index ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          ))}
        </div>

        <article
          key={current.title}
          className="construction-standards-spotlight__panel mt-4 overflow-hidden rounded-sm border border-neutral-border bg-neutral md:grid md:grid-cols-[7rem_minmax(0,1fr)]"
        >
          <div className="flex items-center justify-center bg-secondary px-4 py-5 md:py-6">
            <span className="font-display text-4xl text-accent/80 md:text-5xl">
              {String(active + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="relative p-5 pr-[4.5rem] sm:p-6 sm:pr-20">
            <span className="pointer-events-none absolute top-4 right-4 sm:top-5 sm:right-5">
              <BrandIcon title={current.title} fallbackIndex={active} className="division-mark" alt="" />
            </span>
            <h3 className="max-w-[calc(100%-3.5rem)] font-display text-xl text-secondary sm:text-2xl">
              {current.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">{current.description}</p>
            <span className="construction-standards-spotlight__progress mt-5 block h-0.5 bg-neutral-muted">
              <span
                key={`${current.title}-${paused}`}
                className={cn(
                  "block h-full bg-primary",
                  paused ? "w-full" : "construction-standards-spotlight__bar",
                )}
              />
            </span>
          </div>
        </article>
      </div>
    </div>
  );
}
