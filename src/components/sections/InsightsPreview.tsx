import Link from "next/link";
import { insights } from "@/content/insights";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function InsightsPreview() {
  const preview = insights.slice(0, 3);

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
          <Card key={article.id} hover className="flex flex-col">
            <p className="text-xs font-semibold tracking-wide text-accent uppercase">
              {article.category}
            </p>
            <h3 className="mt-2 font-display text-lg font-bold text-secondary">
              <Link
                href={`/insights/${article.slug}`}
                className="transition-colors hover:text-primary"
              >
                {article.title}
              </Link>
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
              {article.excerpt}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
              <span>{formatDate(article.date)}</span>
              <span>{article.readTime}</span>
            </div>
          </Card>
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
