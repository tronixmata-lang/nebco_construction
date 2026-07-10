import type { VerticalBookingSlug } from "@/config/vertical-booking";

export type KnowledgeLink = {
  label: string;
  href: string;
};

export type KnowledgeEntry = {
  id: string;
  title: string;
  content: string;
  keywords: string[];
  link?: KnowledgeLink;
};

export type AssistantDivision = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  services: string[];
  href: string;
  purposes: readonly string[];
};

export type AssistantKnowledge = {
  site: {
    name: string;
    legalName: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    businessHours: string;
    foundingDate: string;
    parentOrganization: string;
    description: string;
  };
  entries: KnowledgeEntry[];
  divisions: AssistantDivision[];
  quickTopics: Array<{ id: string; label: string }>;
};

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  links?: KnowledgeLink[];
  suggestions?: string[];
};

export type BookingStep = "division" | "purpose" | "date" | "time" | "details" | "confirm";

export type BookingDraft = {
  division: VerticalBookingSlug | "";
  divisionName: string;
  purpose: string;
  dateKey: string;
  dateLabel: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export const emptyBookingDraft = (): BookingDraft => ({
  division: "",
  divisionName: "",
  purpose: "",
  dateKey: "",
  dateLabel: "",
  time: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
});
