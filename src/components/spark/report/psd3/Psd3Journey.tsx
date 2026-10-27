"use client";

import { useTabs } from "@/components/spark/report/psd3/useTabs";
import type { Psd3JourneyProps } from "@/types/content";

/**
 * 10 UK lens, "Follow a scam payment": beş adım, biri seçili; paneli neyi
 * durdurduğunu ve savunmaları gösterir. "From the field" etiketi sadece
 * verisinde olan savunmada.
 */
export default function Psd3Journey({ journey }: Psd3JourneyProps) {
  const { index, select, onKeyDown, setRef } = useTabs(journey.steps.length);
  const step = journey.steps[index];

  return (
    <>
      <div role="tablist" aria-label={journey.heading} className="mt-3.5 grid grid-cols-1 min-[761px]:grid-cols-5">
        {journey.steps.map((s, i) => (
          <button
            key={s.step}
            ref={setRef(i)}
            type="button"
            role="tab"
            id={`journey-tab-${i}`}
            aria-selected={i === index}
            aria-controls="journey-panel"
            tabIndex={i === index ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`grid min-w-0 gap-1 border-[1.5px] border-ink p-3.5 text-left ${i > 0 ? "border-t-0 min-[761px]:border-t-[1.5px] min-[761px]:border-l-0" : ""} ${i === index ? "bg-ink text-paper" : "bg-white"}`}
          >
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase">{s.step}</span>{" "}
            <span className="font-display text-[15.5px] leading-[1.2] font-bold">{s.name}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="journey-panel"
        aria-labelledby={`journey-tab-${index}`}
        aria-live="polite"
        className="grid grid-cols-1 items-start gap-6 border-[1.5px] border-t-0 border-ink bg-white p-[clamp(18px,3vw,28px)] min-[761px]:grid-cols-2"
      >
        <div className="grid gap-1.5">
          <span className="font-mono text-[11.5px] font-medium tracking-[0.08em] uppercase">{journey.stopsLabel}</span>{" "}
          <p className="m-0 font-display text-[clamp(19px,2.2vw,24px)] leading-[1.25] font-bold">{step.stops}</p>
        </div>
        <div className="grid gap-3.5">
          {step.defences.map((d) => (
            <div key={d.title} className="grid gap-1 border-b border-rule pb-3">
              {d.field && (
                <>
                  <em className="font-mono text-[10.5px] tracking-[0.08em] text-stone uppercase not-italic">{d.field}</em>{" "}
                </>
              )}
              <b className="font-display text-[16.5px] font-bold">{d.title}</b>{" "}
              <span className="text-[15px]">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
