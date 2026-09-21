export const investmentPage = {
  hero: {
    eyebrow: "Your Company Investment",
    title: "Your money works harder in Nepal — with Your Company backing every rupee.",
    description: "Rental yields, appreciation rates, legal compliance",
    primaryCta: { label: "Explore investment options", href: "#products" },
    secondaryCta: { label: "Talk to an advisor", href: "#book-consultation" },
    image: "/images/site/hotel-buddy-thamel-5.png",
  },
  products: [
    {
      title: "Residential apartments",
      description: "Pre-built or off-plan units in high-demand areas — buy, rent, earn.",
    },
    {
      title: "Commercial plots",
      description: "Vetted land in Pokhara, Butwal, and Kathmandu for development.",
    },
    {
      title: "Joint ventures",
      description: "Co-invest with Your Company on larger projects and share returns.",
    },
    {
      title: "Off-plan properties",
      description: "Buy at foundation price, then sell or rent at completion.",
    },
    {
      title: "Land banking",
      description: "Buy verified land now, develop or sell later as value grows.",
    },
    {
      title: "Rental-ready packages",
      description: "Build, furnish, and find a tenant — fully passive income.",
    },
  ],
  reasons: [
    {
      title: "GDP growth still has room to run",
      description:
        "Nepal's economy has been expanding in the mid-single digits. That growth shows up in housing demand, commercial space, and infrastructure corridors Your Company already builds.",
      stat: "~4%",
      statLabel: "recent GDP growth range",
    },
    {
      title: "Kathmandu valley appreciation",
      description:
        "Prime valley corridors are often discussed in the 8–12% a year range in market commentary. We underwrite each asset on its own title, location, and rent — not a headline percentage.",
      stat: "8–12%",
      statLabel: "cited yearly range, prime corridors",
    },
    {
      title: "Turn remittance into titled assets",
      description:
        "Remittances are one of Nepal's largest capital inflows. Converting a portion into titled property, with Your Company execution, keeps value in an asset you can visit, rent, or sell.",
      stat: "NRN",
      statLabel: "built for money sent from abroad",
    },
    {
      title: "Reconstruction still needs capacity",
      description:
        "Post-earthquake rebuilding, safer codes, and replacement stock continue to pull licensed contractors. Demand is structural, not a one-season spike.",
      stat: "NBC",
      statLabel: "safer stock, licensed delivery",
    },
    {
      title: "Tourism is lifting Pokhara and Chitwan",
      description:
        "Visitor growth supports hotels, apartments, and plots in Pokhara and Chitwan. We only take sites we can title, build, and manage — not brochure towns.",
      stat: "2 cities",
      statLabel: "hospitality-led demand",
    },
    {
      title: "The builder sits in the same group",
      description:
        "You are not buying a brochure from a broker and a separate contractor. Your Company Investment is backed by A-Class construction, so the yield model and the site are one organisation.",
      stat: "A-Class",
      statLabel: "licensed delivery behind the rupee",
    },
  ],
  process: [
    {
      title: "Choose product",
      description: "Apartments, plots, joint ventures, off-plan, land, or a rental-ready package.",
    },
    {
      title: "Legal due diligence",
      description: "Title, encumbrances, NRN rules, and approvals before any money moves.",
    },
    {
      title: "Sign agreement",
      description: "Scope, price, timeline, and repatriation path in writing.",
    },
    {
      title: "Construction / acquisition",
      description: "Your Company builds or completes the purchase with milestone reporting.",
    },
    {
      title: "Rental management",
      description: "If you want income, we furnish, let, and report through the portal.",
    },
    {
      title: "Returns",
      description: "Rent, appreciation, or exit — documented, not promised in a slide.",
    },
  ],
  calculator: {
    disclaimer:
      "This is an illustrative model for a first conversation, not a forecast or guarantee. Yields and five-year values change with title, rent, vacancy, and the market. Confirm figures with an advisor before you commit.",
    usdToNpr: 133,
    locations: [
      { id: "kathmandu", label: "Kathmandu", yieldFactor: 1, appreciation: 0.08 },
      { id: "pokhara", label: "Pokhara", yieldFactor: 1.05, appreciation: 0.07 },
      { id: "butwal", label: "Butwal", yieldFactor: 0.92, appreciation: 0.06 },
      { id: "chitwan", label: "Chitwan", yieldFactor: 1, appreciation: 0.07 },
    ],
    propertyTypes: [
      { id: "apartments", label: "Residential apartments", baseYield: 0.055, appreciationBoost: 0 },
      { id: "plots", label: "Commercial plots", baseYield: 0.03, appreciationBoost: 0.01 },
      { id: "jv", label: "Joint ventures", baseYield: 0.07, appreciationBoost: 0.005 },
      { id: "offplan", label: "Off-plan properties", baseYield: 0.05, appreciationBoost: 0.015 },
      { id: "land", label: "Land banking", baseYield: 0.015, appreciationBoost: 0.02 },
      { id: "rental", label: "Rental-ready packages", baseYield: 0.065, appreciationBoost: 0 },
    ],
  },
  legal: [
    {
      title: "NRN rules & NRB approval",
      description:
        "We map what you can hold under Nepal's NRN framework, then sequence Nepal Rastra Bank approval where inward investment requires it — before funds leave your account.",
    },
    {
      title: "Repatriation rights",
      description:
        "Sale proceeds and eligible income can be taken out through banking channels when the investment was recorded correctly. We plan for that on day one.",
    },
    {
      title: "Power of Attorney support",
      description:
        "If you cannot be in Nepal to sign, we coordinate a PoA from your country of residence through to registration here.",
    },
    {
      title: "Tax obligations",
      description:
        "Rental tax, capital gains, and treaty notes for common NRN countries are walked through before you commit — not after the first tenant pays.",
    },
  ],
  portal: {
    eyebrow: "Track Your Investment",
    title: "See status, financials, and documents from anywhere",
    description:
      "The NRN client portal shows real-time project status, drawdowns, and files so you are not waiting on a WhatsApp photo.",
    href: "/nrn",
    hrefLabel: "Open the NRN portal",
  },
  partners: {
    banks: ["Nabil Bank", "NMB Bank", "Sanima Bank"],
    payments: ["eSewa", "Khalti", "Wise"],
    legal: ["Title verification", "Power of Attorney desk", "Repatriation counsel"],
  },
  bottomCta: {
    title: "Book a free investment call",
    description:
      "Bring a budget, a city, and the product you are considering. We will talk yield, paperwork, and what Your Company can actually deliver.",
    primaryLabel: "Book a free investment call",
    secondaryLabel: "Download our investment guide PDF",
    guideHref: "/investment-guide",
  },
} as const;
