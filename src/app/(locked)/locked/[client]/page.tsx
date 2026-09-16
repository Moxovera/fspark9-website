import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { Locale, LockedReportContent } from "@/types/content";
import { getLockedClient } from "@/content/locked/clients";
import { lockedCookieName, lockedLangCookieName, verifyLockedCookie } from "@/lib/locked-auth";
import { LockedGate } from "@/components/locked/LockedGate";
import { Report } from "@/components/locked/report/Report";

const NEUTRAL_TITLE = "fspark9 · Private report";

// One case per client slug — each client's content module lives in its own
// private submodule folder (src/content/locked/<slug>/), so this is the
// one place that has to grow when a new client is added.
async function loadReportData(client: string, lang: Locale) {
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

async function resolveState(client: string, searchLang: string | undefined) {
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

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ client: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { client } = await params;
  const config = getLockedClient(client);
  if (!config) return { title: NEUTRAL_TITLE };

  const { lang: searchLang } = await searchParams;
  const { authed, lang } = await resolveState(client, searchLang);
  const activeLang = lang ?? config.defaultLocale;

  return {
    // Real title only once unlocked, in the active language — never sent
    // to link-preview crawlers (they never carry the unlock cookie, so
    // they always see this generated for the locked branch anyway) and
    // never rendered while the gate is showing (see acceptance check #1).
    title: authed ? config.title[activeLang] : NEUTRAL_TITLE,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
    openGraph: { title: NEUTRAL_TITLE, description: undefined, images: [] },
    twitter: { title: NEUTRAL_TITLE, description: undefined },
  };
}

export default async function LockedClientPage({
  params,
  searchParams,
}: {
  params: Promise<{ client: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { client } = await params;
  const config = getLockedClient(client);
  if (!config) {
    // Unknown client slugs return 404 without revealing which slugs exist —
    // notFound() bubbles to app/global-not-found.tsx (experimental.globalNotFound).
    notFound();
  }

  const { lang: searchLang } = await searchParams;
  const { authed, lang } = await resolveState(client, searchLang);
  const activeLang: Locale = lang ?? config.defaultLocale;

  if (!authed) {
    return <LockedGate client={client} initialLang={activeLang} gate={config.gate} />;
  }

  const data = await loadReportData(client, activeLang);
  if (!data) notFound();

  return <Report client={client} lang={activeLang} content={data.content} banks={data.banks} total={data.total} rates={data.rates} refs={data.refs} />;
}
