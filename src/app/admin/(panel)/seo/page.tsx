"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminField, AdminFormActions } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ArrowRightLeft, FileText } from "lucide-react";

type SeoSettingsForm = {
  titleTemplate: string;
  defaultDescription: string;
  defaultOgImage: string;
  keywords: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
  ga4MeasurementId: string;
  ga4PropertyId: string;
  gtmContainerId: string;
  clarityProjectId: string;
  facebookPixelId: string;
};

const emptyForm: SeoSettingsForm = {
  titleTemplate: "%s | NEBCO",
  defaultDescription: "",
  defaultOgImage: "",
  keywords: "",
  googleSiteVerification: "",
  bingSiteVerification: "",
  ga4MeasurementId: "",
  ga4PropertyId: "",
  gtmContainerId: "",
  clarityProjectId: "",
  facebookPixelId: "",
};

export default function AdminSeoPage() {
  const [form, setForm] = useState<SeoSettingsForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((r) => r.json())
      .then((data) => {
        setForm({
          titleTemplate: data.titleTemplate ?? emptyForm.titleTemplate,
          defaultDescription: data.defaultDescription ?? "",
          defaultOgImage: data.defaultOgImage ?? "",
          keywords: Array.isArray(data.keywords) ? data.keywords.join(", ") : "",
          googleSiteVerification: data.googleSiteVerification ?? "",
          bingSiteVerification: data.bingSiteVerification ?? "",
          ga4MeasurementId: data.ga4MeasurementId ?? "",
          ga4PropertyId: data.ga4PropertyId ?? "",
          gtmContainerId: data.gtmContainerId ?? "",
          clarityProjectId: data.clarityProjectId ?? "",
          facebookPixelId: data.facebookPixelId ?? "",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          keywords: form.keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
        }),
      });
      if (res.ok) setMessage("SEO settings saved successfully!");
      else setMessage("Failed to save settings");
    } catch {
      setMessage("Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-[var(--admin-muted)]">Loading...</p>;

  return (
    <>
      <AdminHeader
        title="SEO & Analytics"
        description="Global meta defaults, verification tags, and tracking IDs"
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <Link href="/admin/seo/pages" className="admin-btn-secondary inline-flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Page SEO
        </Link>
        <Link href="/admin/seo/redirects" className="admin-btn-secondary inline-flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4" />
          Redirects
        </Link>
        <Link href="/admin/analytics" className="admin-btn-secondary inline-flex items-center gap-2">
          Analytics Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Global SEO Defaults</h2>
          <AdminField label="Title Template" hint="Use %s as placeholder for page title">
            <input
              className="admin-input"
              value={form.titleTemplate}
              onChange={(e) => setForm({ ...form, titleTemplate: e.target.value })}
            />
          </AdminField>
          <AdminField label="Default Meta Description">
            <textarea
              className="admin-input min-h-24"
              value={form.defaultDescription}
              onChange={(e) => setForm({ ...form, defaultDescription: e.target.value })}
            />
          </AdminField>
          <ImageUpload
            label="Default OG Image"
            value={form.defaultOgImage}
            onChange={(url) => setForm({ ...form, defaultOgImage: url })}
          />
          <AdminField label="Default Keywords" hint="Comma-separated">
            <input
              className="admin-input"
              value={form.keywords}
              onChange={(e) => setForm({ ...form, keywords: e.target.value })}
            />
          </AdminField>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Search Console Verification</h2>
          <AdminField label="Google Site Verification">
            <input
              className="admin-input"
              value={form.googleSiteVerification}
              onChange={(e) => setForm({ ...form, googleSiteVerification: e.target.value })}
              placeholder="google-site-verification content value"
            />
          </AdminField>
          <AdminField label="Bing Site Verification">
            <input
              className="admin-input"
              value={form.bingSiteVerification}
              onChange={(e) => setForm({ ...form, bingSiteVerification: e.target.value })}
              placeholder="msvalidate.01 content value"
            />
          </AdminField>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Analytics & Tracking</h2>
          <p className="text-sm text-[var(--admin-muted)]">
            If GTM is set, GA4 direct script is skipped (configure GA4 inside GTM instead).
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="GA4 Measurement ID">
              <input
                className="admin-input"
                value={form.ga4MeasurementId}
                onChange={(e) => setForm({ ...form, ga4MeasurementId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
              />
            </AdminField>
            <AdminField label="GA4 Property ID (for admin dashboard)">
              <input
                className="admin-input"
                value={form.ga4PropertyId}
                onChange={(e) => setForm({ ...form, ga4PropertyId: e.target.value })}
                placeholder="123456789"
              />
              <p className="mt-1 text-xs text-[var(--admin-muted)]">
                Numeric property ID from GA4 Admin → Property settings. Used to load visitor stats in Analytics.
              </p>
            </AdminField>
            <AdminField label="GTM Container ID">
              <input
                className="admin-input"
                value={form.gtmContainerId}
                onChange={(e) => setForm({ ...form, gtmContainerId: e.target.value })}
                placeholder="GTM-XXXXXXX"
              />
            </AdminField>
            <AdminField label="Microsoft Clarity Project ID">
              <input
                className="admin-input"
                value={form.clarityProjectId}
                onChange={(e) => setForm({ ...form, clarityProjectId: e.target.value })}
              />
            </AdminField>
            <AdminField label="Facebook Pixel ID">
              <input
                className="admin-input"
                value={form.facebookPixelId}
                onChange={(e) => setForm({ ...form, facebookPixelId: e.target.value })}
              />
            </AdminField>
          </div>
        </section>

        {message && (
          <p className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}

        <AdminFormActions saving={saving} onCancel={() => window.location.reload()} />
      </form>
    </>
  );
}
