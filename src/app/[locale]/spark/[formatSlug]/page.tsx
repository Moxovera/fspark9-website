import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubpageHero from "@/components/subpages/SubpageHero";
import SparkPillars from "@/components/spark/SparkPillars";
import CorrectionsPanel from "@/components/spark/CorrectionsPanel";
import EpisodeList from "@/components/spark/EpisodeList";
import Reveal from "@/components/ui/Reveal";
import { siteSettings as enSettings } from "@/content/en";
import { siteSettings as trSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  LAST_DAY_FORMAT_SLUGS_QUERY,
  LAST_DAY_FORMAT_SEO_QUERY,
  SITE_SEO_QUERY,
  LAST_DAY_FORMAT_QUERY,
  toLastDayFormatSeo,
  toSiteSeo,
  toLastDayFormatPage,
} from "@/sanity/lib/queries";
import { toMetadata } from "@/lib/metadata";
import type {
  LAST_DAY_FORMAT_SLUGS_QUERYResult,
  LAST_DAY_FORMAT_SEO_QUERYResult,
  SITE_SEO_QUERYResult,
  LAST_DAY_FORMAT_QUERYResult,
} from "@/sanity/types";

// locale + formatSlug KOMBİNASYONLARI elle üretiliyor — the-last-day/
// son-gun gibi slug'lar locale'e göre farklı, next-intl'in statik
// pathnames haritası bunu desteklemiyor (bkz. routing.ts yorumu).
export async function generateStaticParams() {
  const formats = await sanityFetch<LAST_DAY_FORMAT_SLUGS_QUERYResult>({
    query: LAST_DAY_FORMAT_SLUGS_QUERY,
    tags: ["lastDayFormat"],
  });

  return formats.flatMap((format) => {
    const params: { locale: string; formatSlug: string }[] = [];
    if (format.en) params.push({ locale: "en", formatSlug: format.en });
    if (format.tr) params.push({ locale: "tr", formatSlug: format.tr });
    return params;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; formatSlug: string }>;
}): Promise<Metadata> {
  const { locale, formatSlug } = await params;
  const [seoResult, siteSeoResult] = await Promise.all([
    sanityFetch<LAST_DAY_FORMAT_SEO_QUERYResult>({
      query: LAST_DAY_FORMAT_SEO_QUERY,
      params: { locale, formatSlug },
      tags: ["lastDayFormat"],
    }),
    sanityFetch<SITE_SEO_QUERYResult>({
      query: SITE_SEO_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
  ]);

  return toMetadata(toLastDayFormatSeo(seoResult), toSiteSeo(siteSeoResult));
}

export default async function LastDayFormatPageRoute({
  params,
}: {
  params: Promise<{ locale: string; formatSlug: string }>;
}) {
  const { locale, formatSlug } = await params;
  const settings = locale === "tr" ? trSettings : enSettings;

  const result = await sanityFetch<LAST_DAY_FORMAT_QUERYResult>({
    query: LAST_DAY_FORMAT_QUERY,
    params: { locale, formatSlug },
    tags: ["lastDayFormat", "lastDayEpisode"],
  });

  if (!result) {
    notFound();
  }

  const page = toLastDayFormatPage(result, formatSlug);

  return (
    <main>
      <SubpageHero hero={page.hero} backLabel={settings.backLabel} backHref="/spark" />

      <section className="bg-navy px-7 pb-[104px]">
        <div className="mx-auto max-w-[1000px]">
          <SparkPillars pillars={page.howItWorks} />
        </div>
      </section>

      <section id="corrections" className="border-t border-ivory/[0.08] bg-navy px-7 py-[88px]">
        <div className="mx-auto max-w-[1000px]">
          <Reveal>
            <p className="mb-10 max-w-[62ch] text-[1.02rem] leading-[1.66] text-ivory/70">
              {page.closingLine}
            </p>
            <CorrectionsPanel lines={page.corrections} />
          </Reveal>
        </div>
      </section>

      {page.episodes.length > 0 && (
        <section className="border-t border-ivory/[0.08] bg-navy px-7 pb-[120px]">
          <div className="mx-auto max-w-[1000px]">
            <Reveal>
              <EpisodeList episodes={page.episodes} />
            </Reveal>
          </div>
        </section>
      )}
    </main>
  );
}
