import SubpageHero from "@/components/subpages/SubpageHero";
import SubpageClosingCta from "@/components/subpages/SubpageClosingCta";
import CaseCard from "@/components/sections/CaseCard";
import { en as enHome, siteSettings as enSettings } from "@/content/en";
import { tr as trHome, siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import { WORK_PAGE_QUERY, toWorkPage } from "@/sanity/lib/queries";
import type { WORK_PAGE_QUERYResult } from "@/sanity/types";

/**
 * dc.html: page.hasCaseIndex (satır 796-820). Kendi heading/intro'su
 * yok — SubpageHero yeterli. Kartlar Home'daki HomePage.caseStudies'ten
 * (aynı CaseStudy[] + linkLabel), CaseCard'ı rounded=true ile çağırıyor
 * (bkz. CaseCard.tsx — Home'un köşeli kartından tek farkı bu). Vaka
 * analizlerinin kendisi henüz Sanity'de yok (bkz. seed-content.ts notu),
 * bu yüzden sadece hero Sanity'den geliyor.
 */
export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const home = locale === "tr" ? trHome : enHome;
  const settings = locale === "tr" ? trSettings : enSettings;
  const { items, linkLabel } = home.caseStudies;

  const heroResult = await sanityFetch<WORK_PAGE_QUERYResult>({
    query: WORK_PAGE_QUERY,
    params: { locale },
    tags: ["workPage"],
  });
  const page = toWorkPage(heroResult);

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
      <SubpageClosingCta content={settings.subpageCta} />
    </main>
  );
}
