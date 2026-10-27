"use client";

import { useState } from "react";
import { fill } from "@/lib/format";
import type { Psd3FidaProps } from "@/types/content";

/**
 * 05 FiDA haritası: 0 ile 48 ay arası kaydırıcı (6'şar), veri hücrelerini
 * aşamasına göre açar ve altındaki satırı günceller.
 */
export default function Psd3Fida({ fida }: Psd3FidaProps) {
  const [month, setMonth] = useState(fida.start);
  const phase = (m: number) => fida.phases.find((p) => p.month === m) ?? fida.phases.find((p) => p.month === Math.floor(m / 6) * 6);

  return (
    <div>
      <div className="mt-[22px] grid gap-3">
        <label htmlFor="fida-phase" className="font-mono text-[12.5px] font-medium tracking-[0.08em] uppercase">
          {fida.sliderLabel} <span>{month}</span>
        </label>
        <input
          id="fida-phase"
          type="range"
          min={0}
          max={fida.max}
          step={fida.step}
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="w-full accent-ink"
        />
        <p aria-live="polite" className="m-0 min-h-[3.2em] text-[15.5px]">
          {phase(month)?.text}
        </p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2.5 min-[561px]:grid-cols-3">
        {fida.cells.map((cell) => {
          const state = cell.month < 0 ? "out" : month >= cell.month ? "open" : "closed";
          return (
            <div
              key={cell.name}
              className={`grid min-h-[94px] content-between gap-2 border-[1.5px] px-3 py-3.5 transition-[background-color,color,border-color] duration-[240ms] ease-brand motion-reduce:transition-none ${
                state === "open"
                  ? "border-ink bg-ink text-paper"
                  : state === "out"
                    ? "border-dashed border-rule bg-transparent text-stone"
                    : "border-rule bg-white"
              }`}
            >
              <span className="font-display text-[15.5px] leading-[1.2] font-bold">{cell.name}</span>{" "}
              <span className={`font-mono text-[10.5px] tracking-[0.08em] uppercase ${state === "open" ? "text-dust" : "text-stone"}`}>
                {cell.phase}
                {cell.month > 0 ? ` · ${fill(fida.monthTemplate, { n: cell.month })}` : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
