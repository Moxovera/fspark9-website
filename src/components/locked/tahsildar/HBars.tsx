"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";
import type { TsdHBarsProps } from "@/types/content";

const TONE_CLASS = { ink: "fl", flare: "fl b", dust: "fl m" } as const;

// Yatay çubuklar: figür görünüme girince bir kez büyür (useReveal, eşik
// 0.3, referansla aynı). Çubuk %55'ten kısaysa değer çubuğun dışında.
export function HBars({ title, sub, rows, max, caption, flush }: TsdHBarsProps) {
  const ref = useReveal<HTMLElement>(0.3);
  return (
    <figure ref={ref} className={flush ? "fig flush" : "fig"}>
      <div className="fig-head">
        <div>
          <p className="fig-title">{title}</p>
          <p className="fig-sub">{sub}</p>
        </div>
      </div>
      {rows.map((r) => {
        const w = Number(((r.value / max) * 100).toFixed(1));
        const out = w < 55;
        return (
          <div className="hb" key={r.label}>
            <span className="k">{r.label}</span>
            <div className="tr">
              <div className={TONE_CLASS[r.tone]} style={{ "--w": `${w}%` } as CSSProperties} />
              <span className={out ? "v out" : "v"} style={out ? { left: `calc(${w}% + 8px)` } : undefined}>
                {r.valueLabel}
              </span>
            </div>
          </div>
        );
      })}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
