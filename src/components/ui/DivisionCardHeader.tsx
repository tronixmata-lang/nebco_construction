import { cn } from "@/lib/utils";
import { TrustedBadge } from "@/components/ui/TrustedBadge";

type DivisionCardHeaderProps = {
  icon: React.ReactNode;
  className?: string;
};

export function DivisionCardHeader({ icon, className }: DivisionCardHeaderProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-14 items-center justify-center md:justify-between",
        className,
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center text-primary">
        {icon}
      </span>
      <TrustedBadge className="absolute top-0 right-0 md:static" />
    </div>
  );
}
