"use client";

import { useEffect, useState } from "react";
import { formatNumber } from "@/lib/poolMath";
import type { ReportCountFigureProps } from "@/types/content";

const DURATION = 900;

/**
 * Açılış rakamı: sayfa açılınca 0'dan değerine 900ms sayar (prototip
 * heroFigures), easing cubic-out. Reduced-motion'da ve JS yokken son değer.
 * Ekran okuyucuya hep son değer okunur, sayan metin gizli.
 */
export default function CountFigure({ figure, locale }: ReportCountFigureProps) {
  const [text, setText] = useState(figure.value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const put = (n: number) => setText(figure.template.replace("{n}", formatNumber(locale, n, figure.decimals)));
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / DURATION);
      put(figure.to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [figure, locale]);

  return (
    <>
      <span className="sr-only">{figure.value}</span>
      <span aria-hidden="true">{text}</span>
    </>
  );
}
