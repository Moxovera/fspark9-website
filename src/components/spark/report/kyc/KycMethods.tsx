"use client";

import { useEffect, useRef, useState } from "react";
import Psd3Text, { Psd3Refs } from "@/components/spark/report/psd3/Psd3Text";
import { reducedMotion } from "@/components/spark/report/psd3/tabKeys";
import type { KycMethodsProps } from "@/types/content";

const FLIP_MS = 160;
const label = "font-mono text-[12.5px] tracking-[0.08em] uppercase transition-colors duration-[240ms] ease-brand motion-reduce:transition-none";

/**
 * 03 Rules: Today / After AMLR düğmesi (role="switch") altı yöntem
 * kartını çevirir. Kartlar 160ms'de soluklaşır, yeni durumla geri gelir
 * (referans `.flip`). Ana yöntem Ink kart, yedek ya da yok beyaz kart
 * ve kesik çizgili etiket.
 */
export default function KycMethods({ rules, template }: KycMethodsProps) {
  const [after, setAfter] = useState(true);
  const [flipping, setFlipping] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const toggle = () => {
    const next = !after;
    window.clearTimeout(timer.current);
    if (reducedMotion()) {
      setAfter(next);
      return;
    }
    setFlipping(true);
    timer.current = window.setTimeout(() => {
      setAfter(next);
      setFlipping(false);
    }, FLIP_MS);
  };

  const stateLabel = (s: number) => (s === 1 ? rules.mainLabel : s === 0 ? rules.fallbackLabel : rules.noneLabel);

  return (
    <>
      <div className="mb-[22px] flex flex-wrap items-center gap-4">
        <button type="button" role="switch" aria-checked={after} onClick={toggle} className="inline-flex min-h-11 items-center gap-3.5 border-0 bg-transparent p-0">
          <span className={`${label} ${after ? "text-stone" : ""}`}>{rules.todayLabel}</span>{" "}
          <span aria-hidden="true" className="relative h-8 w-16 border-2 border-ink bg-white">
            <span
              className={`absolute top-[3px] left-[3px] size-[22px] bg-ink transition-transform duration-[240ms] ease-brand motion-reduce:transition-none ${after ? "translate-x-8" : ""}`}
            />
          </span>{" "}
          <span className={`${label} ${after ? "" : "text-stone"}`}>{rules.afterLabel}</span>
        </button>{" "}
        <span className="text-[14px] text-stone">{rules.legend}</span>
      </div>
      <div aria-live="polite" className="grid grid-cols-1 gap-3.5 min-[561px]:grid-cols-2 min-[901px]:grid-cols-3">
        {rules.methods.map((m) => {
          const state = after ? m.after : m.before;
          const main = state === 1;
          return (
            <article
              key={m.name}
              className={`grid min-w-0 content-start gap-2.5 border-t-2 border-ink p-[18px] transition-opacity duration-[240ms] ease-brand motion-reduce:transition-none ${main ? "on-ink bg-ink text-paper" : "bg-white"} ${flipping ? "opacity-20" : ""}`}
            >
              <span
                className={`justify-self-start border-[1.5px] px-[7px] py-[3px] font-mono text-[10.5px] tracking-[0.08em] whitespace-nowrap uppercase ${main ? "border-current text-flare" : "border-dashed border-current text-stone"}`}
              >
                {stateLabel(state)}
              </span>{" "}
              <h3 className="m-0 font-display text-[20px] leading-[1.18] font-extrabold tracking-[-0.015em]">{m.name}</h3>{" "}
              <p className="m-0 text-[15px]">
                <Psd3Text text={after ? m.afterText : m.today} template={template} /> <Psd3Refs sources={m.sources} template={template} />
              </p>
            </article>
          );
        })}
      </div>
    </>
  );
}
