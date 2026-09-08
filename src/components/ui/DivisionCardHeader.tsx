import { cn } from "@/lib/utils";

type DivisionCardHeaderProps = {
  icon: React.ReactNode;
  className?: string;
};

export function DivisionCardHeader({ icon, className }: DivisionCardHeaderProps) {
  return (
    <div
      className={cn(
        "relative -mt-6 -ml-10 flex w-full items-start justify-start sm:-ml-14",
        className,
      )}
    >
      {icon}
    </div>
  );
}
