export type NrnFeature = {
  tag: string;
  title: string;
  description: string;
  image?: string;
};

export type NrnFeatureCategory = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: NrnFeature[];
};

export const nrnExperts = [
  {
    name: "Prabhu Rana",
    experience: "18 years · NRN ownership & land",
    image: "/images/site/Mr.-Prabhu-Rana-1.png",
    description:
      "Guides NRNs through what they can legally own in Nepal, the papers required from abroad, and when a plot is safe to sign.",
  },
  {
    name: "Binod Ojha",
    experience: "16 years · PoA & documentation",
    image: "/images/site/binod-ojha-1.jpg",
    description:
      "Prepares power of attorney from your country of residence and sees municipality and registration through in Nepal.",
  },
  {
    name: "B. K. Mandal",
    experience: "15 years · repatriation of funds",
    image: "/images/site/B.K.Mandal-min-scaled.jpg",
    description:
      "Maps the legal path from tenant rent to a Nepal bank to your foreign account, without grey language.",
  },
  {
    name: "Ghuran Mandal",
    experience: "14 years · tax & treaty",
    image: "/images/site/Ghuran-mandal-min-scaled.jpg",
    description:
      "Walks through rental tax, capital gains, and treaty notes for the USA, Australia, and the UAE before you commit.",
  },
  {
    name: "Site finance desk",
    experience: "12 years · bank & remittance",
    image: "/images/site/Jhilkey-dai-min-scaled.jpg",
    description:
      "Matches how you send money, Nabil, NMB, eSewa Global, Khalti, Wise, or Western Union, to the project draw schedule.",
  },
  {
    name: "Title verification desk",
    experience: "20 years · land & encumbrances",
    image: "/images/site/IMG_6211.jpg",
    description:
      "Checks ownership history, encumbrances, and road access so nothing is signed on a guess.",
  },
] as const;

export const nrnPageIntro = {
  eyebrow: "For Nepali Abroad",
  title: "Build in Nepal with Confidence",
  description:
    "Transparent construction, verified credentials, and a client portal designed for NRNs managing projects from anywhere in the world.",
  backgroundAlt: "NEBCO construction project for NRN clients in Nepal",
};

export const nrnFeatureCategories: NrnFeatureCategory[] = [
  {
    id: "trust",
    eyebrow: "Trust & Credibility",
    title: "Verified. Insured. Accountable.",
    description:
      "Every claim on this page is backed by documents you can verify, not marketing promises.",
    features: [
      {
        tag: "Trust",
        title: "Live registration verifier",
        description:
          "Show NEBCO's DoR reg. number, PAN/VAT, and a \"Verify on govt portal\" link anyone can click to confirm.",
      },
      {
        tag: "Trust",
        title: "License & award wall",
        description:
          "Scannable images of DoR license, ISO certifications, NEB affiliations, and industry awards with issue dates.",
      },
      {
        tag: "Trust",
        title: "Pay-as-we-build model",
        description:
          "Visual breakdown of milestone payment schedule, no lump sum upfront. Each tranche released only when phase is verified.",
      },
      {
        tag: "Trust",
        title: "Third-party inspection",
        description:
          "Independent structural engineer inspects every phase before funds release. Report shared with client instantly.",
      },
      {
        tag: "Trust",
        title: "Contractor insurance",
        description:
          "Liability insurance and structural warranty badge, most Nepal contractors don't carry this. A huge differentiator.",
      },
      {
        tag: "Trust",
        title: "Immutable audit log",
        description:
          "Every payment, approval, and document upload is timestamped and locked, no edits, full accountability.",
      },
    ],
  },
  {
    id: "portal",
    eyebrow: "NRN Project Portal",
    title: "Your Site. Your Screen. Your Control.",
    description:
      "A dedicated portal so you never wonder what is happening on your build, from foundation to handover.",
    features: [
      {
        tag: "Portal",
        title: "See today’s site, not stock photos",
        description: "GPS-stamped photos from your plot, date, pin, and who uploaded them.",
      },
      {
        tag: "Portal",
        title: "Know which phase you are in",
        description: "Foundation to handover, with % complete, dates, and the next inspection.",
      },
      {
        tag: "Portal",
        title: "Watch spend against your budget",
        description: "Materials, labour, and permits vs. what you approved. No surprise draws.",
      },
      {
        tag: "Portal",
        title: "Get a monthly pack without chasing",
        description: "Work, spend, photos, and next milestone, emailed as a PDF automatically.",
      },
      {
        tag: "Portal",
        title: "Let family in Nepal watch with you",
        description: "Read-only logins for parents or siblings. Same progress you see abroad.",
      },
      {
        tag: "Portal",
        title: "Flag a problem from abroad",
        description: "Raise a concern with a photo. The engineer replies within 24 hours.",
      },
      {
        tag: "Portal",
        title: "Walk the site on a live call",
        description: "15-minute walkthrough in your timezone. Ask to show any wall or finish.",
      },
      {
        tag: "Portal",
        title: "Approve extra spend before it starts",
        description: "Scope changes wait for your tap. Nothing extra starts without the owner.",
      },
      {
        tag: "Portal",
        title: "Get pinged so you don’t have to check",
        description: "Milestones, payments, inspections, WhatsApp, SMS, and in-app together.",
      },
    ],
  },
  {
    id: "legal",
    eyebrow: "Legal & Financial Clarity",
    title: "No Grey Areas. No Guesswork.",
    description:
      "Sit with a specialist for thirty minutes, ownership, power of attorney, tax, remittance, or land title, then decide with a clear next step.",
    features: [
      {
        tag: "Legal",
        title: "NRN Investment Act explainer",
        description:
          "What you can legally own, how to buy land from abroad, and which documents you need before a plot is signed.",
      },
      {
        tag: "Legal",
        title: "Power of attorney service",
        description:
          "Draft and notarize PoA from your country of residence. We handle municipality and registration in Nepal.",
      },
      {
        tag: "Legal",
        title: "Repatriation walkthrough",
        description:
          "Tenant rent to a Nepal bank to your foreign account, the legal path, explained without grey language.",
      },
      {
        tag: "Legal",
        title: "Tax clarity section",
        description:
          "Rental income tax, capital gains, and treaty notes for the USA, Australia, and the UAE, so tax fear does not stall the build.",
      },
      {
        tag: "Legal",
        title: "Bank & remittance guide",
        description:
          "Wire paths for Nabil and NMB, plus eSewa Global, Khalti, Wise, and Western Union, matched to how you actually send money.",
      },
      {
        tag: "Legal",
        title: "Land title verification",
        description:
          "Ownership history, encumbrances, and road access checked before you commit. Nothing is signed on a guess.",
      },
    ],
  },
  {
    id: "tools",
    eyebrow: "Interactive Tools",
    title: "Plan Before You Commit",
    description:
      "Calculators and planners that turn vague ideas into concrete budgets, timelines, and document checklists.",
    features: [
      {
        tag: "Tool",
        title: "Build cost estimator",
        description:
          "Input: location, floors, area (sq.ft). Output: estimated cost in NPR and USD. Best lead-gen tool on the page.",
      },
      {
        tag: "Tool",
        title: "Rental ROI calculator",
        description:
          "Budget → estimated rental income/month → yearly return % → 10-year asset appreciation. Converts investors.",
      },
      {
        tag: "Tool",
        title: "\"Return home\" timeline planner",
        description:
          "NRN enters contract end date abroad → tool maps a build schedule so the house is ready when they return.",
      },
      {
        tag: "Tool",
        title: "Land plot finder map",
        description:
          "Interactive map of verified plots NEBCO has scouted in Kathmandu, Pokhara, Butwal, and other cities.",
      },
      {
        tag: "Tool",
        title: "Currency converter widget",
        description:
          "Live QAR/USD/AUD/GBP → NPR rates. NRNs see their savings in local currency instantly.",
      },
      {
        tag: "Tool",
        title: "Document checklist generator",
        description:
          "NRN picks their country → gets a personalized list of documents needed from their location to start a project.",
      },
    ],
  },
  {
    id: "services",
    eyebrow: "Investment & Post-Build",
    title: "Beyond Handover",
    description:
      "Six field notes on what comes after the keys, furnishing, rent, land, coming home, apartments, and upkeep from abroad.",
    features: [
      {
        tag: "Service",
        title: "Furnished handover package",
        description:
          "Optional: interior design + furniture for the completed property. Hand over rent-ready, not empty.",
      },
      {
        tag: "Service",
        title: "Rental management service",
        description:
          "NEBCO finds tenant, collects rent, handles maintenance. Monthly income deposited to NRN's bank. Fully passive.",
      },
      {
        tag: "Service",
        title: "Commercial plot advisory",
        description:
          "Identify high-yield commercial plots in Pokhara, Chitwan, Butwal for NRNs seeking business returns.",
      },
      {
        tag: "Service",
        title: "\"NRN return home\" package",
        description:
          "Pre-planned build timed to contract end abroad. \"You come back, your home is waiting.\" Emotional & practical.",
      },
      {
        tag: "Service",
        title: "Apartment investment packages",
        description:
          "Pre-designed 3/4-storey apartment units in high-demand areas, plug-and-play investment with projected yields.",
      },
      {
        tag: "Service",
        title: "Post-handover maintenance",
        description:
          "1-year structural warranty + annual maintenance plan. Cracks, leaks, electrical, handled without the NRN being present.",
      },
    ],
  },
  {
    id: "comm",
    eyebrow: "Communication & Support",
    title: "We Meet You Where You Are",
    description:
      "WhatsApp-first, timezone-aware, multilingual support, because distance should not mean disconnection.",
    features: [
      {
        tag: "Comm",
        title: "Dedicated WhatsApp line",
        description:
          "Verified WhatsApp Business number, NRN-only channel. Gulf NRNs don't email, meet them where they live.",
      },
      {
        tag: "Comm",
        title: "Timezone-aware support hours",
        description:
          "Display \"Available 6 AM–10 PM NPT, covers Gulf, Europe, and US time zones.\" Explicit, reassuring.",
      },
      {
        tag: "Comm",
        title: "Nepali language toggle",
        description:
          "NRN section available in Nepali. Gulf workers especially prefer it, emotional connection, immediate trust.",
      },
      {
        tag: "Comm",
        title: "Free 30-min video call booking",
        description:
          "Calendly-style booking for a free NRN advisory call. No commitment framing, no pressure. Removes first barrier.",
      },
      {
        tag: "Comm",
        title: "Named NRN advisor profiles",
        description:
          "Show photo, name, languages spoken, and timezone of each NRN advisor. People trust people, not departments.",
      },
      {
        tag: "Comm",
        title: "NRN chatbot / FAQ bot",
        description:
          "AI chatbot trained on Nepal property law, NEBCO services, and NRN Investment Act. Answers at 2 AM in Qatar.",
      },
    ],
  },
  {
    id: "target",
    eyebrow: "Country-Specific",
    title: "Built for Your Diaspora",
    description:
      "Tailored messaging and payment paths for Gulf, Western, family-build, and investor NRNs.",
    features: [
      {
        tag: "Target",
        title: "Gulf NRN landing page",
        description:
          "\"Build the home you'll retire to.\" eSewa Global & Khalti payment shown. WhatsApp-first CTA. QAR/SAR/AED currency.",
      },
      {
        tag: "Target",
        title: "USA/Australia/UK page",
        description:
          "\"Your Kathmandu apartment can earn NPR 40,000+/month.\" ROI focus. USD/AUD pricing. Audit trail emphasis.",
      },
      {
        tag: "Target",
        title: "Family-build page",
        description:
          "\"Give your parents the home they deserve.\" Family portal access feature highlighted. Emotional, not financial focus.",
      },
      {
        tag: "Target",
        title: "NRN investor page",
        description:
          "Commercial plots, apartment blocks, joint ventures. For NRNs with larger capital looking beyond a single home.",
      },
    ],
  },
  {
    id: "content",
    eyebrow: "Content & Community",
    title: "Stay Connected to Your Build",
    description:
      "Diaries, forums, newsletters, and video series that keep NRNs informed and part of a trusted community.",
    features: [
      {
        tag: "Content",
        title: "Build diary blog / vlog",
        description:
          "Public weekly updates on real ongoing NRN projects (with permission). Authenticity signal, nothing to hide.",
        image: "/images/site/kapan-2_11zon.jpg",
      },
      {
        tag: "Content",
        title: "NRN community forum",
        description:
          "Private forum where NEBCO NRN clients share experiences, ask questions, and refer each other. Trust network.",
        image: "/images/site/IMG_7544_11zon.jpg",
      },
      {
        tag: "Content",
        title: "NRN newsletter",
        description:
          "Monthly email: Nepal property market update, completed projects, legal changes, new NEBCO services. Stay top of mind.",
        image: "/images/dokyung-kim-bLx7ypUxxIc-unsplash.jpg",
      },
      {
        tag: "Content",
        title: "YouTube build series",
        description:
          "Building in Nepal from abroad. Each episode follows one NRN project from land to handover.",
        image: "/images/site/DSC01007-scaled.jpg",
      },
    ],
  },
];
