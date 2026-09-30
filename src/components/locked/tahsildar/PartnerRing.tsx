"use client";

import { useState, type KeyboardEvent } from "react";
import type { TsdPartnerRingProps } from "@/types/content";

const CX = 260;
const CY = 260;
const R0 = 82;
const R1 = 248;

const pt = (r: number, a: number): [number, number] => [CX + r * Math.cos(a), CY + r * Math.sin(a)];

function arc(a0: number, a1: number) {
  const [x0, y0] = pt(R1, a0);
  const [x1, y1] = pt(R1, a1);
  const [x2, y2] = pt(R0, a1);
  const [x3, y3] = pt(R0, a0);
  return `M${x0} ${y0} A${R1} ${R1} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${R0} ${R0} 0 0 0 ${x3} ${y3}Z`;
}

// Dört alanlı ortaklık halkası, ortada Tahsildar. Tıklama, Enter ya da
// Space alanı seçer; seçili alan Flare dolar, sağdaki panel güncellenir.
export function PartnerRing({
  sectors,
  figureTitle,
  figureSub,
  ariaLabel, centerTitle, centerSub, detailSuffix, altsLabel }: TsdPartnerRingProps) {
  const [sel, setSel] = useState(0);
  const s = sectors[sel];

  function onKey(e: KeyboardEvent<SVGPathElement>, i: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSel(i);
    }
  }

  return (
    <figure className="fig">
      <div className="fig-head">
        <div>
          <p className="fig-title">{figureTitle}</p>
          <p className="fig-sub">{figureSub}</p>
        </div>
      </div>
      <div className="ringwrap">
        <div className="ring" role="group" aria-label={ariaLabel}>
          <svg viewBox="0 0 520 520">
            {sectors.map((sec, i) => {
              const a0 = Math.PI + (i * Math.PI) / 2;
              const a1 = a0 + Math.PI / 2;
              const am = (a0 + a1) / 2;
              const [bx, by] = pt(150, am);
              const top = by - (sec.alts.length * 17 + 40) / 2;
              return (
                <g key={sec.cat}>
                  <path
                    className={i === sel ? "sec on" : "sec"}
                    d={arc(a0, a1)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${sec.cat}: ${sec.main}`}
                    aria-pressed={i === sel}
                    onClick={() => setSel(i)}
                    onKeyDown={(e) => onKey(e, i)}
                  />
                  <text className="cat" x={bx} y={top + 10} textAnchor="middle">
                    {sec.cat}
                  </text>
                  <text className="main" x={bx} y={top + 34} textAnchor="middle">
                    {sec.main}
                  </text>
                  {sec.alts.map((t, k) => (
                    <text key={t} className="alt" x={bx} y={top + 56 + k * 17} textAnchor="middle">
                      {t}
                    </text>
                  ))}
                </g>
              );
            })}
            <circle className="ctr" cx={CX} cy={CY} r={R0 - 8} />
            <text className="ctr-t" x={CX} y={CY + 2} textAnchor="middle">
              {centerTitle}
            </text>
            <text className="ctr-s" x={CX} y={CY + 20} textAnchor="middle">
              {centerSub}
            </text>
          </svg>
        </div>
        <div className="ring-detail" aria-live="polite">
          <span className="k">
            {s.cat}, {detailSuffix}
          </span>
          <h4>{s.title}</h4>
          <p>{s.text}</p>
          <div className="alts">
            <b>{altsLabel}</b> {s.alt}
          </div>
        </div>
      </div>
    </figure>
  );
}
