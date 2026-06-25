import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LeaderArticleContent } from "@/components/leadership/LeaderArticleContent";
import { PageIntro } from "@/components/layout/PageIntro";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { getSiteContent } from "@/lib/data/content";
import { getLeaderArticle, getLeaderStaticParams } from "@/lib/data/leaders";
import { articleSchema, breadcrumbSchema, createPageMetadata } from "@/lib/seo";

const DEFAULT_ARTICLE_IMAGE = "/images/pexels-mike-van-schoonderwalt-1884800-5505119.jpg";

type LeaderArticlePageProps = {
  params: Promise<{ slug: string; articleSlug: string }>;
};

export async function generateStaticParams() {
  return getLeaderStaticParams();
}

export async function generateMetadata({ params }: LeaderArticlePageProps): Promise<Metadata> {
  const { slug, articleSlug } = await params;
  const result = await getLeaderArticle(slug, articleSlug);
  if (!result) return { title: "Article Not Found" };

  const { article } = result;
  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/leadership/${slug}/${article.slug}`,
    type: "article",
    publishedTime: article.date,
    image: article.image,
  });
}

export default async function LeaderArticlePage({ params }: LeaderArticlePageProps) {
  const { slug, articleSlug } = await params;
  const [result, { pageHeroImages }] = await Promise.all([
    getLeaderArticle(slug, articleSlug),
    getSiteContent(),
  ]);

  if (!result) notFound();

  const { leader, article } = result;
  const heroImage = article.image ?? leader.image ?? pageHeroImages.leadership ?? DEFAULT_ARTICLE_IMAGE;

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            id: article.slug,
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            body: article.body,
            category: article.category,
            date: article.date,
            readTime: article.readTime,
            image: article.image,
          }),
          breadcrumbSchema(`/leadership/${leader.id}/${article.slug}`, article.title),
        ]}
      />
      <PageIntro
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        breadcrumbLabel={article.title}
        showStats={false}
        backgroundImage={heroImage}
        backgroundAlt={`${article.title}, ${leader.name}`}
      />
      <Section className="pt-10 md:pt-14" glow="accent">
        <ScrollReveal className="mx-auto max-w-3xl">
          {article.image && (
            <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-sm border border-accent/30 shadow-xl">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                loading="lazy"
                priority
              />
            </div>
          )}
          <LeaderArticleContent leader={leader} article={article} />
          <div className="mt-12 flex flex-wrap gap-4 border-t border-neutral-border pt-10">
            <Button href={`/leadership/${leader.id}`} variant="outline">
              More from {leader.name}
            </Button>
            <Button href="/leadership" variant="ghost">
              Leadership Team
            </Button>
          </div>
        </ScrollReveal>
      </Section>
      <CtaBanner />
    </>
  );
}
