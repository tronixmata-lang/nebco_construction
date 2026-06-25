import { getSiteContent } from "@/lib/data/content";
import { HeroScrollStaticView } from "@/components/sections/HeroScrollStaticView";
import { HeroTrustedStrip } from "@/components/sections/HeroTrustedStrip";

export async function HeroSection() {
  const { hero, heroFeatureCards, siteConfig } = await getSiteContent();

  const phoneHref = siteConfig.phone
    ? `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`
    : "/contact";

  return (
    <HeroScrollStaticView
      headline={hero.headline}
      subheadline={hero.subheadline}
      backgroundImage={hero.backgroundImage}
      primaryCta={hero.primaryCta}
      secondaryCta={hero.secondaryCta}
      phoneHref={phoneHref}
      parentOrganization={siteConfig.parentOrganization}
      shortName={siteConfig.shortName}
      featureCards={heroFeatureCards}
    >
      <HeroTrustedStrip />
    </HeroScrollStaticView>
  );
}
