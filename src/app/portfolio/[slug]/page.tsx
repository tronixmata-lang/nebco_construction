import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";
import { PageIntro } from "@/components/layout/PageIntro";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/Section";
import {
  breadcrumbSchema,
  createPageMetadata,
  projectImageAlt,
  projectSchema,
} from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return createPageMetadata({
    title: project.title,
    description: project.description,
    path: `/portfolio/${project.slug}`,
    image: project.image,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={[
          projectSchema(project),
          breadcrumbSchema(`/portfolio/${project.slug}`, project.title),
        ]}
      />
      <PageIntro
        eyebrow={`${project.category} Project`}
        title={project.title}
        description={project.description}
        breadcrumbLabel={project.title}
      />

      <Section className="pt-10 md:pt-14">
        <div className="mx-auto max-w-4xl">
          <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-sm bg-secondary shadow-xl">
            <Image
              src={project.image}
              alt={projectImageAlt(project)}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-secondary/25" />
          </div>

          <div className="grid gap-6 rounded-sm border border-neutral-border bg-neutral-muted p-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                Category
              </p>
              <p className="mt-1 font-medium text-secondary capitalize">
                {project.category}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                Location
              </p>
              <p className="mt-1 font-medium text-secondary">
                {project.location}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                Year
              </p>
              <p className="mt-1 font-medium text-secondary">{project.year}</p>
            </div>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-text-muted">
            {project.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/portfolio" variant="outline">
              Back to Portfolio
            </Button>
            <Button href="/contact">Discuss a Similar Project</Button>
          </div>
        </div>
      </Section>

    </>
  );
}
