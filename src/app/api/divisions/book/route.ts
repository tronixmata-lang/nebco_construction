import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getVerticalBookingPurposes,
  verticalTimeSlots,
  type VerticalBookingSlug,
} from "@/config/vertical-booking";
import { connectDB } from "@/lib/db/connect";
import { ContactInquiry } from "@/lib/db/models";
import { mapDbError } from "@/lib/db/api-errors";

const divisionLabels: Record<VerticalBookingSlug, string> = {
  construction: "NEBCO Construction",
  investment: "NEBCO Investment",
  consulting: "NEBCO Consulting",
};

const bookingSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    division: z.string().min(2).max(60),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.enum(verticalTimeSlots),
    purpose: z.string().min(3),
    notes: z.string().max(1000).optional(),
  })
  .superRefine((data, ctx) => {
    const allowedPurposes = getVerticalBookingPurposes(data.division);
    if (!allowedPurposes.includes(data.purpose)) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid consultation purpose for this vertical.",
        path: ["purpose"],
      });
    }
  });

function formatBookingDate(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const { name, email, phone, division, date, time, purpose, notes } = parsed.data;
    const divisionLabel =
      divisionLabels[division as VerticalBookingSlug] ?? `NEBCO ${division}`;
    const formattedDate = formatBookingDate(date);
    const message = [
      `${divisionLabel} consultation booking request`,
      "",
      `Vertical: ${divisionLabel}`,
      `Preferred date: ${formattedDate}`,
      `Preferred time: ${time}`,
      `Purpose: ${purpose}`,
      notes ? `Additional notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const inquiry = {
      name,
      email,
      phone,
      subject: `${divisionLabel} Booking - ${purpose}`,
      message,
    };

    await connectDB();
    await ContactInquiry.create(inquiry);

    void import("@/lib/email/send-inquiry-notification").then(({ sendInquiryNotification }) =>
      sendInquiryNotification(inquiry),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    const mapped = mapDbError(error, "Failed to submit booking request.");
    return NextResponse.json({ error: mapped.message }, { status: mapped.status });
  }
}
