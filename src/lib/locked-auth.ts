import { createHmac, timingSafeEqual } from "crypto";

// Cookie value is a static per-client HMAC, not a session token: expiry is
// left entirely to the cookie's own maxAge (see actions.ts). Verifying only
// checks "was this ever signed with our secret for this client".
function sign(client: string, secret: string): string {
  return createHmac("sha256", secret).update(`locked:${client}`).digest("hex");
}

export function signLockedCookie(client: string): string {
  const secret = process.env.LOCKED_COOKIE_SECRET;
  if (!secret) throw new Error("LOCKED_COOKIE_SECRET is not set");
  return sign(client, secret);
}

export function verifyLockedCookie(client: string, cookieValue: string | undefined): boolean {
  const secret = process.env.LOCKED_COOKIE_SECRET;
  if (!secret || !cookieValue) return false;
  const expected = sign(client, secret);
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(cookieValue, "hex");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function verifyLockedPassword(passwordEnv: string, submitted: string): boolean {
  const expected = process.env[passwordEnv];
  if (!expected) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(submitted);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function lockedCookieName(client: string): string {
  return `locked_${client}`;
}

export function lockedLangCookieName(client: string): string {
  return `locked_${client}_lang`;
}
