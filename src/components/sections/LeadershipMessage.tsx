import { getSiteContent } from "@/lib/data/content";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export async function LeadershipMessage() {
  const { chairmanMessage } = await getSiteContent();

  return (
    <Section variant="dark" id="leadership">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">
          Leadership Message
        </p>
        <blockquote className="font-display text-2xl leading-relaxed font-medium text-neutral md:text-3xl">
          &ldquo;{chairmanMessage.quote}&rdquo;
        </blockquote>
        <p className="mt-8 font-semibold text-neutral">{chairmanMessage.author}</p>
        <p className="text-sm text-neutral/60">{chairmanMessage.role}</p>
        <div className="mt-8">
          <Button href="/leadership" variant="outline" className="border-neutral/30 text-neutral hover:bg-neutral hover:text-secondary">
            Meet Our Leadership
          </Button>
        </div>
      </div>
    </Section>
  );
}
