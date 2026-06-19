"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminField, AdminFormActions, AdminToggle } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ArrowLeft, Trash2 } from "lucide-react";

type Redirect = {
  _id: string;
  from: string;
  to: string;
  statusCode: 301 | 302;
  active: boolean;
};

const emptyForm = { from: "", to: "", statusCode: 301 as 301 | 302, active: true };

export default function AdminRedirectsPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadRedirects() {
    const res = await fetch("/api/admin/seo/redirects");
    const data = await res.json();
    setRedirects(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    loadRedirects().finally(() => setLoading(false));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/seo/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to create redirect");
        return;
      }
      setForm(emptyForm);
      await loadRedirects();
    } catch {
      setError("Failed to create redirect");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(id: string, active: boolean) {
    await fetch(`/api/admin/seo/redirects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active }),
    });
    await loadRedirects();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this redirect?")) return;
    await fetch(`/api/admin/seo/redirects/${id}`, { method: "DELETE" });
    await loadRedirects();
  }

  if (loading) return <p className="text-[var(--admin-muted)]">Loading...</p>;

  return (
    <>
      <AdminHeader
        title="URL Redirects"
        description="Manage 301/302 redirects for moved or renamed pages"
      />

      <Link href="/admin/seo" className="admin-btn-secondary mb-6 inline-flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to SEO Settings
      </Link>

      <form onSubmit={handleCreate} className="admin-card mb-8 max-w-2xl space-y-4 p-6">
        <h2 className="admin-section-title">Add Redirect</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="From Path" hint="e.g. /old-page">
            <input
              className="admin-input"
              value={form.from}
              onChange={(e) => setForm({ ...form, from: e.target.value })}
              required
            />
          </AdminField>
          <AdminField label="To Path or URL">
            <input
              className="admin-input"
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              required
            />
          </AdminField>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <AdminField label="Status Code">
            <select
              className="admin-input max-w-[120px]"
              value={form.statusCode}
              onChange={(e) =>
                setForm({ ...form, statusCode: Number(e.target.value) as 301 | 302 })
              }
            >
              <option value={301}>301</option>
              <option value={302}>302</option>
            </select>
          </AdminField>
          <AdminToggle
            label="Active"
            checked={form.active}
            onChange={(v) => setForm({ ...form, active: v })}
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <AdminFormActions saving={saving} onCancel={() => setForm(emptyForm)} />
      </form>

      <div className="admin-card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--admin-border)] bg-[var(--admin-card)]">
            <tr>
              <th className="px-4 py-3 font-medium text-[var(--admin-muted)]">From</th>
              <th className="px-4 py-3 font-medium text-[var(--admin-muted)]">To</th>
              <th className="px-4 py-3 font-medium text-[var(--admin-muted)]">Code</th>
              <th className="px-4 py-3 font-medium text-[var(--admin-muted)]">Active</th>
              <th className="px-4 py-3 font-medium text-[var(--admin-muted)]" />
            </tr>
          </thead>
          <tbody>
            {redirects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[var(--admin-muted)]">
                  No redirects yet
                </td>
              </tr>
            ) : (
              redirects.map((r) => (
                <tr key={r._id} className="border-b border-[var(--admin-border)]">
                  <td className="px-4 py-3 font-mono text-xs text-[var(--brand-charcoal)]">{r.from}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--brand-charcoal)]">{r.to}</td>
                  <td className="px-4 py-3 text-[var(--admin-muted)]">{r.statusCode}</td>
                  <td className="px-4 py-3">
                    <AdminToggle
                      label=""
                      checked={r.active}
                      onChange={(v) => toggleActive(r._id, v)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(r._id)}
                      className="text-red-400 hover:text-red-300"
                      aria-label="Delete redirect"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
