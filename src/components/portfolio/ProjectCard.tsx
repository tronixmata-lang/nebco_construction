"use client";

import { CmsImage } from "@/components/ui/CmsImage";
import Link from "next/link";
import type { Project } from "@/types";
import { projectImageAlt } from "@/lib/seo";

type ProjectCardProps = {
  project: Project;
  aspect?: "4/3" | "16/10";
};

export function ProjectCard({ project, aspect = "16/10" }: ProjectCardProps) {
  const aspectClass = aspect === "4/3" ? "aspect-[4/3]" : "aspect-[16/10]";

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group overflow-hidden rounded-sm border border-neutral-border bg-neutral transition-shadow hover:shadow-lg"
    >
      <div className={`relative ${aspectClass} bg-secondary`}>
        <CmsImage
          src={project.image}
          alt={projectImageAlt(project)}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-medium tracking-wide text-accent uppercase">
          {project.category}, {project.year}
        </p>
        <h3 className="mt-1 font-display text-lg text-secondary transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-3">
          {project.description}
        </p>
        <p className="mt-2 text-sm text-text-muted">{project.location}</p>
      </div>
    </Link>
  );
}
