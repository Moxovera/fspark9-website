import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { fraunces, cabin, ibmPlexMono } from "@/lib/fonts";
import { toMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import MobileBookingBar from "@/components/chrome/MobileBookingBar";
import BookingProvider from "@/components/booking/BookingProvider";
import BookingOverlay from "@/components/booking/BookingOverlay";
import { SparkAltSlugProvider } from "@/components/chrome/SparkAltSlugContext";
import { siteSettings as enSiteSettings } from "@/content/en";
import { siteSettings as trSiteSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  SITE_NAV_QUERY,
  SITE_FOOTER_QUERY,
  SITE_SEO_QUERY,
  SITE_BOOKING_QUERY,
  SITE_LOGO_QUERY,
  toSiteNav,
  toFooter,
  toSiteSeo,
  toBookingSection,
  toSiteLogo,
} from "@/sanity/lib/queries";
import type {
  SITE_NAV_QUERYResult,
  SITE_FOOTER_QUERYResult,
  SITE_SEO_QUERYResult,
  SITE_BOOKING_QUERYResult,
  SITE_LOGO_QUERYResult,
} from "@/sanity/types";
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
      google: "Q0aqMhmoUFw2Uu97Q40akGlm1utCKdpNPq1Lwe4UQSw",
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

  const staticSettings = locale === "tr" ? trSiteSettings : enSiteSettings;

  const [navResult, footerResult, bookingResult, logoResult] = await Promise.all([
    sanityFetch<SITE_NAV_QUERYResult>({
      query: SITE_NAV_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
    sanityFetch<SITE_FOOTER_QUERYResult>({
      query: SITE_FOOTER_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
    sanityFetch<SITE_BOOKING_QUERYResult>({
      query: SITE_BOOKING_QUERY,
      params: { locale },
      tags: ["siteSettings"],
    }),
    sanityFetch<SITE_LOGO_QUERYResult>({
      query: SITE_LOGO_QUERY,
      tags: ["siteSettings"],
    }),
  ]);
  const settings = {
    ...staticSettings,
    nav: toSiteNav(navResult),
    footer: toFooter(footerResult),
    booking: toBookingSection(bookingResult),
    logo: toSiteLogo(logoResult),
  };

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
    logo: settings.logo?.url ?? `${SITE_URL}/assets/lockup-reversed.svg`,
    ...(settings.footer.email ? { email: settings.footer.email } : {}),
    ...(settings.footer.linkedin ? { sameAs: [settings.footer.linkedin] } : {}),
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
        className={`${fraunces.variable} ${cabin.variable} ${ibmPlexMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider>
          <SparkAltSlugProvider>
            <BookingProvider>
              <Header settings={settings} locale={locale} />
              {children}
              <Footer settings={settings} locale={locale} />
              <MobileBookingBar ctaLabel={settings.ctaLabel} />
              <BookingOverlay content={settings.booking} />
            </BookingProvider>
          </SparkAltSlugProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
