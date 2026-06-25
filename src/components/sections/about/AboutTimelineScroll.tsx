"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Milestone = {
  year: string;
  title: string;
  detail: string;
};

type AboutTimelineScrollProps = {
  milestones: readonly Milestone[];
};

export function AboutTimelineScroll({ milestones }: AboutTimelineScrollProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = listRef.current;
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

  return (
    <ol
      ref={listRef}
      className={cn("about-timeline mt-12 space-y-0", visible && "about-timeline--visible")}
    >
      {milestones.map((item, index) => (
        <li
          key={item.title}
          className="about-timeline__item relative flex gap-5 pb-8 last:pb-0"
          style={{ "--item-index": index } as CSSProperties}
        >
          <div className="flex flex-col items-center">
            <span className="about-timeline__node font-mono text-xs font-bold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            {index < milestones.length - 1 && (
              <span className="about-timeline__line mt-2 w-px flex-1 bg-gradient-to-b from-accent/70 to-primary/20" />
            )}
          </div>
          <div className="about-timeline__content min-w-0 pb-1 pt-0.5">
            <p className="font-display text-xl text-primary sm:text-2xl">{item.year}</p>
            <p className="mt-1 text-sm font-semibold tracking-wide text-secondary uppercase">
              {item.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
