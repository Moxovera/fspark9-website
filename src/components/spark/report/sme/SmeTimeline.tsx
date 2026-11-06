"use client";

import { useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import SmeReading from "@/components/spark/report/sme/SmeReading";
import type { SmeTimelineProps } from "@/types/content";

const mono = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";

/** "2026-11" → 2025 Ocak'tan bu yana ay (0 ile 59). */
const monthIndex = (at: string, first: number) => {
  const [y, m] = at.split("-").map(Number);
  return (y - first) * 12 + (m - 1);
};

/**
 * 06 Takvim: 2025'ten 2029'a yatay çizgi, "Bugün" işareti. Geçmiş olaylar
 * soluk, gelecekler net. Olaya dokununca "kim kazanır" satırı açılır
 * (fspark9 yorumu, işaretli). Çizgideki noktalar alttaki düğmelerle aynı
 * numarayı taşır; düğmeler klavyeyle çalışır.
 */
export default function SmeTimeline({ timeline, readingLabel, template }: SmeTimelineProps) {
  const [open, setOpen] = useState<string | null>(null);
  const first = Number(timeline.years[0]);
  const span = timeline.years.length * 12;
  const pos = (at: string) => `${((monthIndex(at, first) + 0.5) / span) * 100}%`;
  const today = monthIndex(timeline.today, first);
  const past = (at: string) => monthIndex(at, first) < today;
  // Bir öncekine üç aydan yakın olay çizginin üstüne çıkar, noktalar üst üste binmesin.
  const crowded = (i: number) => i > 0 && monthIndex(timeline.events[i].at, first) - monthIndex(timeline.events[i - 1].at, first) < 3;

  return (
    <div className="grid gap-[clamp(24px,4vw,40px)]">
      <div aria-hidden="true" className="relative pt-9 pb-8">
        <div className="relative h-[2px] bg-ink">
          <span className="absolute inset-y-0 left-0 bg-rule" style={{ width: pos(timeline.today) }} />
          {timeline.years.map((y, i) => (
            <span key={y} className="absolute top-3 -translate-x-0 font-mono text-[11px] text-stone" style={{ left: `${(i / timeline.years.length) * 100}%` }}>
              <span className="absolute -top-[13px] left-0 h-[9px] w-px bg-ink" />
              {y}
            </span>
          ))}
          {timeline.events.map((e, i) => (
            <span
              key={e.at}
              className={`absolute top-1/2 grid size-[22px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 font-mono text-[10px] ${
                open === e.at ? "border-ink bg-flare text-ink" : past(e.at) ? "border-stone bg-paper text-stone" : "border-ink bg-ink text-paper"
              } ${crowded(i) ? "-mt-[24px]" : ""}`}
              style={{ left: pos(e.at) }}
            >
              {i + 1}
            </span>
          ))}
          <span className="absolute -top-9 bottom-[-6px] w-[2px] -translate-x-1/2 bg-flare" style={{ left: pos(timeline.today) }}>
            <span className="absolute -top-0.5 left-1.5 bg-flare px-1.5 py-0.5 font-mono text-[10.5px] font-medium tracking-[0.08em] whitespace-nowrap text-ink uppercase">
              {timeline.todayLabel}
            </span>
          </span>
        </div>
      </div>

      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] items-start gap-3 p-0">
        {timeline.events.map((e, i) => {
          const isOpen = open === e.at;
          const old = past(e.at);
          return (
            <li key={e.at} className={`grid content-start border-t-2 ${old ? "border-stone" : "border-ink"} ${isOpen ? "bg-white" : "bg-paper"}`}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : e.at)}
                className={`grid min-h-11 gap-1 px-3.5 pt-3 pb-3.5 text-left ${old && !isOpen ? "text-stone" : ""}`}
              >
                <span className={`${mono} flex items-center gap-2`}>
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span> {e.date}
                </span>
                <b className="font-display text-[17px] leading-[1.2] font-bold">{e.title}</b>
              </button>
              {isOpen && (
                <div className="grid gap-3 px-3.5 pb-4">
                  <p className="m-0 text-[15px]">
                    <Psd3Text text={e.text} template={template} />
                  </p>
                  <SmeReading label={`${readingLabel} · ${timeline.whoLabel}`} text={e.who} template={template} />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
