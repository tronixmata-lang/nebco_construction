import { companyStats } from "@/content/homepage";
import { Container } from "@/components/ui/Container";

export function StatsBar() {
  return (
    <section className="border-b border-neutral-border bg-neutral-muted py-10 md:py-12">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {companyStats.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="font-display text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-medium tracking-wide text-text-muted uppercase sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
