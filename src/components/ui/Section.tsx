import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionGlow = "none" | "primary" | "accent";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  variant?: "default" | "muted" | "dark";
  glow?: SectionGlow;
};

const variantStyles = {
  default: "bg-neutral",
  muted: "bg-neutral-muted",
  dark: "bg-secondary text-neutral",
};

const glowStyles: Record<Exclude<SectionGlow, "none">, string> = {
  primary: "pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl",
  accent: "pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl",
};

export function Section({
  children,
  className,
  containerClassName,
  id,
  variant = "default",
  glow = "none",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-12 md:py-24",
        variantStyles[variant],
        className,
      )}
    >
      {glow !== "none" && <div className={glowStyles[glow]} aria-hidden="true" />}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-neutral-border/80" aria-hidden="true" />
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
