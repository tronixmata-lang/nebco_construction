"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  createdAt: string;
};

const statusFilters = ["all", "new", "read", "replied", "archived"] as const;

export default function AdminInquiriesPage() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<(typeof statusFilters)[number]>("all");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const url = filter === "all" ? "/api/admin/inquiries" : `/api/admin/inquiries?status=${filter}`;
    const data = await fetch(url).then((r) => r.json());
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <>
      <AdminHeader
        title="Contact Inquiries"
        description="View and manage contact form submissions"
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {statusFilters.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-md px-3 py-1.5 text-sm capitalize transition-colors ${
              filter === s
                ? "bg-[var(--brand-red)] text-white"
                : "border border-[var(--admin-border)] text-[var(--admin-muted)] hover:border-[var(--brand-gold)] hover:text-[var(--brand-charcoal)]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="admin-card overflow-x-auto">
        {loading ? (
          <p className="p-8 text-center text-sm text-[var(--admin-muted)]">Loading...</p>
        ) : items.length === 0 ? (
          <p className="p-8 text-center text-sm text-[var(--admin-muted)]">No inquiries found</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((inq) => (
                <tr key={inq._id}>
                  <td>
                    <Link href={`/admin/inquiries/${inq._id}`} className="font-medium text-[var(--brand-charcoal)] hover:text-[var(--brand-red)]">
                      {inq.name}
                    </Link>
                  </td>
                  <td className="text-[var(--admin-muted)]">{inq.email}</td>
                  <td>{inq.subject}</td>
                  <td>
                    <span className={`admin-badge ${inq.status === "new" ? "admin-badge-danger" : "admin-badge-muted"}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="text-[var(--admin-muted)]">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
