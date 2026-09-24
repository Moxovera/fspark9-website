/**
 * Tek seferlik script.
 *
 * src/app/og/route.tsx (renderOgImage() — v2 marka: Ink zemin, Paper
 * wordmark, halka ve Flare dilim, ana sayfa başlığı, 1200x630) bir
 * Next.js sunucusundan HTTP ile çeker, Sanity'ye image asset olarak
 * yükler ve siteSettings.seo.ogImage alanına bağlar.
 *
 * renderOgImage() burada doğrudan import edilip çağrılmıyor —
 * ImageResponse'un JSX'i sadece Next'in kendi derleme hattında (jsx
 * runtime'ı otomatik enjekte ediliyor) güvenilir çalışıyor, bağımsız
 * bir tsx script'inde "React is not defined" hatası veriyor. Bu yüzden
 * önce bir Next.js sunucusu (dev ya da build+start) çalışıyor olmalı;
 * script /og ve /og?locale=tr route'larını HTTP ile çekiyor; EN görsel
 * seo.ogImage'a, TR görsel seo.ogImageTr'ye yazılıyor.
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

async function upload(locale: "en" | "tr") {
  const url = locale === "tr" ? `${ogImageUrl}?locale=tr` : ogImageUrl;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Could not fetch ${url} (HTTP ${response.status}). Is a Next.js server running? ` +
        "Start one with npm run dev, or point OG_IMAGE_URL at a running instance.",
    );
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  return client.assets.upload("image", buffer, { filename: `og-image-${locale}.png`, contentType: "image/png" });
}

async function main() {
  const [en, tr] = [await upload("en"), await upload("tr")];
  const image = (id: string, alt: string) => ({ _type: "image", asset: { _type: "reference", _ref: id }, alt });

  const result = await client
    .patch("siteSettings")
    .set({
      "seo.ogImage": image(en._id, "fspark9: I’ve built two digital banks. I’ll tell you what breaks first."),
      "seo.ogImageTr": image(tr._id, "fspark9: İki dijital banka kurdum. Önce neyin kırılacağını söylerim."),
    })
    .commit();

  console.log(`Uploaded ${en._id} (EN) and ${tr._id} (TR), set on ${result._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
