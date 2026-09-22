import type { Metadata } from "next";
import SubpageHero from "@/components/subpages/SubpageHero";
import SparkFormatRows from "@/components/spark/SparkFormatRows";
import CanvasField from "@/components/effects/CanvasFieldLoader";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  SPARK_SEO_QUERY,
  SITE_SEO_QUERY,
  SPARK_SECTION_QUERY,
  SPARK_FORMATS_HUB_QUERY,
  toSparkSeo,
  toSiteSeo,
  toSparkPage,
} from "@/sanity/lib/queries";
import { toMetadata } from "@/lib/metadata";
import { getPathname } from "@/i18n/navigation";
import type {
  SPARK_SEO_QUERYResult,
  SITE_SEO_QUERYResult,
  SPARK_SECTION_QUERYResult,
  SPARK_FORMATS_HUB_QUERYResult,
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

  const paths = { en: getPathname({ href: "/spark", locale: "en" }), tr: getPathname({ href: "/spark", locale: "tr" }) };

  return toMetadata(toSparkSeo(seoResult), toSiteSeo(siteSeoResult), locale, paths);
}

/**
 * Hub — revizyon v2. Kısa bir hero (eyebrow/title/purpose line), tek
 * orkestre animasyon (bronz çizgi, bkz. globals.css .spark-hairline),
 * format 01'in tam genişlik satırı (envanteriyle birlikte) ve format
 * 02'nin dokunulmamış yer tutucusu. Geri butonu artık "fspark9" diyor
 * (ana sayfaya döndüğünü adlandırıyor) — genel "Back" etiketi YOK,
 * bkz. sparkSection.hero.eyebrow.
 *
 * Ribbon (episodes/days counted/markets) BİLEREK kaldırıldı — tek
 * formatla/tek bölümle, üstteki rakamlar aşağıdaki envanter satırının
 * tekrarından ibaretti ve kullanıcı geri bildirimiyle çıkarıldı. Bkz.
 * silinen SparkRibbon.tsx/RibbonCountUp.tsx.
 */
export default async function SparkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale: "en" | "tr" = locale === "tr" ? "tr" : "en";

  const [sectionResult, formatsResult] = await Promise.all([
    sanityFetch<SPARK_SECTION_QUERYResult>({
      query: SPARK_SECTION_QUERY,
      params: { locale },
      tags: ["sparkSection"],
    }),
    sanityFetch<SPARK_FORMATS_HUB_QUERYResult>({
      query: SPARK_FORMATS_HUB_QUERY,
      params: { locale },
      tags: ["sparkFormat", "sparkEpisode"],
    }),
  ]);

  const page = toSparkPage(sectionResult, formatsResult);

  return (
    <main>
      <CanvasField />
      <SubpageHero hero={page.hero} backLabel={page.hero.eyebrow}>
        <div className="spark-hairline mt-8 h-px w-full max-w-[240px] bg-bronze" />
      </SubpageHero>

      {page.formats.length > 0 && (
        <SparkFormatRows
          formats={page.formats}
          comingSoonLabel={page.comingSoonLabel}
          locale={resolvedLocale}
        />
      )}
    </main>
  );
}
