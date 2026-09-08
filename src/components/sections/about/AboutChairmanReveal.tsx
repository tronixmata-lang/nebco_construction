"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { CmsImage } from "@/components/ui/CmsImage";
import { cn } from "@/lib/utils";

const DEFAULT_CHAIRMAN_IMAGE = "/images/site/Mr.-Prabhu-Rana-1.png";

const HERITAGE_STATS = [
  { value: "30+", label: "Years" },
  { value: "A-Class", label: "Builder" },
  { value: "Shah Group", label: "Legacy" },
] as const;

const TRUST_PILLARS = ["Integrity", "Discipline", "Trust"] as const;

export type AboutChairmanMessage = {
  quote: string;
  author: string;
  role: string;
  image?: string;
};

type AboutChairmanRevealProps = {
  message: AboutChairmanMessage;
  eyebrow?: string;
  children?: ReactNode;
};

export function AboutChairmanReveal({
  message,
  eyebrow = "Chairman's Message",
  children,
}: AboutChairmanRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const imageSrc = message.image ?? DEFAULT_CHAIRMAN_IMAGE;

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
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(
        "about-chairman-showcase relative mx-auto max-w-6xl",
        visible && "about-chairman-showcase--visible",
      )}
    >
      <div
        className="about-chairman-showcase__glow about-chairman-showcase__glow--primary pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="about-chairman-showcase__glow about-chairman-showcase__glow--accent pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="about-chairman-showcase__frame relative rounded-sm p-px shadow-[0_32px_80px_-28px_rgba(0,0,0,0.38)]">
        <div className="about-chairman-showcase__card relative overflow-hidden rounded-[calc(0.125rem-1px)]">
          <div className="grid lg:grid-cols-[minmax(280px,360px)_1fr] lg:items-stretch">
            <div className="about-chairman-showcase__visual relative bg-secondary">
              <div className="about-chairman-showcase__visual-noise pointer-events-none absolute inset-0" aria-hidden="true" />
              <div className="about-chairman-showcase__visual-glow pointer-events-none absolute inset-0" aria-hidden="true" />

              <div className="relative flex h-full flex-col justify-between p-6 sm:p-8 lg:min-h-[32rem] lg:p-10">
                <div className="about-chairman-showcase__monogram pointer-events-none absolute top-6 right-6 hidden font-display text-[4.5rem] leading-none text-neutral/[0.04] lg:block">
                  N
                </div>

                <div className="about-chairman-showcase__portrait relative mx-auto w-full max-w-[280px] lg:max-w-none">
                  <span
                    className="about-chairman-showcase__portrait-ring pointer-events-none absolute -inset-4 border border-accent/25"
                    aria-hidden="true"
                  />
                  <span
                    className="about-chairman-showcase__portrait-ring about-chairman-showcase__portrait-ring--inner pointer-events-none absolute -inset-2 border border-accent/12"
                    aria-hidden="true"
                  />
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                    <CmsImage
                      src={imageSrc}
                      alt={`${message.author}, NEBCO Chairman`}
                      fill
                      sizes="(max-width: 1024px) 280px, 360px"
                      className="about-chairman-showcase__image object-cover object-top"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/10 to-secondary/25" />
                    <span
                      className="pointer-events-none absolute top-0 left-0 h-12 w-12 border-t border-l border-accent/70"
                      aria-hidden="true"
                    />
                    <span
                      className="pointer-events-none absolute right-0 bottom-0 h-12 w-12 border-r border-b border-accent/70"
                      aria-hidden="true"
                    />
                  </div>

                  <div
                    className="about-chairman-showcase__badge absolute -right-2 -bottom-4 border border-accent/40 bg-secondary/95 px-4 py-3 shadow-[0_12px_40px_-12px_rgba(201,162,39,0.45)] backdrop-blur-sm sm:-right-4"
                    style={{ "--reveal-delay": "260ms" } as CSSProperties}
                  >
                    <p className="font-label text-[10px] text-accent">Est.</p>
                    <p className="font-display text-2xl leading-none text-neutral">1995</p>
                  </div>
                </div>

                <div className="about-chairman-showcase__heritage mt-10 grid grid-cols-3 gap-3 border-t border-accent/20 pt-8">
                  {HERITAGE_STATS.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-display text-sm font-bold tracking-wide text-accent sm:text-base">{stat.value}</p>
                      <p className="font-label mt-1 text-[10px] text-neutral/50">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="about-chairman-showcase__content relative flex flex-col justify-center bg-[#faf8f5] px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-16">
              <span
                className="about-chairman-showcase__accent-bar pointer-events-none absolute inset-y-0 left-0 w-1"
                aria-hidden="true"
              />
              <div className="about-chairman-showcase__content-noise pointer-events-none absolute inset-0" aria-hidden="true" />

              <span
                className="about-chairman-showcase__watermark pointer-events-none absolute top-4 right-4 font-display text-[5.5rem] leading-none text-accent/[0.12] select-none sm:text-[6.5rem] lg:top-6 lg:right-8"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <div className="about-chairman-showcase__header relative">
                <div className="flex items-center gap-3">
                  <span className="about-chairman-showcase__rule h-px w-8 bg-accent" aria-hidden="true" />
                  <p className="font-label text-[11px] text-accent">{eyebrow}</p>
                </div>
                <h3 className="mt-5 font-display text-2xl tracking-tight text-secondary sm:text-3xl">
                  A Legacy Built on Trust
                </h3>
              </div>

              <blockquote className="about-chairman-showcase__quote relative mt-8 max-w-2xl border-l-2 border-accent/80 pl-6">
                <p className="font-quote text-lg leading-[1.9] text-secondary/90 sm:text-[1.25rem] sm:leading-[1.85]">
                  {message.quote}
                </p>
              </blockquote>

              <div className="about-chairman-showcase__signature relative mt-10">
                <span
                  className="about-chairman-showcase__signature-line mb-5 block h-px w-full max-w-[12rem] bg-gradient-to-r from-accent via-primary/60 to-transparent"
                  aria-hidden="true"
                />
                <p className="font-display text-xl font-semibold tracking-tight text-secondary">{message.author}</p>
                <p className="mt-1 text-sm tracking-wide text-text-muted">{message.role}</p>
              </div>

              <ul className="about-chairman-showcase__pillars relative mt-8 flex flex-wrap gap-2.5">
                {TRUST_PILLARS.map((pillar) => (
                  <li
                    key={pillar}
                    className="font-label rounded-sm border border-accent/30 bg-neutral px-3.5 py-1.5 text-[10px] text-secondary shadow-sm"
                  >
                    {pillar}
                  </li>
                ))}
              </ul>

              {children && <div className="about-chairman-showcase__cta relative mt-10">{children}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
