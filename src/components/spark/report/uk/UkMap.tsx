"use client";

import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import UkGroupDot from "@/components/spark/report/uk/UkGroupDot";
import { useUkSelection } from "@/components/spark/report/uk/UkSelection";
import { GROUPS, GROUP_BG, formatMoney } from "@/components/spark/report/uk/groups";
import { pill } from "@/components/spark/report/uk/pill";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from "@/components/icons";
import type { UkMapProps, UkMetric } from "@/types/content";

const axis = "absolute flex items-center gap-1 font-mono text-[12px] leading-[1.2] tracking-[0.06em] text-stone uppercase max-[600px]:max-w-[46%] max-[600px]:text-[10px]";
const small = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";
const METRICS: UkMetric[] = ["deposits", "loans", "ldr", "pbt"];

/**
 * 03 Harita: yatay eksen işletme büyüklüğü, dikey eksen müşteriyi ne
 * tutuyor. On beş oyuncu, üst ortada kesik çizgili "Boş alan". Masaüstünde
 * etiketler noktanın yanında (x > 60 olanlar solda); telefonda (600px ve
 * altı) sadece seçilinin etiketi görünür, haritanın altında dokunulabilir
 * oyuncu düğmeleri. Banka olan oyuncunun kartında bilançodan dört rakam.
 */
export default function UkMap({ map, balance, locale, template }: UkMapProps) {
  const { player: sel, setPlayer } = useUkSelection();
  const player = map.players.find((p) => p.key === sel) ?? null;
  const row = player?.bank ? balance.rows.find((r) => r.key === player.bank) : undefined;

  return (
    <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,40px)] min-[981px]:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="min-w-0">
        <div className="relative aspect-[1/0.82] border-t-2 border-ink bg-white max-[600px]:aspect-[1/1.05]">
          <span className={`${axis} top-3 left-3.5`}>
            <ArrowUpIcon className="size-3.5 flex-none" /> {map.axisY[1]}
          </span>
          <span className={`${axis} bottom-[34px] left-3.5 max-[600px]:bottom-[46px]`}>
            <ArrowDownIcon className="size-3.5 flex-none" /> {map.axisY[0]}
          </span>
          <span className={`${axis} bottom-2.5 left-3.5`}>
            <ArrowLeftIcon className="size-3.5 flex-none" /> {map.axisX[0]}
          </span>
          <span className={`${axis} right-3.5 bottom-2.5 justify-end text-right`}>
            {map.axisX[1]} <ArrowRightIcon className="size-3.5 flex-none" />
          </span>
          <div className="absolute inset-x-[26px] inset-y-[44px]">
            <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px bg-rule" />
            <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-rule" />
            <span
              aria-hidden="true"
              className="absolute top-[-4%] left-[28%] flex aspect-square w-[26%] items-center justify-center rounded-full border-2 border-dashed border-stone p-3.5 text-center font-mono text-[11px] leading-[1.3] tracking-[0.04em] text-stone uppercase max-[600px]:p-1.5 max-[600px]:text-[9px]"
            >
              {map.emptyLabel}
            </span>
            {map.players.map((p) => {
              const on = p.key === sel;
              const left = p.x > 60;
              return (
                <button
                  key={p.key}
                  type="button"
                  aria-pressed={on}
                  aria-label={p.name}
                  onClick={() => setPlayer(p.key)}
                  style={{ left: `${p.x}%`, bottom: `${p.y}%` }}
                  className={`group absolute z-[1] flex items-center gap-[7px] p-1 font-sans text-[13px] font-semibold whitespace-nowrap text-ink ${
                    left ? "translate-x-[calc(-100%+11px)] translate-y-1/2 flex-row-reverse" : "translate-x-[-11px] translate-y-1/2"
                  } ${on ? "z-[2]" : ""}`}
                >
                  <span
                    aria-hidden="true"
                    className={`block size-3.5 flex-none rounded-full border-2 border-white shadow-[0_0_0_1px_var(--rule)] transition-transform duration-200 ease-brand group-hover:scale-[1.35] motion-reduce:transition-none max-[600px]:size-3 ${GROUP_BG[p.group]} ${on ? "scale-[1.35]" : ""}`}
                  />
                  <span aria-hidden="true" className={on ? "bg-ink px-1.5 text-paper" : "max-[600px]:hidden"}>
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-3 hidden flex-wrap gap-1.5 max-[600px]:flex">
          {map.players.map((p) => (
            <button key={p.key} type="button" aria-pressed={p.key === sel} onClick={() => setPlayer(p.key)} className={pill(p.key === sel, "text-[13px]")}>
              <UkGroupDot group={p.group} className="size-2.5" />
              {p.name}
            </button>
          ))}
        </div>
        <ul className="mt-4 mb-0 flex list-none flex-wrap gap-x-4 gap-y-2 p-0 text-[13.5px] text-stone">
          {GROUPS.map((g) => (
            <li key={g} className="flex items-center gap-1.5">
              <UkGroupDot group={g} /> {map.legend[g]}
            </li>
          ))}
        </ul>
      </div>

      <div aria-live="polite" className="grid min-w-0 gap-2.5 border-t-2 border-ink bg-white p-[clamp(20px,3vw,26px)] min-[981px]:sticky min-[981px]:top-[150px] min-[981px]:min-h-[220px]">
        {player ? (
          <>
            <span className={`${small} flex items-center gap-2 text-stone`}>
              <UkGroupDot group={player.group} /> {map.legend[player.group]}
            </span>
            <h3 className="m-0 font-display text-[24px] leading-[1.15] font-extrabold tracking-[-0.02em]">{player.name}</h3>
            <p className="m-0 text-[16px] text-stone">
              <Psd3Text text={player.text} template={template} />
            </p>
            {row && (
              <dl className="m-0 mt-2 grid grid-cols-2 gap-2.5 border-t border-rule pt-3.5">
                {METRICS.map((m) => (
                  <div key={m} className="grid gap-0.5">
                    <dt className={`${small} text-stone`}>{balance.detailLabels[m]}</dt>
                    <dd className="m-0 font-display text-[18px] font-bold">{formatMoney(row[m], m, locale)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </>
        ) : (
          <>
            <span className={`${small} text-stone`}>{map.hint}</span>
            <h3 className="m-0 font-display text-[20px] leading-[1.2] font-extrabold tracking-[-0.015em]">{map.emptyTitle}</h3>
            <p className="m-0 text-[16px] text-stone">{map.empty}</p>
          </>
        )}
      </div>
    </div>
  );
}
