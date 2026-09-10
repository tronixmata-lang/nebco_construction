"use client";

import { CmsImage } from "@/components/ui/CmsImage";
import { useId, useState } from "react";

type ConstructionBeforeAfterProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  location: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function ConstructionBeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  location,
  eyebrow,
  title,
  description,
}: ConstructionBeforeAfterProps) {
  const sliderId = useId();
  const [position, setPosition] = useState(52);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
      <div className="division-frame relative aspect-[4/3] overflow-hidden rounded-sm border border-accent/35 bg-secondary shadow-[0_28px_60px_-28px_rgba(0,0,0,0.35)]">
        <CmsImage src={afterImage} alt={afterLabel} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <CmsImage
            src={beforeImage}
            alt={beforeLabel}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <span className="division-frame__corner division-frame__corner--tl" aria-hidden="true" />
        <span className="division-frame__corner division-frame__corner--tr" aria-hidden="true" />
        <span className="division-frame__corner division-frame__corner--bl" aria-hidden="true" />
        <span className="division-frame__corner division-frame__corner--br" aria-hidden="true" />
        <span className="font-label absolute top-4 left-4 z-10 rounded-sm bg-secondary/70 px-2.5 py-1 text-[10px] text-accent backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="font-label absolute top-4 right-4 z-10 rounded-sm bg-secondary/70 px-2.5 py-1 text-[10px] text-neutral backdrop-blur-sm">
          {afterLabel}
        </span>
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-accent"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent bg-secondary text-accent">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m11 17-5-5 5-5M13 7l5 5-5 5" />
            </svg>
          </span>
        </div>
        <label className="sr-only" htmlFor={sliderId}>
          Compare before and after
        </label>
        <input
          id={sliderId}
          type="range"
          min={4}
          max={96}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="construction-compare-range absolute inset-0 z-20 cursor-ew-resize opacity-0"
        />
      </div>

      <div>
        <p className="font-label text-xs text-accent">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl text-secondary sm:text-4xl">{title}</h2>
        <span className="mt-5 block h-0.5 w-16 rounded-full bg-primary" aria-hidden="true" />
        <p className="mt-6 text-base leading-relaxed text-text-muted sm:text-lg">{description}</p>
        <p className="font-label mt-6 text-xs text-primary">{location}</p>
        <p className="mt-2 text-sm text-text-muted">Drag the slider to compare site works with the finished build.</p>
      </div>
    </div>
  );
}
