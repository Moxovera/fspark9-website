import { cookies } from "next/headers";
import type { Locale, LockedReportContent } from "@/types/content";
import { lockedCookieName, lockedLangCookieName, verifyLockedCookie } from "@/lib/locked-auth";

export const LOCKED_NEUTRAL_TITLE = "fspark9 · Private report";

export async function resolveLockedState(client: string, searchLang: string | undefined) {
  const cookieStore = await cookies();
  const authed = verifyLockedCookie(client, cookieStore.get(lockedCookieName(client))?.value);
  const langCookie = cookieStore.get(lockedLangCookieName(client))?.value;
  const lang: Locale | null =
    searchLang === "tr" || searchLang === "en"
      ? searchLang
      : langCookie === "tr" || langCookie === "en"
        ? langCookie
        : null;
  return { authed, lang };
}

// One case per client slug — each client's content module lives in its own
// private submodule folder (src/content/locked/<slug>/), so this is the
// one place that has to grow when a new client is added.
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
