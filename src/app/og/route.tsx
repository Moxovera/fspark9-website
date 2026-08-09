import { renderOgImage } from "./render";

// Sitenin canlı OG görsel kaynağı BU ROUTE DEĞİL —
// siteSettings.seo.ogImage (Sanity), generateMetadata'larda okunuyor.
// Bu route render mantığını kod içinde, versiyonlanmış halde tutmak ve
// gerektiğinde (rebrand vb.) görseli yeniden üretmek için var — bkz.
// src/scripts/upload-og-image.ts, aynı renderOgImage()'ı kullanıp
// sonucu Sanity'ye yükler.
export async function GET() {
  return renderOgImage();
}
