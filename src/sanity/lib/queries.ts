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
  SparkTeaser,
  SparkHomeModule,
  LastDayFormatPage,
  LastDayEpisodePage,
  LastDayBlock,
  LastDayRevealBlock,
  LastDayRecordBlock,
  LastDayCallBlock,
} from "@/types/content";
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
  LAST_DAY_FORMATS_QUERYResult,
  SPARK_TEASER_EPISODE_QUERYResult,
  LAST_DAY_FORMAT_SEO_QUERYResult,
  LAST_DAY_FORMAT_QUERYResult,
  LAST_DAY_EPISODE_SEO_QUERYResult,
  LAST_DAY_EPISODE_QUERYResult,
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
  | LAST_DAY_FORMAT_SEO_QUERYResult;

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
    "pillars": pillars[]{
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
    },
    "closingLine": select($locale == "tr" => coalesce(closingLine.tr, closingLine.en), closingLine.en),
    "episodeCountSingular": select($locale == "tr" => coalesce(episodeCountSingular.tr, episodeCountSingular.en), episodeCountSingular.en),
    "episodeCountPlural": select($locale == "tr" => coalesce(episodeCountPlural.tr, episodeCountPlural.en), episodeCountPlural.en),
    "homeLinkLabel": select($locale == "tr" => coalesce(homeLinkLabel.tr, homeLinkLabel.en), homeLinkLabel.en)
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

export const LAST_DAY_FORMATS_QUERY = defineQuery(`
  *[_type == "lastDayFormat"] | order(_createdAt asc){
    "name": select($locale == "tr" => coalesce(name.tr, name.en), name.en),
    "slug": select($locale == "tr" => slug.tr.current, slug.en.current),
    "description": select($locale == "tr" => coalesce(description.tr, description.en), description.en),
    "episodeCount": count(*[_type == "lastDayEpisode" && references(^._id)])
  }
`);

export function toSparkFormats(
  result: LAST_DAY_FORMATS_QUERYResult,
  episodeCountSingular: string,
  episodeCountPlural: string,
): SparkFormatSummary[] {
  return result
    .filter((item) => Boolean(item.slug))
    .map((item) => {
      const count = item.episodeCount ?? 0;
      const word = count === 1 ? episodeCountSingular : episodeCountPlural;
      return {
        name: item.name ?? "",
        slug: item.slug ?? "",
        description: item.description ?? "",
        episodeCountLabel: `${count} ${word}`.trim(),
      };
    });
}

export const SPARK_TEASER_EPISODE_QUERY = defineQuery(`
  *[_type == "lastDayEpisode" && defined(publishedAt)] | order(publishedAt desc)[0]{
    "figure": select($locale == "tr" => coalesce(teaserFigure.tr, teaserFigure.en), teaserFigure.en),
    "line": select($locale == "tr" => coalesce(teaserLine.tr, teaserLine.en), teaserLine.en),
    "episodeSlug": select($locale == "tr" => slug.tr.current, slug.en.current),
    "formatSlug": select($locale == "tr" => format->slug.tr.current, format->slug.en.current)
  }
`);

export function toSparkTeaser(result: SPARK_TEASER_EPISODE_QUERYResult): SparkTeaser | undefined {
  if (!result || !result.episodeSlug || !result.formatSlug) return undefined;
  return {
    figure: result.figure ?? "",
    line: result.line ?? "",
    formatSlug: result.formatSlug,
    episodeSlug: result.episodeSlug,
  };
}

export function toSparkPage(
  sectionResult: SPARK_SECTION_QUERYResult,
  formatsResult: LAST_DAY_FORMATS_QUERYResult,
  teaser: SparkTeaser | undefined,
): SparkPage {
  return {
    hero: toPageHero(sectionResult?.hero ?? null),
    pillars: (sectionResult?.pillars ?? []).map((item) => ({
      label: item.label ?? "",
      body: item.body ?? "",
    })),
    closingLine: sectionResult?.closingLine ?? "",
    formats: toSparkFormats(
      formatsResult,
      sectionResult?.episodeCountSingular ?? "",
      sectionResult?.episodeCountPlural ?? "",
    ),
    teaser,
  };
}

// ─────────────────────────────────────────────
// Spark · Layer 2 (format sayfası — /spark/the-last-day)
// ─────────────────────────────────────────────

// generateStaticParams için — her formatın HER İKİ dildeki slug'ı
// birlikte gerekiyor (locale'e göre değil), çünkü [locale]/[formatSlug]
// kombinasyonlarının tamamı elle üretiliyor (bkz. build prompt'un
// routing sınırlaması: next-intl'in statik pathnames haritası
// içerik başına farklı slug'ı desteklemiyor).
export const LAST_DAY_FORMAT_SLUGS_QUERY = defineQuery(`
  *[_type == "lastDayFormat" && defined(slug.en.current) && defined(slug.tr.current)]{
    "en": slug.en.current,
    "tr": slug.tr.current
  }
`);

export const LAST_DAY_FORMAT_SEO_QUERY = defineQuery(`
  *[_type == "lastDayFormat" && select($locale == "tr" => slug.tr.current, slug.en.current) == $formatSlug][0].seo{
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

export function toLastDayFormatSeo(result: LAST_DAY_FORMAT_SEO_QUERYResult): PageSeo {
  return toPageSeo(result);
}

export const LAST_DAY_FORMAT_QUERY = defineQuery(`
  *[_type == "lastDayFormat" && select($locale == "tr" => slug.tr.current, slug.en.current) == $formatSlug][0]{
    "hero": hero{
      "eyebrow": select($locale == "tr" => coalesce(eyebrow.tr, eyebrow.en), eyebrow.en),
      "title": select($locale == "tr" => coalesce(title.tr, title.en), title.en),
      "intro": select($locale == "tr" => coalesce(intro.tr, intro.en), intro.en)
    },
    "howItWorks": howItWorks[]{
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
    },
    "closingLine": select($locale == "tr" => coalesce(closingLine.tr, closingLine.en), closingLine.en),
    "corrections": corrections[]{
      "label": select($locale == "tr" => coalesce(label.tr, label.en), label.en),
      "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en)
    },
    "dayCountSingular": select($locale == "tr" => coalesce(dayCountSingular.tr, dayCountSingular.en), dayCountSingular.en),
    "dayCountPlural": select($locale == "tr" => coalesce(dayCountPlural.tr, dayCountPlural.en), dayCountPlural.en),
    "episodes": *[_type == "lastDayEpisode" && references(^._id)] | order(number asc){
      number,
      subject,
      market,
      dayZero,
      dayLast,
      "standfirst": select($locale == "tr" => coalesce(standfirst.tr, standfirst.en), standfirst.en),
      "slug": select($locale == "tr" => slug.tr.current, slug.en.current)
    }
  }
`);

// Cümle sonu "." ile tespit ediliyor — bkz. firstTwoSentences'daki
// aynı bilinen sınırlama (kısaltmalı bir standfirst yanlış kesebilir).
function firstSentence(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  return sentences[0] ?? "";
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export function toLastDayFormatPage(
  result: LAST_DAY_FORMAT_QUERYResult,
  formatSlug: string,
): LastDayFormatPage {
  const dayCountSingular = result?.dayCountSingular ?? "";
  const dayCountPlural = result?.dayCountPlural ?? "";

  const episodes = (result?.episodes ?? [])
    .filter((episode) => Boolean(episode.slug))
    .map((episode) => {
      const days =
        episode.dayZero && episode.dayLast
          ? Math.round(
              (new Date(episode.dayLast).getTime() - new Date(episode.dayZero).getTime()) /
                MS_PER_DAY,
            )
          : undefined;
      const word = days === 1 ? dayCountSingular : dayCountPlural;

      return {
        number: episode.number ?? 0,
        subject: episode.subject ?? "",
        market: episode.market ?? "",
        dayCountLabel: days !== undefined ? `${days} ${word}`.trim() : "",
        firstSentence: firstSentence(episode.standfirst ?? ""),
        formatSlug,
        episodeSlug: episode.slug ?? "",
      };
    });

  return {
    hero: toPageHero(result?.hero ?? null),
    howItWorks: (result?.howItWorks ?? []).map((item) => ({
      label: item.label ?? "",
      body: item.body ?? "",
    })),
    closingLine: result?.closingLine ?? "",
    corrections: (result?.corrections ?? []).map((item) => ({
      label: item.label ?? "",
      body: item.body ?? "",
    })),
    episodes,
  };
}

// ─────────────────────────────────────────────
// Spark · Layer 3 (bölüm sayfası — /spark/the-last-day/01-bo)
// ─────────────────────────────────────────────

// record/reading/gap'in ortak alan projeksiyonu — hem episode.blocks[]
// hem de call.revealBlocks[] için aynı şekilde kullanılıyor (GROQ'da
// fragment yok, JS template string ile tekrar).
const LAST_DAY_REVEAL_BLOCK_PROJECTION = `
  _type,
  _key,
  day,
  date,
  "headingEn": heading.en,
  "heading": select($locale == "tr" => coalesce(heading.tr, heading.en), heading.en),
  "body": select($locale == "tr" => coalesce(body.tr, body.en), body.en),
  "quote": select($locale == "tr" => coalesce(quote.tr, quote.en), quote.en),
  "quoteAttribution": select($locale == "tr" => coalesce(quoteAttribution.tr, quoteAttribution.en), quoteAttribution.en),
  "sourceLabel": select($locale == "tr" => coalesce(sourceLabel.tr, sourceLabel.en), sourceLabel.en),
  sourceUrl,
  sourceKind,
  restsOn,
  "whereItWouldBe": select($locale == "tr" => coalesce(whereItWouldBe.tr, whereItWouldBe.en), whereItWouldBe.en),
  invitesCorrection
`;

export const LAST_DAY_EPISODE_SLUGS_QUERY = defineQuery(`
  *[_type == "lastDayEpisode" && defined(slug.en.current) && defined(slug.tr.current)]{
    "episodeEn": slug.en.current,
    "episodeTr": slug.tr.current,
    "formatEn": format->slug.en.current,
    "formatTr": format->slug.tr.current
  }
`);

export const LAST_DAY_EPISODE_SEO_QUERY = defineQuery(`
  *[_type == "lastDayEpisode"
    && select($locale == "tr" => slug.tr.current, slug.en.current) == $episodeSlug
    && select($locale == "tr" => format->slug.tr.current, format->slug.en.current) == $formatSlug
  ][0]{
    "title": subject,
    "description": select($locale == "tr" => coalesce(standfirst.tr, standfirst.en), standfirst.en)
  }
`);

export function toLastDayEpisodeSeo(result: LAST_DAY_EPISODE_SEO_QUERYResult): PageSeo {
  return {
    title: result?.title ?? "",
    description: result?.description ?? "",
    ogImage: undefined,
    noIndex: undefined,
  };
}

export const LAST_DAY_EPISODE_QUERY = defineQuery(`
  *[_type == "lastDayEpisode"
    && select($locale == "tr" => slug.tr.current, slug.en.current) == $episodeSlug
    && select($locale == "tr" => format->slug.tr.current, format->slug.en.current) == $formatSlug
  ][0]{
    number,
    subject,
    parent,
    market,
    dayZero,
    dayLast,
    "standfirst": select($locale == "tr" => coalesce(standfirst.tr, standfirst.en), standfirst.en),
    publishedAt,
    evidenceTakenAt,
    lastCheckedAt,
    "formatName": select($locale == "tr" => coalesce(format->name.tr, format->name.en), format->name.en),
    "labels": format->mechanicLabels{
      "dayWord": select($locale == "tr" => coalesce(dayWord.tr, dayWord.en), dayWord.en),
      "recordLabel": select($locale == "tr" => coalesce(recordLabel.tr, recordLabel.en), recordLabel.en),
      "readingLabel": select($locale == "tr" => coalesce(readingLabel.tr, readingLabel.en), readingLabel.en),
      "gapLabel": select($locale == "tr" => coalesce(gapLabel.tr, gapLabel.en), gapLabel.en),
      "noteLabel": select($locale == "tr" => coalesce(noteLabel.tr, noteLabel.en), noteLabel.en),
      "restsOnLabel": select($locale == "tr" => coalesce(restsOnLabel.tr, restsOnLabel.en), restsOnLabel.en),
      "callOptionRule": select($locale == "tr" => coalesce(callOptionRule.tr, callOptionRule.en), callOptionRule.en),
      "callOptionDecision": select($locale == "tr" => coalesce(callOptionDecision.tr, callOptionDecision.en), callOptionDecision.en),
      "callRevealDiverged": select($locale == "tr" => coalesce(callRevealDiverged.tr, callRevealDiverged.en), callRevealDiverged.en),
      "callRevealUnsettled": select($locale == "tr" => coalesce(callRevealUnsettled.tr, callRevealUnsettled.en), callRevealUnsettled.en),
      "ledgerToggleLabel": select($locale == "tr" => coalesce(ledgerToggleLabel.tr, ledgerToggleLabel.en), ledgerToggleLabel.en),
      "correctionsCtaLabel": select($locale == "tr" => coalesce(correctionsCtaLabel.tr, correctionsCtaLabel.en), correctionsCtaLabel.en),
      "scorecardHeading": select($locale == "tr" => coalesce(scorecardHeading.tr, scorecardHeading.en), scorecardHeading.en),
      "scorecardMatched": select($locale == "tr" => coalesce(scorecardMatched.tr, scorecardMatched.en), scorecardMatched.en),
      "scorecardDiverged": select($locale == "tr" => coalesce(scorecardDiverged.tr, scorecardDiverged.en), scorecardDiverged.en),
      "scorecardUnsettled": select($locale == "tr" => coalesce(scorecardUnsettled.tr, scorecardUnsettled.en), scorecardUnsettled.en),
      "scorecardPending": select($locale == "tr" => coalesce(scorecardPending.tr, scorecardPending.en), scorecardPending.en),
      "publishedLabel": select($locale == "tr" => coalesce(publishedLabel.tr, publishedLabel.en), publishedLabel.en),
      "evidenceTakenLabel": select($locale == "tr" => coalesce(evidenceTakenLabel.tr, evidenceTakenLabel.en), evidenceTakenLabel.en),
      "lastCheckedLabel": select($locale == "tr" => coalesce(lastCheckedLabel.tr, lastCheckedLabel.en), lastCheckedLabel.en)
    },
    "blocks": blocks[]{
      ${LAST_DAY_REVEAL_BLOCK_PROJECTION},
      id,
      "prompt": select($locale == "tr" => coalesce(prompt.tr, prompt.en), prompt.en),
      answer,
      "revealBlocks": revealBlocks[]{
        ${LAST_DAY_REVEAL_BLOCK_PROJECTION}
      }
    }
  }
`);

type LastDayRevealBlockLike = {
  _type: string;
  _key: string;
  day: number | null;
  date: string | null;
  headingEn: string | null;
  heading: string | null;
  body: string | null;
  quote: string | null;
  quoteAttribution: string | null;
  sourceLabel: string | null;
  sourceUrl: string | null;
  sourceKind: string | null;
  restsOn: string[] | null;
  whereItWouldBe: string | null;
  invitesCorrection: boolean | null;
};

// reading.restsOn Sanity'de editoryal olarak EN heading metniyle
// yazılıyor (bkz. lastDayReadingBlock.ts yorumu — gerçek bir sibling
// referansı değil). TR'de İngilizce metin görünmemesi için, bu harita
// EN heading'i geçerli dildeki karşılığına çevirir.
function buildHeadingMap(blocks: LastDayBlockLike[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const block of blocks) {
    if (block.headingEn && block.heading) map.set(block.headingEn, block.heading);
    for (const reveal of block.revealBlocks ?? []) {
      if (reveal.headingEn && reveal.heading) map.set(reveal.headingEn, reveal.heading);
    }
  }
  return map;
}

function toLastDayRevealBlock(
  block: LastDayRevealBlockLike,
  headingMap: Map<string, string>,
): LastDayRevealBlock {
  if (block._type === "lastDayRecordBlock") {
    if (!block.sourceUrl) {
      throw new Error(
        `Spark verification contract: record "${block.heading ?? block._key}" has no sourceUrl. ` +
          "A record block must always cite its source — see build prompt Part 0.",
      );
    }
    return {
      kind: "record",
      key: block._key,
      day: block.day ?? 0,
      date: block.date ?? "",
      heading: block.heading ?? "",
      body: block.body ?? "",
      quote: block.quote ?? undefined,
      quoteAttribution: block.quoteAttribution ?? undefined,
      sourceLabel: block.sourceLabel ?? "",
      sourceUrl: block.sourceUrl,
      sourceKind: (block.sourceKind ?? "press") as LastDayRecordBlock["sourceKind"],
    };
  }
  if (block._type === "lastDayReadingBlock") {
    return {
      kind: "reading",
      key: block._key,
      day: block.day ?? 0,
      heading: block.heading ?? "",
      body: block.body ?? "",
      restsOn: (block.restsOn ?? []).map((heading) => headingMap.get(heading) ?? heading),
    };
  }
  return {
    kind: "gap",
    key: block._key,
    day: block.day ?? undefined,
    heading: block.heading ?? "",
    body: block.body ?? "",
    whereItWouldBe: block.whereItWouldBe ?? undefined,
    invitesCorrection: block.invitesCorrection ?? true,
  };
}

type LastDayBlockLike = LastDayRevealBlockLike & {
  id: string | null;
  prompt: string | null;
  answer: string | null;
  revealBlocks: LastDayRevealBlockLike[] | null;
};

function toLastDayBlock(block: LastDayBlockLike, headingMap: Map<string, string>): LastDayBlock {
  if (block._type === "lastDayCallBlock") {
    return {
      kind: "call",
      key: block._key,
      id: block.id ?? block._key,
      day: block.day ?? 0,
      prompt: block.prompt ?? "",
      answer: (block.answer ?? "unsettled") as LastDayCallBlock["answer"],
      revealBlocks: (block.revealBlocks ?? []).map((reveal) =>
        toLastDayRevealBlock(reveal, headingMap),
      ),
    };
  }
  if (block._type === "lastDayNoteBlock") {
    return {
      kind: "note",
      key: block._key,
      day: block.day ?? 0,
      body: block.body ?? "",
    };
  }
  return toLastDayRevealBlock(block, headingMap);
}

export function toLastDayEpisodePage(
  result: LAST_DAY_EPISODE_QUERYResult,
  formatSlug: string,
): LastDayEpisodePage | undefined {
  if (!result) return undefined;

  const dayZero = result.dayZero ?? "";
  const dayLast = result.dayLast ?? "";
  const dayCount =
    dayZero && dayLast
      ? Math.round((new Date(dayLast).getTime() - new Date(dayZero).getTime()) / MS_PER_DAY)
      : 0;

  const labels = result.labels;
  const rawBlocks = result.blocks ?? [];
  const headingMap = buildHeadingMap(rawBlocks);

  return {
    number: result.number ?? 0,
    subject: result.subject ?? "",
    parent: result.parent ?? undefined,
    market: result.market ?? "",
    dayZero,
    dayLast,
    dayCount,
    formatName: result.formatName ?? "",
    standfirst: result.standfirst ?? "",
    publishedAt: result.publishedAt ?? undefined,
    evidenceTakenAt: result.evidenceTakenAt ?? undefined,
    lastCheckedAt: result.lastCheckedAt ?? undefined,
    blocks: rawBlocks.map((block) => toLastDayBlock(block, headingMap)),
    backHref: { formatSlug },
    correctionsHref: `/spark/${formatSlug}#corrections`,
    labels: {
      dayWord: labels?.dayWord ?? "",
      recordLabel: labels?.recordLabel ?? "",
      readingLabel: labels?.readingLabel ?? "",
      gapLabel: labels?.gapLabel ?? "",
      noteLabel: labels?.noteLabel ?? "",
      restsOnLabel: labels?.restsOnLabel ?? "",
      callOptionRule: labels?.callOptionRule ?? "",
      callOptionDecision: labels?.callOptionDecision ?? "",
      callRevealDiverged: labels?.callRevealDiverged ?? "",
      callRevealUnsettled: labels?.callRevealUnsettled ?? "",
      ledgerToggleLabel: labels?.ledgerToggleLabel ?? "",
      correctionsCtaLabel: labels?.correctionsCtaLabel ?? "",
      scorecardHeading: labels?.scorecardHeading ?? "",
      scorecardMatched: labels?.scorecardMatched ?? "",
      scorecardDiverged: labels?.scorecardDiverged ?? "",
      scorecardUnsettled: labels?.scorecardUnsettled ?? "",
      scorecardPending: labels?.scorecardPending ?? "",
      publishedLabel: labels?.publishedLabel ?? "",
      evidenceTakenLabel: labels?.evidenceTakenLabel ?? "",
      lastCheckedLabel: labels?.lastCheckedLabel ?? "",
    },
  };
}
