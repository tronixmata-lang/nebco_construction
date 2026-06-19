import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { ContactInquiry } from "@/lib/db/models";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
    }

    await connectDB();
    await ContactInquiry.create(parsed.data);

    // Fire-and-forget email notification (don't block the response)
    void import("@/lib/email/send-inquiry-notification").then(({ sendInquiryNotification }) =>
      sendInquiryNotification(parsed.data),
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit inquiry." }, { status: 500 });
  }
}
