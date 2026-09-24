import { renderOgImage } from "./render";

// /og ve /og?locale=tr: site geneli OG görseli. `npm run upload-og-image`
// iki dilin görselini üretip siteSettings.seo.ogImage / ogImageTr'ye yüklüyor.
export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get("locale") === "tr" ? "tr" : "en";
  return renderOgImage(locale);
}
