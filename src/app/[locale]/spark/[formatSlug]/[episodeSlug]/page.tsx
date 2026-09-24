import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, personInfo } from "@/lib/jsonLd";
import { notFound } from "next/navigation";
import BackLink from "@/components/brand/BackLink";
import Label from "@/components/brand/Label";
import NextStep from "@/components/blocks/NextStep";
import SparkSubnav from "@/components/spark/SparkSubnav";
import EpisodeClock from "@/components/spark/episode/EpisodeClock";
import EpisodeBlocks from "@/components/spark/episode/EpisodeBlocks";
import EpisodeRuler from "@/components/spark/episode/EpisodeRuler";
import Scorecard from "@/components/spark/episode/Scorecard";
import SparkAltSlugRegistrar from "@/components/spark/SparkAltSlugRegistrar";
import { computeDayCount } from "@/components/spark/day/dayMath";
import { getChrome, getHome, getSparkHub } from "@/sanity/lib/content";
import { fill, formatShortDate } from "@/lib/format";
import { loadFormatIssues, slugFromOtherLocale } from "@/lib/spark";
import { redirect } from "@/i18n/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  SPARK_EPISODE_SLUGS_QUERY,
  SPARK_EPISODE_SEO_QUERY,
  SITE_SEO_QUERY,
  SPARK_EPISODE_QUERY,
  toSparkEpisodeSeo,
  toSiteSeo,
  toSparkEpisodePage,
} from "@/sanity/lib/queries";
import { toMetadata } from "@/lib/metadata";
import { getPathname } from "@/i18n/navigation";
import type {
  SPARK_EPISODE_SLUGS_QUERYResult,
  SPARK_EPISODE_SEO_QUERYResult,
  SITE_SEO_QUERYResult,
  SPARK_EPISODE_QUERYResult,
} from "@/sanity/types";

export async function generateStaticParams() {
  const episodes = await sanityFetch<SPARK_EPISODE_SLUGS_QUERYResult>({
    query: SPARK_EPISODE_SLUGS_QUERY,
    tags: ["sparkEpisode"],
  });

  return episodes.filter((episode) => episode.status === "published").flatMap((episode) => {
    const params: { locale: string; formatSlug: string; episodeSlug: string }[] = [];
    if (episode.formatEn && episode.episodeEn) {
      params.push({ locale: "en", formatSlug: episode.formatEn, episodeSlug: episode.episodeEn });
    }
    if (episode.formatTr && episode.episodeTr) {
      params.push({ locale: "tr", formatSlug: episode.formatTr, episodeSlug: episode.episodeTr });
    }
    return params;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; formatSlug: string; episodeSlug: string }>;
}): Promise<Metadata> {
  const { locale, formatSlug, episodeSlug } = await params;
  const [seoResult, siteSeoResult, episodeSlugs] = await Promise.all([
    sanityFetch<SPARK_EPISODE_SEO_QUERYResult>({
      query: SPARK_EPISODE_SEO_QUERY,
      params: { locale, formatSlug, episodeSlug },
      tags: ["sparkEpisode"],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
    sanityFetch<SPARK_EPISODE_SLUGS_QUERYResult>({
      query: SPARK_EPISODE_SLUGS_QUERY,
      tags: ["sparkEpisode"],
    }),
  ]);

  // slug çiftleri en/tr'de farklı (the-last-day/01-bo vs son-gun/01-bo
  // gibi) — hreflang için ikisini de generateStaticParams'ın kullandığı
  // aynı listeden buluyoruz, ayrı bir sorgu şekli değiştirmeden.
  const match = episodeSlugs.find((episode) =>
    locale === "tr"
      ? episode.formatTr === formatSlug && episode.episodeTr === episodeSlug
      : episode.formatEn === formatSlug && episode.episodeEn === episodeSlug,
  );
  const paths =
    match && match.formatEn && match.episodeEn && match.formatTr && match.episodeTr
      ? {
          en: getPathname({
            href: {
              pathname: "/spark/[formatSlug]/[episodeSlug]",
              params: { formatSlug: match.formatEn, episodeSlug: match.episodeEn },
            },
            locale: "en",
          }),
          tr: getPathname({
            href: {
              pathname: "/spark/[formatSlug]/[episodeSlug]",
              params: { formatSlug: match.formatTr, episodeSlug: match.episodeTr },
            },
            locale: "tr",
          }),
        }
      : undefined;

  return toMetadata(toSparkEpisodeSeo(seoResult), toSiteSeo(siteSeoResult), locale, paths);
}

/**
 * Bölüm sayfası — final interaction brief (17 Eylül 2026) ile yeniden
 * kuruldu. Kullanıcının açık onayıyla Faz 3'te kaldırılan Record/Reading/
 * Call modeli ve altı mekanik geri getirildi (bkz. proje hafızası "spark
 * content philosophy" notu — bu, o kararın BİLİNÇLİ bir tersine
 * çevrilmesi). Canlıyı gördükten sonraki sadeleştirme talimatıyla (18
 * Eylül 2026) Ledger toggle, Gap block'ları ve sayfa sonu konsolide
 * Expert Notes bölümü kaldırıldı — her şey her zaman görünür, notlar
 * gövde akışının içinde (bkz. EpisodeBlocks.tsx'teki sparkNote case'i).
 *
 * SubpageHero ARTIK KULLANILMIYOR bu sayfada — brief §5: "The page
 * opens on the clock, not on a headline... The standfirst sits below
 * this." SubpageHero'nun sabit eyebrow→title→intro sırası saatin
 * başlıktan ÖNCE gelmesine izin vermiyor, bu yüzden bu sayfa kendi
 * header'ını kuruyor (geri butonu SubpageHero'yla aynı görsel dilde).
 */
/**
 * v2 bölüm sayfası (brief v4 §7.7, board Episode / EpisodeM). İçerik, blok
 * sırası, mekanikler ve localStorage anahtarları (fspark9.lastday.v2)
 * aynen korunuyor; sadece sunum değişti. Gün sayıları her zaman
 * launchDate / closureDate / blok tarihlerinden hesaplanıyor.
 */
export default async function SparkEpisodePageRoute({
  params,
}: {
  params: Promise<{ locale: string; formatSlug: string; episodeSlug: string }>;
}) {
  const { locale: rawLocale, formatSlug, episodeSlug } = await params;
  setRequestLocale(rawLocale);
  const locale = rawLocale === "tr" ? "tr" : "en";
  const [spark, site, home] = await Promise.all([getSparkHub(), getChrome(), getHome()]);
  const hub = spark[locale];
  const { chrome, nextStep } = site[locale];
  const format = hub.formats.find((f) => f.slug === formatSlug);
  if (!format) {
    const fixed = slugFromOtherLocale(spark, locale, formatSlug);
    if (fixed) {
      redirect({
        href: { pathname: "/spark/[formatSlug]/[episodeSlug]", params: { formatSlug: fixed, episodeSlug } },
        locale,
      });
    }
  }

  const result = await sanityFetch<SPARK_EPISODE_QUERYResult>({
    query: SPARK_EPISODE_QUERY,
    params: { locale, formatSlug, episodeSlug },
    tags: ["sparkEpisode", "sparkFormat"],
  });
  const episode = toSparkEpisodePage(result, formatSlug);
  if (!episode || !episode.launchDate || !episode.closureDate || !format) notFound();

  const ctx = {
    launchDate: episode.launchDate,
    closureDate: episode.closureDate,
    dayLabel: episode.dayLabel,
    locale,
    labels: hub.episode,
    vocabulary: episode,
  } as const;
  const days = computeDayCount(episode.launchDate, episode.closureDate);
  const range = fill(hub.episode.dateRangeTemplate, {
    from: formatShortDate(episode.launchDate, locale),
    to: formatShortDate(episode.closureDate, locale),
  });
  const numberLabel = `Nº ${String(episode.number).padStart(2, "0")}`;
  const { issues } = await loadFormatIssues(locale, format, hub);
  const next = issues.find((issue) => issue.number === episode.number + 1);
  const seoResult = await sanityFetch<SPARK_EPISODE_SEO_QUERYResult>({
    query: SPARK_EPISODE_SEO_QUERY,
    params: { locale, formatSlug, episodeSlug },
    tags: ["sparkEpisode"],
  });
  const seo = toSparkEpisodeSeo(seoResult);
  const dateOf = (iso: string | null) => (iso ? formatShortDate(iso, locale) : hub.launchDateLabel);
  const recordLine = [
    hub.episode.builtFromLabel,
    fill(hub.episode.evidenceTakenLabel, { date: dateOf(episode.evidenceTakenAt ?? episode.publishedAt) }),
    fill(hub.episode.lastCheckedLabel, { date: dateOf(episode.lastCheckedAt) }),
  ];
  const formatPath = getPathname({ href: { pathname: "/spark/[formatSlug]", params: { formatSlug } }, locale });
  const path = getPathname({ href: { pathname: "/spark/[formatSlug]/[episodeSlug]", params: { formatSlug, episodeSlug } }, locale });
  const mono = "font-mono text-[11px] leading-[normal] font-medium tracking-[0.08em] uppercase min-[900px]:text-[12px]";

  return (
    <main className="pt-16 min-[900px]:pt-[84px]">
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, chrome, [
            { name: hub.sparkLabel, path: getPathname({ href: "/spark", locale }) },
            { name: format.name, path: formatPath },
            { name: episode.subject, path },
          ]),
          articleJsonLd(locale, personInfo(home[locale], chrome), {
            headline: seo.title.split(" | ")[0],
            description: seo.description,
            path,
            datePublished: seoResult?.publishedAt,
            dateModified: seoResult?.lastCheckedAt ?? seoResult?._updatedAt,
            isPartOf: format.name,
          }),
        ]}
      />
      {episode.altFormatSlug && (
        <SparkAltSlugRegistrar formatSlug={episode.altFormatSlug} episodeSlug={episode.altEpisodeSlug ?? undefined} />
      )}
      <SparkSubnav sparkLabel={hub.sparkLabel} formats={hub.formats} currentSlug={formatSlug} />

      <section className="on-ink bg-ink">
        <div className="flex flex-col gap-4 px-5 pt-4 pb-9 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-end min-[900px]:gap-x-6 min-[900px]:px-8 min-[900px]:pt-10 min-[900px]:pb-16 min-[1280px]:px-16">
          <div className="flex flex-col gap-4 min-[900px]:col-span-7 min-[900px]:gap-5">
            <BackLink
              href={{ pathname: "/spark/[formatSlug]", params: { formatSlug } }}
              label={format.name}
              ground="ink"
              className="-mb-2"
            />
            <Label ground="ink">{`${format.name} · ${numberLabel}`}</Label>
            <div className="flex items-end justify-between min-[900px]:block">
              <h1 className="m-0 font-display text-[96px] leading-[0.85] font-extrabold tracking-[-0.06em] text-paper min-[900px]:-ml-2 min-[900px]:text-[clamp(160px,16.667vw,240px)] min-[900px]:leading-[0.8] min-[900px]:tracking-[-0.065em]">
                {episode.subject}
              </h1>
              {days !== null && (
                <span className="flex flex-col items-end gap-1 min-[900px]:hidden">
                  <span className="font-display text-[56px] leading-[0.9] font-extrabold tracking-[-0.05em] text-paper">{days}</span>
                  <span className={`${mono} text-dust`}>{hub.episode.daysOpenShortLabel}</span>
                </span>
              )}
            </div>
            <div
              lang="en"
              className="flex flex-col gap-[6px] border-t border-inkrule pt-[14px] min-[900px]:mt-2 min-[900px]:flex-row min-[900px]:gap-7 min-[900px]:pt-[18px]"
            >
              {episode.parent && <span className={`${mono} text-dust`}>{episode.parent}</span>}
              <span className={`${mono} text-dust`}>{episode.country}</span>
              <span lang={locale} className={`${mono} text-dust`}>
                {range}
              </span>
            </div>
          </div>
          {days !== null && (
            <div className="hidden min-[900px]:col-span-4 min-[900px]:col-start-9 min-[900px]:flex min-[900px]:flex-col min-[900px]:items-end min-[900px]:gap-[10px] min-[900px]:justify-self-end min-[900px]:pb-1">
              <span className="text-outline-paper font-display text-[clamp(112px,11.112vw,160px)] leading-[0.8] font-extrabold tracking-[-0.06em]">
                {days}
              </span>
              <span className={`${mono} text-dust`}>{hub.episode.daysOpenLabel}</span>
            </div>
          )}
        </div>
      </section>

      <EpisodeRuler blocks={episode.blocks} ctx={ctx} />

      <section className="bg-paper px-5 pt-9 pb-2 min-[900px]:px-8 min-[900px]:pt-16 min-[900px]:pb-6 min-[1280px]:px-16">
        <div className="flex flex-col gap-4 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6">
          <div className="flex flex-col gap-4 min-[900px]:col-span-8 min-[900px]:col-start-4 min-[900px]:gap-6">
            <p className="m-0 font-display text-[24px] leading-[1.25] font-bold tracking-[-0.02em] text-ink min-[900px]:text-[36px] min-[900px]:leading-[1.22] min-[900px]:tracking-[-0.025em]">
              {episode.standfirst}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 min-[900px]:gap-6">
              {recordLine.map((item) => (
                <span key={item} className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper px-5 pt-7 pb-8 min-[900px]:px-8 min-[900px]:pt-12 min-[900px]:pb-16 min-[1280px]:px-16">
        <div className="grid grid-cols-1 gap-5 min-[900px]:grid-cols-12 min-[900px]:items-start min-[900px]:gap-x-6">
          <EpisodeClock ctx={ctx} />
          <div className="flex flex-col gap-4 min-[900px]:col-span-8 min-[900px]:col-start-4 min-[900px]:gap-6">
            <EpisodeBlocks blocks={episode.blocks} ctx={ctx} />
            <Scorecard subject={episode.subject} blocks={episode.blocks} ctx={ctx} />
          </div>
        </div>
      </section>

      {next && (
        <section className="bg-paper px-5 pb-16 min-[900px]:px-8 min-[900px]:pb-[104px] min-[1280px]:px-16">
          <div className="min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6">
            <div className="flex flex-col gap-[10px] border-t-2 border-ink pt-4 min-[900px]:col-span-8 min-[900px]:col-start-4">
              <Label>{fill(hub.episode.nextTemplate, { format: format.name })}</Label>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <span className="flex items-baseline gap-[14px]">
                  <Label as="span">{next.numberLabel}</Label>
                  <span className="font-display text-[34px] leading-[normal] font-extrabold tracking-[-0.035em] text-stone min-[900px]:text-[44px]">
                    {next.subject}
                  </span>
                </span>
                <Label as="span">{next.statusLabel}</Label>
              </div>
            </div>
          </div>
        </section>
      )}

      <NextStep content={nextStep} />
    </main>
  );
}
