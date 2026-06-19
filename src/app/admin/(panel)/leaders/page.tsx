"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type Row = { _id: string; name: string; role: string; published: boolean };

export default function AdminLeadersPage() {
  return (
    <ResourceList<Row>
      title="Leadership"
      description="Manage leadership team profiles"
      apiPath="/api/admin/leaders"
      createHref="/admin/leaders/new"
      editHref={(id) => `/admin/leaders/${id}`}
      columns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        {
          key: "published",
          label: "Status",
          render: (l) => (
            <span className={`admin-badge ${l.published ? "admin-badge-success" : "admin-badge-muted"}`}>
              {l.published ? "Live" : "Hidden"}
            </span>
          ),
        },
      ]}
    />
  );
}
