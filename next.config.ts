import path from "node:path";
import os from "node:os";
import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keep webpack cache outside OneDrive to avoid ENOENT/corrupt chunk errors.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = {
        type: "filesystem",
        cacheDirectory: path.join(os.tmpdir(), "nebco-next-webpack-cache"),
      };
    }
    return config;
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
