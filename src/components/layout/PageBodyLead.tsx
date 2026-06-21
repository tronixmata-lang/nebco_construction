import { Container } from "@/components/ui/Container";
import { AnimatedStatValue } from "@/components/ui/AnimatedStatValue";

type PageBodyLeadProps = {
  showStats?: boolean;
};

export async function PageBodyLead({ showStats = true }: PageBodyLeadProps) {
  if (!showStats) return null;

  const { getStats } = await import("@/lib/data/content");
  const companyStats = await getStats();

  return (
    <div className="relative z-10 -mt-8 md:-mt-10">
      <Container>
        <div className="mx-auto max-w-5xl rounded-sm border border-neutral-border bg-neutral px-3 py-3 shadow-md sm:px-4 sm:py-4 md:px-6 md:py-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
            {companyStats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="font-display text-2xl text-primary md:text-3xl">
                  <AnimatedStatValue value={stat.value} />
                </p>
                <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-text-muted uppercase md:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
