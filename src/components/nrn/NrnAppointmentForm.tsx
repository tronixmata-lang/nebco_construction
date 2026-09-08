"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { nrnExperts, nrnFeatureCategories } from "@/content/nrn";

type FormState = "idle" | "submitting" | "success" | "error";

const TIME_SLOTS = [
  "06:00 to 09:00 NPT",
  "09:00 to 12:00 NPT",
  "12:00 to 16:00 NPT",
  "16:00 to 20:00 NPT",
  "20:00 to 22:00 NPT",
] as const;

const TIMEZONES = [
  "Nepal (NPT)",
  "Gulf (GST / AST)",
  "Europe (GMT / CET)",
  "USA / Canada (ET / PT)",
  "Australia (AEST / AEDT)",
  "Other",
] as const;

const fieldClass =
  "w-full rounded-sm border border-neutral-border bg-neutral px-4 py-3 text-sm text-secondary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export function NrnAppointmentForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [expert, setExpert] = useState("");
  const [topic, setTopic] = useState("");

  const topics = useMemo(
    () => nrnFeatureCategories.find((category) => category.id === "legal")?.features.map((item) => item.title) ?? [],
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setExpert(params.get("expert") ?? "");
    setTopic(params.get("topic") ?? "");
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const timezone = String(formData.get("timezone") ?? "");
    const date = String(formData.get("date") ?? "");
    const slot = String(formData.get("slot") ?? "");
    const notes = String(formData.get("notes") ?? "");
    const selectedExpert = String(formData.get("expert") ?? expert);
    const selectedTopic = String(formData.get("topic") ?? topic);

    const message = [
      "NRN appointment request.",
      `Specialist: ${selectedExpert || "Any available"}`,
      `Topic: ${selectedTopic || "General NRN consult"}`,
      `Preferred date: ${date}`,
      `Preferred time: ${slot}`,
      `Timezone: ${timezone}`,
      notes ? `Notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          subject: "NRN Appointment",
          message,
        }),
      });

      if (!res.ok) {
        setFormState("error");
        return;
      }
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="border border-primary/20 bg-primary/5 px-6 py-10 text-center">
        <p className="font-label text-xs tracking-wider text-accent uppercase">Request received</p>
        <p className="mt-3 font-display text-2xl text-secondary">Your appointment request is in</p>
        <p className="mx-auto mt-3 max-w-md text-text-muted">
          We will confirm a 30-minute slot on WhatsApp or email within two business days, in your timezone.
        </p>
        <button
          type="button"
          onClick={() => setFormState("idle")}
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone / WhatsApp" name="phone" type="tel" required />
        <div>
          <label htmlFor="timezone" className="mb-2 block text-sm font-medium text-secondary">
            Your timezone <span className="text-primary">*</span>
          </label>
          <select id="timezone" name="timezone" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select timezone
            </option>
            {TIMEZONES.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="expert" className="mb-2 block text-sm font-medium text-secondary">
            Specialist
          </label>
          <select
            id="expert"
            name="expert"
            value={expert}
            onChange={(event) => setExpert(event.target.value)}
            className={fieldClass}
          >
            <option value="">Any available specialist</option>
            {nrnExperts.map((person) => (
              <option key={person.name} value={person.name}>
                {person.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="topic" className="mb-2 block text-sm font-medium text-secondary">
            Topic
          </label>
          <select
            id="topic"
            name="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className={fieldClass}
          >
            <option value="">General NRN consult</option>
            {topics.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-medium text-secondary">
            Preferred date <span className="text-primary">*</span>
          </label>
          <input id="date" name="date" type="date" min={today} required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="slot" className="mb-2 block text-sm font-medium text-secondary">
            Preferred time <span className="text-primary">*</span>
          </label>
          <select id="slot" name="slot" required className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select a window
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium text-secondary">
          What should we prepare?
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={`${fieldClass} resize-y`}
          placeholder="Land location, documents you already have, or the decision you need to make."
        />
      </div>
      {formState === "error" && (
        <p className="rounded-sm border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={formState === "submitting"}>
        {formState === "submitting" ? "Sending..." : "Confirm appointment request"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-secondary">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input id={name} name={name} type={type} required={required} className={fieldClass} />
    </div>
  );
}
