import SubpageHero from "@/components/subpages/SubpageHero";
import ServicesDetailTabs from "@/components/subpages/ServicesDetailTabs";
import ServicesDetailAccordion from "@/components/subpages/ServicesDetailAccordion";
import SubpageClosingCta from "@/components/subpages/SubpageClosingCta";
import { en as enHome, siteSettings as enSettings } from "@/content/en";
import { tr as trHome, siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SERVICES_PAGE_QUERY, toServicesPage } from "@/sanity/lib/queries";
import type { SERVICES_PAGE_QUERYResult } from "@/sanity/types";

/**
 * dc.html: page.hasBlocks (satır 727-793). Satır/panel içeriği Home'un
 * HomePage.services'inden (aynı Service[] + labels) geliyor —
 * ServicesDetailTabs/Accordion, Home'un ServicesTabs/Accordion'ıyla AYNI
 * bileşen değil (bkz. o dosyalardaki yorum: ikon seti, numara rozeti ve
 * panel satır sayısı/stili dc.html'de gerçekten farklı).
 */
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const home = locale === "tr" ? trHome : enHome;
  const settings = locale === "tr" ? trSettings : enSettings;
  const { items, labels } = home.services;

  const heroResult = await sanityFetch<SERVICES_PAGE_QUERYResult>({
    query: SERVICES_PAGE_QUERY,
    params: { locale },
    tags: ["servicesPage"],
  });
  const page = toServicesPage(heroResult);

  return (
    <main>
      <SubpageHero hero={page.hero} backLabel={settings.backLabel} />
      <section className="bg-ivory px-7 py-[88px]">
        <div className="mx-auto hidden max-w-[1200px] min-[900px]:block">
          <ServicesDetailTabs items={items} labels={labels} />
        </div>
        <div className="mx-auto max-w-[1000px] min-[900px]:hidden">
          <ServicesDetailAccordion items={items} labels={labels} />
        </div>
      </section>
      <SubpageClosingCta content={settings.subpageCta} />
    </main>
  );
}
