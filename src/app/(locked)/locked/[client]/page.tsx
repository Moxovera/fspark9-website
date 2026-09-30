import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";
import { getLockedClient } from "@/content/locked/clients";
import { LockedGate } from "@/components/locked/LockedGate";
import { Report } from "@/components/locked/report/Report";
import { TahsildarReport } from "@/components/locked/tahsildar/TahsildarReport";
import { LOCKED_NEUTRAL_TITLE, resolveLockedState, loadLockedReportData, loadTahsildarReport } from "@/lib/locked-report";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ client: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { client } = await params;
  const config = getLockedClient(client);
  if (!config) return { title: LOCKED_NEUTRAL_TITLE };

  const { lang: searchLang } = await searchParams;
  const { authed, lang } = await resolveLockedState(client, searchLang);
  const activeLang = lang ?? config.defaultLocale;

  return {
    // Real title only once unlocked, in the active language — never sent
    // to link-preview crawlers (they never carry the unlock cookie, so
    // they always see this generated for the locked branch anyway) and
    // never rendered while the gate is showing (see acceptance check #1).
    title: authed ? (config.title[activeLang] ?? LOCKED_NEUTRAL_TITLE) : LOCKED_NEUTRAL_TITLE,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
    openGraph: { title: LOCKED_NEUTRAL_TITLE, description: undefined, images: [] },
    twitter: { title: LOCKED_NEUTRAL_TITLE, description: undefined },
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
  const { authed, lang } = await resolveLockedState(client, searchLang);
  const activeLang: Locale = lang ?? config.defaultLocale;

  if (!authed) {
    return (
      <LockedGate
        client={client}
        initialLang={activeLang}
        gate={config.gate}
        locales={config.locales}
        returnPath={`/locked/${client}`}
      />
    );
  }

  if (client === "tahsildar") {
    return <TahsildarReport content={await loadTahsildarReport()} />;
  }

  const data = await loadLockedReportData(client, activeLang);
  if (!data) notFound();

  return <Report client={client} lang={activeLang} content={data.content} banks={data.banks} total={data.total} rates={data.rates} refs={data.refs} />;
}
