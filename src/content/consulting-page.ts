export const consultingPage = {
  hero: {
    eyebrow: "NEBCO Consulting",
    title: "The right advice before the first brick. Save time, money, and stress.",
    description: "Expert guidance on construction, land, permits, and investment planning.",
    primaryCta: { label: "Book a consultation", href: "#book-consultation" },
    secondaryCta: { label: "See our services", href: "#services" },
    image: "/images/pexels-mike-van-schoonderwalt-1884800-5505119.jpg",
  },
  serviceGroups: [
    {
      title: "Planning & Feasibility",
      items: [
        "Site feasibility study: is the land buildable?",
        "Soil testing coordination",
        "BOQ (Bill of Quantities) preparation",
        "Construction cost estimation",
        "Project timeline planning",
      ],
    },
    {
      title: "Architectural & Design",
      items: [
        "Architectural drawings and floor plans",
        "3D rendering and visualization",
        "Interior design consultation",
        "Structural design review",
      ],
    },
    {
      title: "Legal & Permits",
      items: [
        "Municipality building permit guidance",
        "Land registration support",
        "NRN legal advisory (Investment Act, PoA)",
        "IRD and tax consultation referral",
      ],
    },
    {
      title: "Project Management Consulting",
      items: [
        "Third-party site supervision",
        "Contractor vetting and shortlisting",
        "Quality audit of ongoing builds",
        "Dispute resolution with contractors",
      ],
    },
    {
      title: "Investment Advisory",
      items: [
        "Portfolio strategy for Nepal real estate",
        "Market research reports",
        "Due diligence on land and property purchase",
        "Rental yield analysis",
      ],
    },
  ],
  clients: [
    {
      type: "NRN abroad",
      problem: "I bought land. What can I build? Is it legal?",
    },
    {
      type: "First-time builder",
      problem: "I don't know where to start or who to trust.",
    },
    {
      type: "Existing project in trouble",
      problem: "My contractor disappeared. What do I do?",
    },
    {
      type: "Developer",
      problem: "I need a feasibility report for my bank loan.",
    },
    {
      type: "Investor",
      problem: "Is this plot worth buying at this price?",
    },
  ],
  process: [
    {
      title: "Initial call (free)",
      description: "A 30-minute conversation to hear the site, the problem, and whether we can help.",
    },
    {
      title: "Scope definition",
      description: "We write what is in, what is out, and what you will hold in your hand at the end.",
    },
    {
      title: "Consulting engagement",
      description: "Site work, drawings, permits, or contractor review, as scoped, not an open retainer.",
    },
    {
      title: "Report / deliverable",
      description: "A feasibility pack, drawings, audit, or written advice you can take to a bank, a builder, or a relative.",
    },
    {
      title: "Follow-up support",
      description: "Questions after you read the report. If you then build with NEBCO, the file does not start from zero.",
    },
  ],
  packages: [
    {
      name: "Basic",
      price: "NPR, quoted on the call",
      description: "Single consultation call plus a written summary of what we heard and what to do next.",
      items: ["Free 30-min intro if you book online", "One consulting session", "Written summary"],
      featured: false,
    },
    {
      name: "Standard",
      price: "NPR, quoted after visit",
      description: "Site visit, feasibility report, and three follow-up calls so the file does not die after one PDF.",
      items: ["Site visit", "Feasibility report", "Three follow-up calls"],
      featured: true,
    },
    {
      name: "Full advisory",
      price: "Custom",
      description: "End-to-end project consulting from planning through handover, including permits and site supervision.",
      items: ["Planning to handover", "Named engineer contact", "Handoff to construction if you proceed"],
      featured: false,
    },
  ],
  reasons: [
    {
      title: "Engineers who have built, not only drawn",
      description: "In-house engineers with real construction experience, so advice survives contact with a site.",
    },
    {
      title: "Municipality, not theory",
      description: "We know Nepal's municipality system inside out: what files move, and what gets returned.",
    },
    {
      title: "Continuity into construction",
      description: "Consulting can lead directly to NEBCO Construction. The same facts, not a new team who has never seen the land.",
    },
    {
      title: "NRN-friendly, including video",
      description: "Remote consulting by video call is available. You do not have to fly in for the first hour of advice.",
    },
  ],
  resources: [
    {
      title: "NRN Guide to Building in Nepal",
      description: "Land, permits, PoA, and how to brief a builder from abroad.",
      href: "/nrn-building-guide",
      label: "Download PDF",
    },
    {
      title: "Nepal Building Permit Checklist",
      description: "The documents municipalities typically ask for before a drawing is approved.",
      href: "/building-permit-checklist",
      label: "Download checklist",
    },
    {
      title: "Top 5 mistakes first-time builders make in Nepal",
      description: "Where first builds lose time and money, and how to avoid them.",
      href: "/insights/top-5-mistakes-first-time-builders-nepal",
      label: "Read the article",
    },
  ],
  bottomCta: {
    title: "Book your free 30-min call",
    description: "Bring the plot, the drawings you have, or the contractor problem. We will tell you if consulting is the next step, and quote if it is.",
    primaryLabel: "Book your free 30-min call",
    secondaryLabel: "Get a consulting quote",
  },
} as const;
