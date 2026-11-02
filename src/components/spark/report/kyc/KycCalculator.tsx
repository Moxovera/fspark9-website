"use client";

import { useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { formatNumber } from "@/lib/poolMath";
import type { KycCalculatorProps } from "@/types/content";

const label = "font-mono text-[12.5px] font-medium tracking-[0.08em] uppercase";

/**
 * 08 Revenue: aylık hacim kaydırıcısı (on üç adım, 0 ile 20.000) büyük
 * rakamı ve beş planın aylık faturasını günceller. Çubuklar tek ölçekte
 * (en büyük fatura tam boy); kullanım minimumun altındaysa minimum
 * faturalanır ve çubuk taralıdır. Rakamlar sayfanın dilinde. Hiçbir şey
 * saklanmaz.
 */
export default function KycCalculator({ money, locale, template }: KycCalculatorProps) {
  const [index, setIndex] = useState(money.startIndex);
  const volume = money.volumes[index];
  const fmt = (n: number) => formatNumber(locale, Math.round(n));
  const rows = money.plans.map((p) => {
    const usage = Math.max(0, volume - p.free) * p.price;
    return { plan: p, bill: Math.max(usage, p.minimum), min: p.minimum > usage };
  });
  const max = Math.max(...rows.map((r) => r.bill), 1);

  return (
    <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] min-[901px]:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="grid min-w-0 gap-3.5">
        <label htmlFor="kyc-volume" className={label}>
          {money.volumeLabel}
        </label>{" "}
        <div aria-hidden="true" className="font-display text-[clamp(40px,5vw,64px)] leading-none font-extrabold tracking-[-0.04em] tabular-nums">
          {fmt(volume)}
        </div>
        <input
          id="kyc-volume"
          type="range"
          min={0}
          max={money.volumes.length - 1}
          step={1}
          value={index}
          aria-valuetext={fmt(volume)}
          onChange={(e) => setIndex(Number(e.target.value))}
          className="min-h-11 w-full accent-ink"
        />
        <p className="m-0 max-w-[80ch] text-[14px] text-stone">{money.note}</p>
        <div className="border-t border-rule bg-paper p-4">
          <span className={`${label} mb-1.5 block`}>{money.field.label}</span>{" "}
          <p className="m-0">{money.field.text}</p>
        </div>
      </div>
      <div aria-live="polite" className="grid min-w-0 gap-3 border-t-2 border-ink bg-white p-5">
        <span className={label}>{money.billLabel}</span>
        {rows.map((r) => (
          <div key={r.plan.name} className="grid grid-cols-[minmax(0,1fr)_80px] items-center gap-3 min-[521px]:grid-cols-[150px_minmax(0,1fr)_92px]">
            <span className="text-[14px] leading-[1.25]">
              {r.plan.name}{" "}
              <small className="block font-mono text-[10.5px] tracking-[0.04em] text-stone">{r.plan.terms}</small>
            </span>{" "}
            <span className="relative order-3 col-span-full h-[22px] bg-paper min-[521px]:order-none min-[521px]:col-auto">
              <span
                className={`absolute inset-y-0 left-0 transition-[width] duration-[320ms] ease-brand motion-reduce:transition-none ${r.min ? "bg-[repeating-linear-gradient(45deg,var(--ink)_0_2px,var(--white)_2px_6px)]" : "bg-ink"}`}
                style={{ width: `${(r.bill / max) * 100}%` }}
              />
            </span>{" "}
            <span className="text-right font-mono text-[13px] tabular-nums">
              {fmt(r.bill)} {money.currency}
            </span>
          </div>
        ))}
        <p className="m-0 text-[14px] text-stone">
          {money.sourcesLabel}: <Psd3Text text={money.billSources.map((n) => `[${n}]`).join(" ")} template={template} />
        </p>
      </div>
    </div>
  );
}
