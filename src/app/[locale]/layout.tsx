import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Playfair_Display, Inter, IBM_Plex_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import BookingProvider from "@/components/booking/BookingProvider";
import BookingOverlay from "@/components/booking/BookingOverlay";
import { siteSettings as enSiteSettings } from "@/content/en";
import { siteSettings as trSiteSettings } from "@/content/tr";
import "../globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

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
            <BookingOverlay content={settings.booking} />
          </BookingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
