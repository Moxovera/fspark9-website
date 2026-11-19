"use client";

import { useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { pill } from "@/components/spark/report/uk/pill";
import type { UkTableBlockProps } from "@/types/content";

/**
 * Karşılaştırma ve matris tabloları: telefonda yatay kayar (en az 640px),
 * ilk sütun yapışkan. Kart tablosunda iki filtre düğmesi: "Hepsini göster"
 * ve "sadece şahıs şirketine açık kartlar" ("n" işaretli satırlar gizlenir).
 */
export default function UkTableBlock({ block, template, tone }: UkTableBlockProps) {
  const [only, setOnly] = useState(false);
  const bg = tone === "white" ? "bg-white" : "bg-paper";
  const head = tone === "white" ? "bg-paper" : "bg-white";
  const wide = block.columns.length > 4;
  return (
    <div className="grid gap-3">
      {block.filter && (
        <div className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={!only} onClick={() => setOnly(false)} className={pill(!only)}>
            {block.filter.all}
          </button>
          <button type="button" aria-pressed={only} onClick={() => setOnly(true)} className={pill(only)}>
            {block.filter.only}
          </button>
        </div>
      )}
      <div className="overflow-x-auto border-t-2 border-ink">
        <table className={`w-full border-collapse text-left text-[14.5px] ${wide ? "min-w-[880px]" : "min-w-[640px]"}`}>
          <thead>
            <tr>
              {block.columns.map((c, i) => (
                <th
                  key={`${c}-${i}`}
                  scope="col"
                  className={`border-b border-rule px-3 py-3 align-bottom font-mono text-[11.5px] font-medium tracking-[0.06em] text-stone uppercase ${head} ${i === 0 ? "sticky left-0 z-[1]" : ""}`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((r, ri) => {
              if (only && block.flags?.[ri] === "n") return null;
              return (
                <tr key={r[0] + ri} className="border-b border-rule last:border-b-0">
                  {r.map((cell, ci) =>
                    ci === 0 ? (
                      <th key={ci} scope="row" className={`sticky left-0 z-[1] px-3 py-3 align-top font-bold ${bg}`}>
                        <Psd3Text text={cell} template={template} />
                      </th>
                    ) : (
                      <td key={ci} className="px-3 py-3 align-top text-stone">
                        <Psd3Text text={cell} template={template} />
                      </td>
                    ),
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
