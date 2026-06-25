"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { DivisionProcessStep } from "@/types";

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
        "division-process relative grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-6",
        visible && "division-process--visible",
      )}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="division-process__step relative"
          style={{ "--step-index": index } as CSSProperties}
        >
          <div className="division-process__card h-full rounded-sm border border-neutral-border/90 bg-neutral p-6 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-lg">
            <span className="division-process__node font-mono text-xs font-bold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-lg text-secondary">{step.title}</h3>
            <span className="mt-3 block h-0.5 w-10 rounded-full bg-primary/80" aria-hidden="true" />
            <p className="mt-4 text-sm leading-relaxed text-text-muted">{step.description}</p>
          </div>
          {index < steps.length - 1 && (
            <span className="division-process__connector hidden lg:block" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  );
}
