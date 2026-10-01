import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import BackLink from "@/components/brand/BackLink";
import Label from "@/components/brand/Label";
import NextStep from "@/components/blocks/NextStep";
import { ArrowDownIcon } from "@/components/icons";
import SparkSubnav from "@/components/spark/SparkSubnav";
import SparkAltSlugRegistrar from "@/components/spark/SparkAltSlugRegistrar";
import EpisodeStory from "@/components/spark/episode/EpisodeStory";
import DecisionEpisode from "@/components/spark/decisions/DecisionEpisode";
import StoryCard from "@/components/spark/episode/StoryCard";
import { getChrome, getHome, getSparkEpisodes, getSparkHub } from "@/sanity/lib/content";
import { articleJsonLd, breadcrumbJsonLd, personInfo } from "@/lib/jsonLd";
import { slugFromOtherLocale } from "@/lib/spark";
import { toMetadata } from "@/lib/metadata";
import { getPathname, redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, toSiteSeo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult } from "@/sanity/types";
import type { Locale, SparkEpisodeEntry } from "@/types/content";

// Bölüm sayfası. İki şablon, bölümün `layout` alanına göre:
// story (Son Gün v3, prototip _design/v2/boards/son-gun-01-bo-v3.html):
// tam ekran Ink açılış ve yükselen kart (Fidor'da kart yerine çerçeve gün
// sayısı), sonra kartın ya da gün saatinin izlediği hikâye (EpisodeStory), NextStep.
// decisions (Nº 02, prototip _design/v2/boards/son-gun-02-nuri-v2.html):
// geri link, Ink açılış, cetvel, karar blokları (DecisionEpisode), NextStep. İçerik Sanity'den
// (getSparkEpisodes); tarayıcıda hiçbir şey saklanmıyor.

type Params = Promise<{ locale: Locale; formatSlug: string; episodeSlug: string }>;

export async function generateStaticParams() {
  const episodes = await getSparkEpisodes();
  return routing.locales.flatMap((locale) =>
    episodes[locale].map((entry) => ({ locale, formatSlug: entry.formatSlug, episodeSlug: entry.slug })),
  );
}

function find(episodes: SparkEpisodeEntry[], formatSlug: string, episodeSlug: string) {
  return episodes.find((entry) => entry.formatSlug === formatSlug && entry.slug === episodeSlug);
}

function episodePath(locale: Locale, formatSlug: string, episodeSlug: string) {
  return getPathname({ href: { pathname: "/spark/[formatSlug]/[episodeSlug]", params: { formatSlug, episodeSlug } }, locale });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, formatSlug, episodeSlug } = await params;
  const [episodes, siteSeoResult] = await Promise.all([
    getSparkEpisodes(),
    sanityFetch<SITE_SEO_QUERYResult>({ query: SITE_SEO_QUERY, params: { locale }, tags: ["siteSettings"] }),
  ]);
  const entry = find(episodes[locale], formatSlug, episodeSlug);
  if (!entry) return {};
  const other: Locale = locale === "tr" ? "en" : "tr";
  const paths = {
    [locale]: episodePath(locale, entry.formatSlug, entry.slug),
    [other]: episodePath(other, entry.altFormatSlug, entry.altSlug),
  } as Record<Locale, string>;
  // OG görseli bölümün kendisi (/og/episode): etiket, konu, süre.
  const enSlug = locale === "en" ? entry.slug : entry.altSlug;
  const ogImage = {
    url: `/og/episode?slug=${encodeURIComponent(enSlug)}${locale === "tr" ? "&locale=tr" : ""}`,
    alt: entry.story.seo.title,
    width: 1200,
    height: 630,
  };
  return toMetadata({ ...entry.story.seo, ogImage }, toSiteSeo(siteSeoResult), locale, paths);
}

export default async function SparkEpisodePage({ params }: { params: Params }) {
  const { locale, formatSlug, episodeSlug } = await params;
  setRequestLocale(locale);
  const [spark, site, home, episodes] = await Promise.all([getSparkHub(), getChrome(), getHome(), getSparkEpisodes()]);
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
    notFound();
  }
  const entry = find(episodes[locale], formatSlug, episodeSlug);
  if (!entry) notFound();
  const path = episodePath(locale, formatSlug, episodeSlug);
  const jsonLd = [
    breadcrumbJsonLd(locale, chrome, [
      { name: hub.sparkLabel, path: getPathname({ href: "/spark", locale }) },
      { name: format.name, path: getPathname({ href: { pathname: "/spark/[formatSlug]", params: { formatSlug } }, locale }) },
      { name: entry.story.subject, path },
    ]),
    articleJsonLd(locale, personInfo(home[locale], chrome), {
      headline: entry.story.seo.title.split(" | ")[0],
      description: entry.story.seo.description,
      path,
      datePublished: entry.publishedAt ?? undefined,
      dateModified: entry.modifiedAt ?? undefined,
      isPartOf: format.name,
    }),
  ];

  if (entry.layout === "decisions") {
    // Okur cevabının e-posta konusu her dilde TR: "Son Gün Nº 02 · Nuri".
    const trFormat = locale === "tr" ? format : spark.tr.formats.find((f) => f.slug === entry.altFormatSlug);
    const trEntry = episodes.tr.find((e) => e.story.number === entry.story.number && e.formatSlug === (trFormat?.slug ?? ""));
    const answerSubject = `${trFormat?.name ?? format.name} Nº ${String(entry.story.number).padStart(2, "0")} · ${trEntry?.story.subject ?? entry.story.subject}`;
    return (
      <main className="pt-16 min-[900px]:pt-[84px]">
        <JsonLd data={jsonLd} />
        <SparkAltSlugRegistrar formatSlug={entry.altFormatSlug} episodeSlug={entry.altSlug} />
        <SparkSubnav sparkLabel={hub.sparkLabel} formats={hub.formats} currentSlug={formatSlug} />
        <div className="mx-auto max-w-[1240px] px-5 min-[861px]:px-8">
          <BackLink href={{ pathname: "/spark/[formatSlug]", params: { formatSlug } }} label={format.name} ground="paper" />
        </div>
        <DecisionEpisode episode={entry.story} answerSubject={answerSubject} slug={locale === "en" ? entry.slug : entry.altSlug} lang={locale} />
        <NextStep content={nextStep} />
      </main>
    );
  }

  const { story } = entry;
  // Bölüm sonundaki "sıradaki" satırı: aynı formatta bir sonraki sayı yayındaysa link.
  const next = episodes[locale].find((e) => e.formatSlug === formatSlug && e.story.number === story.number + 1);

  return (
    <main className="pt-16 min-[900px]:pt-[84px]">
      <JsonLd data={jsonLd} />
      <SparkAltSlugRegistrar formatSlug={entry.altFormatSlug} episodeSlug={entry.altSlug} />
      <SparkSubnav sparkLabel={hub.sparkLabel} formats={hub.formats} currentSlug={formatSlug} />

      <section className="on-ink flex min-h-[calc(100svh-109px)] flex-col overflow-hidden bg-ink min-[900px]:min-h-[calc(100svh-129px)]">
        <div className="px-5 pt-4 min-[900px]:px-8 min-[1280px]:px-16">
          <BackLink href={{ pathname: "/spark/[formatSlug]", params: { formatSlug } }} label={format.name} ground="ink" />
        </div>
        <div className="flex flex-1 px-5 min-[900px]:px-8 min-[1280px]:px-16">
          <div className="grid w-full grid-cols-1 items-center gap-6 pt-6 pb-[72px] min-[901px]:grid-cols-12">
            <div className="min-[901px]:col-span-7">
              <Label ground="ink">
                {story.hero.label}
              </Label>
              <h1 className="mt-[18px] mb-[26px] max-w-[15ch] font-display text-[clamp(42px,6vw,92px)] leading-[0.96] font-extrabold tracking-[-0.04em] text-paper">
                {story.hero.title}
              </h1>
              <p className="mt-0 mb-[14px] max-w-[34ch] text-[21px] leading-[1.45] text-paper">{story.hero.sub}</p>
              <p className="mt-0 mb-[38px] max-w-[40ch] text-[17px] leading-[1.6] text-dust">{story.hero.invite}</p>
              <a
                href={`#${story.chapters[0]?.id ?? ""}`}
                className="inline-flex items-center gap-[10px] bg-paper px-6 py-4 text-[17px] leading-none font-bold text-ink no-underline"
              >
                {story.hero.startLabel}
                <ArrowDownIcon className="size-4 flex-none" />
              </a>
            </div>
            {story.hero.figure ? (
              // Nº 03 Fidor: kart yerine çerçeve gün sayısı (prototip son-gun-fidor `.bigcount`).
              <div
                aria-hidden="true"
                className="order-first flex min-w-0 flex-col items-start gap-[10px] min-[901px]:order-none min-[901px]:col-span-5 min-[901px]:col-start-8 min-[901px]:items-end"
              >
                <span className="text-outline-dust font-display text-[96px] leading-[0.8] font-extrabold tracking-[-0.06em] min-[901px]:text-[clamp(96px,12vw,190px)]">
                  {story.hero.figure}
                </span>
                <span className="font-mono text-[12.5px] leading-[1.5] font-medium tracking-[0.08em] text-dust uppercase">
                  {story.hero.figureLabel}
                </span>
              </div>
            ) : (
              <div className="order-first flex justify-start min-[901px]:order-none min-[901px]:col-span-4 min-[901px]:col-start-9 min-[901px]:justify-center">
                <StoryCard
                  mode="live"
                  front={{ day: story.hero.cardDay, state: story.hero.cardState }}
                  className="card-rise w-[220px]"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <EpisodeStory
        story={story}
        labels={hub.episode}
        nextHref={
          next
            ? { pathname: "/spark/[formatSlug]/[episodeSlug]", params: { formatSlug, episodeSlug: next.slug } }
            : undefined
        }
      />

      <NextStep content={nextStep} heading={story.closeHeading} />
    </main>
  );
}
