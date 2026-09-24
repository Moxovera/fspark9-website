// Gün mekaniğinin TEK kaynağı — bkz. revizyon brief 4b: "The day count
// is derived from those two dates, never typed in by hand." Bu dosyada
// yan etkisiz, saf fonksiyonlar var; hem server hem client bileşenden
// çağrılabilir.

const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const DAYS_PER_YEAR = 365;

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

/**
 * Bir tarihin launch'a göre gün numarası — launch günü "day 000" (SIFIR
 * indeksli, final interaction brief'in referans tablosuyla doğrulandı:
 * 27 Kas 2019 = 000, 1 May 2020 = 156). Launch'tan ÖNCEKİ bir tarih
 * negatif döner ("-026"), pozitif tarafta sıfır doldurmalı 3 hane.
 * Bu fonksiyon episode bloklarındaki HER "day" damgası için kullanılır
 * — hiçbir blok elle girilmiş bir gün numarası taşımaz, hepsi kendi
 * `date` alanından burada hesaplanır (final interaction brief §2).
 */
export function dayNumberLabel(date: string, launchDate: string): string {
  const start = new Date(launchDate).getTime();
  const target = new Date(date).getTime();
  if (Number.isNaN(start) || Number.isNaN(target)) return "000";
  const dayNumber = Math.round((target - start) / MS_PER_DAY);
  const sign = dayNumber < 0 ? "-" : "";
  return `${sign}${String(Math.abs(dayNumber)).padStart(3, "0")}`;
}

export interface DayMeasureLine {
  filledFraction: number; // 0-1
}

/**
 * Gün sayısını sabit 365 günlük satırlara böler — bkz. revizyon brief
 * 4b: "Anything over 365 days runs past the tick and wraps onto a
 * second line of the bar, one line per year." Ölçek göreceli DEĞİL,
 * her zaman 365 gün: ilk kayıt zaten anlamlı okunur, sonradan gelen
 * uzun bir bölüm mevcut hiçbirini sessizce yeniden ölçeklendirmez.
 */
export function splitIntoYearLines(days: number): DayMeasureLine[] {
  if (days <= 0) return [{ filledFraction: 0 }];
  const fullYears = Math.floor(days / DAYS_PER_YEAR);
  const remainder = days % DAYS_PER_YEAR;
  const lines: DayMeasureLine[] = [];
  for (let i = 0; i < fullYears; i++) {
    lines.push({ filledFraction: 1 });
  }
  if (remainder > 0 || lines.length === 0) {
    lines.push({ filledFraction: remainder / DAYS_PER_YEAR });
  }
  return lines;
}
