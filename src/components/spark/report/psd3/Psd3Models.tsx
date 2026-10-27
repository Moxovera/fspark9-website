"use client";

import { useState } from "react";
import { fill } from "@/lib/format";
import type { Psd3ModelsProps } from "@/types/content";

/** 09 Business models: on iki kart ve kimin kurmaya en uygun olduğuna göre süzgeç. */
export default function Psd3Models({ models }: Psd3ModelsProps) {
  const [filter, setFilter] = useState("all");
  const kv = "grid gap-[3px] text-[14.5px]";
  const kvLabel = "font-mono text-[10.5px] font-medium tracking-[0.08em] uppercase";

  return (
    <>
      <div className="mb-[22px] flex flex-wrap items-center gap-2.5">
        <div className="grid w-full grid-cols-2 gap-[1.5px] border-[1.5px] border-ink bg-ink min-[561px]:inline-flex min-[561px]:w-auto min-[561px]:flex-wrap min-[561px]:gap-0 min-[561px]:bg-transparent">
          {models.filters.map((f, i) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={f.id === filter}
              onClick={() => setFilter(f.id)}
              className={`px-[18px] py-[11px] font-mono text-[12px] tracking-[0.08em] uppercase transition-[background-color,color] duration-[160ms] ease-brand motion-reduce:transition-none ${i > 0 ? "min-[561px]:border-l-[1.5px] min-[561px]:border-ink" : ""} ${f.id === filter ? "bg-ink text-paper" : "bg-white min-[561px]:bg-transparent min-[561px]:hover:bg-paper"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[18px] min-[401px]:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
        {models.items.map((m, i) => (
          <article
            key={m.name}
            hidden={filter !== "all" && !m.builders.includes(filter)}
            className="grid min-w-0 content-start gap-3 border-t-2 border-ink bg-paper p-5"
          >
            <span className="font-mono text-[11.5px] tracking-[0.08em] text-stone">{fill(models.numberTemplate, { n: String(i + 1).padStart(2, "0") })}</span>
            <h3 className="m-0 font-display text-[21px] leading-[1.15] font-extrabold tracking-[-0.015em]">{m.name}</h3>
            <div className={kv}>
              <b className={kvLabel}>{models.triggerLabel}</b> <span>{m.trigger}</span>
            </div>
            <div className={kv}>
              <b className={kvLabel}>{models.moneyLabel}</b> <span>{m.money}</span>
            </div>
            <div className={kv}>
              <b className={kvLabel}>{models.useCaseLabel}</b> <span>{m.useCase}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {m.builderLabels.map((b) => (
                <span key={b} className="border border-stone px-1.5 py-0.5 font-mono text-[10.5px] tracking-[0.06em] text-stone uppercase">
                  {b}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
