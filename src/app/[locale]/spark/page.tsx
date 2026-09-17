import type { Metadata } from "next";
import SubpageHero from "@/components/subpages/SubpageHero";
import SparkPillars from "@/components/spark/SparkPillars";
import SparkFormatsList from "@/components/spark/SparkFormatsList";
import SparkCard from "@/components/spark/SparkCard";
import Reveal from "@/components/ui/Reveal";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  SPARK_SEO_QUERY,
  SITE_SEO_QUERY,
  SPARK_SECTION_QUERY,
  LAST_DAY_FORMATS_QUERY,
  SPARK_TEASER_EPISODE_QUERY,
  toSparkSeo,
  toSiteSeo,
  toSparkPage,
  toSparkTeaser,
} from "@/sanity/lib/queries";
import { toMetadata } from "@/lib/metadata";
import type {
  SPARK_SEO_QUERYResult,
  SITE_SEO_QUERYResult,
  SPARK_SECTION_QUERYResult,
  LAST_DAY_FORMATS_QUERYResult,
  SPARK_TEASER_EPISODE_QUERYResult,
} from "@/sanity/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [seoResult, siteSeoResult] = await Promise.all([
    sanityFetch<SPARK_SEO_QUERYResult>({
      query: SPARK_SEO_QUERY,
      params: { locale },
      tags: ["sparkSection"],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);

  return toMetadata(toSparkSeo(seoResult), toSiteSeo(siteSeoResult));
}

export default async function SparkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const settings = locale === "tr" ? trSettings : enSettings;

  const [sectionResult, formatsResult, teaserResult] = await Promise.all([
    sanityFetch<SPARK_SECTION_QUERYResult>({
      query: SPARK_SECTION_QUERY,
      params: { locale },
      tags: ["sparkSection"],
    }),
    sanityFetch<LAST_DAY_FORMATS_QUERYResult>({
      query: LAST_DAY_FORMATS_QUERY,
      params: { locale },
      tags: ["lastDayFormat", "lastDayEpisode"],
    }),
    sanityFetch<SPARK_TEASER_EPISODE_QUERYResult>({
      query: SPARK_TEASER_EPISODE_QUERY,
      params: { locale },
      tags: ["lastDayEpisode"],
    }),
  ]);

  const page = toSparkPage(sectionResult, formatsResult, toSparkTeaser(teaserResult));

  return (
    <main>
      <SubpageHero hero={page.hero} backLabel={settings.backLabel} />

      <section className="bg-navy px-7 pb-[104px]">
        <div className="mx-auto max-w-[1000px]">
          <SparkPillars pillars={page.pillars} />
        </div>
      </section>

      {page.formats.length > 0 && (
        <section className="border-t border-ivory/[0.08] bg-navy px-7 py-[88px]">
          <div className="mx-auto max-w-[1000px]">
            <Reveal>
              <p className="mb-10 max-w-[62ch] text-[1.02rem] leading-[1.66] text-ivory/70">
                {page.closingLine}
              </p>
              <SparkFormatsList formats={page.formats} />
            </Reveal>
          </div>
        </section>
      )}

      {page.teaser && (
        <section className="border-t border-ivory/[0.08] bg-navy px-7 pb-[120px]">
          <div className="mx-auto max-w-[1000px]">
            <Reveal>
              <SparkCard teaser={page.teaser} />
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}
