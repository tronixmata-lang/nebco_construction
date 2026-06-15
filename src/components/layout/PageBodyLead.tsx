import { companyStats } from "@/content/homepage";
import { Container } from "@/components/ui/Container";

type PageBodyLeadProps = {
  showStats?: boolean;
};

export function PageBodyLead({ showStats = true }: PageBodyLeadProps) {
  if (!showStats) return null;

  return (
    <div className="relative z-10 -mt-8 md:-mt-10">
      <Container>
        <div className="mx-auto max-w-5xl rounded-sm border border-neutral-border bg-neutral px-4 py-4 shadow-md md:px-6 md:py-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
            {companyStats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="font-display text-2xl font-bold text-primary md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-text-muted uppercase md:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
