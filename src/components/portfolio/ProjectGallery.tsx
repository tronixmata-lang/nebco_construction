import { CmsImage } from "@/components/ui/CmsImage";
import type { Project } from "@/types";
import { projectImageAlt } from "@/lib/seo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

type ProjectGalleryProps = {
  project: Project;
  images: string[];
};

export function ProjectGallery({ project, images }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="mt-14 md:mt-16">
      <SectionHeader
        eyebrow="Visual Tour"
        title="Project Gallery"
        description="Additional views from the build — craftsmanship, scale, and finish quality."
      />
      <StaggerReveal
        className="grid gap-4 sm:grid-cols-2"
        staggerMs={80}
      >
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-secondary shadow-md"
          >
            <CmsImage
              src={src}
              alt={`${projectImageAlt(project)} — gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-secondary/0 transition-colors duration-300 group-hover:bg-secondary/10" />
          </div>
        ))}
      </StaggerReveal>
    </div>
  );
}
