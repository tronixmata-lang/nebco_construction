type HeroBottomChromeProps = {
  showExplore?: boolean;
};

export function HeroExploreHint() {
  return (
    <div
      className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-neutral/40 md:flex"
      aria-hidden="true"
    >
      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
        Explore
      </span>
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

export function HeroPrimaryRule() {
  return <div className="relative h-1 shrink-0 bg-primary" aria-hidden="true" />;
}

export function HeroBottomChrome({ showExplore = true }: HeroBottomChromeProps) {
  return (
    <>
      {showExplore && <HeroExploreHint />}
      <HeroPrimaryRule />
    </>
  );
}
