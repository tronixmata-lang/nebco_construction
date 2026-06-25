export type HeroFeatureCard = {
  title: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
};

export type CtaBannerContent = {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type AboutPageIntro = {
  eyebrow: string;
  title: string;
  description: string;
  backgroundAlt: string;
};

export type SectionHeading = {
  eyebrow: string;
  title: string;
  description: string;
};

export type HomepageSections = {
  certificates: Pick<SectionHeading, "eyebrow">;
  divisions: SectionHeading;
  valuePillars: SectionHeading;
  featuredProjects: SectionHeading;
  sectors: SectionHeading;
  testimonials: SectionHeading;
  insights: SectionHeading;
};
