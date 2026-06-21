"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Certificate } from "@/types";
import { cn } from "@/lib/utils";

type CertificateGalleryProps = {
  certificates: Certificate[];
};

export function CertificateGallery({ certificates }: CertificateGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  const activeCertificate =
    activeIndex !== null ? certificates[activeIndex] : null;

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
                <Image
                  src={certificate.image}
                  alt={certificate.alt}
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 25vw"
                />
                <div className="absolute inset-0 bg-secondary/0 transition-colors duration-300 group-hover:bg-secondary/5" />
                <div className="absolute right-2 bottom-2 flex h-7 w-7 items-center justify-center rounded-full bg-neutral/90 text-secondary opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
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

      {activeCertificate && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/80 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCertificate.title} certificate`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral/10 text-neutral transition-colors hover:bg-neutral/20"
            aria-label="Close certificate viewer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>

          {certificates.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrevious();
                }}
                className="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral/10 text-neutral transition-colors hover:bg-neutral/20 sm:left-4 sm:h-12 sm:w-12"
                aria-label="Previous certificate"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-neutral/10 text-neutral transition-colors hover:bg-neutral/20 sm:right-4 sm:h-12 sm:w-12"
                aria-label="Next certificate"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-sm bg-neutral shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-neutral-muted p-4 sm:p-6">
              <Image
                src={activeCertificate.image}
                alt={activeCertificate.alt}
                width={724}
                height={1024}
                className="h-auto max-h-[calc(90vh-9rem)] w-auto max-w-full object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <div className="shrink-0 border-t border-neutral-border px-5 py-4 text-center">
              <p className="font-display text-lg font-semibold text-secondary">
                {activeCertificate.title}
              </p>
              <p className="mt-1 text-sm text-text-muted">
                {activeCertificate.subtitle}
              </p>
              <p
                className={cn(
                  "mt-3 text-xs text-text-muted",
                  certificates.length > 1 && "block",
                )}
              >
                {activeIndex + 1} of {certificates.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
