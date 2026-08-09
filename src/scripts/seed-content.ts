/**
 * Tek seferlik seed script.
 *
 * content/en.ts + content/tr.ts'teki HomePage/SiteSettings verisini okuyup
 * Sanity'deki homePage ve siteSettings singleton dokümanlarına
 * createOrReplace ile yazar. Sadece şeması var olan alanlar yazılır (bkz.
 * README notu en altta) — familiar/caseStudies/process/faq/closingCta.quote,
 * siteSettings.nav/footer/defaultOgImage, work.ts/services.ts/story.ts/
 * legal/*.ts'nin TAMAMI atlanır, çünkü bunların Sanity şeması henüz yok.
 *
 * Görsel alanları (proofItem.logo, story.media.image) bilerek boş
 * bırakılır — Studio'dan elle yüklenecek.
 *
 * Çalıştırma:
 *   SANITY_API_WRITE_TOKEN=... npm run seed
 */
import { randomUUID } from "node:crypto";
import { createClient } from "next-sanity";

import { en as enHome, siteSettings as enSiteSettings } from "../content/en";
import { tr as trHome, siteSettings as trSiteSettings } from "../content/tr";
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

async function existingId(type: "homePage" | "siteSettings", fallback: string) {
  const id = await client.fetch<string | null>(`*[_type == $type][0]._id`, { type });
  return id ?? fallback;
}

async function main() {
  const [homePageId, siteSettingsId] = await Promise.all([
    existingId("homePage", "homePage"),
    existingId("siteSettings", "siteSettings"),
  ]);

  const homePageDoc = {
    _id: homePageId,
    _type: "homePage",
    title: "Home Page",
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
  };

  const siteSettingsDoc = {
    _id: siteSettingsId,
    _type: "siteSettings",
    title: "Site Settings",
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
  };

  const [homePageResult, siteSettingsResult] = await Promise.all([
    client.createOrReplace(homePageDoc),
    client.createOrReplace(siteSettingsDoc),
  ]);

  console.log(`homePage written: ${homePageResult._id}`);
  console.log(`siteSettings written: ${siteSettingsResult._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
