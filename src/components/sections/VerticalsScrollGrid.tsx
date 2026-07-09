"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DivisionFlipCard } from "@/components/sections/DivisionFlipCard";
import { easeInOutCubic, easeOutCubic, getSpacerProgress, lerp } from "@/lib/hero-scroll-motion";
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

type Metrics = {
  isMobile: boolean;
  spread: number;
  featuredStartScale: number;
};

/** Map global progress (0-1) into a sub-range [start, start+span], eased. */
function phase(progress: number, start: number, span: number, ease = easeOutCubic) {
  return ease(Math.min(1, Math.max(0, (progress - start) / span)));
}

function measure(track: HTMLElement, isMobile: boolean): Metrics {
  const trackWidth = track.offsetWidth;
  const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0") || 0;
  const columnWidth = isMobile ? trackWidth : (trackWidth - gap * 2) / 3;
  const featuredStartScale = isMobile ? 1 : 1.22;

  return { isMobile, spread: columnWidth + gap, featuredStartScale };
}

export function VerticalsScrollGrid({
  divisions,
  featuredId = "consulting",
  eyebrow,
  title,
  description,
}: VerticalsScrollGridProps) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metricsRef = useRef<Metrics | null>(null);
  const settledRef = useRef(false);
  const inViewRef = useRef(true);
  const rafRef = useRef(0);

  const featuredIndex = Math.max(
    0,
    divisions.findIndex((division) => division.id === featuredId),
  );

  useEffect(() => {
    const spacer = spacerRef.current;
    const track = trackRef.current;
    if (!spacer || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.classList.add("verticals-scroll__track--settled");
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const slots = () => slotRefs.current.filter(Boolean) as HTMLDivElement[];

    const refresh = () => {
      metricsRef.current = measure(track, mobileQuery.matches);
    };

    const setSettled = (value: boolean) => {
      if (settledRef.current === value) return;
      settledRef.current = value;
      track.classList.toggle("verticals-scroll__track--settled", value);
    };

    const render = (progress: number) => {
      const metrics = metricsRef.current;
      if (!metrics) return;
      const cards = slots();

      if (metrics.isMobile) {
        cards.forEach((slot, index) => {
          const t = phase(progress, index * 0.16, 0.5, easeInOutCubic);
          slot.style.opacity = String(t);
          slot.style.transform = `translate3d(0, ${lerp(36, 0, t)}px, 0) scale(${lerp(0.95, 1, t)})`;
        });
        setSettled(progress > 0.8);
        return;
      }

      cards.forEach((slot, index) => {
        if (index === featuredIndex) {
          const t = phase(progress, 0, 0.62, easeInOutCubic);
          slot.style.opacity = "1";
          slot.style.transform = `translate3d(0,0,0) scale(${lerp(metrics.featuredStartScale, 1, t)})`;
          slot.style.zIndex = progress < 0.82 ? "3" : "2";
          return;
        }

        const t = phase(progress, 0.16, 0.64, easeInOutCubic);
        const direction = index < featuredIndex ? 1 : -1;
        slot.style.opacity = String(t);
        slot.style.transform = `translate3d(${lerp(direction * metrics.spread * 0.92, 0, t)}px, 0, 0) scale(${lerp(0.88, 1, t)})`;
        slot.style.zIndex = "1";
      });

      setSettled(progress > 0.85);
    };

    let lastProgress = -1;
    const tick = () => {
      rafRef.current = 0;
      const progress = getSpacerProgress(spacer, 0.9);
      if (progress === lastProgress) return;
      lastProgress = progress;
      render(progress);
    };

    const schedule = () => {
      if (!inViewRef.current || rafRef.current) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onResize = () => {
      refresh();
      lastProgress = -1;
      schedule();
    };

    refresh();
    render(getSpacerProgress(spacer, 0.9));

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) schedule();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(spacer);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    mobileQuery.addEventListener("change", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      mobileQuery.removeEventListener("change", onResize);
    };
  }, [divisions.length, featuredIndex]);

  return (
    <div className="verticals-scroll">
      <div ref={spacerRef} className="verticals-scroll__spacer">
        <div className="verticals-scroll__stage">
          <div className="verticals-scroll__backdrop" aria-hidden="true" />

          <div className="verticals-scroll__inner">
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              description={description}
              align="center"
              className="mx-auto mb-0 max-w-3xl"
            />

            <div ref={trackRef} className="verticals-scroll__track">
              {divisions.map((division, index) => (
                <div
                  key={division.id}
                  ref={(element) => {
                    slotRefs.current[index] = element;
                  }}
                  className={cn(
                    "verticals-scroll__slot",
                    index === featuredIndex && "verticals-scroll__slot--featured",
                  )}
                >
                  <DivisionFlipCard division={division} featured={division.id === featuredId} />
                </div>
              ))}
            </div>

            <div className="verticals-scroll__cta">
              <Button href="/divisions" variant="outline">
                View Our Verticals
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
