"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/types";

const AUTO_SCROLL_MS = 4000;

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function QuoteIcon() {
  return (
    <svg
      className="h-6 w-6 text-primary/20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.016 3.016 0 0 1-3.016 3.016c-1.018 0-1.97-.487-2.583-1.29Zm12 0C15.553 16.227 15 15 15 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.016 3.016 0 0 1-3.016 3.016c-1.018 0-1.97-.487-2.583-1.29Z" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-primary uppercase">
      <svg
        className="h-2.5 w-2.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
      Verified
    </span>
  );
}

function ScrollButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        direction === "left" ? "Scroll testimonials left" : "Scroll testimonials right"
      }
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-neutral-border bg-neutral text-secondary transition-colors hover:border-primary/30 hover:text-primary"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {direction === "left" ? (
          <path d="m15 18-6-6 6-6" />
        ) : (
          <path d="m9 18 6-6-6-6" />
        )}
      </svg>
    </button>
  );
}

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const getScrollDistance = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return 0;

    const card = container.querySelector<HTMLElement>("[data-testimonial-card]");
    const cardWidth = card?.offsetWidth ?? container.clientWidth / 3;
    return cardWidth + 16;
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const container = scrollRef.current;
      if (!container) return;

      const distance = getScrollDistance();
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (direction === "right" && container.scrollLeft >= maxScroll - 8) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      if (direction === "left" && container.scrollLeft <= 8) {
        container.scrollTo({ left: maxScroll, behavior: "smooth" });
        return;
      }

      container.scrollBy({
        left: direction === "left" ? -distance : distance,
        behavior: "smooth",
      });
    },
    [getScrollDistance],
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      scroll("right");
    }, AUTO_SCROLL_MS);

    return () => window.clearInterval(interval);
  }, [isPaused, scroll]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="mb-4 flex items-center justify-end gap-2">
        <ScrollButton direction="left" onClick={() => scroll("left")} />
        <ScrollButton direction="right" onClick={() => scroll("right")} />
      </div>

      <div
        ref={scrollRef}
        data-lenis-prevent
        className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            data-testimonial-card
            className="group relative flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-neutral-border bg-neutral p-5 transition-all duration-300 hover:border-primary/25 hover:shadow-lg sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
          >
            <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

            <div className="flex items-start justify-between gap-2">
              <QuoteIcon />
              <VerifiedBadge />
            </div>

            <blockquote className="mt-3 flex-1">
              <p className="line-clamp-5 text-sm leading-relaxed text-secondary">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>

            <div className="mt-4 flex items-center gap-3 border-t border-neutral-border pt-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-neutral">
                {getInitials(testimonial.author)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-secondary">
                  {testimonial.author}
                </p>
                <p className="truncate text-xs text-text-muted">
                  {testimonial.role}
                </p>
                <p className="truncate text-[10px] font-medium tracking-wide text-accent uppercase">
                  {testimonial.organization}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
