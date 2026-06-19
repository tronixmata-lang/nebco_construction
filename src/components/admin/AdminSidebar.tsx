"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  BarChart3,
  Building2,
  ExternalLink,
  Factory,
  Gem,
  Images,
  Inbox,
  Layers,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  MessageSquareQuote,
  Newspaper,
  Search,
  Settings,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { adminNav } from "@/config/admin-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  "building-2": Building2,
  newspaper: Newspaper,
  layers: Layers,
  factory: Factory,
  gem: Gem,
  images: Images,
  users: Users,
  "message-square-quote": MessageSquareQuote,
  award: Award,
  "bar-chart-3": BarChart3,
  search: Search,
  "line-chart": LineChart,
  settings: Settings,
  inbox: Inbox,
  "user-cog": UserCog,
} as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUserRole(d.user?.role ?? null))
      .catch(() => setUserRole(null));
  }, []);

  const navGroups = adminNav
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) => item.href !== "/admin/users" || userRole === "superadmin",
      ),
    }))
    .filter((group) => group.items.length > 0);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const sidebar = (
    <aside className="admin-sidebar flex h-full w-[18rem] flex-col">
      <div className="admin-sidebar-brand">
        <Link href="/admin" className="block">
          <div className="flex items-center gap-3.5">
            <div className="admin-sidebar-logo shrink-0">
              <Image
                src={siteConfig.logo}
                alt="NEBCO"
                fill
                className="object-contain p-1.5"
                sizes="56px"
              />
            </div>
            <div>
              <p className="admin-sidebar-title">NEBCO</p>
              <p className="admin-sidebar-tagline mt-0.5">Admin Console</p>
            </div>
          </div>
          <div className="admin-ornament admin-ornament-light mt-5">
            <span className="admin-ornament-diamond" />
          </div>
          <p className="mt-3 text-[10px] tracking-[0.15em] text-white/35 uppercase">
            Est. {siteConfig.foundingDate} · {siteConfig.tagline}
          </p>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-8">
            <p className="admin-nav-group-label">{group.label}</p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon];
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn("admin-nav-link", active && "admin-nav-link-active")}
                    >
                      <Icon className="admin-nav-icon" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <Link
          href="/"
          target="_blank"
          className="admin-btn-secondary mb-2.5 w-full text-[10px]"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 py-2 text-[10px] font-semibold tracking-[0.15em] text-white/40 uppercase transition-colors hover:text-[var(--brand-gold)]"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="admin-mobile-trigger fixed top-4 left-4 z-50 p-2.5 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block">{sidebar}</div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 z-10 p-1 text-white/70"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </div>
        </div>
      )}
    </>
  );
}
