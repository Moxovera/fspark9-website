import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import EpisodeClock from "@/components/spark/episode/EpisodeClock";
import EpisodeBlocks from "@/components/spark/episode/EpisodeBlocks";
import Scorecard from "@/components/spark/episode/Scorecard";
import SparkAltSlugRegistrar from "@/components/spark/SparkAltSlugRegistrar";
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

  return episodes.flatMap((episode) => {
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
export default async function SparkEpisodePageRoute({
  params,
}: {
  params: Promise<{ locale: string; formatSlug: string; episodeSlug: string }>;
}) {
  const { locale, formatSlug, episodeSlug } = await params;
  const resolvedLocale: "en" | "tr" = locale === "tr" ? "tr" : "en";

  const result = await sanityFetch<SPARK_EPISODE_QUERYResult>({
    query: SPARK_EPISODE_QUERY,
    params: { locale, formatSlug, episodeSlug },
    tags: ["sparkEpisode", "sparkFormat"],
  });

  const episode = toSparkEpisodePage(result, formatSlug);

  if (!episode || !episode.launchDate || !episode.closureDate) {
    notFound();
  }

  return (
    <main>
      {episode.altFormatSlug && (
        <SparkAltSlugRegistrar
          formatSlug={episode.altFormatSlug}
          episodeSlug={episode.altEpisodeSlug ?? undefined}
        />
      )}
      <section className="bg-navy px-7 pt-[182px] pb-16">
        <div className="mx-auto max-w-[1000px]">
          <Link
            href={{ pathname: "/spark/[formatSlug]", params: { formatSlug } }}
            className="mb-10 inline-flex items-center gap-[11px] rounded-full border border-ivory/22 py-2.5 pr-[18px] pl-3 transition-[background-color,border-color] duration-[250ms] ease-out hover:border-bronze/70 hover:bg-ivory/[0.08]"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: "var(--bronze)" }}
            >
              <line x1="20" y1="12" x2="5" y2="12" />
              <polyline points="11 5 4 12 11 19" />
            </svg>
            <span className="font-mono text-xs tracking-[0.1em] text-ivory/80 uppercase">{episode.formatName}</span>
          </Link>

          <EpisodeClock
            launchDate={episode.launchDate}
            closureDate={episode.closureDate}
            dayLabel={episode.dayLabel}
            locale={resolvedLocale}
          />

          <p className="mt-10 mb-4 font-mono text-xs tracking-[0.14em] text-bronze uppercase">{episode.formatName}</p>
          <h1 className="mb-[26px] max-w-[22ch] font-display text-[clamp(2.3rem,5vw,4rem)] leading-[1.08] font-medium tracking-[-0.01em] text-ivory">
            {episode.subject}
          </h1>
          <p className="max-w-[62ch] text-[1.08rem] leading-[1.68] text-ivory/74">{episode.standfirst}</p>
        </div>
      </section>

      <section className="bg-ivory px-7 pb-6">
        <div className="mx-auto flex max-w-[760px] flex-wrap items-center gap-x-4 gap-y-2 border-b border-charcoal/10 pb-8 font-mono text-[11.5px] tracking-[0.05em] text-muted uppercase">
          {/* country/parent şu an lokalize edilmemiş sabit İngilizce özel
              isimler (bkz. sparkEpisode şeması) — lang="en" olmadan
              tarayıcı TR büyütme kuralını uygular ve "United Kingdom"
              "UNİTED KİNGDOM" olur (yanlış nokta). */}
          <span lang="en">{episode.country}</span>
          {episode.parent && <span lang="en">{episode.parent}</span>}
        </div>
      </section>

      <section className="bg-ivory px-7 pb-[160px]">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <EpisodeBlocks
            blocks={episode.blocks}
            launchDate={episode.launchDate}
            dayLabel={episode.dayLabel}
            vocabulary={episode}
          />

          <Scorecard subject={episode.subject} blocks={episode.blocks} vocabulary={episode} />
        </div>
      </section>
    </main>
  );
}
