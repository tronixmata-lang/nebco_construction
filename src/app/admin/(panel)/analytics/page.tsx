"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ExternalLink, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

type Ga4Visitors = {
  configured: boolean;
  ready: boolean;
  message?: string;
  period: { start: string; end: string; days: number };
  overview: {
    activeUsers: number;
    sessions: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: number;
    avgEngagementTime: number;
  } | null;
  daily: { date: string; users: number; sessions: number; pageViews: number }[];
  topPages: { path: string; title: string; views: number }[];
  countries: { country: string; users: number }[];
  cities: { city: string; country: string; users: number }[];
  devices: { device: string; users: number }[];
  browsers: { browser: string; users: number }[];
  trafficSources: { channel: string; source: string; users: number; sessions: number }[];
  demographics: {
    age: { bracket: string; users: number }[];
    gender: { gender: string; users: number }[];
  };
};

type AnalyticsData = {
  tracking: Record<string, boolean>;
  ids: {
    ga4MeasurementId: string;
    ga4PropertyId: string;
    gtmContainerId: string;
    clarityProjectId: string;
  };
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
  visitors: Ga4Visitors;
  links: { ga4: string; searchConsole: string; clarity: string };
};

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className="admin-card admin-stat-card p-6">
      <p className="admin-stat-label">{label}</p>
      <p className="admin-stat-value mt-2">{value}</p>
      {hint && <p className="mt-1 text-xs text-[var(--admin-muted)]">{hint}</p>}
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

function BarList({
  items,
  labelKey,
  valueKey,
  suffix,
}: {
  items: Record<string, string | number>[];
  labelKey: string;
  valueKey: string;
  suffix?: (item: Record<string, string | number>) => string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-[var(--admin-muted)]">No data for this period</p>;
  }

  const max = Math.max(...items.map((item) => Number(item[valueKey] ?? 0)), 1);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const value = Number(item[valueKey] ?? 0);
        const label = String(item[labelKey] ?? "Unknown");
        const extra = suffix?.(item);
        return (
          <div key={`${label}-${index}`}>
            <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
              <span className="truncate text-[var(--brand-charcoal)]">
                {label}
                {extra ? <span className="text-[var(--admin-muted)]"> {extra}</span> : null}
              </span>
              <span className="shrink-0 font-medium text-[var(--brand-charcoal)]">{value}</span>
            </div>
            <div className="h-2 bg-[var(--admin-card)]">
              <div
                className="h-full bg-[var(--brand-red)]"
                style={{ width: `${(value / max) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function VisitorsSetupBanner({ visitors }: { visitors: Ga4Visitors }) {
  if (visitors.ready) return null;

  return (
    <section className="admin-card mb-8 border-l-4 border-amber-500 p-6">
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div>
          <h2 className="admin-serif font-semibold text-[var(--brand-charcoal)]">
            Visitor analytics setup
          </h2>
          <p className="mt-2 text-sm text-[var(--admin-muted)]">
            {visitors.message ??
              "Connect Google Analytics to see pages, traffic sources, devices, and locations here."}
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[var(--admin-muted)]">
            <li>Add your GA4 Measurement ID and Property ID in Admin → SEO.</li>
            <li>
              Create a Google Cloud service account with Analytics Data API access and add it as a
              Viewer on your GA4 property.
            </li>
            <li>
              On the server, set <code className="text-xs">GA4_SERVICE_ACCOUNT_JSON</code> or{" "}
              <code className="text-xs">GOOGLE_APPLICATION_CREDENTIALS</code>.
            </li>
          </ol>
          <Link href="/admin/seo" className="admin-btn-secondary mt-4 inline-block">
            Configure in SEO Settings
          </Link>
        </div>
      </div>
    </section>
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

  const { visitors } = data;
  const overview = visitors.overview;
  const maxInquiryCount = Math.max(...data.inquiries.byDay.map((d) => d.count), 1);
  const maxDailyUsers = Math.max(...visitors.daily.map((d) => d.users), 1);

  return (
    <>
      <AdminHeader
        title="Analytics Dashboard"
        description="Visitor behavior, traffic sources, and site performance"
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <Link href="/admin/seo" className="admin-btn-secondary">
          Configure Tracking IDs
        </Link>
        <a
          href={data.links.ga4}
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-secondary inline-flex items-center gap-2"
        >
          Open GA4 <ExternalLink className="h-3 w-3" />
        </a>
        <a
          href={data.links.searchConsole}
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-secondary inline-flex items-center gap-2"
        >
          Search Console <ExternalLink className="h-3 w-3" />
        </a>
        <a
          href={data.links.clarity}
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-secondary inline-flex items-center gap-2"
        >
          Clarity <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <VisitorsSetupBanner visitors={visitors} />

      {visitors.ready && overview && (
        <>
          <section className="mb-8">
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-sm font-semibold tracking-widest text-[var(--admin-muted)] uppercase">
                Website Visitors, Last {visitors.period.days} Days
              </h2>
              <p className="text-xs text-[var(--admin-muted)]">
                {visitors.period.start} to {visitors.period.end}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <StatCard label="Active Users" value={overview.activeUsers} />
              <StatCard label="Sessions" value={overview.sessions} />
              <StatCard label="Page Views" value={overview.pageViews} />
              <StatCard label="Bounce Rate" value={formatPercent(overview.bounceRate)} />
              <StatCard
                label="Avg. Session"
                value={formatDuration(overview.avgSessionDuration)}
              />
              <StatCard
                label="Avg. Engagement"
                value={formatDuration(overview.avgEngagementTime)}
                hint="per user"
              />
            </div>
          </section>

          <section className="admin-card mb-8 p-6">
            <h2 className="admin-section-title mb-4">Daily Visitors</h2>
            {visitors.daily.length === 0 ? (
              <p className="text-sm text-[var(--admin-muted)]">No visitor data yet</p>
            ) : (
              <div className="flex h-36 items-end gap-1">
                {visitors.daily.map((day) => (
                  <div key={day.date} className="group flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full bg-[var(--brand-red)] transition-all group-hover:opacity-80"
                      style={{
                        height: `${(day.users / maxDailyUsers) * 100}%`,
                        minHeight: day.users > 0 ? "4px" : "0",
                      }}
                      title={`${day.date}: ${day.users} users, ${day.sessions} sessions`}
                    />
                    <span className="hidden text-[9px] text-[var(--admin-muted)] sm:block">
                      {day.date.slice(6)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="mb-8 grid gap-4 lg:grid-cols-2">
            <section className="admin-card p-6">
              <h2 className="admin-section-title mb-4">Top Pages</h2>
              {visitors.topPages.length === 0 ? (
                <p className="text-sm text-[var(--admin-muted)]">No page data yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-[var(--admin-border)]">
                        <th className="pb-2 font-medium text-[var(--admin-muted)]">Page</th>
                        <th className="pb-2 text-right font-medium text-[var(--admin-muted)]">
                          Views
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visitors.topPages.map((page) => (
                        <tr key={page.path} className="border-b border-[var(--admin-border)]">
                          <td className="py-2 pr-4">
                            <p className="font-medium text-[var(--brand-charcoal)]">{page.path}</p>
                            <p className="truncate text-xs text-[var(--admin-muted)]">
                              {page.title}
                            </p>
                          </td>
                          <td className="py-2 text-right text-[var(--brand-charcoal)]">
                            {page.views}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section className="admin-card p-6">
              <h2 className="admin-section-title mb-4">Traffic Sources</h2>
              <BarList
                items={visitors.trafficSources.map((row) => ({
                  label: row.channel,
                  value: row.sessions,
                  source: row.source,
                }))}
                labelKey="label"
                valueKey="value"
                suffix={(item) => (item.source ? `(${item.source})` : "")}
              />
            </section>
          </div>

          <div className="mb-8 grid gap-4 lg:grid-cols-2">
            <section className="admin-card p-6">
              <h2 className="admin-section-title mb-4">Countries</h2>
              <BarList
                items={visitors.countries.map((row) => ({
                  label: row.country,
                  value: row.users,
                }))}
                labelKey="label"
                valueKey="value"
              />
            </section>

            <section className="admin-card p-6">
              <h2 className="admin-section-title mb-4">Cities</h2>
              <BarList
                items={visitors.cities.map((row) => ({
                  label: row.city,
                  value: row.users,
                  country: row.country,
                }))}
                labelKey="label"
                valueKey="value"
                suffix={(item) => (item.country ? `· ${item.country}` : "")}
              />
            </section>
          </div>

          <div className="mb-8 grid gap-4 lg:grid-cols-2">
            <section className="admin-card p-6">
              <h2 className="admin-section-title mb-4">Devices</h2>
              <BarList
                items={visitors.devices.map((row) => ({
                  label: row.device,
                  value: row.users,
                }))}
                labelKey="label"
                valueKey="value"
              />
            </section>

            <section className="admin-card p-6">
              <h2 className="admin-section-title mb-4">Browsers</h2>
              <BarList
                items={visitors.browsers.map((row) => ({
                  label: row.browser,
                  value: row.users,
                }))}
                labelKey="label"
                valueKey="value"
              />
            </section>
          </div>

          {(visitors.demographics.age.length > 0 ||
            visitors.demographics.gender.length > 0) && (
            <div className="mb-8 grid gap-4 lg:grid-cols-2">
              {visitors.demographics.age.length > 0 && (
                <section className="admin-card p-6">
                  <h2 className="admin-section-title mb-4">Age (aggregated)</h2>
                  <BarList
                    items={visitors.demographics.age.map((row) => ({
                      label: row.bracket,
                      value: row.users,
                    }))}
                    labelKey="label"
                    valueKey="value"
                  />
                </section>
              )}
              {visitors.demographics.gender.length > 0 && (
                <section className="admin-card p-6">
                  <h2 className="admin-section-title mb-4">Gender (aggregated)</h2>
                  <BarList
                    items={visitors.demographics.gender.map((row) => ({
                      label: row.gender,
                      value: row.users,
                    }))}
                    labelKey="label"
                    valueKey="value"
                  />
                </section>
              )}
            </div>
          )}
        </>
      )}

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

      <h2 className="mb-3 text-sm font-semibold tracking-widest text-[var(--admin-muted)] uppercase">
        Contact Inquiries
      </h2>

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
        <h2 className="admin-section-title mb-4">Inquiries, Last 30 Days</h2>
        {data.inquiries.byDay.length === 0 ? (
          <p className="text-sm text-[var(--admin-muted)]">No inquiries in the last 30 days</p>
        ) : (
          <div className="flex h-32 items-end gap-1">
            {data.inquiries.byDay.map((day) => (
              <div key={day._id} className="group flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full bg-[var(--brand-red)] transition-all group-hover:opacity-80"
                  style={{
                    height: `${(day.count / maxInquiryCount) * 100}%`,
                    minHeight: day.count > 0 ? "4px" : "0",
                  }}
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
          <Link
            href="/admin/inquiries"
            className="text-sm font-semibold tracking-wide text-[var(--brand-red)] uppercase hover:underline"
          >
            View all inquiries →
          </Link>
        </div>
      </section>
    </>
  );
}
