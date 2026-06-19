"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type Row = { _id: string; name: string; shortName: string; slug: string; published: boolean };

export default function AdminDivisionsPage() {
  return (
    <ResourceList<Row>
      title="Business Divisions"
      description="Manage NEBCO Construction, Investment, and Consulting divisions"
      apiPath="/api/admin/divisions"
      createHref="/admin/divisions/new"
      editHref={(id) => `/admin/divisions/${id}`}
      columns={[
        { key: "name", label: "Name" },
        { key: "shortName", label: "Short Name" },
        { key: "slug", label: "Slug" },
        {
          key: "published",
          label: "Status",
          render: (d) => (
            <span className={`admin-badge ${d.published ? "admin-badge-success" : "admin-badge-muted"}`}>
              {d.published ? "Live" : "Hidden"}
            </span>
          ),
        },
      ]}
    />
  );
}
