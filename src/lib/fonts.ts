import {
  Epilogue,
  Hanken_Grotesk,
  Spline_Sans_Mono,
} from "next/font/google";

// Site ve /locked fontları (brand book v3, brief v4 §4): Epilogue başlık ve rakam,
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
