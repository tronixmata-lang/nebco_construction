"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type Row = {
  _id: string;
  legacyId: string;
  name: string;
  role: string;
  articles?: { slug: string }[];
  published: boolean;
};

export default function AdminLeadersPage() {
  return (
    <ResourceList<Row>
      title="Leadership"
      description="Manage leadership profiles, messages, and published articles"
      apiPath="/api/admin/leaders"
      createHref="/admin/leaders/new"
      editHref={(id) => `/admin/leaders/${id}`}
      columns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        {
          key: "legacyId",
          label: "Profile URL",
          render: (leader) => (
            <span className="font-mono text-xs text-[var(--admin-muted)]">
              /leadership/{leader.legacyId}
            </span>
          ),
        },
        {
          key: "articles",
          label: "Articles",
          render: (leader) => (
            <span className="admin-badge admin-badge-muted">
              {leader.articles?.length ?? 0}
            </span>
          ),
        },
        {
          key: "published",
          label: "Status",
          render: (leader) => (
            <span className={`admin-badge ${leader.published ? "admin-badge-success" : "admin-badge-muted"}`}>
              {leader.published ? "Live" : "Hidden"}
            </span>
          ),
        },
      ]}
    />
  );
}
