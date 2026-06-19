import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { PageIntro } from "@/components/layout/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getInsights } from "@/lib/data/insights";
import { createStaticPageMetadata } from "@/lib/seo-metadata";
import { breadcrumbSchema } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return createStaticPageMetadata("/insights", {
    title: "Insights & News",
    description:
      "Industry perspectives on construction, earthquake-resistant building, infrastructure development, investment, and project management in Nepal.",
  });
}

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <>
      <JsonLd data={breadcrumbSchema("/insights")} />
      <PageIntro
        eyebrow="Insights"
        title="Industry Perspectives"
        description="Thought leadership on construction trends, infrastructure development, and trusted project delivery in Nepal."
      />
      <Section className="pt-10 md:pt-14">
        <SectionHeader
          eyebrow="Knowledge & Expertise"
          title="Latest Articles"
          description="Expert guidance from NEBCO's decades of experience in construction and development."
          align="center"
          className="mx-auto"
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col overflow-hidden rounded-sm border border-neutral-border bg-neutral transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              <span className="block h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold tracking-wide text-accent uppercase">{article.category}</p>
                <h2 className="mt-2 font-display text-xl text-secondary">
                  <Link href={`/insights/${article.slug}`} className="transition-colors hover:text-primary">
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{article.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-neutral-border pt-4 text-xs text-text-muted">
                  <span>{formatDate(article.date)}</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
