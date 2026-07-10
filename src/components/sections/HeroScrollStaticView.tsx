import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { HeroBackgroundImage } from "@/components/ui/HeroBackgroundImage";
import { HeroBottomChrome } from "@/components/ui/HeroBottomChrome";
import { HeroFeatureCards } from "@/components/sections/HeroFeatureCards";
import type { HeroFeatureCard } from "@/types/site-content";

const heroCtaBase =
  "font-button inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const sinceDecadesPattern = /^(.*?)(,?\s*SINCE\s+3\s+DECADES?)\s*$/i;

function normalizeHeroSubheadline(text: string): string {
  return text
    .replace(/\s*—\s*/g, ", ")
    .replace(/\s*–\s*/g, ", ")
    .replace(/,\s*,/g, ",")
    .trim();
}

function renderHeroSubheadline(subheadline: string) {
  const normalized = normalizeHeroSubheadline(subheadline);
  const match = normalized.match(sinceDecadesPattern);
  if (!match) return normalized;

  const [, before, highlight] = match;
  return (
    <>
      {before}
      <span className="font-semibold text-accent underline decoration-accent decoration-2 underline-offset-[0.2em]">
        {highlight}
      </span>
    </>
  );
}

export type HeroScrollContentProps = {
  headline: string;
  subheadline: string;
  backgroundImage: string;
  backgroundAlt?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string };
  phoneHref: string;
  parentOrganization: string;
  shortName: string;
  featureCards: HeroFeatureCard[];
  children?: React.ReactNode;
};

export function HeroScrollStaticView({
  headline,
  subheadline,
  backgroundImage,
  backgroundAlt = "NEBCO construction site with scaffolding and building development",
  primaryCta,
  secondaryCta,
  phoneHref,
  parentOrganization,
  shortName,
  featureCards,
  children,
}: HeroScrollContentProps) {
  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden" data-hero>
      <HeroBackgroundImage src={backgroundImage} alt={backgroundAlt} />
      <div className="absolute inset-0 bg-secondary/50" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/35 to-secondary/15"
        aria-hidden="true"
      />
      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-8 pt-28 sm:pt-32 md:pb-12 md:pt-36">
        <div className="max-w-2xl text-left">
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-accent uppercase">
            {parentOrganization} · {shortName}
          </p>
          <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-neutral sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {headline}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral/85 sm:mt-6 sm:text-base md:text-lg">
            {renderHeroSubheadline(subheadline)}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href={primaryCta.href}
              className={cn(
                heroCtaBase,
                "w-full bg-primary text-neutral hover:bg-primary-dark focus-visible:ring-primary sm:w-auto",
              )}
            >
              {primaryCta.label}
            </Link>
            <a
              href={phoneHref}
              className={cn(
                heroCtaBase,
                "w-full gap-2 border-2 border-neutral/70 text-neutral hover:border-neutral hover:bg-neutral/10 focus-visible:ring-neutral sm:w-auto",
              )}
            >
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </Container>
      <HeroFeatureCards cards={featureCards} />
      {children}
      <HeroBottomChrome />
    </section>
  );
}
