"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Award,
  BarChart3,
  Building2,
  Database,
  Inbox,
  Layers,
  Newspaper,
  Factory,
  RefreshCw,
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";

type DashboardData = {
  counts: {
    projects: number;
    insights: number;
    divisions: number;
    sectors: number;
    pillars: number;
    leaders: number;
    testimonials: number;
    stats: number;
    certificates: number;
    newInquiries: number;
    totalInquiries: number;
    publishedProjects: number;
    draftInsights: number;
  };
  recentInquiries: Array<{
    _id: string;
    name: string;
    email: string;
    subject: string;
    status: string;
    createdAt: string;
  }>;
  recentProjects: Array<{
    _id: string;
    title: string;
    slug: string;
    published: boolean;
    featured: boolean;
    updatedAt: string;
  }>;
};

const statCards = [
  { key: "projects", label: "Projects", icon: Building2, href: "/admin/projects", color: "#a51e22" },
  { key: "insights", label: "Insights", icon: Newspaper, href: "/admin/insights", color: "#c9a227" },
  { key: "newInquiries", label: "New Inquiries", icon: Inbox, href: "/admin/inquiries", color: "#222222" },
  { key: "testimonials", label: "Testimonials", icon: Award, href: "/admin/testimonials", color: "#7a1619" },
  { key: "divisions", label: "Verticals", icon: Layers, href: "/admin/divisions", color: "#c9a227" },
  { key: "sectors", label: "Sectors", icon: Factory, href: "/admin/sectors", color: "#7a1619" },
  { key: "certificates", label: "Certificates", icon: Award, href: "/admin/certificates", color: "#a51e22" },
] as const;

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState("");
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) {
          setDbError(json.error ?? "Failed to connect to the database.");
          return;
        }
        setData(json);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSeed() {
    if (!confirm("Re-import all static content into MongoDB? Existing records will be updated.")) return;
    setSeeding(true);
    setSeedMsg("");
    try {
      const res = await fetch("/api/admin/dashboard", { method: "POST" });
      const result = await res.json();
      if (res.ok) {
        setSeedMsg("Database seeded successfully!");
        const dash = await fetch("/api/admin/dashboard").then((r) => r.json());
        setData(dash);
      } else {
        setSeedMsg(result.error ?? "Seed failed");
      }
    } catch {
      setSeedMsg("Seed failed");
    } finally {
      setSeeding(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-[var(--admin-muted)]" />
      </div>
    );
  }

  const counts = data?.counts;

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Overview of your NEBCO website content and activity"
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSeed}
          disabled={seeding}
          className="admin-btn-secondary"
        >
          <Database className="h-4 w-4" />
          {seeding ? "Seeding..." : "Import Static Content"}
        </button>
        {seedMsg && (
          <span className="self-center text-sm text-[var(--admin-accent)]">{seedMsg}</span>
        )}
      </div>

      {dbError && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          <p className="font-semibold">Database connection issue</p>
          <p className="mt-1">{dbError}</p>
          <p className="mt-2 text-xs">
            Verify <code className="font-mono">MONGODB_URI</code> on the server, run{" "}
            <code className="font-mono">npm run seed</code>, then check{" "}
            <code className="font-mono">/api/health</code>.
          </p>
        </div>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map(({ key, label, icon: Icon, href, color }) => (
          <Link
            key={key}
            href={href}
            className="admin-card admin-stat-card group p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="admin-stat-label">{label}</p>
                <p className="admin-stat-value mt-2">
                  {counts?.[key] ?? 0}
                </p>
              </div>
              <div className="admin-stat-icon">
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="admin-card admin-card-classic overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-6 py-4">
            <h2 className="admin-serif text-base font-semibold text-[var(--brand-charcoal)]">
              Recent Inquiries
            </h2>
            <Link href="/admin/inquiries" className="text-xs font-semibold tracking-wide text-[var(--brand-red)] uppercase hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-[var(--admin-border)]">
            {(data?.recentInquiries ?? []).length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-[var(--admin-muted)]">
                No inquiries yet
              </p>
            ) : (
              data?.recentInquiries.map((inq) => (
                <Link
                  key={inq._id}
                  href={`/admin/inquiries/${inq._id}`}
                  className="admin-list-row block px-5 py-4 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="admin-list-title text-sm">{inq.name}</p>
                      <p className="text-xs text-[var(--admin-muted)]">{inq.subject}</p>
                    </div>
                    <span
                      className={`admin-badge ${inq.status === "new" ? "admin-badge-danger" : "admin-badge-muted"}`}
                    >
                      {inq.status}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="admin-card admin-card-classic overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--admin-border)] px-6 py-4">
            <h2 className="admin-serif text-base font-semibold text-[var(--brand-charcoal)]">
              Recent Projects
            </h2>
            <Link href="/admin/projects" className="text-xs font-semibold tracking-wide text-[var(--brand-red)] uppercase hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-[var(--admin-border)]">
            {(data?.recentProjects ?? []).map((proj) => (
              <Link
                key={proj._id}
                href={`/admin/projects/${proj._id}`}
                className="admin-list-row block px-5 py-4 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="admin-list-title text-sm">{proj.title}</p>
                  <div className="flex gap-2">
                    {proj.featured && (
                      <span className="admin-badge admin-badge-warning">Featured</span>
                    )}
                    <span
                      className={`admin-badge ${proj.published ? "admin-badge-success" : "admin-badge-muted"}`}
                    >
                      {proj.published ? "Live" : "Draft"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {counts && (
        <div className="admin-card admin-card-classic mt-6 p-6">
          <div className="mb-5 flex items-center gap-3">
            <BarChart3 className="h-4 w-4 text-[var(--brand-gold)]" />
            <h2 className="admin-serif text-base font-semibold text-[var(--brand-charcoal)]">
              Content Summary
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Published Projects", counts.publishedProjects],
              ["Draft Articles", counts.draftInsights],
              ["Total Inquiries", counts.totalInquiries],
              ["Industry Sectors", counts.sectors],
              ["Value Pillars", counts.pillars],
              ["Leadership", counts.leaders],
              ["Stats", counts.stats],
              ["Certificates", counts.certificates],
            ].map(([label, value]) => (
              <div
                key={label as string}
                className="border border-[var(--admin-border)] bg-[var(--admin-bg-warm)] p-4"
              >
                <p className="text-[10px] font-semibold tracking-wider text-[var(--admin-muted)] uppercase">
                  {label}
                </p>
                <p className="admin-stat-value mt-2 text-2xl">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
