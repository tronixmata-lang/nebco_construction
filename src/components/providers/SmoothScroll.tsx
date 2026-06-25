"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { setLenis } from "@/lib/lenis-instance";

const HEADER_OFFSET = -72;

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

type SmoothScrollProps = {
  children: React.ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      duration: 1.15,
      easing: easeOutExpo,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.2,
      syncTouch: true,
      syncTouchLerp: 0.075,
      anchors: {
        offset: HEADER_OFFSET,
        duration: 1.2,
        easing: easeOutExpo,
      },
      prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
    });

    setLenis(lenis);

    lenis.on("scroll", () => {
      window.dispatchEvent(new Event("scroll"));
    });

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return children;
}
