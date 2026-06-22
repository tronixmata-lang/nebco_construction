import { cookies } from "next/headers";
import { signSessionToken, verifySessionToken, SESSION_DURATION, COOKIE_NAME, type SessionPayload } from "./jwt";

export type { SessionPayload };

export async function createSession(payload: SessionPayload): Promise<string> {
  return signSessionToken(payload);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  return verifySessionToken(token);
}

function useSecureCookies() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (siteUrl.startsWith("https://")) return true;
  if (siteUrl.startsWith("http://")) return false;
  return process.env.NODE_ENV === "production";
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: useSecureCookies(),
    sameSite: "lax" as const,
    maxAge: SESSION_DURATION,
    path: "/",
  };
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, getSessionCookieOptions());
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