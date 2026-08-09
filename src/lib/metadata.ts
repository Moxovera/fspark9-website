import type { Metadata } from "next";
import type { PageSeo } from "@/types/content";

// generateMetadata'daki tekrarlanan mantık. title/description için
// siteSeo'ya düşme YOK (kasıtlı) — her sayfanın kendi başlığı zaten
// var, siteSettings'inkiyle karışması istenmiyor. ogImage için VAR:
// sayfanın kendi seo.ogImage'ı boşsa siteSettings.seo.ogImage
// kullanılır, böylece tek bir varsayılan OG görseli tüm sayfalara
// otomatik uygulanır, her sayfaya ayrı yüklemek zorunlu olmaz.
export function toMetadata(pageSeo: PageSeo, siteSeo: PageSeo): Metadata {
  const ogImage = pageSeo.ogImage ?? siteSeo.ogImage;
  return {
    title: pageSeo.title || "fspark9",
    description: pageSeo.description || "Trust isn't marketed. It's built.",
    ...(pageSeo.noIndex ? { robots: { index: false } } : {}),
    ...(ogImage?.url ? { openGraph: { images: [{ url: ogImage.url, alt: ogImage.alt }] } } : {}),
  };
}
