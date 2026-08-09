import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { playfairDisplay, inter, ibmPlexMono } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import MobileBookingBar from "@/components/chrome/MobileBookingBar";
import BookingProvider from "@/components/booking/BookingProvider";
import BookingOverlay from "@/components/booking/BookingOverlay";
import { siteSettings as enSiteSettings } from "@/content/en";
import { siteSettings as trSiteSettings } from "@/content/tr";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  SITE_NAV_QUERY,
  SITE_FOOTER_QUERY,
  SITE_SEO_QUERY,
  toSiteNav,
  toFooter,
  toSiteSeo,
} from "@/sanity/lib/queries";
import type {
  SITE_NAV_QUERYResult,
  SITE_FOOTER_QUERYResult,
  SITE_SEO_QUERYResult,
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

  return {
    title: seo.title || "fspark9",
    description: seo.description || "Trust isn't marketed. It's built.",
    ...(seo.noIndex ? { robots: { index: false } } : {}),
    ...(seo.ogImage?.url
      ? { openGraph: { images: [{ url: seo.ogImage.url, alt: seo.ogImage.alt }] } }
      : {}),
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

  const [navResult, footerResult] = await Promise.all([
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
  ]);
  const settings = {
    ...staticSettings,
    nav: toSiteNav(navResult),
    footer: toFooter(footerResult),
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
      </head>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${ibmPlexMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider>
          <BookingProvider>
            <Header settings={settings} locale={locale} />
            {children}
            <Footer settings={settings} locale={locale} />
            <MobileBookingBar ctaLabel={settings.ctaLabel} />
            <BookingOverlay content={settings.booking} />
          </BookingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
