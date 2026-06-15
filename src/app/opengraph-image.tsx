import { ImageResponse } from "next/og";
import { brandColors, siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = siteConfig.seoTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: brandColors.secondary,
          color: brandColors.neutral,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "40%",
            height: "100%",
            background: `${brandColors.primary}18`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "8px",
            background: brandColors.primary,
          }}
        />
        <p
          style={{
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: brandColors.accent,
            marginBottom: 24,
          }}
        >
          {siteConfig.shortName} Group
        </p>
        <p
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          {siteConfig.seoTitle}
        </p>
        <p
          style={{
            fontSize: 28,
            lineHeight: 1.4,
            maxWidth: 820,
            color: "#ffffffcc",
          }}
        >
          {siteConfig.tagline} · A-Class Licensed · Est. {siteConfig.foundingDate}
        </p>
        <p
          style={{
            marginTop: 36,
            fontSize: 22,
            color: brandColors.accent,
          }}
        >
          {siteConfig.url.replace("https://", "")}
        </p>
      </div>
    ),
    { ...size },
  );
}
