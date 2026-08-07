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
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "fspark9",
  description: "Trust isn't marketed. It's built.",
};

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

  const settings = locale === "tr" ? trSiteSettings : enSiteSettings;

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
