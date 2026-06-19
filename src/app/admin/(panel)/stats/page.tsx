"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type Row = { _id: string; value: string; label: string; published: boolean };

export default function AdminStatsPage() {
  return (
    <ResourceList<Row>
      title="Company Stats"
      description="Manage stats shown on homepage and inner pages"
      apiPath="/api/admin/stats"
      createHref="/admin/stats/new"
      editHref={(id) => `/admin/stats/${id}`}
      columns={[
        { key: "value", label: "Value" },
        { key: "label", label: "Label" },
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
