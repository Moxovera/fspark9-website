"use client";

import { useEffect, useRef, useState } from "react";

interface EpisodeClockProps {
  containerId: string;
  dayLabel: string; // "DAY" / "GÜN"
  dayZero: number;
  dayLast: number;
}

/**
 * Büyük, belirgin bir saat — kullanıcı geri bildirimi: mevcut sayaç
 * yeterince görünür değildi, büyütüldü ve bir ilerleme çubuğu eklendi.
 * Bölüm gövdesi artık serbest biçimli olduğu için (sabit blok/gün
 * çapaları yok), gün sayısı belirli bir bloğa değil, okuyucunun
 * GÖVDE KONTEYNER'I içindeki scroll ilerlemesine göre hesaplanıyor —
 * dayZero'dan dayLast'a doğrusal enterpolasyon.
 *
 * Scroll dinleyicisi passive + requestAnimationFrame ile kısılıyor
 * (CLAUDE.md: "Her scroll olayında layout okuma yapılmayacak"), resize
 * için window.resize DEĞİL ResizeObserver kullanılıyor (bkz.
 * CanvasField.tsx'teki aynı desen). Temizlik unmount'ta garanti.
 */
export default function EpisodeClock({ containerId, dayLabel, dayZero, dayLast }: EpisodeClockProps) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // İlerleme 0 = gövdenin ÜSTÜ viewport'un üstüne değdiği an, 1 =
    // gövdenin ALTI viewport'un altına değdiği an — okuyucu gövdeye
    // gerçekten ulaşana kadar (hero/metadata'yı geçene kadar) DAY 0'da
    // sabit kalır, önceki formüldeki sayfa yüklenir yüklenmez küçük bir
    // ofsetle başlama sorunu bu şekilde çözüldü.
    const compute = () => {
      const rect = container.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const denom = rect.height - viewportH;
      const value = denom > 0 ? -rect.top / denom : rect.top <= 0 ? 1 : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        compute();
        tickingRef.current = false;
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(onScroll);
    resizeObserver.observe(container);

    return () => {
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [containerId]);

  const day = Math.round(dayZero + progress * (dayLast - dayZero));
  const percent = Math.round(progress * 100);

  return (
    <div className="sticky top-[92px] z-10 border border-navy/15 bg-ivory/95 px-6 py-5 backdrop-blur-sm">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <p className="font-mono text-[clamp(1.8rem,4vw,2.6rem)] leading-none tracking-[-0.01em] text-navy">
          {dayLabel} {String(Math.max(day, 0)).padStart(3, "0")}
        </p>
        <p className="font-mono text-xs tracking-[0.05em] text-muted">
          {dayLabel} {dayZero} → {dayLabel} {dayLast}
        </p>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-navy/10">
        <div
          className="h-full rounded-full bg-bronze motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
