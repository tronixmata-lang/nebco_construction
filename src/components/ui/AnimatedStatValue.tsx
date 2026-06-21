"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ParsedStat = {
  prefix: string;
  target: number;
  suffix: string;
};

function parseStatValue(value: string): ParsedStat | null {
  const match = value.trim().match(/^(\D*?)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return null;

  return {
    prefix: match[1],
    target: Number(match[2]),
    suffix: match[3],
  };
}

function easeOutQuart(progress: number) {
  return 1 - (1 - progress) ** 4;
}

type AnimatedStatValueProps = {
  value: string;
  className?: string;
  duration?: number;
};

export function AnimatedStatValue({
  value,
  className,
  duration = 2000,
}: AnimatedStatValueProps) {
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [display, setDisplay] = useState(
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value,
  );

  useEffect(() => {
    if (!parsed || hasAnimated.current) return;

    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;
        const { prefix, target, suffix } = parsed;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const current = Math.round(easeOutQuart(progress) * target);
          setDisplay(`${prefix}${current}${suffix}`);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplay(value);
          }
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [duration, parsed, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </span>
  );
}
