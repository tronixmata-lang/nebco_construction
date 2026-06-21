import { getSiteContent } from "@/lib/data/content";
import { ChairmanMessageSection } from "@/components/sections/ChairmanMessageSection";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export async function LeadershipMessage() {
  const { chairmanMessage } = await getSiteContent();

  return (
    <Section variant="default" id="leadership">
      <ChairmanMessageSection message={chairmanMessage} variant="light" eyebrow="Leadership Message">
        <Button href="/leadership" variant="outline">
          Meet Our Leadership
        </Button>
      </ChairmanMessageSection>
    </Section>
  );
}
