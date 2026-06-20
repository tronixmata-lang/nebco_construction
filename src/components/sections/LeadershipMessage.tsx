import { getSiteContent } from "@/lib/data/content";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export async function LeadershipMessage() {
  const { chairmanMessage } = await getSiteContent();

  return (
    <Section variant="default" id="leadership">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">
          Leadership Message
        </p>
        <blockquote className="font-script text-2xl leading-relaxed text-accent md:text-4xl md:leading-snug">
          &ldquo;{chairmanMessage.quote}&rdquo;
        </blockquote>
        <p className="mt-8 font-display font-semibold text-secondary">{chairmanMessage.author}</p>
        <p className="text-sm text-text-muted">{chairmanMessage.role}</p>
        <div className="mt-8">
          <Button href="/leadership" variant="outline">
            Meet Our Leadership
          </Button>
        </div>
      </div>
    </Section>
  );
}
