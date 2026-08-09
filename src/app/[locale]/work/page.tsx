import type { Metadata } from "next";
import SubpageHero from "@/components/subpages/SubpageHero";
import SubpageClosingCta from "@/components/subpages/SubpageClosingCta";
import CaseCard from "@/components/sections/CaseCard";
import { en as enHome, siteSettings as enSettings } from "@/content/en";
import { tr as trHome, siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  WORK_PAGE_QUERY,
  toWorkPage,
  WORK_PAGE_SEO_QUERY,
  toWorkPageSeo,
  SITE_SEO_QUERY,
  toSiteSeo,
  CASE_STUDIES_LIST_QUERY,
  toCaseStudies,
  SITE_SUBPAGE_CTA_QUERY,
  toSubpageCta,
} from "@/sanity/lib/queries";
import { toMetadata } from "@/lib/metadata";
import type {
  WORK_PAGE_QUERYResult,
  WORK_PAGE_SEO_QUERYResult,
  SITE_SEO_QUERYResult,
  CASE_STUDIES_LIST_QUERYResult,
  SITE_SUBPAGE_CTA_QUERYResult,
} from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [seoResult, siteSeoResult] = await Promise.all([
    sanityFetch<WORK_PAGE_SEO_QUERYResult>({
      query: WORK_PAGE_SEO_QUERY,
      params: { locale },
      tags: ["workPage"],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);

  return toMetadata(toWorkPageSeo(seoResult), toSiteSeo(siteSeoResult));
}

/**
 * dc.html: page.hasCaseIndex (satır 796-820). Kendi heading/intro'su
 * yok — SubpageHero yeterli. Kartlar artık caseStudy koleksiyonundan
 * geliyor, CaseCard'ı rounded=true ile çağırıyor (bkz. CaseCard.tsx —
 * Home'un köşeli kartından tek farkı bu). linkLabel hâlâ content/en.ts
 * + tr.ts'teki HomePage.caseStudies'ten — Sanity'de bu alan var ve ana
 * sayfa onu kullanıyor, ama /work henüz kendi sorgusuyla çekmiyor,
 * ayrı bir senkron adımı.
 */
export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const home = locale === "tr" ? trHome : enHome;
  const settings = locale === "tr" ? trSettings : enSettings;
  const { linkLabel } = home.caseStudies;

  const [heroResult, caseStudiesResult, subpageCtaResult] = await Promise.all([
    sanityFetch<WORK_PAGE_QUERYResult>({
      query: WORK_PAGE_QUERY,
      params: { locale },
      tags: ["workPage"],
    }),
    sanityFetch<CASE_STUDIES_LIST_QUERYResult>({
      query: CASE_STUDIES_LIST_QUERY,
      params: { locale },
      tags: ["caseStudy"],
    }),
    sanityFetch<SITE_SUBPAGE_CTA_QUERYResult>({
      query: SITE_SUBPAGE_CTA_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);
  const page = toWorkPage(heroResult);
  const items = toCaseStudies(caseStudiesResult);
  const subpageCta = toSubpageCta(subpageCtaResult);

  return (
    <main>
      <SubpageHero hero={page.hero} backLabel={settings.backLabel} />
      <section className="bg-ivory px-7 py-[88px]">
        <div className="mx-auto grid max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[26px]">
          {items.map((item) => (
            <CaseCard key={item.slug} item={item} linkLabel={linkLabel} rounded />
          ))}
        </div>
      </section>
      <SubpageClosingCta content={subpageCta} />
    </main>
  );
}
