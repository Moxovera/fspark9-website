/**
 * Tek seferlik script.
 *
 * src/app/og/route.tsx (renderOgImage() — Playfair Display "fspark9" +
 * bronz çizgi + Inter tagline, brandbook tokenlarıyla, 1200x630) bir
 * Next.js sunucusundan HTTP ile çeker, Sanity'ye image asset olarak
 * yükler ve siteSettings.seo.ogImage alanına bağlar.
 *
 * renderOgImage() burada doğrudan import edilip çağrılmıyor —
 * ImageResponse'un JSX'i sadece Next'in kendi derleme hattında (jsx
 * runtime'ı otomatik enjekte ediliyor) güvenilir çalışıyor, bağımsız
 * bir tsx script'inde "React is not defined" hatası veriyor. Bu yüzden
 * önce bir Next.js sunucusu (dev ya da build+start) çalışıyor olmalı;
 * script /og route'unu HTTP ile çekiyor.
 *
 * seed-content.ts bu alana DOKUNMAZ (bkz. o dosyadaki
 * existingSeoOgImage notu) — bu script tekrar çalıştırılana kadar
 * görsel burada kalır.
 *
 * Çalıştırma:
 *   npm run dev                                    (ayrı terminalde)
 *   SANITY_API_WRITE_TOKEN=... npm run upload-og-image
 *   # farklı bir host/port ya da production build ise:
 *   SANITY_API_WRITE_TOKEN=... OG_IMAGE_URL=http://localhost:3000/og npm run upload-og-image
 */
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../sanity/env";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Create a token with Editor access in " +
      "sanity.io/manage → API → Tokens, then run again with " +
      "SANITY_API_WRITE_TOKEN=... npm run upload-og-image",
  );
}

const ogImageUrl = process.env.OG_IMAGE_URL ?? "http://localhost:3000/og";

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token });

async function main() {
  const response = await fetch(ogImageUrl);
  if (!response.ok) {
    throw new Error(
      `Could not fetch ${ogImageUrl} (HTTP ${response.status}). Is a Next.js server running? ` +
        "Start one with npm run dev, or point OG_IMAGE_URL at a running instance.",
    );
  }
  const buffer = Buffer.from(await response.arrayBuffer());

  const asset = await client.assets.upload("image", buffer, {
    filename: "og-image.png",
    contentType: "image/png",
  });

  const siteSettingsId =
    (await client.fetch<string | null>(`*[_type == "siteSettings"][0]._id`)) ?? "siteSettings";

  const result = await client
    .patch(siteSettingsId)
    .set({
      "seo.ogImage": {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: "fspark9 — Trust isn't marketed. It's built.",
      },
    })
    .commit();

  console.log(
    `Asset uploaded: ${asset._id} (${asset.metadata?.dimensions?.width}x${asset.metadata?.dimensions?.height})`,
  );
  console.log(`siteSettings.seo.ogImage set on ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
