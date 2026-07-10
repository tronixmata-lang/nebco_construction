"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AssistantAvatar, AssistantLauncherIcon } from "@/components/assistant/AssistantAvatar";
import { verticalTimeSlots, type VerticalBookingSlug } from "@/config/vertical-booking";
import {
  detectSmallTalk,
  formatBookingProgress,
  formatBookingStart,
  formatBookingSuccess,
  formatFallback,
  formatGreeting,
  formatGoodbye,
  formatShortGreeting,
  formatThanks,
  formatTopicReply,
  formatWellbeing,
  type AssistantReply,
} from "@/lib/assistant/respond";
import {
  isBackIntent,
  isCancelIntent,
  matchDivisionSlug,
  matchPurpose,
  matchTopicId,
  parseBookingIntent,
  resolveTopicEntryId,
  searchKnowledge,
} from "@/lib/assistant/search";
import {
  getAssistantSessionId,
  markOpeningGreetingSent,
  persistAssistantMessage,
  resetAssistantSessionId,
  shouldSendOpeningGreeting,
} from "@/lib/assistant/session";
import {
  emptyBookingDraft,
  type AssistantKnowledge,
  type BookingDraft,
  type BookingStep,
  type ChatMessage,
  type KnowledgeLink,
} from "@/lib/assistant/types";
import { cn } from "@/lib/utils";

const ASSISTANT_NAME = "NEBCO Assistance";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const TYPING_DELAY_MS = 450;

function createMessage(
  role: ChatMessage["role"],
  text: string,
  options?: { links?: KnowledgeLink[]; suggestions?: string[] },
): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role,
    text,
    links: options?.links,
    suggestions: options?.suggestions,
  };
}

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

function isPastDate(date: Date, today: Date): boolean {
  return startOfDay(date).getTime() < startOfDay(today).getTime();
}

function buildMonthGrid(viewMonth: Date): Array<Date | null> {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmpty = firstDay.getDay();
  const cells: Array<Date | null> = [];

  for (let i = 0; i < leadingEmpty; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(new Date(year, month, day));
  return cells;
}

function formatDateLabel(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function isExternalActionLink(href: string): boolean {
  return href.startsWith("tel:") || href.startsWith("mailto:");
}

export function NebcoAssistance() {
  const panelId = useId();
  const inputId = useId();
  const messagesRef = useRef<HTMLDivElement>(null);
  const greetingInitRef = useRef(false);
  const sessionIdRef = useRef("");
  const [open, setOpen] = useState(false);
  const [knowledge, setKnowledge] = useState<AssistantKnowledge | null>(null);
  const [loadingKnowledge, setLoadingKnowledge] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [bookingActive, setBookingActive] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>("division");
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>(emptyBookingDraft);
  const [submitting, setSubmitting] = useState(false);
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  const monthLabel = viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const monthCells = useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);

  const selectedDivision = useMemo(
    () => knowledge?.divisions.find((division) => division.slug === bookingDraft.division),
    [bookingDraft.division, knowledge?.divisions],
  );

  const lastAssistantIndex = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
  }, [messages]);

  const appendMessage = useCallback((message: ChatMessage) => {
    setMessages((current) => {
      const last = current[current.length - 1];
      if (last && last.role === message.role && last.text === message.text) {
        return current;
      }
      return [...current, message];
    });

    if (!sessionIdRef.current) {
      sessionIdRef.current = getAssistantSessionId();
    }
    persistAssistantMessage(sessionIdRef.current, message.role, message.text);
  }, []);

  const reply = useCallback(
    async (assistantReply: AssistantReply) => {
      setTyping(true);
      await new Promise((resolve) => window.setTimeout(resolve, TYPING_DELAY_MS));
      setTyping(false);
      appendMessage(
        createMessage("assistant", assistantReply.text, {
          links: assistantReply.links,
          suggestions: assistantReply.suggestions,
        }),
      );
    },
    [appendMessage],
  );

  const loadKnowledge = useCallback(async () => {
    if (knowledge || loadingKnowledge) return knowledge;

    setLoadingKnowledge(true);
    try {
      const response = await fetch("/api/assistant/knowledge");
      if (!response.ok) throw new Error("Failed to load");
      const data = (await response.json()) as AssistantKnowledge;
      setKnowledge(data);
      return data;
    } catch {
      await reply({
        text: "I couldn't refresh our latest info right now, but you can still reach us at +977-9803850955 or nebconepal@gmail.com.",
        links: [{ label: "Contact page", href: "/contact" }],
      });
      return null;
    } finally {
      setLoadingKnowledge(false);
    }
  }, [knowledge, loadingKnowledge, reply]);

  useEffect(() => {
    if (!open) return;

    if (!sessionIdRef.current) {
      sessionIdRef.current = getAssistantSessionId();
    }

    void loadKnowledge().then((data) => {
      if (data && shouldSendOpeningGreeting() && !greetingInitRef.current) {
        greetingInitRef.current = true;
        markOpeningGreetingSent();
        void reply(formatGreeting(data));
      }
    });
  }, [open, loadKnowledge, reply]);

  useEffect(() => {
    const node = messagesRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, bookingStep, open, typing]);

  const getEntry = useCallback(
    (topicId: string, data: AssistantKnowledge) => {
      const entryId = resolveTopicEntryId(topicId, data.entries);
      return data.entries.find((item) => item.id === entryId) ?? data.entries.find((item) => item.id === topicId);
    },
    [],
  );

  const startBookingWithDivision = useCallback(
    async (divisionSlug?: string) => {
      if (!knowledge) return;

      setBookingActive(true);
      setBookingDraft(emptyBookingDraft());

      if (divisionSlug) {
        const division = knowledge.divisions.find((item) => item.slug === divisionSlug);
        if (division) {
          setBookingDraft({
            ...emptyBookingDraft(),
            division: divisionSlug as VerticalBookingSlug,
            divisionName: division.name,
          });
          setBookingStep("purpose");
          await reply(formatBookingStart(division.name));
          return;
        }
      }

      setBookingStep("division");
      await reply(formatBookingStart());
    },
    [knowledge, reply],
  );

  const startBooking = useCallback(async () => {
    await startBookingWithDivision();
  }, [startBookingWithDivision]);

  const handleTopic = useCallback(
    async (topicId: string, data: AssistantKnowledge) => {
      if (topicId === "booking" || topicId === "quote") {
        await startBooking();
        return;
      }

      if (topicId === "construction" || topicId === "investment" || topicId === "consulting") {
        const entry = getEntry(topicId, data);
        if (entry) {
          await reply(formatTopicReply(topicId, entry, data));
        }
        return;
      }

      const entry = getEntry(topicId, data);
      if (!entry) {
        await reply(formatFallback(data));
        return;
      }

      await reply(formatTopicReply(topicId, entry, data));
    },
    [getEntry, reply, startBooking],
  );

  const cancelBooking = useCallback(async () => {
    setBookingActive(false);
    setBookingStep("division");
    setBookingDraft(emptyBookingDraft());
    await reply({
      text: "No problem, I've cancelled the booking. What else can I help you with?",
      suggestions: ["Our services", "Contact info", "Book a consultation"],
    });
  }, [reply]);

  const handleBookingText = useCallback(
    async (text: string) => {
      if (!knowledge) return;

      if (isCancelIntent(text)) {
        await cancelBooking();
        return;
      }

      if (isBackIntent(text)) {
        const prev: Record<BookingStep, BookingStep | null> = {
          division: null,
          purpose: "division",
          date: "purpose",
          time: "date",
          details: "time",
          confirm: "details",
        };
        const previous = prev[bookingStep];
        if (!previous) {
          await reply({ text: "You're at the first step. Pick a division or type cancel to stop." });
          return;
        }
        setBookingStep(previous);
        await reply(formatBookingProgress(previous));
        return;
      }

      if (bookingStep === "division") {
        const slug = matchDivisionSlug(text, knowledge.divisions);
        if (!slug) {
          await reply({
            text: "I didn't catch which team you mean. Choose Construction, Investment, or Consulting below, or type one of those names.",
          });
          return;
        }
        const division = knowledge.divisions.find((item) => item.slug === slug);
        if (!division) return;
        setBookingDraft((current) => ({
          ...current,
          division: slug as VerticalBookingSlug,
          divisionName: division.name,
        }));
        setBookingStep("purpose");
        await reply(formatBookingProgress("division", `${division.name} sounds good.`));
        return;
      }

      if (bookingStep === "purpose" && selectedDivision) {
        const purpose = matchPurpose(text, selectedDivision.purposes);
        if (!purpose) {
          await reply({ text: "Pick the purpose that best matches your visit from the list below." });
          return;
        }
        setBookingDraft((current) => ({ ...current, purpose }));
        setBookingStep("date");
        await reply(formatBookingProgress("purpose"));
        return;
      }
    },
    [bookingStep, cancelBooking, knowledge, reply, selectedDivision],
  );

  const handleUserMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || !knowledge) return;

      appendMessage(createMessage("user", text));
      setInput("");

      if (bookingActive) {
        await handleBookingText(text);
        if (bookingStep !== "division" && bookingStep !== "purpose") {
          await reply({
            text: "Use the calendar and buttons below to finish your booking, or type back or cancel anytime.",
          });
        }
        return;
      }

      const smallTalk = detectSmallTalk(text);
      if (smallTalk === "greeting") {
        const alreadyWelcomed = messages.some((message) => message.role === "assistant");
        await reply(alreadyWelcomed ? formatShortGreeting() : formatGreeting(knowledge));
        return;
      }
      if (smallTalk === "wellbeing") {
        await reply(formatWellbeing());
        return;
      }
      if (smallTalk === "thanks") {
        await reply(formatThanks());
        return;
      }
      if (smallTalk === "goodbye") {
        await reply(formatGoodbye(knowledge));
        return;
      }

      const bookingIntent = parseBookingIntent(text, knowledge.divisions);
      if (bookingIntent) {
        await startBookingWithDivision(bookingIntent.divisionSlug ?? undefined);
        return;
      }

      const topicId = matchTopicId(text);
      if (topicId) {
        await handleTopic(topicId, knowledge);
        return;
      }

      const match = searchKnowledge(text, knowledge.entries);
      if (match) {
        const topicFromId = match.id.replace(/^division-/, "");
        await reply(formatTopicReply(topicFromId, match, knowledge));
        return;
      }

      await reply(formatFallback(knowledge));
    },
    [appendMessage, bookingActive, bookingStep, handleBookingText, handleTopic, knowledge, reply, startBookingWithDivision],
  );

  const submitBooking = useCallback(async () => {
    if (!bookingDraft.division || !bookingDraft.dateKey || !bookingDraft.time || !bookingDraft.purpose) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/divisions/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingDraft.name,
          email: bookingDraft.email,
          phone: bookingDraft.phone,
          division: bookingDraft.division,
          date: bookingDraft.dateKey,
          time: bookingDraft.time,
          purpose: bookingDraft.purpose,
          notes: bookingDraft.notes.trim() || undefined,
        }),
      });

      if (!response.ok) {
        await reply({
          text: "That booking didn't go through. Please double-check your details or call us at +977-9803850955.",
        });
        return;
      }

      const successDraft = { ...bookingDraft };
      setBookingActive(false);
      setBookingStep("division");
      setBookingDraft(emptyBookingDraft());
      await reply(formatBookingSuccess(successDraft));
    } catch {
      await reply({
        text: "Something went wrong on our end. Please try again or call +977-9803850955.",
      });
    } finally {
      setSubmitting(false);
    }
  }, [bookingDraft, reply]);

  const resetChat = useCallback(async () => {
    sessionIdRef.current = resetAssistantSessionId();
    greetingInitRef.current = true;
    markOpeningGreetingSent();
    setMessages([]);
    setBookingActive(false);
    setBookingStep("division");
    setBookingDraft(emptyBookingDraft());
    if (knowledge) {
      await reply(formatGreeting(knowledge));
    }
  }, [knowledge, reply]);

  function isDateSelectable(date: Date): boolean {
    return !isPastDate(date, today) && !isSunday(date);
  }

  return (
    <>
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={ASSISTANT_NAME}
          className="fixed right-4 bottom-[5.75rem] z-50 flex w-[min(100vw-2rem,26rem)] flex-col overflow-hidden rounded-md border border-neutral-border bg-neutral shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] sm:right-6 sm:bottom-[6.25rem]"
          style={{ height: "min(34rem, calc(100dvh - 8rem))" }}
        >
          <header className="flex items-center gap-3 border-b border-neutral-border bg-secondary px-4 py-3">
            <AssistantAvatar size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm text-neutral">{ASSISTANT_NAME}</p>
              <p className="flex items-center gap-1.5 truncate text-xs text-neutral/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Online · answers from nebco.com.np
              </p>
            </div>
            <button
              type="button"
              onClick={() => void resetChat()}
              className="text-xs text-neutral/70 transition-colors hover:text-neutral"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-neutral/80 transition-colors hover:bg-neutral/10 hover:text-neutral"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div ref={messagesRef} data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {loadingKnowledge && messages.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <AssistantAvatar size="sm" />
                <span>Getting the latest info...</span>
              </div>
            ) : null}

            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn("flex gap-2", message.role === "user" ? "justify-end" : "justify-start")}
              >
                {message.role === "assistant" ? <AssistantAvatar size="sm" className="mt-0.5" /> : null}
                <div className={cn("max-w-[85%]", message.role === "user" && "order-first")}>
                  <div
                    className={cn(
                      "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                      message.role === "assistant"
                        ? "rounded-tl-sm bg-neutral-muted/90 text-secondary"
                        : "rounded-tr-sm bg-primary text-neutral",
                    )}
                  >
                    {message.text}
                    {message.links?.length ? (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {message.links.map((link) =>
                          isExternalActionLink(link.href) ? (
                            <a
                              key={link.href}
                              href={link.href}
                              className="inline-flex rounded-full border border-primary/20 bg-neutral px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/5"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="inline-flex rounded-full border border-primary/20 bg-neutral px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/5"
                              onClick={() => setOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ),
                        )}
                      </div>
                    ) : null}
                  </div>

                  {message.role === "assistant" &&
                  index === lastAssistantIndex &&
                  !typing &&
                  message.suggestions?.length &&
                  !bookingActive ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {message.suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => void handleUserMessage(suggestion)}
                          className="rounded-full border border-neutral-border bg-neutral px-2.5 py-1 text-[11px] font-medium text-secondary transition-colors hover:border-primary/30 hover:text-primary"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {typing ? (
              <div className="flex items-center gap-2">
                <AssistantAvatar size="sm" />
                <div className="rounded-2xl rounded-tl-sm bg-neutral-muted/90 px-3.5 py-3">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted/60 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted/60 [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted/60 [animation-delay:240ms]" />
                  </div>
                </div>
              </div>
            ) : null}

            {knowledge && !bookingActive && messages.length <= 1 ? (
              <div className="flex flex-wrap gap-2 pl-10">
                {knowledge.quickTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => void handleTopic(topic.id, knowledge)}
                    className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-accent hover:bg-accent/20"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            ) : null}

            {bookingActive && knowledge ? (
              <div className="ml-10 space-y-3 rounded-md border border-neutral-border bg-neutral-muted/40 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-wide text-accent uppercase">Schedule meeting</p>
                  <button type="button" onClick={() => void cancelBooking()} className="text-xs text-text-muted hover:text-primary">
                    Cancel
                  </button>
                </div>

                {bookingStep === "division" ? (
                  <div className="space-y-2">
                    {knowledge.divisions.map((division) => (
                      <button
                        key={division.slug}
                        type="button"
                        onClick={() => {
                          setBookingDraft((current) => ({
                            ...current,
                            division: division.slug as VerticalBookingSlug,
                            divisionName: division.name,
                          }));
                          setBookingStep("purpose");
                          void reply(formatBookingProgress("division", `${division.name} selected.`));
                        }}
                        className="w-full rounded-sm border border-neutral-border bg-neutral px-3 py-2 text-left text-sm text-secondary transition-colors hover:border-primary/30"
                      >
                        <span className="font-medium">{division.name}</span>
                        <span className="mt-0.5 block text-xs text-text-muted">{division.tagline}</span>
                      </button>
                    ))}
                  </div>
                ) : null}

                {bookingStep === "purpose" && selectedDivision ? (
                  <div className="space-y-2">
                    {selectedDivision.purposes.map((purpose) => (
                      <button
                        key={purpose}
                        type="button"
                        onClick={() => {
                          setBookingDraft((current) => ({ ...current, purpose }));
                          setBookingStep("date");
                          void reply(formatBookingProgress("purpose"));
                        }}
                        className="w-full rounded-sm border border-neutral-border bg-neutral px-3 py-2 text-left text-xs text-secondary transition-colors hover:border-primary/30 sm:text-sm"
                      >
                        {purpose}
                      </button>
                    ))}
                  </div>
                ) : null}

                {bookingStep === "date" ? (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-medium text-secondary">{monthLabel}</p>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => setViewMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-neutral-border text-secondary hover:border-accent/50"
                          aria-label="Previous month"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-neutral-border text-secondary hover:border-accent/50"
                          aria-label="Next month"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-text-muted uppercase">
                      {WEEKDAYS.map((day) => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>
                    <div className="mt-1 grid grid-cols-7 gap-1">
                      {monthCells.map((date, index) => {
                        if (!date) return <span key={`empty-${index}`} aria-hidden="true" />;
                        const selectable = isDateSelectable(date);
                        const selected = bookingDraft.dateKey === toDateKey(date);
                        return (
                          <button
                            key={toDateKey(date)}
                            type="button"
                            disabled={!selectable}
                            onClick={() => {
                              const dateKey = toDateKey(date);
                              setBookingDraft((current) => ({
                                ...current,
                                dateKey,
                                dateLabel: formatDateLabel(dateKey),
                              }));
                              setBookingStep("time");
                              void reply(formatBookingProgress("date"));
                            }}
                            className={cn(
                              "aspect-square rounded-sm text-xs font-medium transition-colors",
                              selectable ? "text-secondary hover:bg-accent/15" : "cursor-not-allowed text-text-muted/40",
                              selected && "bg-primary text-neutral",
                            )}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                {bookingStep === "time" ? (
                  <div className="grid grid-cols-3 gap-1.5">
                    {verticalTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setBookingDraft((current) => ({ ...current, time: slot }));
                          setBookingStep("details");
                          void reply(formatBookingProgress("time"));
                        }}
                        className={cn(
                          "rounded-sm border px-1 py-1.5 text-[10px] font-medium transition-colors sm:text-xs",
                          bookingDraft.time === slot
                            ? "border-primary bg-primary text-neutral"
                            : "border-neutral-border bg-neutral text-secondary hover:border-accent/50",
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                ) : null}

                {bookingStep === "details" ? (
                  <form
                    className="space-y-2"
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (!bookingDraft.name || !bookingDraft.email || !bookingDraft.phone) return;
                      setBookingStep("confirm");
                      void reply(formatBookingProgress("confirm"));
                    }}
                  >
                    <input
                      required
                      value={bookingDraft.name}
                      onChange={(event) => setBookingDraft((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Full name *"
                      className="w-full rounded-sm border border-neutral-border bg-neutral px-3 py-2 text-sm text-secondary focus:border-primary focus:outline-none"
                    />
                    <input
                      required
                      type="email"
                      value={bookingDraft.email}
                      onChange={(event) => setBookingDraft((current) => ({ ...current, email: event.target.value }))}
                      placeholder="Email *"
                      className="w-full rounded-sm border border-neutral-border bg-neutral px-3 py-2 text-sm text-secondary focus:border-primary focus:outline-none"
                    />
                    <input
                      required
                      type="tel"
                      value={bookingDraft.phone}
                      onChange={(event) => setBookingDraft((current) => ({ ...current, phone: event.target.value }))}
                      placeholder="Phone *"
                      className="w-full rounded-sm border border-neutral-border bg-neutral px-3 py-2 text-sm text-secondary focus:border-primary focus:outline-none"
                    />
                    <textarea
                      value={bookingDraft.notes}
                      onChange={(event) => setBookingDraft((current) => ({ ...current, notes: event.target.value }))}
                      placeholder="Project notes (optional)"
                      rows={2}
                      className="w-full resize-none rounded-sm border border-neutral-border bg-neutral px-3 py-2 text-sm text-secondary focus:border-primary focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-sm bg-primary px-3 py-2 text-sm font-medium text-neutral transition-colors hover:bg-primary/90"
                    >
                      Review booking
                    </button>
                  </form>
                ) : null}

                {bookingStep === "confirm" ? (
                  <div className="space-y-2 text-sm text-secondary">
                    <p className="rounded-sm border border-neutral-border bg-neutral p-3 text-xs leading-relaxed sm:text-sm">
                      <strong>{bookingDraft.divisionName}</strong>
                      <br />
                      {bookingDraft.dateLabel}
                      <br />
                      {bookingDraft.time}
                      <br />
                      {bookingDraft.purpose}
                      <br />
                      {bookingDraft.name} · {bookingDraft.email} · {bookingDraft.phone}
                    </p>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => void submitBooking()}
                      className="w-full rounded-sm bg-primary px-3 py-2 text-sm font-medium text-neutral transition-colors hover:bg-primary/90 disabled:opacity-60"
                    >
                      {submitting ? "Submitting..." : "Confirm booking"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingStep("details")}
                      className="w-full rounded-sm border border-neutral-border px-3 py-2 text-sm text-secondary hover:border-primary/30"
                    >
                      Edit details
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <form
            className="border-t border-neutral-border p-3"
            onSubmit={(event) => {
              event.preventDefault();
              void handleUserMessage(input);
            }}
          >
            <label htmlFor={inputId} className="sr-only">
              Message {ASSISTANT_NAME}
            </label>
            <div className="flex gap-2">
              <input
                id={inputId}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={bookingActive ? "Type a division, or cancel..." : "Ask me anything about NEBCO..."}
                disabled={!knowledge || loadingKnowledge || typing}
                className="min-w-0 flex-1 rounded-full border border-neutral-border bg-neutral px-4 py-2.5 text-sm text-secondary focus:border-primary focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || !knowledge || loadingKnowledge || typing}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-neutral transition-colors hover:bg-primary/90 disabled:opacity-50"
                aria-label="Send message"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "group fixed right-4 bottom-4 z-50 flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full border-2 border-accent/40 bg-secondary text-neutral shadow-[0_14px_36px_-14px_rgba(0,0,0,0.55)] transition-[transform,box-shadow] duration-300 hover:scale-105 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:right-6 sm:bottom-6",
          open && "scale-95",
        )}
        title={ASSISTANT_NAME}
      >
        <span className="sr-only">
          {open ? "Close" : "Open"} {ASSISTANT_NAME}
        </span>
        {open ? (
          <svg className="h-5 w-5 text-neutral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <>
            <AssistantLauncherIcon className="h-8 w-8 text-neutral" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-neutral ring-2 ring-neutral">
              1
            </span>
          </>
        )}
      </button>
    </>
  );
}
