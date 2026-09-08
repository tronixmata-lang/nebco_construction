"use client";

import { useEffect, useRef } from "react";
import { SectorAtlasCard } from "./SectorAtlasCard";
import { easeInOutCubic, lerp } from "@/lib/hero-scroll-motion";
import type { IndustrySector } from "@/types";

type SectorAtlasProps = {
  sectors: IndustrySector[];
};

export function SectorAtlas({ sectors }: SectorAtlasProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const travelerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const spine = spineRef.current;
    const traveler = travelerRef.current;
    if (!root || !spine || !traveler) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      traveler.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    let frame = 0;
    let currentY = 0;
    let running = true;

    const targetY = () => {
      const rootRect = root.getBoundingClientRect();
      const track = Math.max(spine.clientHeight - traveler.offsetHeight, 0);
      const playhead = window.innerHeight * 0.42;
      const range = Math.max(rootRect.height - window.innerHeight * 0.25, 1);
      const raw = Math.min(1, Math.max(0, (playhead - rootRect.top) / range));
      return easeInOutCubic(raw) * track;
    };

    currentY = targetY();
    traveler.style.transform = `translate3d(0, ${currentY}px, 0)`;

    const tick = () => {
      if (!running) return;
      const next = targetY();
      const catchUp = next >= currentY ? 0.09 : 0.07;
      currentY = lerp(currentY, next, catchUp);
      if (Math.abs(next - currentY) < 0.15) currentY = next;
      traveler.style.transform = `translate3d(0, ${currentY}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="sector-atlas">
      <div ref={spineRef} className="sector-atlas__spine" aria-hidden="true">
        <span className="sector-atlas__line" />
        <span ref={travelerRef} className="sector-atlas__traveler" />
      </div>
      <div className="space-y-8 sm:space-y-10 lg:space-y-12">
        {sectors.map((sector, index) => (
          <SectorAtlasCard key={sector.id} sector={sector} index={index} />
        ))}
      </div>
    </div>
  );
}
