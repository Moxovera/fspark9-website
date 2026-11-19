"use client";

import { percent } from "@/components/spark/report/uk/groups";
import { useGrow } from "@/hooks/useGrow";
import type { UkMoneyBarsProps } from "@/types/content";

/** 0 ile 70 ölçek (referanstaki gibi): %60 sütunu kutunun 6/7'si. */
const SCALE = 70;

/** 12 Para: 2012 ve 2025 sütunları, görünür olunca bir kez büyür. */
export default function UkMoneyBars({ bars, title, locale }: UkMoneyBarsProps) {
  const { ref, on } = useGrow<HTMLDivElement>("money");
  return (
    <div className="min-w-0">
      <p className="mt-0 mb-4 text-[15px] font-semibold text-stone">{title}</p>
      <div ref={ref} className="flex h-[280px] items-end gap-7 border-b border-ink px-1.5 max-[600px]:h-[220px]">
        {bars.map((b, i) => (
          <div key={b.year} className="flex h-full flex-1 flex-col items-center justify-end">
            <b className="mb-2 font-display text-[34px] leading-none font-extrabold">{percent(b.value, locale)}</b>
            <span
              data-grow={on ? "on" : "off"}
              className={`uk-grow uk-grow-h block w-full max-w-[120px] ${i === bars.length - 1 ? "bg-ink" : "bg-stone"}`}
              style={{ height: `${(b.value / SCALE) * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-7 px-1.5 pt-2">
        {bars.map((b) => (
          <span key={b.year} className="flex-1 text-center font-mono text-[13px] text-stone">
            {b.year}
          </span>
        ))}
      </div>
    </div>
  );
}
