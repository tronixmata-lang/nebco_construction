import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { consultingPage } from "@/content/consulting-page";

export function ConsultingWhy() {
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Why NEBCO Consulting"
          title="Not a generic architect with a visiting card"
          description="Construction experience, municipality literacy, a path into build, and video calls for NRNs."
          align="center"
          dark
          compact
          showRules={false}
          className="mx-auto"
        />
      </ScrollReveal>
      <StaggerReveal className="grid auto-rows-fr items-stretch gap-3 sm:grid-cols-2" staggerMs={80}>
        {consultingPage.reasons.map((reason, index) => (
          <article key={reason.title} className="group relative flex h-full flex-col overflow-hidden bg-neutral/[0.04] p-5">
            <span
              className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100"
              aria-hidden="true"
            />
            <p className="font-label text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 font-display text-xl leading-snug text-neutral">{reason.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral/70">{reason.description}</p>
          </article>
        ))}
      </StaggerReveal>
    </div>
  );
}
