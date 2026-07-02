import { AnimatedStatValue } from "@/components/ui/AnimatedStatValue";

export type StatItem = {
  id: string;
  value: string;
  label: string;
};

type StatsStripProps = {
  stats: StatItem[];
};

/** Shared stats card — used below every full-height hero (home + inner pages). */
export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-sm border border-neutral-border bg-neutral shadow-md">
      <dl className="grid grid-cols-2 divide-x divide-y divide-neutral-border md:grid-cols-4 md:divide-y-0">
        {stats.map((stat) => (
          <div key={stat.id} className="px-3 py-5 text-center sm:px-4 sm:py-6">
            <dt className="font-display text-2xl font-bold text-primary md:text-3xl">
              <AnimatedStatValue value={stat.value} />
            </dt>
            <dd className="mt-1 text-[10px] font-semibold tracking-wide text-text-muted uppercase md:text-xs">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
