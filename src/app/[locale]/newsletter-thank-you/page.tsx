import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ThankYouView from "@/components/blocks/ThankYouView";
import { newsletterEn, newsletterTr } from "@/content/thank-you";

// Spark bülteni kaydından sonra Kit formunun yönlendirdiği sayfa.
// noindex, sitemap dışında. Metin /thank-you gibi statik (CLAUDE.md).

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = locale === "tr" ? newsletterTr : newsletterEn;
  return { title: page.seo.title, robots: { index: false, follow: false } };
}

export default async function NewsletterThankYouRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThankYouView page={locale === "tr" ? newsletterTr : newsletterEn} />;
}
