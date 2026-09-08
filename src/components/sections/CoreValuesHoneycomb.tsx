"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";

type CoreValuesHoneycombProps = {
  values: string[];
};

type Point = { x: number; y: number };

const HUB_INDEX = 3;
const OUTER_INDEXES = [0, 1, 2, 4, 5] as const;

function shorten(from: Point, to: Point, startPad: number, endPad: number) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  return {
    start: { x: from.x + ux * startPad, y: from.y + uy * startPad },
    end: { x: to.x - ux * endPad, y: to.y - uy * endPad },
  };
}

function ValueSeal({
  value,
  index,
  isHub,
  sealRef,
}: {
  value: string;
  index: number;
  isHub?: boolean;
  sealRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <article className="about-value-card group relative z-[1] flex flex-col items-center">
      <div
        ref={sealRef}
        className={`about-value-card__seal relative flex items-center justify-center rounded-full bg-neutral ${isHub ? "z-[2] ring-1 ring-accent/30" : ""}`}
      >
        <span
          className="pointer-events-none absolute inset-[7px] rounded-full border border-accent/40"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute inset-[13px] rounded-full border border-dashed border-primary/20"
          aria-hidden="true"
        />
        {index === 5 ? (
          <div className="relative z-[1] flex flex-col items-center justify-center px-5">
            <BrandIcon
              title={value}
              fallbackIndex={index}
              className="mx-auto h-[6.075rem] w-[6.075rem] -translate-y-3 sm:h-[9.619rem] sm:w-[9.619rem] sm:-translate-y-4"
              alt=""
            />
            <h3 className="-mt-11 w-[80%] -translate-y-4 text-center font-display text-[0.72rem] leading-tight text-secondary transition-colors duration-300 group-hover:text-primary sm:-mt-12 sm:text-[1.05rem]">
              {value}
            </h3>
          </div>
        ) : (
          <>
            <BrandIcon
              title={value}
              fallbackIndex={index}
              className={`relative mx-auto h-[6.075rem] w-[6.075rem] sm:h-[9.619rem] sm:w-[9.619rem] ${isHub ? "-translate-y-3 sm:-translate-y-4" : ""}`}
              alt=""
            />
            <h3
              className={`absolute left-1/2 w-[80%] -translate-x-1/2 text-center font-display text-[0.72rem] leading-tight text-secondary transition-colors duration-300 group-hover:text-primary sm:text-[1.05rem] ${isHub ? "bottom-[1.65rem] -translate-y-2 sm:bottom-8" : "bottom-[1.35rem] sm:bottom-7"}`}
            >
              {value}
            </h3>
          </>
        )}
      </div>
    </article>
  );
}

export function CoreValuesHoneycomb({ values }: CoreValuesHoneycombProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [reduceMotion, setReduceMotion] = useState(false);

  const setNodeRef = useCallback((index: number) => {
    return (el: HTMLDivElement | null) => {
      nodeRefs.current[index] = el;
    };
  }, []);

  const measure = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    const rootBox = root.getBoundingClientRect();
    const centers = nodeRefs.current.map((node) => {
      if (!node) return null;
      const box = node.getBoundingClientRect();
      return {
        x: box.left + box.width / 2 - rootBox.left,
        y: box.top + box.height / 2 - rootBox.top,
        r: box.width / 2,
      };
    });

    const hub = centers[HUB_INDEX];
    if (!hub) return;

    const nextPaths = OUTER_INDEXES.map((index) => {
      const from = centers[index];
      if (!from) return "";
      const { start, end } = shorten(from, hub, from.r * 0.92, hub.r * 0.92);
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }).filter(Boolean);

    setPaths(nextPaths);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    measure();
    const root = rootRef.current;
    if (!root) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(root);
    nodeRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });
    window.addEventListener("resize", measure);
    const timeout = window.setTimeout(measure, 80);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(timeout);
    };
  }, [measure, values]);

  const top = values.slice(0, 2);
  const middle = values.slice(2, 5);
  const bottom = values.slice(5, 6);

  return (
    <div ref={rootRef} className="about-values-honeycomb relative mx-auto mt-10 max-w-4xl">
      <svg
        className="about-values-honeycomb__lines pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {paths.map((d, index) => (
          <g key={`${d}-${index}`}>
            <path d={d} className="about-values-honeycomb__line" fill="none" />
            {!reduceMotion &&
              [0, 0.75, 1.5].map((delay) => (
                <circle
                  key={delay}
                  r="3.5"
                  fill="#c9a227"
                  className="about-values-honeycomb__pulse"
                >
                  <animateMotion dur="2.2s" begin={`${delay}s`} repeatCount="indefinite" path={d} />
                </circle>
              ))}
          </g>
        ))}
      </svg>

      <div className="about-values-honeycomb__row about-values-honeycomb__row--2">
        {top.map((value, index) => (
          <ValueSeal key={value} value={value} index={index} sealRef={setNodeRef(index)} />
        ))}
      </div>
      <div className="about-values-honeycomb__row about-values-honeycomb__row--3">
        {middle.map((value, index) => (
          <ValueSeal
            key={value}
            value={value}
            index={index + 2}
            isHub={index === 1}
            sealRef={setNodeRef(index + 2)}
          />
        ))}
      </div>
      <div className="about-values-honeycomb__row about-values-honeycomb__row--1">
        {bottom.map((value, index) => (
          <ValueSeal key={value} value={value} index={index + 5} sealRef={setNodeRef(index + 5)} />
        ))}
      </div>
    </div>
  );
}
