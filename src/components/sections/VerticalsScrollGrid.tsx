"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DivisionFlipCard } from "@/components/sections/DivisionFlipCard";
import { cn } from "@/lib/utils";
import type { Division } from "@/types";
import "./verticals-scroll.css";

type VerticalsScrollGridProps = {
  divisions: Division[];
  featuredId?: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function VerticalsScrollGrid({
  divisions,
  featuredId = "consulting",
  eyebrow,
  title,
  description,
}: VerticalsScrollGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const featuredIndex = Math.max(
    0,
    divisions.findIndex((division) => division.id === featuredId),
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("verticals-scroll__inner", revealed && "is-revealed")}
    >
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="center"
        className="mx-auto mb-0 max-w-3xl"
      />

      <div className="verticals-scroll__track">
        {divisions.map((division, index) => {
          // Reveal order: featured first, then the cards beside it.
          const order = index === featuredIndex ? 0 : Math.abs(index - featuredIndex);
          return (
            <div
              key={division.id}
              className={cn(
                "verticals-scroll__slot",
                index < featuredIndex && "verticals-scroll__slot--left",
                index > featuredIndex && "verticals-scroll__slot--right",
                index === featuredIndex && "verticals-scroll__slot--featured",
              )}
              style={{ "--reveal-delay": `${order * 110}ms` } as CSSProperties}
            >
              <DivisionFlipCard division={division} featured={division.id === featuredId} />
            </div>
          );
        })}
      </div>

      <div className="verticals-scroll__cta">
        <Button href="/divisions" variant="outline">
          View Our Verticals
        </Button>
      </div>
    </div>
  );
}
