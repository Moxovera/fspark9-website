import { defineQuery } from "next-sanity";

import type { PageHero, LegalPage, LegalBlock, PageSeo, SanityImage, SparkFormatPage, SparkEpisodeSummary, SparkEpisodePage } from "@/types/content";
import type {
  LEGAL_PAGE_QUERYResult,
  SITE_SEO_QUERYResult,
  LEGAL_PAGE_SEO_QUERYResult,
  SITE_LOGO_QUERYResult,
  SPARK_FORMAT_QUERYResult,
  SPARK_EPISODE_SEO_QUERYResult,
  SPARK_EPISODE_QUERYResult,
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
      formatSlug,
      episodeSlug: episode.slug ?? "",
    }));
}

export const SPARK_FORMAT_QUERY = defineQuery(`
  *[_type == "sparkFormat" && select($locale == "tr" => slug.tr.current, slug.en.current) == $formatSlug][0]{
    "altFormatSlug": select($locale == "tr" => slug.en.current, slug.tr.current),
    "episodes": *[_type == "sparkEpisode" && references(^._id) && status == "published"] | order(number asc){
      number,
      "subject": select($locale == "tr" => coalesce(subject.tr, subject.en), subject.en),
      country,
      launchDate,
      closureDate,
      publishedAt,
      "hook": select($locale == "tr" => coalesce(hook.tr, hook.en), hook.en),
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
    status,
    lastCheckedAt,
    _updatedAt
  }
`);

export const SPARK_EPISODE_SEO_QUERY = defineQuery(`
  *[_type == "sparkEpisode" && status == "published"
    && select($locale == "tr" => slug.tr.current, slug.en.current) == $episodeSlug
    && select($locale == "tr" => format->slug.tr.current, format->slug.en.current) == $formatSlug
  ][0]{
    "title": coalesce(select($locale == "tr" => coalesce(seo.title.tr, seo.title.en), seo.title.en), select($locale == "tr" => coalesce(subject.tr, subject.en), subject.en)),
    "description": coalesce(
      select($locale == "tr" => coalesce(seo.description.tr, seo.description.en), seo.description.en),
      select($locale == "tr" => coalesce(standfirst.tr, standfirst.en), standfirst.en)
    ),
    publishedAt,
    lastCheckedAt,
    _updatedAt
  }
`);

export function toSparkEpisodeSeo(result: SPARK_EPISODE_SEO_QUERYResult): PageSeo {
  return {
    title: result?.title ?? "",
    description: result?.description ?? "",
    ogImage: undefined,
    noIndex: undefined,
  };
}

// NOT: Sanity'nin typegen aracı bu defineQuery çağrısını STATİK olarak
// ayrıştırıyor — template literal İÇİNDE JS seviyesinde \${...}
// interpolasyonu (bir fonksiyon çağrısı ya da paylaşılan bir sabit)
// görürse ayrıştırma başarısız oluyor ("Unsupported expression type").
// Bu yüzden aşağıdaki sorgu, tekrarlayan select(...) kalıplarını bir
// yardımcıya çıkarmak yerine BİLEREK tek, düz bir template literal
// olarak tam yazıldı. `$locale` (JS \${} DEĞİL, GROQ'un kendi $param
// söz dizimi) her zamanki gibi çalışıyor, dosyanın geri kalanıyla
// tutarlı.
export const SPARK_EPISODE_QUERY = defineQuery(`
  *[_type == "sparkEpisode" && status == "published"
    && select($locale == "tr" => slug.tr.current, slug.en.current) == $episodeSlug
    && select($locale == "tr" => format->slug.tr.current, format->slug.en.current) == $formatSlug
  ][0]{
    number,
    "subject": select($locale == "tr" => coalesce(subject.tr, subject.en), subject.en),
    publishedAt,
    evidenceTakenAt,
    lastCheckedAt,
    parent,
    country,
    launchDate,
    closureDate,
    "altFormatSlug": select($locale == "tr" => format->slug.en.current, format->slug.tr.current),
    "altEpisodeSlug": select($locale == "tr" => slug.en.current, slug.tr.current),
    "standfirst": select($locale == "tr" => coalesce(standfirst.tr, standfirst.en), standfirst.en),
    "formatName": select($locale == "tr" => coalesce(format->name.tr, format->name.en), format->name.en),
    "dayLabel": select($locale == "tr" => coalesce(format->dayLabel.tr, format->dayLabel.en), format->dayLabel.en),
    "dayCountSingular": select($locale == "tr" => coalesce(format->dayCountSingular.tr, format->dayCountSingular.en), format->dayCountSingular.en),
    "dayCountPlural": select($locale == "tr" => coalesce(format->dayCountPlural.tr, format->dayCountPlural.en), format->dayCountPlural.en),
    "dayNotEstablishedLabel": select($locale == "tr" => coalesce(format->dayNotEstablishedLabel.tr, format->dayNotEstablishedLabel.en), format->dayNotEstablishedLabel.en),
    "recordLabel": select($locale == "tr" => coalesce(format->recordLabel.tr, format->recordLabel.en), format->recordLabel.en),
    "readingLabel": select($locale == "tr" => coalesce(format->readingLabel.tr, format->readingLabel.en), format->readingLabel.en),
    "callLabel": select($locale == "tr" => coalesce(format->callLabel.tr, format->callLabel.en), format->callLabel.en),
    "estimateLabel": select($locale == "tr" => coalesce(format->estimateLabel.tr, format->estimateLabel.en), format->estimateLabel.en),
    "weighLabel": select($locale == "tr" => coalesce(format->weighLabel.tr, format->weighLabel.en), format->weighLabel.en),
    "signalLabel": select($locale == "tr" => coalesce(format->signalLabel.tr, format->signalLabel.en), format->signalLabel.en),
    "secondOpinionLabel": select($locale == "tr" => coalesce(format->secondOpinionLabel.tr, format->secondOpinionLabel.en), format->secondOpinionLabel.en),
    "allocationLabel": select($locale == "tr" => coalesce(format->allocationLabel.tr, format->allocationLabel.en), format->allocationLabel.en),
    "callOptionRuleLabel": select($locale == "tr" => coalesce(format->callOptionRuleLabel.tr, format->callOptionRuleLabel.en), format->callOptionRuleLabel.en),
    "callOptionDecisionLabel": select($locale == "tr" => coalesce(format->callOptionDecisionLabel.tr, format->callOptionDecisionLabel.en), format->callOptionDecisionLabel.en),
    "callMatchLabel": select($locale == "tr" => coalesce(format->callMatchLabel.tr, format->callMatchLabel.en), format->callMatchLabel.en),
    "callMismatchLabel": select($locale == "tr" => coalesce(format->callMismatchLabel.tr, format->callMismatchLabel.en), format->callMismatchLabel.en),
    "callUnsettledLabel": select($locale == "tr" => coalesce(format->callUnsettledLabel.tr, format->callUnsettledLabel.en), format->callUnsettledLabel.en),
    "allocationCommitLabel": select($locale == "tr" => coalesce(format->allocationCommitLabel.tr, format->allocationCommitLabel.en), format->allocationCommitLabel.en),
    "noteLabel": select($locale == "tr" => coalesce(format->noteLabel.tr, format->noteLabel.en), format->noteLabel.en),
    "scorecardHeading": select($locale == "tr" => coalesce(format->scorecardHeading.tr, format->scorecardHeading.en), format->scorecardHeading.en),
    "scorecardUnansweredLabel": select($locale == "tr" => coalesce(format->scorecardUnansweredLabel.tr, format->scorecardUnansweredLabel.en), format->scorecardUnansweredLabel.en),
    "scorecardYourReadingLabel": select($locale == "tr" => coalesce(format->scorecardYourReadingLabel.tr, format->scorecardYourReadingLabel.en), format->scorecardYourReadingLabel.en),
    "scorecardCrossEpisodeLabel": select($locale == "tr" => coalesce(format->scorecardCrossEpisodeLabel.tr, format->scorecardCrossEpisodeLabel.en), format->scorecardCrossEpisodeLabel.en),
    "scorecardShareLabel": select($locale == "tr" => coalesce(format->scorecardShareLabel.tr, format->scorecardShareLabel.en), format->scorecardShareLabel.en),
    "scorecardCopiedLabel": select($locale == "tr" => coalesce(format->scorecardCopiedLabel.tr, format->scorecardCopiedLabel.en), format->scorecardCopiedLabel.en),
    "scorecardPrivacyLine": select($locale == "tr" => coalesce(format->scorecardPrivacyLine.tr, format->scorecardPrivacyLine.en), format->scorecardPrivacyLine.en),
    "blocks": blocks[]{
      _type,
      _type == "sparkRecord" => {
        blockId,
        date,
        "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
        "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en),
        "quote": select($locale == "tr" => coalesce(quote.tr, quote.en), quote.en),
        "quoteAttribution": select($locale == "tr" => coalesce(quoteAttribution.tr, quoteAttribution.en), quoteAttribution.en),
        "source": source{
          "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
          url,
          kind
        }
      },
      _type == "sparkReading" => {
        date,
        "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
        "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en),
        restsOn
      },
      _type == "sparkNote" => {
        date,
        "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
      },
      _type == "sparkCall" => {
        blockId,
        date,
        "prompt": select($locale == "tr" => coalesce(prompt.tr, prompt.en), prompt.en),
        answer,
        "reveal": reveal{
          "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
          "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
        }
      },
      _type == "sparkEstimate" => {
        blockId,
        date,
        "prompt": select($locale == "tr" => coalesce(prompt.tr, prompt.en), prompt.en),
        "brackets": brackets[]{
          "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
          min,
          max
        },
        actualValue,
        "actualLabel": select($locale == "tr" => coalesce(actualLabel.tr, actualLabel.en), actualLabel.en),
        "insideBracketLabel": select($locale == "tr" => coalesce(insideBracketLabel.tr, insideBracketLabel.en), insideBracketLabel.en),
        "belowBracketLabel": select($locale == "tr" => coalesce(belowBracketLabel.tr, belowBracketLabel.en), belowBracketLabel.en),
        "aboveBracketLabel": select($locale == "tr" => coalesce(aboveBracketLabel.tr, aboveBracketLabel.en), aboveBracketLabel.en),
        "derivedReading": derivedReading{
          "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
          "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
        }
      },
      _type == "sparkWeigh" => {
        blockId,
        date,
        "prompt": select($locale == "tr" => coalesce(prompt.tr, prompt.en), prompt.en),
        "disclaimer": select($locale == "tr" => coalesce(disclaimer.tr, disclaimer.en), disclaimer.en),
        "options": options[]{
          "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
          "line": select($locale == "tr" => coalesce(line.tr, line.en), line.en)
        },
        "revealReading": revealReading{
          "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
          "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
        }
      },
      _type == "sparkSignal" => {
        blockId,
        date,
        "prompt": select($locale == "tr" => coalesce(prompt.tr, prompt.en), prompt.en),
        "notScoredLabel": select($locale == "tr" => coalesce(notScoredLabel.tr, notScoredLabel.en), notScoredLabel.en),
        "options": options[]{"value": select($locale == "tr" => coalesce(tr, en), en)}.value,
        "revealReading": revealReading{
          "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
          "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
        }
      },
      _type == "sparkSecondOpinion" => {
        blockId,
        date,
        "prompt": select($locale == "tr" => coalesce(prompt.tr, prompt.en), prompt.en),
        "notScoredLabel": select($locale == "tr" => coalesce(notScoredLabel.tr, notScoredLabel.en), notScoredLabel.en),
        "options": options[]{"value": select($locale == "tr" => coalesce(tr, en), en)}.value,
        "readingA": readingA{
          "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
          "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
        },
        "readingB": readingB{
          "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
          "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
        },
        "closingLine": select($locale == "tr" => coalesce(closingLine.tr, closingLine.en), closingLine.en)
      },
      _type == "sparkAllocation" => {
        blockId,
        date,
        "prompt": select($locale == "tr" => coalesce(prompt.tr, prompt.en), prompt.en),
        "notScoredLabel": select($locale == "tr" => coalesce(notScoredLabel.tr, notScoredLabel.en), notScoredLabel.en),
        "categoryALabel": select($locale == "tr" => coalesce(categoryALabel.tr, categoryALabel.en), categoryALabel.en),
        "categoryBLabel": select($locale == "tr" => coalesce(categoryBLabel.tr, categoryBLabel.en), categoryBLabel.en),
        "revealReading": revealReading{
          "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
          "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
        }
      }
    }
  }
`);

export function toSparkEpisodePage(
  result: SPARK_EPISODE_QUERYResult,
  formatSlug: string,
): SparkEpisodePage | undefined {
  if (!result) return undefined;

  return {
    number: result.number ?? 0,
    subject: result.subject ?? "",
    publishedAt: result.publishedAt,
    evidenceTakenAt: result.evidenceTakenAt,
    lastCheckedAt: result.lastCheckedAt,
    parent: result.parent ?? undefined,
    country: result.country ?? "",
    launchDate: result.launchDate,
    closureDate: result.closureDate,
    altFormatSlug: result.altFormatSlug ?? null,
    altEpisodeSlug: result.altEpisodeSlug ?? null,
    formatName: result.formatName ?? "",
    standfirst: result.standfirst ?? "",
    blocks: (result.blocks ?? []) as SparkEpisodePage["blocks"],
    dayLabel: result.dayLabel ?? "",
    dayCountSingular: result.dayCountSingular ?? "",
    dayCountPlural: result.dayCountPlural ?? "",
    dayNotEstablishedLabel: result.dayNotEstablishedLabel ?? "",
    recordLabel: result.recordLabel ?? "",
    readingLabel: result.readingLabel ?? "",
    callLabel: result.callLabel ?? "",
    estimateLabel: result.estimateLabel ?? "",
    weighLabel: result.weighLabel ?? "",
    signalLabel: result.signalLabel ?? "",
    secondOpinionLabel: result.secondOpinionLabel ?? "",
    allocationLabel: result.allocationLabel ?? "",
    callOptionRuleLabel: result.callOptionRuleLabel ?? "",
    callOptionDecisionLabel: result.callOptionDecisionLabel ?? "",
    callMatchLabel: result.callMatchLabel ?? "",
    callMismatchLabel: result.callMismatchLabel ?? "",
    callUnsettledLabel: result.callUnsettledLabel ?? "",
    allocationCommitLabel: result.allocationCommitLabel ?? "",
    noteLabel: result.noteLabel ?? "",
    scorecardHeading: result.scorecardHeading ?? "",
    scorecardUnansweredLabel: result.scorecardUnansweredLabel ?? "",
    scorecardYourReadingLabel: result.scorecardYourReadingLabel ?? "",
    scorecardCrossEpisodeLabel: result.scorecardCrossEpisodeLabel ?? "",
    scorecardShareLabel: result.scorecardShareLabel ?? "",
    scorecardCopiedLabel: result.scorecardCopiedLabel ?? "",
    scorecardPrivacyLine: result.scorecardPrivacyLine ?? "",
    backHref: { formatSlug },
  };
}
