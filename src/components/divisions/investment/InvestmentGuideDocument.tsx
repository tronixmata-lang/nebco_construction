"use client";

import { investmentPage } from "@/content/investment-page";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function InvestmentGuideDocument() {
  const { products, legal, process, hero } = investmentPage;

  return (
    <div className="bg-neutral py-16 md:py-20 print:py-8">
      <Container className="max-w-3xl">
        <p className="font-label text-xs text-accent">Your Company Investment</p>
        <h1 className="mt-3 font-display text-4xl text-secondary">{hero.title}</h1>
        <p className="mt-3 text-text-muted">{hero.description}</p>
        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <Button type="button" onClick={() => window.print()}>
            Download PDF
          </Button>
          <Button href="/divisions/investment#book-consultation" variant="outline">
            Book a free call
          </Button>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl text-secondary">Products</h2>
          <ul className="mt-4 space-y-4">
            {products.map((product) => (
              <li key={product.title}>
                <p className="font-display text-lg text-secondary">{product.title}</p>
                <p className="text-sm text-text-muted">{product.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-secondary">Process</h2>
          <ol className="mt-4 space-y-3">
            {process.map((step, index) => (
              <li key={step.title}>
                <p className="font-display text-lg text-secondary">
                  {String(index + 1).padStart(2, "0")} {step.title}
                </p>
                <p className="text-sm text-text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl text-secondary">Legal & compliance</h2>
          <ul className="mt-4 space-y-4">
            {legal.map((item) => (
              <li key={item.title}>
                <p className="font-display text-lg text-secondary">{item.title}</p>
                <p className="text-sm text-text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 text-sm text-text-muted">
          Indicative only. Contact {siteConfig.email} or book a call. Use Download PDF, then choose Save as PDF in the
          print dialog.
        </p>
      </Container>
    </div>
  );
}
