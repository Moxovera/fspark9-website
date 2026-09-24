import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonLd";
import HomeScrollMemory from "@/components/ui/HomeScrollMemory";
import HomeOpening from "@/components/home/HomeOpening";
import StartWhereYouAre from "@/components/home/StartWhereYouAre";
import FourServices from "@/components/home/FourServices";
import HomeWork from "@/components/home/HomeWork";
import WithMe from "@/components/home/WithMe";
import SparkCards from "@/components/home/SparkCards";
import NextStep from "@/components/blocks/NextStep";
import { getChrome, getHome } from "@/sanity/lib/content";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, toSiteSeo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult } from "@/sanity/types";
import { toMetadata } from "@/lib/metadata";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/types/content";

// v2 ana sayfa (brief v4 §7.2). İçerik Sanity homePage, servicePage ve
// sparkEpisode belgelerinden.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [siteSeoResult, home] = await Promise.all([
    sanityFetch<SITE_SEO_QUERYResult>({ query: SITE_SEO_QUERY, params: { locale }, tags: ["siteSettings"] }),
    getHome(),
  ]);
  const paths = { en: getPathname({ href: "/", locale: "en" }), tr: getPathname({ href: "/", locale: "tr" }) };
  return toMetadata(home[locale].seo, toSiteSeo(siteSeoResult), locale, paths);
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const [home, site] = await Promise.all([getHome(), getChrome()]);
  const content = home[locale];
  const { chrome, services, nextStep } = site[locale];

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(locale, chrome, [])} />
      <HomeScrollMemory locale={locale} />
      <HomeOpening content={content.opening} />
      <StartWhereYouAre content={content.startWhereYouAre} />
      <FourServices content={content.fourServices} services={services} />
      <HomeWork content={content.work} />
      <WithMe content={content.withMe} />
      <SparkCards content={content.spark} />
      <NextStep content={nextStep} numbered />
    </main>
  );
}
