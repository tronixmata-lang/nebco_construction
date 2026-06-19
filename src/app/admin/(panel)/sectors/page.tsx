"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type Row = { _id: string; title: string; highlight: string; published: boolean };

export default function AdminSectorsPage() {
  return (
    <ResourceList<Row>
      title="Industry Sectors"
      description="Manage industry sectors displayed on the website"
      apiPath="/api/admin/sectors"
      createHref="/admin/sectors/new"
      editHref={(id) => `/admin/sectors/${id}`}
      columns={[
        { key: "title", label: "Title" },
        { key: "highlight", label: "Highlight" },
        {
          key: "published",
          label: "Status",
          render: (s) => (
            <span className={`admin-badge ${s.published ? "admin-badge-success" : "admin-badge-muted"}`}>
              {s.published ? "Live" : "Hidden"}
            </span>
          ),
        },
      ]}
    />
  );
}
