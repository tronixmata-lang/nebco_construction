import { CmsImage } from "@/components/ui/CmsImage";
import Link from "next/link";
import { projectCategories } from "@/content/projects";
import type { Project } from "@/types";
import { projectImageAlt } from "@/lib/seo";
import { cn } from "@/lib/utils";

type MostViewedSidebarProps = {
  projects: Project[];
  className?: string;
};

function categoryLabel(category: Project["category"]): string {
  return projectCategories.find((item) => item.id === category)?.label ?? category;
}

export function MostViewedSidebar({ projects, className }: MostViewedSidebarProps) {
  if (projects.length === 0) return null;

  return (
    <aside className={cn("lg:sticky lg:top-28 lg:self-start", className)}>
      <div className="overflow-hidden rounded-sm border border-neutral-border bg-neutral shadow-sm">
        <div className="border-b border-neutral-border bg-neutral-muted px-5 py-4">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Explore More
          </p>
          <h2 className="mt-1 font-display text-xl text-secondary">Most Viewed</h2>
          <span className="mt-3 block h-0.5 w-10 rounded-full bg-primary" aria-hidden="true" />
        </div>

        <ol className="divide-y divide-neutral-border">
          {projects.map((project, index) => (
            <li key={project.id}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group flex gap-4 p-4 transition-colors hover:bg-neutral-muted/60"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-sm bg-secondary">
                  <CmsImage
                    src={project.image}
                    alt={projectImageAlt(project)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold tracking-wide text-accent uppercase">
                    {categoryLabel(project.category)}
                  </p>
                  <p className="mt-0.5 font-display text-sm leading-snug text-secondary transition-colors group-hover:text-primary">
                    {project.title}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">{project.location}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        <div className="border-t border-neutral-border px-5 py-4">
          <Link
            href="/portfolio"
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View full portfolio →
          </Link>
        </div>
      </div>
    </aside>
  );
}
