"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface CountUpValueProps {
  value: string;
  /** "tr" ise binlik ayraç nokta (40.000), değilse virgül (40,000). */
  locale: string;
  className?: string;
}

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

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {match[1]}
        {formatted}
        {match[3]}
      </span>
    </span>
  );
}
