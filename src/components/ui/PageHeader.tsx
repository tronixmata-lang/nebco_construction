import { Container } from "./Container";
import { HeroBackgroundImage } from "./HeroBackgroundImage";
import { HeroBottomChrome } from "./HeroBottomChrome";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
  children?: React.ReactNode;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  backgroundImage,
  backgroundAlt = "NEBCO construction",
  children,
}: PageHeaderProps) {
  const hasImage = Boolean(backgroundImage);

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-secondary">
      {hasImage && backgroundImage && (
        <>
          <HeroBackgroundImage
            src={backgroundImage}
            alt={backgroundAlt}
          />
          <div className="absolute inset-0 bg-secondary/70" />
          <div
            className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/50 to-secondary/30"
            aria-hidden="true"
          />
        </>
      )}

      {!hasImage && (
        <>
          <div className="absolute inset-0 bg-primary/5" />
          <div className="absolute top-0 right-0 h-full w-1/3 bg-accent/5" />
        </>
      )}

      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 select-none font-display text-[10rem] leading-none text-neutral/[0.03] md:text-[14rem] lg:text-[18rem]">
        NEBCO
      </div>

      <Container className="relative flex flex-1 flex-col items-center justify-center px-4 pt-28 pb-12 text-center sm:pt-32 sm:pb-16 md:pb-20">
        {eyebrow && (
          <div className="mb-4 flex flex-col items-center gap-2 sm:mb-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase sm:text-sm">
              {eyebrow}
            </p>
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
          </div>
        )}
        <h1 className="max-w-4xl font-display text-3xl tracking-tight text-neutral sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.1]">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral/70 sm:mt-6 sm:text-lg md:text-xl">
            {description}
          </p>
        )}
        {children}
      </Container>

      <HeroBottomChrome showExplore={!children} />
    </section>
  );
}
