import Image from "next/image";
import { cn } from "@/lib/utils";

export type ChairmanMessageData = {
  quote: string;
  author: string;
  role: string;
  image?: string;
};

const DEFAULT_CHAIRMAN_IMAGE = "/images/site/Mr.-Prabhu-Rana-1.png";

type ChairmanMessageSectionProps = {
  message: ChairmanMessageData;
  variant?: "dark" | "light";
  eyebrow?: string;
  className?: string;
  children?: React.ReactNode;
};

export function ChairmanMessageSection({
  message,
  variant = "dark",
  eyebrow = "Chairman's Message",
  className,
  children,
}: ChairmanMessageSectionProps) {
  const isDark = variant === "dark";
  const imageSrc = message.image ?? DEFAULT_CHAIRMAN_IMAGE;

  return (
    <div className={cn("mx-auto max-w-6xl", className)}>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(220px,280px)_1fr] lg:gap-14 xl:gap-16">
        <div className="relative mx-auto w-full max-w-[280px] lg:mx-0">
          <div
            className={cn(
              "relative aspect-[3/4] overflow-hidden rounded-sm shadow-xl",
              isDark ? "border border-accent/25" : "border border-neutral-border",
            )}
          >
            <Image
              src={imageSrc}
              alt={`${message.author} — NEBCO Chairman`}
              fill
              sizes="(max-width: 1024px) 280px, 280px"
              className="object-cover object-top"
            />
            <div className={cn("absolute inset-0", isDark ? "bg-secondary/10" : "bg-secondary/5")} />
          </div>
          <div
            className={cn(
              "absolute -bottom-4 -right-4 -z-10 hidden h-24 w-24 border-b-4 border-r-4 lg:block",
              isDark ? "border-accent/50" : "border-accent",
            )}
          />
          <div
            className={cn(
              "absolute -top-4 -left-4 -z-10 hidden h-24 w-24 border-l-4 border-t-4 lg:block",
              isDark ? "border-primary/40" : "border-primary",
            )}
          />
        </div>

        <div className="text-center lg:text-left">
          <p className="mb-6 text-sm font-semibold tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
          <blockquote className="font-script text-2xl leading-relaxed text-accent md:text-3xl md:leading-snug lg:text-[2rem] lg:leading-snug">
            &ldquo;{message.quote}&rdquo;
          </blockquote>
          <p
            className={cn(
              "mt-8 font-display font-semibold",
              isDark ? "text-neutral" : "text-secondary",
            )}
          >
            {message.author}
          </p>
          <p className={cn("mt-1 text-sm", isDark ? "text-neutral/60" : "text-text-muted")}>
            {message.role}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </div>
  );
}
