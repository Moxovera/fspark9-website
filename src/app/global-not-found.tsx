import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { playfairDisplay, ibmPlexMono } from "@/lib/fonts";
import { en } from "@/content/not-found";
import "./globals.css";

export const metadata: Metadata = {
  title: "fspark9",
  description: "This page does not exist. The other ones do.",
};

/**
 * dc.html: is404 (satır 1030-1039) — DİKKAT, bilinçli bir sapma burada.
 * dc.html'in kendi <header>/<footer>'ı (satır 33, 1042) is404 dahil HER
 * sayfada koşulsuz render ediliyor, sc-if is404 sadece <main>'i
 * değiştiriyor — yani dc.html'in gerçek 404'ü chrome'lu. Kullanıcıyla
 * bu netleştirildikten sonra kasıtlı olarak chrome'suz, tam izole bir
 * sayfa tercih edildi.
 *
 * `[locale]/layout.tsx` kök `<html><body>`'sini kurduğu için (kök
 * app/layout.tsx yok, top-level dinamik segment) bu dosya onu bypass
 * ediyor — Next.js dokümantasyonu bu senaryo için `global-not-found.js`
 * kullanılmasını öneriyor (next.config.ts: experimental.globalNotFound).
 * Kendi <html><body>'sini kuruyor, global stil/font'ları kendi import
 * ediyor — [locale] layout'undan (dolayısıyla Header/Footer/
 * MobileBookingBar/BookingOverlay'den) hiçbir şey miras almıyor.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${ibmPlexMono.variable} antialiased`}>
        <main className="flex min-h-[100svh] items-center bg-navy px-7 pt-[150px] pb-20">
          <div className="mx-auto max-w-[1000px]">
            <Image
              src="/assets/symbol-reversed.svg"
              alt=""
              width={64}
              height={100}
              className="mb-10 h-16 w-auto opacity-80"
            />
            <h1 className="mb-7 max-w-[22ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] font-medium text-ivory">
              {en.title}
            </h1>
            <Link
              href="/"
              className="inline-block border-b border-bronze/45 pb-1 font-mono text-sm tracking-[0.06em] text-ivory"
            >
              {en.linkLabel}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
