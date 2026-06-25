export const adminNav = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: "layout-dashboard" }],
  },
  {
    label: "Content",
    items: [
      { label: "Projects", href: "/admin/projects", icon: "building-2" },
      { label: "Insights", href: "/admin/insights", icon: "newspaper" },
      { label: "Verticals", href: "/admin/divisions", icon: "layers" },
      { label: "Sectors", href: "/admin/sectors", icon: "factory" },
      { label: "Value Pillars", href: "/admin/pillars", icon: "gem" },
      { label: "Leadership", href: "/admin/leaders", icon: "users" },
      { label: "Testimonials", href: "/admin/testimonials", icon: "message-square-quote" },
      { label: "Certificates", href: "/admin/certificates", icon: "award" },
      { label: "Stats", href: "/admin/stats", icon: "bar-chart-3" },
      { label: "Media Library", href: "/admin/media", icon: "images" },
    ],
  },
  {
    label: "Site",
    items: [
      { label: "Site Settings", href: "/admin/settings", icon: "settings" },
      { label: "SEO & Analytics", href: "/admin/seo", icon: "search" },
      { label: "Analytics", href: "/admin/analytics", icon: "line-chart" },
      { label: "Contact Inquiries", href: "/admin/inquiries", icon: "inbox" },
      { label: "Admin Users", href: "/admin/users", icon: "user-cog" },
    ],
  },
] as const;

export type AdminNavItem = (typeof adminNav)[number]["items"][number];
