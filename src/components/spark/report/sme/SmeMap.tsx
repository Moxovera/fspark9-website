"use client";

import { useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import SmeReading from "@/components/spark/report/sme/SmeReading";
import type { SmeGroup, SmeMapProps, SmePlayer } from "@/types/content";

const L = 40;
const T = 20;
const W = 540;
const H = 420;
const X = (v: number) => L + (v / 10) * W;
const Y = (v: number) => T + H - (v / 10) * H;
/** Sağ üst köşedeki Flare dilim: köşe merkezli 40 derecelik halka dilimi (marka imzası). */
const CX = X(10);
const CY = Y(10);
const R = 170;
const RI = R * 0.66;
const A0 = (115 * Math.PI) / 180;
const A1 = (155 * Math.PI) / 180;
const pt = (a: number, r: number) => `${(CX + r * Math.cos(a)).toFixed(1)} ${(CY + r * Math.sin(a)).toFixed(1)}`;
const SLICE = `M${pt(A0, R)} A${R} ${R} 0 0 1 ${pt(A1, R)} L${pt(A1, RI)} A${RI} ${RI} 0 0 0 ${pt(A0, RI)} Z`;
const GROUPS: SmeGroup[] = ["traditional", "digital", "licensed", "credit"];
const small = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";

/** Grup işareti: renk tek başına taşımasın diye biçim de farklı (dolu, boş, halkalı, küçük). */
function Mark({ group, cx, cy, selected = false }: { group: SmeGroup; cx: number; cy: number; selected?: boolean }) {
  const r = group === "credit" ? 6 : 9;
  return (
    <>
      {selected && <circle cx={cx} cy={cy} r={r + 7} className="fill-flare stroke-ink" strokeWidth={1.5} />}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        strokeWidth={2}
        className={group === "traditional" ? "fill-ink stroke-ink" : group === "credit" ? "fill-stone stroke-stone" : "fill-white stroke-ink"}
      />
      {group === "licensed" && <circle cx={cx} cy={cy} r={3.5} className="fill-ink" />}
    </>
  );
}

function LegendMark({ group }: { group: SmeGroup }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 flex-none">
      <Mark group={group} cx={12} cy={12} />
    </svg>
  );
}

const labelPos = (p: SmePlayer, x: number, y: number) => {
  if (p.side === "r") return { x: x + 15, y: y + 4.5, anchor: "start" as const };
  if (p.side === "l") return { x: x - 15, y: y + 4.5, anchor: "end" as const };
  if (p.side === "t") return { x, y: y - 16, anchor: "middle" as const };
  return { x, y: y + 27, anchor: "middle" as const };
};

/**
 * 02 Harita: dikey eksen bilanço gücü, yatay eksen platform genişliği.
 * Sağ üst köşe boş, orada Flare dilim. Noktaya ya da alttaki düğmeye
 * dokununca kart açılır (kendini nasıl anlatıyor, kozu, zayıf karnı).
 * "Qonto banka lisansı alırsa" düğmesi Qonto'yu dilimin kenarına bir kez
 * kaydırır; reduced-motion'da hareketsiz yer değiştirir. Etiketler dar
 * ekranda gizli, düğmeler her genişlikte.
 */
export default function SmeMap({ map, readingLabel, template }: SmeMapProps) {
  const [sel, setSel] = useState<string | null>(null);
  const [moved, setMoved] = useState(false);
  const player = map.players.find((p) => p.key === sel) ?? null;
  const qonto = map.players.find((p) => p.key === "qonto");
  const dx = qonto ? X(map.qonto.x) - X(qonto.x) : 0;
  const dy = qonto ? Y(map.qonto.y) - Y(qonto.y) : 0;
  const axis = "fill-ink font-mono text-[12px] tracking-[0.08em] uppercase";

  return (
    <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] min-[981px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div className="min-w-0">
        <div className="border-t-2 border-ink bg-white p-2.5">
          <svg viewBox="0 0 600 480" role="img" aria-label={map.chartLabel} className="block h-auto w-full">
            <rect x={L} y={T} width={W} height={H} className="fill-paper" />
            <line x1={X(5)} y1={T} x2={X(5)} y2={T + H} className="stroke-rule" />
            <line x1={L} y1={Y(5)} x2={L + W} y2={Y(5)} className="stroke-rule" />
            <path d={SLICE} className="fill-flare" />
            <text x={X(9.1)} y={Y(9.35)} textAnchor="end" className="fill-ink font-mono text-[13px] font-medium tracking-[0.1em] uppercase" aria-hidden="true">
              {map.gapLabel}
            </text>
            {/* Eksenler: oklu çizgi, etiket ucunda. */}
            <g aria-hidden="true" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-ink">
              <path d={`M${L} ${T + H}H${L + W}`} />
              <path d={`M${L + W - 8} ${T + H - 6}l8 6l-8 6`} />
              <path d={`M${L} ${T + H}V${T}`} />
              <path d={`M${L - 6} ${T + 8}l6 -8l6 8`} />
            </g>
            <g aria-hidden="true">
              <text x={L + W} y={T + H + 26} textAnchor="end" className={axis}>
                {map.axisX}
              </text>
              <text transform={`translate(${L - 14} ${T}) rotate(-90)`} textAnchor="end" className={axis}>
                {map.axisY}
              </text>
            </g>
            {moved && qonto && (
              <line
                x1={X(qonto.x)}
                y1={Y(qonto.y)}
                x2={X(map.qonto.x)}
                y2={Y(map.qonto.y)}
                strokeDasharray="4 5"
                strokeWidth={1.5}
                className="stroke-ink"
                aria-hidden="true"
              />
            )}
            {map.players.map((p) => {
              const x = X(p.x);
              const y = Y(p.y);
              const lp = labelPos(p, x, y);
              const isQonto = p.key === "qonto";
              return (
                <g
                  key={p.key}
                  aria-hidden="true"
                  onClick={() => setSel(p.key)}
                  className={`cursor-pointer ${isQonto ? "transition-transform duration-[900ms] ease-brand motion-reduce:transition-none" : ""}`}
                  style={isQonto ? { transform: moved ? `translate(${dx}px, ${dy}px)` : "translate(0px, 0px)" } : undefined}
                >
                  <circle cx={x} cy={y} r={20} className="fill-transparent" />
                  <Mark group={p.group} cx={x} cy={y} selected={p.key === sel} />
                  <text x={lp.x} y={lp.y} textAnchor={lp.anchor} className="fill-ink font-sans text-[14px] font-bold max-[640px]:hidden">
                    {p.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <ul className="mt-3.5 mb-0 flex list-none flex-wrap gap-x-4 gap-y-1.5 p-0 text-[13.5px]">
          {GROUPS.map((g) => (
            <li key={g} className="flex items-center gap-2">
              <LegendMark group={g} /> {map.legend[g]}
            </li>
          ))}
        </ul>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {map.players.map((p) => (
            <button
              key={p.key}
              type="button"
              aria-pressed={p.key === sel}
              onClick={() => setSel(p.key)}
              className={`flex min-h-11 items-center gap-2 border-[1.5px] border-ink px-2.5 py-1.5 text-left text-[13.5px] ${p.key === sel ? "bg-ink text-paper" : "bg-white"}`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid min-w-0 gap-5">
        <div aria-live="polite" className="grid min-w-0 gap-4 border-t-2 border-ink bg-white p-[clamp(20px,3vw,28px)]">
          {player ? (
            <>
              <div className="grid gap-1.5">
                <span className="flex items-center gap-2 font-mono text-[11.5px] tracking-[0.08em] text-stone uppercase">
                  <LegendMark group={player.group} /> {map.legend[player.group]}
                </span>{" "}
                <h3 className="m-0 font-display text-[clamp(24px,2.8vw,32px)] leading-[1.1] font-extrabold tracking-[-0.025em]">{player.name}</h3>
              </div>
              {(
                [
                  [map.labels.pitch, player.pitch],
                  [map.labels.edge, player.edge],
                  [map.labels.weak, player.weak],
                ] as const
              ).map(([label, text]) => (
                <div key={label} className="grid min-w-0 gap-1 border-t border-rule pt-3">
                  <span className={small}>{label}</span>{" "}
                  <p className="m-0 text-[15.5px]">
                    <Psd3Text text={text} template={template} />
                  </p>
                </div>
              ))}
            </>
          ) : (
            <>
              <span className={small}>{map.hint}</span>
              <p className="m-0 text-[15.5px]">{map.note}</p>
            </>
          )}
        </div>

        <div className="grid gap-4 border-t-2 border-ink bg-paper pt-5">
          <button
            type="button"
            aria-pressed={moved}
            onClick={() => {
              setMoved((m) => !m);
              setSel("qonto");
            }}
            className="inline-flex min-h-11 items-center justify-self-start bg-ink px-4 py-2.5 text-left text-[15px] font-bold text-paper"
          >
            {moved ? map.qonto.reset : map.qonto.button}
          </button>
          {moved && (
            <div className="grid gap-4">
              <p className="m-0 text-[15.5px]">
                <Psd3Text text={map.qonto.text} template={template} />
              </p>
              <SmeReading label={readingLabel} text={map.qonto.reading} template={template} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
