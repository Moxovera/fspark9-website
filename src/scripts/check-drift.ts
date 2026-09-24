/**
 * Drift kontrolü (brief v4 §6.5). Sitenin Sanity'den okuduğu içeriği,
 * sayfaların kullandığı aynı yükleyicilerle (src/sanity/lib/content.ts)
 * çeker ve src/content/*.ts'teki aynası ile alan alan karşılaştırır. Hem
 * veriyi hem eşleme kodunu doğrular.
 *
 * Kapsam: siteSettings (çerçeve, hizmet özetleri, Next step, calLink),
 * homePage, servicesPage, servicePage ×4, workPage, caseStudy ×2,
 * aboutPage, sparkSection, sparkFormat ×2, legalPage ×4 (metin ve SEO),
 * Bó'nun SEO'su.
 *
 * Sadece Sanity'de olanlar karşılaştırılmaz: görseller (vaka ekranları,
 * portre) ve bölüm blokları.
 *
 * Studio'da metin değiştirildiğinde bu kontrol farkı gösterir: ya
 * src/content güncellenir ya da fark bilinçli kabul edilir.
 *
 * Çalıştırma: npm run check:drift   (fark varsa exit code 1)
 */
import { chrome, nextStep, services } from "../content/chrome";
import { home } from "../content/home";
import { servicePages, servicesIndex } from "../content/services";
import { cases, workPage } from "../content/work";
import { about } from "../content/about";
import { spark } from "../content/spark";
import { episodeSeo, legalSeo } from "../content/seo";
import * as impressum from "../content/legal/impressum";
import * as privacy from "../content/legal/privacy";
import * as cookies from "../content/legal/cookies";
import * as terms from "../content/legal/terms";
import { getAbout, getCases, getChrome, getHome, getServicePages, getServicesIndex, getSparkHub, getWorkPage } from "../sanity/lib/content";
import { sanityFetch } from "../sanity/lib/fetch";
import {
  LEGAL_PAGE_QUERY,
  LEGAL_PAGE_SEO_QUERY,
  SPARK_EPISODE_SEO_QUERY,
  toLegalPage,
  toLegalPageSeo,
  toSparkEpisodeSeo,
} from "../sanity/lib/queries";
import type { LEGAL_PAGE_QUERYResult, LEGAL_PAGE_SEO_QUERYResult, SPARK_EPISODE_SEO_QUERYResult } from "../sanity/types";
import type { Locale } from "../types/content";

const LOCALES: Locale[] = ["en", "tr"];
const diffs: string[] = [];

/** undefined alanları atan, karşılaştırılabilir kopya. */
const normalize = (value: unknown): unknown => JSON.parse(JSON.stringify(value ?? null));

function compare(path: string, sanity: unknown, mirror: unknown) {
  const a = normalize(sanity);
  const b = normalize(mirror);
  if (Array.isArray(a) || Array.isArray(b)) {
    const la = Array.isArray(a) ? a : [];
    const lb = Array.isArray(b) ? b : [];
    if (la.length !== lb.length) diffs.push(`${path}: length ${la.length} (Sanity) vs ${lb.length} (src/content)`);
    for (let i = 0; i < Math.min(la.length, lb.length); i++) compare(`${path}[${i}]`, la[i], lb[i]);
    return;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) compare(`${path}.${k}`, (a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]);
    return;
  }
  if (a !== b) diffs.push(`${path}:\n    Sanity:      ${JSON.stringify(a)}\n    src/content: ${JSON.stringify(b)}`);
}

/** Sadece Sanity'de olan alanları (görseller) karşılaştırmadan çıkarır. */
function omit<T extends object>(value: T, ...keys: string[]): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([k]) => !keys.includes(k))) as Partial<T>;
}

async function main() {
  const [site, homeS, servicesIndexS, servicePagesS, workPageS, casesS, aboutS, sparkS] = await Promise.all([
    getChrome(),
    getHome(),
    getServicesIndex(),
    getServicePages(),
    getWorkPage(),
    getCases(),
    getAbout(),
    getSparkHub(),
  ]);

  for (const l of LOCALES) {
    compare(`chrome.${l}`, site[l].chrome, chrome[l]);
    compare(`services.${l}`, site[l].services, services[l]);
    compare(`nextStep.${l}`, site[l].nextStep, nextStep[l]);
    compare(`calLink`, site[l].calLink, "mburakdikmen/quick-chat");

    const h = homeS[l];
    compare(`home.${l}`, { ...h, opening: omit(h.opening, "portraitSrc"), withMe: omit(h.withMe, "portraitSrc"), work: { ...h.work, featured: omit(h.work.featured, "screens") } }, {
      ...home[l],
      work: { ...home[l].work, featured: omit(home[l].work.featured, "screens") },
    });

    compare(`servicesIndex.${l}`, servicesIndexS[l], servicesIndex[l]);
    compare(`servicePages.${l}`, servicePagesS[l], servicePages[l]);
    compare(`workPage.${l}`, workPageS[l], workPage[l]);
    compare(`cases.${l}`, casesS[l].map((c) => omit(c, "screens", "publishedAt", "modifiedAt")), cases[l]);
    compare(`about.${l}`, omit(aboutS[l], "portraitSrc"), about[l]);
    compare(`spark.${l}`, sparkS[l], spark[l]);
  }

  const legal = { impressum, privacy, cookies, terms } as const;
  for (const slug of Object.keys(legal) as (keyof typeof legal)[]) {
    for (const l of LOCALES) {
      const [page, seo] = await Promise.all([
        sanityFetch<LEGAL_PAGE_QUERYResult>({ query: LEGAL_PAGE_QUERY, params: { locale: l, slug } }),
        sanityFetch<LEGAL_PAGE_SEO_QUERYResult>({ query: LEGAL_PAGE_SEO_QUERY, params: { locale: l, slug } }),
      ]);
      compare(`legal.${slug}.${l}`, toLegalPage(page), legal[slug][l]);
      const { title, description } = toLegalPageSeo(seo);
      compare(`legal.${slug}.seo.${l}`, { title, description }, legalSeo[l][slug]);
    }
  }

  for (const l of LOCALES) {
    const formatSlug = spark[l].formats[0].slug;
    const result = await sanityFetch<SPARK_EPISODE_SEO_QUERYResult>({
      query: SPARK_EPISODE_SEO_QUERY,
      params: { locale: l, formatSlug, episodeSlug: "01-bo" },
    });
    const { title, description } = toSparkEpisodeSeo(result);
    compare(`episode.01-bo.seo.${l}`, { title, description }, episodeSeo[l]["01-bo"]);
  }

  if (diffs.length) {
    console.error(`${diffs.length} difference(s) between Sanity and src/content:\n`);
    for (const d of diffs) console.error(`  ${d}`);
    process.exit(1);
  }
  console.log("No drift: Sanity matches src/content field by field.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
