/**
 * Tek seferlik script.
 *
 * _design/assets/lockup-reversed.svg dosyasını (finalize edilmiş site
 * logosu — Header/Footer'ın navy zemin üzerinde kullandığı reversed
 * lockup, dc.html'deki aynı asset) Sanity'ye image asset olarak
 * yükler ve siteSettings.logo alanına bağlar.
 *
 * seed-content.ts bu alana DOKUNMAZ (bkz. o dosyadaki existingLogo
 * notu) — bu script tekrar çalıştırılana kadar logo burada kalır.
 *
 * Çalıştırma:
 *   SANITY_API_WRITE_TOKEN=... npm run upload-logo
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../sanity/env";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Create a token with Editor access in " +
      "sanity.io/manage → API → Tokens, then run again with " +
      "SANITY_API_WRITE_TOKEN=... npm run upload-logo",
  );
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

const LOGO_PATH = resolve(__dirname, "../../_design/assets/lockup-reversed.svg");

async function main() {
  const file = readFileSync(LOGO_PATH);

  const asset = await client.assets.upload("image", file, {
    filename: "lockup-reversed.svg",
    contentType: "image/svg+xml",
  });

  const siteSettingsId =
    (await client.fetch<string | null>(`*[_type == "siteSettings"][0]._id`)) ?? "siteSettings";

  const result = await client
    .patch(siteSettingsId)
    .set({
      logo: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: "fspark9",
      },
    })
    .commit();

  console.log(`Asset uploaded: ${asset._id} (${asset.metadata?.dimensions?.width}x${asset.metadata?.dimensions?.height})`);
  console.log(`siteSettings.logo set on ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
