import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { epilogue, hanken, splineMono } from "@/lib/fonts";
import { toMetadata } from "@/lib/metadata";
import { GOOGLE_SITE_VERIFICATION, SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import MobileBookingBar from "@/components/chrome/MobileBookingBar";
import BookingProvider from "@/components/booking/BookingProvider";
import BookingOverlay from "@/components/booking/BookingOverlay";
import { SparkAltSlugProvider } from "@/components/chrome/SparkAltSlugContext";
import { MobileMenuProvider } from "@/components/chrome/MobileMenuContext";
import { getChrome } from "@/sanity/lib/content";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SITE_SEO_QUERY, SITE_LOGO_QUERY, toSiteSeo, toSiteLogo } from "@/sanity/lib/queries";
import type { SITE_SEO_QUERYResult, SITE_LOGO_QUERYResult } from "@/sanity/types";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoResult = await sanityFetch<SITE_SEO_QUERYResult>({
    query: SITE_SEO_QUERY,
    params: { locale },
    tags: ["siteSettings"],
  });
  const seo = toSiteSeo(seoResult);
  const paths = { en: getPathname({ href: "/", locale: "en" }), tr: getPathname({ href: "/", locale: "tr" }) };
  const metadata = toMetadata(seo, seo, locale, paths);

  return {
    ...metadata,
    verification: {
      ...metadata.verification,
      google: GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Statik render için (next-intl): locale headers()'tan değil buradan.
  setRequestLocale(locale);

  // Çerçeve (header, menü, footer, randevu penceresi) siteSettings ve
  // servicePage belgelerinden.
  const [site, logoResult] = await Promise.all([
    getChrome(),
    sanityFetch<SITE_LOGO_QUERYResult>({
      query: SITE_LOGO_QUERY,
      tags: ["siteSettings"],
    }),
  ]);
  const { chrome, services, calLink } = site[locale];
  const logo = toSiteLogo(logoResult);

  // Site kimliği için Organization JSON-LD — SEO'nun beklediği tek
  // yapılandırılmış veri parçası (rich result garanti etmez, ama arama
  // motoruna marka adını, logoyu ve iletişim noktasını netleştirir).
  // siteSettings'ten (nav/footer sorgularıyla zaten çekilen email/logo)
  // besleniyor, metin gömülmüyor.
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "fspark9",
    url: SITE_URL,
    logo: logo?.url ?? `${SITE_URL}/assets/brand/fspark9-icon-512.png`,
    email: chrome.footer.email,
    sameAs: [chrome.footer.linkedinHref],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* CLAUDE.md: scroll reveal — JS açıksa .js sınıfı eklenir,
            CSS bu sınıfa göre gizleme/animasyon uygular. Bloklayıcı
            olması gerekiyor: içerik boyanmadan önce çalışmalı. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${epilogue.variable} ${hanken.variable} ${splineMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider>
          <SparkAltSlugProvider>
            <BookingProvider>
              <MobileMenuProvider>
                <Header chrome={chrome} services={services} locale={locale} />
                {children}
                <Footer chrome={chrome} />
                <MobileBookingBar label={chrome.bookLabel} />
                <BookingOverlay calLink={calLink} labels={chrome.booking} />
              </MobileMenuProvider>
            </BookingProvider>
          </SparkAltSlugProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
