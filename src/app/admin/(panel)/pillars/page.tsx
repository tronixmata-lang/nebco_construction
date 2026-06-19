"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type Row = { _id: string; title: string; icon: string; published: boolean };

export default function AdminPillarsPage() {
  return (
    <ResourceList<Row>
      title="Value Pillars"
      description="Manage company value pillars"
      apiPath="/api/admin/pillars"
      createHref="/admin/pillars/new"
      editHref={(id) => `/admin/pillars/${id}`}
      columns={[
        { key: "title", label: "Title" },
        { key: "icon", label: "Icon Key" },
        {
          key: "published",
          label: "Status",
          render: (p) => (
            <span className={`admin-badge ${p.published ? "admin-badge-success" : "admin-badge-muted"}`}>
              {p.published ? "Live" : "Hidden"}
            </span>
          ),
        },
      ]}
    />
  );
}
