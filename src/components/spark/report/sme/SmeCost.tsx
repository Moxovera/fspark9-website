"use client";

import { useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { fill } from "@/lib/format";
import { formatNumber } from "@/lib/poolMath";
import type { Locale, SmeAccount, SmeCostProps } from "@/types/content";

const label = "font-mono text-[12.5px] font-medium tracking-[0.08em] uppercase";
const VAT = 1.19;
const START = 100;

/** Aylık maliyet: temel ücret + (işlem − ücretsiz işlem, sıfırın altına inmez) × işlem başı ücret. */
export const monthlyCost = (a: SmeAccount, n: number, vat: boolean) => (a.base + Math.max(0, n - a.free) * a.per) * (vat && a.vat ? VAT : 1);

const num = (locale: Locale, n: number) => formatNumber(locale, n, Number.isInteger(n) ? 0 : 2);
const euro = (locale: Locale, n: number) => (locale === "tr" ? `${formatNumber(locale, n, 2)} €` : `€${formatNumber(locale, n, 2)}`);

/**
 * 03 Hesap ücreti: aylık işlem kaydırıcısı (0 ile 400) dokuz hesabın
 * aylık maliyetini hesaplar, satırlar ucuzdan pahalıya dizilir ve yer
 * değiştirirken kayar (reduced-motion'da kaymadan). "KDV indirimi
 * yapamıyorum" anahtarı KDV hariç fiyatlanan hesaplara %19 ekler.
 * Formül tablodaki 30, 100 ve 300 işlem değerlerini birebir verir.
 */
export default function SmeCost({ cost, locale, template }: SmeCostProps) {
  const [n, setN] = useState(START);
  const [vat, setVat] = useState(false);
  const rows = cost.accounts
    .map((a, i) => ({ a, i, v: monthlyCost(a, n, vat) }))
    .sort((p, q) => p.v - q.v || p.i - q.i);
  const max = Math.max(...rows.map((r) => r.v), 1);
  const terms = (a: SmeAccount) =>
    fill(a.free > 0 ? cost.termsTemplate : cost.termsNoneTemplate, { base: num(locale, a.base), free: String(a.free), per: num(locale, a.per) });

  return (
    <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] min-[981px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div className="grid min-w-0 gap-4">
        <label htmlFor="sme-tx" className={label}>
          {cost.sliderLabel}
        </label>
        <div aria-hidden="true" className="flex items-baseline gap-3">
          <span className="font-display text-[clamp(48px,6vw,80px)] leading-none font-extrabold tracking-[-0.04em] tabular-nums">{n}</span>
          <span className="text-[16px] text-stone">{cost.unit}</span>
        </div>
        <input
          id="sme-tx"
          type="range"
          min={0}
          max={400}
          step={1}
          value={n}
          aria-valuetext={`${n} ${cost.unit}`}
          onChange={(e) => setN(Number(e.target.value))}
          className="min-h-11 w-full accent-ink"
        />
        <button
          type="button"
          role="switch"
          aria-checked={vat}
          onClick={() => setVat((v) => !v)}
          className="flex min-h-11 items-center gap-3 text-left text-[15.5px] font-bold"
        >
          <span aria-hidden="true" className={`relative h-6 w-11 flex-none border-2 border-ink ${vat ? "bg-ink" : "bg-white"}`}>
            <span
              className={`absolute top-[2px] size-4 transition-[left] duration-200 ease-brand motion-reduce:transition-none ${vat ? "left-[21px] bg-flare" : "left-[2px] bg-ink"}`}
            />
          </span>
          {cost.vatLabel}
        </button>
        <p className="m-0 text-[14.5px] text-stone">
          <Psd3Text text={cost.vatNote} template={template} />
        </p>
      </div>

      <div className="grid min-w-0 gap-3 border-t-2 border-ink bg-white p-[clamp(16px,2.5vw,24px)]">
        <span className={label}>{cost.listLabel}</span>
        <ol className="relative m-0 h-[calc(9*var(--row))] list-none p-0 [--row:72px] min-[521px]:[--row:60px]">
          {rows.map((r, rank) => (
            <li
              key={r.a.name}
              className="absolute inset-x-0 top-0 grid h-[var(--row)] grid-cols-[minmax(0,1fr)_auto] content-center gap-x-3 gap-y-1.5 border-b border-rule transition-transform duration-[420ms] ease-brand motion-reduce:transition-none min-[521px]:grid-cols-[minmax(0,240px)_minmax(0,1fr)_auto] min-[521px]:items-center"
              style={{ transform: `translateY(calc(${rank} * var(--row)))` }}
            >
              <span className="min-w-0 text-[14px] leading-[1.25] font-bold">
                {r.a.name}
                {vat && r.a.vat && <span className="ml-1.5 bg-flare px-1 py-px align-[1px] font-mono text-[9.5px] font-medium tracking-[0.06em] uppercase">{cost.vatTag}</span>}
                <small className="block font-mono text-[10.5px] font-normal tracking-[0.02em] text-stone">{terms(r.a)}</small>
              </span>
              <span className="relative order-3 col-span-full h-3 bg-paper min-[521px]:order-none min-[521px]:col-auto min-[521px]:h-[18px]">
                <span
                  className={`absolute inset-y-0 left-0 transition-[width] duration-[320ms] ease-brand motion-reduce:transition-none ${rank === 0 ? "bg-flare outline-[1.5px] outline-ink outline-solid -outline-offset-[1.5px]" : "bg-ink"}`}
                  style={{ width: `${(r.v / max) * 100}%` }}
                />
              </span>
              <span className="text-right font-mono text-[13px] whitespace-nowrap tabular-nums">
                {euro(locale, r.v)}
                <span className="text-stone"> / {cost.perMonth}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="grid gap-1 bg-rule/60 px-3.5 py-3 text-[14px]">
          <b className="font-display font-bold">{cost.sparkasse.label}</b>
          <span className="text-stone">
            <Psd3Text text={cost.sparkasse.text} template={template} />
          </span>
        </div>
        <p className="m-0 text-[13px] text-stone">
          <Psd3Text text={cost.note} template={template} />
        </p>
      </div>

      <p className="m-0 max-w-[40ch] font-display text-[clamp(22px,2.6vw,30px)] leading-[1.2] font-bold tracking-[-0.02em] min-[981px]:col-span-2">{cost.lesson}</p>
    </div>
  );
}
