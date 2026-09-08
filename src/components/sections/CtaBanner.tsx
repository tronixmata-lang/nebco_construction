import { getSiteContent } from "@/lib/data/content";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export async function CtaBanner({
  showContactButton = true,
  className,
}: {
  showContactButton?: boolean;
  className?: string;
}) {
  const { ctaBanner } = await getSiteContent();

  return (
    <section className={cn("relative overflow-hidden bg-primary py-10 md:py-12", className)}>
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
        <ScrollReveal className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="max-w-xl text-left">
            <h2 className="font-display text-3xl text-neutral md:text-4xl">{ctaBanner.title}</h2>
            <p className="mt-3 text-base text-neutral/80 md:text-lg">{ctaBanner.description}</p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            {showContactButton && (
              <Button
                href={ctaBanner.primaryCta.href}
                variant="secondary"
                size="lg"
                className="bg-neutral text-secondary hover:bg-neutral/90"
              >
                {ctaBanner.primaryCta.label}
              </Button>
            )}
            <Button
              href={ctaBanner.secondaryCta.href}
              variant="outline"
              size="lg"
              className="border-neutral text-neutral hover:bg-neutral hover:text-primary"
            >
              {ctaBanner.secondaryCta.label}
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
