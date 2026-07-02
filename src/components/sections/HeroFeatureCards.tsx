"use client";

import Link from "next/link";
import { CmsImage } from "@/components/ui/CmsImage";
import type { HeroFeatureCard } from "@/types/site-content";

const cardShellClass =
  "group block overflow-hidden rounded-2xl border border-neutral/15 bg-secondary/55 shadow-2xl backdrop-blur-md";

type HeroFeatureCardsProps = {
  cards: HeroFeatureCard[];
};

export function HeroFeatureCards({ cards }: HeroFeatureCardsProps) {
  const visibleCards = cards.filter((card) => card.title.trim() && card.image.trim());
  const card = visibleCards[0];

  if (!card) return null;

  return (
    <div className="absolute right-0 bottom-14 z-20 hidden md:block lg:right-4 lg:bottom-16 xl:right-8 xl:bottom-20">
      <div
        className="relative h-[17.5rem] w-60 lg:h-[18rem] lg:w-64 xl:w-72"
        aria-label="NEBCO business verticals"
      >
        <Link href={card.href} className={cardShellClass}>
          <div className="relative h-36 w-full overflow-hidden sm:h-40">
            <CmsImage
              src={card.image}
              alt={card.imageAlt}
              fill
              loading="lazy"
              className="object-cover"
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
            <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] text-neutral/75 uppercase">
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
      </div>
    </div>
  );
}
