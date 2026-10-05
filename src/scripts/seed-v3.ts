/**
 * v2 sitesinin Sanity içeriği (brief v4 §6.2, §6.3). Kaynak src/content:
 * staging'in render ettiği aynı nesneler. Tekrar çalıştırmak güvenli:
 * belgeleri src/content'teki hale getirir.
 *
 * Dokunmadıkları: görseller (vaka ekranları, portre, OG), Imprint ve
 * Terms metni. Spark belgeleri yama ile yazılıyor: şemadan çıkmış eski
 * alanlar (canlıdaki eski kod hâlâ okuyor olabilir) yerinde kalıyor,
 * `npm run cleanup:v3` onları ayrıca siler.
 *
 * Çalıştırma:
 *   npm run seed:v3                  (SANITY_API_WRITE_TOKEN .env.local'dan)
 *   npm run seed:v3 -- --dry         (sadece yazılacak belgeleri listeler)
 *   npm run seed:v3 -- --only=spark  (sadece Spark belgeleri; Studio'da
 *                                     düzenlenmiş diğer sayfalara dokunmaz)
 *
 * Nuri (Nº 02) canlıya iki adımda çıkıyor; staging ve canlı aynı veri
 * setini okuduğu için:
 *   --preview-nuri   status coming + previewLive: staging yayındaki gibi
 *                    gösterir, canlı "sırada" kalır.
 *   --publish-nuri   status published, previewLive kalkar.
 * İkisi de yoksa bölümün durumuna dokunulmaz.
 *
 * Fidor (Nº 03) aynı mantıkla, ama önizlemede `draft` (canlıda hiç
 * görünmez, coming gibi linksiz satır da çıkmaz):
 *   --only=fidor     sadece Fidor belgesi yazılır (yoksa draft + previewLive
 *                    ile oluşturulur); diğer belgelere dokunulmaz.
 *   --publish-fidor  status published, previewLive kalkar.
 *
 * Sektör raporları Nº 01 (Bauspar) Fidor gibi önizlemeyle çıkar: ayrı
 * belge, status draft + previewLive: staging yayındaki gibi gösterir,
 * canlıda hiç görünmez; v2'den kalan "sırada" belgesi canlıda yerinde
 * kalır. Her çalıştırmada bu durum yazılır:
 *   --only=bauspar     sadece Bauspar belgesi yazılır; diğerlerine dokunulmaz.
 *   --publish-bauspar  status published, previewLive kalkar, eski "sırada" belgesi silinir.
 */
import { createReadStream } from "node:fs";
import { createClient, type SanityDocumentStub } from "next-sanity";

import { apiVersion, dataset, projectId } from "../sanity/env";
import { chrome, nextStep, services } from "../content/chrome";
import { home } from "../content/home";
import { servicePages, servicesIndex } from "../content/services";
import { cases, workPage } from "../content/work";
import { about } from "../content/about";
import { spark, sparkEpisodes } from "../content/spark";
import { nuri } from "../content/spark-nuri";
import { fidor } from "../content/spark-fidor";
import { bauspar } from "../content/spark-bauspar";
import { legalSeo } from "../content/seo";
import { en as enPrivacy, tr as trPrivacy } from "../content/legal/privacy";
import { en as enCookies, tr as trCookies } from "../content/legal/cookies";
import type {
  LegalBlock,
  LegalPage,
  PageSeoCopy,
  SparkChoiceOption,
  SparkDecisionEpisode,
  SparkReport,
  SparkSourceLink,
  SparkStoryCard,
  SparkEpisodeStory,
} from "../types/content";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN (.env.local).");

const dry = process.argv.includes("--dry");
const onlySpark = process.argv.includes("--only=spark");
const previewNuri = process.argv.includes("--preview-nuri");
const publishNuri = process.argv.includes("--publish-nuri");
if (previewNuri && publishNuri) throw new Error("--preview-nuri and --publish-nuri are exclusive.");
const onlyFidor = process.argv.includes("--only=fidor");
const publishFidor = process.argv.includes("--publish-fidor");
const onlyBauspar = process.argv.includes("--only=bauspar");
const publishBauspar = process.argv.includes("--publish-bauspar");
const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

/** Canlıya çıkış günü: Bó'nun yayın tarihi (brief §6.2). */
const LAUNCH_DATE = "2026-09-24";
/** Nuri'nin yayın tarihi (canlıya çıktığı gün; home.ts kartıyla aynı). */
const NURI_PUBLISHED = "2026-09-29";
/** Fidor'un yayın tarihi (staging'e çıktığı gün; canlıya çıkışta güncellenebilir). */
const FIDOR_PUBLISHED = "2026-10-02";
/** Bauspar raporunun yayın tarihi (staging'e çıktığı gün; veriler 5 Ekim 2026'da kontrol edildi). */
const BAUSPAR_PUBLISHED = "2026-10-05";

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
      cardLinkLabel: ls(sparkCard(e, "Nº 01").linkLabel ?? "", sparkCard(t, "Nº 01").linkLabel ?? ""),
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

/** Spark bölümü yama ile: bölüm etiketleri tek tek (eski anahtarlar canlı kod için yerinde kalır). */
function sparkSectionPatch() {
  const e = spark[EN];
  const t = spark[TR];
  const pick = (k: "bigWord" | "heading" | "tickerTail" | "formatsLabel" | "readLabel" | "backLabel" | "sparkLabel" | "launchDateLabel") =>
    ls(e[k], t[k]);
  const episode = Object.fromEntries(
    (Object.keys(e.episode) as (keyof typeof e.episode)[]).map((k) => [`episode.${k}`, ls(e.episode[k], t.episode[k])]),
  );
  return {
    id: "sparkSection",
    set: {
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
      ...episode,
    },
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
        ...(e.comingIssues[0] && t.comingIssues[0]
          ? { comingLabel: ls(e.comingIssues[0].statusLabel, t.comingIssues[0].statusLabel) }
          : {}),
        allIssuesLabel: ls(e.allIssuesLabel, t.allIssuesLabel),
        daysUnit: ls(e.daysUnit, t.daysUnit),
        line: lt(e.line, t.line),
        ...(opt(e.startLabel, t.startLabel) ? { startLabel: opt(e.startLabel, t.startLabel) } : {}),
        ...(opt(e.howLabel, t.howLabel) ? { howLabel: opt(e.howLabel, t.howLabel) } : {}),
        ...(opt(e.howHeading, t.howHeading) ? { howHeading: opt(e.howHeading, t.howHeading) } : {}),
        howSteps: zip(e.howSteps, t.howSteps, (es, ts) => ({ _type: "sparkHowStep", title: ls(es.title, ts.title), body: lt(es.body, ts.body) })),
        episodesLabel: ls(e.episodesLabel, t.episodesLabel),
        ...(opt(e.closeHeading, t.closeHeading) ? { closeHeading: opt(e.closeHeading, t.closeHeading) } : {}),
      },
      unset: [
        "subjectLine", "whatIsInside", "statusLineSingular", "statusLinePlural", "hookLabel", "hero", "label",
        ...(e.startLabel ? [] : ["startLabel"]),
        ...(e.howLabel ? [] : ["howLabel"]),
        ...(e.howHeading ? [] : ["howHeading"]),
        ...(e.closeHeading ? [] : ["closeHeading"]),
      ],
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

const storyCard = (e: SparkStoryCard, t: SparkStoryCard) => ({
  _type: "sparkStoryCard",
  mode: e.mode,
  day: e.day,
  state: ls(e.state, t.state),
  caption: ls(e.caption, t.caption),
  barTitle: ls(e.barTitle, t.barTitle),
  ...(e.progress !== undefined ? { progress: e.progress } : {}),
  ...(e.barDay !== undefined ? { barDay: ls(e.barDay, t.barDay ?? "") } : {}),
});

/** Bölüm hikâyesinin alanları (sparkEpisodeStory.ts), EN ve TR paralel. */
function storySet(e: SparkEpisodeStory, t: SparkEpisodeStory) {
  const texts = (en: string[], tr: string[]) => zip(en, tr, (a, b) => lt(a, b));
  return {
    subject: ls(e.subject, t.subject),
    hook: lt(e.hook, t.hook),
    seo: seo(e.seo, t.seo),
    hero: {
      label: ls(e.hero.label, t.hero.label),
      title: lt(e.hero.title, t.hero.title),
      sub: lt(e.hero.sub, t.hero.sub),
      invite: lt(e.hero.invite, t.hero.invite),
      startLabel: ls(e.hero.startLabel, t.hero.startLabel),
      cardDay: e.hero.cardDay,
      cardState: ls(e.hero.cardState, t.hero.cardState),
      ...(e.hero.figure ? { figure: e.hero.figure, figureLabel: ls(e.hero.figureLabel ?? "", t.hero.figureLabel ?? "") } : {}),
    },
    ...(e.dayClock && t.dayClock ? { dayClock: { label: ls(e.dayClock.label, t.dayClock.label), ofLabel: ls(e.dayClock.ofLabel, t.dayClock.ofLabel) } } : {}),
    chapters: zip(e.chapters, t.chapters, (ec, tc) => ({
      _type: "sparkChapter",
      id: ec.id,
      label: ls(ec.label, tc.label),
      title: ls(ec.title, tc.title),
      lead: lt(ec.lead, tc.lead),
      paragraphs: texts(ec.paragraphs, tc.paragraphs),
      card: storyCard(ec.card, tc.card),
      ...(ec.decision && tc.decision
        ? {
            decision: {
              _type: "sparkDecision",
              label: ls(ec.decision.label, tc.decision.label),
              question: lt(ec.decision.question, tc.decision.question),
              options: zip(ec.decision.options, tc.decision.options, (eo, to) => ({
                _type: "sparkDecisionOption",
                key: eo.key,
                text: lt(eo.text, to.text),
                answer: lt(eo.answer, to.answer),
              })),
              didLabel: ls(ec.decision.didLabel, tc.decision.didLabel),
              didTitle: lt(ec.decision.didTitle, tc.decision.didTitle),
              didBody: texts(ec.decision.didBody, tc.decision.didBody),
              note: lt(ec.decision.note, tc.decision.note),
              services: zip(ec.decision.services, tc.decision.services, (es, ts) => ({
                _type: "sparkServiceTag",
                name: ls(es.name, ts.name),
                service: es.service,
              })),
            },
          }
        : {}),
    })),
    ...(e.interlude && t.interlude
      ? {
          interlude: {
            afterChapter: e.interlude.afterChapter,
            text: lt(e.interlude.text, t.interlude.text),
            card: storyCard(e.interlude.card, t.interlude.card),
          },
        }
      : {}),
    lessons: zip(e.lessons, t.lessons, (el, tl) => ({ _type: "sparkLesson", heading: ls(el.heading, tl.heading), body: lt(el.body, tl.body) })),
    ...(e.note && t.note ? { note: { label: ls(e.note.label, t.note.label), paragraphs: texts(e.note.paragraphs, t.note.paragraphs) } } : {}),
    ...(e.lastDay && t.lastDay ? { lastDay: { label: ls(e.lastDay.label, t.lastDay.label), text: lt(e.lastDay.text, t.lastDay.text) } } : {}),
    finalQuestion: {
      label: ls(e.finalQuestion.label, t.finalQuestion.label),
      title: lt(e.finalQuestion.title, t.finalQuestion.title),
      ...(e.finalQuestion.lead ? { lead: lt(e.finalQuestion.lead, t.finalQuestion.lead ?? "") } : {}),
      ctaLabel: ls(e.finalQuestion.ctaLabel, t.finalQuestion.ctaLabel),
      options: zip(e.finalQuestion.options, t.finalQuestion.options, (eo, to) => ({
        _type: "sparkFinalOption",
        text: lt(eo.text, to.text),
        service: eo.service,
        serviceName: ls(eo.serviceName, to.serviceName),
        heading: ls(eo.heading, to.heading),
        body: lt(eo.body, to.body),
      })),
    },
    ...(e.next && t.next ? { next: { number: e.next.number, name: ls(e.next.name, t.next.name), line: lt(e.next.line, t.next.line) } } : {}),
    sourcesLabel: ls(e.sourcesLabel, t.sourcesLabel),
    sources: zip(e.sources, t.sources, (es, ts) => ({
      _type: "sparkSource",
      n: es.n,
      links: zip(es.links, ts.links, (el, tl) => ({ _type: "sparkSourceLink", label: ls(el.label, tl.label), href: el.href })),
    })),
    correctionLine: lt(e.correctionLine, t.correctionLine),
    closeHeading: ls(e.closeHeading, t.closeHeading),
  };
}

/** Ana sayfa aynasında kartlar yayın tarihine göre sıralı; bölüm numarasıyla bulunur. */
function sparkCard(h: typeof home.en, number: string, format?: string) {
  const card = h.spark.cards.find((c) => c.number === number && !c.status && (!format || c.format === format));
  if (!card) throw new Error(`home.spark.cards: ${number} yok`);
  return card;
}

function boPatch() {
  const card = [sparkCard(home.en, "Nº 01"), sparkCard(home.tr, "Nº 01")];
  return {
    id: "sparkEpisode-01-bo",
    set: {
      ...storySet(sparkEpisodes.en["01-bo"], sparkEpisodes.tr["01-bo"]),
      publishedAt: LAUNCH_DATE,
      lastCheckedAt: LAUNCH_DATE,
      cardLine: lt(card[0].line, card[1].line),
    },
  };
}

const sources = (en: SparkSourceLink[], tr: SparkSourceLink[]) =>
  zip(en, tr, (el, tl) => ({ _type: "sparkBlockSource", label: ls(el.label, tl.label), href: el.href }));
const options = (en: SparkChoiceOption[], tr: SparkChoiceOption[]) =>
  zip(en, tr, (eo, to) => ({ _type: "sparkChoiceOption", key: eo.key, text: lt(eo.text, to.text) }));
const texts = (en: string[], tr: string[]) => zip(en, tr, (a, b) => lt(a, b));

/** Karar blokları şablonunun alanları (sparkEpisodeDecisions.ts), EN ve TR paralel. */
function decisionSet(e: SparkDecisionEpisode, t: SparkDecisionEpisode) {
  const { poll: ep } = e.twist;
  const { poll: tp } = t.twist;
  const pollText = (k: Exclude<keyof typeof ep, "question" | "options" | "freeKey" | "sourceHref">) => ls(ep[k], tp[k]);
  return {
    layout: "decisions",
    subject: ls(e.subject, t.subject),
    hook: lt(e.hook, t.hook),
    seo: seo(e.seo, t.seo),
    opening: {
      label: ls(e.opening.label, t.opening.label),
      meta: ls(e.opening.meta, t.opening.meta),
      figure: e.opening.figure,
      figureLabel: ls(e.opening.figureLabel, t.opening.figureLabel),
    },
    ruler: {
      ticks: zip(e.ruler.ticks, t.ruler.ticks, (et, tt) => ({
        _type: "sparkRulerTick",
        date: et.date,
        label: ls(et.label, tt.label),
        caption: ls(et.caption, tt.caption),
      })),
      after: lt(e.ruler.after, t.ruler.after),
    },
    standfirst: lt(e.standfirst, t.standfirst),
    provenance: ls(e.provenance, t.provenance),
    clock: { rangeLabel: ls(e.clock.rangeLabel, t.clock.rangeLabel), start: e.clock.start, end: e.clock.end },
    intro: lt(e.intro, t.intro),
    labels: Object.fromEntries(
      (Object.keys(e.labels) as (keyof typeof e.labels)[]).map((k) => [k, ls(e.labels[k], t.labels[k])]),
    ),
    decisions: zip(e.decisions, t.decisions, (ed, td) => ({
      _type: "sparkChoiceDecision",
      date: ed.date,
      when: ls(ed.when, td.when),
      label: ls(ed.label, td.label),
      title: ls(ed.title, td.title),
      paragraphs: texts(ed.paragraphs, td.paragraphs),
      options: options(ed.options, td.options),
      record: ed.record,
      reveal: texts(ed.reveal, td.reveal),
      sources: sources(ed.sources, td.sources),
    })),
    records: zip(e.records, t.records, (er, tr) => ({
      _type: "sparkRecordBlock",
      date: er.date,
      when: ls(er.when, tr.when),
      label: ls(er.label, tr.label),
      paragraphs: texts(er.paragraphs, tr.paragraphs),
      sources: sources(er.sources, tr.sources),
    })),
    twist: {
      date: e.twist.date,
      when: ls(e.twist.when, t.twist.when),
      label: ls(e.twist.label, t.twist.label),
      paragraphs: texts(e.twist.paragraphs, t.twist.paragraphs),
      question: lt(ep.question, tp.question),
      options: options(ep.options, tp.options),
      freeKey: ep.freeKey,
      freeLabel: pollText("freeLabel"),
      freePlaceholder: pollText("freePlaceholder"),
      counterTemplate: pollText("counterTemplate"),
      emailLabel: pollText("emailLabel"),
      submitLabel: pollText("submitLabel"),
      sendingLabel: pollText("sendingLabel"),
      privacyLine: pollText("privacyLine"),
      thanks: pollText("thanks"),
      tooLong: pollText("tooLong"),
      emptyText: pollText("emptyText"),
      error: pollText("error"),
      sourceLabel: pollText("sourceLabel"),
      sourceHref: ep.sourceHref,
    },
    view: {
      date: e.view.date,
      when: ls(e.view.when, t.view.when),
      label: ls(e.view.label, t.view.label),
      paragraphs: texts(e.view.paragraphs, t.view.paragraphs),
    },
    service: {
      label: ls(e.service.label, t.service.label),
      heading: ls(e.service.heading, t.service.heading),
      body: lt(e.service.body, t.service.body),
      ctaLabel: ls(e.service.ctaLabel, t.service.ctaLabel),
      service: e.service.service,
    },
  };
}

/** Nº 02 Nuri. Belge v2'den beri `coming` olarak duruyordu; aynı belge dolduruluyor. */
function nuriPatch() {
  const card = [sparkCard(home.en, "Nº 02"), sparkCard(home.tr, "Nº 02")];
  const status = publishNuri
    ? { status: "published" }
    : previewNuri
      ? { status: "coming", previewLive: true }
      : {};
  return {
    id: "sparkEpisode-the-last-day-02",
    set: {
      ...decisionSet(nuri.en, nuri.tr),
      ...status,
      number: 2,
      slug: { _type: "localeSlug", en: { _type: "slug", current: "02-nuri" }, tr: { _type: "slug", current: "02-nuri" } },
      city: "Berlin",
      country: "Germany",
      launchDate: "2015-10-01",
      launchPrecision: "month",
      closureDate: "2022-12-18",
      durationLabel: ls("7 years", "7 yıl"),
      publishedAt: NURI_PUBLISHED,
      lastCheckedAt: "2026-09-28",
      cardLine: lt(card[0].line, card[1].line),
    },
    unset: publishNuri ? ["previewLive"] : [],
  };
}

/** Nº 03 Fidor. Belge yoksa önizleme durumunda oluşturulur: draft + previewLive. */
const FIDOR_ID = "sparkEpisode-the-last-day-03";

function fidorStub(): SanityDocumentStub & { _id: string } {
  return {
    _id: FIDOR_ID,
    _type: "sparkEpisode",
    format: { _type: "reference", _ref: FORMAT_IDS[0] },
    number: 3,
    layout: "story",
    status: "draft",
    previewLive: true,
  };
}

function fidorPatch() {
  return {
    id: FIDOR_ID,
    set: {
      ...storySet(fidor.en, fidor.tr),
      ...(publishFidor ? { status: "published" } : {}),
      number: 3,
      layout: "story",
      slug: { _type: "localeSlug", en: { _type: "slug", current: "03-fidor" }, tr: { _type: "slug", current: "03-fidor" } },
      city: "Munich",
      country: "Germany",
      launchDate: "2016-07-28",
      launchPrecision: "day",
      closureDate: "2023-02-16",
      publishedAt: FIDOR_PUBLISHED,
    },
    unset: publishFidor ? ["previewLive"] : [],
  };
}

/**
 * Sektör raporları Nº 01 Bauspar: ayrı belge, önizlemede draft + previewLive.
 * v2'den kalan `coming` belgesine dokunulmuyor: canlıdaki "In preparation"
 * satırı yayına kadar aynen kalıyor (staging'de aynı numaralı yayındaki
 * sayı onu listede gizler). --publish-bauspar onu siler.
 */
const BAUSPAR_ID = "sparkEpisode-sector-reports-bauspar";
/** v2'den kalan "Nº 01 In preparation" belgesi: canlı format sayfasındaki sırada satırı. Yayında silinir. */
const BAUSPAR_COMING_ID = "sparkEpisode-sector-reports-01";

/** Raporun gövdesi: sayı, konu, kanca ve SEO belgenin kendi alanlarında, gerisi dil başına JSON. */
function reportBodyJson(report: SparkReport) {
  const own = ["number", "subject", "hook", "seo"];
  return JSON.stringify(Object.fromEntries(Object.entries(report).filter(([key]) => !own.includes(key))));
}

function bausparPatch() {
  const card = [sparkCard(home.en, "Nº 01", "Sector report"), sparkCard(home.tr, "Nº 01", "Sektör raporu")];
  const e = bauspar.en;
  const t = bauspar.tr;
  return {
    id: BAUSPAR_ID,
    set: {
      layout: "report",
      number: e.number,
      subject: ls(e.subject, t.subject),
      hook: lt(e.hook, t.hook),
      seo: seo(e.seo, t.seo),
      reportBody: { en: reportBodyJson(e), tr: reportBodyJson(t) },
      status: publishBauspar ? "published" : "draft",
      slug: { _type: "localeSlug", en: { _type: "slug", current: "bauspar" }, tr: { _type: "slug", current: "bauspar" } },
      publishedAt: BAUSPAR_PUBLISHED,
      lastCheckedAt: BAUSPAR_PUBLISHED,
      cardLine: lt(card[0].line, card[1].line),
      ...(publishBauspar ? {} : { previewLive: true }),
    },
    unset: publishBauspar ? ["previewLive"] : [],
  };
}
// Sektör raporları formatı Bauspar ile canlı oluyor (preparing yerine live, açma linki); --only=bauspar bunu da yazar.

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
  const sparkPatches = [sparkSectionPatch(), ...formatSets(), boPatch(), nuriPatch(), fidorPatch(), bausparPatch()];
  const only = onlyFidor || onlyBauspar;
  const creates = only
    ? []
    : onlySpark
      ? comingEpisodeDocs()
      : [homeDoc(), servicesPageDoc(), ...servicePageDocs(), workPageDoc(), aboutDoc(), ...comingEpisodeDocs()];
  const patches: { id: string; set: Record<string, unknown>; unset?: string[] }[] = only
    ? [...(onlyFidor ? [fidorPatch()] : []), ...(onlyBauspar ? [{ ...formatSets()[1], unset: ["preparingLine"] }, bausparPatch()] : [])]
    : onlySpark
    ? sparkPatches
    : [
        { id: "siteSettings", set: siteSettingsPatch(), unset: ["subpageCta", "footer.tagline", "footer.nine", "footer.signature", "footer.nav", "footer.legal"] },
        ...casePatches(),
        ...sparkPatches,
        ...legalPatches(),
      ];

  // Sector reports formatı yoksa önce boş olarak oluşturuluyor, sonra patch'le dolduruluyor.
  const existingFormats = await client.fetch<string[]>(`*[_type == "sparkFormat"]._id`);

  if (dry) {
    console.log("createOrReplace:", creates.map((d) => d._id).join(", "));
    console.log("patch:", patches.map((p) => p.id).join(", "));
    console.log("missing formats:", FORMAT_IDS.filter((id) => !existingFormats.includes(id)).join(", ") || "none");
    if (!onlySpark && !only) console.log(await uploadLogo());
    return;
  }

  const tx = client.transaction();
  tx.createIfNotExists(fidorStub());
  tx.createIfNotExists({ _id: BAUSPAR_ID, _type: "sparkEpisode", format: { _type: "reference", _ref: FORMAT_IDS[1] }, number: 1, status: "draft", previewLive: true });
  for (const id of FORMAT_IDS.filter((id) => !existingFormats.includes(id))) {
    tx.createIfNotExists({ _id: id, _type: "sparkFormat" });
  }
  for (const doc of creates) tx.createOrReplace(doc as SanityDocumentStub & { _id: string });
  // Yayında v2'den kalan "sırada" belgesi gider (src/content/spark.ts'teki comingIssues de boşaltılır).
  if (publishBauspar) tx.delete(BAUSPAR_COMING_ID);
  for (const p of patches) {
    tx.patch(p.id, (patch) => {
      let next = patch.set(p.set);
      if (p.unset?.length) next = next.unset(p.unset);
      return next;
    });
  }
  const result = await tx.commit();
  console.log(`committed ${result.results.length} mutations`);
  if (!onlySpark && !only) console.log((await uploadLogo()) ?? "logo already current");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
