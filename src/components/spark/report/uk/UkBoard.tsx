"use client";

import { Fragment, useState } from "react";
import { GROUP_BG, percent } from "@/components/spark/report/uk/groups";
import { pill } from "@/components/spark/report/uk/pill";
import { useGrow } from "@/hooks/useGrow";
import type { UkBoardProps } from "@/types/content";

/**
 * 05 Puan tablosu: beş kategori sekmesi, her satırda sıra, ad, çubuk ve
 * değer. Çubuk rengi haritadaki grup rengi. Sıra atlıyorsa (4, sonra 13)
 * araya ince kesik çizgi. Sekme açılınca çubuklar bir kez büyür.
 * Telefonda çubuk adın altında.
 */
export default function UkBoard({ board, locale }: UkBoardProps) {
  const [cur, setCur] = useState(board.tabs[0].key);
  const tab = board.tabs.find((t) => t.key === cur) ?? board.tabs[0];
  const { ref, on } = useGrow<HTMLDivElement>(cur);
  let prev = 0;
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2">
        {board.tabs.map((t) => (
          <button key={t.key} type="button" aria-pressed={t.key === cur} onClick={() => setCur(t.key)} className={pill(t.key === cur)}>
            {t.label}
          </button>
        ))}
      </div>
      <div ref={ref} className="grid gap-2.5" aria-live="polite">
        {tab.rows.map((r) => {
          const jump = r.rank !== null && prev > 0 && r.rank - prev > 1;
          if (r.rank !== null) prev = r.rank;
          return (
            <Fragment key={`${tab.key}-${r.name}`}>
              {jump && <div aria-hidden="true" className="my-1.5 border-t border-dashed border-rule" />}
              <div className="grid grid-cols-[44px_170px_minmax(0,1fr)_56px] items-center gap-3 text-[16px] max-[600px]:grid-cols-[30px_minmax(0,1fr)_48px] max-[600px]:gap-y-1 max-[600px]:[grid-template-areas:'rk_nm_v''tr_tr_tr']">
                <span className="font-mono text-[13px] text-stone tabular-nums max-[600px]:[grid-area:rk]">
                  {r.rank !== null && (
                    <>
                      <span className="sr-only">{board.rankLabel} </span>
                      {r.rank}.
                    </>
                  )}
                </span>
                <span className="font-semibold max-[600px]:[grid-area:nm]">{r.name}</span>
                <span className="block h-[26px] overflow-hidden bg-white max-[600px]:h-[18px] max-[600px]:[grid-area:tr]">
                  <span data-grow={on ? "on" : "off"} className={`uk-grow uk-grow-w block h-full ${GROUP_BG[r.group]}`} style={{ width: `${r.value}%` }} />
                </span>
                <span className="text-right font-mono text-[15px] tabular-nums max-[600px]:[grid-area:v]">{percent(r.value, locale)}</span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
