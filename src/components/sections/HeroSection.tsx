import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/data/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { HeroFeatureCards } from "@/components/sections/HeroFeatureCards";
import { HeroTrustedStrip } from "@/components/sections/HeroTrustedStrip";

const heroCtaBase =
  "inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export async function HeroSection() {
  const { hero, siteConfig } = await getSiteContent();

  const phoneHref = siteConfig.phone
    ? `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`
    : "/contact";

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <Image
        src="/images/home.jpg"
        alt="NEBCO construction site with scaffolding and building development"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-secondary/50" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/35 to-secondary/15"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex flex-1 flex-col justify-center pb-8 pt-28 sm:pt-32 md:pb-12 md:pt-36">
        <div className="max-w-2xl text-left">
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-accent uppercase">
            {siteConfig.parentOrganization} · {siteConfig.shortName}
          </p>
          <h1 className="font-display text-3xl leading-[1.1] tracking-tight text-neutral sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral/85 sm:mt-6 sm:text-lg md:text-xl">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href={hero.primaryCta.href}
              className={cn(
                heroCtaBase,
                "w-full bg-primary text-neutral hover:bg-primary-dark focus-visible:ring-primary sm:w-auto",
              )}
            >
              {hero.primaryCta.label}
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
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </Container>

      <HeroFeatureCards />

      <HeroTrustedStrip />
    </section>
  );
}
