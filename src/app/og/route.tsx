import { renderOgImage } from "./render";

// /og ve /og?locale=tr: site geneli OG görseli. `npm run upload-og-image`
// bunu üretip Sanity siteSettings.seo.ogImage'a yüklüyor (canlıya çıkış günü).
export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get("locale") === "tr" ? "tr" : "en";
  return renderOgImage(locale);
}
