"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DivisionProcessStep } from "@/types";
import { BrandIcon } from "@/components/ui/BrandIcon";

type DivisionProcessFlowProps = {
  steps: DivisionProcessStep[];
};

export function DivisionProcessFlow({ steps }: DivisionProcessFlowProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = listRef.current;
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <ol
      ref={listRef}
      className={cn(
        "division-process grid auto-rows-fr items-stretch gap-3 sm:grid-cols-2",
        steps.length >= 6 ? "lg:grid-cols-3" : steps.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4",
        visible && "division-process--visible",
      )}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="division-process__step h-full min-w-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          style={{ "--step-index": index } as CSSProperties}
        >
          <article className="division-process__card group relative flex h-full flex-col overflow-hidden border border-neutral-border bg-neutral p-4 transition-shadow duration-500 hover:border-accent/50 hover:shadow-lg">
            <span className="division-process__bar absolute inset-x-0 top-0 h-0.5 origin-left bg-accent" aria-hidden="true" />
            <div className="flex items-start justify-between gap-2">
              <span className="font-label text-[10px] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <BrandIcon title={step.title} fallbackIndex={index} className="division-mark" alt="" />
            </div>
            <h3 className="mt-3 font-display text-lg leading-snug text-secondary">{step.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{step.description}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}
