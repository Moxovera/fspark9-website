import type { Metadata } from "next";
import SubpageHero from "@/components/subpages/SubpageHero";
import LegalBlocks from "@/components/subpages/LegalBlocks";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  LEGAL_PAGE_QUERY,
  toLegalPage,
  LEGAL_PAGE_SEO_QUERY,
  toLegalPageSeo,
} from "@/sanity/lib/queries";
import type { LEGAL_PAGE_QUERYResult, LEGAL_PAGE_SEO_QUERYResult } from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoResult = await sanityFetch<LEGAL_PAGE_SEO_QUERYResult>({
    query: LEGAL_PAGE_SEO_QUERY,
    params: { locale, slug: "terms" },
    tags: ["legalPage:terms"],
  });
  const seo = toLegalPageSeo(seoResult);

  return {
    title: seo.title || "fspark9",
    description: seo.description || "Trust isn't marketed. It's built.",
    ...(seo.noIndex ? { robots: { index: false } } : {}),
    ...(seo.ogImage?.url
      ? { openGraph: { images: [{ url: seo.ogImage.url, alt: seo.ogImage.alt }] } }
      : {}),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const settings = locale === "tr" ? trSettings : enSettings;

  const result = await sanityFetch<LEGAL_PAGE_QUERYResult>({
    query: LEGAL_PAGE_QUERY,
    params: { locale, slug: "terms" },
    tags: ["legalPage:terms"],
  });
  const page = toLegalPage(result);

  return (
    <main>
      <SubpageHero hero={page.hero} backLabel={settings.backLabel} />
      <LegalBlocks blocks={page.blocks} />
    </main>
  );
}
