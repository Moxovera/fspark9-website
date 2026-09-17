"use client";

import { useEffect, useRef, useState } from "react";

interface RibbonCountUpProps {
  value: number;
  durationMs?: number;
}

/**
 * Ribbon rakamlarının kısa bir "count up" ile yerine oturması — bkz.
 * Spark revizyon brief §5: "the ribbon figures settle from a short
 * count up." Sayfanın TEK orkestre animasyonunun bir parçası, bu
 * yüzden mount'ta bir kere çalışır, scroll'a bağlı değil.
 * prefers-reduced-motion: rakam doğrudan basılır, animasyon yok.
 */
export default function RibbonCountUp({ value, durationMs = 600 }: RibbonCountUpProps) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setDisplay(Math.round(progress * value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, durationMs]);

  return <>{display}</>;
}
