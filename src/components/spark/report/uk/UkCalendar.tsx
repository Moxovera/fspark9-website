"use client";

import { useEffect, useRef, useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { formatShortDate } from "@/lib/format";
import type { UkCalendarProps } from "@/types/content";

const mono = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";

/**
 * 15 Takvim: on dört olay tek çizgide. Geçmiş olaylar dolu nokta, gelecek
 * olanlar boş halka; seçili olan Flare. Varsayılan seçili ilk gelecek olay.
 * Her olay en az 100px (en uzun kelime sığsın); sığmayınca çizgi yana kayar ve açılışta seçili olaya gelir. Altta seçilen olayın kartı: ne oldu ve KOBİ
 * bankacılığı için anlamı.
 */
export default function UkCalendar({ calendar, locale, template }: UkCalendarProps) {
  const first = Math.max(0, calendar.events.findIndex((e) => !e.past));
  const [cur, setCur] = useState(first);
  const ev = calendar.events[cur];
  const railRef = useRef<HTMLDivElement>(null);

  // Telefonda çizgi yana kayar: açılışta varsayılan olay (ilk gelecek olay) görünür olsun.
  useEffect(() => {
    const rail = railRef.current;
    const btn = rail?.querySelector<HTMLElement>("button[aria-pressed='true']");
    if (rail && btn && rail.scrollWidth > rail.clientWidth) rail.scrollLeft += btn.getBoundingClientRect().left - rail.getBoundingClientRect().left - 24;
  }, []);
  let lastYear = "";

  return (
    <div className="grid gap-6">
      <div ref={railRef} className="overflow-x-auto px-1 pt-8 pb-4 [scrollbar-width:thin]">
        <ol className="relative m-0 flex w-max min-w-full list-none p-0 before:absolute before:inset-x-0 before:top-[9px] before:h-[2px] before:bg-ink">
          {calendar.events.map((e, i) => {
            const year = e.date.slice(0, 4);
            const showYear = year !== lastYear;
            lastYear = year;
            const on = i === cur;
            return (
              <li key={e.date + e.title} className="relative min-w-[100px] flex-1">
                {showYear && <span className="absolute -top-[26px] left-1.5 font-mono text-[12px] text-stone">{year}</span>}
                <button type="button" aria-pressed={on} onClick={() => setCur(i)} className="grid min-h-11 w-full content-start px-1.5 text-left">
                  <span
                    aria-hidden="true"
                    className={`relative z-[1] block size-5 rounded-full border-2 border-ink transition-transform duration-200 ease-brand motion-reduce:transition-none ${
                      on ? "scale-125 bg-flare" : e.past ? "bg-ink" : "bg-paper"
                    }`}
                  />
                  <span className="mt-2.5 font-mono text-[11.5px] text-stone">{formatShortDate(e.date, locale)}</span>
                  <span className="mt-1 text-[13.5px] leading-[1.25] font-semibold">{e.title.replace(/ \[\d+\]/g, "")}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div aria-live="polite" className="grid gap-x-6 gap-y-3 border-t-2 border-ink bg-paper p-[clamp(20px,3vw,26px)] min-[901px]:grid-cols-2">
        <span className={`${mono} text-stone min-[901px]:col-span-2`}>
          {formatShortDate(ev.date, locale)} · {ev.past ? calendar.pastLabel : calendar.futureLabel}
        </span>
        <h3 className="m-0 font-display text-[24px] leading-[1.15] font-extrabold tracking-[-0.02em] min-[901px]:col-span-2">
          <Psd3Text text={ev.title} template={template} />
        </h3>
        <p className="m-0 text-[16.5px] text-stone">
          <Psd3Text text={ev.what} template={template} />
        </p>
        <div className="grid content-start gap-1.5">
          <span className={`${mono} text-stone`}>{calendar.impactLabel}</span>
          <p className="m-0 text-[16.5px] text-stone">
            <Psd3Text text={ev.impact} template={template} />
          </p>
        </div>
      </div>
    </div>
  );
}
