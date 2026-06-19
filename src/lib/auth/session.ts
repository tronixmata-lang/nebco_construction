import { cookies } from "next/headers";
import { signSessionToken, verifySessionToken, SESSION_DURATION, COOKIE_NAME, type SessionPayload } from "./jwt";

export type { SessionPayload };

export async function createSession(payload: SessionPayload): Promise<string> {
  return signSessionToken(payload);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  return verifySessionToken(token);
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export { COOKIE_NAME };