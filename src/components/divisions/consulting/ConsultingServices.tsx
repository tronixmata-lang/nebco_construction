import { BrandIcon } from "@/components/ui/BrandIcon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { consultingPage } from "@/content/consulting-page";

type Capability = { title: string; description: string };

type ConsultingServicesProps = {
  capabilities?: Capability[];
};

function groupsFromCapabilities(capabilities: Capability[]) {
  return capabilities.map((capability) => ({
    title: capability.title,
    items: capability.description
      .split(/\n+/)
      .map((line) => line.replace(/^[-•*]\s*/, "").trim())
      .filter(Boolean),
  }));
}

export function ConsultingServices({ capabilities }: ConsultingServicesProps) {
  const groups =
    capabilities?.length ? groupsFromCapabilities(capabilities) : consultingPage.serviceGroups;
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Consulting Services"
          title="Advice you can take to a site, a bank, or a municipality"
          description="Planning, design, permits, project management, and investment advisory, scoped before you spend on the wrong drawing."
          align="center"
          compact
          showRules={false}
          className="mx-auto"
        />
      </ScrollReveal>
      <StaggerReveal
        className="grid auto-rows-fr items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:[&>*:nth-child(-n+3)]:col-span-2 lg:[&>*:nth-child(n+4)]:col-span-3"
        staggerMs={70}
      >
        {groups.map((group, index) => (
          <article
            key={group.title}
            className="relative flex h-full flex-col overflow-hidden border border-neutral-border bg-neutral p-5"
          >
            <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" aria-hidden="true" />
            <div className="flex items-start justify-between gap-3">
              <span className="font-label text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</span>
              <BrandIcon title={group.title} fallbackIndex={index} className="division-mark" alt="" />
            </div>
            <h3 className="mt-3 font-display text-xl leading-snug text-secondary">{group.title}</h3>
            <ul className="mt-3 flex-1 space-y-2 text-sm leading-relaxed text-text-muted">
              {group.items.map((item) => (
                <li key={item} className="border-t border-neutral-border/80 pt-2 first:border-t-0 first:pt-0">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </StaggerReveal>
    </div>
  );
}
