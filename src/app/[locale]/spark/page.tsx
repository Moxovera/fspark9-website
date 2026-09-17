import type { Metadata } from "next";
import SubpageHero from "@/components/subpages/SubpageHero";
import SparkFormatsList from "@/components/spark/SparkFormatsList";
import CanvasField from "@/components/effects/CanvasFieldLoader";
import Reveal from "@/components/ui/Reveal";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  SPARK_SEO_QUERY,
  SITE_SEO_QUERY,
  SPARK_SECTION_QUERY,
  LAST_DAY_FORMATS_QUERY,
  toSparkSeo,
  toSiteSeo,
  toSparkPage,
} from "@/sanity/lib/queries";
import { toMetadata } from "@/lib/metadata";
import type {
  SPARK_SEO_QUERYResult,
  SITE_SEO_QUERYResult,
  SPARK_SECTION_QUERYResult,
  LAST_DAY_FORMATS_QUERYResult,
} from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [seoResult, siteSeoResult] = await Promise.all([
    sanityFetch<SPARK_SEO_QUERYResult>({
      query: SPARK_SEO_QUERY,
      params: { locale },
      tags: ["sparkSection"],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);

  return toMetadata(toSparkSeo(seoResult), toSiteSeo(siteSeoResult));
}

/**
 * Kasıtlı olarak dar sayfa: kısa bir hero (tek cümlelik vaat) + format
 * vitrini. Mekanizmayı (record/reading/gap/call) açıklamak, bölüm
 * içeriğini önizlemek ya da "N bölüm" / "daha fazlası geliyor" gibi bir
 * sayaç/özür cümlesi YOK — kullanıcı geri bildirimi: ana sayfa sadece
 * format adlarını net bir şekilde göstermeli, bölümler formata
 * tıklandıktan sonra okunmalı. CanvasField (ana sayfadaki fare izi
 * efektiyle birebir aynı bileşen) sayfaya hareket katıyor.
 */
export default async function SparkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const settings = locale === "tr" ? trSettings : enSettings;

  const [sectionResult, formatsResult] = await Promise.all([
    sanityFetch<SPARK_SECTION_QUERYResult>({
      query: SPARK_SECTION_QUERY,
      params: { locale },
      tags: ["sparkSection"],
    }),
    sanityFetch<LAST_DAY_FORMATS_QUERYResult>({
      query: LAST_DAY_FORMATS_QUERY,
      params: { locale },
      tags: ["lastDayFormat"],
    }),
  ]);

  const page = toSparkPage(sectionResult, formatsResult);

  return (
    <main>
      <CanvasField />
      <SubpageHero hero={page.hero} backLabel={settings.backLabel} />

      {page.formats.length > 0 && (
        <section className="bg-navy px-7 pb-[120px]">
          <div className="mx-auto max-w-[1000px]">
            <Reveal>
              <SparkFormatsList formats={page.formats} comingSoonLabel={page.comingSoonLabel} />
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}
