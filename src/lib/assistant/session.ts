const SESSION_STORAGE_KEY = "nebco-assistant-session";
const GREETING_SENT_KEY = "nebco-assistant-greeting-sent";

export function getAssistantSessionId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const sessionId = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  return sessionId;
}

export function resetAssistantSessionId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const sessionId = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  window.sessionStorage.removeItem(GREETING_SENT_KEY);
  return sessionId;
}

export function shouldSendOpeningGreeting(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(GREETING_SENT_KEY) !== "1";
}

export function markOpeningGreetingSent(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(GREETING_SENT_KEY, "1");
}

export function persistAssistantMessage(
  sessionId: string,
  role: "user" | "assistant",
  text: string,
): void {
  if (!sessionId || !text.trim()) return;

  void fetch("/api/assistant/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      role,
      text: text.trim(),
      pagePath: window.location.pathname,
    }),
  }).catch(() => {
    /* non-blocking */
  });
}
