import { SetBreadcrumbLabel } from "@/components/layout/BreadcrumbContext";
import { ContactLiquidBackground } from "@/components/contact/ContactLiquidBackground";
import { Container } from "@/components/ui/Container";
import { HeroBackgroundImage } from "@/components/ui/HeroBackgroundImage";
import { LiquidGlass } from "@/components/ui/LiquidGlass";

type ContactHeroProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbLabel?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
};

function ScrollHint() {
  return (
    <div
      className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 md:flex"
      aria-hidden="true"
    >
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
        Explore
      </span>
      <svg
        className="h-4 w-4 animate-bounce"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

export function ContactHero({
  title,
  description,
  eyebrow,
  breadcrumbLabel,
  backgroundImage,
  backgroundAlt = "Contact NEBCO construction team",
}: ContactHeroProps) {
  const hasImage = Boolean(backgroundImage);

  return (
    <>
      <SetBreadcrumbLabel label={breadcrumbLabel} />
      <section className="contact-hero relative flex min-h-[100dvh] flex-col overflow-hidden bg-secondary">
        <ContactLiquidBackground placement="hero" />

        {hasImage && backgroundImage && (
          <>
            <HeroBackgroundImage src={backgroundImage} alt={backgroundAlt} />
            <div className="absolute inset-0 bg-secondary/65" />
            <div
              className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/50 to-secondary/30"
              aria-hidden="true"
            />
          </>
        )}

        {!hasImage && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-secondary/90"
            aria-hidden="true"
          />
        )}

        <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 select-none font-display text-[10rem] leading-none text-white/[0.03] md:text-[14rem] lg:text-[18rem]">
          NEBCO
        </div>

        <Container className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-28 pb-12 text-center sm:pt-32 sm:pb-16 md:pb-20">
          <LiquidGlass
            tone="dark"
            intensity="strong"
            className="mx-auto max-w-3xl px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12"
          >
            {eyebrow && (
              <div className="mb-4 flex flex-col items-center gap-2 sm:mb-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase sm:text-sm">
                  {eyebrow}
                </p>
                <span className="h-px w-10 bg-accent/80" aria-hidden="true" />
              </div>
            )}
            <h1 className="max-w-4xl font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.1]">
              {title}
            </h1>
            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg md:text-xl">
                {description}
              </p>
            )}
          </LiquidGlass>
        </Container>

        <ScrollHint />
        <div className="relative z-10 h-1 shrink-0 bg-primary" />
      </section>
    </>
  );
}
