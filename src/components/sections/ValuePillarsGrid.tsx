"use client";

import { Fragment, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import type { ValuePillar } from "@/types";
import { pillarIcons } from "@/components/sections/value-pillar-icons";

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
      className="value-pillar-connector hidden w-5 shrink-0 self-start pt-[2.8125rem] lg:block xl:w-7"
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
      className="value-pillar-card group relative flex min-w-0 flex-1 flex-col items-center overflow-hidden rounded-sm border border-neutral-border bg-neutral px-6 pb-8 pt-10 text-center"
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

      <div className="value-pillar-card__icon relative mb-6 flex h-14 w-14 items-center justify-center rounded-full text-primary">
        {pillarIcons[pillar.icon]}
      </div>

      <h3 className="value-pillar-card__title font-display text-lg text-secondary">
        {pillar.title}
      </h3>
      <span
        className="value-pillar-card__accent mt-3 block h-0.5 w-8 rounded-full bg-accent"
        aria-hidden="true"
      />
      <p className="mt-4 text-sm leading-relaxed text-text-muted">{pillar.description}</p>
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
    <ScrollReveal delay={index * 110} className={cn("h-full min-w-0", className)}>
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
          className="value-pillars-spine pointer-events-none absolute inset-x-0 top-[2.8125rem] hidden h-px lg:block"
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
              index={index}
              revealOnScroll={revealOnScroll}
              className="min-w-0 flex-1"
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
