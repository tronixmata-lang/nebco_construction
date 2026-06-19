import { NextResponse } from "next/server";
import { getSession, type SessionPayload } from "./session";

export async function requireAuth(): Promise<
  { session: SessionPayload } | { error: NextResponse }
> {
  const session = await getSession();
  if (!session) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session };
}

export async function requireSuperAdmin(): Promise<
  { session: SessionPayload } | { error: NextResponse }
> {
  const auth = await requireAuth();
  if ("error" in auth) return auth;
  if (auth.session.role !== "superadmin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return auth;
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
