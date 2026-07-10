import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows CI/verification builds to use a separate dir without touching a running dev server
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  compress: true,
  // Strip console.* (except errors/warnings) from production client bundles
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  // Keep mongoose server-only and out of client bundle traces
  serverExternalPackages: ["mongoose"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/uploads/**" },
    ],
  },
  async rewrites() {
    // Serve runtime uploads via the dynamic route, not the build-time public/ snapshot.
    return {
      beforeFiles: [{ source: "/uploads/:path*", destination: "/uploads/:path*" }],
    };
  },
  async headers() {
    return [
      {
        // Static marketing images ship with the build — cache long, revalidate in background
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/(favicon.ico|manifest.webmanifest)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

const withSerwist = withSerwistInit({
  // Service worker source and output (relative to project root)
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  // Don't enable the SW in development to avoid stale-cache headaches
  disable: process.env.NODE_ENV === "development",
});

export default withSerwist(nextConfig);
