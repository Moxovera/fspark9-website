"use client";

import { useEffect, useRef, useState } from "react";

interface EpisodeClockProps {
  containerId: string;
  dayWord: string; // "DAY" / "GÜN"
  startDay: number;
}

/**
 * Sticky "DAY 000"..."DAY 156" sayacı — scroll listener DEĞİL,
 * IntersectionObserver ile [data-day-anchor] elemanlarını izliyor
 * (bkz. CLAUDE.md: kart yığını/scroll animasyon kuralları, aynı
 * prensip). Observer mount'ta kurulur, unmount'ta MUTLAKA
 * disconnect edilir.
 */
export default function EpisodeClock({ containerId, dayWord, startDay }: EpisodeClockProps) {
  const [day, setDay] = useState(startDay);
  const visibleDays = useRef(new Map<Element, number>());

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const anchors = Array.from(container.querySelectorAll<HTMLElement>("[data-day-anchor]"));
    if (anchors.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const value = Number(entry.target.getAttribute("data-day"));
          if (entry.isIntersecting) {
            visibleDays.current.set(entry.target, value);
          } else {
            visibleDays.current.delete(entry.target);
          }
        }
        if (visibleDays.current.size > 0) {
          setDay(Math.max(...visibleDays.current.values()));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    anchors.forEach((anchor) => observer.observe(anchor));

    return () => observer.disconnect();
  }, [containerId]);

  return (
    <div
      className="sticky top-[92px] z-10 mb-6 inline-block self-start rounded-full border border-navy/25 bg-ivory/90 px-4 py-1.5 font-mono text-xs tracking-[0.08em] text-navy uppercase backdrop-blur-sm"
      aria-live="off"
    >
      {dayWord} {String(Math.max(day, 0)).padStart(3, "0")}
    </div>
  );
}
