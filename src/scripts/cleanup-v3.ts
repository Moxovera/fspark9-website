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
 * Eski alanlar (caseStudy, sparkFormat, siteSettings) seed-v3 tarafından
 * zaten siliniyor; burada ayrıca kalan var mı diye kontrol edilir.
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
  sparkFormat: ["subjectLine", "whatIsInside", "statusLineSingular", "statusLinePlural", "hookLabel", "hero"],
  sparkSection: ["hero", "homeLinkLabel", "comingSoonLabel"],
  siteSettings: ["subpageCta"],
};

async function main() {
  const stale = await client.fetch<{ _id: string; _type: string }[]>(
    `*[!(_type match "system.*") && !(_type match "sanity.*") && (!(_type in $types) || (_type == "homePage" && !(_id in ["homePage", "drafts.homePage"])))]{ _id, _type }`,
    { types: documentTypes },
  );
  console.log(`Documents to delete (${stale.length}):`);
  for (const doc of stale) console.log(`  ${doc._type}  ${doc._id}`);

  for (const [type, fields] of Object.entries(OLD_FIELDS)) {
    const docs = await client.fetch<Record<string, unknown>[]>(`*[_type == $type]`, { type });
    for (const doc of docs) {
      const left = fields.filter((f) => f in doc);
      if (left.length) console.log(`  leftover fields on ${String(doc._id)}: ${left.join(", ")}`);
    }
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
