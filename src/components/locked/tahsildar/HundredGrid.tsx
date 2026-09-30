"use client";

import { useReveal } from "@/hooks/useReveal";
import type { TsdHundredGridProps } from "@/types/content";

// 10 x 10 ızgara: görünüme girince ilk `on` hücre kısa bir gecikme
// dizisiyle (hücre başına 9 ms) Flare dolar.
export function HundredGrid({ title, sub, on, unit, ariaLabel, caption }: TsdHundredGridProps) {
  const ref = useReveal<HTMLElement>(0.3);
  return (
    <figure ref={ref} className="fig">
      <div className="fig-head">
        <div>
          <p className="fig-title">{title}</p>
          <p className="fig-sub">{sub}</p>
        </div>
      </div>
      <div className="gridrow">
        <div>
          <div className="bigfig">
            {on}
            <small>{unit}</small>
          </div>
        </div>
        <div className="grid100" role="img" aria-label={ariaLabel}>
          {Array.from({ length: 100 }, (_, i) =>
            i < on ? <i key={i} className="on" style={{ transitionDelay: `${i * 9}ms` }} /> : <i key={i} />,
          )}
        </div>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
