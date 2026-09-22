import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubpageHero from "@/components/subpages/SubpageHero";
import CaseDetail from "@/components/subpages/CaseDetail";
import SubpageClosingCta from "@/components/subpages/SubpageClosingCta";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  CASE_STUDY_SLUGS_QUERY,
  CASE_STUDY_QUERY,
  toCaseStudyDetail,
  SITE_SEO_QUERY,
  toSiteSeo,
  SITE_SUBPAGE_CTA_QUERY,
  toSubpageCta,
} from "@/sanity/lib/queries";
import { toMetadata } from "@/lib/metadata";
import { getPathname } from "@/i18n/navigation";
import type { PageSeo } from "@/types/content";
import type {
  CASE_STUDY_SLUGS_QUERYResult,
  CASE_STUDY_QUERYResult,
  SITE_SEO_QUERYResult,
  SITE_SUBPAGE_CTA_QUERYResult,
} from "@/sanity/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<CASE_STUDY_SLUGS_QUERYResult>({
    query: CASE_STUDY_SLUGS_QUERY,
    tags: ["caseStudy"],
  });
  return slugs.map((slug) => ({ slug }));
}

// caseStudy şemasında ayrı bir `seo` alanı yok — title/description/
// ogImage doğrudan içerik alanlarından (name/subtitle/coverImage)
// türetiliyor. slug locale'ler arasında paylaşıldığı için (bkz.
// CASE_STUDY_QUERY yorumu, `slug == $slug` — locale filtresi yok)
// hreflang iki dil için de aynı slug'ı, sadece prefix farkıyla kullanır.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const [result, siteSeoResult] = await Promise.all([
    sanityFetch<CASE_STUDY_QUERYResult>({
      query: CASE_STUDY_QUERY,
      params: { locale, slug },
      tags: [`caseStudy:${slug}`],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);

  if (!result) {
    return {};
  }

  const item = toCaseStudyDetail(result);
  const pageSeo: PageSeo = {
    title: item?.name ?? "",
    description: item?.subtitle || item?.detailIntro || "",
    ogImage: item?.coverImage,
  };
  const paths = {
    en: getPathname({ href: { pathname: "/work/[slug]", params: { slug } }, locale: "en" }),
    tr: getPathname({ href: { pathname: "/work/[slug]", params: { slug } }, locale: "tr" }),
  };

  return toMetadata(pageSeo, toSiteSeo(siteSeoResult), locale, paths);
}

/**
 * dc.html: page.hasCases (satır 822-886) — pageKey caseInsha/caseRuut
 * için `page.cases` tek elemanlı ([t.cases[0]] / [t.cases[1]], satır
 * 2383), döngü değil. Hero title zaten `item.name`'le birebir aynı,
 * ayrı bir alan taşımıyor — sadece eyebrow/intro CaseStudy'ye eklendi
 * (detailEyebrow/detailIntro).
 */
export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const settings = locale === "tr" ? trSettings : enSettings;

  const [result, subpageCtaResult] = await Promise.all([
    sanityFetch<CASE_STUDY_QUERYResult>({
      query: CASE_STUDY_QUERY,
      params: { locale, slug },
      tags: [`caseStudy:${slug}`],
    }),
    sanityFetch<SITE_SUBPAGE_CTA_QUERYResult>({
      query: SITE_SUBPAGE_CTA_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);
  const item = toCaseStudyDetail(result);
  const subpageCta = toSubpageCta(subpageCtaResult);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <SubpageHero
        hero={{ eyebrow: item.detailEyebrow, title: item.name, intro: item.detailIntro }}
        backLabel={settings.backLabel}
        backHref="/work"
      />
      <CaseDetail item={item} />
      <SubpageClosingCta content={subpageCta} />
    </main>
  );
}
