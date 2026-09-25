/**
 * Kısa tarih ("27 Nov 2019" / "27 Kas 2019"), mono etiketler için. EN'de
 * ay adı en-US'ten: en-GB Eylül'ü "Sept" yazıyor, diğer aylar gibi üç
 * harf olsun.
 */
export function formatShortDate(iso: string, locale: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  if (locale === "tr") {
    return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
  }
  const month = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(date);
  return `${date.getUTCDate()} ${month} ${date.getUTCFullYear()}`;
}

/** "{key}" yer tutucularını doldurur. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

/**
 * Rakamın sonundaki kelime birimini ayırır ("6 months" → "6" + "months",
 * "6 ay" → "6" + "ay"). İşaretler (%, +) rakamın parçası sayılır, ayrılmaz.
 */
export function splitFigureUnit(value: string): { main: string; unit: string } {
  const match = value.match(/^(.*?\d[^\s]*)\s+(\p{L}[\p{L}\s]*)$/u);
  return match ? { main: match[1], unit: match[2] } : { main: value, unit: "" };
}
