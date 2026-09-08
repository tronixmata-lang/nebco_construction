import { CmsImage } from "@/components/ui/CmsImage";
import Link from "next/link";
import { projectCategories } from "@/content/projects";
import { projectImageAlt } from "@/lib/seo";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type PortfolioMosaicCardProps = {
  project: Project;
  index: number;
  layout: "hero" | "wide" | "standard";
};

function categoryLabel(category: Project["category"]) {
  return projectCategories.find((item) => item.id === category)?.label ?? category;
}

export function PortfolioMosaicCard({ project, index, layout }: PortfolioMosaicCardProps) {
  const label = categoryLabel(project.category);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn(
        "portfolio-mosaic-card group relative isolate min-h-[260px] overflow-hidden rounded-sm border border-neutral-border/80 bg-secondary",
        layout === "hero" && "min-h-[320px] sm:min-h-[420px] lg:min-h-0",
        layout === "wide" && "min-h-[240px]",
      )}
    >
      <CmsImage
        src={project.image}
        alt={projectImageAlt(project)}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        sizes={
          layout === "hero"
            ? "(max-width: 1024px) 100vw, 50vw"
            : layout === "wide"
              ? "(max-width: 1024px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        }
      />

      <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/35 to-secondary/10 transition-opacity duration-500 group-hover:from-secondary group-hover:via-secondary/55" />

      <span
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />

      <span className="portfolio-mosaic-card__corner portfolio-mosaic-card__corner--tl" aria-hidden="true" />
      <span className="portfolio-mosaic-card__corner portfolio-mosaic-card__corner--tr" aria-hidden="true" />
      <span className="portfolio-mosaic-card__corner portfolio-mosaic-card__corner--bl" aria-hidden="true" />
      <span className="portfolio-mosaic-card__corner portfolio-mosaic-card__corner--br" aria-hidden="true" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
        <span className="font-label inline-flex items-center gap-2 rounded-sm bg-secondary/55 px-2.5 py-1 text-[11px] text-neutral backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {project.featured && (
            <span className="font-label rounded-sm bg-accent/90 px-2 py-1 text-[10px] text-secondary">
              Featured
            </span>
          )}
          <span className="font-label inline-flex items-center gap-1.5 rounded-sm border border-accent/40 bg-secondary/55 px-2 py-1 text-[10px] text-accent backdrop-blur-sm">
            <BrandIcon name={project.category} title={label} className="h-4 w-4" surface="dark" alt="" />
            {label}
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
        <p className="font-label text-[11px] text-accent">
          {project.year}
          <span className="mx-2 text-neutral/40">·</span>
          {project.location}
        </p>
        <h3
          className={cn(
            "mt-2 font-display text-neutral transition-transform duration-500 group-hover:-translate-y-0.5",
            layout === "hero" ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl",
          )}
        >
          {project.title}
        </h3>
        <p
          className={cn(
            "mt-2 line-clamp-2 text-sm leading-relaxed text-neutral/75",
            layout === "hero" ? "sm:line-clamp-3 sm:max-w-2xl" : "max-w-xl",
          )}
        >
          {project.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 font-label text-xs text-neutral opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
          View Project
          <span aria-hidden="true" className="text-accent">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
