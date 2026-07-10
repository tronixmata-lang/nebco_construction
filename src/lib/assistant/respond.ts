import type { AssistantKnowledge, KnowledgeEntry, KnowledgeLink } from "@/lib/assistant/types";

export type AssistantReply = {
  text: string;
  links?: KnowledgeLink[];
  suggestions?: string[];
  startBooking?: boolean;
};

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function truncate(text: string, max = 280): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

function normalizeSmallTalk(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function detectSmallTalk(
  query: string,
): "greeting" | "wellbeing" | "thanks" | "goodbye" | null {
  const q = normalizeSmallTalk(query);
  if (!q) return null;

  if (
    /\b(how are you|how are u|how r u|how re you|how do you do|how s it going|how is it going|how are things|how you doing|you good|are you ok|are you okay|hope you are well)\b/.test(
      q,
    )
  ) {
    return "wellbeing";
  }

  if (
    /^(hi+|hy+|hii+|hey+|hello+|helo+|hlo+|howdy|yo|sup|wassup|what s up|whats up|good morning|good afternoon|good evening|good day|namaste|namaskar|greetings)\b/.test(
      q,
    ) ||
    /^(hi+|hy|hii+|hey+|hello+|helo+|hlo+)[!.?\s]*$/.test(q) ||
    /^h+i+[!.?]*$/.test(q)
  ) {
    return "greeting";
  }

  if (/^(thanks|thank you|thx|ty|appreciate it|much appreciated|cheers)\b/.test(q)) {
    return "thanks";
  }

  if (/^(bye|goodbye|see you|see ya|take care|that s all|thats all|done|exit)[!.?\s]*$/.test(q)) {
    return "goodbye";
  }

  return null;
}

export function getSuggestionsForTopic(topicId: string, knowledge: AssistantKnowledge): string[] {
  const map: Record<string, string[]> = {
    about: ["What services do you offer?", "Are you A-Class licensed?", "Book a consultation"],
    divisions: ["Tell me about Construction", "Book Construction meeting", "View portfolio"],
    contact: ["Book a consultation", "Office location", "Call NEBCO"],
    projects: ["Book a consultation", "Our divisions", "Contact NEBCO"],
    leadership: ["About NEBCO", "Book a consultation", "Contact us"],
    certificates: ["About NEBCO", "Our services", "Get a quote"],
    stats: ["Our projects", "About NEBCO", "Book a meeting"],
    testimonials: ["Book a consultation", "Our services", "Contact us"],
    booking: ["Construction consultation", "Investment inquiry", "Consulting session"],
    sectors: ["Our divisions", "View projects", "Book a meeting"],
    quote: ["Book a consultation", "Construction estimate", "Contact NEBCO"],
    nrn: ["Book a consultation", "Our services", "Contact NEBCO"],
  };

  return map[topicId] ?? ["Our services", "Contact info", "Book a meeting"];
}

export function formatGreeting(knowledge: AssistantKnowledge): AssistantReply {
  const { site } = knowledge;
  return {
    text: pick([
      `Hello! I'm NEBCO Assistance. I can help with company info, services, contact details, and booking a consultation with our team.`,
      `Hi there! Welcome to ${site.name}. Ask me anything, or I can help you schedule a meeting in just a few steps.`,
      `Hey! Good to hear from you. I'm here to answer questions about our construction, investment, and consulting work.`,
    ]),
    suggestions: [
      "What does NEBCO do?",
      "Book construction meeting",
      "Contact details",
      "Our services",
    ],
  };
}

export function formatWellbeing(): AssistantReply {
  return {
    text: pick([
      "I'm doing well, thank you for asking! I'm here and ready to help with anything about NEBCO.",
      "I'm good, thanks! How can I assist you with our construction, investment, or consulting services today?",
      "All good here, thank you! Tell me what you're looking for and I'll guide you.",
    ]),
    suggestions: [
      "Our services",
      "Book construction meeting",
      "Contact details",
      "About NEBCO",
    ],
  };
}

export function formatShortGreeting(): AssistantReply {
  return {
    text: pick([
      "Hey! How can I help you today?",
      "Hi again! What would you like to know about NEBCO?",
    ]),
    suggestions: ["Our services", "Book construction meeting", "Contact details"],
  };
}

export function formatThanks(): AssistantReply {
  return {
    text: pick([
      "You're welcome! Let me know if you'd like help with anything else.",
      "Happy to help. Feel free to ask another question or book a consultation anytime.",
      "Glad I could help. Is there anything else you'd like to know about NEBCO?",
    ]),
    suggestions: ["Book a consultation", "Our services", "Contact info"],
  };
}

export function formatGoodbye(knowledge: AssistantKnowledge): AssistantReply {
  return {
    text: pick([
      `Thank you for visiting ${knowledge.site.name}. We're here whenever you need us at ${knowledge.site.phone}.`,
      "Have a great day! Reach out anytime if you have more questions about your project.",
    ]),
    links: [{ label: "Contact page", href: "/contact" }],
  };
}

export function formatTopicReply(
  topicId: string,
  entry: KnowledgeEntry,
  knowledge: AssistantKnowledge,
): AssistantReply {
  const { site } = knowledge;

  switch (topicId) {
    case "about":
      return {
        text: `${site.legalName} has operated since ${site.foundingDate} under ${site.parentOrganization}. ${truncate(site.description, 220)} Our tagline is "${site.tagline}". Would you like to explore our divisions or schedule a consultation?`,
        links: entry.link ? [entry.link] : [{ label: "About NEBCO", href: "/about" }],
        suggestions: getSuggestionsForTopic("about", knowledge),
      };

    case "contact":
      return {
        text: `Here's the easiest way to reach us:\n\nCall: ${site.phone}\nEmail: ${site.email}\nOffice: ${site.address}\nHours: ${site.businessHours}\n\nI can also help you book a consultation right here in the chat.`,
        links: [
          { label: "Contact page", href: "/contact" },
          { label: `Call ${site.phone}`, href: `tel:${site.phone.replace(/\s/g, "")}` },
          { label: "Send email", href: `mailto:${site.email}` },
        ],
        suggestions: getSuggestionsForTopic("contact", knowledge),
      };

    case "divisions": {
      const summary = knowledge.divisions
        .map((d) => `• ${d.name}: ${d.tagline}`)
        .join("\n");
      return {
        text: `NEBCO works across three main verticals:\n\n${summary}\n\nTell me which area you're interested in, or I can help you book a consultation.`,
        links: [{ label: "Explore divisions", href: "/divisions" }],
        suggestions: knowledge.divisions.map((d) => d.name).concat(["Book a consultation"]),
      };
    }

    case "projects": {
      const lines = entry.content.split("\n\n").slice(0, 3);
      return {
        text: `Here are some of our recent projects:\n\n${lines.map((l) => `• ${truncate(l, 120)}`).join("\n")}\n\nWant to see the full portfolio or discuss a similar project?`,
        links: entry.link ? [entry.link] : [{ label: "View portfolio", href: "/portfolio" }],
        suggestions: getSuggestionsForTopic("projects", knowledge),
      };
    }

    case "leadership":
      return {
        text: `Our leadership team guides NEBCO across construction, investment, and consulting.\n\n${truncate(entry.content, 320)}`,
        links: entry.link ? [entry.link] : [{ label: "Meet the team", href: "/leadership" }],
        suggestions: getSuggestionsForTopic("leadership", knowledge),
      };

    case "certificates":
      return {
        text: `Yes, NEBCO is a licensed A-Class construction company in Nepal. ${truncate(entry.content, 240)}`,
        links: entry.link ? [entry.link] : undefined,
        suggestions: getSuggestionsForTopic("certificates", knowledge),
      };

    case "stats":
      return {
        text: `A few highlights about our track record:\n\n${entry.content.split("\n").map((s) => `• ${s}`).join("\n")}`,
        suggestions: getSuggestionsForTopic("stats", knowledge),
      };

    case "testimonials":
      return {
        text: `Clients across residential, commercial, and hospitality trust NEBCO for quality and on-time delivery.\n\n${truncate(entry.content, 300)}`,
        suggestions: getSuggestionsForTopic("testimonials", knowledge),
      };

    case "booking":
      return {
        text: "I can help you schedule a consultation with our Construction, Investment, or Consulting team. It only takes a minute. Which division would you like to meet with?",
        startBooking: true,
        suggestions: knowledge.divisions.map((d) => `Book ${d.name}`),
      };

    case "quote":
      return {
        text: `For project estimates and timelines, the best next step is a short consultation with our team. You can book one here, or call us directly at ${site.phone}.`,
        startBooking: true,
        links: [{ label: "Contact us", href: "/contact" }],
        suggestions: ["Book a consultation", "Construction estimate", "Contact NEBCO"],
      };

    case "nrn":
      return {
        text: "Yes, we regularly work with NRN and international clients on residential, commercial, and investment projects in Nepal. We focus on clear communication and professional project management throughout.",
        links: [{ label: "Contact NEBCO", href: "/contact" }],
        suggestions: getSuggestionsForTopic("nrn", knowledge),
      };

    default:
      if (entry.id.startsWith("division-")) {
        const division = knowledge.divisions.find((d) => entry.id === `division-${d.slug}` || entry.title === d.name);
        return {
          text: `${entry.title} ${division ? `focuses on ${division.tagline.toLowerCase()}.` : ""}\n\n${truncate(division?.description ?? entry.content, 260)}\n\nServices include: ${(division?.services ?? []).slice(0, 5).join(", ")}.`,
          links: entry.link ? [entry.link] : undefined,
          suggestions: division
            ? [`Book ${division.name}`, "Our divisions", "Contact info"]
            : getSuggestionsForTopic("divisions", knowledge),
        };
      }

      if (entry.id.startsWith("faq-")) {
        return {
          text: entry.content,
          suggestions: getSuggestionsForTopic(topicId, knowledge),
        };
      }

      return {
        text: truncate(entry.content, 360),
        links: entry.link ? [entry.link] : undefined,
        suggestions: getSuggestionsForTopic(topicId, knowledge),
      };
  }
}

export function formatFallback(knowledge: AssistantKnowledge): AssistantReply {
  const { site } = knowledge;
  return {
    text: `I'm not fully sure about that one, but our team can help directly.\n\nCall ${site.phone}\nEmail ${site.email}\nOffice: ${site.address}\n\nOr try one of these common topics:`,
    links: [
      { label: "Contact page", href: "/contact" },
      { label: "Book consultation", href: "/contact" },
    ],
    suggestions: ["Our services", "Book a consultation", "Office location", "A-Class license"],
  };
}

export function formatBookingStart(divisionName?: string): AssistantReply {
  if (divisionName) {
    return {
      text: pick([
        `Perfect, let's book a meeting with ${divisionName}. What would you like to discuss?`,
        `Great choice. I'll help you schedule with ${divisionName}. Pick a consultation purpose below.`,
      ]),
      startBooking: true,
    };
  }

  return {
    text: pick([
      "Sure, let's get a consultation on the calendar. Which team would you like to speak with?",
      "Happy to help with booking. Are you looking at Construction, Investment, or Consulting?",
    ]),
    startBooking: true,
    suggestions: ["Book construction meeting", "Book investment meeting", "Book consulting meeting"],
  };
}

export function formatBookingProgress(step: string, detail?: string): AssistantReply {
  const messages: Record<string, string[]> = {
    division: ["Great choice. What would you like to discuss in the meeting?"],
    purpose: ["Perfect. Pick a date that works for you. We're closed on Sundays."],
    date: ["Nice. What time slot suits you best?"],
    time: ["Almost there. Just need your name, email, and phone number."],
    confirm: ["Looks good. Hit confirm when you're ready and our team will follow up within 1-2 business days."],
  };

  const base = pick(messages[step] ?? ["Let's continue with your booking."]);
  return { text: detail ? `${detail}\n\n${base}` : base };
}

export function formatBookingSuccess(draft: {
  divisionName: string;
  dateLabel: string;
  time: string;
  purpose: string;
}): AssistantReply {
  return {
    text: `All set! Your consultation request is in.\n\n${draft.divisionName}\n${draft.dateLabel} at ${draft.time}\n${draft.purpose}\n\nOur team will confirm by email or phone within 1-2 business days.`,
    suggestions: ["Our services", "View projects", "Contact info"],
  };
}
