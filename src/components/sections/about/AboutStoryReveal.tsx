"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function AboutStoryReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
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
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "about-story-reveal relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none",
        visible && "about-story-reveal--visible",
      )}
    >
      <div className="about-story-reveal__main relative aspect-[4/5] overflow-hidden rounded-sm border border-accent/30 bg-neutral-muted shadow-[0_24px_60px_-24px_rgba(0,0,0,0.28)]">
        <Image
          src="/images/site/1-7_11zon-scaled.jpg"
          alt="A NEBCO construction project in progress"
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="about-story-reveal__image object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/45 via-transparent to-transparent" />
        <span className="about-story-visual__corner about-story-visual__corner--tl" aria-hidden="true" />
        <span className="about-story-visual__corner about-story-visual__corner--br" aria-hidden="true" />
      </div>

      <div
        className="about-story-reveal__inset absolute -bottom-6 -left-4 hidden w-[42%] overflow-hidden rounded-sm border border-neutral-border bg-neutral shadow-lg sm:block lg:-left-8"
        style={{ "--reveal-delay": "280ms" } as CSSProperties}
      >
        <div className="relative aspect-[4/3]">
          <Image
            src="/images/josepmonter-cranes-7347888.jpg"
            alt="NEBCO construction site with crane"
            fill
            sizes="200px"
            className="object-cover"
          />
        </div>
      </div>

      <div
        className="about-story-reveal__badge absolute -top-4 -right-4 hidden rounded-sm border border-accent/40 bg-neutral px-4 py-3 shadow-md sm:block"
        style={{ "--reveal-delay": "420ms" } as CSSProperties}
      >
        <p className="text-[10px] font-semibold tracking-[0.2em] text-accent uppercase">Since</p>
        <p className="font-display text-2xl text-primary">1995</p>
      </div>
    </div>
  );
}
