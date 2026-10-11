"use client";

import { useState } from "react";
import GoButton from "@/components/brand/GoButton";
import { Link } from "@/i18n/navigation";
import { RADAR_SIGNALS, radarPolygon, radarRing } from "@/lib/radar";
import type { RadarIssueListProps, RadarSignal, RadarValues } from "@/types/content";

const FIRST_ROWS = 10;
/** Süzgeç çipleri 4 ve daha çok yayındaki sayıda çıkar. */
const FILTER_FROM = 4;
const mono = "font-mono text-[11px] font-medium tracking-[0.08em] uppercase";

/** Satırdaki küçük radar: Ink çizgi, duruşta dolgu yok; üzerine gelince çizgi yeniden çizilir ve Flare dolar (globals .rd-thumb-poly). */
function Thumb({ values }: { values: RadarValues }) {
  return (
    <svg viewBox="-50 -50 100 100" aria-hidden="true" className="block size-[52px] min-[761px]:size-16">
      <polygon points={radarRing(1, 40)} className="fill-none stroke-rule stroke-[3]" />
      <polygon points={radarPolygon(values, 40)} pathLength={100} className="rd-thumb-poly stroke-ink stroke-[6] [stroke-linejoin:miter]" />
    </svg>
  );
}

/**
 * "Tüm sayılar": en yeni üstte; Nº, şirket ve kanca, şehir · ülke ve en
 * güçlü sinyal, küçük radar, "Okuyun" ve 40px kare Ink ok. Üzerine gelince
 * ya da klavye odağında kare düğme Flare olur (Ink ok), küçük radar çizgisini
 * yeniden çizip Flare dolar; duruşta listede Flare yok. On satırdan sonra
 * "Tümünü göster". 4 ve daha çok sayıda en güçlü sinyale göre çipler:
 * eşleşmeyen satırlar soluklaşır.
 */
export default function RadarIssueList({ issues, copy }: RadarIssueListProps) {
  const [filter, setFilter] = useState<RadarSignal | "all">("all");
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? issues : issues.slice(0, FIRST_ROWS);

  return (
    <>
      {issues.length >= FILTER_FROM && (
        <div role="group" aria-label={copy.filter} className="flex flex-wrap items-center gap-[6px]">
          <span className={`${mono} mr-[6px] text-stone`}>{copy.filter}</span>{" "}
          {(["all", ...RADAR_SIGNALS] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
              className={`inline-flex min-h-11 cursor-pointer items-center border px-3 font-mono text-[11px] tracking-[0.06em] uppercase ${
                filter === key ? "border-ink bg-ink text-paper" : "border-rule bg-white text-stone hover:border-ink hover:text-ink"
              }`}
            >
              {key === "all" ? copy.filterAll : copy.signalsLower[key]}
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-col border-t border-rule">
        {shown.map((issue) => {
          const dim = filter !== "all" && filter !== issue.strongest;
          return (
            <div key={issue.numberLabel} className={`border-b border-rule transition-opacity duration-240 ease-brand ${dim ? "opacity-[0.28]" : ""}`}>
              <Link
                href={issue.href}
                className="group rd-row grid grid-cols-[44px_minmax(0,1fr)_52px] items-center gap-x-[14px] gap-y-[10px] py-[14px] no-underline hover:bg-white min-[761px]:grid-cols-[64px_minmax(0,1fr)_150px_64px_140px] min-[761px]:gap-5 min-[761px]:py-4"
              >
                <span className="font-mono text-[13px] tabular-nums">{issue.numberLabel}</span>{" "}
                <span className="flex min-w-0 flex-col gap-[3px]">
                  <b className="font-display text-[19px] leading-[1.15] font-bold tracking-[-0.015em] min-[761px]:text-[21px]">{issue.company}</b>{" "}
                  <span className="text-[15px] text-stone">{issue.hook}</span>
                </span>{" "}
                <span className="col-start-2 col-end-3 flex flex-row flex-wrap gap-3 min-[761px]:col-auto min-[761px]:flex-col min-[761px]:gap-1">
                  <span className={`${mono} text-stone`}>
                    {issue.place} · {issue.country}
                  </span>{" "}
                  <span className={`${mono} text-ink`}>
                    {copy.strongest}: {copy.signalsLower[issue.strongest]}
                  </span>
                </span>{" "}
                <span className="col-start-3 row-span-2 row-start-1 self-start min-[761px]:col-auto min-[761px]:row-auto min-[761px]:self-center">
                  <Thumb values={issue.values} />
                </span>{" "}
                <span className="col-start-2 col-end-4 flex items-center justify-start gap-3 font-display text-[15px] font-bold min-[761px]:col-auto min-[761px]:justify-end">
                  {copy.readShort}
                  <GoButton size={40} className="go-flare" />
                </span>
              </Link>
            </div>
          );
        })}
      </div>
      {!showAll && issues.length > FIRST_ROWS && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="block min-h-11 w-full cursor-pointer border-b border-rule bg-transparent py-3 text-left text-[14px] font-bold text-ink"
        >
          {copy.showAll}
        </button>
      )}
    </>
  );
}
