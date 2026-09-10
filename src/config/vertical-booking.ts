export const verticalTimeSlots = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
] as const;

export type VerticalBookingSlug = "construction" | "investment" | "consulting";
export type VerticalTimeSlot = (typeof verticalTimeSlots)[number];

export const verticalBookingPurposes: Record<VerticalBookingSlug, readonly string[]> = {
  construction: [
    "Talk to an Engineer",
    "Free Project Estimate",
    "Residential Construction Inquiry",
    "Commercial Construction Inquiry",
    "Apartment Complex",
    "Renovation & Extension",
    "Industrial Structure",
    "Road & Civil Work",
  ],
  investment: [
    "Residential Apartment Inquiry",
    "Commercial Plot Inquiry",
    "Joint Venture Discussion",
    "Off-plan Property",
    "Land Banking Inquiry",
    "Rental-ready Package",
    "Free Investment Call",
    "General Investment Inquiry",
  ],
  consulting: [
    "Free 30-min Consultation",
    "Planning & Feasibility",
    "Architectural & Design",
    "Legal & Permits",
    "Project Management Consulting",
    "Investment Advisory",
    "Get a Consulting Quote",
    "Stalled Contractor / Dispute",
  ],
};

const genericPurposes: readonly string[] = [
  "Project Consultation",
  "Design & Planning",
  "Cost & Timeline Estimate",
  "Partnership Inquiry",
  "General Inquiry",
];

/** Falls back to generic purposes for CMS-created divisions with custom ids. */
export function getVerticalBookingPurposes(slug: string): readonly string[] {
  return verticalBookingPurposes[slug as VerticalBookingSlug] ?? genericPurposes;
}

export const verticalBookingSlugs = Object.keys(verticalBookingPurposes) as VerticalBookingSlug[];
