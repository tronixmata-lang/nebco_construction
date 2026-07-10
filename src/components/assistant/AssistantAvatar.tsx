"use client";

import { cn } from "@/lib/utils";

type AssistantAvatarProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

const iconSizes = {
  sm: "h-[18px] w-[18px]",
  md: "h-[22px] w-[22px]",
  lg: "h-7 w-7",
};

/** NEBCO assistant avatar: hard-hat guide with brand colors */
export function AssistantAvatar({ size = "md", className }: AssistantAvatarProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary ring-2 ring-accent/50",
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      <svg
        className={iconSizes[size]}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 18c0-4.4 3.6-8 8-8h4c4.4 0 8 3.6 8 8v1H6v-1Z"
          fill="#C9A227"
        />
        <path
          d="M10 10c0-2.8 2.7-5 6-5s6 2.2 6 5"
          stroke="#C9A227"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="16" cy="17" r="5.5" fill="#FFFFFF" />
        <circle cx="14" cy="16.5" r="0.9" fill="#222222" />
        <circle cx="18" cy="16.5" r="0.9" fill="#222222" />
        <path
          d="M14.2 19.2c.8.8 2 .8 2.8 0"
          stroke="#A51E22"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M22 22.5c1.2 1 2.5 1.5 4 1.8"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M22 22.5 20 20.5"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-secondary bg-emerald-500" />
    </span>
  );
}

export function AssistantLauncherIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="28" height="28" rx="14" fill="currentColor" fillOpacity="0.12" />
      <path
        d="M8 19c0-3.5 2.9-6.5 6.5-6.5h3c3.6 0 6.5 3 6.5 6.5v.5H8V19Z"
        fill="#C9A227"
      />
      <path
        d="M11 12.5c0-2.2 2.1-4 4.5-4s4.5 1.8 4.5 4"
        stroke="#C9A227"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="16" cy="18" r="4.5" fill="#FFFFFF" />
      <circle cx="14.5" cy="17.5" r="0.75" fill="#222222" />
      <circle cx="17.5" cy="17.5" r="0.75" fill="#222222" />
      <path
        d="M14.5 20c.7.6 1.8.6 2.5 0"
        stroke="#A51E22"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M21.5 22.5c1 0.8 2.1 1.2 3.5 1.5"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M21.5 22.5 20 21" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
