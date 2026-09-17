import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubpageHero from "@/components/subpages/SubpageHero";
import DayMeasure from "@/components/spark/day/DayMeasure";
import EpisodeBody from "@/components/spark/episode/EpisodeBody";
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
  const [seoResult, siteSeoResult] = await Promise.all([
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
  ]);

  return toMetadata(toSparkEpisodeSeo(seoResult), toSiteSeo(siteSeoResult));
}

/**
 * Bölüm sayfası — bu revizyon turunda BİLEREK neredeyse dokunulmadı
 * (bkz. Spark revizyon brief §0.2 ve §4b). Tek değişiklik: başlıktaki
 * gün göstergesi artık paylaşılan DayMeasure bileşeninin "full"
 * varyantı (hem hub hem liste sayfasıyla aynı hesaplama, launchDate/
 * closureDate'ten türetiliyor), eski scroll'a bağlı EpisodeClock
 * kaldırıldı.
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

  if (!episode) {
    notFound();
  }

  return (
    <main>
      <SubpageHero
        hero={{ eyebrow: episode.formatName, title: episode.subject, intro: episode.standfirst }}
        backLabel={episode.formatName}
        backHref={{ pathname: "/spark/[formatSlug]", params: { formatSlug } }}
      />

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

      <section className="bg-ivory px-7 pb-[120px]">
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <DayMeasure
            launchDate={episode.launchDate}
            closureDate={episode.closureDate}
            singular={episode.dayCountSingular}
            plural={episode.dayCountPlural}
            notEstablishedLabel={episode.dayNotEstablishedLabel}
            variant="full"
            tone="onIvory"
            locale={resolvedLocale}
          />

          <EpisodeBody value={episode.body} noteLabel={episode.noteLabel} />
        </div>
      </section>
    </main>
  );
}
