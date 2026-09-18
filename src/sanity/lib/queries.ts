import { defineQuery } from "next-sanity";

import type {
  Hero,
  Framework,
  ProofStrip,
  ServicesSection,
  ComparisonTable,
  ComparisonValue,
  ApproachSection,
  AudienceSection,
  StorySection,
  TestimonialSection,
  MediaSection,
  BookingSection,
  SubpageCta,
  Link,
  SanityImage,
  PageHero,
  WorkPage,
  ServicesPage,
  StoryPage,
  LegalPage,
  LegalBlock,
  CaseStudy,
  PageSeo,
  FamiliarSection,
  CaseStudiesSection,
  ProcessSection,
  FaqSection,
  ClosingCta,
  SiteSettings,
  SparkPage,
  SparkFormatSummary,
  SparkEpisodeSummary,
  SparkTeaser,
  SparkHomeModule,
  SparkFormatPage,
  SparkEpisodePage,
} from "@/types/content";
import { computeDayCount } from "@/components/spark/day/dayMath";
import type {
  HOME_HERO_QUERYResult,
  HOME_FRAMEWORK_QUERYResult,
  HOME_PROOF_STRIP_QUERYResult,
  HOME_SERVICES_QUERYResult,
  HOME_COMPARISON_QUERYResult,
  HOME_APPROACH_QUERYResult,
  HOME_AUDIENCE_QUERYResult,
  HOME_STORY_QUERYResult,
  HOME_TESTIMONIALS_QUERYResult,
  HOME_MEDIA_QUERYResult,
  SITE_BOOKING_QUERYResult,
  SITE_SUBPAGE_CTA_QUERYResult,
  WORK_PAGE_QUERYResult,
  SERVICES_PAGE_QUERYResult,
  STORY_PAGE_QUERYResult,
  LEGAL_PAGE_QUERYResult,
  CASE_STUDIES_LIST_QUERYResult,
  CASE_STUDY_QUERYResult,
  HOME_FAMILIAR_QUERYResult,
  HOME_CASE_STUDIES_SECTION_QUERYResult,
  HOME_PROCESS_QUERYResult,
  HOME_FAQ_QUERYResult,
  HOME_CLOSING_CTA_QUERYResult,
  HOME_SEO_QUERYResult,
  SITE_SEO_QUERYResult,
  WORK_PAGE_SEO_QUERYResult,
  SERVICES_PAGE_SEO_QUERYResult,
  STORY_PAGE_SEO_QUERYResult,
  LEGAL_PAGE_SEO_QUERYResult,
  SITE_NAV_QUERYResult,
  SITE_FOOTER_QUERYResult,
  SITE_LOGO_QUERYResult,
  SPARK_SEO_QUERYResult,
  SPARK_SECTION_QUERYResult,
  SPARK_FORMATS_HUB_QUERYResult,
  SPARK_TEASER_EPISODE_QUERYResult,
  SPARK_FORMAT_SEO_QUERYResult,
  SPARK_FORMAT_QUERYResult,
  SPARK_EPISODE_SEO_QUERYResult,
  SPARK_EPISODE_QUERYResult,
} from "@/sanity/types";

// Sanity'de alanlar zorunlu değil, bu yüzden typegen çoğu alanı `| null`
// üretir. Aşağıdaki toX() fonksiyonları CMS içeriği eksikken (henüz
// girilmemişken) render'ı kırmayacak boş string/dizi/undefined'a düşer —
// bkz. toHero. link/image gibi tekrarlayan alt-şekiller için ortak
// yardımcılar (toLink, toSanityImage, toComparisonValue) kullanılıyor.

type LinkLike = { label: string | null; href: string | null; external: boolean | null } | null;

function toLink(link: LinkLike): Link {
  return {
    label: link?.label ?? "",
    href: link?.href ?? "",
    external: link?.external ?? undefined,
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

type ComparisonValueLike = { state: "yes" | "no" | "partial"; note: string | null } | null;

function toComparisonValue(value: ComparisonValueLike): ComparisonValue {
  return {
    state: value?.state ?? "no",
    note: value?.note ?? undefined,
  };
}

// [$locale] ile dinamik alan erişimi (ör. eyebrow[$locale]) GROQ typegen
// tarafından statik çözümlenemiyor ve sonuç tipini belirsiz bir union'a
// düşürüyor (Array<LocaleString> | string | null). select() ile iki dilin
// statik dalına ayrılır; her dal coalesce ile en'e düşer, typegen temiz
// `string | null` üretir. Hero arayüzünün (types/content.ts) alan
// sırasıyla birebir eşleşir.
export const HOME_HERO_QUERY = defineQuery(`
  *[_type == "homePage"][0].hero{
    "eyebrow": select($locale == "tr" => coalesce(eyebrow.tr, eyebrow.en), eyebrow.en),
    "headlinePrimary": select($locale == "tr" => coalesce(headlinePrimary.tr, headlinePrimary.en), headlinePrimary.en),
    "headlineAccent": select($locale == "tr" => coalesce(headlineAccent.tr, headlineAccent.en), headlineAccent.en),
    "bullets": select($locale == "tr" => coalesce(bullets.tr, bullets.en), bullets.en),
    "closingLine": select($locale == "tr" => coalesce(closingLine.tr, closingLine.en), closingLine.en),
    "ctaLabel": select($locale == "tr" => coalesce(ctaLabel.tr, ctaLabel.en), ctaLabel.en),
    "ctaHref": ctaHref,
    "ctaNote": select($locale == "tr" => coalesce(ctaNote.tr, ctaNote.en), ctaNote.en),
    "scrollLabel": select($locale == "tr" => coalesce(scrollLabel.tr, scrollLabel.en), scrollLabel.en)
  }
`);

// Sanity'de alanlar zorunlu değil (validation yok), bu yüzden typegen her
// alanı `| null` üretir. Boş bırakılmış bir alan render'ı kırmasın diye
// burada boş string/dizi'ye düşer — CMS içeriği eksiksizse bu dallara hiç
// girilmez.
export function toHero(result: HOME_HERO_QUERYResult): Hero {
  return {
    eyebrow: result?.eyebrow ?? "",
    headlinePrimary: result?.headlinePrimary ?? "",
    headlineAccent: result?.headlineAccent ?? "",
    bullets: result?.bullets ?? [],
    closingLine: result?.closingLine ?? "",
    ctaLabel: result?.ctaLabel ?? "",
    ctaHref: result?.ctaHref ?? "",
    ctaNote: result?.ctaNote ?? "",
    scrollLabel: result?.scrollLabel ?? "",
  };
}

export const HOME_FRAMEWORK_QUERY = defineQuery(`
  *[_type == "homePage"][0].framework{
    steps[]{
      id,
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      "description": select($locale == "tr" => coalesce(description.tr, description.en), description.en)
    }
  }
`);

export const HOME_PROOF_STRIP_QUERY = defineQuery(`
  *[_type == "homePage"][0].proofStrip{
    "kicker": select($locale == "tr" => coalesce(kicker.tr, kicker.en), kicker.en),
    "roles": select($locale == "tr" => coalesce(roles.tr, roles.en), roles.en),
    "items": items[] | order(order asc) {
      name,
      "logo": logo{
        "url": asset->url,
        "alt": coalesce(alt, ""),
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      "line": select($locale == "tr" => coalesce(line.tr, line.en), line.en),
      order
    },
    "link": link{
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      href,
      external
    }
  }
`);

export const HOME_SERVICES_QUERY = defineQuery(`
  *[_type == "homePage"][0].services{
    "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
    "intro": select($locale == "tr" => coalesce(intro.tr, intro.en), intro.en),
    "labels": {
      "problem": select($locale == "tr" => coalesce(labels.problem.tr, labels.problem.en), labels.problem.en),
      "action": select($locale == "tr" => coalesce(labels.action.tr, labels.action.en), labels.action.en),
      "outcome": select($locale == "tr" => coalesce(labels.outcome.tr, labels.outcome.en), labels.outcome.en),
      "rightDoor": select($locale == "tr" => coalesce(labels.rightDoor.tr, labels.rightDoor.en), labels.rightDoor.en),
      "notRightDoor": select($locale == "tr" => coalesce(labels.notRightDoor.tr, labels.notRightDoor.en), labels.notRightDoor.en),
      "duration": select($locale == "tr" => coalesce(labels.duration.tr, labels.duration.en), labels.duration.en),
      "runsOn": select($locale == "tr" => coalesce(labels.runsOn.tr, labels.runsOn.en), labels.runsOn.en)
    },
    "items": items[] | order(number asc) {
      slug,
      number,
      "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
      "tag": select($locale == "tr" => coalesce(tag.tr, tag.en), tag.en),
      "problem": select($locale == "tr" => coalesce(problem.tr, problem.en), problem.en),
      "action": select($locale == "tr" => coalesce(action.tr, action.en), action.en),
      "outcome": select($locale == "tr" => coalesce(outcome.tr, outcome.en), outcome.en),
      "rightDoor": select($locale == "tr" => coalesce(rightDoor.tr, rightDoor.en), rightDoor.en),
      "notRightDoor": select($locale == "tr" => coalesce(notRightDoor.tr, notRightDoor.en), notRightDoor.en),
      "duration": select($locale == "tr" => coalesce(duration.tr, duration.en), duration.en),
      "runsOn": select($locale == "tr" => coalesce(runsOn.tr, runsOn.en), runsOn.en)
    },
    "fullEngagementHeading": select($locale == "tr" => coalesce(fullEngagementHeading.tr, fullEngagementHeading.en), fullEngagementHeading.en),
    "fullEngagementBody": select($locale == "tr" => coalesce(fullEngagementBody.tr, fullEngagementBody.en), fullEngagementBody.en),
    "link": link{
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      href,
      external
    }
  }
`);

export const HOME_COMPARISON_QUERY = defineQuery(`
  *[_type == "homePage"][0].comparison{
    "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
    "intro": select($locale == "tr" => coalesce(intro.tr, intro.en), intro.en),
    "scrollHint": select($locale == "tr" => coalesce(scrollHint.tr, scrollHint.en), scrollHint.en),
    "columnLabels": {
      "decide": select($locale == "tr" => coalesce(columnLabels.decide.tr, columnLabels.decide.en), columnLabels.decide.en),
      "setup": select($locale == "tr" => coalesce(columnLabels.setup.tr, columnLabels.setup.en), columnLabels.setup.en),
      "ship": select($locale == "tr" => coalesce(columnLabels.ship.tr, columnLabels.ship.en), columnLabels.ship.en)
    },
    "rows": rows[]{
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      isUs,
      "decide": decide{ state, "note": select($locale == "tr" => coalesce(note.tr, note.en), note.en) },
      "setup": setup{ state, "note": select($locale == "tr" => coalesce(note.tr, note.en), note.en) },
      "ship": ship{ state, "note": select($locale == "tr" => coalesce(note.tr, note.en), note.en) }
    }
  }
`);

export const HOME_APPROACH_QUERY = defineQuery(`
  *[_type == "homePage"][0].approach{
    "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
    "blocks": blocks[] | order(number asc) {
      number,
      "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
      "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
    }
  }
`);

export const HOME_AUDIENCE_QUERY = defineQuery(`
  *[_type == "homePage"][0].audience{
    "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
    "labels": {
      "problem": select($locale == "tr" => coalesce(labels.problem.tr, labels.problem.en), labels.problem.en),
      "do": select($locale == "tr" => coalesce(labels.do.tr, labels.do.en), labels.do.en),
      "result": select($locale == "tr" => coalesce(labels.result.tr, labels.result.en), labels.result.en)
    },
    "cards": cards[]{
      "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
      "problem": select($locale == "tr" => coalesce(problem.tr, problem.en), problem.en),
      "do": select($locale == "tr" => coalesce(do.tr, do.en), do.en),
      "result": select($locale == "tr" => coalesce(result.tr, result.en), result.en)
    }
  }
`);

export const HOME_STORY_QUERY = defineQuery(`
  *[_type == "homePage"][0].story{
    "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
    "lead": select($locale == "tr" => coalesce(lead.tr, lead.en), lead.en),
    "paragraphs": select($locale == "tr" => coalesce(paragraphs.tr, paragraphs.en), paragraphs.en),
    "link": link{
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      href,
      external
    },
    "media": media{
      type,
      "image": image{
        "url": asset->url,
        "alt": coalesce(alt, ""),
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      youtubeId,
      "caption": select($locale == "tr" => coalesce(caption.tr, caption.en), caption.en)
    }
  }
`);

export const HOME_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "homePage"][0].testimonials{
    "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
    "items": items[] | order(order asc) {
      "headline": select($locale == "tr" => coalesce(headline.tr, headline.en), headline.en),
      "quote": select($locale == "tr" => coalesce(quote.tr, quote.en), quote.en),
      "attribution": select($locale == "tr" => coalesce(attribution.tr, attribution.en), attribution.en),
      "ctaLabel": select($locale == "tr" => coalesce(ctaLabel.tr, ctaLabel.en), ctaLabel.en),
      order
    }
  }
`);

export const HOME_MEDIA_QUERY = defineQuery(`
  *[_type == "homePage"][0].media{
    "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
    "intro": select($locale == "tr" => coalesce(intro.tr, intro.en), intro.en),
    "items": items[] | order(order asc) {
      source,
      "headline": select($locale == "tr" => coalesce(headline.tr, headline.en), headline.en),
      "description": select($locale == "tr" => coalesce(description.tr, description.en), description.en),
      "note": select($locale == "tr" => coalesce(note.tr, note.en), note.en),
      href,
      isVideo,
      order
    }
  }
`);

export const SITE_BOOKING_QUERY = defineQuery(`
  *[_type == "siteSettings"][0].booking{
    calLink,
    "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
    "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en),
    "meta1": select($locale == "tr" => coalesce(meta1.tr, meta1.en), meta1.en),
    "meta2": select($locale == "tr" => coalesce(meta2.tr, meta2.en), meta2.en)
  }
`);

export const SITE_SUBPAGE_CTA_QUERY = defineQuery(`
  *[_type == "siteSettings"][0].subpageCta{
    "headline": select($locale == "tr" => coalesce(headline.tr, headline.en), headline.en),
    "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en),
    "ctaLabel": select($locale == "tr" => coalesce(ctaLabel.tr, ctaLabel.en), ctaLabel.en),
    ctaHref
  }
`);

export function toFramework(result: HOME_FRAMEWORK_QUERYResult): Framework {
  return {
    steps: (result?.steps ?? []).map((step) => ({
      id: step.id,
      label: step.label ?? "",
      description: step.description ?? "",
    })),
  };
}

export function toProofStrip(result: HOME_PROOF_STRIP_QUERYResult): ProofStrip {
  return {
    kicker: result?.kicker ?? "",
    roles: result?.roles ?? "",
    items: (result?.items ?? []).map((item) => ({
      name: item.name ?? "",
      logo: toSanityImage(item.logo),
      line: item.line ?? "",
      order: item.order ?? 0,
    })),
    link: toLink(result?.link ?? null),
  };
}

export function toServicesSection(result: HOME_SERVICES_QUERYResult): ServicesSection {
  return {
    heading: result?.heading ?? "",
    intro: result?.intro ?? "",
    labels: {
      problem: result?.labels.problem ?? "",
      action: result?.labels.action ?? "",
      outcome: result?.labels.outcome ?? "",
      rightDoor: result?.labels.rightDoor ?? "",
      notRightDoor: result?.labels.notRightDoor ?? "",
      duration: result?.labels.duration ?? "",
      runsOn: result?.labels.runsOn ?? "",
    },
    items: (result?.items ?? []).map((item) => ({
      slug: item.slug ?? "",
      number: item.number ?? 0,
      title: item.title ?? "",
      tag: item.tag ?? "",
      problem: item.problem ?? "",
      action: item.action ?? "",
      outcome: item.outcome ?? "",
      rightDoor: item.rightDoor ?? "",
      notRightDoor: item.notRightDoor ?? "",
      duration: item.duration ?? "",
      runsOn: item.runsOn ?? "",
    })),
    fullEngagementHeading: result?.fullEngagementHeading ?? "",
    fullEngagementBody: result?.fullEngagementBody ?? "",
    link: toLink(result?.link ?? null),
  };
}

export function toComparisonTable(result: HOME_COMPARISON_QUERYResult): ComparisonTable {
  return {
    heading: result?.heading ?? undefined,
    intro: result?.intro ?? undefined,
    scrollHint: result?.scrollHint ?? "",
    columnLabels: {
      decide: result?.columnLabels.decide ?? "",
      setup: result?.columnLabels.setup ?? "",
      ship: result?.columnLabels.ship ?? "",
    },
    rows: (result?.rows ?? []).map((row) => ({
      label: row.label ?? "",
      isUs: row.isUs ?? undefined,
      decide: toComparisonValue(row.decide),
      setup: toComparisonValue(row.setup),
      ship: toComparisonValue(row.ship),
    })),
  };
}

export function toApproachSection(result: HOME_APPROACH_QUERYResult): ApproachSection {
  return {
    heading: result?.heading ?? undefined,
    blocks: (result?.blocks ?? []).map((block) => ({
      number: block.number ?? 0,
      title: block.title ?? "",
      body: block.body ?? "",
    })),
  };
}

export function toAudienceSection(result: HOME_AUDIENCE_QUERYResult): AudienceSection {
  return {
    heading: result?.heading ?? "",
    labels: {
      problem: result?.labels.problem ?? "",
      do: result?.labels.do ?? "",
      result: result?.labels.result ?? "",
    },
    cards: (result?.cards ?? []).map((card) => ({
      title: card.title ?? "",
      problem: card.problem ?? "",
      do: card.do ?? "",
      result: card.result ?? "",
    })),
  };
}

export function toStorySection(result: HOME_STORY_QUERYResult): StorySection {
  return {
    heading: result?.heading ?? "",
    lead: result?.lead ?? "",
    paragraphs: result?.paragraphs ?? [],
    link: toLink(result?.link ?? null),
    media: {
      type: result?.media?.type ?? "image",
      image: toSanityImage(result?.media?.image ?? null),
      youtubeId: result?.media?.youtubeId ?? undefined,
      caption: result?.media?.caption ?? undefined,
    },
  };
}

export function toTestimonialSection(result: HOME_TESTIMONIALS_QUERYResult): TestimonialSection {
  return {
    heading: result?.heading ?? undefined,
    items: (result?.items ?? []).map((item) => ({
      headline: item.headline ?? "",
      quote: item.quote ?? "",
      attribution: item.attribution ?? "",
      ctaLabel: item.ctaLabel ?? "",
      order: item.order ?? 0,
    })),
  };
}

export function toMediaSection(result: HOME_MEDIA_QUERYResult): MediaSection {
  return {
    heading: result?.heading ?? "",
    intro: result?.intro ?? "",
    items: (result?.items ?? []).map((item) => ({
      source: item.source ?? "",
      headline: item.headline ?? "",
      description: item.description ?? "",
      note: item.note ?? undefined,
      href: item.href ?? "",
      isVideo: item.isVideo ?? undefined,
      order: item.order ?? 0,
    })),
  };
}

export function toBookingSection(result: SITE_BOOKING_QUERYResult): BookingSection {
  return {
    calLink: result?.calLink ?? "",
    title: result?.title ?? "",
    body: result?.body ?? "",
    meta1: result?.meta1 ?? "",
    meta2: result?.meta2 ?? "",
  };
}

export function toSubpageCta(result: SITE_SUBPAGE_CTA_QUERYResult): SubpageCta {
  return {
    headline: result?.headline ?? "",
    body: result?.body ?? "",
    ctaLabel: result?.ctaLabel ?? "",
    ctaHref: result?.ctaHref ?? "",
  };
}

// pageHero object tipi (types/content.ts: PageHero) work/services/story/
// legal sayfalarının ortak SubpageHero deseni — Home'un çok daha büyük
// `hero` tipiyle KARIŞTIRILMAMALI.
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

export const WORK_PAGE_QUERY = defineQuery(`
  *[_type == "workPage"][0].hero{
    "eyebrow": select($locale == "tr" => coalesce(eyebrow.tr, eyebrow.en), eyebrow.en),
    "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
    "intro": select($locale == "tr" => coalesce(intro.tr, intro.en), intro.en)
  }
`);

export function toWorkPage(result: WORK_PAGE_QUERYResult): WorkPage {
  return { hero: toPageHero(result) };
}

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_type == "servicesPage"][0].hero{
    "eyebrow": select($locale == "tr" => coalesce(eyebrow.tr, eyebrow.en), eyebrow.en),
    "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
    "intro": select($locale == "tr" => coalesce(intro.tr, intro.en), intro.en)
  }
`);

export function toServicesPage(result: SERVICES_PAGE_QUERYResult): ServicesPage {
  return { hero: toPageHero(result) };
}

export const STORY_PAGE_QUERY = defineQuery(`
  *[_type == "storyPage"][0]{
    "hero": hero{
      "eyebrow": select($locale == "tr" => coalesce(eyebrow.tr, eyebrow.en), eyebrow.en),
      "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
      "intro": select($locale == "tr" => coalesce(intro.tr, intro.en), intro.en)
    },
    "media": media{
      type,
      "image": image{
        "url": asset->url,
        "alt": coalesce(alt, ""),
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      youtubeId,
      "caption": select($locale == "tr" => coalesce(caption.tr, caption.en), caption.en)
    },
    "prose": prose[]{
      _type,
      "text": select($locale == "tr" => coalesce(text.tr, text.en), text.en)
    }
  }
`);

export function toStoryPage(result: STORY_PAGE_QUERYResult): StoryPage {
  return {
    hero: toPageHero(result?.hero ?? null),
    media: {
      type: result?.media?.type ?? "image",
      image: toSanityImage(result?.media?.image ?? null),
      youtubeId: result?.media?.youtubeId ?? undefined,
      caption: result?.media?.caption ?? undefined,
    },
    prose: (result?.prose ?? []).map((block) =>
      block._type === "proseHead"
        ? { type: "head" as const, text: block.text ?? "" }
        : { type: "body" as const, text: block.text ?? "" },
    ),
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

// content.ts: CaseStudy — /work index (kart özeti) ve /work/[slug]
// (detay) AYNI dokümanı okuyor, bu yüzden liste ve detay sorgusu aynı
// tam projeksiyonu paylaşıyor (kart sadece bir alt kümesini kullansa
// da CaseCard'ın prop tipi tam CaseStudy).
export const CASE_STUDIES_LIST_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(order asc) {
    slug,
    "name": select($locale == "tr" => coalesce(name.tr, name.en), name.en),
    "location": select($locale == "tr" => coalesce(location.tr, location.en), location.en),
    "subtitle": select($locale == "tr" => coalesce(subtitle.tr, subtitle.en), subtitle.en),
    "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en),
    "coverImage": coverImage{
      "url": asset->url,
      "alt": coalesce(alt, ""),
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    },
    "problemHeading": select($locale == "tr" => coalesce(problemHeading.tr, problemHeading.en), problemHeading.en),
    "problem": select($locale == "tr" => coalesce(problem.tr, problem.en), problem.en),
    "actionsHeading": select($locale == "tr" => coalesce(actionsHeading.tr, actionsHeading.en), actionsHeading.en),
    "actions": actions[]{
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      "description": select($locale == "tr" => coalesce(description.tr, description.en), description.en)
    },
    "deliveredHeading": select($locale == "tr" => coalesce(deliveredHeading.tr, deliveredHeading.en), deliveredHeading.en),
    "delivered": select($locale == "tr" => coalesce(delivered.tr, delivered.en), delivered.en),
    "tags": select($locale == "tr" => coalesce(tags.tr, tags.en), tags.en),
    "screens": screens[]{
      "url": asset->url,
      "alt": coalesce(alt, ""),
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    },
    "detailEyebrow": select($locale == "tr" => coalesce(detailEyebrow.tr, detailEyebrow.en), detailEyebrow.en),
    "detailIntro": select($locale == "tr" => coalesce(detailIntro.tr, detailIntro.en), detailIntro.en),
    "logo": logo{
      "url": asset->url,
      "alt": coalesce(alt, ""),
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    },
    order
  }
`);

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug == $slug][0]{
    slug,
    "name": select($locale == "tr" => coalesce(name.tr, name.en), name.en),
    "location": select($locale == "tr" => coalesce(location.tr, location.en), location.en),
    "subtitle": select($locale == "tr" => coalesce(subtitle.tr, subtitle.en), subtitle.en),
    "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en),
    "coverImage": coverImage{
      "url": asset->url,
      "alt": coalesce(alt, ""),
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    },
    "problemHeading": select($locale == "tr" => coalesce(problemHeading.tr, problemHeading.en), problemHeading.en),
    "problem": select($locale == "tr" => coalesce(problem.tr, problem.en), problem.en),
    "actionsHeading": select($locale == "tr" => coalesce(actionsHeading.tr, actionsHeading.en), actionsHeading.en),
    "actions": actions[]{
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      "description": select($locale == "tr" => coalesce(description.tr, description.en), description.en)
    },
    "deliveredHeading": select($locale == "tr" => coalesce(deliveredHeading.tr, deliveredHeading.en), deliveredHeading.en),
    "delivered": select($locale == "tr" => coalesce(delivered.tr, delivered.en), delivered.en),
    "tags": select($locale == "tr" => coalesce(tags.tr, tags.en), tags.en),
    "screens": screens[]{
      "url": asset->url,
      "alt": coalesce(alt, ""),
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    },
    "detailEyebrow": select($locale == "tr" => coalesce(detailEyebrow.tr, detailEyebrow.en), detailEyebrow.en),
    "detailIntro": select($locale == "tr" => coalesce(detailIntro.tr, detailIntro.en), detailIntro.en),
    "logo": logo{
      "url": asset->url,
      "alt": coalesce(alt, ""),
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    },
    order
  }
`);

export const CASE_STUDY_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy"].slug
`);

// CASE_STUDIES_LIST_QUERYResult'ın eleman tipiyle CASE_STUDY_QUERYResult
// (null çıkarılmış) birebir aynı şekli paylaşıyor — liste ve detay aynı
// projeksiyonu kullandığı için (bkz. CASE_STUDY_QUERY yorumu).
type CaseStudyItemLike = CASE_STUDIES_LIST_QUERYResult[number];

function toCaseStudy(item: CaseStudyItemLike): CaseStudy {
  return {
    slug: item.slug,
    name: item.name ?? "",
    location: item.location ?? undefined,
    subtitle: item.subtitle ?? "",
    body: item.body ?? "",
    coverImage: toSanityImage(item.coverImage) ?? { url: "", alt: "", width: 0, height: 0 },
    problemHeading: item.problemHeading ?? "",
    problem: item.problem ?? "",
    actionsHeading: item.actionsHeading ?? "",
    actions: (item.actions ?? []).map((action) => ({
      label: action.label ?? "",
      description: action.description ?? "",
    })),
    deliveredHeading: item.deliveredHeading ?? "",
    delivered: item.delivered ?? "",
    tags: item.tags ?? [],
    screens: (item.screens ?? [])
      .map((screen) => toSanityImage(screen))
      .filter((screen): screen is NonNullable<typeof screen> => screen !== undefined),
    detailEyebrow: item.detailEyebrow ?? "",
    detailIntro: item.detailIntro ?? "",
    logo: toSanityImage(item.logo),
    order: item.order ?? 0,
  };
}

export function toCaseStudies(result: CASE_STUDIES_LIST_QUERYResult): CaseStudy[] {
  return result.map(toCaseStudy);
}

export function toCaseStudyDetail(result: CASE_STUDY_QUERYResult): CaseStudy | null {
  return result ? toCaseStudy(result) : null;
}

export const HOME_FAMILIAR_QUERY = defineQuery(`
  *[_type == "homePage"][0].familiar{
    "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
    "points": points[] | order(order asc) {
      "text": select($locale == "tr" => coalesce(text.tr, text.en), text.en),
      order
    },
    "closingLine": select($locale == "tr" => coalesce(closingLine.tr, closingLine.en), closingLine.en)
  }
`);

export function toFamiliarSection(result: HOME_FAMILIAR_QUERYResult): FamiliarSection {
  return {
    heading: result?.heading ?? "",
    points: (result?.points ?? []).map((point) => ({
      text: point.text ?? "",
      order: point.order ?? 0,
    })),
    closingLine: result?.closingLine ?? "",
  };
}

// caseStudiesSection wrapper — sadece heading/intro/linkLabel. items
// CASE_STUDIES_LIST_QUERY'den ayrı geliyor (bkz. o sorgunun yorumu),
// page.tsx ikisini birleştirir.
export const HOME_CASE_STUDIES_SECTION_QUERY = defineQuery(`
  *[_type == "homePage"][0].caseStudies{
    "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
    "intro": select($locale == "tr" => coalesce(intro.tr, intro.en), intro.en),
    "linkLabel": select($locale == "tr" => coalesce(linkLabel.tr, linkLabel.en), linkLabel.en)
  }
`);

export function toCaseStudiesSection(
  result: HOME_CASE_STUDIES_SECTION_QUERYResult,
  items: CaseStudy[],
): CaseStudiesSection {
  return {
    heading: result?.heading ?? undefined,
    intro: result?.intro ?? "",
    items,
    linkLabel: result?.linkLabel ?? "",
  };
}

export const HOME_PROCESS_QUERY = defineQuery(`
  *[_type == "homePage"][0].process{
    "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
    "steps": steps[] | order(number asc) {
      number,
      "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
      "description": select($locale == "tr" => coalesce(description.tr, description.en), description.en),
      "detail": select($locale == "tr" => coalesce(detail.tr, detail.en), detail.en)
    },
    "ctaLabel": select($locale == "tr" => coalesce(ctaLabel.tr, ctaLabel.en), ctaLabel.en),
    ctaHref
  }
`);

export function toProcessSection(result: HOME_PROCESS_QUERYResult): ProcessSection {
  return {
    heading: result?.heading ?? "",
    steps: (result?.steps ?? []).map((step) => ({
      number: step.number ?? 0,
      title: step.title ?? "",
      description: step.description ?? "",
      detail: step.detail ?? "",
    })),
    ctaLabel: result?.ctaLabel ?? "",
    ctaHref: result?.ctaHref ?? "",
  };
}

export const HOME_FAQ_QUERY = defineQuery(`
  *[_type == "homePage"][0].faq{
    "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
    "items": items[] | order(order asc) {
      "question": select($locale == "tr" => coalesce(question.tr, question.en), question.en),
      "answer": select($locale == "tr" => coalesce(answer.tr, answer.en), answer.en),
      order
    }
  }
`);

export function toFaqSection(result: HOME_FAQ_QUERYResult): FaqSection {
  return {
    heading: result?.heading ?? "",
    items: (result?.items ?? []).map((item) => ({
      question: item.question ?? "",
      answer: item.answer ?? "",
      order: item.order ?? 0,
    })),
  };
}

export const HOME_CLOSING_CTA_QUERY = defineQuery(`
  *[_type == "homePage"][0].closingCta{
    "quote": select($locale == "tr" => coalesce(quote.tr, quote.en), quote.en),
    "quoteAttribution": select($locale == "tr" => coalesce(quoteAttribution.tr, quoteAttribution.en), quoteAttribution.en),
    "headline": select($locale == "tr" => coalesce(headline.tr, headline.en), headline.en),
    "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en),
    "ctaLabel": select($locale == "tr" => coalesce(ctaLabel.tr, ctaLabel.en), ctaLabel.en),
    ctaHref,
    "note": select($locale == "tr" => coalesce(note.tr, note.en), note.en)
  }
`);

export function toClosingCta(result: HOME_CLOSING_CTA_QUERYResult): ClosingCta {
  return {
    quote: result?.quote ?? "",
    quoteAttribution: result?.quoteAttribution ?? "",
    headline: result?.headline ?? "",
    body: result?.body ?? undefined,
    ctaLabel: result?.ctaLabel ?? "",
    ctaHref: result?.ctaHref ?? "",
    note: result?.note ?? undefined,
  };
}

// PageSeo — homePage.seo ve siteSettings.seo aynı şekli paylaşıyor,
// tek sorgu metni her iki dokümanda da tekrarlanıyor (bkz. dosyanın
// geri kalanındaki aynı desen).
export const HOME_SEO_QUERY = defineQuery(`
  *[_type == "homePage"][0].seo{
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

export const SITE_SEO_QUERY = defineQuery(`
  *[_type == "siteSettings"][0].seo{
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

export const WORK_PAGE_SEO_QUERY = defineQuery(`
  *[_type == "workPage"][0].seo{
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

export const SERVICES_PAGE_SEO_QUERY = defineQuery(`
  *[_type == "servicesPage"][0].seo{
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

export const STORY_PAGE_SEO_QUERY = defineQuery(`
  *[_type == "storyPage"][0].seo{
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

type PageSeoResult =
  | HOME_SEO_QUERYResult
  | SITE_SEO_QUERYResult
  | WORK_PAGE_SEO_QUERYResult
  | SERVICES_PAGE_SEO_QUERYResult
  | STORY_PAGE_SEO_QUERYResult
  | LEGAL_PAGE_SEO_QUERYResult
  | SPARK_SEO_QUERYResult
  | SPARK_FORMAT_SEO_QUERYResult;

function toPageSeo(result: PageSeoResult): PageSeo {
  return {
    title: result?.title ?? "",
    description: result?.description ?? "",
    ogImage: toSanityImage(result?.ogImage ?? null),
    noIndex: result?.noIndex ?? undefined,
  };
}

export function toHomeSeo(result: HOME_SEO_QUERYResult): PageSeo {
  return toPageSeo(result);
}

export function toSiteSeo(result: SITE_SEO_QUERYResult): PageSeo {
  return toPageSeo(result);
}

export function toWorkPageSeo(result: WORK_PAGE_SEO_QUERYResult): PageSeo {
  return toPageSeo(result);
}

export function toServicesPageSeo(result: SERVICES_PAGE_SEO_QUERYResult): PageSeo {
  return toPageSeo(result);
}

export function toStoryPageSeo(result: STORY_PAGE_SEO_QUERYResult): PageSeo {
  return toPageSeo(result);
}

export function toLegalPageSeo(result: LEGAL_PAGE_SEO_QUERYResult): PageSeo {
  return toPageSeo(result);
}

export const SITE_NAV_QUERY = defineQuery(`
  *[_type == "siteSettings"][0].nav[]{
    "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
    href,
    external
  }
`);

export function toSiteNav(result: SITE_NAV_QUERYResult): Link[] {
  return (result ?? []).map((item) => toLink(item));
}

export const SITE_FOOTER_QUERY = defineQuery(`
  *[_type == "siteSettings"][0].footer{
    "tagline": select($locale == "tr" => coalesce(tagline.tr, tagline.en), tagline.en),
    "nine": select($locale == "tr" => coalesce(nine.tr, nine.en), nine.en),
    "signature": select($locale == "tr" => coalesce(signature.tr, signature.en), signature.en),
    email,
    linkedin,
    "nav": nav[]{
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      href,
      external
    },
    "legalLinks": legalLinks[]{
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      href,
      external
    },
    "legal": select($locale == "tr" => coalesce(legal.tr, legal.en), legal.en),
    "copyright": select($locale == "tr" => coalesce(copyright.tr, copyright.en), copyright.en)
  }
`);

export function toFooter(result: SITE_FOOTER_QUERYResult): SiteSettings["footer"] {
  return {
    tagline: result?.tagline ?? "",
    nine: result?.nine ?? "",
    signature: result?.signature ?? "",
    email: result?.email ?? "",
    linkedin: result?.linkedin ?? "",
    nav: (result?.nav ?? []).map((item) => toLink(item)),
    legalLinks: (result?.legalLinks ?? []).map((item) => toLink(item)),
    legal: result?.legal ?? "",
    copyright: result?.copyright ?? "",
  };
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

// ─────────────────────────────────────────────
// Spark · Layer 1 (bölüm sayfası)
// ─────────────────────────────────────────────

export const SPARK_SEO_QUERY = defineQuery(`
  *[_type == "sparkSection"][0].seo{
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

export function toSparkSeo(result: SPARK_SEO_QUERYResult): PageSeo {
  return toPageSeo(result);
}

export const SPARK_SECTION_QUERY = defineQuery(`
  *[_type == "sparkSection"][0]{
    "hero": hero{
      "eyebrow": select($locale == "tr" => coalesce(eyebrow.tr, eyebrow.en), eyebrow.en),
      "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
      "intro": select($locale == "tr" => coalesce(intro.tr, intro.en), intro.en)
    },
    "homeLinkLabel": select($locale == "tr" => coalesce(homeLinkLabel.tr, homeLinkLabel.en), homeLinkLabel.en),
    "comingSoonLabel": select($locale == "tr" => coalesce(comingSoonLabel.tr, comingSoonLabel.en), comingSoonLabel.en)
  }
`);

// Standfirst'ün ilk iki cümlesi, ana sayfa modülü için (bkz. build
// prompt: "the standfirst's first two sentences"). Cümle sonu "." ile
// tespit ediliyor — Sanity'deki metin bu formatta yazıldığı sürece
// (kısaltma yok) doğru çalışır; kısaltmalı bir standfirst yazılırsa
// yanlış kesebilir, bilinen bir sınırlama.
function firstTwoSentences(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentences.slice(0, 2).join(" ");
}

export function toSparkHomeModule(
  sectionResult: SPARK_SECTION_QUERYResult,
  teaser: SparkTeaser | undefined,
): SparkHomeModule {
  return {
    title: sectionResult?.hero?.title ?? "",
    intro: firstTwoSentences(sectionResult?.hero?.intro ?? ""),
    teaser,
    linkLabel: sectionResult?.homeLinkLabel ?? "",
  };
}

// generateStaticParams için — her formatın HER İKİ dildeki slug'ı
// birlikte gerekiyor (locale'e göre değil), çünkü [locale]/[formatSlug]
// kombinasyonlarının tamamı elle üretiliyor (next-intl'in statik
// pathnames haritası içerik başına farklı slug'ı desteklemiyor).
export const SPARK_FORMAT_SLUGS_QUERY = defineQuery(`
  *[_type == "sparkFormat" && defined(slug.en.current) && defined(slug.tr.current)]{
    "en": slug.en.current,
    "tr": slug.tr.current
  }
`);

// Hub'daki format satırları — sadece status "live" olanlar (format 02
// BİLEREK bir doküman değil, bu sorguya hiç girmiyor, sabit UI karosu
// olarak kalıyor). Her formatın kendi envanteri (yayınlanmış bölümleri)
// aynı sorguda geliyor ki hub tıklamadan önce içeriği göstersin.
export const SPARK_FORMATS_HUB_QUERY = defineQuery(`
  *[_type == "sparkFormat" && status == "live"] | order(orderRank asc){
    number,
    "name": select($locale == "tr" => coalesce(name.tr, name.en), name.en),
    "slug": select($locale == "tr" => slug.tr.current, slug.en.current),
    "subjectLine": select($locale == "tr" => coalesce(subjectLine.tr, subjectLine.en), subjectLine.en),
    "whatIsInside": select($locale == "tr" => coalesce(whatIsInside.tr, whatIsInside.en), whatIsInside.en),
    "statusLineSingular": select($locale == "tr" => coalesce(statusLineSingular.tr, statusLineSingular.en), statusLineSingular.en),
    "statusLinePlural": select($locale == "tr" => coalesce(statusLinePlural.tr, statusLinePlural.en), statusLinePlural.en),
    "dayCountSingular": select($locale == "tr" => coalesce(dayCountSingular.tr, dayCountSingular.en), dayCountSingular.en),
    "dayCountPlural": select($locale == "tr" => coalesce(dayCountPlural.tr, dayCountPlural.en), dayCountPlural.en),
    "dayNotEstablishedLabel": select($locale == "tr" => coalesce(dayNotEstablishedLabel.tr, dayNotEstablishedLabel.en), dayNotEstablishedLabel.en),
    "episodes": *[_type == "sparkEpisode" && references(^._id) && status == "published"] | order(number asc){
      number,
      subject,
      country,
      launchDate,
      closureDate,
      "hook": select($locale == "tr" => coalesce(hook.tr, hook.en), hook.en),
      "slug": select($locale == "tr" => slug.tr.current, slug.en.current)
    }
  }
`);

function toSparkEpisodeSummaries(
  episodes: {
    number: number | null;
    subject: string | null;
    country: string | null;
    launchDate: string | null;
    closureDate: string | null;
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
      hook: episode.hook ?? "",
      formatSlug,
      episodeSlug: episode.slug ?? "",
    }));
}

export function toSparkFormatsForHub(result: SPARK_FORMATS_HUB_QUERYResult): SparkFormatSummary[] {
  return result
    .filter((item) => Boolean(item.slug))
    .map((item) => ({
      number: item.number ?? 0,
      name: item.name ?? "",
      slug: item.slug ?? "",
      subjectLine: item.subjectLine ?? "",
      whatIsInside: item.whatIsInside ?? "",
      statusLineSingular: item.statusLineSingular ?? "",
      statusLinePlural: item.statusLinePlural ?? "",
      dayCountSingular: item.dayCountSingular ?? "",
      dayCountPlural: item.dayCountPlural ?? "",
      dayNotEstablishedLabel: item.dayNotEstablishedLabel ?? "",
      episodes: toSparkEpisodeSummaries(item.episodes ?? [], item.slug ?? ""),
    }));
}

export const SPARK_TEASER_EPISODE_QUERY = defineQuery(`
  *[_type == "sparkEpisode" && status == "published" && defined(publishedAt)] | order(publishedAt desc)[0]{
    "line": select($locale == "tr" => coalesce(hook.tr, hook.en), hook.en),
    launchDate,
    closureDate,
    "episodeSlug": select($locale == "tr" => slug.tr.current, slug.en.current),
    "formatSlug": select($locale == "tr" => format->slug.tr.current, format->slug.en.current),
    "dayCountSingular": select($locale == "tr" => coalesce(format->dayCountSingular.tr, format->dayCountSingular.en), format->dayCountSingular.en),
    "dayCountPlural": select($locale == "tr" => coalesce(format->dayCountPlural.tr, format->dayCountPlural.en), format->dayCountPlural.en)
  }
`);

export function toSparkTeaser(result: SPARK_TEASER_EPISODE_QUERYResult): SparkTeaser | undefined {
  if (!result || !result.episodeSlug || !result.formatSlug) return undefined;
  const days = computeDayCount(result.launchDate, result.closureDate);
  const word = days === 1 ? result.dayCountSingular : result.dayCountPlural;
  return {
    figure: days !== null ? `${days} ${word ?? ""}`.trim() : "",
    line: result.line ?? "",
    formatSlug: result.formatSlug,
    episodeSlug: result.episodeSlug,
  };
}

export function toSparkPage(
  sectionResult: SPARK_SECTION_QUERYResult,
  formatsResult: SPARK_FORMATS_HUB_QUERYResult,
): SparkPage {
  return {
    hero: toPageHero(sectionResult?.hero ?? null),
    formats: toSparkFormatsForHub(formatsResult),
    comingSoonLabel: sectionResult?.comingSoonLabel ?? "",
  };
}

// ─────────────────────────────────────────────
// Spark · The Last Day liste sayfası (/spark/the-last-day)
// ─────────────────────────────────────────────

export const SPARK_FORMAT_SEO_QUERY = defineQuery(`
  *[_type == "sparkFormat" && select($locale == "tr" => slug.tr.current, slug.en.current) == $formatSlug][0].seo{
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

export function toSparkFormatSeo(result: SPARK_FORMAT_SEO_QUERYResult): PageSeo {
  return toPageSeo(result);
}

export const SPARK_FORMAT_QUERY = defineQuery(`
  *[_type == "sparkFormat" && select($locale == "tr" => slug.tr.current, slug.en.current) == $formatSlug][0]{
    "hero": hero{
      "eyebrow": select($locale == "tr" => coalesce(eyebrow.tr, eyebrow.en), eyebrow.en),
      "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
      "intro": select($locale == "tr" => coalesce(intro.tr, intro.en), intro.en)
    },
    "hookLabel": select($locale == "tr" => coalesce(hookLabel.tr, hookLabel.en), hookLabel.en),
    "dayCountSingular": select($locale == "tr" => coalesce(dayCountSingular.tr, dayCountSingular.en), dayCountSingular.en),
    "dayCountPlural": select($locale == "tr" => coalesce(dayCountPlural.tr, dayCountPlural.en), dayCountPlural.en),
    "dayNotEstablishedLabel": select($locale == "tr" => coalesce(dayNotEstablishedLabel.tr, dayNotEstablishedLabel.en), dayNotEstablishedLabel.en),
    "episodes": *[_type == "sparkEpisode" && references(^._id) && status == "published"] | order(number asc){
      number,
      subject,
      country,
      launchDate,
      closureDate,
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
    hero: toPageHero(result?.hero ?? null),
    hookLabel: result?.hookLabel ?? "",
    dayCountSingular: result?.dayCountSingular ?? "",
    dayCountPlural: result?.dayCountPlural ?? "",
    dayNotEstablishedLabel: result?.dayNotEstablishedLabel ?? "",
    episodes: toSparkEpisodeSummaries(result?.episodes ?? [], formatSlug),
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
    "formatTr": format->slug.tr.current
  }
`);

export const SPARK_EPISODE_SEO_QUERY = defineQuery(`
  *[_type == "sparkEpisode"
    && select($locale == "tr" => slug.tr.current, slug.en.current) == $episodeSlug
    && select($locale == "tr" => format->slug.tr.current, format->slug.en.current) == $formatSlug
  ][0]{
    "title": subject,
    "description": select($locale == "tr" => coalesce(standfirst.tr, standfirst.en), standfirst.en)
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
  *[_type == "sparkEpisode"
    && select($locale == "tr" => slug.tr.current, slug.en.current) == $episodeSlug
    && select($locale == "tr" => format->slug.tr.current, format->slug.en.current) == $formatSlug
  ][0]{
    number,
    subject,
    parent,
    country,
    launchDate,
    closureDate,
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
    parent: result.parent ?? undefined,
    country: result.country ?? "",
    launchDate: result.launchDate,
    closureDate: result.closureDate,
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
