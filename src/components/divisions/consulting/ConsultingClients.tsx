import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { consultingPage } from "@/content/consulting-page";

export function ConsultingClients() {
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Who Comes to Your Company Consulting"
          title="The problem they walk in with"
          description="NRNs, first-time builders, stalled sites, developers, and investors. The brief is usually a question, not a drawing set."
          align="center"
          dark
          compact
          showRules={false}
          className="mx-auto"
        />
      </ScrollReveal>
      <StaggerReveal
        className="grid auto-rows-fr items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:[&>*:nth-child(-n+3)]:col-span-2 lg:[&>*:nth-child(n+4)]:col-span-3"
        staggerMs={70}
      >
        {consultingPage.clients.map((client, index) => (
          <article
            key={client.type}
            className="group relative flex h-full flex-col overflow-hidden bg-neutral/[0.04] p-5"
          >
            <span
              className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100"
              aria-hidden="true"
            />
            <p className="font-label text-[10px] text-accent">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 font-display text-xl leading-snug text-neutral">{client.type}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral/70">“{client.problem}”</p>
          </article>
        ))}
      </StaggerReveal>
    </div>
  );
}
