import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ThankYouView from "@/components/blocks/ThankYouView";
import { confirmedEn, confirmedTr } from "@/content/thank-you";

// Kit onay mailindeki linke tıklandıktan sonra gelinen sayfa.
// noindex, sitemap dışında. Metin /thank-you gibi statik (CLAUDE.md).

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const page = locale === "tr" ? confirmedTr : confirmedEn;
  return { title: page.seo.title, robots: { index: false, follow: false } };
}

export default async function NewsletterConfirmedRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ThankYouView page={locale === "tr" ? confirmedTr : confirmedEn} />;
}
