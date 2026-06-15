import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-neutral-border bg-neutral p-6",
        hover && "transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
