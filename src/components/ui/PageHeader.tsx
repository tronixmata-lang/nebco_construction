import { Container } from "./Container";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
};

function ScrollHint() {
  return (
    <div
      className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-neutral/40 md:flex"
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

export function PageHeader({
  title,
  description,
  eyebrow,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[calc(100svh-8rem)] flex-col overflow-hidden bg-secondary">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute top-0 right-0 h-full w-1/3 bg-accent/5" />

      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 select-none font-display text-[10rem] leading-none text-neutral/[0.03] md:text-[14rem] lg:text-[18rem]">
        NEBCO
      </div>

      <Container className="relative flex flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:py-16 md:py-20">
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

      {!children && <ScrollHint />}

      <div className="h-1 shrink-0 bg-primary" />
    </section>
  );
}
