import { getFeaturedInsights } from "@/lib/data/insights";
import { getSiteContent } from "@/lib/data/content";
import { InsightCard } from "@/components/insights/InsightCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function InsightsPreview() {
  const [{ homepageSections }, preview] = await Promise.all([
    getSiteContent(),
    getFeaturedInsights(3),
  ]);

  return (
    <Section id="insights">
      <SectionHeader
        eyebrow={homepageSections.insights.eyebrow}
        title={homepageSections.insights.title}
        description={homepageSections.insights.description}
        align="center"
        className="mx-auto"
      />

      <div className="grid gap-8 md:grid-cols-3">
        {preview.map((article) => (
          <InsightCard key={article.id} article={article} titleTag="h3" />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button href="/insights" variant="outline">
          Read All Insights
        </Button>
      </div>
    </Section>
  );
}
