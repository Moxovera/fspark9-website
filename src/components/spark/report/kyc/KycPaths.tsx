"use client";

import { useState } from "react";
import KycPhone from "@/components/spark/report/kyc/KycPhone";
import { useStagger } from "@/components/spark/report/kyc/useStagger";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import type { KycPathsProps } from "@/types/content";

const chip = "inline-block border-[1.5px] border-current px-[7px] py-[3px] font-mono text-[10.5px] tracking-[0.08em] whitespace-nowrap text-ink uppercase";
const btn = "min-h-11 px-5 py-[13px] font-mono text-[12.5px] tracking-[0.08em] uppercase";

/**
 * 11 UK, Deniz'in iki yolu: AB ve UK telefonları yan yana (telefonda alt
 * alta), Back ve Next step düğmeleri, ilerleme kareleri ve adım sayısı.
 * Her adımda iki telefonun mesajları tek tek gelir. Son adımda düğme
 * "Play again" olur ve birinci adıma döner.
 */
export default function KycPaths({ paths, template }: KycPathsProps) {
  const [step, setStep] = useState(0);
  const stagger = useStagger();
  const total = paths.steps.length;
  const last = step === total - 1;
  const current = paths.steps[step];

  const go = (next: number) => {
    setStep(next);
    const s = paths.steps[next];
    stagger.play(Math.max(s.eu.length, s.uk.length));
  };

  const side = (label: string, clock: string, messages: typeof current.eu, why: string, key: string) => (
    <div className="grid min-w-0 justify-items-center gap-3.5">
      <div className="flex items-center gap-2.5">
        <span className={chip}>{label}</span>
      </div>
      <KycPhone clock={`${paths.stepLabel} ${step + 1} · ${clock}`} messages={messages} visible={stagger.visible} keyPrefix={`${key}${step}`} />
      <p className="m-0 max-w-[44ch] justify-self-stretch border-t border-rule bg-white p-3.5 text-left text-[15px]">
        <Psd3Text text={why} template={template} />
      </p>
    </div>
  );

  return (
    <>
      <div className="mt-5 grid grid-cols-1 gap-[clamp(18px,3vw,40px)] min-[761px]:grid-cols-2">
        {side(paths.euLabel, paths.euClock, current.eu, current.euWhy, "eu")}
        {side(paths.ukLabel, paths.ukClock, current.uk, current.ukWhy, "uk")}
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => go(step - 1)}
          className={`${btn} border-[1.5px] border-ink bg-transparent text-ink disabled:cursor-default disabled:opacity-35`}
        >
          {paths.backLabel}
        </button>{" "}
        <button type="button" onClick={() => go(last ? 0 : step + 1)} className={`${btn} bg-ink text-paper`}>
          {last ? paths.againLabel : paths.nextLabel}
        </button>{" "}
        <span aria-hidden="true" className="flex gap-1.5">
          {paths.steps.map((_, i) => (
            <i key={i} className={`block size-3 border-[1.5px] border-ink ${i <= step ? "bg-ink" : ""}`} />
          ))}
        </span>{" "}
        <span className="font-mono text-[12.5px] font-medium tracking-[0.08em] text-stone uppercase">
          {step + 1} / {total}
        </span>
      </div>
    </>
  );
}
