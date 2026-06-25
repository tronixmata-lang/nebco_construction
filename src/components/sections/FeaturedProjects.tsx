import { getFeaturedProjects } from "@/lib/data/projects";
import { getSiteContent } from "@/lib/data/content";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function FeaturedProjects() {
  const [{ homepageSections }, featured] = await Promise.all([
    getSiteContent(),
    getFeaturedProjects(4),
  ]);

  return (
    <Section variant="muted" id="portfolio">
      <SectionHeader
        eyebrow={homepageSections.featuredProjects.eyebrow}
        title={homepageSections.featuredProjects.title}
        description={homepageSections.featuredProjects.description}
        align="center"
        className="mx-auto"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} aspect="4/3" />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button href="/portfolio">View Full Portfolio</Button>
      </div>
    </Section>
  );
}
