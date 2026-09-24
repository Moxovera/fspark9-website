import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPathname } from "@/i18n/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  CASE_STUDY_SLUGS_QUERY,
  SPARK_FORMAT_SLUGS_QUERY,
  SPARK_EPISODE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type {
  CASE_STUDY_SLUGS_QUERYResult,
  SPARK_FORMAT_SLUGS_QUERYResult,
  SPARK_EPISODE_SLUGS_QUERYResult,
} from "@/sanity/types";

// Statik rota listesi routing.ts'teki pathnames haritasıyla aynı
// kaynaktan (getPathname) besleniyor — TR çevirileri (kullanim-sartlari,
// gizlilik, cerezler) burada AYRICA yazılmıyor. /thank-you kasıtlı
// dışarıda: dönüşüm sonrası sayfa, özgün içerik taşımıyor. /(locked)
// ve /studio da dışarıda — ikisi de zaten public arama sonucu için değil.
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

function entry(en: string, tr: string): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${en}`,
    alternates: { languages: { en: `${SITE_URL}${en}`, tr: `${SITE_URL}${tr}` } },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudySlugs, formatSlugs, episodeSlugs] = await Promise.all([
    sanityFetch<CASE_STUDY_SLUGS_QUERYResult>({ query: CASE_STUDY_SLUGS_QUERY, tags: ["caseStudy"] }),
    sanityFetch<SPARK_FORMAT_SLUGS_QUERYResult>({ query: SPARK_FORMAT_SLUGS_QUERY, tags: ["sparkFormat"] }),
    sanityFetch<SPARK_EPISODE_SLUGS_QUERYResult>({ query: SPARK_EPISODE_SLUGS_QUERY, tags: ["sparkEpisode"] }),
  ]);

  const staticEntries = STATIC_HREFS.map((href) =>
    entry(getPathname({ href, locale: "en" }), getPathname({ href, locale: "tr" })),
  );

  const caseStudyEntries = caseStudySlugs.map((slug) =>
    entry(
      getPathname({ href: { pathname: "/work/[slug]", params: { slug } }, locale: "en" }),
      getPathname({ href: { pathname: "/work/[slug]", params: { slug } }, locale: "tr" }),
    ),
  );

  const formatEntries = formatSlugs
    .filter((format) => format.en && format.tr)
    .map((format) =>
      entry(
        getPathname({ href: { pathname: "/spark/[formatSlug]", params: { formatSlug: format.en! } }, locale: "en" }),
        getPathname({ href: { pathname: "/spark/[formatSlug]", params: { formatSlug: format.tr! } }, locale: "tr" }),
      ),
    );

  const episodeEntries = episodeSlugs
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
      ),
    );

  return [...staticEntries, ...caseStudyEntries, ...formatEntries, ...episodeEntries];
}
