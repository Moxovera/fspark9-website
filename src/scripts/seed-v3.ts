/**
 * v2 sitesinin Sanity içeriği (brief v4 §6.2, §6.3). Kaynak src/content:
 * staging'in render ettiği aynı nesneler. Tekrar çalıştırmak güvenli:
 * belgeleri src/content'teki hale getirir.
 *
 * Dokunmadıkları: görseller (vaka ekranları, portre, OG), bölüm blokları
 * (Bó'nun kaydı), Imprint ve Terms metni.
 *
 * Çalıştırma:
 *   npm run seed:v3            (SANITY_API_WRITE_TOKEN .env.local'dan)
 *   npm run seed:v3 -- --dry   (sadece yazılacak belgeleri listeler)
 */
import { createReadStream } from "node:fs";
import { createClient, type SanityDocumentStub } from "next-sanity";

import { apiVersion, dataset, projectId } from "../sanity/env";
import { chrome, nextStep, services } from "../content/chrome";
import { home } from "../content/home";
import { servicePages, servicesIndex } from "../content/services";
import { cases, workPage } from "../content/work";
import { about } from "../content/about";
import { spark } from "../content/spark";
import { episodeSeo, legalSeo } from "../content/seo";
import { en as enPrivacy, tr as trPrivacy } from "../content/legal/privacy";
import { en as enCookies, tr as trCookies } from "../content/legal/cookies";
import type { LegalBlock, LegalPage, PageSeoCopy } from "../types/content";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN (.env.local).");

const dry = process.argv.includes("--dry");
const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

/** Canlıya çıkış günü: Bó'nun yayın tarihi (brief §6.2). */
const LAUNCH_DATE = "2026-09-24";

// ─── Yardımcılar ──────────────────────────────────────────────────

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36).padStart(4, "0")}`;

const ls = (en: string, tr: string) => ({ _type: "localeString" as const, en, tr });
const lt = (en: string, tr: string) => ({ _type: "localeText" as const, en, tr });

/** İki paralel dizi, her eleman için bir nesne. */
function zip<T, R>(en: T[], tr: T[], build: (en: T, tr: T, i: number) => R): (R & { _key: string })[] {
  if (en.length !== tr.length) throw new Error(`EN/TR length mismatch: ${en.length} vs ${tr.length}`);
  return en.map((item, i) => ({ _key: key(), ...build(item, tr[i], i) }));
}

const lsList = (en: string[], tr: string[]) => zip(en, tr, (e, t) => ls(e, t));

const seo = (en: PageSeoCopy, tr: PageSeoCopy) => ({
  _type: "seo" as const,
  title: ls(en.title, tr.title),
  description: lt(en.description, tr.description),
});

const titleTexts = (en: { title: string; text: string }[], tr: { title: string; text: string }[]) =>
  zip(en, tr, (e, t) => ({ _type: "titleText", title: ls(e.title, t.title), text: lt(e.text, t.text) }));

const figures = (en: { value: string; label: string }[], tr: { value: string; label: string }[]) =>
  zip(en, tr, (e, t) => ({ _type: "figure", value: ls(e.value, t.value), label: ls(e.label, t.label) }));

const navLinks = (en: { label: string; href: unknown }[], tr: { label: string; href: unknown }[]) =>
  zip(en, tr, (e, t) => ({ _type: "navLink", label: ls(e.label, t.label), href: String(e.href) }));

const ref = (id: string) => ({ _type: "reference" as const, _ref: id, _key: key() });

const EN = "en" as const;
const TR = "tr" as const;

// ─── Belgeler ─────────────────────────────────────────────────────

function siteSettingsPatch() {
  const e = chrome[EN];
  const t = chrome[TR];
  return {
    brandName: e.brandName,
    homeLabel: ls(e.homeLabel, t.homeLabel),
    servicesLabel: ls(e.servicesLabel, t.servicesLabel),
    nav: navLinks(e.nav, t.nav),
    servicesMenu: { label: ls(e.servicesMenu.label, t.servicesMenu.label), heading: ls(e.servicesMenu.heading, t.servicesMenu.heading) },
    bookLabel: ls(e.bookLabel, t.bookLabel),
    menuLabel: ls(e.menuLabel, t.menuLabel),
    menuOpenLabel: ls(e.menuOpenLabel, t.menuOpenLabel),
    menuCloseLabel: ls(e.menuCloseLabel, t.menuCloseLabel),
    footer: {
      email: e.footer.email,
      linkedinHref: e.footer.linkedinHref,
      linkedinLabel: e.footer.linkedinLabel,
      legalLinks: navLinks(e.footer.legalLinks, t.footer.legalLinks),
      copyright: e.footer.copyright,
    },
    booking: {
      calLink: "mburakdikmen/quick-chat",
      title: ls(e.booking.title, t.booking.title),
      meta: ls(e.booking.meta, t.booking.meta),
      closeLabel: ls(e.booking.closeLabel, t.booking.closeLabel),
      poweredBy: ls(e.booking.poweredBy, t.booking.poweredBy),
    },
    nextStep: {
      label: ls(nextStep.en.label, nextStep.tr.label),
      homeLabel: ls(nextStep.en.homeLabel, nextStep.tr.homeLabel),
      headlineLead: ls(nextStep.en.headlineLead, nextStep.tr.headlineLead),
      headlineCut: ls(nextStep.en.headlineCut, nextStep.tr.headlineCut),
      steps: lsList(nextStep.en.steps, nextStep.tr.steps),
      ctaLabel: ls(nextStep.en.ctaLabel, nextStep.tr.ctaLabel),
    },
    legal: {
      backLabel: ls(e.legal.backLabel, t.legal.backLabel),
      tabsLabel: ls(e.legal.tabsLabel, t.legal.tabsLabel),
      tabs: navLinks(e.legal.tabs, t.legal.tabs),
    },
    "seo.title": ls(home.en.seo.title, home.tr.seo.title),
    "seo.description": lt(home.en.seo.description, home.tr.seo.description),
  };
}

function homeDoc(): SanityDocumentStub {
  const e = home[EN];
  const t = home[TR];
  const featuredId = `caseStudy-${e.work.featured.slug}`;
  return {
    _id: "homePage",
    _type: "homePage",
    title: "Home",
    seo: seo(e.seo, t.seo),
    opening: {
      eyebrowParts: lsList(e.opening.eyebrowParts, t.opening.eyebrowParts),
      headlineSentences: lsList(e.opening.headlineSentences, t.opening.headlineSentences),
      cutWord: ls(e.opening.cutWord, t.opening.cutWord),
      intro: lt(e.opening.intro, t.opening.intro),
      ctaLabel: ls(e.opening.ctaLabel, t.opening.ctaLabel),
      secondaryLinkLabel: ls(e.opening.secondaryLinkLabel, t.opening.secondaryLinkLabel),
      portraitAlt: ls(e.opening.portraitAlt, t.opening.portraitAlt),
    },
    startWhereYouAre: {
      label: ls(e.startWhereYouAre.label, t.startWhereYouAre.label),
      heading: ls(e.startWhereYouAre.heading, t.startWhereYouAre.heading),
      text: lt(e.startWhereYouAre.text, t.startWhereYouAre.text),
      items: titleTexts(e.startWhereYouAre.items, t.startWhereYouAre.items),
    },
    fourServices: {
      label: ls(e.fourServices.label, t.fourServices.label),
      heading: ls(e.fourServices.heading, t.fourServices.heading),
      intro: lt(e.fourServices.intro, t.fourServices.intro),
    },
    work: {
      label: ls(e.work.label, t.work.label),
      heading: ls(e.work.heading, t.work.heading),
      allLinkLabel: ls(e.work.allLinkLabel, t.work.allLinkLabel),
      featured: {
        caseStudy: { _type: "reference", _ref: featuredId },
        label: ls(e.work.featured.label, t.work.featured.label),
        heading: ls(e.work.featured.heading, t.work.featured.heading),
        text: lt(e.work.featured.text, t.work.featured.text),
        figures: figures(e.work.featured.figures, t.work.featured.figures),
        linkLabel: ls(e.work.featured.linkLabel, t.work.featured.linkLabel),
      },
      rows: zip(e.work.rows, t.work.rows, (er, tr) => ({
        _type: "caseRow",
        caseStudy: { _type: "reference", _ref: `caseStudy-${er.slug}` },
        line: lt(er.line, tr.line),
        tags: ls(er.tags, tr.tags),
      })),
      alsoLabel: ls(e.work.alsoLabel, t.work.alsoLabel),
      also: titleTexts(e.work.also, t.work.also),
    },
    withMe: {
      label: ls(e.withMe.label, t.withMe.label),
      heading: ls(e.withMe.heading, t.withMe.heading),
      text: lt(e.withMe.text, t.withMe.text),
      points: titleTexts(e.withMe.points, t.withMe.points),
      portraitAlt: ls(e.withMe.portraitAlt, t.withMe.portraitAlt),
    },
    spark: {
      label: ls(e.spark.label, t.spark.label),
      heading: ls(e.spark.heading, t.spark.heading),
      text: lt(e.spark.text, t.spark.text),
      linkLabel: ls(e.spark.linkLabel, t.spark.linkLabel),
      cardLinkLabel: ls(e.spark.cards[0].linkLabel ?? "", t.spark.cards[0].linkLabel ?? ""),
    },
  };
}

function servicesPageDoc(): SanityDocumentStub {
  const e = servicesIndex[EN];
  const t = servicesIndex[TR];
  const pe = servicePages[EN][0];
  const pt = servicePages[TR][0];
  return {
    _id: "servicesPage",
    _type: "servicesPage",
    title: "Services page",
    seo: seo(e.seo, t.seo),
    backLabel: ls(e.backLabel, t.backLabel),
    opening: {
      label: ls(e.opening.label, t.opening.label),
      heading: ls(e.opening.heading, t.opening.heading),
      intro: lt(e.opening.intro, t.opening.intro),
    },
    servicePageLabels: {
      backLabel: ls(pe.backLabel, pt.backLabel),
      stepsLabel: ls(pe.stepsLabel, pt.stepsLabel),
      otherServicesLabel: ls(pe.otherServicesLabel, pt.otherServicesLabel),
      keepLabel: ls(pe.keepLabel, pt.keepLabel),
      ctaLabel: ls(pe.ctaLabel, pt.ctaLabel),
    },
  };
}

function servicePageDocs(): SanityDocumentStub[] {
  return servicePages[EN].map((e, i) => {
    const t = servicePages[TR][i];
    const se = services[EN][i];
    const st = services[TR][i];
    if (t.slug !== e.slug || se.slug !== e.slug || st.slug !== e.slug) throw new Error(`Service order mismatch at ${i}`);
    return {
      _id: `servicePage-${e.slug}`,
      _type: "servicePage",
      slug: e.slug,
      order: i + 1,
      name: ls(se.name, st.name),
      shortLine: lt(se.shortLine, st.shortLine),
      audience: ls(se.audience, st.audience),
      slices: [...se.slices],
      seo: seo(e.seo, t.seo),
      opening: {
        label: ls(e.opening.label, t.opening.label),
        heading: ls(e.opening.heading, t.opening.heading),
        intro: lt(e.opening.intro, t.opening.intro),
      },
      steps: zip(e.steps, t.steps, (es, ts) => ({
        _type: "serviceStep",
        ...(es.title ? { title: ls(es.title, ts.title ?? "") } : {}),
        line: lt(es.line, ts.line),
        slices: [...es.slices],
      })),
      keep: lt(e.keep, t.keep),
    };
  });
}

function workPageDoc(): SanityDocumentStub {
  const e = workPage[EN];
  const t = workPage[TR];
  const pick = (k: keyof typeof e) => ls(String(e[k]), String(t[k]));
  return {
    _id: "workPage",
    _type: "workPage",
    title: "Work page",
    seo: seo(e.seo, t.seo),
    backLabel: pick("backLabel"),
    label: pick("label"),
    heading: pick("heading"),
    lead: lt(e.lead, t.lead),
    readLabel: pick("readLabel"),
    caseLabel: pick("caseLabel"),
    caseBackLabel: pick("caseBackLabel"),
    sourcesLabel: pick("sourcesLabel"),
    nextCaseLabel: pick("nextCaseLabel"),
  };
}

/** Vaka alanları; ekranlar (screens) ve _id korunuyor, eski alanlar siliniyor. */
function casePatches() {
  return cases[EN].map((e, i) => {
    const t = cases[TR][i];
    return {
      id: `caseStudy-${e.slug}`,
      set: {
        slug: e.slug,
        order: i + 1,
        seo: seo(e.seo, t.seo),
        name: ls(e.name, t.name),
        subtitle: lt(e.subtitle, t.subtitle),
        market: ls(e.market, t.market),
        tags: ls(e.tags, t.tags),
        services: e.services.map((slug) => ref(`servicePage-${slug}`)),
        problem: { label: ls(e.problem.label, t.problem.label), lead: lt(e.problem.lead, t.problem.lead), body: lt(e.problem.body, t.problem.body) },
        actions: { label: ls(e.actions.label, t.actions.label), items: lsList(e.actions.items, t.actions.items) },
        delivered: {
          label: ls(e.delivered.label, t.delivered.label),
          lead: lt(e.delivered.lead, t.delivered.lead),
          body: lt(e.delivered.body, t.delivered.body),
        },
        figures: figures(e.figures ?? [], t.figures ?? []),
        proof: { value: ls(e.proof.value, t.proof.value), label: ls(e.proof.label, t.proof.label) },
        sources: [...e.sources],
      },
      unset: ["location", "body", "coverImage", "problemHeading", "actionsHeading", "deliveredHeading", "detailEyebrow", "detailIntro", "logo"],
    };
  });
}

function aboutDoc(): SanityDocumentStub {
  const e = about[EN];
  const t = about[TR];
  const card = (ec: { label: string; lead: string; body: string }, tc: typeof ec) => ({
    label: ls(ec.label, tc.label),
    lead: lt(ec.lead, tc.lead),
    body: lt(ec.body, tc.body),
  });
  return {
    _id: "aboutPage",
    _type: "aboutPage",
    title: "About page",
    seo: seo(e.seo, t.seo),
    backLabel: ls(e.backLabel, t.backLabel),
    label: ls(e.label, t.label),
    hero: {
      headlineSentences: lsList(e.hero.headlineSentences, t.hero.headlineSentences),
      cutWord: ls(e.hero.cutWord, t.hero.cutWord),
    },
    pair: zip(e.pair, t.pair, (ec, tc) => ({ _type: "storyCard", ...card(ec, tc) })),
    result: card(e.result, t.result),
    whyNine: { label: ls(e.whyNine.label, t.whyNine.label), text: lt(e.whyNine.text, t.whyNine.text) },
    portraitAlt: ls(e.portraitAlt, t.portraitAlt),
  };
}

function sparkSectionDoc(): SanityDocumentStub {
  const e = spark[EN];
  const t = spark[TR];
  const pick = (k: "bigWord" | "heading" | "tickerTail" | "formatsLabel" | "readLabel" | "backLabel" | "sparkLabel" | "launchDateLabel") =>
    ls(e[k], t[k]);
  const episode = Object.fromEntries(
    (Object.keys(e.episode) as (keyof typeof e.episode)[]).map((k) => [k, ls(e.episode[k], t.episode[k])]),
  );
  return {
    _id: "sparkSection",
    _type: "sparkSection",
    title: "Spark",
    seo: seo(e.seo, t.seo),
    bigWord: pick("bigWord"),
    heading: pick("heading"),
    tickerItems: lsList(e.tickerItems, t.tickerItems),
    tickerTail: pick("tickerTail"),
    formatsLabel: pick("formatsLabel"),
    readLabel: pick("readLabel"),
    backLabel: pick("backLabel"),
    sparkLabel: pick("sparkLabel"),
    launchDateLabel: pick("launchDateLabel"),
    episode,
  };
}

const FORMAT_IDS = ["sparkFormat-the-last-day", "sparkFormat-sector-reports"];
const SINGULAR = [ls("The Last Day", "Son Gün"), ls("Sector report", "Sektör raporu")];

function formatSets() {
  return spark[EN].formats.map((e, i) => {
    const t = spark[TR].formats[i];
    const opt = (en?: string, tr?: string) => (en ? ls(en, tr ?? "") : undefined);
    return {
      id: FORMAT_IDS[i],
      set: {
        number: Number(e.number),
        orderRank: i + 1,
        name: ls(e.name, t.name),
        singularName: SINGULAR[i],
        slug: { _type: "localeSlug", en: { _type: "slug", current: e.slug }, tr: { _type: "slug", current: t.slug } },
        status: e.status,
        seo: seo(e.seo, t.seo),
        description: lt(e.description, t.description),
        ...(opt(e.openLabel, t.openLabel) ? { openLabel: opt(e.openLabel, t.openLabel) } : {}),
        ...(opt(e.preparingLine, t.preparingLine) ? { preparingLine: opt(e.preparingLine, t.preparingLine) } : {}),
        comingLabel: ls(e.comingIssues[0]?.statusLabel ?? "", t.comingIssues[0]?.statusLabel ?? ""),
        aboutLabel: ls(e.aboutLabel, t.aboutLabel),
        aboutLines: lsList(e.aboutLines, t.aboutLines),
        showAllLabel: ls(e.showAllLabel, t.showAllLabel),
        allIssuesLabel: ls(e.allIssuesLabel, t.allIssuesLabel),
        daysUnit: ls(e.daysUnit, t.daysUnit),
        episodesLabel: ls(e.episodesLabel, t.episodesLabel),
        columns: {
          number: ls(e.columns.number, t.columns.number),
          company: ls(e.columns.company, t.columns.company),
          days: ls(e.columns.days, t.columns.days),
          published: ls(e.columns.published, t.columns.published),
        },
        showAllTemplate: ls(e.showAllTemplate, t.showAllTemplate),
      },
      unset: ["subjectLine", "whatIsInside", "statusLineSingular", "statusLinePlural", "hookLabel", "hero"],
    };
  });
}

/** Sıradaki (coming) sayılar: sayfası yok, listede linksiz satır. */
function comingEpisodeDocs(): SanityDocumentStub[] {
  return spark[EN].formats.flatMap((e, i) => {
    const t = spark[TR].formats[i];
    return e.comingIssues.map((issue, j) => {
      const number = Number(issue.number.replace(/\D/g, ""));
      const card = [home.en.spark.cards, home.tr.spark.cards].map((list) =>
        list.find((c) => c.number === issue.number && c.status),
      );
      const slug = issue.subject.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return {
        _id: `sparkEpisode-${FORMAT_IDS[i].replace("sparkFormat-", "")}-${String(number).padStart(2, "0")}`,
        _type: "sparkEpisode",
        format: { _type: "reference", _ref: FORMAT_IDS[i] },
        number,
        subject: ls(issue.subject, t.comingIssues[j].subject),
        slug: {
          _type: "localeSlug",
          en: { _type: "slug", current: `${String(number).padStart(2, "0")}-${slug}` },
          tr: { _type: "slug", current: `${String(number).padStart(2, "0")}-${slug}` },
        },
        hook: lt(issue.hook, t.comingIssues[j].hook),
        ...(card[0] && card[1] ? { cardLine: lt(card[0].line, card[1].line) } : {}),
        status: "coming",
      };
    });
  });
}

function boPatch() {
  const card = [home.en.spark.cards[0], home.tr.spark.cards[0]];
  return {
    id: "sparkEpisode-01-bo",
    set: {
      subject: ls("Bó", "Bó"),
      publishedAt: LAUNCH_DATE,
      evidenceTakenAt: LAUNCH_DATE,
      lastCheckedAt: LAUNCH_DATE,
      seo: seo(episodeSeo.en["01-bo"], episodeSeo.tr["01-bo"]),
      cardLine: lt(card[0].line, card[1].line),
    },
  };
}

// Legal: src/content/legal/*.ts → legalBlock* (yalnızca Privacy ve Cookies,
// fspark9-legal-update-v2). Imprint ve Terms metnine dokunulmuyor.
function toLegalBlock(en: LegalBlock, tr: LegalBlock) {
  const _key = key();
  const text = (b: LegalBlock) => ("text" in b ? b.text : "");
  switch (en.type) {
    case "div":
      return { _key, _type: "legalBlockDiv", text: lt(en.text, text(tr)) };
    case "h":
      return { _key, _type: "legalBlockHeading", text: ls(en.text, text(tr)) };
    case "sh":
      return { _key, _type: "legalBlockSubheading", text: ls(en.text, text(tr)) };
    case "b":
      return { _key, _type: "legalBlockBold", text: lt(en.text, text(tr)) };
    case "field": {
      const t = tr.type === "field" ? tr : { label: "", lines: [] };
      return {
        _key,
        _type: "legalBlockField",
        ...(en.label ? { label: ls(en.label, t.label ?? "") } : {}),
        lines: { en: en.lines, tr: t.lines },
      };
    }
    case "ul":
      return { _key, _type: "legalBlockList", items: { en: en.items, tr: tr.type === "ul" ? tr.items : [] } };
    case "tbl": {
      const t = tr.type === "tbl" ? tr : { head: [], rows: [] };
      return {
        _key,
        _type: "legalBlockTable",
        head: { en: en.head, tr: t.head },
        rows: {
          en: en.rows.map((cells) => ({ _key: key(), _type: "row", cells })),
          tr: t.rows.map((cells) => ({ _key: key(), _type: "row", cells })),
        },
      };
    }
  }
}

function legalPatches() {
  const pages: [string, LegalPage, LegalPage][] = [
    ["privacy", enPrivacy, trPrivacy],
    ["cookies", enCookies, trCookies],
  ];
  const body = pages.map(([slug, en, tr]) => {
    if (en.blocks.length !== tr.blocks.length) throw new Error(`${slug}: EN/TR block count differs`);
    return {
      id: `legalPage-${slug}`,
      set: {
        hero: {
          _type: "pageHero",
          eyebrow: ls(en.hero.eyebrow, tr.hero.eyebrow),
          title: ls(en.hero.title, tr.hero.title),
          intro: lt(en.hero.intro, tr.hero.intro),
        },
        blocks: en.blocks.map((b, i) => toLegalBlock(b, tr.blocks[i])),
      },
    };
  });
  const seoSets = (["impressum", "privacy", "cookies", "terms"] as const).map((slug) => ({
    id: `legalPage-${slug}`,
    set: {
      "seo.title": ls(legalSeo.en[slug].title, legalSeo.tr[slug].title),
      "seo.description": lt(legalSeo.en[slug].description, legalSeo.tr[slug].description),
    },
  }));
  return [...body, ...seoSets];
}

// ─── Çalıştır ─────────────────────────────────────────────────────

async function uploadLogo() {
  const current = await client.fetch<string | null>(`*[_id == "siteSettings"][0].logo.asset->originalFilename`);
  if (current === "fspark9-icon-512.png") return null;
  if (dry) return "would upload public/assets/brand/fspark9-icon-512.png";
  const asset = await client.assets.upload("image", createReadStream("public/assets/brand/fspark9-icon-512.png"), {
    filename: "fspark9-icon-512.png",
  });
  await client.patch("siteSettings").set({ logo: { _type: "image", alt: "fspark9", asset: { _type: "reference", _ref: asset._id } } }).commit();
  return `uploaded logo ${asset._id}`;
}

async function main() {
  const creates = [homeDoc(), servicesPageDoc(), ...servicePageDocs(), workPageDoc(), aboutDoc(), sparkSectionDoc(), ...comingEpisodeDocs()];
  const patches: { id: string; set: Record<string, unknown>; unset?: string[] }[] = [
    { id: "siteSettings", set: siteSettingsPatch(), unset: ["subpageCta", "footer.tagline", "footer.nine", "footer.signature", "footer.nav", "footer.legal"] },
    ...casePatches(),
    ...formatSets(),
    boPatch(),
    ...legalPatches(),
  ];

  // Sector reports formatı yoksa önce boş olarak oluşturuluyor, sonra patch'le dolduruluyor.
  const existingFormats = await client.fetch<string[]>(`*[_type == "sparkFormat"]._id`);

  if (dry) {
    console.log("createOrReplace:", creates.map((d) => d._id).join(", "));
    console.log("patch:", patches.map((p) => p.id).join(", "));
    console.log("missing formats:", FORMAT_IDS.filter((id) => !existingFormats.includes(id)).join(", ") || "none");
    console.log(await uploadLogo());
    return;
  }

  const tx = client.transaction();
  for (const id of FORMAT_IDS.filter((id) => !existingFormats.includes(id))) {
    tx.createIfNotExists({ _id: id, _type: "sparkFormat" });
  }
  for (const doc of creates) tx.createOrReplace(doc as SanityDocumentStub & { _id: string });
  for (const p of patches) {
    tx.patch(p.id, (patch) => {
      let next = patch.set(p.set);
      if (p.unset?.length) next = next.unset(p.unset);
      return next;
    });
  }
  const result = await tx.commit();
  console.log(`committed ${result.results.length} mutations`);
  console.log((await uploadLogo()) ?? "logo already current");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
