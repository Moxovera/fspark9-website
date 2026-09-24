import { sanityFetch } from "@/sanity/lib/fetch";
import { SPARK_FORMAT_QUERY, toSparkFormatPage } from "@/sanity/lib/queries";
import type { SPARK_FORMAT_QUERYResult } from "@/sanity/types";
import { computeDayCount } from "@/components/spark/day/dayMath";
import type { Locale, SparkFormatContent, SparkHubContent, SparkIssue } from "@/types/content";

const pad = (n: number) => `Nº ${String(n).padStart(2, "0")}`;

/**
 * Bir formatın sayıları, en yenisi üstte (brief v4 §7.7). Yayındakiler
 * Sanity'den (status published; gün sayısı launchDate/closureDate'ten
 * hesaplanır, hiç elle yazılmaz), gelecekler src/content/spark.ts'ten.
 * `altFormatSlug` dil değiştirici için diğer dildeki slug.
 */
export async function loadFormatIssues(
  locale: Locale,
  format: SparkFormatContent,
  hub: SparkHubContent,
): Promise<{ issues: SparkIssue[]; altFormatSlug: string | null }> {
  const result = await sanityFetch<SPARK_FORMAT_QUERYResult>({
    query: SPARK_FORMAT_QUERY,
    params: { locale, formatSlug: format.slug },
    tags: ["sparkFormat", "sparkEpisode"],
  });
  const page = result ? toSparkFormatPage(result, format.slug) : null;

  const published: SparkIssue[] = (page?.episodes ?? []).map((episode) => ({
    number: episode.number,
    numberLabel: pad(episode.number),
    subject: episode.subject,
    hook: episode.hook,
    status: "published",
    days: computeDayCount(episode.launchDate, episode.closureDate),
    href: {
      pathname: "/spark/[formatSlug]/[episodeSlug]",
      params: { formatSlug: episode.formatSlug, episodeSlug: episode.episodeSlug },
    },
    statusLabel: hub.launchDateLabel,
  }));

  const coming: SparkIssue[] = format.comingIssues.map((issue) => ({
    number: Number(issue.number.replace(/\D/g, "")),
    numberLabel: issue.number,
    subject: issue.subject,
    hook: issue.hook,
    status: "coming",
    days: null,
    statusLabel: issue.statusLabel,
  }));

  const issues = [...published, ...coming.filter((c) => !published.some((p) => p.number === c.number))].sort(
    (a, b) => b.number - a.number,
  );

  return { issues, altFormatSlug: page?.altFormatSlug ?? null };
}

/**
 * Diğer dilin slug'ı bu dilde istenmişse (ör. TR çerezli ziyaretçi EN
 * adresine gelip /tr/spark/the-last-day'e yönlenince) bu dilin doğru
 * slug'ı. Yoksa null.
 */
export function slugFromOtherLocale(spark: Record<Locale, SparkHubContent>, locale: Locale, slug: string): string | null {
  const other: Locale = locale === "tr" ? "en" : "tr";
  const index = spark[other].formats.findIndex((f) => f.slug === slug);
  return index >= 0 ? (spark[locale].formats[index]?.slug ?? null) : null;
}

/** Formatın diğer dildeki slug'ı, Sanity'de yoksa statik içerikten. */
export function staticAltSlug(spark: Record<Locale, SparkHubContent>, locale: Locale, slug: string): string | null {
  const other: Locale = locale === "tr" ? "en" : "tr";
  const index = spark[locale].formats.findIndex((f) => f.slug === slug);
  return index >= 0 ? (spark[other].formats[index]?.slug ?? null) : null;
}
