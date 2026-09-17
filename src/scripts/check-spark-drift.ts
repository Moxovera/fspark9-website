/**
 * Sürüklenme kontrolü — Spark bölümü.
 *
 * Revizyon v2 brief §6: "en.ts/tr.ts updated in the same commit with a
 * drift check across every field." seed-spark.ts artık content/en.ts
 * ve content/tr.ts'teki `sparkCopy` sabitlerini Sanity'ye yazıyor
 * (bkz. o dosyanın başlık yorumu). Bu script tersini yapar: Sanity'de
 * YAYINDA olan (perspective: published) içeriği canlı okur ve aynı
 * `sparkCopy` sabitleriyle alan alan karşılaştırır.
 *
 * Yakaladığı durum: birinin Sanity Studio'dan bu alanlardan birini
 * elle değiştirip content/en.ts + tr.ts'i güncellemeyi unutması —
 * seed script'i tekrar çalıştırmadığı sürece hiçbir tip hatası ya da
 * build hatası bunu yakalamaz, ikisi de geçerli TypeScript/GROQ'tur.
 *
 * Çalıştırma:
 *   npm run check:spark-drift
 *
 * Sıfır olmayan exit code ile biter ve fark bulunan her alanı
 * (Sanity'deki ve content/*.ts'teki iki değeri de basarak) listeler.
 */
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../sanity/env";
import { sparkCopy as sparkCopyEn } from "../content/en";
import { sparkCopy as sparkCopyTr } from "../content/tr";

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" });

const DRIFT_QUERY = /* groq */ `{
  "section": *[_id == "sparkSection"][0]{
    "eyebrowEn": hero.eyebrow.en, "eyebrowTr": hero.eyebrow.tr,
    "titleEn": hero.title.en, "titleTr": hero.title.tr,
    "purposeLineEn": hero.intro.en, "purposeLineTr": hero.intro.tr,
  },
  "format": *[_id == "sparkFormat-the-last-day"][0]{
    "nameEn": name.en, "nameTr": name.tr,
    "subjectLineEn": subjectLine.en, "subjectLineTr": subjectLine.tr,
    "whatIsInsideEn": whatIsInside.en, "whatIsInsideTr": whatIsInside.tr,
    "statusLineSingularEn": statusLineSingular.en, "statusLineSingularTr": statusLineSingular.tr,
    "statusLinePluralEn": statusLinePlural.en, "statusLinePluralTr": statusLinePlural.tr,
    "heroEyebrowEn": hero.eyebrow.en, "heroEyebrowTr": hero.eyebrow.tr,
    "heroTitleEn": hero.title.en, "heroTitleTr": hero.title.tr,
    "heroIntroEn": hero.intro.en, "heroIntroTr": hero.intro.tr,
    "hookLabelEn": hookLabel.en, "hookLabelTr": hookLabel.tr,
  },
  "episode": *[_id == "sparkEpisode-01-bo"][0]{
    "hookEn": hook.en, "hookTr": hook.tr,
  }
}`;

interface DriftResult {
  section: {
    eyebrowEn: string | null; eyebrowTr: string | null;
    titleEn: string | null; titleTr: string | null;
    purposeLineEn: string | null; purposeLineTr: string | null;
  } | null;
  format: {
    nameEn: string | null; nameTr: string | null;
    subjectLineEn: string | null; subjectLineTr: string | null;
    whatIsInsideEn: string | null; whatIsInsideTr: string | null;
    statusLineSingularEn: string | null; statusLineSingularTr: string | null;
    statusLinePluralEn: string | null; statusLinePluralTr: string | null;
    heroEyebrowEn: string | null; heroEyebrowTr: string | null;
    heroTitleEn: string | null; heroTitleTr: string | null;
    heroIntroEn: string | null; heroIntroTr: string | null;
    hookLabelEn: string | null; hookLabelTr: string | null;
  } | null;
  episode: { hookEn: string | null; hookTr: string | null } | null;
}

interface FieldCheck {
  label: string;
  live: string | null | undefined;
  expected: string;
}

function check(label: string, live: string | null | undefined, expected: string): FieldCheck {
  return { label, live, expected };
}

async function main() {
  const result = await client.fetch<DriftResult>(DRIFT_QUERY);

  const checks: FieldCheck[] = [
    // sparkSection
    check("sparkSection.hero.eyebrow (en)", result.section?.eyebrowEn, sparkCopyEn.hub.eyebrow),
    check("sparkSection.hero.eyebrow (tr)", result.section?.eyebrowTr, sparkCopyTr.hub.eyebrow),
    check("sparkSection.hero.title (en)", result.section?.titleEn, sparkCopyEn.hub.title),
    check("sparkSection.hero.title (tr)", result.section?.titleTr, sparkCopyTr.hub.title),
    check("sparkSection.hero.intro (en)", result.section?.purposeLineEn, sparkCopyEn.hub.purposeLine),
    check("sparkSection.hero.intro (tr)", result.section?.purposeLineTr, sparkCopyTr.hub.purposeLine),
    // sparkFormat-the-last-day
    check("sparkFormat.name (en)", result.format?.nameEn, sparkCopyEn.formatOne.name),
    check("sparkFormat.name (tr)", result.format?.nameTr, sparkCopyTr.formatOne.name),
    check("sparkFormat.subjectLine (en)", result.format?.subjectLineEn, sparkCopyEn.formatOne.subjectLine),
    check("sparkFormat.subjectLine (tr)", result.format?.subjectLineTr, sparkCopyTr.formatOne.subjectLine),
    check("sparkFormat.whatIsInside (en)", result.format?.whatIsInsideEn, sparkCopyEn.formatOne.whatIsInside),
    check("sparkFormat.whatIsInside (tr)", result.format?.whatIsInsideTr, sparkCopyTr.formatOne.whatIsInside),
    check(
      "sparkFormat.statusLineSingular (en)",
      result.format?.statusLineSingularEn,
      sparkCopyEn.formatOne.statusLineSingular,
    ),
    check(
      "sparkFormat.statusLineSingular (tr)",
      result.format?.statusLineSingularTr,
      sparkCopyTr.formatOne.statusLineSingular,
    ),
    check(
      "sparkFormat.statusLinePlural (en)",
      result.format?.statusLinePluralEn,
      sparkCopyEn.formatOne.statusLinePlural,
    ),
    check(
      "sparkFormat.statusLinePlural (tr)",
      result.format?.statusLinePluralTr,
      sparkCopyTr.formatOne.statusLinePlural,
    ),
    check("sparkFormat.hero.eyebrow (en)", result.format?.heroEyebrowEn, sparkCopyEn.hub.title),
    check("sparkFormat.hero.eyebrow (tr)", result.format?.heroEyebrowTr, sparkCopyTr.hub.title),
    check("sparkFormat.hero.title (en)", result.format?.heroTitleEn, sparkCopyEn.formatOne.name),
    check("sparkFormat.hero.title (tr)", result.format?.heroTitleTr, sparkCopyTr.formatOne.name),
    check("sparkFormat.hero.intro (en)", result.format?.heroIntroEn, sparkCopyEn.lastDayList.purposeLine),
    check("sparkFormat.hero.intro (tr)", result.format?.heroIntroTr, sparkCopyTr.lastDayList.purposeLine),
    check("sparkFormat.hookLabel (en)", result.format?.hookLabelEn, sparkCopyEn.lastDayList.readLink),
    check("sparkFormat.hookLabel (tr)", result.format?.hookLabelTr, sparkCopyTr.lastDayList.readLink),
    // sparkEpisode-01-bo
    check("sparkEpisode.hook (en)", result.episode?.hookEn, sparkCopyEn.lastDayList.episodeOneHook),
    check("sparkEpisode.hook (tr)", result.episode?.hookTr, sparkCopyTr.lastDayList.episodeOneHook),
  ];

  const mismatches = checks.filter((c) => c.live !== c.expected);

  if (mismatches.length === 0) {
    console.log(`No drift. ${checks.length} fields checked, all match content/en.ts + content/tr.ts.`);
    return;
  }

  console.error(`Drift found in ${mismatches.length} of ${checks.length} fields:\n`);
  for (const m of mismatches) {
    console.error(`  ${m.label}`);
    console.error(`    sanity:  ${m.live === undefined || m.live === null ? "(missing)" : JSON.stringify(m.live)}`);
    console.error(`    content: ${JSON.stringify(m.expected)}\n`);
  }
  console.error("Run SANITY_API_WRITE_TOKEN=... npm run seed:spark to resync, or update content/en.ts + tr.ts.");
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
