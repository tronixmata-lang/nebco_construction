"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildBreadcrumbs, type BreadcrumbItem } from "@/lib/breadcrumbs";
import { cn } from "@/lib/utils";

type BreadcrumbsProps = {
  items?: BreadcrumbItem[];
  currentLabel?: string;
  variant?: "light" | "dark" | "hero";
};

function ChevronIcon() {
  return (
    <svg
      className="h-3 w-3 shrink-0 text-accent/80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

export function Breadcrumbs({
  items,
  currentLabel,
  variant = "light",
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const crumbs = items ?? buildBreadcrumbs(pathname, currentLabel);

  if (crumbs.length <= 1) return null;

  const isHero = variant === "hero" || variant === "dark";

  const linkClass = cn(
    "inline-flex items-center gap-1.5 transition-colors",
    isHero
      ? "text-neutral/75 hover:text-neutral"
      : "text-text-muted hover:text-secondary",
  );

  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          "flex flex-wrap items-center justify-center gap-1.5 text-xs sm:gap-2 sm:text-sm md:justify-start",
          isHero &&
            "rounded-full border border-neutral/10 bg-secondary/40 px-3 py-1.5 backdrop-blur-md sm:px-4",
        )}
      >
        {crumbs.map((crumb, index) => {
          const isFirst = index === 0;
          const isLast = index === crumbs.length - 1;

          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5 sm:gap-2">
              {index > 0 && <ChevronIcon />}

              {crumb.href ? (
                <Link href={crumb.href} className={linkClass}>
                  {isFirst && <HomeIcon />}
                  <span>{isFirst ? "Home" : crumb.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    "font-medium",
                    isLast ? "text-accent" : isHero ? "text-neutral/60" : "text-text-muted",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              )}

              {isLast && <span className="sr-only">(current page)</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
