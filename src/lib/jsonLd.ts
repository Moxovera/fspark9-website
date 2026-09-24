import { SITE_URL } from "@/lib/site";
import type { HomeContent, Locale, SiteChrome } from "@/types/content";

// JSON-LD (brief v4 §11, copy §6c). Her alan sitede zaten görünen
// içerikten türetiliyor, burada ikinci kez metin yazılmıyor.
// Organization layout'ta; bu dosya sayfa bazındaki parçaları kuruyor.

type JsonLdObject = Record<string, unknown>;

const ORGANIZATION_REF = { "@type": "Organization", name: "fspark9", url: SITE_URL };

function absolute(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** Kişi bilgisi ana sayfanın etiket satırından (ad, alan, şehir) ve footer'daki LinkedIn'den. */
export interface PersonInfo {
  name: string;
  jobTitle: string;
  city: string;
  linkedin: string;
}

export function personInfo(home: HomeContent, chrome: SiteChrome): PersonInfo {
  const [name = "", jobTitle = "", city = ""] = home.opening.eyebrowParts;
  return { name, jobTitle, city, linkedin: chrome.footer.linkedinHref };
}

function person(info: PersonInfo): JsonLdObject {
  return {
    "@type": "Person",
    name: info.name,
    jobTitle: info.jobTitle,
    worksFor: ORGANIZATION_REF,
    sameAs: [info.linkedin],
    address: { "@type": "PostalAddress", addressLocality: info.city },
  };
}

/** Home › ... Ana sayfa adımı (yasal sayfaların geri linki "Home") her zaman ekleniyor. */
export function breadcrumbJsonLd(
  locale: Locale,
  chrome: SiteChrome,
  trail: { name: string; path: string }[],
): JsonLdObject {
  const items = [{ name: chrome.legal.backLabel, path: locale === "tr" ? "/tr" : "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function personJsonLd(info: PersonInfo, path: string): JsonLdObject {
  return { "@context": "https://schema.org", ...person(info), url: absolute(path) };
}

export function serviceJsonLd(name: string, description: string, path: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absolute(path),
    provider: ORGANIZATION_REF,
    areaServed: [
      { "@type": "Place", name: "Europe" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Türkiye" },
    ],
  };
}

export function articleJsonLd(
  locale: Locale,
  author: PersonInfo,
  article: {
    headline: string;
    description: string;
    path: string;
    about?: string;
    datePublished?: string | null;
    dateModified?: string | null;
    isPartOf?: string;
  },
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    url: absolute(article.path),
    mainEntityOfPage: absolute(article.path),
    inLanguage: locale,
    author: person(author),
    publisher: { ...ORGANIZATION_REF, logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/brand/fspark9-icon-512.png` } },
    ...(article.about ? { about: { "@type": "Organization", name: article.about } } : {}),
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    ...(article.dateModified ? { dateModified: article.dateModified } : {}),
    ...(article.isPartOf ? { isPartOf: { "@type": "CreativeWorkSeries", name: article.isPartOf } } : {}),
  };
}
