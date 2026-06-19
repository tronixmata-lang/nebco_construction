"use client";

import { ResourceList } from "@/components/admin/ResourceList";

type UserRow = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
};

export default function AdminUsersPage() {
  return (
    <ResourceList<UserRow>
      title="Admin Users"
      description="Manage who can access the admin panel. Superadmins can create and manage all users."
      apiPath="/api/admin/users"
      createHref="/admin/users/new"
      editHref={(id) => `/admin/users/${id}`}
      searchPlaceholder="Search users..."
      columns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        {
          key: "role",
          label: "Role",
          render: (u) => (
            <span className={`admin-badge ${u.role === "superadmin" ? "admin-badge-warning" : "admin-badge-muted"}`}>
              {u.role}
            </span>
          ),
        },
        {
          key: "isActive",
          label: "Status",
          render: (u) => (
            <span className={`admin-badge ${u.isActive ? "admin-badge-success" : "admin-badge-danger"}`}>
              {u.isActive ? "Active" : "Inactive"}
            </span>
          ),
        },
        {
          key: "lastLogin",
          label: "Last Login",
          render: (u) =>
            u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "Never",
        },
      ]}
    />
  );
}
