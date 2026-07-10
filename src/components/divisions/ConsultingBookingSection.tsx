"use client";

import { ChevronLeft, ChevronRight, CalendarDays, Clock3, Target } from "lucide-react";
import { useMemo, useState } from "react";
import {
  getVerticalBookingPurposes,
  verticalTimeSlots,
  type VerticalTimeSlot,
} from "@/config/vertical-booking";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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

  for (let i = 0; i < leadingEmpty; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  return cells;
}

type DivisionBookingSectionProps = {
  divisionSlug: string;
  divisionName: string;
};

export function DivisionBookingSection({
  divisionSlug,
  divisionName,
}: DivisionBookingSectionProps) {
  const purposes = getVerticalBookingPurposes(divisionSlug);
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<VerticalTimeSlot | "">("");
  const [purpose, setPurpose] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const monthLabel = viewMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const monthCells = useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);

  function goToPreviousMonth() {
    setViewMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1));
  }

  function goToNextMonth() {
    setViewMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
  }

  function isDateSelectable(date: Date): boolean {
    return !isPastDate(date, today) && !isSunday(date);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedDate || !selectedTime || !purpose) {
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
          date: toDateKey(selectedDate),
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
    setSelectedDate(null);
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
      <div className="mx-auto max-w-2xl rounded-sm border border-primary/20 bg-primary/5 p-8 text-center">
        <p className="font-display text-2xl text-secondary">Consultation Request Received</p>
        <p className="mt-3 text-text-muted">
          Thank you. Our {divisionName} team will confirm your preferred date and time within 1-2
          business days.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Book another consultation
        </button>
      </div>
    );
  }

  return (
    <div>
      <ScrollReveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Schedule a Session</p>
        <h2 className="mt-3 font-display text-2xl text-secondary sm:text-3xl">Book a Consultation</h2>
        <p className="mt-4 text-base text-text-muted">
          Choose your preferred date, time, and consultation purpose. Our team will follow up to confirm
          availability.
        </p>
      </ScrollReveal>

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          <div className="rounded-sm border border-neutral-border bg-neutral p-5 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.12)] sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-secondary">
                <CalendarDays className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="font-display text-lg">Select a Date</h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-neutral-border text-secondary transition-colors hover:border-accent/50 hover:text-primary"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-neutral-border text-secondary transition-colors hover:border-accent/50 hover:text-primary"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mb-4 text-center font-display text-base text-secondary">{monthLabel}</p>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold tracking-wide text-text-muted uppercase">
              {WEEKDAYS.map((day) => (
                <span key={day} className="py-2">
                  {day}
                </span>
              ))}
            </div>

            <div className="mt-1 grid grid-cols-7 gap-1">
              {monthCells.map((date, index) => {
                if (!date) {
                  return <span key={`empty-${index}`} aria-hidden="true" />;
                }

                const selectable = isDateSelectable(date);
                const selected = selectedDate ? isSameDay(date, selectedDate) : false;

                return (
                  <button
                    key={toDateKey(date)}
                    type="button"
                    disabled={!selectable}
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      "aspect-square rounded-sm text-sm font-medium transition-colors",
                      selectable
                        ? "text-secondary hover:bg-accent/15 hover:text-secondary"
                        : "cursor-not-allowed text-text-muted/45",
                      selected && "bg-primary text-neutral hover:bg-primary hover:text-neutral",
                      !selected &&
                        selectable &&
                        isSameDay(date, today) &&
                        "ring-1 ring-accent/70 ring-inset",
                    )}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-text-muted">
              Sundays and past dates are unavailable. Consultations are confirmed by our team after
              submission.
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-sm border border-neutral-border bg-neutral p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-secondary">
                <Clock3 className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="font-display text-lg">Choose a Time</h3>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {verticalTimeSlots.map((slot) => {
                  const active = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={cn(
                        "rounded-sm border px-2 py-2 text-xs font-medium transition-colors sm:text-sm",
                        active
                          ? "border-primary bg-primary text-neutral"
                          : "border-neutral-border bg-neutral-muted/40 text-secondary hover:border-accent/50",
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-sm border border-neutral-border bg-neutral p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-secondary">
                <Target className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="font-display text-lg">Consultation Purpose</h3>
              </div>
              <select
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                required
                className="w-full rounded-sm border border-neutral-border bg-neutral px-4 py-3 text-sm text-secondary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select a purpose</option>
                {purposes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-sm border border-neutral-border bg-neutral p-5 sm:p-6">
              <h3 className="font-display text-lg text-secondary">Your Details</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <BookingField
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={setName}
                  required
                />
                <BookingField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  required
                />
              </div>
              <div className="mt-4">
                <BookingField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="booking-notes" className="mb-2 block text-sm font-medium text-secondary">
                  Additional Notes <span className="text-text-muted">(optional)</span>
                </label>
                <textarea
                  id="booking-notes"
                  name="notes"
                  rows={3}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Share project context, location, or questions..."
                  className="w-full resize-y rounded-sm border border-neutral-border bg-neutral px-4 py-3 text-sm text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {formState === "error" && (
          <p className="mt-6 rounded-sm border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
            Please select a date, time, and purpose, then complete all required contact fields.
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button type="submit" size="lg" disabled={formState === "submitting"}>
            {formState === "submitting" ? "Submitting..." : "Request Consultation"}
          </Button>
          {selectedDate && selectedTime && purpose ? (
            <p className="text-sm text-text-muted">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              at {selectedTime} · {purpose}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}

/** @deprecated Use DivisionBookingSection */
export const ConsultingBookingSection = DivisionBookingSection;

function BookingField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-secondary">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="w-full rounded-sm border border-neutral-border bg-neutral px-4 py-3 text-sm text-secondary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
