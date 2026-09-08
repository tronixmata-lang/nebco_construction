import Link from "next/link";
import { getSectors, getSiteContent } from "@/lib/data/content";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TrustedBadge } from "@/components/ui/TrustedBadge";
import { SectorIcon } from "@/components/sectors/sector-icons";

type IndustrySectorsProps = {
  showHeader?: boolean;
  className?: string;
};

function TrustedBadgeProven() {
  return <TrustedBadge label="Proven" className="absolute top-3 right-4 z-10" />;
}

export async function IndustrySectors({ showHeader = true, className }: IndustrySectorsProps) {
  const [industrySectors, { homepageSections }] = await Promise.all([
    getSectors(),
    getSiteContent(),
  ]);

  return (
    <Section id="sectors" className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />

      {showHeader && (
        <SectionHeader
          eyebrow={homepageSections.sectors.eyebrow}
          title={homepageSections.sectors.title}
          description={homepageSections.sectors.description}
          align="center"
          className="mx-auto"
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {industrySectors.map((sector) => (
            <article
            key={sector.id}
            className="group relative flex flex-col overflow-hidden rounded-sm border border-accent/45 bg-neutral transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
          >
            <Link href={`/sectors/${sector.id}`} className="relative flex flex-1 flex-col px-6 pt-3 pb-6 text-left sm:px-8 sm:pb-8">
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              <TrustedBadgeProven />
              <SectorIcon
                id={sector.id}
                className="sector-card-icon -mt-1 mb-0 h-[4.75rem] w-[4.75rem] self-start"
              />

              <h3 className="-mt-2 font-display text-lg text-secondary transition-colors group-hover:text-primary">
                {sector.title}
              </h3>
              <span className="mt-3 h-0.5 w-8 rounded-full bg-accent transition-all duration-300 group-hover:w-14" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">
                {sector.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 font-label text-xs text-primary">
                Explore sector
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>

            <p className="flex items-center justify-center gap-2 border-t border-neutral-border px-6 py-4 font-label text-xs text-primary md:justify-start">
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
          </article>
        ))}
      </div>
    </Section>
  );
}
