import { Fraunces, Cabin, IBM_Plex_Mono } from "next/font/google";

// [locale]/layout.tsx VE app/global-not-found.tsx (kök 404, layout.tsx'i
// bypass ediyor) paylaşıyor — next/font/google çağrıları tek yerde,
// weight/subset ayarları iki dosyada tekrarlanmasın diye.
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
