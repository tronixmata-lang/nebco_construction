import { heroContent } from "@/content/homepage";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute top-0 right-0 h-full w-1/3 bg-accent/5" />

      <Container className="relative py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">
            {siteConfig.shortName} Group
          </p>
          <h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-neutral md:text-5xl lg:text-6xl">
            {heroContent.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral/80 md:text-xl">
            {heroContent.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={heroContent.primaryCta.href} size="lg">
              {heroContent.primaryCta.label}
            </Button>
            <Button
              href={heroContent.secondaryCta.href}
              variant="outline"
              size="lg"
              className="border-neutral/30 text-neutral hover:bg-neutral hover:text-secondary"
            >
              {heroContent.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>

      <div className="h-1 bg-primary" />
    </section>
  );
}
