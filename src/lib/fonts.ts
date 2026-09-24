import {
  Fraunces,
  Cabin,
  IBM_Plex_Mono,
  Epilogue,
  Hanken_Grotesk,
  Spline_Sans_Mono,
} from "next/font/google";

// Site fontları (brand book v3, brief v4 §4): Epilogue başlık ve rakam,
// Hanken Grotesk metin, Spline Sans Mono etiket/tarih/kaynak. Türkçe
// karakterler (ş, ğ, İ, ı) için latin-ext şart. next/font self-host
// ediyor, Google Fonts'tan runtime'da hiçbir şey yüklenmiyor (Privacy
// metni bunu vaat ediyor).
export const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
  display: "swap",
});

export const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const splineMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  display: "swap",
});

// Aşağıdaki üçü sadece /locked (Fuzul raporu) için duruyor: locked-report.css
// --font-heading / --font-body / --font-plex-mono değişkenlerini okuyor.
// Rebuild /locked'a dokunmuyor, bu export'lar silinmeyecek.
export const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const cabin = Cabin({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
