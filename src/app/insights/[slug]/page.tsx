import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { PageIntro } from "@/components/layout/PageIntro";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { getSiteContent } from "@/lib/data/content";
import { getAllInsightSlugs, getInsightBySlug } from "@/lib/data/insights";
import { getInsightWithSeo } from "@/lib/data/insights-seo";
import { getSeoSettings, resolveSeoFields } from "@/lib/data/seo";
import { articleSchema, breadcrumbSchema, createPageMetadata } from "@/lib/seo";

const DEFAULT_INSIGHT_IMAGE = "/images/pexels-mike-van-schoonderwalt-1884800-5505119.jpg";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsightWithSeo(slug);
  if (!article) return { title: "Article Not Found" };
  const settings = await getSeoSettings();
  const resolved = resolveSeoFields(
    {
      title: article.title,
      description: article.excerpt,
      path: `/insights/${article.slug}`,
    },
    article.seo,
    { defaultOgImage: settings.defaultOgImage },
  );
  return createPageMetadata({
    title: resolved.title,
    description: resolved.description,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.date,
    noIndex: resolved.noIndex,
    canonical: resolved.canonical,
  });
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const [article, { pageHeroImages }] = await Promise.all([
    getInsightBySlug(slug),
    getSiteContent(),
  ]);
  if (!article) notFound();

  const heroImage = article.image ?? pageHeroImages.insights ?? DEFAULT_INSIGHT_IMAGE;

  return (
    <>
      <JsonLd data={[articleSchema(article), breadcrumbSchema(`/insights/${article.slug}`, article.title)]} />
      <PageIntro
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        breadcrumbLabel={article.title}
        showStats={false}
        backgroundImage={heroImage}
        backgroundAlt={`${article.title}, NEBCO Construction`}
      />
      <Section className="pt-10 md:pt-14" glow="accent">
        <ScrollReveal className="mx-auto max-w-3xl">
          {article.image && (
            <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-sm shadow-xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                loading="lazy"
              />
            </div>
          )}
          <div className="mb-8 flex items-center gap-4 border-b border-neutral-border pb-6 text-sm text-text-muted">
            <span>{formatDate(article.date)}</span>
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span>{article.readTime}</span>
          </div>
          <article className="prose prose-lg max-w-none text-text-muted">
            <p className="font-display text-xl leading-relaxed text-secondary">{article.excerpt}</p>
            {article.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>
          <div className="mt-10">
            <Button href="/insights" variant="outline">Back to Insights</Button>
          </div>
        </ScrollReveal>
      </Section>
      <CtaBanner />
    </>
  );
}
