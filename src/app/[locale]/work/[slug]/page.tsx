import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import JsonLd from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, personInfo } from "@/lib/jsonLd";
import { notFound } from "next/navigation";
import BackLink from "@/components/brand/BackLink";
import Label from "@/components/brand/Label";
import NextStep from "@/components/blocks/NextStep";
import PairAndResult from "@/components/blocks/PairAndResult";
import CasePhones from "@/components/work/CasePhones";
import MarkerFigures from "@/components/work/MarkerFigures";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/components/icons";
import { getCases, getChrome, getHome, getWorkPage } from "@/sanity/lib/content";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { toMetadata } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, toSiteSeo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult } from "@/sanity/types";
import type { Locale } from "@/types/content";

// v2 vaka sayfası (brief v4 §7.4, board CaseInsha / CaseInshaM). İçerik
// ve ekran görüntüleri Sanity caseStudy belgesinden, etiketler workPage'ten.

type Params = Promise<{ locale: Locale; slug: string }>;

export async function generateStaticParams() {
  const cases = await getCases();
  return routing.locales.flatMap((locale) => cases[locale].map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = (await getCases())[locale].find((c) => c.slug === slug);
  if (!item) return {};
  const siteSeoResult = await sanityFetch<SITE_SEO_QUERYResult>({
    query: SITE_SEO_QUERY,
    params: { locale },
    tags: ["siteSettings"],
  });
  const href = { pathname: "/work/[slug]" as const, params: { slug } };
  const paths = { en: getPathname({ href, locale: "en" }), tr: getPathname({ href, locale: "tr" }) };
  return toMetadata(item.seo, toSiteSeo(siteSeoResult), locale, paths);
}

export default async function CasePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const [cases, workPage, site, home] = await Promise.all([getCases(), getWorkPage(), getChrome(), getHome()]);
  const { chrome, services, nextStep } = site[locale];
  const list = cases[locale];
  const index = list.findIndex((c) => c.slug === slug);
  if (index < 0) notFound();
  const item = list[index];
  const next = list[(index + 1) % list.length];
  const labels = workPage[locale];

  const screens = item.screens ?? [];

  // Sonuç kadranı: vakanın hizmetlerinin dilim birleşimi (brief §6.1).
  const slices = [
    ...new Set(services.filter((s) => item.services.includes(s.slug)).flatMap((s) => [...s.slices])),
  ];

  const path = getPathname({ href: { pathname: "/work/[slug]", params: { slug } }, locale });

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbJsonLd(locale, chrome, [
            { name: chrome.nav[0].label, path: getPathname({ href: "/work", locale }) },
            { name: item.name, path },
          ]),
          articleJsonLd(locale, personInfo(home[locale], chrome), {
            headline: item.subtitle,
            description: item.seo.description,
            path,
            about: item.name,
            datePublished: item.publishedAt,
            dateModified: item.modifiedAt,
          }),
        ]}
      />
      <section className="on-ink bg-ink pt-16 min-[900px]:pt-[84px]">
        <div className="flex flex-col gap-5 px-5 pt-6 pb-16 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-center min-[900px]:gap-x-6 min-[900px]:px-8 min-[900px]:pt-20 min-[900px]:pb-24 min-[1280px]:px-16">
          <div className="flex flex-col gap-5 min-[900px]:col-span-8 min-[900px]:gap-7">
            <BackLink href="/work" label={labels.caseBackLabel} ground="ink" className="-mb-2" />
            <Label ground="ink">{[labels.caseLabel, item.tags, item.market].join(" · ")}</Label>
            <h1 className="m-0 font-display text-[88px] leading-[0.98] font-extrabold tracking-[-0.04em] text-paper min-[900px]:text-[clamp(112px,11.112vw,160px)] min-[900px]:leading-[0.95]">
              {item.name}
            </h1>
            <p className="m-0 max-w-[680px] font-display text-[24px] leading-[1.15] font-bold tracking-[-0.02em] text-paper min-[900px]:text-[34px]">
              {item.subtitle}
            </p>
          </div>
          {screens.length > 0 && (
            <div className="hidden min-[900px]:col-span-4 min-[900px]:col-start-9 min-[900px]:flex min-[900px]:justify-end">
              <CasePhones screens={screens} />
            </div>
          )}
        </div>
      </section>

      {item.figures && <MarkerFigures figures={item.figures} locale={locale} />}
      {screens.length > 0 && (
        <section className="bg-white px-5 pt-2 pb-12 min-[900px]:hidden">
          <CasePhones screens={screens} />
        </section>
      )}

      <PairAndResult
        pair={[
          { label: item.problem.label, lead: item.problem.lead, body: item.problem.body },
          { label: item.actions.label, items: item.actions.items },
        ]}
        result={{ label: item.delivered.label, lead: item.delivered.lead, body: item.delivered.body }}
        slices={slices}
        footer={
          <Label>
            {labels.sourcesLabel} ·{" "}
            {item.sources.map((source, i) => (
              <span key={source}>
                <span className="whitespace-nowrap">{source}</span>
                {i < item.sources.length - 1 ? ", " : ""}
              </span>
            ))}
          </Label>
        }
      />

      {next.slug !== item.slug && (
        <Link
          href={{ pathname: "/work/[slug]", params: { slug: next.slug } }}
          className="group flex items-center justify-between bg-white px-5 py-7 no-underline min-[900px]:px-16 min-[900px]:py-12"
        >
          <span className="flex flex-col gap-2">
            <Label as="span">{labels.nextCaseLabel}</Label>
            <span className="font-display text-[36px] leading-[normal] font-extrabold tracking-[-0.04em] text-ink min-[900px]:text-[64px]">
              {next.name}
            </span>
          </span>
          <ArrowRightIcon className="go-arrow size-7 text-ink min-[900px]:size-10" />
        </Link>
      )}

      <NextStep content={nextStep} />
    </main>
  );
}
