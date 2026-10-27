"use client";

import { useEffect, useRef, useState } from "react";
import Psd3Text, { Psd3Refs } from "@/components/spark/report/psd3/Psd3Text";
import { reducedMotion } from "@/components/spark/report/psd3/tabKeys";
import type { Psd3ChangesProps } from "@/types/content";

const FLIP_MS = 160;

/**
 * 04 What changes: PSD2 ve PSR dünyası arasındaki anahtar on dört kartı
 * birden çevirir. Anahtar hemen döner; kartların metni 160ms soluklaşıp
 * yeni dünyayla gelir (prototip `.flipping`). PSD2 dünyasında kart sadece
 * başlık, etiket ve eski metin; "In practice" satırı sadece PSR dünyasında.
 */
export default function Psd3Changes({ changes, template }: Psd3ChangesProps) {
  const [checked, setChecked] = useState(true);
  const [shown, setShown] = useState(true);
  const [flipping, setFlipping] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    window.clearTimeout(timer.current);
    if (reducedMotion()) {
      setShown(next);
      return;
    }
    setFlipping(true);
    timer.current = window.setTimeout(() => {
      setShown(next);
      setFlipping(false);
    }, FLIP_MS);
  };

  return (
    <>
      <div className="mb-[26px] flex flex-wrap items-center gap-4">
        <button type="button" role="switch" aria-checked={checked} onClick={toggle} className="inline-flex items-center gap-3.5">
          <span className={`font-mono text-[12.5px] tracking-[0.08em] uppercase ${checked ? "text-stone" : ""}`}>{changes.oldLabel}</span>{" "}
          <span aria-hidden="true" className="relative h-8 w-16 border-2 border-ink bg-white">
            <span
              className={`absolute top-[3px] left-[3px] size-[22px] bg-ink transition-transform duration-[240ms] ease-brand motion-reduce:transition-none ${checked ? "translate-x-8" : ""}`}
            />
          </span>{" "}
          <span className={`font-mono text-[12.5px] tracking-[0.08em] uppercase ${checked ? "" : "text-stone"}`}>{changes.newLabel}</span>
        </button>{" "}
        <span className="text-[14px] text-stone">
          <Psd3Text text={changes.note} template={template} />
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4">
        {changes.items.map((c) => (
          <article key={c.title} className="grid min-w-0 content-start gap-2.5 border-t-2 border-ink bg-white px-[18px] pt-[18px] pb-5">
            <div className="flex items-center justify-between gap-2.5">
              <h3 className="m-0 font-display text-[21px] leading-[1.15] font-extrabold tracking-[-0.015em]">{c.title}</h3>{" "}
              <span
                className={`border-[1.5px] border-current px-[7px] py-[3px] font-mono text-[10.5px] tracking-[0.08em] whitespace-nowrap uppercase ${shown ? "text-ink" : "border-dashed text-stone"}`}
              >
                {c.who}
              </span>
            </div>
            <p
              className={`m-0 min-h-[5.2em] text-[15.5px] transition-opacity duration-[240ms] ease-brand motion-reduce:transition-none ${flipping ? "opacity-15" : ""}`}
            >
              <Psd3Text text={shown ? c.new : c.old} template={template} /> <Psd3Refs sources={c.sources} template={template} />
            </p>
            {shown && (
              <p className="m-0 border-t border-rule pt-2.5 text-[14px] text-stone">
                <b className="mb-1 block font-mono text-[11px] font-medium tracking-[0.08em] text-ink uppercase">{changes.practiceLabel}</b>{" "}
                <Psd3Text text={c.practice} template={template} />
              </p>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
