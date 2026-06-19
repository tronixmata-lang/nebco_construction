import { jwtVerify, SignJWT } from "jose";

const COOKIE_NAME = "nebco_admin_session";

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: "superadmin" | "editor";
};

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  return new TextEncoder().encode(secret);
}

const SESSION_DURATION = 60 * 60 * 24 * 7;

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export { SESSION_DURATION, COOKIE_NAME };
