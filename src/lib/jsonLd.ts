import { SITE_URL } from "@/lib/site";
import { chrome } from "@/content/chrome";
import { home } from "@/content/home";
import type { Locale } from "@/types/content";

// JSON-LD (brief v4 §11, copy §6c). Her alan sitede zaten görünen
// içerikten türetiliyor, burada ikinci kez metin yazılmıyor.
// Organization layout'ta; bu dosya sayfa bazındaki parçaları kuruyor.

type JsonLdObject = Record<string, unknown>;

const ORGANIZATION_REF = { "@type": "Organization", name: "fspark9", url: SITE_URL };

function absolute(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

function person(locale: Locale): JsonLdObject {
  const [name, jobTitle, city] = home[locale].opening.eyebrowParts;
  return {
    "@type": "Person",
    name,
    jobTitle,
    worksFor: ORGANIZATION_REF,
    sameAs: [chrome[locale].footer.linkedinHref],
    address: { "@type": "PostalAddress", addressLocality: city },
  };
}

/** Home › ... Ana sayfa adımı her zaman ekleniyor; `trail` onun ardından. */
export function breadcrumbJsonLd(locale: Locale, trail: { name: string; path: string }[]): JsonLdObject {
  const items = [{ name: chrome[locale].legal.backLabel, path: locale === "tr" ? "/tr" : "/" }, ...trail];
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

export function personJsonLd(locale: Locale, path: string): JsonLdObject {
  return { "@context": "https://schema.org", ...person(locale), url: absolute(path) };
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
    author: person(locale),
    publisher: { ...ORGANIZATION_REF, logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/brand/fspark9-icon-512.png` } },
    ...(article.about ? { about: { "@type": "Organization", name: article.about } } : {}),
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    ...(article.dateModified ? { dateModified: article.dateModified } : {}),
    ...(article.isPartOf ? { isPartOf: { "@type": "CreativeWorkSeries", name: article.isPartOf } } : {}),
  };
}
