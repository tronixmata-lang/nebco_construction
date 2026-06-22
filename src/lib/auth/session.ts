import { cookies } from "next/headers";
import { signSessionToken, verifySessionToken, SESSION_DURATION, COOKIE_NAME, type SessionPayload } from "./jwt";

export type { SessionPayload };

export async function createSession(payload: SessionPayload): Promise<string> {
  return signSessionToken(payload);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  return verifySessionToken(token);
}

function shouldUseSecureCookies() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  // Secure cookies only when the public URL is HTTPS (domain or IP with TLS).
  // HTTP access (e.g. http://VPS_IP:3000) must use non-secure cookies or login fails.
  return siteUrl.startsWith("https://");
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: shouldUseSecureCookies(),
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
  cookieStore.set(COOKIE_NAME, "", { ...getSessionCookieOptions(), maxAge: 0 });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export { COOKIE_NAME };