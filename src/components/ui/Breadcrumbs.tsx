"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildBreadcrumbs, type BreadcrumbItem } from "@/lib/breadcrumbs";

type BreadcrumbsProps = {
  items?: BreadcrumbItem[];
  currentLabel?: string;
  variant?: "light" | "dark";
};

function ChevronIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-accent"
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

  const linkClass =
    variant === "dark"
      ? "inline-flex items-center gap-1.5 text-neutral/80 transition-colors hover:text-neutral"
      : "inline-flex items-center gap-1.5 text-text-muted transition-colors hover:text-secondary";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {crumbs.map((crumb, index) => {
          const isFirst = index === 0;
          const isLast = index === crumbs.length - 1;

          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <ChevronIcon />}

              {crumb.href ? (
                <Link href={crumb.href} className={linkClass}>
                  {isFirst && <HomeIcon />}
                  <span>{isFirst ? "Home" : crumb.label}</span>
                </Link>
              ) : (
                <span className="font-medium text-accent" aria-current="page">
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
