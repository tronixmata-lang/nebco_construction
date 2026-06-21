import { cn } from "@/lib/utils";

type CoreValuesArrowFlowProps = {
  values: string[];
};

function FlowArrow() {
  return (
    <div className="flex shrink-0 items-center px-0.5 sm:px-1" aria-hidden="true">
      <svg
        className="h-4 w-4 text-accent sm:h-5 sm:w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    </div>
  );
}

function ValueSegment({ value, index }: { value: string; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        "group relative flex min-h-[7.5rem] min-w-[9.5rem] shrink-0 snap-center flex-col justify-center rounded-sm border border-neutral-border bg-neutral px-4 py-4 transition-all duration-300 sm:min-w-0 sm:flex-1 sm:px-3 sm:py-5 lg:px-4",
        "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
      )}
    >
      <span
        className={cn(
          "font-display text-xl leading-none sm:text-2xl",
          isEven ? "text-accent group-hover:text-primary" : "text-primary group-hover:text-accent",
        )}
      >
        {number}
      </span>
      <p className="mt-2 text-xs font-medium leading-snug text-secondary sm:mt-3 sm:text-sm">
        {value}
      </p>
    </div>
  );
}

export function CoreValuesArrowFlow({ values }: CoreValuesArrowFlowProps) {
  return (
    <div className="mx-auto max-w-6xl" role="list" aria-label="Core values">
      <div className="relative hidden items-stretch sm:flex">
        {values.map((value, index) => (
          <div key={value} className="flex min-w-0 flex-1 items-center" role="listitem">
            <ValueSegment value={value} index={index} />
            {index < values.length - 1 && <FlowArrow />}
          </div>
        ))}
        {values.length > 1 && (
          <div
            className="pointer-events-none absolute -bottom-3 left-[10%] right-[10%] hidden h-px bg-gradient-to-r from-primary/20 via-accent/50 to-primary/20 lg:block"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="sm:hidden">
        <div className="-mx-4 flex snap-x snap-mandatory items-stretch gap-0 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {values.map((value, index) => (
            <div key={value} className="flex shrink-0 snap-center items-center">
              <ValueSegment value={value} index={index} />
              {index < values.length - 1 && <FlowArrow />}
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-text-muted">Swipe to explore our values</p>
      </div>
    </div>
  );
}
