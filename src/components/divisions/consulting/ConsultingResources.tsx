import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { consultingPage } from "@/content/consulting-page";

export function ConsultingResources() {
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Resources"
          title="Read before you book, if you want"
          description="Two printable guides and one article on the mistakes that stall first builds in Nepal."
          align="center"
          compact
          showRules={false}
          className="mx-auto"
        />
      </ScrollReveal>
      <StaggerReveal className="grid auto-rows-fr items-stretch gap-3 lg:grid-cols-3" staggerMs={70}>
        {consultingPage.resources.map((resource, index) => (
          <article key={resource.title} className="flex h-full flex-col border border-neutral-border bg-neutral p-5">
            <p className="font-label text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 font-display text-xl leading-snug text-secondary">{resource.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{resource.description}</p>
            <Button href={resource.href} variant="outline" className="mt-5">
              {resource.label}
            </Button>
          </article>
        ))}
      </StaggerReveal>
    </div>
  );
}
