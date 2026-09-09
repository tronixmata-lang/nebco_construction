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
  // The uploads route was tracing public images + Next SWC binaries into a 386MB function.
  outputFileTracingExcludes: {
    "*": [
      "./uploads/**/*",
      "./backups/**/*",
      "./public/uploads/**/*",
      "./public/images/**/*",
      "./public/icons/**/*",
      "./node_modules/@next/swc-*/**/*",
      "./node_modules/@swc/**/*",
      "./node_modules/@esbuild/**/*",
      "./node_modules/@img/**/*",
      "./node_modules/sharp/**/*",
      "./node_modules/typescript/**/*",
      "./node_modules/lucide-react/**/*",
      "./node_modules/@serwist/**/*",
      "./node_modules/serwist/**/*",
    ],
    "/uploads/[...path]": [
      "./public/**/*",
      "./uploads/**/*",
      "./backups/**/*",
      "./src/**/*",
      "./scripts/**/*",
      "./node_modules/@next/swc-*/**/*",
      "./node_modules/@swc/**/*",
      "./node_modules/@esbuild/**/*",
      "./node_modules/@img/**/*",
      "./node_modules/sharp/**/*",
      "./node_modules/mongoose/**/*",
      "./node_modules/mongodb/**/*",
      "./node_modules/@mongodb-js/**/*",
      "./node_modules/@google-analytics/**/*",
      "./node_modules/google-gax/**/*",
      "./node_modules/google-auth-library/**/*",
      "./node_modules/lucide-react/**/*",
      "./node_modules/@serwist/**/*",
      "./node_modules/serwist/**/*",
      "./node_modules/typescript/**/*",
      "./node_modules/eslint/**/*",
      "./node_modules/eslint-config-next/**/*",
      "./node_modules/nodemailer/**/*",
      "./node_modules/lenis/**/*",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/uploads/**" },
      { pathname: "/icons/**" },
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
