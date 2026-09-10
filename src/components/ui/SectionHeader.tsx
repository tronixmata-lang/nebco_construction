import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
  eyebrowTone?: "accent" | "primary";
  compact?: boolean;
  showRules?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
  eyebrowTone = "accent",
  compact = false,
  showRules = true,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        compact ? "mb-5 max-w-3xl md:mb-6" : "mb-10 max-w-3xl md:mb-12",
        align === "center" && "mx-auto text-center",
        align === "left" && "mx-auto text-center md:mx-0 md:text-left",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex flex-col",
            compact ? "mb-2 gap-1.5" : "mb-4 gap-2",
            align === "center" && "items-center",
            align === "left" && "items-center md:items-start",
          )}
        >
          <p
            className={cn(
              "font-label",
              compact ? "text-xs" : "text-sm",
              eyebrowTone === "primary" ? "text-primary" : "text-accent",
            )}
          >
            {eyebrow}
          </p>
          {showRules ? <span className="h-px w-8 bg-accent" aria-hidden="true" /> : null}
        </div>
      )}
      <h2
        className={cn(
          "font-display tracking-tight",
          compact ? "text-2xl sm:text-3xl" : "text-2xl sm:text-3xl md:text-4xl",
          dark ? "text-neutral" : "text-secondary",
        )}
      >
        {title}
      </h2>
      {showRules ? (
        <span
          className={cn(
            "block h-0.5 w-12 rounded-full",
            compact ? "mt-3" : "mt-4",
            (align === "center" || align === "left") && "mx-auto md:mx-0",
            align === "center" && "md:mx-auto",
            dark ? "bg-accent" : "bg-primary",
          )}
          aria-hidden="true"
        />
      ) : null}
      {description && (
        <p
          className={cn(
            "leading-relaxed",
            compact ? "mt-3 text-base" : "mt-5 text-lg",
            dark ? "text-neutral/80" : "text-text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
