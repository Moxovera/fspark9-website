import "server-only";

import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";
import { formatShortDate } from "@/lib/format";
import type {
  ABOUT_PAGE_QUERYResult,
  CASES_QUERYResult,
  HOME_PAGE_QUERYResult,
  SERVICE_PAGES_QUERYResult,
  SERVICES_PAGE_QUERYResult,
  SITE_CHROME_QUERYResult,
  SPARK_CARDS_QUERYResult,
  SPARK_HUB_QUERYResult,
  WORK_PAGE_QUERYResult,
} from "@/sanity/types";
import type {
  AboutContent,
  CaseContent,
  HomeContent,
  Locale,
  NavHref,
  NextStepContent,
  ServicePageContent,
  ServiceSlug,
  ServiceSummary,
  ServicesIndexContent,
  SiteChrome,
  SparkCardContent,
  SparkHubContent,
  WorkPageContent,
} from "@/types/content";

/**
 * Sayfa içeriği Sanity'den. Her yükleyici tek sorguyla iki dili birden
 * çekiyor ve `Record<Locale, T>` döndürüyor: sayfalar `content[locale]`
 * ile, eski statik dosyalarla (src/content, artık seed ve drift
 * kaynağı) aynı şekilde okuyor. İki dilli alanlar (`localeString`,
 * `localeText`) `localize()` ile tek dile iniyor; TR boşsa EN.
 *
 * Belgeler seed-v3 ile eksiksiz yazılıyor ve `check:drift` alan alan
 * doğruluyor; tipler bu yüzden alanları dolu kabul ediyor.
 */

type LocaleValue = { _type: "localeString" | "localeText"; en?: string | null; tr?: string | null };

type Localized<T> = T extends LocaleValue
  ? string
  : T extends (infer U)[]
    ? Localized<NonNullable<U>>[]
    : T extends object
      ? { [K in keyof T as K extends "_type" | "_key" ? never : K]-?: Localized<NonNullable<T[K]>> }
      : T;

function isLocaleValue(value: unknown): value is LocaleValue {
  const type = (value as { _type?: unknown } | null)?._type;
  return type === "localeString" || type === "localeText";
}

/** İki dilli değerleri `locale` diline indirir, `_type`/`_key` alanlarını atar. */
export function localize<T>(value: T, locale: Locale): Localized<NonNullable<T>> {
  const walk = (v: unknown): unknown => {
    if (isLocaleValue(v)) return (locale === "tr" ? v.tr || v.en : v.en) ?? "";
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") {
      const out: Record<string, unknown> = {};
      for (const [k, inner] of Object.entries(v)) {
        if (k === "_type" || k === "_key") continue;
        out[k] = walk(inner);
      }
      return out;
    }
    return v;
  };
  return walk(value) as Localized<NonNullable<T>>;
}

function perLocale<T>(build: (locale: Locale) => T): Record<Locale, T> {
  return { en: build("en"), tr: build("tr") };
}

const pad = (n: number) => `Nº ${String(n).padStart(2, "0")}`;

// ─── Site çerçevesi ───────────────────────────────────────────────

export const SITE_CHROME_QUERY = defineQuery(`{
  "site": *[_type == "siteSettings" && _id == "siteSettings"][0]{
    brandName, homeLabel, servicesLabel, nav, servicesMenu, bookLabel,
    menuLabel, menuOpenLabel, menuCloseLabel, footer, booking, nextStep, legal
  },
  "services": *[_type == "servicePage"] | order(order asc){ slug, name, shortLine, audience, slices }
}`);

export interface ChromeContent {
  chrome: SiteChrome;
  services: ServiceSummary[];
  nextStep: NextStepContent;
  calLink: string;
}

function toServiceSummary(raw: Localized<SITE_CHROME_QUERYResult["services"][number]>): ServiceSummary {
  return { ...raw, slug: raw.slug as ServiceSlug, slices: raw.slices ?? [] };
}

export async function getChrome(): Promise<Record<Locale, ChromeContent>> {
  const raw = await sanityFetch<SITE_CHROME_QUERYResult>({
    query: SITE_CHROME_QUERY,
    tags: ["siteSettings", "servicePage"],
  });
  return perLocale((locale) => {
    const { site, services } = localize(raw, locale);
    const links = (items: { label: string; href: string }[]) =>
      items.map((item) => ({ label: item.label, href: item.href as NavHref }));
    return {
      chrome: {
        brandName: site.brandName,
        homeLabel: site.homeLabel,
        servicesLabel: site.servicesLabel,
        nav: links(site.nav),
        servicesMenu: site.servicesMenu,
        bookLabel: site.bookLabel,
        menuLabel: site.menuLabel,
        menuOpenLabel: site.menuOpenLabel,
        menuCloseLabel: site.menuCloseLabel,
        footer: { ...site.footer, legalLinks: links(site.footer.legalLinks) },
        booking: {
          title: site.booking.title,
          meta: site.booking.meta,
          closeLabel: site.booking.closeLabel,
          poweredBy: site.booking.poweredBy,
        },
        legal: { ...site.legal, tabs: links(site.legal.tabs) },
      },
      services: services.map(toServiceSummary),
      nextStep: site.nextStep,
      calLink: site.booking.calLink,
    };
  });
}

// ─── Ana sayfa ─────────────────────────────────────────────────────

export const HOME_PAGE_QUERY = defineQuery(`*[_type == "homePage" && _id == "homePage"][0]{
  seo{ title, description },
  opening{ ..., "portraitUrl": portrait.asset->url },
  startWhereYouAre,
  fourServices,
  work{
    label, heading, allLinkLabel, alsoLabel, also,
    featured{
      label, heading, text, figures, linkLabel,
      "slug": caseStudy->slug,
      "screens": caseStudy->screens[0...2]{ "src": asset->url, alt }
    },
    rows[]{ line, tags, "slug": caseStudy->slug, "name": caseStudy->name }
  },
  withMe{ ..., "portraitUrl": portrait.asset->url },
  spark
}`);

export const SPARK_CARDS_QUERY = defineQuery(`*[_type == "sparkEpisode" && status in ["published", "coming"]]
  | order(format->orderRank asc, number asc)[0...3]{
    number, subject, hook, cardLine, status, publishedAt,
    "episodeSlug": slug,
    "format": format->{ name, singularName, slug, comingLabel }
  }`);

export async function getHome(): Promise<Record<Locale, HomeContent>> {
  const [raw, cards, spark] = await Promise.all([
    sanityFetch<HOME_PAGE_QUERYResult>({ query: HOME_PAGE_QUERY, tags: ["homePage", "caseStudy"] }),
    sanityFetch<SPARK_CARDS_QUERYResult>({ query: SPARK_CARDS_QUERY, tags: ["sparkEpisode", "sparkFormat"] }),
    getSparkHub(),
  ]);
  return perLocale((locale) => {
    const page = localize(raw, locale);
    const sparkCards: SparkCardContent[] = cards.map((card) => {
      const c = localize(card, locale);
      const base = {
        format: c.format.singularName || c.format.name,
        number: pad(c.number),
        title: c.subject,
        line: c.cardLine || c.hook,
      };
      if (c.status !== "published") return { ...base, status: c.format.comingLabel };
      return {
        ...base,
        date: c.publishedAt ? formatShortDate(c.publishedAt, locale) : spark[locale].launchDateLabel,
        linkLabel: page.spark.cardLinkLabel,
        href: {
          pathname: "/spark/[formatSlug]/[episodeSlug]",
          params: { formatSlug: c.format.slug[locale].current, episodeSlug: c.episodeSlug[locale].current },
        },
      };
    });
    const { portraitUrl: openingPortrait, ...opening } = page.opening;
    const { portraitUrl: withMePortrait, ...withMe } = page.withMe;
    return {
      seo: page.seo,
      opening: { ...opening, portraitSrc: openingPortrait || undefined },
      startWhereYouAre: page.startWhereYouAre,
      fourServices: page.fourServices,
      work: {
        ...page.work,
        featured: {
          ...page.work.featured,
          screens: page.work.featured.screens.map((s) => ({ src: s.src, alt: s.alt ?? "" })),
        },
      },
      withMe: { ...withMe, portraitSrc: withMePortrait || undefined },
      spark: {
        label: page.spark.label,
        heading: page.spark.heading,
        text: page.spark.text,
        linkLabel: page.spark.linkLabel,
        cards: sparkCards,
      },
    };
  });
}

// ─── Hizmetler ─────────────────────────────────────────────────────

export const SERVICES_PAGE_QUERY = defineQuery(`*[_type == "servicesPage" && _id == "servicesPage"][0]{
  seo{ title, description }, backLabel, opening, servicePageLabels
}`);

export const SERVICE_PAGES_QUERY = defineQuery(`*[_type == "servicePage"] | order(order asc){
  slug, seo{ title, description }, opening, steps[]{ title, line, slices }, keep
}`);

export async function getServicesIndex(): Promise<Record<Locale, ServicesIndexContent>> {
  const raw = await sanityFetch<SERVICES_PAGE_QUERYResult>({ query: SERVICES_PAGE_QUERY, tags: ["servicesPage"] });
  return perLocale((locale) => {
    const { seo, backLabel, opening } = localize(raw, locale);
    return { seo, backLabel, opening };
  });
}

export async function getServicePages(): Promise<Record<Locale, ServicePageContent[]>> {
  const [index, pages] = await Promise.all([
    sanityFetch<SERVICES_PAGE_QUERYResult>({ query: SERVICES_PAGE_QUERY, tags: ["servicesPage"] }),
    sanityFetch<SERVICE_PAGES_QUERYResult>({ query: SERVICE_PAGES_QUERY, tags: ["servicePage"] }),
  ]);
  return perLocale((locale) => {
    const labels = localize(index, locale).servicePageLabels;
    return localize(pages, locale).map((page) => ({
      ...labels,
      slug: page.slug as ServiceSlug,
      seo: page.seo,
      opening: page.opening,
      steps: page.steps.map((step) => ({
        ...(step.title ? { title: step.title } : {}),
        line: step.line,
        slices: step.slices ?? [],
      })),
      keep: page.keep,
    }));
  });
}

// ─── İşler ─────────────────────────────────────────────────────────

export const WORK_PAGE_QUERY = defineQuery(`*[_type == "workPage" && _id == "workPage"][0]{
  seo{ title, description }, backLabel, label, heading, lead, readLabel,
  caseLabel, caseBackLabel, sourcesLabel, nextCaseLabel
}`);

export const CASES_QUERY = defineQuery(`*[_type == "caseStudy"] | order(order asc){
  slug, seo{ title, description }, name, subtitle, market, tags,
  "publishedAt": _createdAt, "modifiedAt": _updatedAt,
  "services": services[]->slug,
  problem, actions, delivered, figures, proof, sources,
  "screens": screens[0...2]{ "url": asset->url, alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }
}`);

export async function getWorkPage(): Promise<Record<Locale, WorkPageContent>> {
  const raw = await sanityFetch<WORK_PAGE_QUERYResult>({ query: WORK_PAGE_QUERY, tags: ["workPage"] });
  return perLocale((locale) => localize(raw, locale));
}

export async function getCases(): Promise<Record<Locale, CaseContent[]>> {
  const raw = await sanityFetch<CASES_QUERYResult>({ query: CASES_QUERY, tags: ["caseStudy", "servicePage"] });
  return perLocale((locale) =>
    localize(raw, locale).map((item) => ({
      ...item,
      services: item.services as ServiceSlug[],
      ...(item.figures.length ? { figures: item.figures } : { figures: undefined }),
      sources: item.sources ?? [],
      screens: item.screens.map((s) => ({ url: s.url, alt: s.alt ?? "", width: s.width, height: s.height })),
    })),
  );
}

// ─── Hakkımda ──────────────────────────────────────────────────────

export const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage" && _id == "aboutPage"][0]{
  seo{ title, description }, backLabel, label, hero, pair, result, whyNine, portraitAlt,
  "portraitUrl": portrait.asset->url
}`);

export async function getAbout(): Promise<Record<Locale, AboutContent>> {
  const raw = await sanityFetch<ABOUT_PAGE_QUERYResult>({ query: ABOUT_PAGE_QUERY, tags: ["aboutPage"] });
  return perLocale((locale) => {
    const { portraitUrl, ...page } = localize(raw, locale);
    return { ...page, portraitSrc: portraitUrl || undefined };
  });
}

// ─── Spark ─────────────────────────────────────────────────────────

export const SPARK_HUB_QUERY = defineQuery(`{
  "section": *[_type == "sparkSection" && _id == "sparkSection"][0]{
    seo{ title, description }, bigWord, heading, tickerItems, tickerTail, readLabel,
    backLabel, sparkLabel, formatsLabel, launchDateLabel, episode
  },
  "formats": *[_type == "sparkFormat"] | order(orderRank asc){
    number, name, slug, status, seo{ title, description }, description, openLabel, preparingLine,
    comingLabel, aboutLabel, aboutLines, showAllLabel, allIssuesLabel, daysUnit, episodesLabel,
    columns, showAllTemplate,
    "coming": *[_type == "sparkEpisode" && references(^._id) && status == "coming"] | order(number asc){
      number, subject, hook
    }
  }
}`);

export async function getSparkHub(): Promise<Record<Locale, SparkHubContent>> {
  const raw = await sanityFetch<SPARK_HUB_QUERYResult>({
    query: SPARK_HUB_QUERY,
    tags: ["sparkSection", "sparkFormat", "sparkEpisode"],
  });
  return perLocale((locale) => {
    const { section, formats } = localize(raw, locale);
    return {
      ...section,
      formats: formats.map(({ coming, comingLabel, slug, number, status, openLabel, preparingLine, ...format }) => ({
        ...format,
        number: String(number).padStart(2, "0"),
        slug: slug[locale].current,
        status: status === "preparing" ? "preparing" : "live",
        ...(openLabel ? { openLabel } : {}),
        ...(preparingLine ? { preparingLine } : {}),
        comingIssues: coming.map((issue) => ({
          number: pad(issue.number),
          subject: issue.subject,
          hook: issue.hook,
          statusLabel: comingLabel,
        })),
      })),
    };
  });
}
