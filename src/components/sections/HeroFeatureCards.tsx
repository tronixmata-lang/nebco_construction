"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CmsImage } from "@/components/ui/CmsImage";
import { cn } from "@/lib/utils";
import type { HeroFeatureCard } from "@/types/site-content";

const DISPLAY_MS = 3000;
const FLIP_MS = 700;

const cardShellClass =
  "group absolute inset-0 overflow-hidden rounded-2xl border border-neutral/15 bg-secondary/55 shadow-2xl backdrop-blur-md [backface-visibility:hidden] [transform-style:preserve-3d]";

type HeroFeatureCardsProps = {
  cards: HeroFeatureCard[];
};

export function HeroFeatureCards({ cards }: HeroFeatureCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCards = cards.filter((card) => card.title.trim() && card.image.trim());

  useEffect(() => {
    if (visibleCards.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visibleCards.length);
    }, DISPLAY_MS);

    return () => window.clearInterval(interval);
  }, [visibleCards.length]);

  if (visibleCards.length === 0) return null;

  return (
    <div
      className={cn(
        "absolute right-0 bottom-14 z-20 hidden md:block lg:right-4 lg:bottom-16 xl:right-8 xl:bottom-20",
        "[perspective:1200px]",
      )}
      aria-live="polite"
      aria-roledescription="carousel"
    >
      <div
        className="relative h-[17.5rem] w-60 lg:h-[18rem] lg:w-64 xl:w-72"
        aria-label="NEBCO business verticals"
      >
        {visibleCards.map((card, index) => {
          const isActive = index === activeIndex;

          return (
            <Link
              key={`${card.title}-${index}`}
              href={card.href}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              className={cn(
                cardShellClass,
                "origin-center transition-[transform,opacity] ease-in-out will-change-transform motion-reduce:transition-none",
                isActive
                  ? "z-10 scale-100 opacity-100 [transform:rotateY(0deg)]"
                  : "pointer-events-none z-0 scale-[0.97] opacity-0 [transform:rotateY(90deg)]",
              )}
              style={{ transitionDuration: `${FLIP_MS}ms` }}
            >
              <div className="relative h-36 w-full overflow-hidden sm:h-40">
                <CmsImage
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 0px, 288px"
                />
                <div
                  className="absolute inset-0 bg-secondary/30 mix-blend-multiply"
                  aria-hidden="true"
                />
              </div>
              <div className="flex items-end justify-between gap-3 px-4 py-4">
                <span className="text-base font-medium leading-snug text-neutral lg:text-lg">
                  {card.title}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] text-neutral/75 uppercase transition-colors group-hover:text-accent">
                  {card.cta}
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {visibleCards.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
          {visibleCards.map((item, index) => (
            <span
              key={`${item.title}-dot-${index}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                index === activeIndex ? "w-5 bg-accent" : "w-1.5 bg-neutral/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
