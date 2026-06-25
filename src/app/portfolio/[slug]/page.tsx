import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { MostViewedSidebar } from "@/components/portfolio/MostViewedSidebar";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import { ProjectSpecs } from "@/components/portfolio/ProjectSpecs";
import { ProjectViewTracker } from "@/components/portfolio/ProjectViewTracker";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projectCategories } from "@/content/projects";
import {
  getAllProjectSlugs,
  getMostViewedProjects,
  getProjectBySlug,
} from "@/lib/data/projects";
import { getProjectWithSeo } from "@/lib/data/projects-seo";
import { getSeoSettings, resolveSeoFields } from "@/lib/data/seo";
import {
  breadcrumbSchema,
  createPageMetadata,
  projectImageAlt,
  projectSchema,
} from "@/lib/seo";
import { truncateText } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function categoryLabel(category: string): string {
  return projectCategories.find((item) => item.id === category)?.label ?? category;
}

function getGalleryImages(project: { image: string; images?: string[] }): string[] {
  return project.images?.filter((src) => src && src !== project.image) ?? [];
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectWithSeo(slug);
  if (!project) return { title: "Project Not Found" };
  const settings = await getSeoSettings();
  const resolved = resolveSeoFields(
    {
      title: project.title,
      description: project.description,
      image: project.image,
      path: `/portfolio/${project.slug}`,
    },
    project.seo,
    { defaultOgImage: settings.defaultOgImage },
  );
  return createPageMetadata({
    title: resolved.title,
    description: resolved.description,
    path: `/portfolio/${project.slug}`,
    image: resolved.ogImage,
    noIndex: resolved.noIndex,
    canonical: resolved.canonical,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, mostViewed] = await Promise.all([
    getProjectBySlug(slug),
    getMostViewedProjects(5, slug),
  ]);
  if (!project) notFound();

  const galleryImages = getGalleryImages(project);
  const heroEyebrow = `${categoryLabel(project.category)} · ${project.location} · ${project.year}`;
  const periodIndex = project.description.indexOf(".");
  const leadSentence =
    periodIndex > -1
      ? project.description.slice(0, periodIndex + 1).trim()
      : project.description;
  const remainingDescription =
    periodIndex > -1 ? project.description.slice(periodIndex + 1).trim() : "";

  return (
    <>
      <ProjectViewTracker slug={project.slug} />
      <JsonLd data={[projectSchema(project), breadcrumbSchema(`/portfolio/${project.slug}`, project.title)]} />
      <PageIntro
        eyebrow={heroEyebrow}
        title={project.title}
        description={truncateText(project.description, 200)}
        breadcrumbLabel={project.title}
        backgroundImage={project.image}
        backgroundAlt={projectImageAlt(project)}
        showStats={false}
      />

      <Section className="pt-10 md:pt-14" glow="primary">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-16 xl:gap-20">
          <div className="min-w-0">
            <ScrollReveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-secondary shadow-xl">
                <Image
                  src={project.image}
                  alt={projectImageAlt(project)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <ProjectSpecs project={project} />
            </ScrollReveal>

            <ScrollReveal delay={120} className="mt-12 md:mt-14">
              <SectionHeader
                eyebrow="Project Overview"
                title="Built with Precision"
                description="Every NEBCO project is delivered with transparent communication, rigorous quality control, and craftsmanship that stands the test of time."
              />
              <div className="prose prose-lg max-w-none text-text-muted">
                <p className="font-display text-xl leading-relaxed text-secondary md:text-2xl">
                  {leadSentence}
                </p>
                {remainingDescription && (
                  <p className="mt-6 leading-relaxed">{remainingDescription}</p>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <ProjectGallery project={project} images={galleryImages} />
            </ScrollReveal>

            <ScrollReveal delay={200} className="mt-12 flex flex-wrap gap-4 border-t border-neutral-border pt-10 md:mt-14">
              <Button href="/portfolio" variant="outline">
                Back to Portfolio
              </Button>
              <Button href="/contact">
                Discuss a Similar Project
              </Button>
            </ScrollReveal>
          </div>

          <MostViewedSidebar projects={mostViewed} />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
