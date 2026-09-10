import Link from "next/link";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { constructionPage } from "@/content/construction-page";

export function ConstructionWhy() {
  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow="Why NEBCO Construction"
          title="What you can hold us to"
          description="These are site practices, not marketing lines. Ask for the engineer, the certificate, and the portal access."
          align="center"
          dark
          compact
          className="mx-auto"
        />
      </ScrollReveal>

      <StaggerReveal className="grid auto-rows-fr items-stretch gap-3 sm:grid-cols-2" staggerMs={80}>
        {constructionPage.reasons.map((reason, index) => (
          <article
            key={reason.title}
            className="group relative flex h-full flex-col overflow-hidden bg-neutral/[0.04] p-4 pl-5 sm:p-5 sm:pl-6"
          >
            <span
              className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-500 group-hover:scale-y-100"
              aria-hidden="true"
            />
            <span className="pointer-events-none absolute top-4 right-4">
              <BrandIcon
                title={reason.title}
                fallbackIndex={index}
                className="division-mark"
                surface="dark"
                alt=""
              />
            </span>
            <h3 className="max-w-[calc(100%-3.5rem)] font-display text-xl leading-snug text-neutral">
              {reason.title}
            </h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-neutral/70">{reason.description}</p>
            {"href" in reason && reason.href ? (
              <Link
                href={reason.href}
                className="font-label mt-auto pt-3 inline-flex items-center gap-2 text-xs text-accent transition-colors hover:text-neutral"
              >
                {reason.hrefLabel}
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </article>
        ))}
      </StaggerReveal>
    </div>
  );
}
