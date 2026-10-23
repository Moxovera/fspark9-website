import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ThankYouView from "@/components/blocks/ThankYouView";
import { en, tr } from "@/content/thank-you";

// /thank-you (brief v4 §7.8, board ThankYou / ThankYouM). Randevu
// tamamlanınca CalEmbed buraya yönlendiriyor. noindex, sitemap dışında.

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = locale === "tr" ? tr : en;
  return { title: page.seo.title, robots: { index: false, follow: false } };
}

export default async function ThankYouRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = locale === "tr" ? tr : en;

  return <ThankYouView page={page} />;
}
