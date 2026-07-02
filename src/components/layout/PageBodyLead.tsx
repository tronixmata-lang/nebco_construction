import { Container } from "@/components/ui/Container";
import { StatsStrip } from "@/components/layout/StatsStrip";

type PageBodyLeadProps = {
  showStats?: boolean;
};

export async function PageBodyLead({ showStats = true }: PageBodyLeadProps) {
  if (!showStats) return null;

  const { getStats } = await import("@/lib/data/content");
  const companyStats = await getStats();

  return (
    <div className="relative z-20 -mt-8 md:-mt-10">
      <Container>
        <StatsStrip stats={companyStats} />
      </Container>
    </div>
  );
}
