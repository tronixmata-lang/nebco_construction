"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { NrnFeatureCategory } from "@/content/nrn";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { cn } from "@/lib/utils";

const TRAVEL_MS = 6500;
const TRAVEL_START_MS = 900;
const TRAVELER_COUNT = 6;

type NrnFeatureTimelineProps = {
  features: NrnFeatureCategory["features"];
  className?: string;
};

export function NrnFeatureTimeline({ features, className }: NrnFeatureTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hitMask, setHitMask] = useState(0);
  const stepCount = features.length;
  const compact = stepCount > 6;
  const travelStaggerMs = TRAVEL_MS / Math.max(stepCount - 1, 1);

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
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const started = performance.now();
    const spans = Math.max(stepCount - 1, 1);
    const staggerMs = TRAVEL_MS / spans;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - started;
      let mask = 0;

      for (let traveler = 0; traveler < TRAVELER_COUNT; traveler += 1) {
        const local = elapsed - TRAVEL_START_MS - traveler * staggerMs;
        if (local < 0) continue;
        const progress = (local % TRAVEL_MS) / TRAVEL_MS;
        const exact = progress * spans;
        const nearest = Math.round(exact);
        if (nearest >= 0 && nearest < stepCount && Math.abs(exact - nearest) < 0.32) {
          mask |= 1 << nearest;
        }
      }

      setHitMask((prev) => (prev === mask ? prev : mask));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, stepCount]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "nrn-feature-timeline",
        compact && "nrn-feature-timeline--compact",
        visible && "nrn-feature-timeline--visible",
        className,
      )}
    >
      <div
        className="nrn-feature-timeline__grid"
        style={{
          "--step-count": stepCount,
          "--travel-stagger": `${travelStaggerMs}ms`,
        } as CSSProperties}
      >
        <div className="nrn-feature-timeline__icons" aria-hidden="true">
          {features.map((feature, index) => (
            <div
              key={`${feature.title}-icon`}
              className={cn(
                "nrn-feature-timeline__icon",
                (hitMask & (1 << index)) !== 0 && "is-hit",
              )}
              style={{ "--step-index": index } as CSSProperties}
            >
              <BrandIcon
                title={feature.title}
                fallbackIndex={index}
                alt=""
                className="nrn-feature-timeline__brand-icon"
              />
            </div>
          ))}
        </div>

        <div className="nrn-feature-timeline__rail" aria-hidden="true">
          <span className="nrn-feature-timeline__line" />
          <span className="nrn-feature-timeline__travel">
            {Array.from({ length: TRAVELER_COUNT }, (_, index) => (
              <span
                key={index}
                className="nrn-feature-timeline__traveler"
                style={{ "--travel-index": index } as CSSProperties}
              />
            ))}
          </span>
          {features.map((feature, index) => (
            <span
              key={`${feature.title}-dot`}
              className={cn(
                "nrn-feature-timeline__dot",
                (hitMask & (1 << index)) !== 0 && "is-hit",
              )}
              style={{ "--step-index": index } as CSSProperties}
            />
          ))}
        </div>

        <ol className="nrn-feature-timeline__content">
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className="nrn-feature-timeline__step"
              style={{ "--step-index": index } as CSSProperties}
            >
              <p className="nrn-feature-timeline__number">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="nrn-feature-timeline__title">{feature.title}</h3>
              <p className="nrn-feature-timeline__desc">{feature.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
