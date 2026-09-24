import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonLd";
import LegalPageView from "@/components/subpages/LegalPageView";
import { getChrome } from "@/sanity/lib/content";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  LEGAL_PAGE_QUERY,
  toLegalPage,
  LEGAL_PAGE_SEO_QUERY,
  toLegalPageSeo,
  SITE_SEO_QUERY,
  toSiteSeo,
} from "@/sanity/lib/queries";
import { toMetadata } from "@/lib/metadata";
import { getPathname } from "@/i18n/navigation";
import type {
  LEGAL_PAGE_QUERYResult,
  LEGAL_PAGE_SEO_QUERYResult,
  SITE_SEO_QUERYResult,
} from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [seoResult, siteSeoResult] = await Promise.all([
    sanityFetch<LEGAL_PAGE_SEO_QUERYResult>({
      query: LEGAL_PAGE_SEO_QUERY,
      params: { locale, slug: "cookies" },
      tags: ["legalPage:cookies"],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);

  const paths = { en: getPathname({ href: "/cookies", locale: "en" }), tr: getPathname({ href: "/cookies", locale: "tr" }) };

  return toMetadata(toLegalPageSeo(seoResult), toSiteSeo(siteSeoResult), locale, paths);
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const result = await sanityFetch<LEGAL_PAGE_QUERYResult>({
    query: LEGAL_PAGE_QUERY,
    params: { locale, slug: "cookies" },
    tags: ["legalPage:cookies"],
  });
  const page = toLegalPage(result);

  const loc = locale === "tr" ? "tr" : "en";
  const { chrome } = (await getChrome())[loc];
  const legal = chrome.legal;
  const tab = legal.tabs.find((t) => t.href === "/cookies");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(loc, chrome, [{ name: tab?.label ?? page.hero.title, path: getPathname({ href: "/cookies", locale: loc }) }])} />
      <LegalPageView page={page} legal={legal} current="/cookies" />
    </>
  );
}
