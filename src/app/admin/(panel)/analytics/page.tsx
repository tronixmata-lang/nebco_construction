"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ExternalLink, CheckCircle2, XCircle } from "lucide-react";

type AnalyticsData = {
  tracking: Record<string, boolean>;
  ids: { ga4MeasurementId: string; gtmContainerId: string; clarityProjectId: string };
  content: { projectsPublished: number; insightsPublished: number };
  inquiries: {
    total: number;
    week: number;
    month: number;
    new: number;
    byDay: { _id: string; count: number }[];
    byStatus: { _id: string; count: number }[];
    recent: {
      _id: string;
      name: string;
      email: string;
      subject: string;
      status: string;
      createdAt: string;
    }[];
  };
  links: { ga4: string; searchConsole: string; clarity: string };
};

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="admin-card admin-stat-card p-6">
      <p className="admin-stat-label">{label}</p>
      <p className="admin-stat-value mt-2">{value}</p>
    </div>
  );
}

function TrackingBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center gap-2 border border-[var(--brand-border)] bg-[var(--brand-white)] px-3 py-2 shadow-sm">
      {active ? (
        <CheckCircle2 className="h-4 w-4 text-green-600" />
      ) : (
        <XCircle className="h-4 w-4 text-[var(--admin-muted)]" />
      )}
      <span className="text-sm text-[var(--brand-charcoal)]">{label}</span>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-[var(--admin-muted)]">Loading...</p>;
  if (!data) return <p className="text-red-400">Failed to load analytics</p>;

  const maxCount = Math.max(...data.inquiries.byDay.map((d) => d.count), 1);

  return (
    <>
      <AdminHeader
        title="Analytics Dashboard"
        description="Site performance overview and tracking status"
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <Link href="/admin/seo" className="admin-btn-secondary">
          Configure Tracking IDs
        </Link>
        <a href={data.links.ga4} target="_blank" rel="noopener noreferrer" className="admin-btn-secondary inline-flex items-center gap-2">
          Open GA4 <ExternalLink className="h-3 w-3" />
        </a>
        <a href={data.links.searchConsole} target="_blank" rel="noopener noreferrer" className="admin-btn-secondary inline-flex items-center gap-2">
          Search Console <ExternalLink className="h-3 w-3" />
        </a>
        <a href={data.links.clarity} target="_blank" rel="noopener noreferrer" className="admin-btn-secondary inline-flex items-center gap-2">
          Clarity <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold tracking-widest text-[var(--admin-muted)] uppercase">
          Tracking Status
        </h2>
        <div className="flex flex-wrap gap-2">
          <TrackingBadge label="Google Analytics 4" active={data.tracking.ga4} />
          <TrackingBadge label="Google Tag Manager" active={data.tracking.gtm} />
          <TrackingBadge label="Microsoft Clarity" active={data.tracking.clarity} />
          <TrackingBadge label="Facebook Pixel" active={data.tracking.facebook} />
          <TrackingBadge label="Google Verification" active={data.tracking.googleVerification} />
        </div>
      </section>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Inquiries (Total)" value={data.inquiries.total} />
        <StatCard label="This Week" value={data.inquiries.week} />
        <StatCard label="This Month" value={data.inquiries.month} />
        <StatCard label="New (Unread)" value={data.inquiries.new} />
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <StatCard label="Published Projects" value={data.content.projectsPublished} />
        <StatCard label="Published Insights" value={data.content.insightsPublished} />
      </div>

      <section className="admin-card mb-8 p-6">
        <h2 className="admin-section-title mb-4">Inquiries — Last 30 Days</h2>
        {data.inquiries.byDay.length === 0 ? (
          <p className="text-sm text-[var(--admin-muted)]">No inquiries in the last 30 days</p>
        ) : (
          <div className="flex items-end gap-1 h-32">
            {data.inquiries.byDay.map((day) => (
              <div key={day._id} className="group flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full bg-[var(--brand-red)] transition-all group-hover:opacity-80"
                  style={{ height: `${(day.count / maxCount) * 100}%`, minHeight: day.count > 0 ? "4px" : "0" }}
                  title={`${day._id}: ${day.count}`}
                />
                <span className="hidden text-[9px] text-[var(--admin-muted)] sm:block">
                  {day._id.slice(5)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-[var(--admin-border)] px-4 py-3">
          <h2 className="admin-serif font-semibold text-[var(--brand-charcoal)]">Recent Inquiries</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[var(--admin-border)]">
            <tr>
              <th className="px-4 py-3 font-medium text-[var(--admin-muted)]">Name</th>
              <th className="px-4 py-3 font-medium text-[var(--admin-muted)]">Subject</th>
              <th className="px-4 py-3 font-medium text-[var(--admin-muted)]">Status</th>
              <th className="px-4 py-3 font-medium text-[var(--admin-muted)]">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.inquiries.recent.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-[var(--admin-muted)]">
                  No inquiries yet
                </td>
              </tr>
            ) : (
              data.inquiries.recent.map((inq) => (
                <tr key={inq._id} className="border-b border-[var(--admin-border)]">
                  <td className="px-4 py-3 text-[var(--brand-charcoal)]">{inq.name}</td>
                  <td className="px-4 py-3 text-[var(--admin-muted)]">{inq.subject}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[var(--admin-card)] px-2 py-0.5 text-xs capitalize">
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--admin-muted)]">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="border-t border-[var(--admin-border)] px-4 py-3">
          <Link href="/admin/inquiries" className="text-sm font-semibold tracking-wide text-[var(--brand-red)] uppercase hover:underline">
            View all inquiries →
          </Link>
        </div>
      </section>
    </>
  );
}