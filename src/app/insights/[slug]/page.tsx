import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInsightBySlug, insights } from "@/content/insights";
import { formatDate } from "@/lib/utils";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import {
  articleSchema,
  breadcrumbSchema,
  createPageMetadata,
} from "@/lib/seo";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return insights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) return { title: "Article Not Found" };

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.date,
  });
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={[
          articleSchema(article),
          breadcrumbSchema(`/insights/${article.slug}`, article.title),
        ]}
      />
      <PageIntro
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        breadcrumbLabel={article.title}
        showStats={false}
      />

      <Section className="pt-10 md:pt-14">
        <article className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-4 border-b border-neutral-border pb-6 text-sm text-text-muted">
            <span>{formatDate(article.date)}</span>
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span>{article.readTime}</span>
          </div>

          <div className="prose prose-lg max-w-none text-text-muted">
            <p className="font-display text-xl leading-relaxed text-secondary">
              {article.excerpt}
            </p>
            {article.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <Button href="/insights" variant="outline">
              Back to Insights
            </Button>
          </div>
        </article>
      </Section>
    </>
  );
}
