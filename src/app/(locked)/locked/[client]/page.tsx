import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";
import { getLockedClient } from "@/content/locked/clients";
import { lockedCookieName, lockedLangCookieName, verifyLockedCookie } from "@/lib/locked-auth";
import { LockedGate } from "@/components/locked/LockedGate";

const NEUTRAL_TITLE = "fspark9 · Private report";

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

  // Phase 2 replaces this with the ported report (ReportTopBar, ReportHero,
  // ReportSummary, chapters, charts...) built from src/content/locked/fuzul/*
  // (private submodule). This placeholder only proves the gate + cookie +
  // routing + indexing skeleton end to end.
  return (
    <main className="wrap" style={{ paddingBlock: 64 }}>
      <p className="eyebrow">fspark9 · locked</p>
      <h1>{config.title[activeLang]}</h1>
      <p className="lede">
        {activeLang === "tr"
          ? "Kilit açıldı. Rapor içeriği bir sonraki aşamada eklenecek."
          : "Unlocked. Report content is added in the next phase."}
      </p>
    </main>
  );
}
