import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db/connect";
import { User } from "@/lib/db/models";
import { verifyPassword } from "@/lib/auth/password";
import { COOKIE_NAME } from "@/lib/auth/jwt";
import { createSession, getSessionCookieOptions } from "@/lib/auth/session";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: parsed.data.email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const valid = await verifyPassword(parsed.data.password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    if (user.isActive === false) {
      return NextResponse.json({ error: "This account has been deactivated" }, { status: 403 });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = await createSession({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set(COOKIE_NAME, token, getSessionCookieOptions());
    return response;
  } catch (error) {
    console.error("[auth/login]", error);

    if (error instanceof Error) {
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          { error: "Database is not configured. Set MONGODB_URI in .env.local on the server." },
          { status: 500 },
        );
      }
      if (error.message.includes("JWT_SECRET")) {
        return NextResponse.json(
          { error: "Auth is not configured. Set JWT_SECRET in .env.local on the server." },
          { status: 500 },
        );
      }
      if (error.message.includes("ECONNREFUSED") || error.message.includes("MongoServerSelectionError")) {
        return NextResponse.json(
          { error: "Cannot connect to MongoDB. Check that mongod is running on the server." },
          { status: 500 },
        );
      }
    }

    const message =
      process.env.NODE_ENV === "development" && error instanceof Error
        ? error.message
        : "Login failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
