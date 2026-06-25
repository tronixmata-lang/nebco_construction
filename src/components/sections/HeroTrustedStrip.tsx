import { heroTrustStats } from "@/config/hero";
import { getStats } from "@/lib/data/content";
import { Container } from "@/components/ui/Container";
import { AnimatedStatValue } from "@/components/ui/AnimatedStatValue";

export async function HeroTrustedStrip() {
  const companyStats = await getStats();
  const stats = heroTrustStats.map((item) => {
    const match = companyStats.find((stat) => stat.id === item.id);
    return {
      id: item.id,
      value: match?.value ?? "—",
      label: match?.label ?? item.label,
    };
  });

  return (
    <div className="relative z-20 mt-auto">
      <Container className="relative pb-1 md:pb-2">
        <div className="mx-auto max-w-3xl rounded-2xl border border-neutral/15 bg-secondary/35 px-4 py-4 shadow-lg shadow-secondary/20 backdrop-blur-md sm:px-6 sm:py-5 lg:max-w-4xl">
          <dl className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-0">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center sm:border-l sm:border-neutral/10 sm:first:border-l-0 sm:px-2"
              >
                <dt className="font-display text-xl font-bold text-primary sm:text-2xl">
                  <AnimatedStatValue value={stat.value} />
                </dt>
                <dd className="mt-1 text-[9px] font-medium leading-tight tracking-wide text-neutral/65 uppercase sm:text-[10px]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
