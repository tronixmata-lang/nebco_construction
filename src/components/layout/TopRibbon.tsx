import Link from "next/link";
import { topRibbonLinks } from "@/config/navigation";
import { Container } from "@/components/ui/Container";

export function TopRibbon() {
  return (
    <div className="relative z-50 bg-primary">
      <Container>
        <nav
          className="flex h-8 items-center justify-end gap-3 overflow-x-auto sm:gap-5 md:h-9 md:gap-7"
          aria-label="Business verticals"
        >
          {topRibbonLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 font-nav text-[9px] font-semibold uppercase tracking-[0.1em] whitespace-nowrap text-neutral transition-colors hover:text-accent sm:text-[10px] md:text-[11px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  );
}
