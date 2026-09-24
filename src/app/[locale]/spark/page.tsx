import type { Metadata } from "next";
import BackLink from "@/components/brand/BackLink";
import Label from "@/components/brand/Label";
import NextStep from "@/components/blocks/NextStep";
import FormatBlock from "@/components/spark/hub/FormatBlock";
import SparkTicker from "@/components/spark/hub/SparkTicker";
import Reveal from "@/components/ui/Reveal";
import { spark } from "@/content/spark";
import { nextStep } from "@/content/chrome";
import { loadFormatIssues } from "@/lib/spark";
import { getPathname } from "@/i18n/navigation";
import { toMetadata } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, toSiteSeo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult } from "@/sanity/types";
import type { Locale } from "@/types/content";

// v2 Spark (brief v4 §7.7, board SparkIndex / SparkIndexM). Etiketler
// src/content/spark.ts'ten, yayındaki sayılar Sanity'den.

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteSeoResult = await sanityFetch<SITE_SEO_QUERYResult>({
    query: SITE_SEO_QUERY,
    params: { locale },
    tags: ["siteSettings"],
  });
  const paths = { en: getPathname({ href: "/spark", locale: "en" }), tr: getPathname({ href: "/spark", locale: "tr" }) };
  return toMetadata(spark[locale].seo, toSiteSeo(siteSeoResult), locale, paths);
}

export default async function SparkPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const hub = spark[locale];
  const formats = await Promise.all(
    hub.formats.map(async (format) => ({ format, ...(await loadFormatIssues(locale, format, hub)) })),
  );

  return (
    <main>
      <section className="on-ink bg-ink pt-16 min-[900px]:pt-[84px]">
        <div className="flex flex-col gap-[18px] px-5 pt-6 pb-11 min-[900px]:gap-5 min-[900px]:px-8 min-[900px]:pt-14 min-[900px]:pb-20 min-[1280px]:px-16">
          <BackLink href="/" label={hub.backLabel} ground="ink" className="-mb-2" />
          <div className="flex flex-col gap-[18px] min-[900px]:flex-row min-[900px]:items-end min-[900px]:justify-between min-[900px]:gap-12">
            <span
              aria-hidden="true"
              className="font-display text-[96px] leading-[0.85] font-extrabold tracking-[-0.055em] text-paper min-[900px]:-ml-[10px] min-[900px]:text-[clamp(160px,18.056vw,260px)] min-[900px]:leading-[0.8] min-[900px]:tracking-[-0.06em]"
            >
              {hub.bigWord}
            </span>
            <h1 className="m-0 mt-1 max-w-[440px] font-display text-[26px] leading-[1.12] font-bold tracking-[-0.02em] text-paper min-[900px]:mt-0 min-[900px]:mb-[14px] min-[900px]:text-[34px] min-[900px]:tracking-[-0.025em]">
              {hub.heading}
            </h1>
          </div>
        </div>
        <SparkTicker items={[...hub.tickerItems, hub.tickerTail]} />
      </section>

      <section className="bg-paper px-5 pt-12 pb-16 min-[900px]:px-8 min-[900px]:pt-24 min-[900px]:pb-[120px] min-[1280px]:px-16">
        <Reveal className="flex flex-col gap-4 min-[900px]:gap-6">
          <Label>{hub.formatsLabel}</Label>
          {formats.map(({ format, issues }) => (
            <FormatBlock key={format.slug} format={format} issues={issues} readLabel={hub.readLabel} />
          ))}
        </Reveal>
      </section>

      <NextStep content={nextStep[locale]} />
    </main>
  );
}
