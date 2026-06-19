import { getSectors } from "@/lib/data/content";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TrustedBadge } from "@/components/ui/TrustedBadge";

type IndustrySectorsProps = {
  showHeader?: boolean;
  className?: string;
};

const iconBaseProps = {
  className: "h-7 w-7",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const sectorIcons: Record<string, React.ReactNode> = {
  residential: (
    <svg {...iconBaseProps}>
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9h.01M9 12h.01M9 15h.01" />
    </svg>
  ),
  commercial: (
    <svg {...iconBaseProps}>
      <path d="M3 21h18" />
      <path d="M6 21V5l6-3 6 3v16" />
      <path d="M10 9h4M10 13h4M10 17h4" />
    </svg>
  ),
  infrastructure: (
    <svg {...iconBaseProps}>
      <path d="M2 20h20" />
      <path d="M5 20V10l7-5 7 5v10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  design: (
    <svg {...iconBaseProps}>
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
    </svg>
  ),
  "real-estate": (
    <svg {...iconBaseProps}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  consulting: (
    <svg {...iconBaseProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

function TrustedBadgeProven() {
  return <TrustedBadge label="Proven" />;
}

export async function IndustrySectors({ showHeader = true, className }: IndustrySectorsProps) {
  const industrySectors = await getSectors();

  return (
    <Section id="sectors" className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />

      {showHeader && (
        <SectionHeader
          eyebrow="Industries We Serve"
          title="Sector Expertise"
          description="NEBCO serves a broad range of sectors with A-Class credentials, decades of experience, and a track record clients can verify."
          align="center"
          className="mx-auto"
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {industrySectors.map((sector, index) => (
          <div
            key={sector.id}
            className="group relative flex flex-col overflow-hidden rounded-sm border border-neutral-border bg-neutral p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl sm:p-8 md:text-left"
          >
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

            <div className="relative flex min-h-10 items-center justify-center md:justify-between">
              <span className="font-display text-3xl tabular-nums text-neutral-muted transition-colors duration-300 group-hover:text-primary/15">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="absolute top-0 right-0 md:static">
                <TrustedBadgeProven />
              </span>
            </div>

            <div className="mx-auto mt-5 flex h-14 w-14 items-center justify-center text-primary md:mx-0">
              {sectorIcons[sector.id]}
            </div>

            <h3 className="mt-5 font-display text-lg text-secondary">
              {sector.title}
            </h3>
            <span className="mx-auto mt-3 h-0.5 w-8 rounded-full bg-accent transition-all duration-300 group-hover:w-14 md:mx-0" />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">
              {sector.description}
            </p>

            <p className="mt-5 flex items-center justify-center gap-2 border-t border-neutral-border pt-4 text-xs font-semibold tracking-wide text-primary uppercase md:justify-start">
              <svg
                className="h-4 w-4 shrink-0 text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {sector.highlight}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
