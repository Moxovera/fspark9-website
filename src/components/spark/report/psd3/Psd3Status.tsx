"use client";

import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { useTabs } from "@/components/spark/report/psd3/useTabs";
import type { Psd3StatusProps } from "@/types/content";

const MARKER = {
  done: "before:bg-ink",
  now: "before:border-2 before:border-ink before:bg-flare",
  future: "before:border-2 before:border-ink before:bg-white",
} as const;

/** 02 Where things stand: iki sekme (PSD3 ve PSR, FiDA), her biri dikey zaman çizelgesi. */
export default function Psd3Status({ status, template }: Psd3StatusProps) {
  const { index, select, onKeyDown, setRef } = useTabs(status.tabs.length);
  const tab = status.tabs[index];

  return (
    <>
      <div role="tablist" aria-label={status.tabsLabel} className="inline-flex flex-wrap border-[1.5px] border-ink">
        {status.tabs.map((t, i) => (
          <button
            key={t.id}
            ref={setRef(i)}
            type="button"
            role="tab"
            id={`status-tab-${t.id}`}
            aria-selected={i === index}
            aria-controls="status-panel"
            tabIndex={i === index ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`px-[18px] py-[11px] font-mono text-[12px] tracking-[0.08em] uppercase transition-[background-color,color] duration-[160ms] ease-brand motion-reduce:transition-none ${i > 0 ? "border-l-[1.5px] border-ink" : ""} ${i === index ? "bg-ink text-paper" : "hover:bg-paper"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="status-panel"
        aria-labelledby={`status-tab-${tab.id}`}
        className="mt-[30px] ml-1.5 grid border-l-2 border-ink"
      >
        {tab.items.map((item) => (
          <div
            key={item.date + item.text}
            className={`relative grid grid-cols-1 items-baseline gap-1.5 border-b border-rule py-4 pl-[26px] before:absolute before:top-[22px] before:-left-[7px] before:size-3 before:content-[''] min-[701px]:grid-cols-[150px_1fr_auto] min-[701px]:gap-5 ${MARKER[item.state]}`}
          >
            <span className="font-mono text-[12.5px] tracking-[0.06em] uppercase">{item.date}</span>{" "}
            <span className="min-w-0 text-[16px]">
              <Psd3Text text={item.text} template={template} />
            </span>{" "}
            <span
              className={`justify-self-start border-[1.5px] border-current px-[7px] py-[3px] font-mono text-[10.5px] tracking-[0.08em] whitespace-nowrap uppercase ${item.state === "future" ? "border-dashed text-stone" : "text-ink"}`}
            >
              {item.chip}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
