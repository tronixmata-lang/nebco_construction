"use client";

import { CmsImage } from "@/components/ui/CmsImage";
import Link from "next/link";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { projectImageAlt } from "@/lib/seo";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  aspect?: "4/3" | "16/10";
};

export function ProjectCard({ project, aspect = "16/10" }: ProjectCardProps) {
  const aspectClass = aspect === "4/3" ? "aspect-[4/3]" : "aspect-[16/10]";
  const hasImage = Boolean(project.image?.trim());

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group overflow-hidden rounded-sm border border-neutral-border bg-neutral transition-shadow hover:shadow-lg"
    >
      <div className={`relative ${aspectClass} bg-neutral-muted`}>
        {hasImage ? (
          <CmsImage
            src={project.image}
            alt={projectImageAlt(project)}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1 border border-dashed border-secondary/20 bg-neutral-muted px-3 text-center"
            role="img"
            aria-label="Your project photo"
          >
            <span className="font-label text-[10px] tracking-[0.14em] text-secondary/60 uppercase">
              Your logo
            </span>
            <span className="font-display text-sm text-secondary/75">Your project photo</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <BrandIcon name={project.category} title={project.category} className="h-8 w-8" alt="" />
          <p className="font-label text-xs text-accent">
            {project.category}, {project.year}
          </p>
        </div>
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
