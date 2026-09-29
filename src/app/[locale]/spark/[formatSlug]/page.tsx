import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonLd";
import { notFound } from "next/navigation";
import BackLink from "@/components/brand/BackLink";
import CutButton from "@/components/brand/CutButton";
import Label from "@/components/brand/Label";
import NextStep from "@/components/blocks/NextStep";
import SparkSubnav from "@/components/spark/SparkSubnav";
import SparkAltSlugRegistrar from "@/components/spark/SparkAltSlugRegistrar";
import SparkEpisodeRow from "@/components/spark/SparkEpisodeRow";
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

// Format sayfası (Son Gün v3, prototip _design/v2/boards/son-gun-01-bo-v3.html
// format görünümü): Ink açılış, "Nasıl okunur" kartları, bölüm satırları,
// NextStep. Format, bölümler ve sıradaki sayılar Sanity'den.

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
  setRequestLocale(locale);
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
  // Prototip: Nº 01 üstte, sıradakiler altta.
  const rows = [...issues].sort((a, b) => a.number - b.number);
  const first = rows.find((issue) => issue.status === "published" && issue.href);

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

      <section className="on-ink bg-ink px-5 pt-4 pb-[100px] min-[900px]:px-8 min-[1280px]:px-16">
        <BackLink href="/spark" label={hub.sparkLabel} ground="ink" />
        <div className="mt-10 grid grid-cols-1 gap-6 min-[761px]:mt-16 min-[761px]:grid-cols-12 min-[761px]:items-end">
          <div className="min-[761px]:col-span-7">
            <h1 className="mt-0 mb-7 font-display text-[clamp(68px,11vw,168px)] leading-[0.88] font-extrabold tracking-[-0.05em] text-paper">
              {format.name}
            </h1>
            <p className="mt-0 mb-9 max-w-[32ch] text-[21px] leading-[1.45] text-paper">{format.line}</p>
            {format.startLabel && first?.href && <CutButton label={format.startLabel} href={first.href} />}
          </div>
          <span
            aria-hidden="true"
            className="text-outline-dust order-first font-display text-[110px] leading-[0.8] font-extrabold tracking-[-0.06em] min-[761px]:order-none min-[761px]:col-span-4 min-[761px]:col-start-9 min-[761px]:justify-self-end min-[761px]:text-[clamp(120px,17vw,250px)]"
          >
            {format.number}
          </span>
        </div>
      </section>

      <div className="px-5 pb-[110px] min-[900px]:px-8 min-[1280px]:px-16">
        {format.howSteps.length > 0 && (
          <section className="pt-24">
            <div className="border-t-2 border-ink pt-[18px]">
              <Label strong>
                {format.howLabel}
              </Label>
              <h2 className="mt-[10px] mb-0 max-w-[24ch] font-display text-[clamp(26px,3.2vw,36px)] leading-[1.1] font-bold tracking-[-0.025em] text-ink">
                {format.howHeading}
              </h2>
            </div>
            <Reveal className="mt-9 grid grid-cols-1 gap-6 min-[901px]:grid-cols-3">
              {format.howSteps.map((step, i) => (
                <div key={step.title} className="border-t-2 border-ink bg-white p-6">
                  <Label as="span" strong>
                    {String(i + 1)}
                  </Label>
                  <b className="mt-3 mb-2 block font-display text-[24px] leading-[1.15] font-bold tracking-[-0.02em] text-ink">
                    {step.title}
                  </b>
                  <p className="m-0 text-[17px] leading-[1.6] text-stone">{step.body}</p>
                </div>
              ))}
            </Reveal>
          </section>
        )}

        <section className="pt-24">
          <div className="border-t-2 border-ink pt-[18px]">
            <Label strong>
              {format.episodesLabel}
            </Label>
          </div>
          <div className="mt-8 border-t border-rule">
            {rows.map((issue) => (
              <SparkEpisodeRow
                key={issue.numberLabel}
                title={issue.subject}
                line={issue.hook}
                meta={
                  issue.status === "published"
                    ? [issue.numberLabel, issue.durationLabel ?? (issue.days !== null ? `${issue.days} ${format.daysUnit}` : ""), issue.statusLabel]
                        .filter(Boolean)
                        .join(" · ")
                    : `${issue.numberLabel} · ${issue.statusLabel}`
                }
                href={issue.status === "published" ? issue.href : undefined}
              />
            ))}
          </div>
        </section>
      </div>

      <NextStep content={nextStep} heading={format.closeHeading} />
    </main>
  );
}
