"use client";

import { useCallback, useEffect, useState } from "react";
import { getLenis } from "@/lib/lenis-instance";
import { cn } from "@/lib/utils";

const SHOW_AFTER_PX = 320;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    const lenis = getLenis();
    const immediate = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (lenis) {
      lenis.scrollTo(0, { duration: immediate ? 0 : 1.05 });
      return;
    }

    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
      className={cn(
        "scroll-to-top fixed right-5 bottom-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-accent/35 bg-secondary text-neutral shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] transition-[opacity,transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-accent hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:right-6 sm:bottom-6",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <svg
        className="h-5 w-5 text-accent"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
