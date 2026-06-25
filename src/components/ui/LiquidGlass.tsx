import { cn } from "@/lib/utils";

export type LiquidGlassIntensity = "light" | "default" | "strong";
export type LiquidGlassTone = "auto" | "light" | "dark";
export type LiquidGlassShape = "rounded" | "pill";

type LiquidGlassElement = "div" | "section" | "article";

export type LiquidGlassProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: LiquidGlassIntensity;
  tone?: LiquidGlassTone;
  shape?: LiquidGlassShape;
  hover?: boolean;
  accent?: "primary" | "accent" | "none";
  as?: LiquidGlassElement;
};

export function LiquidGlass({
  children,
  className,
  intensity = "default",
  tone = "auto",
  shape = "rounded",
  hover = false,
  accent = "none",
  as: Component = "div",
}: LiquidGlassProps) {
  return (
    <Component
      className={cn(
        "liquid-glass",
        intensity !== "default" && `liquid-glass--${intensity}`,
        tone !== "auto" && `liquid-glass--tone-${tone}`,
        shape === "pill" && "liquid-glass--pill",
        hover && "liquid-glass--hover group",
        accent === "primary" && "liquid-glass--accent-primary",
        accent === "accent" && "liquid-glass--accent-gold",
        className,
      )}
    >
      {children}
    </Component>
  );
}
