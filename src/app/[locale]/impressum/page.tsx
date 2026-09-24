import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonLd";
import LegalPageView from "@/components/subpages/LegalPageView";
import { chrome } from "@/content/chrome";
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
import { legalSeo } from "@/content/seo";
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
      params: { locale, slug: "impressum" },
      tags: ["legalPage:impressum"],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);

  const paths = { en: getPathname({ href: "/impressum", locale: "en" }), tr: getPathname({ href: "/impressum", locale: "tr" }) };

  // Copy §6c başlığı; Sanity alanı boşsa bile doğru başlık çıkıyor.
  const seo = { ...toLegalPageSeo(seoResult), ...legalSeo[locale === "tr" ? "tr" : "en"].impressum };
  return toMetadata(seo, toSiteSeo(siteSeoResult), locale, paths);
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const result = await sanityFetch<LEGAL_PAGE_QUERYResult>({
    query: LEGAL_PAGE_QUERY,
    params: { locale, slug: "impressum" },
    tags: ["legalPage:impressum"],
  });
  const page = toLegalPage(result);

  const loc = locale === "tr" ? "tr" : "en";
  const legal = chrome[loc].legal;
  const tab = legal.tabs.find((t) => t.href === "/impressum");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(loc, [{ name: tab?.label ?? page.hero.title, path: getPathname({ href: "/impressum", locale: loc }) }])} />
      <LegalPageView page={page} legal={legal} current="/impressum" />
    </>
  );
}
