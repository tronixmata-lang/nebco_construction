"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminFormActions } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { SeoFieldsForm, emptySeoFields } from "@/components/admin/SeoFieldsForm";
import { ArrowLeft } from "lucide-react";
import type { SeoFields } from "@/types";

type PageSeo = SeoFields & { path: string; label: string };

export default function AdminPageSeoPage() {
  const [pages, setPages] = useState<PageSeo[]>([]);
  const [selectedPath, setSelectedPath] = useState("");
  const [form, setForm] = useState<PageSeo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/seo/pages")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setPages(list);
        if (list.length > 0) {
          setSelectedPath(list[0].path);
          setForm(list[0]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const page = pages.find((p) => p.path === selectedPath);
    if (page) {
      setForm({
        ...page,
        metaTitle: page.metaTitle ?? "",
        metaDescription: page.metaDescription ?? "",
        ogImage: page.ogImage ?? "",
        focusKeyword: page.focusKeyword ?? "",
        noIndex: page.noIndex ?? false,
        canonical: page.canonical ?? "",
      });
    }
  }, [selectedPath, pages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/seo/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("Page SEO saved successfully!");
        const updated = await res.json();
        setPages((prev) => prev.map((p) => (p.path === updated.path ? updated : p)));
      } else {
        setMessage("Failed to save");
      }
    } catch {
      setMessage("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !form) return <p className="text-[var(--admin-muted)]">Loading...</p>;

  return (
    <>
      <AdminHeader
        title="Page SEO"
        description="Customize meta tags for static site pages"
      />

      <Link href="/admin/seo" className="admin-btn-secondary mb-6 inline-flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to SEO Settings
      </Link>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="admin-card space-y-1 p-3">
          {pages.map((page) => (
            <button
              key={page.path}
              type="button"
              onClick={() => setSelectedPath(page.path)}
              className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                selectedPath === page.path
                  ? "bg-[var(--brand-red)] text-white"
                  : "text-[var(--admin-muted)] hover:bg-[var(--brand-cream)] hover:text-[var(--brand-charcoal)]"
              }`}
            >
              <span className="block font-medium">{page.label}</span>
              <span className="block font-mono text-xs opacity-70">{page.path}</span>
            </button>
          ))}
        </nav>

        <form onSubmit={handleSubmit} className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">{form.label}</h2>

          <SeoFieldsForm
            seo={form}
            onChange={(seo) => setForm({ ...form, ...seo })}
            defaultTitle={form.label}
            previewUrl={`https://nebco.com.np${form.path === "/" ? "" : form.path}`}
          />

          {message && (
            <p className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
              {message}
            </p>
          )}

          <AdminFormActions saving={saving} onCancel={() => setForm({ ...form, ...emptySeoFields })} />
        </form>
      </div>
    </>
  );
}
