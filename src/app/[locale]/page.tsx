import type { Metadata } from "next";
import HomeScrollMemory from "@/components/ui/HomeScrollMemory";
import HomeOpening from "@/components/home/HomeOpening";
import StartWhereYouAre from "@/components/home/StartWhereYouAre";
import FourServices from "@/components/home/FourServices";
import HomeWork from "@/components/home/HomeWork";
import WithMe from "@/components/home/WithMe";
import SparkCards from "@/components/home/SparkCards";
import NextStep from "@/components/blocks/NextStep";
import { home } from "@/content/home";
import { services, nextStep } from "@/content/chrome";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, toSiteSeo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult } from "@/sanity/types";
import { toMetadata } from "@/lib/metadata";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/types/content";

// v2 ana sayfa (brief v4 §7.2). Metin src/content/home.ts'ten, Sanity
// pass'e kadar statik. Sanity'den sadece site geneli OG görseli okunuyor.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteSeoResult = await sanityFetch<SITE_SEO_QUERYResult>({
    query: SITE_SEO_QUERY,
    params: { locale },
    tags: ["siteSettings"],
  });
  const paths = { en: getPathname({ href: "/", locale: "en" }), tr: getPathname({ href: "/", locale: "tr" }) };
  return toMetadata(home[locale].seo, toSiteSeo(siteSeoResult), locale, paths);
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const content = home[locale];

  return (
    <main>
      <HomeScrollMemory locale={locale} />
      <HomeOpening content={content.opening} />
      <StartWhereYouAre content={content.startWhereYouAre} />
      <FourServices content={content.fourServices} services={services[locale]} />
      <HomeWork content={content.work} />
      <WithMe content={content.withMe} />
      <SparkCards content={content.spark} />
      <NextStep content={nextStep[locale]} numbered />
    </main>
  );
}
