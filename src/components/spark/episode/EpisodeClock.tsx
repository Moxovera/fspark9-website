"use client";

import { useEffect, useRef, useState } from "react";
import { dayNumberLabel } from "@/components/spark/day/dayMath";
import { fill, formatShortDate } from "@/lib/format";
import type { EpisodeContext } from "@/types/content";

interface EpisodeClockProps {
  ctx: Pick<EpisodeContext, "launchDate" | "closureDate" | "locale" | "labels">;
}

/**
 * Gün saati (brief v4 §7.7, board Episode / EpisodeM). Masaüstünde sol iki
 * sütunda sticky (top 120px): "Day", büyük gün numarası, tarih, kapanış
 * gününe göre ilerleme çubuğu ve "of 156". Mobilde header'ın altında ince
 * sticky şerit: solda gün, sağda tarih. Okunan blok `data-spark-day` / `data-spark-date`
 * taşıyan elemanlardan tek IntersectionObserver ile izleniyor; sayı
 * doğrudan değişiyor, geçiş yok. Sticky çalışsın diye bu bileşenin hiçbir
 * atasında transform ya da overflow yok (CLAUDE.md "Kart yığını").
 */
export default function EpisodeClock({ ctx }: EpisodeClockProps) {
  const closureDay = Number(dayNumberLabel(ctx.closureDate, ctx.launchDate));
  const [current, setCurrent] = useState({ day: "000", date: ctx.launchDate });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = ref.current?.parentElement;
    if (!scope) return;
    const elements = Array.from(scope.querySelectorAll<HTMLElement>("[data-spark-day]"));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) => (a.boundingClientRect.top <= b.boundingClientRect.top ? a : b));
        const day = top.target.getAttribute("data-spark-day");
        const date = top.target.getAttribute("data-spark-date");
        if (day && date) setCurrent({ day, date });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const n = Number(current.day);
  const progress = Math.max(0, Math.min(1, closureDay > 0 ? n / closureDay : 0));
  const date = formatShortDate(current.date, ctx.locale);
  const of = fill(ctx.labels.clockOfTemplate, { n: closureDay });
  const mono = "font-mono text-[11px] leading-[normal] font-medium tracking-[0.08em] text-stone uppercase min-[900px]:text-[12px]";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="sticky top-16 z-[5] -mx-5 flex items-baseline justify-between border-b-2 border-ink bg-paper px-5 py-[10px] min-[900px]:top-[120px] min-[900px]:col-span-2 min-[900px]:mx-0 min-[900px]:flex-col min-[900px]:items-stretch min-[900px]:justify-start min-[900px]:gap-[6px] min-[900px]:self-start min-[900px]:border-t-2 min-[900px]:border-b-0 min-[900px]:bg-transparent min-[900px]:px-0 min-[900px]:pt-[14px] min-[900px]:pb-0"
    >
      <span className="flex items-baseline gap-2 min-[900px]:contents">
        <span className={mono}>{ctx.labels.clockDayLabel}</span>
        <span className="font-display text-[22px] leading-none font-extrabold tracking-[-0.02em] text-ink min-[900px]:text-[72px] min-[900px]:leading-[0.9] min-[900px]:tracking-[-0.05em]">
          {current.day}
        </span>
      </span>
      <span className={mono}>{date}</span>
      <span className="hidden h-1 bg-rule min-[900px]:relative min-[900px]:mt-[10px] min-[900px]:block">
        <span className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${progress * 100}%` }} />
      </span>
      <span className={`${mono} hidden min-[900px]:block`}>{of}</span>
    </div>
  );
}
