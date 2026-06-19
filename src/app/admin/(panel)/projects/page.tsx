"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type ProjectRow = {
  _id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  published: boolean;
  featured: boolean;
};

export default function AdminProjectsPage() {
  return (
    <ResourceList<ProjectRow>
      title="Projects"
      description="Manage portfolio projects displayed on the website"
      apiPath="/api/admin/projects"
      createHref="/admin/projects/new"
      editHref={(id) => `/admin/projects/${id}`}
      searchPlaceholder="Search projects..."
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category", render: (p) => (
          <span className="capitalize">{p.category}</span>
        )},
        { key: "location", label: "Location" },
        { key: "year", label: "Year" },
        {
          key: "featured",
          label: "Status",
          render: (p) => (
            <div className="flex gap-2">
              {p.featured && <span className="admin-badge admin-badge-warning">Featured</span>}
              <span className={`admin-badge ${p.published ? "admin-badge-success" : "admin-badge-muted"}`}>
                {p.published ? "Live" : "Hidden"}
              </span>
            </div>
          ),
        },
      ]}
    />
  );
}
