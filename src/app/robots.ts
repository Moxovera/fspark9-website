import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// /locked BİLEREK disallow listesine girmiyor — next.config.ts headers()
// yorumuyla aynı gerekçe: bir disallow satırı, aksi halde crawler'ın
// bilmediği gizli path'i ilan eder. Erişim zaten X-Robots-Tag header'ı
// ve sayfa seviyesi `noIndex` ile engelleniyor. /studio (Sanity CMS)
// herkese açık bir içerik değil, o yüzden burada engellendi.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
