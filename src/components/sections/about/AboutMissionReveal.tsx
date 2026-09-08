"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BrandIcon } from "@/components/ui/BrandIcon";

type AboutMissionRevealProps = {
  mission: string;
  vision: string;
  ethos: string;
};

type MissionCardConfig = {
  index: number;
  eyebrow: string;
  title: string;
  body: string;
  tags: string[];
  variant: "mission" | "vision" | "ethos";
};

const CARD_ICONS = {
  mission: "mission",
  vision: "vision",
  ethos: "integrity",
} as const;

const variantStyles = {
  mission: {
    card: "border-primary/15 bg-neutral shadow-[0_20px_50px_-28px_rgba(165,30,34,0.35)]",
    eyebrow: "text-primary",
    rule: "bg-primary",
    tag: "border-primary/15 bg-primary/5 text-primary",
    more: "text-primary",
    corner: "border-primary",
  },
  vision: {
    card: "border-neutral-border bg-neutral-muted shadow-[0_18px_45px_-26px_rgba(34,34,34,0.18)]",
    eyebrow: "text-accent",
    rule: "bg-accent",
    tag: "border-accent/25 bg-neutral text-accent",
    more: "text-accent",
    corner: "border-accent",
  },
  ethos: {
    card: "border-neutral-border bg-neutral-muted shadow-[0_18px_45px_-26px_rgba(201,162,39,0.28)]",
    eyebrow: "text-accent",
    rule: "about-mission-card__rule--ethos",
    tag: "border-accent/25 bg-neutral text-secondary",
    more: "text-accent",
    corner: "border-accent/70",
  },
} as const;

function ExpandableBody({
  text,
  moreClassName,
}: {
  text: string;
  moreClassName: string;
}) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [canToggle, setCanToggle] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const measure = () => {
      if (expanded) return;
      setCanToggle(el.scrollHeight > el.clientHeight + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, expanded]);

  return (
    <div className="about-mission-card__body col-start-1 row-start-3 -mt-12 self-start">
      <p
        ref={textRef}
        className={cn(
          "text-sm leading-[1.75] text-text-muted sm:text-[0.9375rem]",
          !expanded && "line-clamp-5",
        )}
      >
        {text}
      </p>
      {(canToggle || expanded) && (
        <button
          type="button"
          className={cn(
            "mt-1 font-label text-[11px] tracking-wide uppercase transition-opacity hover:opacity-80",
            moreClassName,
          )}
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}

function MissionCard({ config }: { config: MissionCardConfig }) {
  const styles = variantStyles[config.variant];

  return (
    <article
      className={cn(
        "about-mission-card about-mission-reveal__panel group relative grid h-full grid-rows-[auto_auto_1fr_auto] gap-y-3 overflow-hidden rounded-sm border p-6 sm:p-8 lg:row-span-4 lg:grid-rows-subgrid",
        `about-mission-card--${config.variant}`,
        styles.card,
      )}
      style={{ "--panel-index": config.index } as CSSProperties}
    >
      {config.variant === "ethos" && (
        <span className="about-mission-card__ethos-bar pointer-events-none absolute inset-x-0 top-0 h-1" aria-hidden="true" />
      )}
      {config.variant === "mission" && (
        <>
          <span className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-primary/8 blur-2xl" aria-hidden="true" />
          <span className={cn("pointer-events-none absolute top-0 left-0 h-14 w-14 border-t-2 border-l-2", styles.corner)} aria-hidden="true" />
        </>
      )}
      {config.variant === "vision" && (
        <>
          <span className="about-mission-card__pattern pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <span className={cn("pointer-events-none absolute right-0 bottom-0 h-14 w-14 border-r-2 border-b-2", styles.corner)} aria-hidden="true" />
        </>
      )}
      {config.variant === "ethos" && (
        <span className={cn("pointer-events-none absolute top-0 right-0 h-14 w-14 border-t-2 border-r-2", styles.corner)} aria-hidden="true" />
      )}

      <div className="about-mission-card__header relative col-start-1 row-start-1 flex min-h-[5.5rem] items-start gap-2 sm:min-h-[6rem]">
        <span className="-mt-12 -ml-10 w-16 shrink-0 overflow-visible sm:-mt-14 sm:-ml-12">
          <BrandIcon name={CARD_ICONS[config.variant]} className="h-[170px] w-[170px] self-start [&_img]:-translate-x-6 [&_img]:-translate-y-4" alt="" />
        </span>
        <div className="ml-auto min-w-0 pr-4 pl-8 text-center sm:mr-10 sm:pr-0">
          <p className={cn("font-label text-xs", styles.eyebrow)}>{config.eyebrow}</p>
          <h3 className="mt-1.5 whitespace-nowrap font-display text-xl leading-tight text-secondary sm:text-[1.35rem] lg:text-2xl">
            {config.title}
          </h3>
        </div>
      </div>

      <span
        className={cn("about-mission-card__rule col-start-1 row-start-2 -mt-14 block h-1 w-14 shrink-0 rounded-full", styles.rule)}
        aria-hidden="true"
      />
      <ExpandableBody text={config.body} moreClassName={styles.more} />

      <ul className="about-mission-card__tags col-start-1 row-start-4 -ml-4 flex flex-nowrap items-center gap-1.5 self-end pr-4 sm:-ml-5">
        {config.tags.map((tag) => (
          <li
            key={tag}
            className={cn(
              "font-label shrink-0 whitespace-nowrap rounded-full border px-2 py-1 text-[9px] sm:text-[10px]",
              styles.tag,
            )}
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function AboutMissionReveal({ mission, vision, ethos }: AboutMissionRevealProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = gridRef.current;
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const cards: MissionCardConfig[] = [
    {
      index: 0,
      eyebrow: "Our Mission",
      title: "Build With Purpose",
      body: mission,
      tags: ["World-Class", "On Time", "On Budget"],
      variant: "mission",
    },
    {
      index: 1,
      eyebrow: "Our Vision",
      title: "Lead With Trust",
      body: vision,
      tags: ["Global Reach", "Innovation", "Sustainability"],
      variant: "vision",
    },
    {
      index: 2,
      eyebrow: "Our Ethos",
      title: "Act With Integrity",
      body: ethos,
      tags: ["Excellence", "Integrity", "Innovation"],
      variant: "ethos",
    },
  ];

  return (
    <div
      ref={gridRef}
      className={cn(
        "about-mission-showcase mx-auto max-w-6xl",
        visible && "about-mission-showcase--visible",
      )}
    >
      <div className="about-mission-showcase__grid grid items-stretch gap-6 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr_auto] lg:gap-x-5 xl:gap-x-6">
        {cards.map((card) => (
          <MissionCard key={card.variant} config={card} />
        ))}
      </div>
    </div>
  );
}
