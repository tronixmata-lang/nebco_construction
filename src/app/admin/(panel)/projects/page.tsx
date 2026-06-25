"use client";

import { ResourceList } from "@/components/admin/ResourceList";
import type { ProjectShowcaseLayout } from "@/types";

type ProjectRow = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  published: boolean;
  featured: boolean;
  sortOrder: number;
  showcaseLayout: ProjectShowcaseLayout;
  images?: string[];
  viewCount?: number;
};

const layoutLabels: Record<ProjectShowcaseLayout, string> = {
  auto: "Auto",
  hero: "Hero",
  wide: "Wide",
  standard: "Standard",
};

export default function AdminProjectsPage() {
  return (
    <ResourceList<ProjectRow>
      title="Projects"
      description="Manage portfolio projects, mosaic placement, and gallery images"
      apiPath="/api/admin/projects"
      createHref="/admin/projects/new"
      editHref={(id) => `/admin/projects/${id}`}
      searchPlaceholder="Search projects..."
      columns={[
        { key: "title", label: "Title" },
        {
          key: "category",
          label: "Category",
          render: (project) => <span className="capitalize">{project.category}</span>,
        },
        {
          key: "slug",
          label: "Portfolio URL",
          render: (project) => (
            <span className="font-mono text-xs text-[var(--admin-muted)]">
              /portfolio/{project.slug}
            </span>
          ),
        },
        {
          key: "showcaseLayout",
          label: "Mosaic",
          render: (project) => (
            <span className="admin-badge admin-badge-muted">
              {layoutLabels[project.showcaseLayout ?? "auto"]}
            </span>
          ),
        },
        {
          key: "sortOrder",
          label: "Order",
          render: (project) => (
            <span className="font-mono text-xs text-[var(--admin-muted)]">{project.sortOrder ?? 0}</span>
          ),
        },
        {
          key: "images",
          label: "Gallery",
          render: (project) => (
            <span className="admin-badge admin-badge-muted">{project.images?.length ?? 0}</span>
          ),
        },
        {
          key: "featured",
          label: "Status",
          render: (project) => (
            <div className="flex flex-wrap gap-2">
              {project.featured && (
                <span className="admin-badge admin-badge-warning">Featured</span>
              )}
              <span
                className={`admin-badge ${project.published ? "admin-badge-success" : "admin-badge-muted"}`}
              >
                {project.published ? "Live" : "Hidden"}
              </span>
            </div>
          ),
        },
      ]}
    />
  );
}
