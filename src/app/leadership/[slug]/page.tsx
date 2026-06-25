import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeaderArticleCard } from "@/components/leadership/LeaderArticleCard";
import { LeaderMessageBody } from "@/components/leadership/LeaderMessageBody";
import { PageIntro } from "@/components/layout/PageIntro";
import { ChairmanMessageSection } from "@/components/sections/ChairmanMessageSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getSiteContent } from "@/lib/data/content";
import { getAllLeaderIds, getLeaderProfileById } from "@/lib/data/leaders";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

type LeaderPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const ids = await getAllLeaderIds();
  return ids.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LeaderPageProps): Promise<Metadata> {
  const { slug } = await params;
  const leader = await getLeaderProfileById(slug);
  if (!leader) return { title: "Leader Not Found" };

  return createPageMetadata({
    title: `${leader.name} | Leadership`,
    description: leader.bio,
    path: `/leadership/${leader.id}`,
    image: leader.image,
  });
}

export default async function LeaderProfilePage({ params }: LeaderPageProps) {
  const { slug } = await params;
  const [leader, { pageHeroImages }] = await Promise.all([
    getLeaderProfileById(slug),
    getSiteContent(),
  ]);

  if (!leader) notFound();

  const heroImage = leader.image ?? pageHeroImages.leadership;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(`/leadership/${leader.id}`, leader.name)}
      />
      <PageIntro
        eyebrow="Leadership"
        title={leader.name}
        description={leader.role}
        breadcrumbLabel={leader.name}
        showStats={false}
        backgroundImage={heroImage}
        backgroundAlt={`${leader.name}, NEBCO Leadership`}
      />

      <Section className="pt-10 md:pt-14" glow="none">
        <ScrollReveal>
          <ChairmanMessageSection
            message={{
              quote: leader.message.quote,
              author: leader.name,
              role: leader.role,
              image: leader.image,
            }}
            variant="light"
            quoteVariant="standard"
            decorative
            eyebrow="Leadership Message"
          />
        </ScrollReveal>

        {leader.message.body && leader.message.body.length > 0 && (
          <ScrollReveal delay={100} className="mt-14 md:mt-16">
            <LeaderMessageBody paragraphs={leader.message.body} />
          </ScrollReveal>
        )}
      </Section>

      <Section variant="muted" glow="primary">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Publications"
            title="Leadership Perspectives"
            description={`Written by ${leader.name}: industry insight, organizational philosophy, and professional guidance from the front line of NEBCO's work.`}
            className="mb-10"
          />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leader.articles.map((article) => (
              <LeaderArticleCard
                key={article.slug}
                leaderId={leader.id}
                article={article}
              />
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={160} className="mt-10">
          <Button href="/leadership" variant="outline">
            Back to Leadership Team
          </Button>
        </ScrollReveal>
      </Section>

      <CtaBanner />
    </>
  );
}
