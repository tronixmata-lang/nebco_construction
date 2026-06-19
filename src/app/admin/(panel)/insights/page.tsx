"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type InsightRow = {
  _id: string;
  title: string;
  category: string;
  date: string;
  status: string;
  featured: boolean;
};

export default function AdminInsightsPage() {
  return (
    <ResourceList<InsightRow>
      title="Insights & News"
      description="Manage blog articles and industry perspectives"
      apiPath="/api/admin/insights"
      createHref="/admin/insights/new"
      editHref={(id) => `/admin/insights/${id}`}
      searchPlaceholder="Search articles..."
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "date", label: "Date" },
        {
          key: "status",
          label: "Status",
          render: (a) => (
            <div className="flex gap-2">
              {a.featured && <span className="admin-badge admin-badge-warning">Featured</span>}
              <span className={`admin-badge ${a.status === "published" ? "admin-badge-success" : "admin-badge-muted"}`}>
                {a.status}
              </span>
            </div>
          ),
        },
      ]}
    />
  );
}
