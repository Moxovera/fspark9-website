import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonLd";
import { notFound } from "next/navigation";
import BackLink from "@/components/brand/BackLink";
import Label from "@/components/brand/Label";
import NextStep from "@/components/blocks/NextStep";
import SparkSubnav from "@/components/spark/SparkSubnav";
import SparkAltSlugRegistrar from "@/components/spark/SparkAltSlugRegistrar";
import EpisodeList from "@/components/spark/format/EpisodeList";
import Reveal from "@/components/ui/Reveal";
import { getChrome, getSparkHub } from "@/sanity/lib/content";
import { loadFormatIssues, slugFromOtherLocale, staticAltSlug } from "@/lib/spark";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { toMetadata } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, toSiteSeo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult } from "@/sanity/types";
import type { Locale, SparkHubContent } from "@/types/content";

// v2 format sayfası (brief v4 §7.7, board LastDay / LastDay10 ve
// mobilleri). Format, bölümler ve sıradaki sayılar Sanity'den.

type Params = Promise<{ locale: Locale; formatSlug: string }>;

export async function generateStaticParams() {
  const spark = await getSparkHub();
  return routing.locales.flatMap((locale) => spark[locale].formats.map(({ slug }) => ({ locale, formatSlug: slug })));
}

function find(spark: Record<Locale, SparkHubContent>, locale: Locale, slug: string) {
  return spark[locale].formats.find((f) => f.slug === slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, formatSlug } = await params;
  const spark = await getSparkHub();
  const format = find(spark, locale, formatSlug);
  if (!format) return {};
  const alt = staticAltSlug(spark, locale, formatSlug) ?? formatSlug;
  const siteSeoResult = await sanityFetch<SITE_SEO_QUERYResult>({
    query: SITE_SEO_QUERY,
    params: { locale },
    tags: ["siteSettings"],
  });
  const slugs = locale === "tr" ? { en: alt, tr: formatSlug } : { en: formatSlug, tr: alt };
  const paths = {
    en: getPathname({ href: { pathname: "/spark/[formatSlug]", params: { formatSlug: slugs.en } }, locale: "en" }),
    tr: getPathname({ href: { pathname: "/spark/[formatSlug]", params: { formatSlug: slugs.tr } }, locale: "tr" }),
  };
  return toMetadata(format.seo, toSiteSeo(siteSeoResult), locale, paths);
}

export default async function SparkFormatPage({ params }: { params: Params }) {
  const { locale, formatSlug } = await params;
  const [spark, site] = await Promise.all([getSparkHub(), getChrome()]);
  const { chrome, nextStep } = site[locale];
  const hub = spark[locale];
  const format = find(spark, locale, formatSlug);
  if (!format) {
    const fixed = slugFromOtherLocale(spark, locale, formatSlug);
    if (fixed) redirect({ href: { pathname: "/spark/[formatSlug]", params: { formatSlug: fixed } }, locale });
    notFound();
  }
  const { issues } = await loadFormatIssues(locale, format, hub);
  const altFormatSlug = staticAltSlug(spark, locale, formatSlug);

  return (
    <main className="pt-16 min-[900px]:pt-[84px]">
      <JsonLd
        data={breadcrumbJsonLd(locale, chrome, [
          { name: hub.sparkLabel, path: getPathname({ href: "/spark", locale }) },
          { name: format.name, path: getPathname({ href: { pathname: "/spark/[formatSlug]", params: { formatSlug } }, locale }) },
        ])}
      />
      {altFormatSlug && <SparkAltSlugRegistrar formatSlug={altFormatSlug} />}
      <SparkSubnav sparkLabel={hub.sparkLabel} formats={hub.formats} currentSlug={formatSlug} />

      <section className="on-ink bg-ink">
        <div className="flex flex-col gap-4 px-5 pt-4 pb-10 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-end min-[900px]:gap-x-6 min-[900px]:px-8 min-[900px]:pt-10 min-[900px]:pb-16 min-[1280px]:px-16">
          <div className="flex flex-col gap-4 min-[900px]:col-span-8 min-[900px]:gap-5">
            <BackLink href="/spark" label={hub.sparkLabel} ground="ink" className="-mb-2" />
            <div className="flex items-end justify-between">
              <h1 className="m-0 font-display text-[44px] leading-[0.95] font-extrabold tracking-[-0.04em] text-paper min-[900px]:text-[clamp(64px,6.112vw,88px)] min-[900px]:leading-[0.92] min-[900px]:tracking-[-0.045em]">
                {format.name}
              </h1>
              <span
                aria-hidden="true"
                className="text-outline-dust font-display text-[56px] leading-[0.8] font-extrabold tracking-[-0.06em] [-webkit-text-stroke-width:1.5px] min-[900px]:hidden"
              >
                {format.number}
              </span>
            </div>
            <p className="m-0 max-w-[560px] text-[16px] leading-[1.5] text-paper min-[900px]:text-[19px]">{format.description}</p>
          </div>
          <span
            aria-hidden="true"
            className="text-outline-dust hidden font-display text-[clamp(120px,12.5vw,180px)] leading-[0.78] font-extrabold tracking-[-0.07em] min-[900px]:col-span-4 min-[900px]:col-start-9 min-[900px]:block min-[900px]:justify-self-end"
          >
            {format.number}
          </span>
        </div>
      </section>

      <section className="bg-white px-5 pt-10 pb-12 min-[900px]:px-8 min-[900px]:pt-[72px] min-[900px]:pb-20 min-[1280px]:px-16">
        <Reveal>
          <EpisodeList issues={issues} labels={format} />
        </Reveal>
      </section>

      {format.aboutLines.length > 0 && (
        <section className="flex flex-col gap-2 bg-paper px-5 pt-9 pb-12 min-[900px]:gap-3 min-[900px]:px-8 min-[900px]:pt-12 min-[900px]:pb-16 min-[1280px]:px-16">
          <Label>{format.aboutLabel}</Label>
          <ul className="m-0 list-none p-0 min-[900px]:grid min-[900px]:grid-cols-3 min-[900px]:gap-x-6">
            {format.aboutLines.map((line) => (
              <li key={line} className="flex items-baseline gap-3 border-t border-rule py-3">
                <span aria-hidden="true" className="size-[7px] flex-none -translate-y-[2px] bg-ink" />
                <span className="text-[15px] leading-[1.5] text-ink">{line}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <NextStep content={nextStep} />
    </main>
  );
}
