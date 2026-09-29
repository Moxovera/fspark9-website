"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ClockProviderProps, ClockStopProps, EpisodeClockProps } from "@/types/content";

/**
 * Son Gün Nº 02'nin yapışkan saati (prototip son-gun-02-nuri-v2 `.clock`):
 * ekranın ortasındaki banttaki (root margin -35% / -55%) bloğun tarih
 * yazısı ve baştan sona ilerleme çubuğu. StoryTracker gibi reveal'dan
 * ayrı: okurun hangi blokta olduğunu sürekli izler. Bloklar ClockStop ile
 * kendi ref'lerini kaydediyor; DOM sorgusu yok.
 */

interface ClockState {
  active: number | null;
  register: (el: HTMLElement | null, index: number) => void;
}

const ClockContext = createContext<ClockState | null>(null);

function useClock() {
  const ctx = useContext(ClockContext);
  if (!ctx) throw new Error("useClock must be used within ClockProvider");
  return ctx;
}

export function ClockProvider({ children }: ClockProviderProps) {
  const [active, setActive] = useState<number | null>(null);
  const elements = useRef(new Map<number, HTMLElement>());
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.stop);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    observer.current = io;
    for (const el of elements.current.values()) io.observe(el);
    return () => {
      io.disconnect();
      observer.current = null;
    };
  }, []);

  const register = useCallback((el: HTMLElement | null, index: number) => {
    const previous = elements.current.get(index);
    if (previous && previous !== el) observer.current?.unobserve(previous);
    if (el) {
      elements.current.set(index, el);
      observer.current?.observe(el);
    } else {
      elements.current.delete(index);
    }
  }, []);

  const value = useMemo(() => ({ active, register }), [active, register]);
  return <ClockContext.Provider value={value}>{children}</ClockContext.Provider>;
}

export function ClockStop({ index, id, labelledBy, className, children }: ClockStopProps) {
  const { register } = useClock();
  const ref = useCallback((el: HTMLElement | null) => register(el, index), [register, index]);
  return (
    <section ref={ref} id={id} aria-labelledby={labelledBy} data-stop={index} className={className}>
      {children}
    </section>
  );
}

const time = (date: string) => Date.parse(date);

/**
 * Geniş ekranda 1-2. sütunlarda yapışkan saat (tarih, çubuk, aralık).
 * 860px ve altında header'ın altında ince yapışkan şerit.
 */
export function EpisodeClock({ stops, rangeLabel, start, end }: EpisodeClockProps) {
  const { active } = useClock();
  const stop = active === null ? null : stops[active];
  const progress = stop ? Math.min(1, Math.max(0, (time(stop.date) - time(start)) / (time(end) - time(start)))) : 0;
  const mono = "m-0 font-mono text-[12.5px] leading-[1.5] font-medium tracking-[0.08em] text-stone uppercase";

  return (
    <aside
      aria-hidden="true"
      className="sticky top-16 z-10 -mx-5 mb-6 flex flex-row items-center gap-3 border-b border-rule bg-paper px-5 py-[10px] min-[861px]:top-[96px] min-[861px]:z-auto min-[861px]:col-span-2 min-[861px]:col-start-1 min-[861px]:m-0 min-[861px]:flex-col min-[861px]:items-stretch min-[861px]:gap-[10px] min-[861px]:self-start min-[861px]:border-0 min-[861px]:bg-transparent min-[861px]:p-0 min-[861px]:pt-[6px] min-[900px]:top-[116px]"
    >
      <p className={mono}>{stop ? stop.when : rangeLabel}</p>
      <div className="h-1 flex-1 bg-rule min-[861px]:flex-none">
        <i className="clock-bar block h-full bg-ink" style={{ width: `${progress * 100}%` }} />
      </div>
      <p className={`${mono} hidden min-[861px]:block`}>{rangeLabel}</p>
    </aside>
  );
}
