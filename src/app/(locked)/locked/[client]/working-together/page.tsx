import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/content";
import { getLockedClient } from "@/content/locked/clients";
import { LockedGate } from "@/components/locked/LockedGate";
import { WorkingTogether } from "@/components/locked/report/WorkingTogether";
import { LOCKED_NEUTRAL_TITLE, resolveLockedState, loadLockedReportData } from "@/lib/locked-report";

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
  const data = authed ? await loadLockedReportData(client, activeLang) : null;

  return {
    title: data ? data.content.workingTogether.pageTitle : LOCKED_NEUTRAL_TITLE,
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

export default async function WorkingTogetherPage({
  params,
  searchParams,
}: {
  params: Promise<{ client: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { client } = await params;
  const config = getLockedClient(client);
  if (!config) {
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
        returnPath={`/locked/${client}/working-together`}
      />
    );
  }

  const data = await loadLockedReportData(client, activeLang);
  if (!data) notFound();

  return <WorkingTogether client={client} lang={activeLang} content={data.content} />;
}
