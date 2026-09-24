import type { Metadata } from "next";
import PageOpening from "@/components/blocks/PageOpening";
import ServicePicker from "@/components/home/ServicePicker";
import NextStep from "@/components/blocks/NextStep";
import { servicesIndex } from "@/content/services";
import { services, nextStep } from "@/content/chrome";
import { getPathname } from "@/i18n/navigation";
import { toMetadata } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, toSiteSeo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult } from "@/sanity/types";
import type { Locale } from "@/types/content";

// v2 /services index (brief v4 §7.6): board'u yok, mevcut parçalardan.
// Açılış hizmet sayfası deseniyle, altında ana sayfanın kadran ve satır
// bloğu (her satır kendi sayfasına), sonra NextStep.

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteSeoResult = await sanityFetch<SITE_SEO_QUERYResult>({
    query: SITE_SEO_QUERY,
    params: { locale },
    tags: ["siteSettings"],
  });
  const paths = { en: getPathname({ href: "/services", locale: "en" }), tr: getPathname({ href: "/services", locale: "tr" }) };
  return toMetadata(servicesIndex[locale].seo, toSiteSeo(siteSeoResult), locale, paths);
}

export default async function ServicesIndexPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const content = servicesIndex[locale];

  return (
    <main>
      <PageOpening
        backHref="/"
        backLabel={content.backLabel}
        label={content.opening.label}
        heading={content.opening.heading}
      />
      <section className="bg-paper px-5 py-16 min-[900px]:px-8 min-[900px]:py-[136px] min-[1280px]:px-16">
        <ServicePicker
          services={services[locale]}
          intro={
            <p className="m-0 text-[20px] leading-[1.5] text-ink min-[900px]:max-w-[520px] min-[900px]:text-[26px] min-[900px]:leading-[1.45]">
              {content.opening.intro}
            </p>
          }
        />
      </section>
      <NextStep content={nextStep[locale]} />
    </main>
  );
}
