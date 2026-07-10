"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

const AUTO_ADVANCE_MS = 5000;
const CARD_GAP_PX = 16;

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const querySm = window.matchMedia("(min-width: 640px)");
    const queryLg = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (queryLg.matches) setVisibleCount(3);
      else if (querySm.matches) setVisibleCount(2);
      else setVisibleCount(1);
    };

    update();
    querySm.addEventListener("change", update);
    queryLg.addEventListener("change", update);
    return () => {
      querySm.removeEventListener("change", update);
      queryLg.removeEventListener("change", update);
    };
  }, []);

  return visibleCount;
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
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={
        direction === "left" ? "Show previous testimonials" : "Show next testimonials"
      }
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-neutral-border bg-neutral text-secondary transition-colors hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
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

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-sm border border-neutral-border bg-neutral p-5 transition-colors duration-300 hover:border-primary/25 hover:shadow-lg">
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
          <p className="truncate text-sm font-semibold text-secondary">{testimonial.author}</p>
          <p className="truncate text-xs text-text-muted">{testimonial.role}</p>
          <p className="truncate text-[10px] font-medium tracking-wide text-accent uppercase">
            {testimonial.organization}
          </p>
        </div>
      </div>
    </article>
  );
}

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const visibleCount = useVisibleCount();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stepPx, setStepPx] = useState(0);
  const [cardWidthPx, setCardWidthPx] = useState(0);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  const canSlide = maxIndex > 0;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateStep = () => {
      const width = viewport.clientWidth;
      const cardWidth = (width - CARD_GAP_PX * (visibleCount - 1)) / visibleCount;
      setCardWidthPx(cardWidth);
      setStepPx(cardWidth + CARD_GAP_PX);
    };

    updateStep();
    const observer = new ResizeObserver(updateStep);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [visibleCount]);

  const goNext = useCallback(() => {
    setIndex((current) => (current >= maxIndex ? 0 : current + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  }, [maxIndex]);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || !canSlide) return;

    const interval = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(interval);
  }, [canSlide, goNext, isPaused]);

  if (testimonials.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {canSlide ? (
        <div className="mb-4 flex items-center justify-end gap-2">
          <ScrollButton direction="left" onClick={goPrev} />
          <ScrollButton direction="right" onClick={goNext} />
        </div>
      ) : null}

      <div ref={viewportRef} className="overflow-hidden">
        <div
          className={cn(
            "flex gap-4 will-change-transform",
            canSlide && "transition-transform duration-500 ease-out motion-reduce:transition-none",
          )}
          style={{ transform: `translate3d(-${index * stepPx}px, 0, 0)` }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="shrink-0"
              style={cardWidthPx > 0 ? { width: cardWidthPx } : undefined}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
