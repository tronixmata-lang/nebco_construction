import type { SectorCapability } from "@/types";
import { BrandIcon } from "@/components/ui/BrandIcon";

type SectorCapabilityGridProps = {
  capabilities: SectorCapability[];
  sectorTitle: string;
};

export function SectorCapabilityGrid({ capabilities, sectorTitle }: SectorCapabilityGridProps) {
  if (capabilities.length === 0) return null;

  return (
    <div>
      <p className="mb-2 font-label text-xs text-accent">
        Core Capabilities
      </p>
      <h2 className="font-display text-2xl text-secondary sm:text-3xl">
        What NEBCO Delivers in {sectorTitle}
      </h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {capabilities.map((capability, index) => (
          <article
            key={capability.title}
            className="group relative overflow-hidden rounded-sm border border-neutral-border/80 bg-neutral p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg"
          >
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            <span className="font-label text-xs text-primary/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <BrandIcon
              title={capability.title}
              fallbackIndex={index}
              className="sector-card-icon mt-3 h-[4.75rem] w-[4.75rem]"
              alt=""
            />
            <h3 className="mt-3 font-display text-lg text-secondary">{capability.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{capability.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
