import type { Locale } from "@/types/content";

// Sektör raporu simülatörünün matematiği (prototip calcPool, Spark/sector
// reports/fspark9-sektor-raporu-bauspar.html). Saf fonksiyon; formüller
// prototiple birebir aynı kalır.

export interface PoolInput {
  price: number;
  monthly: number;
  feePct: number;
  bankRate: number;
  depositRate: number;
  rent: number;
  down: number;
  month: number;
  usesInterest: boolean;
}

export interface PoolResult {
  /** Havuz ücreti. */
  F: number;
  /** Plan süresi, ay. */
  N: number;
  /** Teslim ayı. */
  T: number;
  paidIn: number;
  earned: number;
  /** Kalan kredi. */
  L: number;
  pmt: number;
  loanInterest: number;
  ownWayCost: number;
  rentSaved: number;
  result: number;
}

export function calcPool(p: PoolInput): PoolResult {
  const P = p.price;
  const m = p.monthly;
  const F = (P * p.feePct) / 100;
  const N = Math.round((P - p.down) / m);
  const T = Math.min(Math.max(1, p.month), N - 1);
  const rem = N - T;
  const i = p.depositRate / 100 / 12;
  const saved = i > 0 ? p.down * Math.pow(1 + i, T) + m * ((Math.pow(1 + i, T) - 1) / i) : p.down + m * T;
  const earned = saved - (p.down + m * T);
  const L = Math.max(0, P - saved);
  const r = p.bankRate / 100 / 12;
  const pmt = L > 0 ? (r > 0 ? (L * r) / (1 - Math.pow(1 + r, -rem)) : L / rem) : 0;
  const loanInterest = L > 0 ? pmt * rem - L : 0;
  const ownWayCost = loanInterest - earned;
  const rentSaved = p.rent * (N - T);
  const result = p.usesInterest ? ownWayCost - F : rentSaved - F;
  return { F, N, T, paidIn: p.down + m * T, earned, L, pmt, loanInterest, ownWayCost, rentSaved, result };
}

const tag = (locale: Locale) => (locale === "tr" ? "tr-TR" : "en-GB");

export const formatNumber = (locale: Locale, n: number, decimals = 0) =>
  n.toLocaleString(tag(locale), { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** "80.000 €" (TR) ya da "€80,000" (EN). */
export const formatEuro = (locale: Locale, n: number) =>
  locale === "tr" ? `${formatNumber(locale, Math.round(n))} €` : `€${formatNumber(locale, Math.round(n))}`;

/** İşaretli tutar; eksi işareti tipografik eksi (U+2212), tire değil. */
export const formatSignedEuro = (locale: Locale, n: number) => `${n >= 0 ? "+" : "−"}${formatEuro(locale, Math.abs(n))}`;

/** "%8,0" (TR) ya da "8.0%" (EN). */
export const formatPercent = (locale: Locale, n: number, decimals = 1) =>
  locale === "tr" ? `%${formatNumber(locale, n, decimals)}` : `${formatNumber(locale, n, decimals)}%`;
