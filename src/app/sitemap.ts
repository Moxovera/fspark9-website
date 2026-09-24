import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPathname } from "@/i18n/navigation";
import { servicePages } from "@/content/services";
import { cases } from "@/content/work";
import { spark } from "@/content/spark";
import { staticAltSlug } from "@/lib/spark";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SPARK_EPISODE_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { SPARK_EPISODE_SLUGS_QUERYResult } from "@/sanity/types";

// Sitemap (brief v4 §11). Rota listesi routing.ts'teki pathnames
// haritasıyla aynı kaynaktan (getPathname), TR çevirileri ayrıca
// yazılmıyor. Hizmetler, vakalar ve formatlar src/content'ten (Sanity
// pass'e kadar statik); bölümler Sanity'den, yalnızca yayındakiler.
// /thank-you kasıtlı dışarıda (dönüşüm sonrası sayfa), /(locked) ve
// /studio da. lastModified sadece gerçek bir tarihi olan bölümlerde:
// statik sayfalara uydurma tarih yazılmıyor.
const STATIC_HREFS = [
  "/",
  "/services",
  "/work",
  "/about",
  "/spark",
  "/impressum",
  "/terms",
  "/privacy",
  "/cookies",
] as const;

function entry(en: string, tr: string, lastModified?: string | null): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${en === "/" ? "" : en}`,
    ...(lastModified ? { lastModified } : {}),
    alternates: { languages: { en: `${SITE_URL}${en === "/" ? "" : en}`, tr: `${SITE_URL}${tr}` } },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodeSlugs = await sanityFetch<SPARK_EPISODE_SLUGS_QUERYResult>({
    query: SPARK_EPISODE_SLUGS_QUERY,
    tags: ["sparkEpisode"],
  });

  const staticEntries = STATIC_HREFS.map((href) =>
    entry(getPathname({ href, locale: "en" }), getPathname({ href, locale: "tr" })),
  );

  const serviceEntries = servicePages.en.map(({ slug }) => {
    const href = { pathname: "/services/[slug]" as const, params: { slug } };
    return entry(getPathname({ href, locale: "en" }), getPathname({ href, locale: "tr" }));
  });

  const caseEntries = cases.en.map(({ slug }) => {
    const href = { pathname: "/work/[slug]" as const, params: { slug } };
    return entry(getPathname({ href, locale: "en" }), getPathname({ href, locale: "tr" }));
  });

  const formatEntries = spark.en.formats.map(({ slug }) =>
    entry(
      getPathname({ href: { pathname: "/spark/[formatSlug]", params: { formatSlug: slug } }, locale: "en" }),
      getPathname({
        href: { pathname: "/spark/[formatSlug]", params: { formatSlug: staticAltSlug(spark, "en", slug) ?? slug } },
        locale: "tr",
      }),
    ),
  );

  const episodeEntries = episodeSlugs
    .filter((episode) => episode.status === "published")
    .filter((episode) => episode.formatEn && episode.episodeEn && episode.formatTr && episode.episodeTr)
    .map((episode) =>
      entry(
        getPathname({
          href: {
            pathname: "/spark/[formatSlug]/[episodeSlug]",
            params: { formatSlug: episode.formatEn!, episodeSlug: episode.episodeEn! },
          },
          locale: "en",
        }),
        getPathname({
          href: {
            pathname: "/spark/[formatSlug]/[episodeSlug]",
            params: { formatSlug: episode.formatTr!, episodeSlug: episode.episodeTr! },
          },
          locale: "tr",
        }),
        episode.lastCheckedAt ?? episode._updatedAt,
      ),
    );

  return [...staticEntries, ...serviceEntries, ...caseEntries, ...formatEntries, ...episodeEntries];
}
