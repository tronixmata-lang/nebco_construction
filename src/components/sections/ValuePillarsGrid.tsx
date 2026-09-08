"use client";

import { Fragment, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import type { ValuePillar } from "@/types";
import { BrandIcon } from "@/components/ui/BrandIcon";

type ValuePillarsGridProps = {
  pillars: ValuePillar[];
  columns: "five" | "three";
  revealOnScroll?: boolean;
};

const gridClasses = {
  five: "grid gap-6 sm:grid-cols-2 lg:grid-cols-5",
  three: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
};

function ValuePillarConnector({ active }: { active: boolean }) {
  return (
    <div
      className="value-pillar-connector hidden w-5 shrink-0 self-stretch pt-[0.7rem] lg:block xl:w-7"
      aria-hidden="true"
    >
      <div
        className={cn(
          "value-pillar-connector__line",
          active && "value-pillar-connector__line--active",
        )}
      >
        <span className="value-pillar-connector__dot value-pillar-connector__dot--left" />
        <span className="value-pillar-connector__dot value-pillar-connector__dot--right" />
      </div>
    </div>
  );
}

type ValuePillarCardProps = {
  pillar: ValuePillar;
  connected?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
};

function ValuePillarCard({ pillar, connected = false, onEnter, onLeave }: ValuePillarCardProps) {
  return (
    <div
      className="value-pillar-card group relative flex h-full min-w-0 flex-col items-center overflow-visible rounded-sm border border-neutral-border bg-neutral px-5 pb-6 pt-1 text-center"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span
        className="value-pillar-card__bar absolute inset-x-0 top-0 h-1 bg-primary"
        aria-hidden="true"
      />

      {connected && (
        <span className="value-pillar-card__node" aria-hidden="true">
          <span className="value-pillar-card__stem" />
        </span>
      )}

      <div className="value-pillar-card__icon relative -mt-6 mb-0 flex h-[170px] w-[170px] shrink-0 items-center justify-center">
        <BrandIcon name={pillar.icon} title={pillar.title} className="h-[170px] w-[170px]" alt={pillar.title} />
      </div>

      <h3 className="value-pillar-card__title -mt-8 font-display text-lg leading-snug text-secondary">
        {pillar.title}
      </h3>
      <span
        className="value-pillar-card__accent mt-2 block h-0.5 w-8 shrink-0 rounded-full bg-accent"
        aria-hidden="true"
      />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{pillar.description}</p>
    </div>
  );
}

function PillarReveal({
  index,
  revealOnScroll,
  className,
  children,
}: {
  index: number;
  revealOnScroll: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  if (!revealOnScroll) {
    return <div className={className}>{children}</div>;
  }

  return (
    <ScrollReveal delay={index * 110} className={cn("flex h-full min-w-0", className)}>
      {children}
    </ScrollReveal>
  );
}

export function ValuePillarsGrid({ pillars, columns, revealOnScroll = false }: ValuePillarsGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="relative hidden items-stretch lg:flex">
        <div
          className="value-pillars-spine pointer-events-none absolute inset-x-0 top-[0.7rem] hidden h-px lg:block"
          aria-hidden="true"
        />
        {pillars.map((pillar, index) => (
          <Fragment key={pillar.id}>
            {index > 0 && (
              <ValuePillarConnector
                active={
                  activeIndex !== null &&
                  (activeIndex === index || activeIndex === index - 1)
                }
              />
            )}
            <PillarReveal
              index={0}
              revealOnScroll={revealOnScroll}
              className="flex min-w-0 flex-1"
            >
              <ValuePillarCard
                pillar={pillar}
                connected
                onEnter={() => setActiveIndex(index)}
                onLeave={() => setActiveIndex(null)}
              />
            </PillarReveal>
          </Fragment>
        ))}
      </div>

      <div className={cn(gridClasses[columns], "lg:hidden")}>
        {pillars.map((pillar, index) => (
          <PillarReveal key={pillar.id} index={index} revealOnScroll={revealOnScroll}>
            <ValuePillarCard pillar={pillar} />
          </PillarReveal>
        ))}
      </div>
    </>
  );
}
