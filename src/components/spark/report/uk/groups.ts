import type { Locale, UkGroup, UkMetric } from "@/types/content";

/** Oyuncu grubunun rengi (globals.css --group-*). Sadece nokta, çubuk ve çizgi; metin rengi değil. */
export const GROUP_BG: Record<UkGroup, string> = {
  big: "bg-group-big",
  rel: "bg-group-rel",
  dig: "bg-group-dig",
  plat: "bg-group-plat",
  spec: "bg-group-spec",
  nonbank: "bg-group-nonbank",
};

/** Açık grup kartının sol çizgisi (Tailwind sınıfları düz yazılı kalsın diye tam ad). */
export const GROUP_OPEN_BORDER: Record<UkGroup, string> = {
  big: "open:border-group-big",
  rel: "open:border-group-rel",
  dig: "open:border-group-dig",
  plat: "open:border-group-plat",
  spec: "open:border-group-spec",
  nonbank: "open:border-group-nonbank",
};

export const GROUPS: UkGroup[] = ["big", "rel", "dig", "plat", "spec", "nonbank"];

/** "%60" / "60%": TR'de yüzde işareti önde. */
export const percent = (value: number, locale: Locale) => (locale === "tr" ? `%${value}` : `${value}%`);

/**
 * Bilanço rakamı (milyar sterlin). 1 ve üstü bir ondalıkla milyar
 * (TR £496,5 mlr, EN £496.5bn), altı milyon (TR £87 mn, EN £87m).
 * Kredi/mevduat yüzde.
 */
export function formatMoney(value: number, metric: UkMetric, locale: Locale) {
  if (metric === "ldr") return percent(value, locale);
  if (value >= 1) {
    const n = value.toLocaleString(locale === "tr" ? "tr-TR" : "en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return `£${n}${locale === "tr" ? " mlr" : "bn"}`;
  }
  return `£${Math.round(value * 1000)}${locale === "tr" ? " mn" : "m"}`;
}
