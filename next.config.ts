import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
