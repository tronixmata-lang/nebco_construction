"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");

    // Placeholder: wire to API route / email service in CMS phase
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFormState("success");
  }

  if (formState === "success") {
    return (
      <div className="rounded-sm border border-primary/20 bg-primary/5 p-8 text-center">
        <p className="font-display text-xl font-bold text-secondary">
          Thank you for your inquiry
        </p>
        <p className="mt-2 text-text-muted">
          Our team will review your message and respond within 2 business days.
        </p>
        <button
          type="button"
          onClick={() => setFormState("idle")}
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Full Name" name="name" required />
        <FormField label="Email Address" name="email" type="email" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Phone Number" name="phone" type="tel" />
        <FormField label="Organization" name="organization" />
      </div>
      <div>
        <label
          htmlFor="division"
          className="mb-2 block text-sm font-medium text-secondary"
        >
          Division of Interest
        </label>
        <select
          id="division"
          name="division"
          className="w-full rounded-sm border border-neutral-border bg-neutral px-4 py-3 text-sm text-secondary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Select a division</option>
          <option value="construction">NEBCO Construction / Homes</option>
          <option value="investment">NEBCO Investment</option>
          <option value="consulting">NEBCO Consulting & Design</option>
          <option value="general">General Inquiry</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-secondary"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-y rounded-sm border border-neutral-border bg-neutral px-4 py-3 text-sm text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Tell us about your project or inquiry..."
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={formState === "submitting"}
      >
        {formState === "submitting" ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}

function FormField({
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
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-secondary"
      >
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-neutral-border bg-neutral px-4 py-3 text-sm text-secondary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
