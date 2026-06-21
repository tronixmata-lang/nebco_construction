import { getFeaturedInsights } from "@/lib/data/insights";
import { InsightCard } from "@/components/insights/InsightCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function InsightsPreview() {
  const preview = await getFeaturedInsights(3);

  return (
    <Section id="insights">
      <SectionHeader
        eyebrow="Insights & News"
        title="Industry Perspectives"
        description="Thought leadership on construction, infrastructure, investment, and project management."
        align="center"
        className="mx-auto"
      />

      <div className="grid gap-8 md:grid-cols-3">
        {preview.map((article) => (
          <InsightCard key={article.id} article={article} titleTag="h3" />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button href="/insights" variant="outline">Read All Insights</Button>
      </div>
    </Section>
  );
}
