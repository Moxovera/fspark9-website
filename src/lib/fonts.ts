import { Playfair_Display, Inter, IBM_Plex_Mono } from "next/font/google";

// [locale]/layout.tsx VE app/global-not-found.tsx (kök 404, layout.tsx'i
// bypass ediyor) paylaşıyor — next/font/google çağrıları tek yerde,
// weight/subset ayarları iki dosyada tekrarlanmasın diye.
export const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
