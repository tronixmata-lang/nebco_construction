"use client";

import { CmsImage } from "@/components/ui/CmsImage";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Certificate } from "@/types";

type CertificateGalleryProps = {
  certificates: Certificate[];
};

function CertificateLightbox({
  certificates,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: {
  certificates: Certificate[];
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const certificate = certificates[activeIndex];
  const hasMultiple = certificates.length > 1;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  return createPortal(
    <div
      className="certificate-lightbox fixed inset-0 z-[100] flex flex-col bg-secondary/92 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${certificate.title} certificate`}
      data-lenis-prevent
    >
      <div className="certificate-lightbox__backdrop absolute inset-0" onClick={onClose} aria-hidden="true" />

      <header className="certificate-lightbox__header relative z-10 flex shrink-0 items-center justify-between gap-4 border-b border-neutral/10 px-4 py-3 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base text-neutral sm:text-lg">{certificate.title}</p>
          <p className="truncate text-xs text-neutral/70 sm:text-sm">{certificate.subtitle}</p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {hasMultiple && (
            <p className="hidden text-xs font-medium tracking-wide text-neutral/60 uppercase sm:block">
              {activeIndex + 1} / {certificates.length}
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral/15 bg-neutral/10 text-neutral transition-colors hover:border-accent/40 hover:bg-neutral/20"
            aria-label="Close certificate viewer"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-3 py-4 sm:px-6 sm:py-6">
        {hasMultiple && (
          <button
            type="button"
            onClick={onPrevious}
            className="certificate-lightbox__nav certificate-lightbox__nav--prev absolute top-1/2 left-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral/15 bg-neutral/10 text-neutral transition-all hover:border-accent/45 hover:bg-neutral/20 sm:left-5 sm:h-12 sm:w-12"
            aria-label="Previous certificate"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        <figure
          className="certificate-lightbox__stage relative flex h-full w-full max-w-5xl items-center justify-center"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="certificate-lightbox__frame relative flex max-h-[calc(100dvh-7.5rem)] w-full max-w-[min(100%,52rem)] items-center justify-center rounded-sm border border-accent/25 bg-neutral p-3 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] sm:p-5">
            <CmsImage
              key={certificate.id}
              src={certificate.image}
              alt={certificate.alt}
              width={900}
              height={1275}
              className="certificate-lightbox__image h-auto max-h-[calc(100dvh-10rem)] w-auto max-w-full object-contain"
              sizes="(max-width: 768px) 100vw, 832px"
              priority
            />
          </div>
          <figcaption className="sr-only">
            {certificate.title}. {certificate.subtitle}
          </figcaption>
        </figure>

        {hasMultiple && (
          <button
            type="button"
            onClick={onNext}
            className="certificate-lightbox__nav certificate-lightbox__nav--next absolute top-1/2 right-2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-neutral/15 bg-neutral/10 text-neutral transition-all hover:border-accent/45 hover:bg-neutral/20 sm:right-5 sm:h-12 sm:w-12"
            aria-label="Next certificate"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {hasMultiple && (
        <footer className="relative z-10 shrink-0 border-t border-neutral/10 px-4 py-3 text-center sm:hidden">
          <p className="text-xs font-medium tracking-wide text-neutral/60 uppercase">
            {activeIndex + 1} of {certificates.length}
          </p>
        </footer>
      )}
    </div>,
    document.body,
  );
}

export function CertificateGallery({ certificates }: CertificateGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + certificates.length) % certificates.length,
    );
  }, [certificates.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % certificates.length,
    );
  }, [certificates.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {certificates.map((certificate, index) => (
          <button
            key={certificate.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={`View ${certificate.title} certificate`}
          >
            <div className="flex h-full w-full flex-col overflow-hidden rounded-sm border border-neutral-border bg-neutral shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-xl">
              <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-neutral-muted">
                <CmsImage
                  src={certificate.image}
                  alt={certificate.alt}
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
                />
                <div className="absolute inset-0 bg-secondary/0 transition-colors duration-300 group-hover:bg-secondary/5" />
                <div className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-neutral/95 text-accent opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d="M3.25 4A2.25 2.25 0 0 1 5.5 1.75h9A2.25 2.25 0 0 1 16.75 4v9A2.25 2.25 0 0 1 14.5 15.25h-9A2.25 2.25 0 0 1 3.25 13V4Zm2.25-.5a.75.75 0 0 0-.75.75v9c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V4a.75.75 0 0 0-.75-.75h-9ZM7 8.75A.75.75 0 0 1 7.75 8h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 7 8.75Z" />
                  </svg>
                </div>
              </div>
              <div className="flex min-h-[5.5rem] flex-1 flex-col justify-center border-t border-neutral-border px-3 py-3 sm:min-h-[6rem] sm:px-4 sm:py-4">
                <p className="line-clamp-2 text-xs font-semibold text-secondary sm:text-sm">
                  {certificate.title}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-text-muted sm:text-xs">
                  {certificate.subtitle}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {mounted && activeIndex !== null && (
        <CertificateLightbox
          certificates={certificates}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      )}
    </>
  );
}
