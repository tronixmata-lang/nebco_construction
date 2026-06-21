import { siteConfig } from "@/config/site";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CtaBanner({ showContactButton = true }: { showContactButton?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <Container>
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl text-neutral md:text-4xl">
            Ready to Build Something Great?
          </h2>
          <p className="mt-4 text-lg text-neutral/80">
            Partner with {siteConfig.shortName} for integrated construction,
            investment, and consulting solutions.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            {showContactButton && (
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="bg-neutral text-secondary hover:bg-neutral/90"
              >
                Get in Touch
              </Button>
            )}
            <Button
              href="/portfolio"
              variant="outline"
              size="lg"
              className="border-neutral text-neutral hover:bg-neutral hover:text-primary"
            >
              View Our Work
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
