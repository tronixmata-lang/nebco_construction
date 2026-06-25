"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type Row = {
  _id: string;
  name: string;
  shortName: string;
  slug: string;
  href: string;
  sortOrder: number;
  published: boolean;
};

export default function AdminDivisionsPage() {
  return (
    <ResourceList<Row>
      title="Our Verticals"
      description="Manage NEBCO Construction, Investment, and Consulting verticals"
      apiPath="/api/admin/divisions"
      createHref="/admin/divisions/new"
      editHref={(id) => `/admin/divisions/${id}`}
      searchPlaceholder="Search verticals..."
      columns={[
        { key: "name", label: "Name" },
        { key: "shortName", label: "Short Name" },
        {
          key: "href",
          label: "Public URL",
          render: (vertical) => (
            <span className="font-mono text-xs text-[var(--admin-muted)]">{vertical.href}</span>
          ),
        },
        {
          key: "sortOrder",
          label: "Order",
          render: (vertical) => (
            <span className="font-mono text-xs text-[var(--admin-muted)]">{vertical.sortOrder ?? 0}</span>
          ),
        },
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
