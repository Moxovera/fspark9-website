"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import type { KycMapProps } from "@/types/content";

const L = 60;
const T = 20;
const W = 480;
const H = 440;
const X = (v: number) => L + (v / 10) * W;
const Y = (v: number) => T + H - (v / 10) * H;
const ARROW = "M0 0h9M5.5 -3.5 9 0l-3.5 3.5";

const TONE = { green: "text-positive", red: "text-negative", amber: "text-stone" } as const;
const small = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";

/**
 * 04 Competition map: yedi numaralı kareli SVG matris, altında buton
 * listesi, yanında ayrıntı paneli (karar etiketi, oyuncular, güçlü ve
 * zayıf yan, sıradaki adım). Kare ve butonlar fare, dokunma ve klavyeyle
 * (Enter, Space) seçilir. Eksen etiketlerinin oku SVG çizgi: metnin
 * uzunluğu ölçülüp hemen sonuna konur (PSD3 matrisi gibi).
 */
export default function KycMap({ map }: KycMapProps) {
  const [sel, setSel] = useState(0);
  const xLabel = useRef<SVGTextElement>(null);
  const yLabel = useRef<SVGTextElement>(null);
  const [arrows, setArrows] = useState<{ x: number; y: number } | null>(null);
  const type = map.types[sel];

  useLayoutEffect(() => {
    const measure = () => {
      const x = xLabel.current?.getComputedTextLength() ?? 0;
      const y = yLabel.current?.getComputedTextLength() ?? 0;
      setArrows({ x, y });
    };
    measure();
    document.fonts?.ready.then(measure);
  }, []);

  const onKey = (event: KeyboardEvent<SVGGElement>, i: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSel(i);
    }
  };
  const axisText = "font-mono text-[11.5px] tracking-[0.08em] fill-ink";

  return (
    <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] min-[981px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div>
        <div className="border-t-2 border-ink bg-paper p-2.5">
          <svg viewBox="0 0 560 520" role="img" aria-label={map.chartLabel} className="block h-auto w-full">
            <rect x={L} y={T} width={W} height={H} className="fill-white" />
            <line x1={X(5)} y1={T} x2={X(5)} y2={T + H} className="stroke-rule" />
            <line x1={L} y1={Y(5)} x2={L + W} y2={Y(5)} className="stroke-rule" />
            <line x1={L} y1={T + H} x2={L + W} y2={T + H} strokeWidth={2} className="stroke-ink" />
            <line x1={L} y1={T} x2={L} y2={T + H} strokeWidth={2} className="stroke-ink" />
            {[0, 5, 10].map((v) => (
              <g key={v} className="fill-stone font-mono text-[11px]">
                <text x={X(v)} y={T + H + 18} textAnchor="middle">
                  {v}
                </text>
                <text x={L - 10} y={Y(v) + 4} textAnchor="end">
                  {v}
                </text>
              </g>
            ))}
            <g aria-hidden="true">
              <text ref={xLabel} x={L + W / 2 - (arrows ? 7 : 0)} y={T + H + 40} textAnchor="middle" className={axisText}>
                {map.axisX}
              </text>
              {arrows && (
                <path d={ARROW} transform={`translate(${L + W / 2 - 7 + arrows.x / 2 + 5} ${T + H + 36})`} fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="stroke-ink" />
              )}
              <g transform={`translate(16 ${T + H / 2}) rotate(-90)`}>
                <text ref={yLabel} x={arrows ? -7 : 0} y={0} textAnchor="middle" className={axisText}>
                  {map.axisY}
                </text>
                {arrows && (
                  <path d={ARROW} transform={`translate(${-7 + arrows.y / 2 + 5} -4)`} fill="none" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="stroke-ink" />
                )}
              </g>
              {(
                [
                  [X(2.5), Y(9.6)],
                  [X(7.5), Y(9.6)],
                  [X(2.5), Y(0.5)],
                  [X(7.5), Y(0.5)],
                ] as const
              ).map(([x, y], i) => (
                <text key={map.quadrants[i]} x={x} y={y} textAnchor="middle" className="fill-dust font-mono text-[11px] tracking-[0.1em]">
                  {map.quadrants[i]}
                </text>
              ))}
            </g>
            {map.types.map((f, i) => (
              <g
                key={f.name}
                role="button"
                tabIndex={0}
                aria-label={f.name}
                aria-pressed={i === sel}
                onClick={() => setSel(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group cursor-pointer"
              >
                <rect
                  x={X(f.x) - 14}
                  y={Y(f.y) - 14}
                  width={28}
                  height={28}
                  className={`transition-[fill] duration-[160ms] ease-brand motion-reduce:transition-none ${i === sel ? "fill-flare stroke-ink stroke-2" : "fill-ink group-hover:fill-stone"}`}
                />
                <text x={X(f.x)} y={Y(f.y) + 4} textAnchor="middle" className={`pointer-events-none font-mono text-[12px] ${i === sel ? "fill-ink" : "fill-paper"}`}>
                  {i + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {map.types.map((f, i) => (
            <button
              key={f.name}
              type="button"
              aria-pressed={i === sel}
              onClick={() => setSel(i)}
              className={`flex min-h-11 items-center gap-2 border-[1.5px] border-ink px-2.5 py-1.5 text-left text-[13.5px] ${i === sel ? "bg-ink text-paper" : "bg-white"}`}
            >
              <span className="font-mono text-[11px]">{i + 1}</span> {f.name}
            </button>
          ))}
        </div>
      </div>
      <div aria-live="polite" className="grid min-w-0 gap-4 border-t-2 border-ink bg-paper p-[clamp(20px,3vw,30px)]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="font-mono text-[12.5px] font-medium tracking-[0.08em] text-stone uppercase">
              {sel + 1} / {map.types.length}
            </span>{" "}
            <h3 className="m-0 font-display text-[clamp(22px,2.6vw,30px)] leading-[1.18] font-extrabold tracking-[-0.025em]">{type.name}</h3>
          </div>{" "}
          <span className={`border-[1.5px] border-current px-[7px] py-[3px] font-mono text-[10.5px] tracking-[0.08em] whitespace-nowrap uppercase ${TONE[type.tone]}`}>
            {type.verdict}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {type.players.flatMap((p, i) => [
            ...(i > 0 ? [" "] : []),
            <span key={p} className="border border-stone px-[7px] py-[3px] font-mono text-[11px] tracking-[0.04em]">
              {p}
            </span>,
          ])}
        </div>
        <div className="grid grid-cols-1 gap-4 min-[561px]:grid-cols-2">
          {(
            [
              [map.strengthLabel, type.strength],
              [map.weaknessLabel, type.weakness],
            ] as const
          ).map(([label, text]) => (
            <div key={label} className="grid min-w-0 gap-1.5">
              <span className={small}>{label}</span>{" "}
              <p className="m-0">{text}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-rule bg-paper p-4">
          <span className="mb-1.5 block font-mono text-[12.5px] font-medium tracking-[0.08em] uppercase">{map.moveLabel}</span>{" "}
          <p className="m-0">{type.move}</p>
        </div>
      </div>
    </div>
  );
}
