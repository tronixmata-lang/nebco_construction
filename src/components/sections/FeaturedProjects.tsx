import { getFeaturedProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function FeaturedProjects() {
  const featured = await getFeaturedProjects(4);

  return (
    <Section variant="muted" id="portfolio">
      <SectionHeader
        eyebrow="Our Work"
        title="Esteemed Projects"
        description="A showcase of NEBCO's residential, commercial, and infrastructure projects across Nepal and beyond."
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
