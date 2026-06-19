"use client";

import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type ResourceListProps<T extends { _id: string }> = {
  title: string;
  description: string;
  apiPath: string;
  createHref: string;
  editHref: (id: string) => string;
  columns: Column<T>[];
  searchPlaceholder?: string;
};

export function ResourceList<T extends { _id: string }>({
  title,
  description,
  apiPath,
  createHref,
  editHref,
  columns,
  searchPlaceholder = "Search...",
}: ResourceListProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url = query ? `${apiPath}?q=${encodeURIComponent(query)}` : apiPath;
      const res = await fetch(url);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, [apiPath, query]);

  useEffect(() => {
    const timer = setTimeout(load, query ? 300 : 0);
    return () => clearTimeout(timer);
  }, [load, query]);

  async function handleDelete(id: string, label: string) {
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    await fetch(`${apiPath}/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <>
      <AdminHeader title={title} description={description} />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--admin-muted)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="admin-input pl-9"
          />
        </div>
        <Link href={createHref} className="admin-btn-primary">
          <Plus className="h-4 w-4" />
          Add New
        </Link>
      </div>

      <div className="admin-card overflow-x-auto">
        {loading ? (
          <p className="p-8 text-center text-sm text-[var(--admin-muted)]">Loading...</p>
        ) : items.length === 0 ? (
          <p className="p-8 text-center text-sm text-[var(--admin-muted)]">No items found</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={String(col.key)}>{col.label}</th>
                ))}
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  {columns.map((col) => (
                    <td key={String(col.key)}>
                      {col.render
                        ? col.render(item)
                        : String((item as Record<string, unknown>)[col.key as string] ?? "")}
                    </td>
                  ))}
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={editHref(item._id)}
                        className="p-1.5 text-[var(--admin-muted)] hover:bg-[var(--brand-cream)] hover:text-[var(--brand-charcoal)]"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            item._id,
                            String((item as Record<string, unknown>).title ?? (item as Record<string, unknown>).name ?? "item"),
                          )
                        }
                        className="rounded-md p-1.5 text-[var(--admin-muted)] hover:bg-red-950/50 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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

export function AdminField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-[var(--admin-muted)]">{hint}</p>}
    </div>
  );
}

export function AdminToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-[var(--admin-border)] accent-[var(--admin-primary)]"
      />
      <span className="text-sm text-[var(--admin-text)]">{label}</span>
    </label>
  );
}

export function AdminFormActions({
  saving,
  onCancel,
}: {
  saving: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="flex gap-3 border-t border-[var(--admin-border)] pt-6">
      <button type="submit" disabled={saving} className="admin-btn-primary">
        {saving ? "Saving..." : "Save Changes"}
      </button>
      <button type="button" onClick={onCancel} className="admin-btn-secondary">
        Cancel
      </button>
    </div>
  );
}
