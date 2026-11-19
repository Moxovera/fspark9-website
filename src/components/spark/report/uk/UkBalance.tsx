"use client";

import { useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import UkGroupDot from "@/components/spark/report/uk/UkGroupDot";
import UkPanel from "@/components/spark/report/uk/UkPanel";
import { useUkSelection } from "@/components/spark/report/uk/UkSelection";
import { GROUP_BG, formatMoney } from "@/components/spark/report/uk/groups";
import { useGrow } from "@/hooks/useGrow";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/icons";
import type { UkBalanceProps, UkBalanceRow, UkMetric } from "@/types/content";

const small = "font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase";
type SortKey = "name" | "group" | UkMetric;
const KEYS: (SortKey | null)[] = ["name", "group", "deposits", "loans", "ldr", "pbt", null];
const NUMERIC: SortKey[] = ["deposits", "loans", "ldr", "pbt"];
/** Kredi/mevduat ölçeği 0 ile 110; %100 çizgisi bu ölçekte. */
const LDR_MAX = 110;

/**
 * 04 Bilanço: dört soru sekmesi, seçilenin açıklaması, 14 bankanın tek
 * yatay çubuk grafiği (büyükten küçüğe, renk grup rengi). Altında kapalı
 * iki panel: sıralanabilir tam tablo (başlığa dokun, tekrar dokununca ters;
 * varsayılan mevduat büyükten küçüğe; telefonda ilk sütun yapışkan) ve
 * banka olmayanlar. Haritada seçilen bankanın satırı vurgulu. En altta üç okuma.
 */
export default function UkBalance({ balance, players, legend, locale, template, tone }: UkBalanceProps) {
  const [metric, setMetric] = useState<UkMetric>("deposits");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "deposits", dir: -1 });
  const { player } = useUkSelection();
  const { ref, on } = useGrow<HTMLDivElement>(metric);
  const m = balance.metrics.find((x) => x.key === metric) ?? balance.metrics[0];
  const bars = [...balance.rows].sort((a, b) => b[metric] - a[metric]);
  const max = metric === "ldr" ? LDR_MAX : Math.max(...bars.map((r) => r[metric]));
  const highlight = players.find((p) => p.key === player)?.bank ?? null;
  const value = (r: UkBalanceRow, k: SortKey) => (k === "name" ? r.name : k === "group" ? legend[r.group] : r[k]);
  const table = [...balance.rows].sort((a, b) => {
    const x = value(a, sort.key);
    const y = value(b, sort.key);
    return typeof x === "number" && typeof y === "number" ? (x - y) * sort.dir : String(x).localeCompare(String(y), locale) * sort.dir;
  });
  const onSort = (k: SortKey) =>
    setSort((s) => (s.key === k ? { key: k, dir: s.dir === 1 ? -1 : 1 } : { key: k, dir: NUMERIC.includes(k) ? -1 : 1 }));
  const contrast = tone === "white" ? "bg-paper" : "bg-white";
  const hl = "bg-[color-mix(in_srgb,var(--flare)_24%,var(--white))]";

  return (
    <div className="grid gap-[clamp(28px,4vw,40px)]">
      <div className="grid gap-4">
        <span className={`${small} text-stone`}>{balance.ask}</span>
        <div className="grid grid-cols-2 gap-2 min-[901px]:grid-cols-4">
          {balance.metrics.map((x) => {
            const sel = x.key === metric;
            return (
              <button
                key={x.key}
                type="button"
                aria-pressed={sel}
                onClick={() => setMetric(x.key)}
                className={`grid min-h-11 content-start gap-1 border-[1.5px] border-ink px-3.5 py-3 text-left text-[15px] leading-[1.3] font-semibold transition-colors duration-150 ease-brand motion-reduce:transition-none max-[600px]:text-[14px] ${
                  sel ? "on-ink bg-ink text-paper" : "text-ink hover:bg-ink/5"
                }`}
              >
                {x.question}
                <small className={`font-mono text-[11px] font-medium tracking-[0.06em] uppercase ${sel ? "text-flare" : "text-stone"}`}>{x.label}</small>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="m-0 max-w-[760px] text-[16px] text-stone">
          {m.explain}
        </p>
        <div ref={ref} className="grid gap-[7px]">
          {bars.map((r) => (
            <div key={r.key} className="grid grid-cols-[200px_minmax(0,1fr)_92px] items-center gap-3 text-[15px] max-[600px]:grid-cols-[118px_minmax(0,1fr)_70px] max-[600px]:text-[13px]">
              <span className="flex min-w-0 items-center gap-[7px] font-semibold">
                <UkGroupDot group={r.group} className="size-[9px]" />
                <span className="leading-[1.2]">{r.name}</span>
              </span>
              <span className={`relative block h-5 overflow-hidden ${contrast}`}>
                <span
                  data-grow={on ? "on" : "off"}
                  className={`uk-grow uk-grow-w block h-full min-w-[2px] ${GROUP_BG[r.group]}`}
                  style={{ width: `${((r[metric] / max) * 100).toFixed(2)}%` }}
                />
                {metric === "ldr" && (
                  <span aria-hidden="true" className="absolute inset-y-0 border-l border-dashed border-ink" style={{ left: `${(100 / LDR_MAX) * 100}%` }} />
                )}
              </span>
              <span className="text-right font-mono text-[14px] tabular-nums max-[600px]:text-[12.5px]">{formatMoney(r[metric], metric, locale)}</span>
            </div>
          ))}
        </div>
        <p className={`${small} m-0 text-stone`}>{metric === "ldr" ? balance.ldrUnit : balance.unit}</p>
      </div>

      <div className="grid gap-3">
        <UkPanel title={balance.fullTitle} tone={tone}>
          <p className="mx-1 mt-0 mb-2.5 text-[13.5px] text-stone">{balance.fullHint}</p>
          <div className="overflow-x-auto border-t border-rule">
            <table className="w-full min-w-[900px] border-collapse text-left text-[14px]">
              <thead>
                <tr>
                  {balance.columns.map((c, i) => {
                    const k = KEYS[i];
                    const active = k !== null && sort.key === k;
                    const num = k !== null && NUMERIC.includes(k);
                    return (
                      <th
                        key={c}
                        scope="col"
                        aria-sort={active ? (sort.dir === -1 ? "descending" : "ascending") : undefined}
                        className={`border-b border-rule px-2.5 py-0 align-bottom font-mono text-[11.5px] font-medium tracking-[0.06em] whitespace-nowrap uppercase ${contrast} ${
                          num ? "text-right" : ""
                        } ${i === 0 ? "sticky left-0 z-[2]" : ""} ${active ? "text-ink" : "text-stone"}`}
                      >
                        {k ? (
                          <button type="button" onClick={() => onSort(k)} className={`inline-flex min-h-11 items-center gap-1 uppercase ${num ? "justify-end" : ""}`}>
                            {c}
                            {active && (sort.dir === -1 ? <ArrowDownIcon className="size-3.5" /> : <ArrowUpIcon className="size-3.5" />)}
                          </button>
                        ) : (
                          <span className="inline-flex min-h-11 items-center">{c}</span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {table.map((r) => {
                  const lit = r.key === highlight;
                  const cell = lit ? hl : "";
                  return (
                    <tr key={r.key} className="border-b border-rule last:border-b-0">
                      <th scope="row" className={`sticky left-0 z-[1] px-2.5 py-[11px] align-top font-bold whitespace-nowrap ${lit ? hl : contrast}`}>
                        <span className="inline-flex items-center gap-[7px]">
                          <UkGroupDot group={r.group} className="size-[9px]" />
                          {r.name}
                        </span>{" "}
                        <Psd3Text text={r.refs} template={template} />
                      </th>
                      <td className={`px-2.5 py-[11px] align-top text-[13px] whitespace-nowrap text-stone ${cell}`}>{legend[r.group]}</td>
                      {NUMERIC.map((k) => (
                        <td key={k} className={`px-2.5 py-[11px] text-right align-top font-mono text-[13.5px] whitespace-nowrap tabular-nums ${cell}`}>
                          {formatMoney(r[k as UkMetric], k as UkMetric, locale)}
                        </td>
                      ))}
                      <td className={`min-w-[200px] px-2.5 py-[11px] align-top text-[13.5px] text-stone ${cell}`}>
                        <Psd3Text text={r.sme} template={template} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </UkPanel>

        <UkPanel title={balance.nonbankTitle} tone={tone}>
          <p className="mx-1 mt-0 mb-3.5 text-[15.5px] text-stone">{balance.nonbankIntro}</p>
          <div className="overflow-x-auto border-t border-rule">
            <table className="w-full min-w-[880px] border-collapse text-left text-[14.5px]">
              <thead>
                <tr>
                  {balance.nonbankColumns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`border-b border-rule px-3 py-3 align-bottom font-mono text-[11.5px] font-medium tracking-[0.06em] text-stone uppercase ${contrast} ${i === 0 ? "sticky left-0 z-[1]" : ""}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {balance.nonbank.map((n) => (
                  <tr key={n.name} className="border-b border-rule last:border-b-0">
                    <th scope="row" className={`sticky left-0 z-[1] px-3 py-3 align-top font-bold whitespace-nowrap ${contrast}`}>
                      <span className="inline-flex items-center gap-[7px]">
                        <UkGroupDot group={n.group} className="size-[9px]" />
                        {n.name}
                      </span>
                    </th>
                    {[n.what, n.scale, n.money].map((t, i) => (
                      <td key={i} className="px-3 py-3 align-top text-stone">
                        <Psd3Text text={t} template={template} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </UkPanel>
      </div>

      <div className="grid gap-4">
        <h3 className={`${small} m-0 text-stone`}>{balance.readingTitle}</h3>
        <div className="grid grid-cols-1 gap-4 min-[901px]:grid-cols-3">
          {balance.readings.map((r) => (
            <div key={r.title} className="grid content-start gap-1 border-l-[3px] border-ink pl-3.5">
              <b className="font-display text-[18px] leading-[1.25]">{r.title}</b>
              <p className="m-0 text-[15.5px] text-stone">
                <Psd3Text text={r.text} template={template} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
