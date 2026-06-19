import { getStats } from "@/lib/data/content";
import { Container } from "@/components/ui/Container";

export async function StatsBar() {
  const companyStats = await getStats();

  return (
    <section className="border-b border-neutral-border bg-neutral-muted">
      <Container className="py-8">
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {companyStats.map((stat) => (
            <div key={stat.id} className="text-center">
              <dt className="font-display text-2xl text-primary md:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs font-medium tracking-wide text-text-muted uppercase sm:text-sm">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
