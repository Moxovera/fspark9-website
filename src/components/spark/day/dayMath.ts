// Gün mekaniğinin TEK kaynağı — bkz. revizyon brief 4b: "The day count
// is derived from those two dates, never typed in by hand." Bu dosyada
// yan etkisiz, saf fonksiyonlar var; hem server hem client bileşenden
// çağrılabilir.

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * launchDate/closureDate ISO tarih string'leri ("YYYY-MM-DD"). İkisinden
 * biri eksikse ya da geçersizse null döner — "not established" bu
 * sonuca göre render edilir, tahmini bir sayı ASLA üretilmez.
 */
export function computeDayCount(
  launchDate: string | null | undefined,
  closureDate: string | null | undefined,
): number | null {
  if (!launchDate || !closureDate) return null;
  const start = new Date(launchDate).getTime();
  const end = new Date(closureDate).getTime();
  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  const days = Math.round((end - start) / MS_PER_DAY);
  return days >= 0 ? days : null;
}
