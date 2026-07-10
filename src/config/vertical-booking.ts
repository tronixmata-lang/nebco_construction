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
    "Residential Construction Inquiry",
    "Commercial Construction Inquiry",
    "Apartment & Housing Project",
    "Interior Design Build",
    "Civil Engineering Project",
    "Project Estimate & Timeline",
    "General Construction Inquiry",
  ],
  investment: [
    "Infrastructure Development",
    "Road & Bridge Project",
    "Commercial Complex Development",
    "Real Estate Development",
    "Property Investment Inquiry",
    "Public-Private Partnership",
    "General Investment Inquiry",
  ],
  consulting: [
    "Architectural Design Consultation",
    "Structural Engineering Review",
    "MEP & Interior Planning",
    "Urban Planning & Master Planning",
    "Feasibility & FDI Advisory",
    "Construction Project Management",
    "General Consulting Inquiry",
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
