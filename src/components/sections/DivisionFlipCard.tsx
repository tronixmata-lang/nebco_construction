"use client";

import Link from "next/link";
import { DivisionIcon } from "@/lib/division-icons";
import { cn } from "@/lib/utils";
import { DivisionCardHeader } from "@/components/ui/DivisionCardHeader";
import { TrustedBadge } from "@/components/ui/TrustedBadge";
import type { Division } from "@/types";

type DivisionFlipCardProps = {
  division: Division;
  featured?: boolean;
};

const cardFaceClass =
  "absolute inset-0 flex h-full w-full flex-col rounded-sm border bg-neutral px-5 pb-5 pt-1 text-center [backface-visibility:hidden] sm:px-6 sm:pb-6 sm:pt-2";

const cardBackClass =
  "absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-sm border border-primary/20 bg-secondary px-5 py-4 text-left text-neutral [backface-visibility:hidden] [transform:rotateY(180deg)] sm:px-6 sm:py-5";

export function DivisionFlipCard({ division, featured = false }: DivisionFlipCardProps) {
  return (
    <div className="group relative h-full w-full min-h-[20rem] [perspective:1200px] md:min-h-[22rem]">
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
          <TrustedBadge className="absolute top-3 right-4 z-10" />
          <DivisionCardHeader icon={<DivisionIcon id={division.id} className="h-[135px] w-[135px] self-start [&_img]:object-left" />} />
          <h3 className="-mt-6 font-display text-xl text-secondary">
            {division.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-accent">{division.tagline}</p>
          <p className="mt-2 min-h-0 flex-1 overflow-hidden text-sm leading-relaxed text-text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5]">
            {division.description}
          </p>
          <p className="mt-3 shrink-0 font-label text-xs text-primary/70">
            <span className="hidden [@media(hover:hover)]:inline">Hover to explore services</span>
            <span className="[@media(hover:hover)]:hidden">Tap to explore services</span>
          </p>
        </div>

        <div className={cardBackClass}>
          <div className="flex shrink-0 items-center justify-start gap-3">
            <DivisionIcon id={division.id} className="h-14 w-14 shrink-0" surface="dark" />
            <div className="min-w-0">
              <p className="font-label text-xs text-accent">
                Key Services
              </p>
              <h3 className="font-display text-lg leading-tight text-neutral">{division.shortName}</h3>
            </div>
          </div>

          <ul className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto text-left">
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

          <span className="font-button mt-4 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent">
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
