/**
 * Tek seferlik seed script.
 *
 * content/en.ts + content/tr.ts'teki HomePage/SiteSettings verisini,
 * content/work.ts + services.ts + story.ts'teki WorkPage/ServicesPage/
 * StoryPage verisini, content/legal/*.ts'teki 4 LegalPage dokümanını,
 * content/en.ts + tr.ts'teki HomePage.caseStudies.items'daki insha/RUUT
 * verisini okuyup Sanity'deki karşılık gelen dokümanlara createOrReplace
 * ile yazar. homePage ayrıca familiar/caseStudies(wrapper: heading/
 * intro/linkLabel, items hâlâ caseStudy koleksiyonundan)/process/faq/
 * closingCta alır; siteSettings nav/footer alır.
 *
 * seo.title/description (homePage, siteSettings, workPage,
 * servicesPage, storyPage, legalPage×4) SEO_COPY sabitinden yazılır —
 * content/en.ts + tr.ts'te sadece boş placeholder olduğu için (bkz.
 * HomePage.seo), bu metin content/*.ts'ten değil doğrudan bu script
 * içinde elle yazıldı (bkz. _design/fspark9-positioning-v5.md notu).
 * noIndex hepsinde false.
 *
 * Görsel alanları (proofItem.logo, story.media.image, caseStudy.
 * coverImage/screens/logo, seo.ogImage) bilerek boş bırakılır —
 * Studio'dan elle yüklenecek.
 *
 * Çalıştırma:
 *   SANITY_API_WRITE_TOKEN=... npm run seed
 */
import { randomUUID } from "node:crypto";
import { createClient } from "next-sanity";

import { en as enHome, siteSettings as enSiteSettings } from "../content/en";
import { tr as trHome, siteSettings as trSiteSettings } from "../content/tr";
import { en as enWork, tr as trWork } from "../content/work";
import { en as enServices, tr as trServices } from "../content/services";
import { en as enStory, tr as trStory } from "../content/story";
import { en as enTerms, tr as trTerms } from "../content/legal/terms";
import { en as enPrivacy, tr as trPrivacy } from "../content/legal/privacy";
import { en as enCookies, tr as trCookies } from "../content/legal/cookies";
import { en as enImpressum, tr as trImpressum } from "../content/legal/impressum";
import type { LegalBlock, LegalPage, CaseStudy } from "../types/content";
import { apiVersion, dataset, projectId } from "../sanity/env";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Create a token with Editor access in " +
      "sanity.io/manage → API → Tokens, then run again with " +
      "SANITY_API_WRITE_TOKEN=... npm run seed",
  );
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

function ls(en: string, tr: string) {
  return { _type: "localeString" as const, en, tr };
}

function lt(en: string, tr: string) {
  return { _type: "localeText" as const, en, tr };
}

function key() {
  return randomUUID();
}

function toLink(en: { label: string; href: string; external?: boolean }, tr: { label: string }) {
  return {
    _type: "link" as const,
    label: ls(en.label, tr.label),
    href: en.href,
    ...(en.external ? { external: true } : {}),
  };
}

// SEO title/description — content/en.ts + tr.ts'te sadece boş placeholder
// vardı ({title:"", description:""}), bu yüzden burada elle yazıldı.
// _design/fspark9-positioning-v5.md + dc.html'deki mevcut ton (direkt,
// kısa cümle, jargonsuz) korunarak; çoğu satır sitenin kendi hero/
// closingCta/pages metinlerinden türetildi, yeni bir ses icat edilmedi.
// ogImage hâlâ boş bırakılıyor.
const SEO_COPY = {
  homePage: {
    en: {
      title: "fspark9 | Build the banking side once.",
      description:
        "I'm the side that builds it, not the one that just advises. Proposition, partner, licence route and launch, one person, in your team until it's live.",
    },
    tr: {
      title: "fspark9 | Bankacılık tarafını bir kere kurun.",
      description:
        "Ben kuran tarafım, sadece tavsiye veren değil. Önerme, partner, lisans rotası ve lansman, tek kişi, ekibinizin içinde, canlıya çıkana kadar.",
    },
  },
  siteSettings: {
    en: {
      title: "fspark9 | Fintech and digital banking advisory",
      description:
        "Trust isn't marketed. It's built. I help companies build the banking side of their product: proposition, partner, licence and launch.",
    },
    tr: {
      title: "fspark9 | Fintech ve dijital bankacılık danışmanlığı",
      description:
        "Güven pazarlanmaz, kurulur. Şirketlerin ürününün bankacılık tarafını kuruyorum: önerme, partner, lisans ve lansman.",
    },
  },
  workPage: {
    en: {
      title: "Case studies | fspark9",
      description:
        "What was actually built. Two brands, two different problems. Both needed someone who could decide, set it up and ship it without handing off halfway through.",
    },
    tr: {
      title: "Vaka İncelemeleri | fspark9",
      description:
        "Gerçekte ne kuruldu. İki marka, iki farklı problem. Ortak noktaları, karar veren, kuran ve işi yarı yolda bırakmayan birine ihtiyaç duymalarıydı.",
    },
  },
  servicesPage: {
    en: {
      title: "Services | fspark9",
      description:
        "Four places where money and months usually go missing, and what I do about each one. Pick the one that sounds like your quarter.",
    },
    tr: {
      title: "Hizmetler | fspark9",
      description:
        "Paranın ve zamanın en çok kaybolduğu dört yer, ve her biri için ne yaptığım. Hangisi sizin çeyreğinize benziyorsa oradan başlayın.",
    },
  },
  storyPage: {
    en: {
      title: "Why I do this | fspark9",
      description:
        "Money can't be sold like chocolate. It's earned through trust. The story behind fspark9, what I believe about this work, and what the name means.",
    },
    tr: {
      title: "Bunu Neden Yapıyorum | fspark9",
      description:
        "Para, çikolata gibi satılmaz. Güvenle kazanılır. fspark9'un arkasındaki hikaye, bu iş hakkında ne düşündüğüm ve ismin anlamı.",
    },
  },
  terms: {
    en: {
      title: "Terms of use | fspark9",
      description:
        "What this site is, and is not. Nothing published here is legal, regulatory, tax or investment advice, and no figure on this site is a promise.",
    },
    tr: {
      title: "Kullanım Şartları | fspark9",
      description:
        "Bu site nedir, ne değildir. Burada yayınlanan hiçbir şey hukuki, regülasyona dair, vergi ya da yatırım tavsiyesi değildir.",
    },
  },
  privacy: {
    en: {
      title: "Privacy | fspark9",
      description: "What happens to your data, written plainly. Built to meet Articles 13 and 14 GDPR.",
    },
    tr: {
      title: "Gizlilik | fspark9",
      description:
        "Verinize ne oluyor, sade bir dille anlatıldı. GDPR 13. ve 14. maddelerini karşılayacak şekilde hazırlandı.",
    },
  },
  cookies: {
    en: {
      title: "Cookies | fspark9",
      description:
        "This site does not track you. No advertising cookies, no analytics cookies, no consent banner, because there is nothing to consent to.",
    },
    tr: {
      title: "Çerezler | fspark9",
      description:
        "Bu site sizi takip etmiyor. Reklam çerezi yok, analitik çerezi yok, rıza penceresi yok, çünkü rıza verilecek bir şey yok.",
    },
  },
  impressum: {
    en: {
      title: "Impressum | fspark9",
      description:
        "Who is behind this site. Information pursuant to § 5 DDG. The German version is authoritative, English and Turkish follow below.",
    },
    tr: {
      title: "Künye | fspark9",
      description:
        "Bu sitenin arkasında kim var. § 5 DDG uyarınca bilgiler. Almanca sürüm asıldır, İngilizce ve Türkçe sürümler altta yer alır.",
    },
  },
} as const;

function toSeo(entry: { en: { title: string; description: string }; tr: { title: string; description: string } }) {
  return {
    _type: "seo" as const,
    title: ls(entry.en.title, entry.tr.title),
    description: lt(entry.en.description, entry.tr.description),
    noIndex: false,
  };
}

async function existingId(
  type: "homePage" | "siteSettings" | "workPage" | "servicesPage" | "storyPage",
  fallback: string,
) {
  const id = await client.fetch<string | null>(`*[_type == $type][0]._id`, { type });
  return id ?? fallback;
}

async function existingSlugId(type: "legalPage" | "caseStudy", slug: string, fallback: string) {
  const id = await client.fetch<string | null>(
    `*[_type == $type && slug == $slug][0]._id`,
    { type, slug },
  );
  return id ?? fallback;
}

function toPageHero(en: { eyebrow: string; title: string; intro: string }, tr: typeof en) {
  return {
    _type: "pageHero" as const,
    eyebrow: ls(en.eyebrow, tr.eyebrow),
    title: ls(en.title, tr.title),
    intro: lt(en.intro, tr.intro),
  };
}

// LegalPage.blocks — en/tr aynı sırayı paylaşan iki dizi (impressum.ts'te
// ikisi de AYNI diziye işaret ediyor, çünkü o belge zaten üç dili tek
// metinde taşıyor — bkz. o dosyadaki yorum). block tipine göre doğru
// legalBlock* nesnesine çevrilir.
function toLegalBlock(en: LegalBlock, tr: LegalBlock) {
  const _key = key();
  switch (en.type) {
    case "div":
      return { _key, _type: "legalBlockDiv" as const, text: lt(en.text, tr.type === "div" ? tr.text : "") };
    case "h":
      return { _key, _type: "legalBlockHeading" as const, text: ls(en.text, tr.type === "h" ? tr.text : "") };
    case "sh":
      return {
        _key,
        _type: "legalBlockSubheading" as const,
        text: ls(en.text, tr.type === "sh" ? tr.text : ""),
      };
    case "b":
      return { _key, _type: "legalBlockBold" as const, text: lt(en.text, tr.type === "b" ? tr.text : "") };
    case "field": {
      const trField = tr.type === "field" ? tr : { label: undefined, lines: [] as string[] };
      return {
        _key,
        _type: "legalBlockField" as const,
        ...(en.label ? { label: ls(en.label, trField.label ?? "") } : {}),
        lines: { en: en.lines, tr: trField.lines },
      };
    }
    case "ul": {
      const trList = tr.type === "ul" ? tr : { items: [] as string[] };
      return { _key, _type: "legalBlockList" as const, items: { en: en.items, tr: trList.items } };
    }
    case "tbl": {
      const trTable = tr.type === "tbl" ? tr : { head: [] as string[], rows: [] as string[][] };
      return {
        _key,
        _type: "legalBlockTable" as const,
        head: { en: en.head, tr: trTable.head },
        rows: {
          en: en.rows.map((cells) => ({ _key: key(), _type: "row" as const, cells })),
          tr: trTable.rows.map((cells) => ({ _key: key(), _type: "row" as const, cells })),
        },
      };
    }
  }
}

function toLegalPageDoc(id: string, slug: string, en: LegalPage, tr: LegalPage) {
  return {
    _id: id,
    _type: "legalPage",
    slug,
    hero: toPageHero(en.hero, tr.hero),
    blocks: en.blocks.map((block, i) => toLegalBlock(block, tr.blocks[i])),
  };
}

function toCaseStudyDoc(id: string, en: CaseStudy, tr: CaseStudy) {
  return {
    _id: id,
    _type: "caseStudy",
    slug: en.slug,
    name: ls(en.name, tr.name),
    ...(en.location ? { location: ls(en.location, tr.location ?? "") } : {}),
    subtitle: ls(en.subtitle, tr.subtitle),
    body: lt(en.body, tr.body),
    // coverImage bilerek atlandı — Studio'dan elle yüklenecek.
    problemHeading: ls(en.problemHeading, tr.problemHeading),
    problem: lt(en.problem, tr.problem),
    actionsHeading: ls(en.actionsHeading, tr.actionsHeading),
    actions: en.actions.map((action, i) => ({
      _key: key(),
      _type: "caseStudyAction" as const,
      label: ls(action.label, tr.actions[i].label),
      description: lt(action.description, tr.actions[i].description),
    })),
    deliveredHeading: ls(en.deliveredHeading, tr.deliveredHeading),
    delivered: lt(en.delivered, tr.delivered),
    tags: { en: en.tags, tr: tr.tags },
    // screens bilerek atlandı — Studio'dan elle yüklenecek.
    detailEyebrow: ls(en.detailEyebrow, tr.detailEyebrow),
    detailIntro: lt(en.detailIntro, tr.detailIntro),
    // logo bilerek atlandı — Studio'dan elle yüklenecek.
    order: en.order,
  };
}

async function main() {
  const [
    homePageId,
    siteSettingsId,
    workPageId,
    servicesPageId,
    storyPageId,
    termsId,
    privacyId,
    cookiesId,
    impressumId,
    inshaId,
    ruutId,
    existingLogo,
  ] = await Promise.all([
    existingId("homePage", "homePage"),
    existingId("siteSettings", "siteSettings"),
    existingId("workPage", "workPage"),
    existingId("servicesPage", "servicesPage"),
    existingId("storyPage", "storyPage"),
    existingSlugId("legalPage", "terms", "legalPage-terms"),
    existingSlugId("legalPage", "privacy", "legalPage-privacy"),
    existingSlugId("legalPage", "cookies", "legalPage-cookies"),
    existingSlugId("legalPage", "impressum", "legalPage-impressum"),
    existingSlugId("caseStudy", "insha", "caseStudy-insha"),
    existingSlugId("caseStudy", "ruut", "caseStudy-ruut"),
    // siteSettings.logo bu script tarafından yazılmıyor (upload-logo.ts
    // ayrı yönetiyor, bkz. o dosya) — createOrReplace tüm dokümanı
    // değiştirdiği için, var olan logo burada geri eklenmezse her
    // reseed'de silinir.
    client.fetch<object | null>(`*[_type == "siteSettings"][0].logo`),
  ]);

  const homePageDoc = {
    _id: homePageId,
    _type: "homePage",
    title: "Home Page",
    seo: toSeo(SEO_COPY.homePage),
    hero: {
      _type: "hero",
      eyebrow: ls(enHome.hero.eyebrow, trHome.hero.eyebrow),
      headlinePrimary: ls(enHome.hero.headlinePrimary, trHome.hero.headlinePrimary),
      headlineAccent: ls(enHome.hero.headlineAccent, trHome.hero.headlineAccent),
      bullets: { en: enHome.hero.bullets, tr: trHome.hero.bullets },
      closingLine: lt(enHome.hero.closingLine, trHome.hero.closingLine),
      ctaLabel: ls(enHome.hero.ctaLabel, trHome.hero.ctaLabel),
      ctaHref: enHome.hero.ctaHref,
      ctaNote: lt(enHome.hero.ctaNote, trHome.hero.ctaNote),
      scrollLabel: ls(enHome.hero.scrollLabel, trHome.hero.scrollLabel),
    },
    framework: {
      _type: "framework",
      steps: enHome.framework.steps.map((step, i) => ({
        _key: key(),
        _type: "frameworkStep",
        id: step.id,
        label: ls(step.label, trHome.framework.steps[i].label),
        description: lt(step.description, trHome.framework.steps[i].description),
      })),
    },
    proofStrip: {
      _type: "proofStrip",
      kicker: ls(enHome.proofStrip.kicker, trHome.proofStrip.kicker),
      roles: ls(enHome.proofStrip.roles, trHome.proofStrip.roles),
      items: enHome.proofStrip.items.map((item, i) => ({
        _key: key(),
        _type: "proofItem",
        name: item.name,
        line: lt(item.line, trHome.proofStrip.items[i].line),
        order: item.order,
      })),
      link: toLink(enHome.proofStrip.link, trHome.proofStrip.link),
    },
    services: {
      _type: "servicesSection",
      heading: ls(enHome.services.heading, trHome.services.heading),
      intro: lt(enHome.services.intro, trHome.services.intro),
      labels: {
        problem: ls(enHome.services.labels.problem, trHome.services.labels.problem),
        action: ls(enHome.services.labels.action, trHome.services.labels.action),
        outcome: ls(enHome.services.labels.outcome, trHome.services.labels.outcome),
        rightDoor: ls(enHome.services.labels.rightDoor, trHome.services.labels.rightDoor),
        notRightDoor: ls(
          enHome.services.labels.notRightDoor,
          trHome.services.labels.notRightDoor,
        ),
        duration: ls(enHome.services.labels.duration, trHome.services.labels.duration),
        runsOn: ls(enHome.services.labels.runsOn, trHome.services.labels.runsOn),
      },
      items: enHome.services.items.map((item, i) => {
        const trItem = trHome.services.items[i];
        return {
          _key: key(),
          _type: "service",
          slug: item.slug,
          number: item.number,
          title: ls(item.title, trItem.title),
          tag: ls(item.tag, trItem.tag),
          problem: lt(item.problem, trItem.problem),
          action: lt(item.action, trItem.action),
          outcome: lt(item.outcome, trItem.outcome),
          rightDoor: lt(item.rightDoor, trItem.rightDoor),
          notRightDoor: lt(item.notRightDoor, trItem.notRightDoor),
          duration: lt(item.duration, trItem.duration),
          runsOn: lt(item.runsOn, trItem.runsOn),
        };
      }),
      fullEngagementHeading: ls(
        enHome.services.fullEngagementHeading,
        trHome.services.fullEngagementHeading,
      ),
      fullEngagementBody: lt(
        enHome.services.fullEngagementBody,
        trHome.services.fullEngagementBody,
      ),
      link: toLink(enHome.services.link, trHome.services.link),
    },
    comparison: {
      _type: "comparisonTable",
      heading: ls(enHome.comparison.heading ?? "", trHome.comparison.heading ?? ""),
      intro: lt(enHome.comparison.intro ?? "", trHome.comparison.intro ?? ""),
      scrollHint: ls(enHome.comparison.scrollHint, trHome.comparison.scrollHint),
      columnLabels: {
        decide: ls(enHome.comparison.columnLabels.decide, trHome.comparison.columnLabels.decide),
        setup: ls(enHome.comparison.columnLabels.setup, trHome.comparison.columnLabels.setup),
        ship: ls(enHome.comparison.columnLabels.ship, trHome.comparison.columnLabels.ship),
      },
      rows: enHome.comparison.rows.map((row, i) => {
        const trRow = trHome.comparison.rows[i];
        const value = (
          v: (typeof row)["decide"],
          trV: (typeof trRow)["decide"],
        ) => ({
          _type: "comparisonValue" as const,
          state: v.state,
          ...(v.note ? { note: ls(v.note, trV.note ?? "") } : {}),
        });
        return {
          _key: key(),
          _type: "comparisonRow",
          label: ls(row.label, trRow.label),
          ...(row.isUs ? { isUs: true } : {}),
          decide: value(row.decide, trRow.decide),
          setup: value(row.setup, trRow.setup),
          ship: value(row.ship, trRow.ship),
        };
      }),
    },
    approach: {
      _type: "approachSection",
      heading: ls(enHome.approach.heading ?? "", trHome.approach.heading ?? ""),
      blocks: enHome.approach.blocks.map((block, i) => ({
        _key: key(),
        _type: "approachBlock",
        number: block.number,
        title: ls(block.title, trHome.approach.blocks[i].title),
        body: lt(block.body, trHome.approach.blocks[i].body),
      })),
    },
    audience: {
      _type: "audienceSection",
      heading: ls(enHome.audience.heading, trHome.audience.heading),
      labels: {
        problem: ls(enHome.audience.labels.problem, trHome.audience.labels.problem),
        do: ls(enHome.audience.labels.do, trHome.audience.labels.do),
        result: ls(enHome.audience.labels.result, trHome.audience.labels.result),
      },
      cards: enHome.audience.cards.map((card, i) => {
        const trCard = trHome.audience.cards[i];
        return {
          _key: key(),
          _type: "audienceCard",
          title: ls(card.title, trCard.title),
          problem: lt(card.problem, trCard.problem),
          do: lt(card.do, trCard.do),
          result: lt(card.result, trCard.result),
        };
      }),
    },
    story: {
      _type: "storySection",
      heading: ls(enHome.story.heading, trHome.story.heading),
      lead: lt(enHome.story.lead, trHome.story.lead),
      paragraphs: { en: enHome.story.paragraphs, tr: trHome.story.paragraphs },
      link: toLink(enHome.story.link, trHome.story.link),
      media: {
        _type: "storyMedia",
        type: enHome.story.media.type,
        // media.image bilerek atlandı — Studio'dan elle yüklenecek.
        ...(enHome.story.media.youtubeId
          ? { youtubeId: enHome.story.media.youtubeId }
          : {}),
        ...(enHome.story.media.caption
          ? { caption: lt(enHome.story.media.caption, trHome.story.media.caption ?? "") }
          : {}),
      },
    },
    testimonials: {
      _type: "testimonialSection",
      items: enHome.testimonials.items.map((item, i) => {
        const trItem = trHome.testimonials.items[i];
        return {
          _key: key(),
          _type: "testimonial",
          headline: ls(item.headline, trItem.headline),
          quote: lt(item.quote, trItem.quote),
          attribution: ls(item.attribution, trItem.attribution),
          ctaLabel: ls(item.ctaLabel, trItem.ctaLabel),
          order: item.order,
        };
      }),
    },
    media: {
      _type: "mediaSection",
      heading: ls(enHome.media.heading, trHome.media.heading),
      intro: lt(enHome.media.intro, trHome.media.intro),
      items: enHome.media.items.map((item, i) => {
        const trItem = trHome.media.items[i];
        return {
          _key: key(),
          _type: "mediaItem",
          source: item.source,
          headline: ls(item.headline, trItem.headline),
          description: lt(item.description, trItem.description),
          ...(item.note ? { note: ls(item.note, trItem.note ?? "") } : {}),
          href: item.href,
          ...(item.isVideo ? { isVideo: true } : {}),
          order: item.order,
        };
      }),
    },
    familiar: {
      _type: "familiarSection",
      heading: ls(enHome.familiar.heading, trHome.familiar.heading),
      points: enHome.familiar.points.map((point, i) => ({
        _key: key(),
        _type: "familiarPoint",
        text: lt(point.text, trHome.familiar.points[i].text),
        order: point.order,
      })),
      closingLine: lt(enHome.familiar.closingLine, trHome.familiar.closingLine),
    },
    caseStudies: {
      _type: "caseStudiesSection",
      ...(enHome.caseStudies.heading
        ? { heading: ls(enHome.caseStudies.heading, trHome.caseStudies.heading ?? "") }
        : {}),
      intro: lt(enHome.caseStudies.intro, trHome.caseStudies.intro),
      linkLabel: ls(enHome.caseStudies.linkLabel, trHome.caseStudies.linkLabel),
    },
    process: {
      _type: "processSection",
      heading: ls(enHome.process.heading, trHome.process.heading),
      steps: enHome.process.steps.map((step, i) => {
        const trStep = trHome.process.steps[i];
        return {
          _key: key(),
          _type: "processStep",
          number: step.number,
          title: ls(step.title, trStep.title),
          description: lt(step.description, trStep.description),
          detail: lt(step.detail, trStep.detail),
        };
      }),
      ctaLabel: ls(enHome.process.ctaLabel, trHome.process.ctaLabel),
      ctaHref: enHome.process.ctaHref,
    },
    faq: {
      _type: "faqSection",
      heading: ls(enHome.faq.heading, trHome.faq.heading),
      items: enHome.faq.items.map((item, i) => {
        const trItem = trHome.faq.items[i];
        return {
          _key: key(),
          _type: "faqItem",
          question: ls(item.question, trItem.question),
          answer: lt(item.answer, trItem.answer),
          order: item.order,
        };
      }),
    },
    closingCta: {
      _type: "closingCta",
      quote: lt(enHome.closingCta.quote, trHome.closingCta.quote),
      quoteAttribution: ls(enHome.closingCta.quoteAttribution, trHome.closingCta.quoteAttribution),
      headline: ls(enHome.closingCta.headline, trHome.closingCta.headline),
      ...(enHome.closingCta.body
        ? { body: lt(enHome.closingCta.body, trHome.closingCta.body ?? "") }
        : {}),
      ctaLabel: ls(enHome.closingCta.ctaLabel, trHome.closingCta.ctaLabel),
      ctaHref: enHome.closingCta.ctaHref,
      ...(enHome.closingCta.note
        ? { note: lt(enHome.closingCta.note, trHome.closingCta.note ?? "") }
        : {}),
    },
  };

  const siteSettingsDoc = {
    _id: siteSettingsId,
    _type: "siteSettings",
    title: "Site Settings",
    seo: toSeo(SEO_COPY.siteSettings),
    ...(existingLogo ? { logo: existingLogo } : {}),
    nav: enSiteSettings.nav.map((item, i) => ({
      _key: key(),
      ...toLink(item, trSiteSettings.nav[i]),
    })),
    booking: {
      _type: "bookingSection",
      calLink: enSiteSettings.booking.calLink,
      title: ls(enSiteSettings.booking.title, trSiteSettings.booking.title),
      body: lt(enSiteSettings.booking.body, trSiteSettings.booking.body),
      meta1: ls(enSiteSettings.booking.meta1, trSiteSettings.booking.meta1),
      meta2: ls(enSiteSettings.booking.meta2, trSiteSettings.booking.meta2),
    },
    subpageCta: {
      _type: "subpageCta",
      headline: ls(enSiteSettings.subpageCta.headline, trSiteSettings.subpageCta.headline),
      body: lt(enSiteSettings.subpageCta.body, trSiteSettings.subpageCta.body),
      ctaLabel: ls(enSiteSettings.subpageCta.ctaLabel, trSiteSettings.subpageCta.ctaLabel),
      ctaHref: enSiteSettings.subpageCta.ctaHref,
    },
    footer: {
      _type: "footer",
      tagline: ls(enSiteSettings.footer.tagline, trSiteSettings.footer.tagline),
      nine: ls(enSiteSettings.footer.nine, trSiteSettings.footer.nine),
      signature: ls(enSiteSettings.footer.signature, trSiteSettings.footer.signature),
      email: enSiteSettings.footer.email,
      linkedin: enSiteSettings.footer.linkedin,
      nav: enSiteSettings.footer.nav.map((item, i) => ({
        _key: key(),
        ...toLink(item, trSiteSettings.footer.nav[i]),
      })),
      legalLinks: enSiteSettings.footer.legalLinks.map((item, i) => ({
        _key: key(),
        ...toLink(item, trSiteSettings.footer.legalLinks[i]),
      })),
      legal: ls(enSiteSettings.footer.legal, trSiteSettings.footer.legal),
      copyright: ls(enSiteSettings.footer.copyright, trSiteSettings.footer.copyright),
    },
  };

  const workPageDoc = {
    _id: workPageId,
    _type: "workPage",
    title: "Work Page",
    seo: toSeo(SEO_COPY.workPage),
    hero: toPageHero(enWork.hero, trWork.hero),
  };

  const servicesPageDoc = {
    _id: servicesPageId,
    _type: "servicesPage",
    title: "Services Page",
    seo: toSeo(SEO_COPY.servicesPage),
    hero: toPageHero(enServices.hero, trServices.hero),
  };

  const storyPageDoc = {
    _id: storyPageId,
    _type: "storyPage",
    title: "Story Page",
    seo: toSeo(SEO_COPY.storyPage),
    hero: toPageHero(enStory.hero, trStory.hero),
    media: {
      _type: "storyMedia",
      type: enStory.media.type,
      // media.image bilerek atlandı — Studio'dan elle yüklenecek.
      ...(enStory.media.youtubeId ? { youtubeId: enStory.media.youtubeId } : {}),
      ...(enStory.media.caption
        ? { caption: lt(enStory.media.caption, trStory.media.caption ?? "") }
        : {}),
    },
    prose: enStory.prose.map((block, i) => {
      const trBlock = trStory.prose[i];
      return block.type === "head"
        ? { _key: key(), _type: "proseHead" as const, text: ls(block.text, trBlock.text) }
        : { _key: key(), _type: "proseBody" as const, text: lt(block.text, trBlock.text) };
    }),
  };

  const termsDoc = {
    ...toLegalPageDoc(termsId, "terms", enTerms, trTerms),
    seo: toSeo(SEO_COPY.terms),
  };
  const privacyDoc = {
    ...toLegalPageDoc(privacyId, "privacy", enPrivacy, trPrivacy),
    seo: toSeo(SEO_COPY.privacy),
  };
  const cookiesDoc = {
    ...toLegalPageDoc(cookiesId, "cookies", enCookies, trCookies),
    seo: toSeo(SEO_COPY.cookies),
  };
  const impressumDoc = {
    ...toLegalPageDoc(impressumId, "impressum", enImpressum, trImpressum),
    seo: toSeo(SEO_COPY.impressum),
  };

  const enInsha = enHome.caseStudies.items.find((item) => item.slug === "insha");
  const trInsha = trHome.caseStudies.items.find((item) => item.slug === "insha");
  const enRuut = enHome.caseStudies.items.find((item) => item.slug === "ruut");
  const trRuut = trHome.caseStudies.items.find((item) => item.slug === "ruut");
  if (!enInsha || !trInsha || !enRuut || !trRuut) {
    throw new Error("content/en.ts or content/tr.ts is missing the insha/ruut case study.");
  }
  const inshaDoc = toCaseStudyDoc(inshaId, enInsha, trInsha);
  const ruutDoc = toCaseStudyDoc(ruutId, enRuut, trRuut);

  const results = await Promise.all([
    client.createOrReplace(homePageDoc),
    client.createOrReplace(siteSettingsDoc),
    client.createOrReplace(workPageDoc),
    client.createOrReplace(servicesPageDoc),
    client.createOrReplace(storyPageDoc),
    client.createOrReplace(termsDoc),
    client.createOrReplace(privacyDoc),
    client.createOrReplace(cookiesDoc),
    client.createOrReplace(impressumDoc),
    client.createOrReplace(inshaDoc),
    client.createOrReplace(ruutDoc),
  ]);

  for (const result of results) {
    console.log(`${result._type} written: ${result._id}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
