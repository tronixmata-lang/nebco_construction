import { cn } from "@/lib/utils";

type ContentCardAccent = "primary" | "accent";

type ContentCardProps = {
  children: React.ReactNode;
  className?: string;
  accent?: ContentCardAccent;
  hover?: boolean;
};

const accentBar: Record<ContentCardAccent, string> = {
  primary: "bg-primary",
  accent: "bg-accent",
};

const accentHover: Record<ContentCardAccent, string> = {
  primary: "hover:border-primary/30",
  accent: "hover:border-accent/40",
};

export function ContentCard({
  children,
  className,
  accent = "primary",
  hover = true,
}: ContentCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-sm border border-neutral-border bg-neutral",
        hover &&
          cn(
            "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
            accentHover[accent],
          ),
        className,
      )}
    >
      {hover && (
        <span
          className={cn(
            "absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
            accentBar[accent],
          )}
        />
      )}
      {children}
    </div>
  );
}
