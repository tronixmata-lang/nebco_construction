import { getSiteContent, getStats } from "@/lib/data/content";
import { getProjects } from "@/lib/data/projects";
import { AnimatedStatValue } from "@/components/ui/AnimatedStatValue";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { PortfolioImageCarousel } from "@/components/sections/PortfolioImageCarousel";

const trustPoints = [
  "A-Class construction license recognized across Nepal",
  "Part of the esteemed Shah Group",
  "Trusted by 500+ clients and NRNs worldwide",
  "On-time, on-budget delivery, every project",
];

export async function CompanyOverview() {
  const [{ companyOverview }, companyStats, projects] = await Promise.all([
    getSiteContent(),
    getStats(),
    getProjects(),
  ]);
  const proofStats = companyStats.filter((stat) =>
    ["years", "clients", "completed"].includes(stat.id),
  );

  return (
    <Section id="about">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center md:text-left">
          <p className="mb-3 text-sm font-semibold tracking-widest text-accent uppercase">
            About NEBCO
          </p>
          <h2 className="font-display text-2xl font-bold tracking-tight text-secondary sm:text-3xl md:text-4xl">
            {companyOverview.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted md:mx-0 md:text-lg">
            {companyOverview.description}
          </p>

          <ul className="mx-auto mt-8 max-w-md space-y-4 text-left md:mx-0 md:max-w-none">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-base font-medium text-secondary">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
            <Button href="/about">Learn More About Us</Button>
            <Button href="/contact" variant="outline">Contact Us</Button>
          </div>
        </div>

        <div className="relative">
          <PortfolioImageCarousel projects={projects} />
          <div className="absolute -top-5 -right-5 -z-10 hidden h-28 w-28 border-r-4 border-t-4 border-accent lg:block" />
          <div className="absolute -bottom-5 -left-5 -z-10 hidden h-28 w-28 border-b-4 border-l-4 border-primary lg:block" />
          <div className="mt-6 grid grid-cols-3 divide-x divide-neutral-border rounded-sm border border-neutral-border bg-neutral-muted">
            {proofStats.map((stat) => (
              <div key={stat.id} className="px-4 py-5 text-center">
                <p className="font-display text-2xl font-bold text-primary">
                  <AnimatedStatValue value={stat.value} />
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide text-text-muted uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
