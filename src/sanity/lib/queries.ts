import { defineQuery } from "next-sanity";

import type { PageHero, LegalPage, LegalBlock, PageSeo, SanityImage, SparkFormatPage, SparkEpisodeSummary } from "@/types/content";
import type {
  LEGAL_PAGE_QUERYResult,
  SITE_SEO_QUERYResult,
  LEGAL_PAGE_SEO_QUERYResult,
  SITE_LOGO_QUERYResult,
  SPARK_FORMAT_QUERYResult,
} from "@/sanity/types";

// Legal, SEO, logo ve Spark bölüm sorguları. Sayfa içeriğinin geri
// kalanı src/sanity/lib/content.ts'te. Sanity alanları zorunlu değil,
// typegen çoğu alanı `| null` üretir; buradaki toX() fonksiyonları eksik
// içerikte boş string/dizi/undefined'a düşer.

type PageHeroLike = {
  eyebrow: string | null;
  title: string | null;
  intro: string | null;
} | null;

function toPageHero(hero: PageHeroLike): PageHero {
  return {
    eyebrow: hero?.eyebrow ?? "",
    title: hero?.title ?? "",
    intro: hero?.intro ?? "",
  };
}

type SanityImageLike = {
  url: string | null;
  alt: string;
  width: number | null;
  height: number | null;
  lqip: string | null;
} | null;

function toSanityImage(image: SanityImageLike): SanityImage | undefined {
  if (!image?.url) return undefined;
  return {
    url: image.url,
    alt: image.alt,
    width: image.width ?? 0,
    height: image.height ?? 0,
    lqip: image.lqip ?? undefined,
  };
}

export const LEGAL_PAGE_QUERY = defineQuery(`
  *[_type == "legalPage" && slug == $slug][0]{
    "hero": hero{
      "eyebrow": select($locale == "tr" => coalesce(eyebrow.tr, eyebrow.en), eyebrow.en),
      "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
      "intro": select($locale == "tr" => coalesce(intro.tr, intro.en), intro.en)
    },
    "blocks": blocks[]{
      _type,
      "text": select($locale == "tr" => coalesce(text.tr, text.en), text.en),
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      "lines": select($locale == "tr" => coalesce(lines.tr, lines.en), lines.en),
      "items": select($locale == "tr" => coalesce(items.tr, items.en), items.en),
      "head": select($locale == "tr" => coalesce(head.tr, head.en), head.en),
      "rows": select($locale == "tr" => coalesce(rows.tr, rows.en), rows.en)
    }
  }
`);

const LEGAL_BLOCK_TYPE_MAP = {
  legalBlockDiv: "div",
  legalBlockHeading: "h",
  legalBlockSubheading: "sh",
  legalBlockBold: "b",
  legalBlockField: "field",
  legalBlockList: "ul",
  legalBlockTable: "tbl",
} as const;

export function toLegalPage(result: LEGAL_PAGE_QUERYResult): LegalPage {
  return {
    hero: toPageHero(result?.hero ?? null),
    blocks: (result?.blocks ?? [])
      .map((block): LegalBlock | null => {
        switch (block._type) {
          case "legalBlockDiv":
          case "legalBlockHeading":
          case "legalBlockSubheading":
          case "legalBlockBold":
            return { type: LEGAL_BLOCK_TYPE_MAP[block._type], text: block.text ?? "" };
          case "legalBlockField":
            return {
              type: "field",
              label: block.label ?? undefined,
              lines: block.lines ?? [],
            };
          case "legalBlockList":
            return { type: "ul", items: block.items ?? [] };
          case "legalBlockTable":
            return {
              type: "tbl",
              head: block.head ?? [],
              rows: (block.rows ?? []).map((row) => row.cells ?? []),
            };
          default:
            return null;
        }
      })
      .filter((block): block is LegalBlock => block !== null),
  };
}

export const SITE_SEO_QUERY = defineQuery(`
  *[_type == "siteSettings"][0].seo{
    "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
    "description": select($locale == "tr" => coalesce(description.tr, description.en), description.en),
    "ogImage": select($locale == "tr" && defined(ogImageTr.asset) => ogImageTr, ogImage){
      "url": asset->url,
      "alt": coalesce(alt, ""),
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    },
    noIndex
  }
`);

export const LEGAL_PAGE_SEO_QUERY = defineQuery(`
  *[_type == "legalPage" && slug == $slug][0].seo{
    "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
    "description": select($locale == "tr" => coalesce(description.tr, description.en), description.en),
    "ogImage": ogImage{
      "url": asset->url,
      "alt": coalesce(alt, ""),
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    },
    noIndex
  }
`);

type PageSeoResult = SITE_SEO_QUERYResult | LEGAL_PAGE_SEO_QUERYResult;

function toPageSeo(result: PageSeoResult): PageSeo {
  return {
    title: result?.title ?? "",
    description: result?.description ?? "",
    ogImage: toSanityImage(result?.ogImage ?? null),
    noIndex: result?.noIndex ?? undefined,
  };
}

export function toSiteSeo(result: SITE_SEO_QUERYResult): PageSeo {
  return toPageSeo(result);
}

export function toLegalPageSeo(result: LEGAL_PAGE_SEO_QUERYResult): PageSeo {
  return toPageSeo(result);
}

export const SITE_LOGO_QUERY = defineQuery(`
  *[_type == "siteSettings"][0].logo{
    "url": asset->url,
    "alt": coalesce(alt, ""),
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height,
    "lqip": asset->metadata.lqip
  }
`);

export function toSiteLogo(result: SITE_LOGO_QUERYResult): SanityImage | undefined {
  return toSanityImage(result);
}

function toSparkEpisodeSummaries(
  episodes: {
    number: number | null;
    subject: string | null;
    country: string | null;
    launchDate: string | null;
    closureDate: string | null;
    publishedAt: string | null;
    hook: string | null;
    durationLabel: string | null;
    slug: string | null;
  }[],
  formatSlug: string,
): SparkEpisodeSummary[] {
  return episodes
    .filter((episode) => Boolean(episode.slug))
    .map((episode) => ({
      number: episode.number ?? 0,
      subject: episode.subject ?? "",
      country: episode.country ?? "",
      launchDate: episode.launchDate,
      closureDate: episode.closureDate,
      publishedAt: episode.publishedAt,
      hook: episode.hook ?? "",
      durationLabel: episode.durationLabel || null,
      formatSlug,
      episodeSlug: episode.slug ?? "",
    }));
}

export const SPARK_FORMAT_QUERY = defineQuery(`
  *[_type == "sparkFormat" && select($locale == "tr" => slug.tr.current, slug.en.current) == $formatSlug][0]{
    "altFormatSlug": select($locale == "tr" => slug.en.current, slug.tr.current),
    "episodes": *[_type == "sparkEpisode" && references(^._id)
      && (status == "published" || ($preview && status in ["coming", "draft"] && previewLive == true))] | order(number asc){
      number,
      "subject": select($locale == "tr" => coalesce(subject.tr, subject.en), subject.en),
      country,
      launchDate,
      closureDate,
      publishedAt,
      "hook": select($locale == "tr" => coalesce(hook.tr, hook.en), hook.en),
      "durationLabel": select($locale == "tr" => coalesce(durationLabel.tr, durationLabel.en), durationLabel.en),
      "slug": select($locale == "tr" => slug.tr.current, slug.en.current)
    }
  }
`);

export function toSparkFormatPage(
  result: SPARK_FORMAT_QUERYResult,
  formatSlug: string,
): SparkFormatPage {
  return {
    episodes: toSparkEpisodeSummaries(result?.episodes ?? [], formatSlug),
    altFormatSlug: result?.altFormatSlug ?? null,
  };
}

// ─────────────────────────────────────────────
// Spark · Bölüm sayfası (/spark/the-last-day/01-bo)
// ─────────────────────────────────────────────

export const SPARK_EPISODE_SLUGS_QUERY = defineQuery(`
  *[_type == "sparkEpisode" && defined(slug.en.current) && defined(slug.tr.current)]{
    "episodeEn": slug.en.current,
    "episodeTr": slug.tr.current,
    "formatEn": format->slug.en.current,
    "formatTr": format->slug.tr.current,
    "status": select($preview && status in ["coming", "draft"] && previewLive == true => "published", status),
    lastCheckedAt,
    _updatedAt
  }
`);
