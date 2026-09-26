/**
 * v1'den kalanları Sanity'den siler (brief v4 §6.4). Hedef: Sanity'de
 * yalnızca sitenin gösterdiği içerik kalsın.
 *
 * Siler:
 *   1. Tipi artık şemada olmayan belgeler (storyPage) ve eski, rastgele
 *      id'li ana sayfa belgesi (yeni ana sayfa `homePage` id'sinde),
 *      taslakları dahil.
 *   2. Hiçbir belgenin referans vermediği görseller (eski logo, eski OG,
 *      vaka kapak ve logo görselleri).
 *
 *   3. Şemadan çıkmış eski alanlar (OLD_FIELDS). Son Gün v3'ün (2026-09-26)
 *      bıraktıkları dahil: Bó'nun blokları, eski format sütunları ve
 *      mekanik etiketleri, eski bölüm etiketleri. seed-v3 bunları canlıdaki
 *      eski kod okuyabilsin diye yerinde bırakıyor; yeni sayfalar main'e
 *      geçtikten SONRA bu script'le silinir.
 *
 * Çalıştırma:
 *   npm run cleanup:v3              (sadece listeler)
 *   npm run cleanup:v3 -- --confirm (siler)
 */
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../sanity/env";
import { schema } from "../sanity/schemaTypes";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN (.env.local).");

const confirm = process.argv.includes("--confirm");
const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false, perspective: "raw" });

const documentTypes = schema.types.filter((t) => t.type === "document").map((t) => t.name);

/** Alanlar seed-v3'te siliniyor; burada kalmışsa rapor edilir. */
const OLD_FIELDS: Record<string, string[]> = {
  caseStudy: ["location", "body", "coverImage", "problemHeading", "actionsHeading", "deliveredHeading", "detailEyebrow", "detailIntro", "logo"],
  sparkFormat: [
    "subjectLine", "whatIsInside", "statusLineSingular", "statusLinePlural", "hookLabel", "hero",
    // Son Gün v3
    "aboutLabel", "aboutLines", "showAllLabel", "columns", "showAllTemplate",
    "dayCountSingular", "dayCountPlural", "dayLabel", "dayNotEstablishedLabel", "noteLabel",
    "recordLabel", "readingLabel", "callLabel", "estimateLabel", "weighLabel", "signalLabel", "secondOpinionLabel",
    "allocationLabel", "callOptionRuleLabel", "callOptionDecisionLabel", "callMatchLabel", "callMismatchLabel",
    "callUnsettledLabel", "allocationCommitLabel", "scorecardHeading", "scorecardUnansweredLabel",
    "scorecardYourReadingLabel", "scorecardCrossEpisodeLabel", "scorecardShareLabel", "scorecardCopiedLabel",
    "scorecardPrivacyLine",
  ],
  sparkSection: [
    "hero", "homeLinkLabel", "comingSoonLabel",
    // Son Gün v3
    "episode.daysOpenLabel", "episode.daysOpenShortLabel", "episode.dateRangeTemplate", "episode.rulerLabel",
    "episode.afterClosureLabel", "episode.builtFromLabel", "episode.evidenceTakenLabel", "episode.lastCheckedLabel",
    "episode.clockDayLabel", "episode.clockOfTemplate", "episode.readingResultLabel", "episode.scorecardLabel",
    "episode.sourceLabel",
  ],
  sparkEpisode: ["blocks", "standfirst", "parent", "evidenceTakenAt"],
  siteSettings: ["subpageCta"],
};

/** "a.b" yolundaki alan belgede var mı. */
function has(doc: Record<string, unknown>, path: string): boolean {
  let value: unknown = doc;
  for (const part of path.split(".")) {
    if (!value || typeof value !== "object" || !(part in value)) return false;
    value = (value as Record<string, unknown>)[part];
  }
  return true;
}

async function main() {
  const stale = await client.fetch<{ _id: string; _type: string }[]>(
    `*[!(_type match "system.*") && !(_type match "sanity.*") && (!(_type in $types) || (_type == "homePage" && !(_id in ["homePage", "drafts.homePage"])))]{ _id, _type }`,
    { types: documentTypes },
  );
  console.log(`Documents to delete (${stale.length}):`);
  for (const doc of stale) console.log(`  ${doc._type}  ${doc._id}`);

  const leftovers: { id: string; fields: string[] }[] = [];
  for (const [type, fields] of Object.entries(OLD_FIELDS)) {
    const docs = await client.fetch<Record<string, unknown>[]>(`*[_type == $type]`, { type });
    for (const doc of docs) {
      const left = fields.filter((f) => has(doc, f));
      if (left.length) {
        leftovers.push({ id: String(doc._id), fields: left });
        console.log(`  leftover fields on ${String(doc._id)}: ${left.join(", ")}`);
      }
    }
  }
  if (confirm && leftovers.length) {
    const tx = client.transaction();
    for (const { id, fields } of leftovers) tx.patch(id, (patch) => patch.unset(fields));
    await tx.commit();
    console.log(`Unset old fields on ${leftovers.length} documents.`);
  }

  if (confirm && stale.length) {
    const tx = client.transaction();
    for (const doc of stale) tx.delete(doc._id);
    await tx.commit();
    console.log(`Deleted ${stale.length} documents.`);
  }

  const orphans = await client.fetch<{ _id: string; originalFilename: string | null; size: number }[]>(
    `*[_type == "sanity.imageAsset" && count(*[references(^._id)]) == 0]{ _id, originalFilename, size }`,
  );
  console.log(`Unreferenced image assets (${orphans.length})${confirm ? "" : ", counted before any document is deleted"}:`);
  for (const a of orphans) console.log(`  ${a._id}  ${a.originalFilename ?? ""}  ${Math.round(a.size / 1024)} KB`);

  if (confirm && orphans.length) {
    const tx = client.transaction();
    for (const a of orphans) tx.delete(a._id);
    await tx.commit();
    console.log(`Deleted ${orphans.length} assets.`);
  }

  if (!confirm) console.log("\nDry run. Run with --confirm to delete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
