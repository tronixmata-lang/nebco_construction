import { BusinessDivisions } from "@/components/sections/BusinessDivisions";
import { CertificateSection } from "@/components/sections/CertificateSection";
import { CompanyOverview } from "@/components/sections/CompanyOverview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { HeroSection } from "@/components/sections/HeroSection";
import { IndustrySectors } from "@/components/sections/IndustrySectors";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { LeadershipMessage } from "@/components/sections/LeadershipMessage";
import { StatsBar } from "@/components/sections/StatsBar";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ValuePillars } from "@/components/sections/ValuePillars";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <CompanyOverview />
      <CertificateSection />
      <BusinessDivisions />
      <ValuePillars />
      <FeaturedProjects />
      <IndustrySectors />
      <LeadershipMessage />
      <TestimonialsSection />
      <InsightsPreview />
    </>
  );
}
