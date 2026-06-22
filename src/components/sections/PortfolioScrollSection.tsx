"use client";

/* eslint-disable @next/next/no-img-element -- Scroll animation sets inline transforms */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { scrollPortfolioCenter } from "@/config/scroll-portfolio";
import { easeInOutCubic, easeOutCubic, lerp } from "@/lib/hero-scroll-motion";
import "./hero-scroll.css";

function getTransitionState(heroEl: HTMLElement, trustEl: HTMLElement) {
  const vh = window.innerHeight;
  const heroBottom = heroEl.getBoundingClientRect().bottom;
  const trustTop = trustEl.getBoundingClientRect().top;

  if (heroBottom >= vh * 0.98 || trustTop <= vh * 0.06) {
    return { progress: 0, opacity: 0 };
  }

  const raw = Math.min(1, Math.max(0, (vh - heroBottom) / (vh * 0.9)));
  const progress = easeInOutCubic(raw);
  const fadeIn = easeOutCubic(Math.min(1, Math.max(0, (vh - heroBottom) / (vh * 0.3))));
  const fadeOut = easeInOutCubic(Math.min(1, Math.max(0, trustTop / (vh * 0.5))));
  const opacity = fadeIn * fadeOut;

  return { progress, opacity };
}

function HeroTrustCollage() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const center = centerRef.current;

    if (!overlay || !center) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      overlay.style.display = "none";
      return;
    }

    let frame = 0;

    const update = () => {
      const heroEl = document.querySelector<HTMLElement>("[data-hero]");
      const trustEl = document.getElementById("certificate");
      if (!heroEl || !trustEl) return;

      const { progress, opacity } = getTransitionState(heroEl, trustEl);
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      overlay.style.opacity = String(opacity);
      overlay.style.visibility = opacity > 0.01 ? "visible" : "hidden";

      if (opacity <= 0.01) return;

      const centerW = lerp(vw, Math.min(280, vw * 0.24), easeInOutCubic(progress));
      const centerH = lerp(vh, centerW * 1.25, easeOutCubic(progress));
      center.style.width = `${centerW}px`;
      center.style.height = `${centerH}px`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={overlayRef} className="hero-trust-transition" aria-hidden="true">
      <div className="hero-trust-transition__veil" />
      <div className="hero-trust-collage">
        <div ref={centerRef} className="hero-trust-collage__center">
          <img
            src={scrollPortfolioCenter.src}
            alt=""
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export function PortfolioScrollSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(<HeroTrustCollage />, document.body);
}
