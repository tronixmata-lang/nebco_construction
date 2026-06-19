"use client";

import { useEffect, useState } from "react";
import { AdminField, AdminFormActions } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";

type SiteContentForm = {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  companyOverview: { title: string; description: string };
  about: {
    mission: string;
    vision: string;
    values: string;
    history: string;
  };
  chairmanMessage: { quote: string; author: string; role: string };
  certificateSection: { title: string; description: string };
  siteConfig: {
    name: string;
    email: string;
    phone: string;
    address: string;
    businessHours: string;
    tagline: string;
    description: string;
    social: { facebook: string; linkedin: string; website: string };
  };
};

const emptyForm: SiteContentForm = {
  hero: {
    headline: "",
    subheadline: "",
    primaryCta: { label: "", href: "" },
    secondaryCta: { label: "", href: "" },
  },
  companyOverview: { title: "", description: "" },
  about: { mission: "", vision: "", values: "", history: "" },
  chairmanMessage: { quote: "", author: "", role: "" },
  certificateSection: { title: "", description: "" },
  siteConfig: {
    name: "",
    email: "",
    phone: "",
    address: "",
    businessHours: "",
    tagline: "",
    description: "",
    social: { facebook: "", linkedin: "", website: "" },
  },
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteContentForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/site-content")
      .then((r) => r.json())
      .then((data) => {
        setForm({
          hero: data.hero ?? emptyForm.hero,
          companyOverview: data.companyOverview ?? emptyForm.companyOverview,
          about: {
            ...emptyForm.about,
            ...data.about,
            values: Array.isArray(data.about?.values) ? data.about.values.join("\n") : "",
          },
          chairmanMessage: data.chairmanMessage ?? emptyForm.chairmanMessage,
          certificateSection: data.certificateSection ?? emptyForm.certificateSection,
          siteConfig: {
            ...emptyForm.siteConfig,
            ...data.siteConfig,
            social: { ...emptyForm.siteConfig.social, ...data.siteConfig?.social },
          },
        });
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const payload = {
      ...form,
      about: {
        ...form.about,
        values: form.about.values.split("\n").map((v) => v.trim()).filter(Boolean),
      },
    };
    try {
      const res = await fetch("/api/admin/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) setMessage("Settings saved successfully!");
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
        title="Site Settings"
        description="Manage homepage hero, about content, contact info, and global settings"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Homepage Hero</h2>
          <AdminField label="Headline">
            <input className="admin-input" value={form.hero.headline} onChange={(e) => setForm({ ...form, hero: { ...form.hero, headline: e.target.value } })} />
          </AdminField>
          <AdminField label="Subheadline">
            <textarea className="admin-input min-h-20" value={form.hero.subheadline} onChange={(e) => setForm({ ...form, hero: { ...form.hero, subheadline: e.target.value } })} />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Primary CTA Label">
              <input className="admin-input" value={form.hero.primaryCta.label} onChange={(e) => setForm({ ...form, hero: { ...form.hero, primaryCta: { ...form.hero.primaryCta, label: e.target.value } } })} />
            </AdminField>
            <AdminField label="Primary CTA Link">
              <input className="admin-input" value={form.hero.primaryCta.href} onChange={(e) => setForm({ ...form, hero: { ...form.hero, primaryCta: { ...form.hero.primaryCta, href: e.target.value } } })} />
            </AdminField>
          </div>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Company Overview</h2>
          <AdminField label="Title">
            <input className="admin-input" value={form.companyOverview.title} onChange={(e) => setForm({ ...form, companyOverview: { ...form.companyOverview, title: e.target.value } })} />
          </AdminField>
          <AdminField label="Description">
            <textarea className="admin-input min-h-24" value={form.companyOverview.description} onChange={(e) => setForm({ ...form, companyOverview: { ...form.companyOverview, description: e.target.value } })} />
          </AdminField>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">About Page</h2>
          <AdminField label="Mission">
            <textarea className="admin-input" value={form.about.mission} onChange={(e) => setForm({ ...form, about: { ...form.about, mission: e.target.value } })} />
          </AdminField>
          <AdminField label="Vision">
            <textarea className="admin-input" value={form.about.vision} onChange={(e) => setForm({ ...form, about: { ...form.about, vision: e.target.value } })} />
          </AdminField>
          <AdminField label="Values (one per line)">
            <textarea className="admin-input min-h-32" value={form.about.values} onChange={(e) => setForm({ ...form, about: { ...form.about, values: e.target.value } })} />
          </AdminField>
          <AdminField label="History">
            <textarea className="admin-input min-h-32" value={form.about.history} onChange={(e) => setForm({ ...form, about: { ...form.about, history: e.target.value } })} />
          </AdminField>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Chairman Message</h2>
          <AdminField label="Quote">
            <textarea className="admin-input min-h-32" value={form.chairmanMessage.quote} onChange={(e) => setForm({ ...form, chairmanMessage: { ...form.chairmanMessage, quote: e.target.value } })} />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Author">
              <input className="admin-input" value={form.chairmanMessage.author} onChange={(e) => setForm({ ...form, chairmanMessage: { ...form.chairmanMessage, author: e.target.value } })} />
            </AdminField>
            <AdminField label="Role">
              <input className="admin-input" value={form.chairmanMessage.role} onChange={(e) => setForm({ ...form, chairmanMessage: { ...form.chairmanMessage, role: e.target.value } })} />
            </AdminField>
          </div>
        </section>

        <section className="admin-card space-y-4 p-6">
          <h2 className="admin-section-title">Contact & Site Info</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Email">
              <input className="admin-input" value={form.siteConfig.email} onChange={(e) => setForm({ ...form, siteConfig: { ...form.siteConfig, email: e.target.value } })} />
            </AdminField>
            <AdminField label="Phone">
              <input className="admin-input" value={form.siteConfig.phone} onChange={(e) => setForm({ ...form, siteConfig: { ...form.siteConfig, phone: e.target.value } })} />
            </AdminField>
          </div>
          <AdminField label="Address">
            <input className="admin-input" value={form.siteConfig.address} onChange={(e) => setForm({ ...form, siteConfig: { ...form.siteConfig, address: e.target.value } })} />
          </AdminField>
          <AdminField label="Business Hours">
            <input className="admin-input" value={form.siteConfig.businessHours} onChange={(e) => setForm({ ...form, siteConfig: { ...form.siteConfig, businessHours: e.target.value } })} />
          </AdminField>
          <AdminField label="Facebook URL">
            <input className="admin-input" value={form.siteConfig.social.facebook} onChange={(e) => setForm({ ...form, siteConfig: { ...form.siteConfig, social: { ...form.siteConfig.social, facebook: e.target.value } } })} />
          </AdminField>
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
