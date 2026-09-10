"use client";

import { useMemo, useState } from "react";
import {
  getVerticalBookingPurposes,
  verticalTimeSlots,
  type VerticalTimeSlot,
} from "@/config/vertical-booking";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type FormState = "idle" | "submitting" | "success" | "error";

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function isSunday(date: Date): boolean {
  return date.getDay() === 0;
}

type DivisionBookingSectionProps = {
  divisionSlug: string;
  divisionName: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

const fieldClass =
  "w-full rounded-sm border border-neutral-border bg-neutral px-3 py-2.5 text-sm text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export function DivisionBookingSection({
  divisionSlug,
  divisionName,
  eyebrow = "Schedule a Session",
  title = "Book a Consultation",
  description = "Choose your preferred date, time, and consultation purpose. Our team will follow up to confirm availability.",
}: DivisionBookingSectionProps) {
  const purposes = getVerticalBookingPurposes(divisionSlug);
  const today = useMemo(() => toDateKey(new Date()), []);
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<VerticalTimeSlot | "">("");
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selectedDate = parseDateKey(date);
    if (!selectedDate || isSunday(selectedDate) || !selectedTime || !purpose) {
      setFormState("error");
      return;
    }

    setFormState("submitting");

    try {
      const response = await fetch("/api/divisions/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          division: divisionSlug,
          date,
          time: selectedTime,
          purpose,
          notes: notes.trim() || undefined,
        }),
      });

      if (!response.ok) {
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  function resetForm() {
    setDate("");
    setSelectedTime("");
    setPurpose("");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setFormState("idle");
  }

  if (formState === "success") {
    return (
      <div className="mx-auto max-w-md py-8 text-center">
        <p className="font-label text-xs text-accent">Request received</p>
        <h2 className="mt-3 font-display text-2xl text-secondary">We will confirm shortly</h2>
        <p className="mt-3 text-sm text-text-muted">
          Our {divisionName} team will confirm within 1–2 business days.
        </p>
        <button type="button" onClick={resetForm} className="font-label mt-6 text-xs text-primary hover:text-accent">
          Book another consultation
        </button>
      </div>
    );
  }

  return (
    <div>
      <ScrollReveal>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          compact
          showRules={false}
          className="mx-auto mb-3 max-w-4xl md:mb-4"
        />
      </ScrollReveal>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-0 max-w-5xl rounded-sm border border-neutral-border/90 bg-neutral p-4 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.1)] sm:p-5"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="font-label mb-1.5 block text-xs text-text-muted">Date</span>
            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="font-label mb-1.5 block text-xs text-text-muted">Time</span>
            <select
              required
              value={selectedTime}
              onChange={(event) => setSelectedTime(event.target.value as VerticalTimeSlot)}
              className={fieldClass}
            >
              <option value="">Select</option>
              {verticalTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-label mb-1.5 block text-xs text-text-muted">Purpose</span>
            <select
              required
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              className={fieldClass}
            >
              <option value="">Select a purpose</option>
              {purposes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="font-label mb-1.5 block text-xs text-text-muted">Full name</span>
            <input
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="font-label mb-1.5 block text-xs text-text-muted">Email</span>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="font-label mb-1.5 block text-xs text-text-muted">Phone</span>
            <input
              name="phone"
              type="tel"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={fieldClass}
            />
          </label>
        </div>

        <div className="mt-4 grid items-end gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
          <label className="block">
            <span className="font-label mb-1.5 block text-xs text-text-muted">Notes (optional)</span>
            <textarea
              name="notes"
              rows={2}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Site, location, or drawings"
              className={`${fieldClass} resize-none`}
            />
          </label>
          <Button type="submit" className="w-full md:w-auto md:min-w-[12.5rem]" disabled={formState === "submitting"}>
            {formState === "submitting" ? "Submitting..." : "Request Consultation"}
          </Button>
        </div>

        {formState === "error" && (
          <p className="mt-3 text-xs text-primary">Please complete the fields. Sundays are unavailable.</p>
        )}
      </form>
    </div>
  );
}

/** @deprecated Use DivisionBookingSection */
export const ConsultingBookingSection = DivisionBookingSection;
