"use client";

import Link from "next/link";
import { divisionIcons } from "@/lib/division-icons";
import { cn } from "@/lib/utils";
import { DivisionCardHeader } from "@/components/ui/DivisionCardHeader";
import type { Division } from "@/types";

type DivisionFlipCardProps = {
  division: Division;
  featured?: boolean;
};

const cardFaceClass =
  "absolute inset-0 flex h-full w-full flex-col rounded-sm border bg-neutral p-6 text-center [backface-visibility:hidden] sm:p-8 md:text-left";

export function DivisionFlipCard({ division, featured = false }: DivisionFlipCardProps) {
  return (
    <div className="group relative h-full w-full min-h-[22rem] [perspective:1200px] md:min-h-[24rem]">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none relative h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] motion-reduce:transition-none",
          "group-hover:[transform:rotateY(180deg)] motion-reduce:group-hover:[transform:rotateY(0deg)]",
        )}
      >
        <div
          className={cn(
            cardFaceClass,
            featured
              ? "z-10 border-primary/35 shadow-lg md:shadow-xl"
              : "border-neutral-border shadow-sm transition-shadow duration-300 group-hover:shadow-lg",
          )}
        >
          {featured && (
            <span className="absolute inset-x-0 top-0 h-1 bg-primary" aria-hidden="true" />
          )}
          <DivisionCardHeader icon={divisionIcons[division.id]} />
          <h3 className="mt-5 font-display text-xl text-secondary">{division.name}</h3>
          <p className="mt-1 text-sm font-medium text-accent">{division.tagline}</p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">
            {division.description}
          </p>
          <p className="mt-6 text-xs font-semibold tracking-wide text-primary/70 uppercase">
            Hover to explore services
          </p>
        </div>

        <div
          className={cn(
            cardFaceClass,
            "border-primary/20 bg-secondary text-neutral [transform:rotateY(180deg)]",
          )}
        >
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <span className="flex h-14 w-14 items-center justify-center text-accent">
              {divisionIcons[division.id]}
            </span>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                Key Services
              </p>
              <h3 className="font-display text-lg text-neutral">{division.shortName}</h3>
            </div>
          </div>

          <ul className="mt-6 flex-1 space-y-2.5 text-left">
            {division.services.slice(0, 6).map((service) => (
              <li
                key={service}
                className="flex items-start gap-2 text-sm leading-snug text-neutral/85"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {service}
              </li>
            ))}
          </ul>

          <span className="font-button mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold text-accent md:justify-start">
            Explore {division.shortName}
            <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>

      <Link
        href={division.href}
        aria-label={`Explore ${division.name}`}
        className="absolute inset-0 z-20 cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      />
    </div>
  );
}
