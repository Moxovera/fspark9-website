"use client";

import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { useTabs } from "@/components/spark/report/psd3/useTabs";
import type { KycStepsProps } from "@/types/content";

const label = "font-mono text-[12.5px] font-medium tracking-[0.08em] uppercase";

/**
 * 06 KYB: altı adım sekmesi (her biri gün tahminiyle) ve üç sütunlu panel
 * (bugün ne oluyor, bugün kim çözüyor, yarın ne olabilir). Ok tuşları,
 * Home ve End sekmeler arasında gezer.
 */
export default function KycSteps({ kyb, template }: KycStepsProps) {
  const tabs = useTabs(kyb.steps.length);
  const step = kyb.steps[tabs.index];
  const cols = [
    [kyb.todayLabel, step.today],
    [kyb.whoLabel, step.who],
    [kyb.nextLabel, step.next],
  ] as const;

  return (
    <>
      <div role="tablist" className="mt-4 grid grid-cols-1 min-[521px]:grid-cols-3 min-[901px]:grid-cols-6">
        {kyb.steps.map((s, i) => (
          <button
            key={s.name}
            ref={tabs.setRef(i)}
            type="button"
            role="tab"
            id={`kyb-tab-${i}`}
            aria-selected={i === tabs.index}
            aria-controls="kyb-panel"
            tabIndex={i === tabs.index ? 0 : -1}
            onClick={() => tabs.select(i)}
            onKeyDown={(e) => tabs.onKeyDown(e, i)}
            className={`-mr-[1.5px] -mb-[1.5px] grid min-w-0 gap-1 border-[1.5px] border-ink p-3.5 text-left ${i === tabs.index ? "bg-ink text-paper" : "bg-white"}`}
          >
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase">
              {kyb.stepLabel} {i + 1}
            </span>{" "}
            <span className="font-display text-[15px] leading-[1.2] font-bold">{s.name}</span>{" "}
            <span className={`font-mono text-[10.5px] ${i === tabs.index ? "text-dust" : "text-stone"}`}>
              {s.days ? `~${s.days} ${kyb.daysLabel}` : kyb.ongoingLabel}
            </span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="kyb-panel"
        aria-labelledby={`kyb-tab-${tabs.index}`}
        aria-live="polite"
        className="relative -mt-[1.5px] grid grid-cols-1 gap-6 border-[1.5px] border-ink bg-white p-[clamp(18px,3vw,28px)] min-[861px]:grid-cols-3"
      >
        {cols.map(([title, text], i) => (
          <div
            key={title}
            className={`grid min-w-0 content-start gap-2 ${i > 0 ? "border-t border-rule pt-4 min-[861px]:border-t-0 min-[861px]:border-l min-[861px]:pt-0 min-[861px]:pl-6" : ""}`}
          >
            <span className={label}>{title}</span>{" "}
            <p className="m-0 text-[15.5px]">
              <Psd3Text text={text} template={template} />
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
