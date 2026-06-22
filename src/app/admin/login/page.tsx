"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import "../admin.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }
      // Full navigation ensures the session cookie is sent on the next request.
      window.location.assign("/admin");
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-wrap">
      {/* Brand panel */}
      <div className="admin-login-brand">
        <div className="admin-login-brand-inner">
          <div className="admin-login-brand-logo">
            <Image
              src={siteConfig.logo}
              alt="NEBCO"
              fill
              className="object-contain p-2"
              sizes="88px"
              priority
            />
          </div>
          <p className="admin-login-brand-sub">{siteConfig.legalName}</p>
          <h1 className="admin-login-brand-title mt-3">Admin Console</h1>
          <div className="admin-ornament admin-ornament-light mx-auto mt-6 max-w-[180px]">
            <span className="admin-ornament-diamond" />
          </div>
          <p className="admin-login-brand-desc">
            Manage projects, insights, and site content for Nepal&apos;s trusted A-Class construction company.
          </p>
          <p className="admin-login-brand-values">
            Est. {siteConfig.foundingDate} · {siteConfig.tagline}
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="admin-login-form-side">
        <div className="admin-login-form-inner">
          <h2 className="admin-login-form-title">Welcome Back</h2>
          <p className="admin-login-form-sub">Sign in to your admin account</p>

          <div className="admin-ornament my-6">
            <span className="admin-ornament-diamond" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="admin-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                placeholder="admin@nebco.com.np"
              />
            </div>
            <div>
              <label htmlFor="password" className="admin-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-[var(--brand-red)]">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="admin-btn-primary w-full">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-10 text-center text-[10px] tracking-[0.15em] text-[var(--brand-text-muted)] uppercase">
            Shah Group · Kathmandu, Nepal
          </p>
        </div>
      </div>
    </div>
  );
}
