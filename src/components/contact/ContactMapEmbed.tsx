"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ContactMapEmbedProps = {
  src: string;
  title: string;
};

export function ContactMapEmbed({ src, title }: ContactMapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(false);

  const disableInteraction = useCallback(() => {
    setInteractive(false);
  }, []);

  useEffect(() => {
    if (!interactive) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        disableInteraction();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        disableInteraction();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [interactive, disableInteraction]);

  return (
    <div
      ref={containerRef}
      data-lenis-prevent={interactive ? "" : undefined}
      className="relative overflow-hidden rounded-sm border border-neutral-border shadow-lg"
    >
      <iframe
        title={title}
        src={src}
        className={cn(
          "h-72 w-full border-0 md:h-[450px]",
          !interactive && "pointer-events-none",
        )}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={interactive ? 0 : -1}
      />
      {!interactive ? (
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center p-4">
          <button
            type="button"
            onClick={() => setInteractive(true)}
            className="pointer-events-auto cursor-pointer rounded-sm bg-secondary/90 px-3 py-1.5 text-xs font-medium text-neutral shadow-sm transition-colors hover:bg-secondary"
          >
            Click to interact with map
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={disableInteraction}
          className="absolute top-3 right-3 z-10 rounded-sm bg-secondary/90 px-2.5 py-1 text-xs font-medium text-neutral shadow-sm transition-colors hover:bg-secondary"
        >
          Done
        </button>
      )}
    </div>
  );
}
