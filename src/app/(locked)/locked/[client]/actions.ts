"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Locale } from "@/types/content";
import { getLockedClient } from "@/content/locked/clients";
import {
  lockedCookieName,
  lockedLangCookieName,
  signLockedCookie,
  verifyLockedPassword,
} from "@/lib/locked-auth";

export interface UnlockState {
  error: boolean;
}

const THIRTY_DAYS = 60 * 60 * 24 * 30;
const ONE_YEAR = 60 * 60 * 24 * 365;

// Returns a plain boolean rather than translated text: the gate's error
// copy lives once, in clients.ts's per-client `gate` content, and the
// client component (LockedGate) maps this flag to that text so the string
// isn't duplicated between a content file and a server action.
export async function unlockAction(
  client: string,
  _prevState: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const config = getLockedClient(client);
  if (!config) {
    return { error: true };
  }

  const submitted = String(formData.get("password") ?? "");
  const ok = verifyLockedPassword(config.passwordEnv, submitted);

  if (!ok) {
    // Fixed delay so a wrong guess doesn't leak timing information beyond
    // the constant-time compare in verifyLockedPassword.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: true };
  }

  const cookieStore = await cookies();
  cookieStore.set(lockedCookieName(client), signLockedCookie(client), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: `/locked/${client}`,
    maxAge: THIRTY_DAYS,
  });

  redirect(`/locked/${client}`);
}

export async function setLockedLangAction(client: string, lang: Locale) {
  const config = getLockedClient(client);
  if (!config) return;

  const cookieStore = await cookies();
  cookieStore.set(lockedLangCookieName(client), lang, {
    path: `/locked/${client}`,
    maxAge: ONE_YEAR,
  });
}
