"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminField, AdminFormActions, AdminToggle } from "@/components/admin/ResourceList";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUpload } from "@/components/admin/ImageUpload";

type LeaderArticleForm = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

type LeaderFormState = {
  legacyId: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  facebook: string;
  email: string;
  messageQuote: string;
  messageBody: string;
  articles: LeaderArticleForm[];
  sortOrder: number;
  published: boolean;
};

const emptyArticle = (): LeaderArticleForm => ({
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  category: "Leadership",
  date: new Date().toISOString().split("T")[0],
  readTime: "5 min read",
  image: "",
});

const emptyForm: LeaderFormState = {
  legacyId: "",
  name: "",
  role: "",
  bio: "",
  image: "",
  linkedin: "",
  facebook: "",
  email: "",
  messageQuote: "",
  messageBody: "",
  articles: [],
  sortOrder: 0,
  published: true,
};

function mapArticleFromApi(article: Record<string, unknown>): LeaderArticleForm {
  return {
    slug: String(article.slug ?? ""),
    title: String(article.title ?? ""),
    excerpt: String(article.excerpt ?? ""),
    body: Array.isArray(article.body) ? article.body.join("\n\n") : "",
    category: String(article.category ?? "Leadership"),
    date: String(article.date ?? new Date().toISOString().split("T")[0]),
    readTime: String(article.readTime ?? "5 min read"),
    image: String(article.image ?? ""),
  };
}

type LeaderFormProps = {
  params: Promise<{ id: string }>;
};

export function LeaderForm({ params }: LeaderFormProps) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState<LeaderFormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    params.then(({ id: paramId }) => {
      setIsNew(paramId === "new");
      if (paramId === "new") {
        setLoading(false);
        return;
      }
      setId(paramId);
      fetch(`/api/admin/leaders/${paramId}`)
        .then((r) => r.json())
        .then((data) => {
          setForm({
            legacyId: data.legacyId ?? "",
            name: data.name ?? "",
            role: data.role ?? "",
            bio: data.bio ?? "",
            image: data.image ?? "",
            linkedin: data.linkedin ?? "",
            facebook: data.facebook ?? "",
            email: data.email ?? "",
            messageQuote: data.messageQuote ?? "",
            messageBody: Array.isArray(data.messageBody) ? data.messageBody.join("\n\n") : "",
            articles: Array.isArray(data.articles)
              ? data.articles.map((article: Record<string, unknown>) => mapArticleFromApi(article))
              : [],
            sortOrder: data.sortOrder ?? 0,
            published: data.published ?? true,
          });
        })
        .finally(() => setLoading(false));
    });
  }, [params]);

  function updateField<K extends keyof LeaderFormState>(key: K, value: LeaderFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateArticle(index: number, key: keyof LeaderArticleForm, value: string) {
    setForm((prev) => ({
      ...prev,
      articles: prev.articles.map((article, i) =>
        i === index ? { ...article, [key]: value } : article,
      ),
    }));
  }

  function addArticle() {
    setForm((prev) => ({ ...prev, articles: [...prev.articles, emptyArticle()] }));
  }

  function removeArticle(index: number) {
    setForm((prev) => ({
      ...prev,
      articles: prev.articles.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      legacyId: form.legacyId.trim(),
      name: form.name.trim(),
      role: form.role.trim(),
      bio: form.bio.trim(),
      image: form.image.trim() || undefined,
      linkedin: form.linkedin.trim() || undefined,
      facebook: form.facebook.trim() || undefined,
      email: form.email.trim() || undefined,
      messageQuote: form.messageQuote.trim(),
      messageBody: form.messageBody.split("\n\n").map((p) => p.trim()).filter(Boolean),
      articles: form.articles
        .filter((article) => article.title.trim() && article.slug.trim())
        .map((article) => ({
          slug: article.slug.trim(),
          title: article.title.trim(),
          excerpt: article.excerpt.trim(),
          body: article.body.split("\n\n").map((p) => p.trim()).filter(Boolean),
          category: article.category.trim() || "Leadership",
          date: article.date,
          readTime: article.readTime.trim() || "5 min read",
          image: article.image.trim() || undefined,
        })),
      sortOrder: Number(form.sortOrder) || 0,
      published: form.published,
    };

    try {
      const url = isNew ? "/api/admin/leaders" : `/api/admin/leaders/${id}`;
      const res = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      router.push("/admin/leaders");
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-[var(--admin-muted)]">Loading...</p>;

  return (
    <>
      <AdminHeader
        title={isNew ? "New Leader" : "Edit Leader"}
        description="Manage profile, leadership message, and published articles"
      />
      <form onSubmit={handleSubmit} className="admin-card max-w-4xl space-y-8 p-6">
        <section className="space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
            Profile
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Legacy ID" hint="URL slug, e.g. chairman, md, design-head">
              <input
                className="admin-input"
                value={form.legacyId}
                onChange={(e) => updateField("legacyId", e.target.value)}
                required
                disabled={!isNew}
              />
            </AdminField>
            <AdminField label="Sort Order">
              <input
                type="number"
                className="admin-input max-w-[160px]"
                value={form.sortOrder}
                onChange={(e) => updateField("sortOrder", Number(e.target.value))}
              />
            </AdminField>
          </div>
          <AdminField label="Name">
            <input
              className="admin-input"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Role">
            <input
              className="admin-input"
              value={form.role}
              onChange={(e) => updateField("role", e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Bio" hint="Short summary shown on the leadership card">
            <textarea
              className="admin-input min-h-24"
              value={form.bio}
              onChange={(e) => updateField("bio", e.target.value)}
              required
            />
          </AdminField>
          <ImageUpload
            label="Profile Photo"
            hint="Shown on the leadership card and profile page"
            value={form.image}
            onChange={(url) => updateField("image", url)}
          />
          <div className="grid gap-5 sm:grid-cols-3">
            <AdminField label="LinkedIn URL">
              <input
                className="admin-input"
                value={form.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
              />
            </AdminField>
            <AdminField label="Facebook URL">
              <input
                className="admin-input"
                value={form.facebook}
                onChange={(e) => updateField("facebook", e.target.value)}
              />
            </AdminField>
            <AdminField label="Email">
              <input
                type="email"
                className="admin-input"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </AdminField>
          </div>
        </section>

        <section className="space-y-5 border-t border-[var(--admin-border)] pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
            Leadership Message
          </h2>
          <AdminField label="Featured Quote" hint="Displayed prominently on the profile page">
            <textarea
              className="admin-input min-h-28"
              value={form.messageQuote}
              onChange={(e) => updateField("messageQuote", e.target.value)}
            />
          </AdminField>
          <AdminField label="Full Statement" hint="Separate paragraphs with a blank line">
            <textarea
              className="admin-input min-h-48"
              value={form.messageBody}
              onChange={(e) => updateField("messageBody", e.target.value)}
            />
          </AdminField>
        </section>

        <section className="space-y-5 border-t border-[var(--admin-border)] pt-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--admin-muted)]">
                Articles
              </h2>
              <p className="mt-1 text-sm text-[var(--admin-muted)]">
                Published at /leadership/{form.legacyId || "slug"}/[article-slug]
              </p>
            </div>
            <button
              type="button"
              onClick={addArticle}
              className="admin-btn-secondary inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Article
            </button>
          </div>

          {form.articles.length === 0 && (
            <p className="rounded-lg border border-dashed border-[var(--admin-border)] px-4 py-8 text-center text-sm text-[var(--admin-muted)]">
              No articles yet. Add one to publish leadership perspectives on the public site.
            </p>
          )}

          {form.articles.map((article, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium text-[var(--admin-text)]">Article {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeArticle(index)}
                  className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <AdminField label="Title">
                  <input
                    className="admin-input"
                    value={article.title}
                    onChange={(e) => updateArticle(index, "title", e.target.value)}
                  />
                </AdminField>
                <AdminField label="Slug">
                  <input
                    className="admin-input"
                    value={article.slug}
                    onChange={(e) => updateArticle(index, "slug", e.target.value)}
                    placeholder="operational-excellence-at-nebco"
                  />
                </AdminField>
              </div>
              <AdminField label="Excerpt">
                <textarea
                  className="admin-input min-h-20"
                  value={article.excerpt}
                  onChange={(e) => updateArticle(index, "excerpt", e.target.value)}
                />
              </AdminField>
              <AdminField label="Body" hint="Separate paragraphs with a blank line">
                <textarea
                  className="admin-input min-h-40"
                  value={article.body}
                  onChange={(e) => updateArticle(index, "body", e.target.value)}
                />
              </AdminField>
              <ImageUpload
                label="Article Image"
                value={article.image}
                onChange={(url) => updateArticle(index, "image", url)}
              />
              <div className="grid gap-5 sm:grid-cols-3">
                <AdminField label="Category">
                  <input
                    className="admin-input"
                    value={article.category}
                    onChange={(e) => updateArticle(index, "category", e.target.value)}
                  />
                </AdminField>
                <AdminField label="Date">
                  <input
                    type="date"
                    className="admin-input"
                    value={article.date}
                    onChange={(e) => updateArticle(index, "date", e.target.value)}
                  />
                </AdminField>
                <AdminField label="Read Time">
                  <input
                    className="admin-input"
                    value={article.readTime}
                    onChange={(e) => updateArticle(index, "readTime", e.target.value)}
                  />
                </AdminField>
              </div>
            </div>
          ))}
        </section>

        <div className="border-t border-[var(--admin-border)] pt-6">
          <AdminToggle
            label="Published (visible on site)"
            checked={form.published}
            onChange={(value) => updateField("published", value)}
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        <AdminFormActions saving={saving} onCancel={() => router.push("/admin/leaders")} />
      </form>
    </>
  );
}
