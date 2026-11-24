import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import LeadPageView from "@/components/lead/LeadPageView";
import { en, tr } from "@/content/uk-sme-lead";
import { getPathname } from "@/i18n/navigation";
import { LEAD_ASSET_VERSION } from "@/lib/lead";
import { SITE_URL } from "@/lib/site";
import { getChrome } from "@/sanity/lib/content";
import type { Locale } from "@/types/content";

// Lead sayfası: İngiltere KOBİ bankacılığı raporunun PDF'i (Spark Nº 06).
// EN /uk-sme, TR /tr/uk-sme. Çerçevesi yalın (ChromeGate): menü, randevu
// çubuğu ve bülten kutusu yok, footer sitedeki gibi. İndekslenir, sitemap'te.

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = locale === "tr" ? tr : en;
  const paths = { en: getPathname({ href: "/uk-sme", locale: "en" }), tr: getPathname({ href: "/uk-sme", locale: "tr" }) };
  const canonical = locale === "tr" ? paths.tr : paths.en;
  const image = { url: `/og/og-uk-sme-${locale === "tr" ? "tr" : "en"}.jpg?v=${LEAD_ASSET_VERSION}`, width: 1200, height: 630, alt: page.seo.ogImageAlt };

  return {
    metadataBase: new URL(SITE_URL),
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical, languages: { en: paths.en, tr: paths.tr, "x-default": paths.en } },
    openGraph: {
      title: page.seo.ogTitle,
      description: page.seo.ogDescription,
      url: canonical,
      siteName: "fspark9",
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: page.seo.ogTitle, description: page.seo.ogDescription, images: [image.url] },
  };
}

export default async function UkSmeLeadRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const active: Locale = locale === "tr" ? "tr" : "en";
  const chrome = (await getChrome())[active].chrome;

  return (
    <LeadPageView page={active === "tr" ? tr : en} locale={active} brandName={chrome.brandName} homeLabel={chrome.homeLabel} />
  );
}
