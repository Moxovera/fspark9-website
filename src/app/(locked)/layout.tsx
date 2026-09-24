import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { epilogue, hanken, splineMono } from "@/lib/fonts";
import { BRAND } from "@/lib/brandColors";
import { LOGO_NINE_BODY, LOGO_NINE_SLICE } from "@/components/brand/Logo";
import "./locked-report.css";

// Root layout for the whole /locked/* area: own <html><body>, no
// NextIntlClientProvider, no site Header/Footer/BookingProvider — this is a
// private client-report space, not part of the public site's locale tree
// (see src/middleware.ts matcher and CLAUDE.md's "Analytics" section on why
// every independent root HTML file needs its own <Analytics/>+<SpeedInsights/>).
//
// <html lang> is set to a reasonable default here because this layout sits
// above the [client] dynamic segment and therefore cannot read which client
// / language is active (Next only threads params down to layouts at or
// below the segment that defines them). The actual active language is set
// on the client via a small effect once the page mounts (see
// SyncHtmlLang in ReportShell.tsx).
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function LockedLayout({ children }: { children: React.ReactNode }) {
  return (
    // Font değişkenleri <html>'de: locked-report.css :root'ta
    // --f-display: var(--font-epilogue) çözüyor, değişken :root'ta tanımlı
    // olmalı (body'de olursa :root'ta boş kalır ve sistem fontuna düşer).
    <html lang="tr" className={`${epilogue.variable} ${hanken.variable} ${splineMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body
        className="antialiased"
      >
        {/* "9" sembolünün paylaşılan tanımları: HouseIllustration içinde ve
            BrandSymbolIcon (Wordmark.tsx, Note.tsx) üzerinden <use> ile
            kullanılıyor. v2 logo dosyasının path'leri (Logo.tsx ile aynı
            kaynak), viewBox 18 0 64 100. Açık varyant Paper zemin için (Ink
            gövde), koyu varyant Ink rozet için (Paper gövde); dilim ikisinde
            de Flare. */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
          <defs>
            <g id="fs9-sym-light">
              <path fill={BRAND.ink} d={LOGO_NINE_BODY[0]} />
              <path fill={BRAND.flare} d={LOGO_NINE_SLICE} />
              <path fill={BRAND.ink} d={LOGO_NINE_BODY[1]} />
            </g>
            <g id="fs9-sym-dark">
              <path fill={BRAND.paper} d={LOGO_NINE_BODY[0]} />
              <path fill={BRAND.flare} d={LOGO_NINE_SLICE} />
              <path fill={BRAND.paper} d={LOGO_NINE_BODY[1]} />
            </g>
          </defs>
        </svg>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
