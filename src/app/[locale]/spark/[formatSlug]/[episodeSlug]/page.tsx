import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubpageHero from "@/components/subpages/SubpageHero";
import LedgerToggle from "@/components/spark/episode/LedgerToggle";
import EpisodeClock from "@/components/spark/episode/EpisodeClock";
import EpisodeBlocks from "@/components/spark/episode/EpisodeBlocks";
import Scorecard from "@/components/spark/episode/Scorecard";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  LAST_DAY_EPISODE_SLUGS_QUERY,
  LAST_DAY_EPISODE_SEO_QUERY,
  SITE_SEO_QUERY,
  LAST_DAY_EPISODE_QUERY,
  toLastDayEpisodeSeo,
  toSiteSeo,
  toLastDayEpisodePage,
} from "@/sanity/lib/queries";
import { toMetadata } from "@/lib/metadata";
import type {
  LAST_DAY_EPISODE_SLUGS_QUERYResult,
  LAST_DAY_EPISODE_SEO_QUERYResult,
  SITE_SEO_QUERYResult,
  LAST_DAY_EPISODE_QUERYResult,
} from "@/sanity/types";

const BLOCKS_CONTAINER_ID = "episode-blocks";

export async function generateStaticParams() {
  const episodes = await sanityFetch<LAST_DAY_EPISODE_SLUGS_QUERYResult>({
    query: LAST_DAY_EPISODE_SLUGS_QUERY,
    tags: ["lastDayEpisode"],
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
    sanityFetch<LAST_DAY_EPISODE_SEO_QUERYResult>({
      query: LAST_DAY_EPISODE_SEO_QUERY,
      params: { locale, formatSlug, episodeSlug },
      tags: ["lastDayEpisode"],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);

  return toMetadata(toLastDayEpisodeSeo(seoResult), toSiteSeo(siteSeoResult));
}

export default async function LastDayEpisodePageRoute({
  params,
}: {
  params: Promise<{ locale: string; formatSlug: string; episodeSlug: string }>;
}) {
  const { locale, formatSlug, episodeSlug } = await params;
  const settings = locale === "tr" ? trSettings : enSettings;

  const result = await sanityFetch<LAST_DAY_EPISODE_QUERYResult>({
    query: LAST_DAY_EPISODE_QUERY,
    params: { locale, formatSlug, episodeSlug },
    tags: ["lastDayEpisode", "lastDayFormat"],
  });

  const episode = toLastDayEpisodePage(result, formatSlug);

  if (!episode) {
    notFound();
  }

  return (
    <main>
      <SubpageHero
        hero={{ eyebrow: episode.formatName, title: episode.subject, intro: episode.standfirst }}
        backLabel={settings.backLabel}
        backHref={{ pathname: "/spark/[formatSlug]", params: { formatSlug } }}
      />

      <section className="bg-ivory px-7 pb-6">
        <div className="mx-auto flex max-w-[760px] flex-wrap items-center gap-x-4 gap-y-2 border-b border-charcoal/10 pb-8 font-mono text-[11.5px] tracking-[0.05em] text-muted uppercase">
          {/* market/parent şu an lokalize edilmemiş sabit İngilizce özel
              isimler (bkz. lastDayEpisode şeması) — lang="en" olmadan
              tarayıcı TR büyütme kuralını uygular ve "United Kingdom"
              "UNİTED KİNGDOM" olur (yanlış nokta). */}
          <span lang="en">{episode.market}</span>
          {episode.parent && <span lang="en">{episode.parent}</span>}
          {episode.publishedAt && (
            <span>
              {episode.labels.publishedLabel} {episode.publishedAt}
            </span>
          )}
          {episode.evidenceTakenAt && (
            <span>
              {episode.labels.evidenceTakenLabel} {episode.evidenceTakenAt}
            </span>
          )}
          {episode.lastCheckedAt && (
            <span>
              {episode.labels.lastCheckedLabel} {episode.lastCheckedAt}
            </span>
          )}
        </div>
      </section>

      <section className="bg-ivory px-7 pb-[120px]">
        <div className="mx-auto flex max-w-[760px] flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <EpisodeClock
              containerId={BLOCKS_CONTAINER_ID}
              dayWord={episode.labels.dayWord}
              startDay={0}
            />
            <LedgerToggle label={episode.labels.ledgerToggleLabel} />
          </div>

          <div id={BLOCKS_CONTAINER_ID}>
            <EpisodeBlocks
              blocks={episode.blocks}
              labels={episode.labels}
              correctionsHref={episode.correctionsHref}
            />
          </div>

          <Scorecard blocks={episode.blocks} labels={episode.labels} />
        </div>
      </section>
    </main>
  );
}
