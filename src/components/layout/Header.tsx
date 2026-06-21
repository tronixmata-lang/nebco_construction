"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { mainNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type HeaderVariant = "default" | "hero";

type HeaderProps = {
  variant?: HeaderVariant;
};

export function Header({ variant = "default" }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isHero = variant === "hero";

  return (
    <header
      className={cn(
        "font-nav z-50",
        isHero
          ? "absolute top-0 right-0 left-0 border-none bg-transparent"
          : "sticky top-0 border-b border-neutral-border bg-neutral/95 backdrop-blur-sm",
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex h-20 shrink-0 items-center">
            <Image
              src={siteConfig.logo}
              alt={`${siteConfig.name} logo`}
              width={300}
              height={84}
              className="h-[4.8125rem] w-auto object-contain sm:h-[4.9375rem]"
              priority
            />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {mainNavigation.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors",
                      isHero
                        ? "text-neutral/90 hover:text-accent"
                        : "text-secondary hover:text-primary",
                    )}
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 min-w-[220px] border border-neutral-border bg-neutral py-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-secondary transition-colors hover:bg-neutral-muted hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-semibold transition-colors",
                    isHero
                      ? "text-neutral/90 hover:text-accent"
                      : "text-secondary hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden lg:block">
            <Button
              href="/contact"
              size="sm"
              pill={isHero}
              className={isHero ? "normal-case" : undefined}
            >
              {isHero ? "Schedule a Call" : "Contact Us"}
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-sm p-2 lg:hidden",
              isHero ? "text-neutral" : "text-secondary",
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 lg:hidden",
          isHero
            ? "border-t border-neutral/10 bg-secondary/95 backdrop-blur-md"
            : "border-t border-neutral-border bg-neutral",
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="py-6">
          <nav
            className="flex flex-col items-center gap-1 text-center"
            aria-label="Mobile navigation"
          >
            {mainNavigation.map((item) => (
              <div key={item.label} className="w-full max-w-xs">
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-sm px-3 py-2.5 text-sm font-semibold transition-colors",
                    isHero
                      ? "text-neutral/90 hover:bg-neutral/10 hover:text-accent"
                      : "text-secondary hover:bg-neutral-muted hover:text-primary",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div
                    className={cn(
                      "mt-1 flex flex-col items-center gap-1 border-t pt-2",
                      isHero ? "border-neutral/10" : "border-neutral-border",
                    )}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-3 py-2 text-sm transition-colors",
                          isHero
                            ? "text-neutral/70 hover:text-accent"
                            : "text-text-muted hover:text-primary",
                        )}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 w-full max-w-xs px-3">
              <Button
                href="/contact"
                size="sm"
                pill={isHero}
                className={cn("w-full", isHero && "normal-case")}
              >
                {isHero ? "Schedule a Call" : "Contact Us"}
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
