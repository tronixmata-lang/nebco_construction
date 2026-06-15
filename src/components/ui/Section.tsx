import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  variant?: "default" | "muted" | "dark";
};

const variantStyles = {
  default: "bg-neutral",
  muted: "bg-neutral-muted",
  dark: "bg-secondary text-neutral",
};

export function Section({
  children,
  className,
  containerClassName,
  id,
  variant = "default",
}: SectionProps) {
  return (
    <section id={id} className={cn("py-12 md:py-24", variantStyles[variant], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
