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
  SITE_SUBPAGE_CTA_QUERY,
  toSubpageCta,
} from "@/sanity/lib/queries";
import type {
  CASE_STUDY_SLUGS_QUERYResult,
  CASE_STUDY_QUERYResult,
  SITE_SUBPAGE_CTA_QUERYResult,
} from "@/sanity/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<CASE_STUDY_SLUGS_QUERYResult>({
    query: CASE_STUDY_SLUGS_QUERY,
    tags: ["caseStudy"],
  });
  return slugs.map((slug) => ({ slug }));
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
