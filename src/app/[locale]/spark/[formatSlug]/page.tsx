import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubpageHero from "@/components/subpages/SubpageHero";
import SparkEpisodeList from "@/components/spark/SparkEpisodeList";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  SPARK_FORMAT_SLUGS_QUERY,
  SPARK_FORMAT_SEO_QUERY,
  SITE_SEO_QUERY,
  SPARK_FORMAT_QUERY,
  toSparkFormatSeo,
  toSiteSeo,
  toSparkFormatPage,
} from "@/sanity/lib/queries";
import { toMetadata } from "@/lib/metadata";
import type {
  SPARK_FORMAT_SLUGS_QUERYResult,
  SPARK_FORMAT_SEO_QUERYResult,
  SITE_SEO_QUERYResult,
  SPARK_FORMAT_QUERYResult,
} from "@/sanity/types";

// locale + formatSlug KOMBİNASYONLARI elle üretiliyor — the-last-day/
// son-gun gibi slug'lar locale'e göre farklı, next-intl'in statik
// pathnames haritası bunu desteklemiyor (bkz. routing.ts yorumu).
export async function generateStaticParams() {
  const formats = await sanityFetch<SPARK_FORMAT_SLUGS_QUERYResult>({
    query: SPARK_FORMAT_SLUGS_QUERY,
    tags: ["sparkFormat"],
  });

  return formats.flatMap((format) => {
    const params: { locale: string; formatSlug: string }[] = [];
    if (format.en) params.push({ locale: "en", formatSlug: format.en });
    if (format.tr) params.push({ locale: "tr", formatSlug: format.tr });
    return params;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; formatSlug: string }>;
}): Promise<Metadata> {
  const { locale, formatSlug } = await params;
  const [seoResult, siteSeoResult] = await Promise.all([
    sanityFetch<SPARK_FORMAT_SEO_QUERYResult>({
      query: SPARK_FORMAT_SEO_QUERY,
      params: { locale, formatSlug },
      tags: ["sparkFormat"],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);

  return toMetadata(toSparkFormatSeo(seoResult), toSiteSeo(siteSeoResult));
}

/**
 * Liste sayfası — revizyon v2. Kısa bir purpose line + her bölümün
 * dikey bir girişi (gün ölçüsü, konu, ülke, hook, "Read the record").
 * Geri butonu "Spark" diyor (hub'a döndüğünü adlandırıyor) — bkz.
 * sparkFormat.hero.eyebrow.
 */
export default async function SparkFormatPageRoute({
  params,
}: {
  params: Promise<{ locale: string; formatSlug: string }>;
}) {
  const { locale, formatSlug } = await params;
  const resolvedLocale: "en" | "tr" = locale === "tr" ? "tr" : "en";

  const result = await sanityFetch<SPARK_FORMAT_QUERYResult>({
    query: SPARK_FORMAT_QUERY,
    params: { locale, formatSlug },
    tags: ["sparkFormat", "sparkEpisode"],
  });

  if (!result) {
    notFound();
  }

  const page = toSparkFormatPage(result, formatSlug);

  return (
    <main>
      <SubpageHero hero={page.hero} backLabel={page.hero.eyebrow} backHref="/spark" />

      {page.episodes.length > 0 && (
        <SparkEpisodeList
          episodes={page.episodes}
          dayCountSingular={page.dayCountSingular}
          dayCountPlural={page.dayCountPlural}
          dayNotEstablishedLabel={page.dayNotEstablishedLabel}
          hookLabel={page.hookLabel}
          locale={resolvedLocale}
        />
      )}
    </main>
  );
}
