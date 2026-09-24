import type { Metadata } from "next";
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
      params: { locale, slug: "privacy" },
      tags: ["legalPage:privacy"],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);

  const paths = { en: getPathname({ href: "/privacy", locale: "en" }), tr: getPathname({ href: "/privacy", locale: "tr" }) };

  return toMetadata(toLegalPageSeo(seoResult), toSiteSeo(siteSeoResult), locale, paths);
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const result = await sanityFetch<LEGAL_PAGE_QUERYResult>({
    query: LEGAL_PAGE_QUERY,
    params: { locale, slug: "privacy" },
    tags: ["legalPage:privacy"],
  });
  const page = toLegalPage(result);

  return <LegalPageView page={page} legal={chrome[locale === "tr" ? "tr" : "en"].legal} current="/privacy" />;
}
