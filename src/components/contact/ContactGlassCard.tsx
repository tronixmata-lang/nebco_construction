import { LiquidGlass } from "@/components/ui/LiquidGlass";
import { cn } from "@/lib/utils";

type ContactGlassCardAccent = "primary" | "accent" | "none";

type ContactGlassCardProps = {
  children: React.ReactNode;
  className?: string;
  accent?: ContactGlassCardAccent;
  hover?: boolean;
  intensity?: "default" | "light";
};

export function ContactGlassCard({
  children,
  className,
  accent = "none",
  hover = true,
  intensity = "default",
}: ContactGlassCardProps) {
  return (
    <LiquidGlass
      intensity={intensity === "light" ? "light" : "default"}
      hover={hover}
      accent={accent === "none" ? "none" : accent}
      className={cn("rounded-2xl sm:rounded-3xl", className)}
    >
      {children}
    </LiquidGlass>
  );
}
