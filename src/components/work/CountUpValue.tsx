"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { splitFigureUnit } from "@/lib/format";
import type { CountUpValueProps } from "@/types/content";

/**
 * Rakamın sayısal kısmını sayar; önündeki ve arkasındaki işaretler
 * (%, +, "months", "ay") sabit kalır (brief §10). Sayı yoksa ("UK") metni
 * olduğu gibi gösterir. Sunucu HTML'i son değerle geliyor, sayım sadece
 * JS açıkken ve görünür olunca başlıyor.
 */
export default function CountUpValue({ value, locale, className }: CountUpValueProps) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/[.,]/g, "")) : 0;
  const { ref, value: current } = useCountUp<HTMLSpanElement>(target, 900, 600);

  if (!match) return <span className={className}>{value}</span>;
  const formatted = current.toLocaleString(locale === "tr" ? "tr-TR" : "en-GB");
  // Sondaki kelime birimi ("months") küçük ve aynı satırda (FigureValue ile aynı kural).
  const { main: suffix, unit } = splitFigureUnit(`0${match[3]}`);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {match[1]}
        {formatted}
        {suffix.slice(1)}
        {unit && <span className="figure-unit">{unit}</span>}
      </span>
    </span>
  );
}
