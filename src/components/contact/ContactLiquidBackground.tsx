import { cn } from "@/lib/utils";

export type ContactLiquidPlacement = "hero" | "upper" | "middle" | "lower";

type ContactLiquidBackgroundProps = {
  placement?: ContactLiquidPlacement;
  className?: string;
};

export function ContactLiquidBackground({
  placement = "upper",
  className,
}: ContactLiquidBackgroundProps) {
  return (
    <div
      className={cn(
        "liquid-glass-mesh pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        `liquid-glass-mesh--${placement}`,
        className,
      )}
      aria-hidden="true"
    >
      <div className="liquid-glass-mesh__orb liquid-glass-mesh__orb--primary" />
      <div className="liquid-glass-mesh__orb liquid-glass-mesh__orb--accent" />
      <div className="liquid-glass-mesh__orb liquid-glass-mesh__orb--cool" />
      <div className="liquid-glass-mesh__orb liquid-glass-mesh__orb--warm" />
    </div>
  );
}
