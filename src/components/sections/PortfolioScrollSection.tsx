"use client";

/* eslint-disable @next/next/no-img-element -- Scroll animation sets inline transforms */

import { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  scrollPortfolioCenter,
  scrollPortfolioOrbit,
  type ScrollPortfolioOrbitImage,
} from "@/config/scroll-portfolio";
import {
  easeInOutCubic,
  easeOutCubic,
  lerp,
  segmentProgress,
} from "@/lib/hero-scroll-motion";
import "./hero-scroll.css";

const ORBIT_SIZES = { sm: 108, md: 132, lg: 156 } as const;

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
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const center = centerRef.current;
    const orbits = orbitRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!overlay || !center || orbits.length === 0) return;

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
      const orbitBase = Math.min(vw, vh) * 0.5;

      overlay.style.opacity = String(opacity);
      overlay.style.visibility = opacity > 0.01 ? "visible" : "hidden";

      if (opacity <= 0.01) return;

      const centerW = lerp(vw, Math.min(280, vw * 0.24), easeInOutCubic(progress));
      const centerH = lerp(vh, centerW * 1.25, easeOutCubic(progress));
      center.style.width = `${centerW}px`;
      center.style.height = `${centerH}px`;

      scrollPortfolioOrbit.forEach((item, index) => {
        const el = orbits[index];
        if (!el) return;

        const itemProgress = segmentProgress(progress, item.stagger, easeOutCubic);
        const angle = (item.angle * Math.PI) / 180;
        const distance = item.radius * orbitBase * easeInOutCubic(itemProgress);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const size = ORBIT_SIZES[item.size];
        const scale = 0.35 + itemProgress * 0.65;

        el.style.width = `${size}px`;
        el.style.height = `${size * 1.22}px`;
        el.style.opacity = String(itemProgress);
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
        el.style.zIndex = String(Math.round(10 + itemProgress * 5));
      });
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
        {scrollPortfolioOrbit.map((item, index) => (
          <OrbitCard
            key={item.src}
            item={item}
            ref={(el) => {
              orbitRefs.current[index] = el;
            }}
          />
        ))}
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

const OrbitCard = forwardRef<HTMLDivElement, { item: ScrollPortfolioOrbitImage }>(
  function OrbitCard({ item }, ref) {
    return (
      <div ref={ref} className="hero-trust-collage__orbit">
        <img src={item.src} alt="" loading="lazy" decoding="async" />
      </div>
    );
  },
);

export function PortfolioScrollSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(<HeroTrustCollage />, document.body);
}
