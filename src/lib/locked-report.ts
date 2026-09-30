import { cookies } from "next/headers";
import type { Locale, LockedReportContent, TahsildarReportContent } from "@/types/content";
import { getLockedClient } from "@/content/locked/clients";
import { lockedCookieName, lockedLangCookieName, verifyLockedCookie } from "@/lib/locked-auth";

export const LOCKED_NEUTRAL_TITLE = "fspark9 · Private report";

export async function resolveLockedState(client: string, searchLang: string | undefined) {
  const cookieStore = await cookies();
  const authed = verifyLockedCookie(client, cookieStore.get(lockedCookieName(client))?.value);
  const langCookie = cookieStore.get(lockedLangCookieName(client))?.value;
  // Only the client's own languages count: on a single-language report
  // (Tahsildar) ?lang=en and a stray language cookie do nothing.
  const locales: readonly string[] = getLockedClient(client)?.locales ?? [];
  const lang: Locale | null =
    (searchLang === "tr" || searchLang === "en") && locales.includes(searchLang)
      ? searchLang
      : (langCookie === "tr" || langCookie === "en") && locales.includes(langCookie)
        ? langCookie
        : null;
  return { authed, lang };
}

// One case per client slug — each client's content module lives in its own
// folder (src/content/locked/<slug>/), so this is the one place that has
// to grow when a new client is added. Content lives directly in this repo
// (not a separate private submodule) since it's sourced from public data.
export async function loadLockedReportData(client: string, lang: Locale) {
  if (client === "fuzul") {
    const [{ fuzulReportTr }, { fuzulReportEn }, data] = await Promise.all([
      import("@/content/locked/fuzul/tr"),
      import("@/content/locked/fuzul/en"),
      import("@/content/locked/fuzul/data"),
    ]);
    const content: LockedReportContent = lang === "tr" ? fuzulReportTr : fuzulReportEn;
    return { content, banks: data.BANKS, total: data.TOTAL, rates: data.RATES, refs: data.REFS };
  }
  return null;
}

// Tahsildar has its own report shape (TR only, own components under
// src/components/locked/tahsildar/), so it gets its own loader rather than
// widening loadLockedReportData's Fuzul-specific return type.
export async function loadTahsildarReport(): Promise<TahsildarReportContent> {
  const { tahsildarReportTr } = await import("@/content/locked/tahsildar/tr");
  return tahsildarReportTr;
}
