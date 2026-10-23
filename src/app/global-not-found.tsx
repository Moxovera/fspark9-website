import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { epilogue, hanken, splineMono } from "@/lib/fonts";
import { both } from "@/content/not-found";
import NotFoundBlock from "@/components/blocks/NotFoundBlock";
import Logo from "@/components/brand/Logo";
import NextLink from "next/link";
import NewsletterStrip from "@/components/spark/newsletter/NewsletterStrip";
import { getSparkHub } from "@/sanity/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: both.seoTitle,
  robots: { index: false, follow: false },
};

/**
 * Global 404 (brief v4 §7.8, board NotFound / NotFoundM). Hiçbir route'a
 * uymayan URL'ler buraya düşüyor ve `[locale]/layout.tsx`'i tamamen
 * atlıyor (next.config.ts experimental.globalNotFound): kendi
 * <html><body>'si, fontları, Analytics ve Speed Insights'ı var. Dili
 * bilemediği için iki dili birden gösteriyor, chrome'suz (altta iki dilin
 * bülten formu); sol üstte logo
 * ana sayfaya gidiyor.
 */
export default async function GlobalNotFound() {
  // Bülten formu iki dil için (404 dili bilmiyor). Sanity'ye ulaşılamazsa 404 yine açılır, form olmadan.
  const hub = await getSparkHub().catch(() => null);
  return (
    <html lang="en">
      <body className={`${epilogue.variable} ${hanken.variable} ${splineMono.variable} font-sans antialiased`}>
        <main>
          <NotFoundBlock
            content={both}
            top={
              <NextLink href="/" aria-label="fspark9 home" className="flex min-h-11 items-center self-start text-paper">
                <Logo label="fspark9" className="h-[22px] min-[900px]:h-[27px]" />
              </NextLink>
            }
          />
        </main>
        {hub && (
          <div className="on-ink flex flex-col gap-6 bg-ink px-5 pb-10 min-[900px]:px-16 min-[900px]:pb-14">
            <NewsletterStrip newsletter={hub.en.newsletter} locale="en" />
            <NewsletterStrip newsletter={hub.tr.newsletter} locale="tr" />
          </div>
        )}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
