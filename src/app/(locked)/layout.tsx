import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fraunces, cabin, ibmPlexMono } from "@/lib/fonts";
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
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${cabin.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {/* Shared defs for the "9" symbol mark, for embedding inside other
            SVGs (HouseIllustration) or as a standalone icon (Wordmark.tsx's
            BrandSymbolIcon, Note.tsx) via <use>. Paths copied verbatim from
            public/assets/fspark9-logo/fspark9-symbol-{primary,reversed}.svg
            — two ink colors (theme-toggled via wm-light/wm-dark, same as
            Wordmark) since the real files use hardcoded fills, not
            currentColor. Not a redraw: same "d" data as the provided files. */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="fs9-slice">
              <polygon points="50,32 18.2,-18.88 50,-28 81.79,-18.88" />
            </clipPath>
            <g id="fs9-sym-light">
              <path fill="#0B1F3A" fillRule="evenodd" d="M18 32 A32 32 0 1 0 82 32 A32 32 0 1 0 18 32 Z M33.5 32 A16.5 19.5 0 1 1 66.5 32 A16.5 19.5 0 1 1 33.5 32 Z" />
              <path fill="#0B1F3A" d="M82 32 C82 54 78 78 63 100 L50 96.5 C61 76 70 52 70 36 Z" />
              <path fill="#A67C3D" fillRule="evenodd" clipPath="url(#fs9-slice)" d="M18 32 A32 32 0 1 0 82 32 A32 32 0 1 0 18 32 Z M33.5 32 A16.5 19.5 0 1 1 66.5 32 A16.5 19.5 0 1 1 33.5 32 Z" />
            </g>
            <g id="fs9-sym-dark">
              <path fill="#F7F4EC" fillRule="evenodd" d="M18 32 A32 32 0 1 0 82 32 A32 32 0 1 0 18 32 Z M33.5 32 A16.5 19.5 0 1 1 66.5 32 A16.5 19.5 0 1 1 33.5 32 Z" />
              <path fill="#F7F4EC" d="M82 32 C82 54 78 78 63 100 L50 96.5 C61 76 70 52 70 36 Z" />
              <path fill="#A67C3D" fillRule="evenodd" clipPath="url(#fs9-slice)" d="M18 32 A32 32 0 1 0 82 32 A32 32 0 1 0 18 32 Z M33.5 32 A16.5 19.5 0 1 1 66.5 32 A16.5 19.5 0 1 1 33.5 32 Z" />
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
