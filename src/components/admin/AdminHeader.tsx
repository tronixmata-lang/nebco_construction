"use client";

import { useEffect, useState } from "react";

type AdminUser = {
  name: string;
  email: string;
  role: string;
};

export function AdminHeader({ title, description }: { title: string; description?: string }) {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => setUser(null));
  }, []);

  return (
    <header className="admin-page-header flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="pl-12 lg:pl-0">
        <p className="admin-page-eyebrow">NEBCO · Content Management</p>
        <h1 className="admin-page-title">{title}</h1>
        {description && <p className="admin-page-subtitle">{description}</p>}
      </div>
      {user && (
        <div className="admin-user-pill text-right">
          <p className="admin-user-name">{user.name}</p>
          <p className="text-xs text-[var(--brand-text-muted)]">{user.email}</p>
          <span className="admin-user-role">{user.role}</span>
        </div>
      )}
    </header>
  );
}
