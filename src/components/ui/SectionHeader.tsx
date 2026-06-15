import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl md:mb-12",
        align === "center" && "mx-auto text-center",
        align === "left" && "mx-auto text-center md:mx-0 md:text-left",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 flex flex-col gap-2",
            align === "center" && "items-center",
            align === "left" && "items-center md:items-start",
          )}
        >
          <p className="text-sm font-semibold tracking-[0.2em] text-accent uppercase">
            {eyebrow}
          </p>
          <span className="h-px w-8 bg-accent" aria-hidden="true" />
        </div>
      )}
      <h2
        className={cn(
          "font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl",
          dark ? "text-neutral" : "text-secondary",
        )}
      >
        {title}
      </h2>
      <span
        className={cn(
          "mt-4 block h-0.5 w-12 rounded-full",
          (align === "center" || align === "left") && "mx-auto md:mx-0",
          align === "center" && "md:mx-auto",
          dark ? "bg-accent" : "bg-primary",
        )}
        aria-hidden="true"
      />
      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            dark ? "text-neutral/80" : "text-text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
