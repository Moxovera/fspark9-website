import type { Metadata } from "next";
import type { PageSeo } from "@/types/content";
import { SITE_URL } from "@/lib/site";

const DEFAULT_TITLE = "fspark9";
const DEFAULT_DESCRIPTION = "Trust isn't marketed. It's built.";

// Bir sayfanın iki locale'deki tam pathname'i — canonical (mevcut
// locale'inki) ve hreflang alternates (ikisi birden) bunlardan
// türetiliyor. Çağıran taraf next-intl'in getPathname()'iyle üretiyor,
// böylece routing.ts'teki TR çeviri haritasıyla (kullanim-sartlari,
// gizlilik, cerezler vb.) tek bir kaynaktan besleniyor.
type LocalizedPaths = { en: string; tr: string };

// generateMetadata'daki tekrarlanan mantık. title/description için
// siteSeo'ya düşme YOK (kasıtlı) — her sayfanın kendi başlığı zaten
// var, siteSettings'inkiyle karışması istenmiyor. ogImage için VAR:
// sayfanın kendi seo.ogImage'ı boşsa siteSettings.seo.ogImage
// kullanılır, böylece tek bir varsayılan OG görseli tüm sayfalara
// otomatik uygulanır, her sayfaya ayrı yüklemek zorunlu olmaz.
export function toMetadata(
  pageSeo: PageSeo,
  siteSeo: PageSeo,
  locale: string,
  paths?: LocalizedPaths,
): Metadata {
  const ogImage = pageSeo.ogImage ?? siteSeo.ogImage;
  const title = pageSeo.title || DEFAULT_TITLE;
  const description = pageSeo.description || DEFAULT_DESCRIPTION;
  const canonicalPath = paths ? (locale === "tr" ? paths.tr : paths.en) : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    ...(pageSeo.noIndex ? { robots: { index: false, follow: false } } : {}),
    ...(paths
      ? {
          alternates: {
            canonical: canonicalPath,
            languages: {
              en: paths.en,
              tr: paths.tr,
              "x-default": paths.en,
            },
          },
        }
      : {}),
    ...(ogImage?.url
      ? {
          openGraph: {
            title,
            description,
            ...(canonicalPath ? { url: canonicalPath } : {}),
            siteName: "fspark9",
            type: "website",
            locale: locale === "tr" ? "tr_TR" : "en_US",
            images: [{ url: ogImage.url, alt: ogImage.alt }],
          },
          twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage.url],
          },
        }
      : {}),
  };
}
