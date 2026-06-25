import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
