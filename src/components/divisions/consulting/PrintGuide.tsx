"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

type PrintGuideProps = {
  eyebrow: string;
  title: string;
  intro: string;
  bookHref: string;
  sections: Array<{ title: string; items: readonly string[] }>;
};

export function PrintGuide({ eyebrow, title, intro, bookHref, sections }: PrintGuideProps) {
  return (
    <div className="bg-neutral py-16 md:py-20 print:py-8">
      <Container className="max-w-3xl">
        <p className="font-label text-xs text-accent">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl text-secondary">{title}</h1>
        <p className="mt-3 text-text-muted">{intro}</p>
        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <Button type="button" onClick={() => window.print()}>
            Download PDF
          </Button>
          <Button href={bookHref} variant="outline">
            Book a consultation
          </Button>
        </div>
        {sections.map((section) => (
          <section key={section.title} className="mt-10">
            <h2 className="font-display text-2xl text-secondary">{section.title}</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-muted">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
        <p className="mt-12 text-sm text-text-muted">
          Indicative only. Contact {siteConfig.email}. Use Download PDF, then choose Save as PDF in the print dialog.
        </p>
      </Container>
    </div>
  );
}
