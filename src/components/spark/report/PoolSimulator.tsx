"use client";

import { useState } from "react";
import { fill } from "@/lib/format";
import { calcPool, formatEuro, formatPercent, formatSignedEuro } from "@/lib/poolMath";
import { ReportCardBlock, ReportRefs } from "@/components/spark/report/ReportParts";
import { monoText } from "@/components/spark/decisions/styles";
import type { PoolSimulatorProps } from "@/types/content";

type Who = "early" | "late" | "custom";

const seg = "inline-flex flex-wrap border-[1.5px] border-ink";
const segButton = (pressed: boolean, first: boolean) =>
  `min-h-11 cursor-pointer px-[18px] font-mono text-[12px] tracking-[0.08em] uppercase transition-colors duration-[160ms] ease-brand ${
    first ? "" : "border-l-[1.5px] border-ink"
  } ${pressed ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-rule"}`;
const label = `${monoText} flex justify-between gap-3 text-ink`;
const output = "font-display text-[17px] font-extrabold tracking-[-0.01em] normal-case";
const slider = "h-7 w-full accent-ink";
const numberInput = "w-full rounded-none border-[1.5px] border-ink bg-white p-2.5 font-sans text-[16px]";

/**
 * Havuz simülatörü (prototip PoolSimulator, calcPool saf fonksiyonu
 * lib/poolMath.ts'te). İki hazır hikâye, faizli kredi seçeneği, üç
 * kaydırıcı ve diğer varsayımlar; sonuç anında hesaplanır. State bileşende,
 * hiçbir şey saklanmaz.
 */
export default function PoolSimulator({ content, locale, footnoteTemplate }: PoolSimulatorProps) {
  const { values, presets, texts } = content;
  const first = presets[0];
  const [who, setWho] = useState<Who>(first.key);
  const [down, setDown] = useState(first.down);
  const [month, setMonth] = useState(first.month);
  const [usesInterest, setUsesInterest] = useState(first.usesInterest);
  const [feePct, setFeePct] = useState(values.feePct);
  const [bankRate, setBankRate] = useState(values.bankRate);
  const [depositRate, setDepositRate] = useState(values.depositRate);
  const [rent, setRent] = useState(values.rent);
  const [extra, setExtra] = useState({ bank: String(values.bankRate), deposit: String(values.depositRate), rent: String(values.rent) });

  const plan = Math.round((values.price - down) / values.monthly);
  const R = calcPool({ price: values.price, monthly: values.monthly, feePct, bankRate, depositRate, rent, down, month, usesInterest });
  const eur = (n: number) => formatEuro(locale, n);

  const pick = (key: "early" | "late") => {
    const preset = presets.find((p) => p.key === key);
    if (!preset) return;
    setWho(key);
    setDown(preset.down);
    setMonth(preset.month);
    setUsesInterest(preset.usesInterest);
    setFeePct(values.feePct);
  };
  const setDownCustom = (value: number) => {
    setDown(value);
    setWho("custom");
    const nextPlan = Math.round((values.price - value) / values.monthly);
    if (month > nextPlan - 1) setMonth(nextPlan - 1);
  };
  const setNumber = (key: "bank" | "deposit" | "rent", raw: string) => {
    setExtra((current) => ({ ...current, [key]: raw }));
    const parsed = parseFloat(raw);
    if (Number.isNaN(parsed) || parsed < 0) return;
    if (key === "bank") setBankRate(parsed);
    else if (key === "deposit") setDepositRate(parsed);
    else setRent(parsed);
  };

  const whoLabel = presets.find((p) => p.key === who)?.name ?? texts.custom;
  const { yesPositive, yesNegative } = texts;
  const verdict = usesInterest
    ? fill(R.result >= 0 ? yesPositive : yesNegative, { x: eur(Math.abs(R.result)) })
    : fill(texts.no, { n: R.N, t: R.T, d: R.N - R.T });
  const lines: [string, string][] = usesInterest
    ? [
        [texts.poolFee, eur(R.F)],
        [fill(texts.ownSaved, { t: R.T }), `−${eur(R.earned)}`],
        [fill(texts.ownLoan, { l: eur(R.L) }), eur(R.loanInterest)],
        [texts.ownNet, eur(R.ownWayCost)],
        [texts.difference, formatSignedEuro(locale, R.result)],
      ]
    : [
        [texts.rentValue, eur(R.rentSaved)],
        [texts.poolFee, `−${eur(R.F)}`],
        [texts.difference, formatSignedEuro(locale, R.result)],
      ];
  const waitShare = (R.T / R.N) * 100;
  const homeShare = 100 - waitShare;
  const ids = { down: "sim-down", month: "sim-month", fee: "sim-fee", bank: "sim-bank", deposit: "sim-deposit", rent: "sim-rent" };

  return (
    <>
      <div className="mt-[clamp(40px,6vw,72px)] grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] min-[981px]:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="grid gap-[22px]">
          <div className="grid gap-2.5">
            <span className={`${monoText} text-ink`}>{content.storyLabel}</span>
            <div role="group" className={seg}>
              {presets.map((preset, i) => (
                <button key={preset.key} type="button" aria-pressed={who === preset.key} onClick={() => pick(preset.key)} className={segButton(who === preset.key, i === 0)}>
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2.5">
            <span className={`${monoText} text-ink`}>{content.interestLabel}</span>
            <div role="group" className={seg}>
              {[
                { value: true, text: content.yes },
                { value: false, text: content.no },
              ].map((option, i) => (
                <button key={option.text} type="button" aria-pressed={usesInterest === option.value} onClick={() => setUsesInterest(option.value)} className={segButton(usesInterest === option.value, i === 0)}>
                  {option.text}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2.5">
            <label htmlFor={ids.down} className={label}>
              {content.downLabel} <output htmlFor={ids.down} className={output}>{eur(down)}</output>
            </label>
            <input id={ids.down} type="range" min={20000} max={120000} step={5000} value={down} onChange={(e) => setDownCustom(+e.target.value)} className={slider} />
          </div>
          <div className="grid gap-2.5">
            <label htmlFor={ids.month} className={label}>
              {content.monthLabel} <output htmlFor={ids.month} className={output}>{fill(texts.monthValue, { t: R.T })}</output>
            </label>
            <input
              id={ids.month}
              type="range"
              min={1}
              max={plan - 1}
              step={1}
              value={R.T}
              onChange={(e) => {
                setMonth(+e.target.value);
                setWho("custom");
              }}
              className={slider}
            />
            <span className="text-[13.5px] text-stone">{fill(texts.hint, { n: R.N, x: eur(R.paidIn) })}</span>
          </div>
          <div className="grid gap-2.5">
            <label htmlFor={ids.fee} className={label}>
              {content.feeLabel} <output htmlFor={ids.fee} className={output}>{`${formatPercent(locale, feePct)} = ${eur(R.F)}`}</output>
            </label>
            <input
              id={ids.fee}
              type="range"
              min={3}
              max={10}
              step={0.5}
              value={feePct}
              onChange={(e) => {
                setFeePct(+e.target.value);
                setWho("custom");
              }}
              className={slider}
            />
          </div>
          <details className="border-t border-rule pt-3">
            <summary className={`${monoText} flex min-h-8 cursor-pointer items-center text-ink`}>{content.moreLabel}</summary>
            <div className="mt-3 grid grid-cols-1 gap-3 min-[561px]:grid-cols-3">
              {(
                [
                  ["bank", content.bankRateLabel, "0.1", "10", "decimal"],
                  ["deposit", content.depositRateLabel, "0.1", "10", "decimal"],
                  ["rent", content.rentLabel, "50", "5000", "numeric"],
                ] as const
              ).map(([key, text, step, max, mode]) => (
                <label key={key} className="block">
                  <span className="mb-1.5 block font-mono text-[11px] tracking-[0.06em] text-stone uppercase">{text}</span>
                  <input type="number" id={ids[key]} step={step} min={0} max={max} inputMode={mode} value={extra[key]} onChange={(e) => setNumber(key, e.target.value)} className={numberInput} />
                </label>
              ))}
            </div>
          </details>
        </div>

        <div aria-live="polite" className="grid min-w-0 gap-[18px] border-t-4 border-ink bg-white p-[clamp(20px,3vw,32px)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className={monoText}>{whoLabel}</span>
            <span className={`${monoText} text-stone`}>{texts.constants}</span>
          </div>
          <div className={`font-display text-[clamp(44px,6vw,76px)] leading-[0.95] font-extrabold tracking-[-0.045em] whitespace-nowrap tabular-nums ${R.result >= 0 ? "text-positive" : "text-negative"}`}>
            {formatSignedEuro(locale, R.result)}
          </div>
          <p className="m-0 max-w-[44ch] font-display text-[clamp(18px,2vw,22px)] leading-[1.3] font-bold tracking-[-0.01em]">{verdict}</p>
          <div className="grid gap-2">
            <div className="flex h-[34px] border-[1.5px] border-ink">
              <div className="timeline-part flex items-center overflow-hidden bg-rule pl-2 font-mono text-[11px] whitespace-nowrap" style={{ flexBasis: `${waitShare}%` }}>
                {waitShare > 16 ? fill(texts.waiting, { t: R.T }) : ""}
              </div>
              <div className="timeline-part flex items-center justify-end overflow-hidden bg-ink pr-2 font-mono text-[11px] whitespace-nowrap text-paper" style={{ flexBasis: `${homeShare}%` }}>
                {homeShare > 22 ? fill(texts.home, { d: R.N - R.T }) : ""}
              </div>
            </div>
            <div className="flex justify-between text-[13px] text-stone">
              <span>{texts.signing}</span>
              <span>{fill(texts.lastInstalment, { n: R.N })}</span>
            </div>
          </div>
          <div>
            {lines.map(([text, amount], i) => (
              <div
                key={text}
                className={`grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b py-2.5 text-[15px] ${i === 0 ? "border-t-2 border-t-ink" : ""} ${
                  i === lines.length - 1 ? "border-b-2 border-b-ink font-extrabold" : "border-b-rule"
                }`}
              >
                <span>{text}</span>
                <b className="font-display tabular-nums">{amount}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-[22px] mb-0 max-w-[70ch] text-[14px] text-stone">{content.note}</p>
      <div className="mt-[clamp(40px,6vw,72px)] grid grid-cols-1 gap-5 min-[901px]:grid-cols-2">
        {content.stories.map((story) => (
          <ReportCardBlock key={story.tag} card={story} template={footnoteTemplate} onWhite />
        ))}
      </div>
      <div className="mt-5 grid gap-3.5 border-t-4 border-ink bg-paper p-[clamp(22px,3vw,34px)]">
        <span className={`${monoText} text-ink`}>{content.math.tag}</span>
        <p className="m-0 max-w-[40ch] font-display text-[clamp(22px,2.8vw,32px)] leading-[1.18] font-bold tracking-[-0.02em]">{content.math.first}</p>
        <p className="m-0 max-w-[62ch]">
          <ReportRefs text={content.math.body} template={footnoteTemplate} />
        </p>
      </div>
    </>
  );
}
