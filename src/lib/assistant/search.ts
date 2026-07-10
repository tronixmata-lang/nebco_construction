import type { KnowledgeEntry } from "@/lib/assistant/types";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  const stopWords = new Set([
    "a",
    "an",
    "the",
    "is",
    "are",
    "was",
    "what",
    "where",
    "when",
    "how",
    "do",
    "does",
    "can",
    "i",
    "you",
    "we",
    "our",
    "your",
    "me",
    "about",
    "tell",
    "please",
    "nebco",
    "want",
    "need",
    "like",
    "know",
    "get",
  ]);

  return normalize(text)
    .split(" ")
    .filter((word) => word.length > 1 && !stopWords.has(word));
}

export function searchKnowledge(
  query: string,
  entries: KnowledgeEntry[],
): KnowledgeEntry | null {
  const tokens = tokenize(query);
  if (tokens.length === 0) return null;

  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of entries) {
    const haystack = normalize(
      [entry.title, entry.content, entry.keywords.join(" ")].join(" "),
    );
    let score = 0;

    for (const token of tokens) {
      if (haystack.includes(token)) {
        score += token.length >= 5 ? 3 : 2;
      }
    }

    for (const keyword of entry.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (
        tokens.some(
          (token) =>
            normalizedKeyword.includes(token) ||
            token.includes(normalizedKeyword) ||
            normalizedKeyword.split(" ").every((part) => haystack.includes(part)),
        )
      ) {
        score += 4;
      }
    }

    if (normalize(entry.title).includes(normalize(query))) {
      score += 6;
    }

    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 2 ? best : null;
}

export function hasBookingIntent(query: string): boolean {
  const normalized = normalize(query);

  const longForm =
    /\b(book|booking|schedule|appointment|consultation|set up|setup|arrange)\b/.test(normalized) &&
    /\b(meeting|consultation|appointment|session|call|visit|booking|book)\b/.test(normalized);

  const shortForm =
    normalized.startsWith("book ") ||
    /\b(book a|schedule a|need a meeting|want a meeting|book me)\b/.test(normalized);

  return longForm || shortForm;
}

export function matchDivisionSlug(
  query: string,
  divisions: Array<{ slug: string; name: string; shortName?: string }>,
): string | null {
  const normalized = normalize(query);

  for (const division of divisions) {
    const candidates = [
      normalize(division.slug),
      normalize(division.name),
      division.shortName ? normalize(division.shortName) : "",
    ].filter(Boolean);

    if (candidates.some((candidate) => normalized.includes(candidate) || candidate.includes(normalized))) {
      return division.slug;
    }
  }

  if (normalized.includes("construction")) return "construction";
  if (normalized.includes("investment")) return "investment";
  if (normalized.includes("consulting")) return "consulting";

  return null;
}

export function parseBookingIntent(
  query: string,
  divisions: Array<{ slug: string; name: string; shortName?: string }>,
): { divisionSlug: string | null } | null {
  if (!hasBookingIntent(query)) {
    return null;
  }

  return { divisionSlug: matchDivisionSlug(query, divisions) };
}

export function matchTopicId(query: string): string | null {
  const normalized = normalize(query);

  if (hasBookingIntent(query)) {
    return "booking";
  }

  const topicMap: Array<[string, string[]]> = [
    [
      "quote",
      [
        "quote",
        "quotation",
        "estimate",
        "cost",
        "price",
        "pricing",
        "how much",
        "budget",
        "rate",
      ],
    ],
    [
      "nrn",
      ["nrn", "non resident", "non-resident", "abroad", "overseas", "diaspora", "foreign client"],
    ],
    [
      "about",
      [
        "about",
        "company",
        "history",
        "mission",
        "vision",
        "who are you",
        "tell me about",
        "founded",
        "since when",
        "shah group",
      ],
    ],
    [
      "divisions",
      [
        "division",
        "divisions",
        "services",
        "vertical",
        "what do you do",
        "what does nebco do",
        "offer",
      ],
    ],
    [
      "contact",
      [
        "contact",
        "phone",
        "email",
        "address",
        "location",
        "office",
        "hours",
        "call",
        "reach",
        "where are you",
        "visit",
      ],
    ],
    [
      "projects",
      ["project", "projects", "portfolio", "work", "buildings", "completed", "past work"],
    ],
    [
      "leadership",
      ["leader", "leadership", "team", "chairman", "management", "director", "ceo"],
    ],
    [
      "certificates",
      [
        "certificate",
        "certificates",
        "license",
        "licensed",
        "a class",
        "aclass",
        "accreditation",
        "registered",
      ],
    ],
    [
      "stats",
      ["stats", "statistics", "years", "experience", "projects completed", "highlights", "track record"],
    ],
    [
      "testimonials",
      ["testimonial", "testimonials", "review", "reviews", "feedback", "clients say", "client"],
    ],
    [
      "booking",
      [
        "book",
        "booking",
        "schedule",
        "meeting",
        "consultation",
        "appointment",
        "visit",
        "set up a call",
        "talk to someone",
      ],
    ],
    ["construction", ["construction", "build", "building", "residential", "commercial build"]],
    ["investment", ["investment", "invest", "infrastructure", "real estate development", "ppp"]],
    ["consulting", ["consulting", "architect", "architectural", "structural", "design consultation"]],
  ];

  for (const [id, phrases] of topicMap) {
    if (phrases.some((phrase) => normalized.includes(phrase))) {
      return id;
    }
  }

  return null;
}

export function matchPurpose(query: string, purposes: readonly string[]): string | null {
  const normalized = normalize(query);
  return purposes.find((purpose) => normalize(purpose).includes(normalized) || normalized.includes(normalize(purpose))) ?? null;
}

export function isCancelIntent(query: string): boolean {
  return /^(cancel|stop|never mind|nevermind|exit|quit)\b/.test(normalize(query));
}

export function isBackIntent(query: string): boolean {
  return /^(back|previous|go back)\b/.test(normalize(query));
}

export function resolveTopicEntryId(topicId: string, entries: KnowledgeEntry[]): string {
  if (topicId === "construction") return "division-construction";
  if (topicId === "investment") return "division-investment";
  if (topicId === "consulting") return "division-consulting";
  if (topicId === "quote") return "booking";
  return topicId;
}
