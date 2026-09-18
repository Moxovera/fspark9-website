"use client";

import { useEffect, useRef, useState } from "react";
import { dayNumberLabel } from "@/components/spark/day/dayMath";

interface EpisodeClockProps {
  launchDate: string;
  closureDate: string;
  dayLabel: string;
  locale: "en" | "tr";
}

const OPENING_DURATION_MS = 1200;
const CLOSURE_DATE_DELAY_MS = 200;
const SHRINK_DELAY_MS = 500;

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

/**
 * Final interaction brief §5: sayaç önce (fixed DEĞİL, sayfa akışında)
 * DAY 000'dan başlayıp closure gününe kadar sayar, kapanış tarihi
 * eklenir, sonra sabit (fixed) küçük bir rozete küçülür ve sayfanın
 * geri kalanında orada kalır. `prefers-reduced-motion`: dört durum da
 * anında, son değerleriyle basılır, animasyon yok.
 *
 * Sticky halde gün numarası IntersectionObserver ile günceller — "tek
 * karakter titremesi, kaydırma yok, easing yok" (brief'in kendi
 * ifadesi): metin DOĞRUDAN değiştirilir, sayı üzerinde hiçbir CSS
 * transition yok.
 */
export default function EpisodeClock({ launchDate, closureDate, dayLabel, locale }: EpisodeClockProps) {
  const closureDayNumber = Number(dayNumberLabel(closureDate, launchDate));
  const [reducedMotion, setReducedMotion] = useState(false);
  const [motionChecked, setMotionChecked] = useState(false);
  const [count, setCount] = useState(0);
  const [showClosureDate, setShowClosureDate] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [stickyDay, setStickyDay] = useState("000");
  const rafRef = useRef<number | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduce);
    setMotionChecked(true);
    if (reduce) {
      setCount(closureDayNumber);
      setShowClosureDate(true);
      setIsSticky(true);
      setStickyDay(String(closureDayNumber).padStart(3, "0"));
    }
    // Yalnızca mount'ta bir kere kontrol edilir — closureDayNumber prop'tan gelir, bağımlılık olarak eklenirse
    // her render'da yeniden tetiklenir, bu efekt sadece bir kere çalışmalı.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!motionChecked || reducedMotion) return;

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / OPENING_DURATION_MS);
      setCount(Math.round(easeOutQuad(progress) * closureDayNumber));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        const t1 = setTimeout(() => setShowClosureDate(true), CLOSURE_DATE_DELAY_MS);
        const t2 = setTimeout(() => {
          setIsSticky(true);
          setStickyDay(String(closureDayNumber).padStart(3, "0"));
        }, CLOSURE_DATE_DELAY_MS + SHRINK_DELAY_MS);
        timeoutRefs.current.push(t1, t2);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    };
  }, [motionChecked, reducedMotion, closureDayNumber]);

  useEffect(() => {
    if (!isSticky) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-spark-day]"));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top <= b.boundingClientRect.top ? a : b));
        const day = topMost.target.getAttribute("data-spark-day");
        if (day) setStickyDay(day);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [isSticky]);

  const dateFormatter = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (isSticky) {
    return (
      <div
        className="fixed top-[104px] right-4 z-30 flex items-center gap-2 rounded-full border border-navy/20 bg-ivory px-4 py-2 font-mono text-xs tracking-[0.06em] text-navy sm:right-7"
        aria-live="off"
      >
        <span>{dayLabel} {stickyDay}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <p className="font-mono text-[clamp(2.4rem,7vw,4rem)] leading-none tracking-[-0.01em] text-ivory">
        {dayLabel} {String(count).padStart(3, "0")}
      </p>
      <p className="font-mono text-sm tracking-[0.04em] text-ivory/60">
        {dateFormatter.format(new Date(launchDate))}
        {showClosureDate ? ` - ${dateFormatter.format(new Date(closureDate))}` : ""}
      </p>
    </div>
  );
}
