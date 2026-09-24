/**
 * Marka renkleri, CSS değişkeni kullanamayan yerler için (OG görseli
 * Satori ile çiziliyor, CSS custom property çözemiyor). Değerler
 * globals.css :root ile birebir aynı; renk değişirse ikisi birlikte.
 */
export const BRAND = {
  paper: "#F3F1EB",
  ink: "#17150F",
  flare: "#FFC629",
  dust: "#A39D90",
  ring: "#4A453B",
} as const;
