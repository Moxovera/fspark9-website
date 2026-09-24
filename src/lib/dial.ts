/**
 * Dokuz dilimli halkanın geometrisi (brief v4 §7.1). 100 × 100 viewBox,
 * dilimler 40 derece, saat on ikiden saat yönünde. Dilimler arası boşluk
 * açısal değil paralel: her kenar merkezden `g` birim kaydırılmış düz bir
 * çizgi, bu yüzden boşluk iç ve dış yarıçapta aynı genişlikte. Board'lardaki
 * path'lerle 0.01 birim hassasiyetinde birebir aynı.
 */
const pt = (a: number, r: number) =>
  `${(50 + r * Math.sin(a)).toFixed(2)} ${(50 - r * Math.cos(a)).toFixed(2)}`;

export function slicePath(i: number, R = 50, r = 33, g = 1.3): string {
  const a0 = ((i - 1) * 40 * Math.PI) / 180;
  const a1 = (i * 40 * Math.PI) / 180;
  const dO = Math.asin(g / R);
  const dI = Math.asin(g / r);
  return `M${pt(a0 + dO, R)} A${R} ${R} 0 0 1 ${pt(a1 - dO, R)} L${pt(a1 - dI, r)} A${r} ${r} 0 0 0 ${pt(a0 + dI, r)} Z`;
}

/** 1'den 8'e dilim numaraları. Dokuzuncu dilim hiç saklanmaz, hep yanık. */
export const EIGHT_SLICES = [1, 2, 3, 4, 5, 6, 7, 8] as const;
