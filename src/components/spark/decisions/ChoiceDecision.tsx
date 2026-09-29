"use client";

import { useEffect, useRef, useState } from "react";
import { monoText } from "@/components/spark/decisions/styles";
import type { ChoiceDecisionProps, ChoiceOptionsProps } from "@/types/content";

/**
 * Seçenek düğmeleri (prototip son-gun-02-nuri-v2 `.opts`): kare, 2px Ink
 * çerçeve, solda mono harf, `aria-pressed`. Seçilen Ink dolgu, diğerleri
 * %45. `groupLabel` grubun erişilebilir adı; `labelledBy` verilirse o.
 * Karar bloğunda ve okur sorusunda ortak.
 */
export function ChoiceOptions({ options, chosen, onChoose, groupLabel, labelledBy }: ChoiceOptionsProps) {
  return (
    <div role="group" aria-label={labelledBy ? undefined : groupLabel} aria-labelledby={labelledBy} className="mt-4 flex flex-col gap-[10px]">
      {options.map((option) => {
        const pressed = chosen === option.key;
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={pressed}
            onClick={() => onChoose(option.key)}
            className={`decision-option grid min-h-11 cursor-pointer grid-cols-[32px_1fr] items-start gap-3 border-2 border-ink px-4 py-[14px] text-left text-[17px] leading-[1.45] ${
              pressed ? "bg-ink text-paper" : `bg-white text-ink hover:bg-paper ${chosen ? "opacity-45" : ""}`
            }`}
          >
            <span className={`${monoText} pt-[2px]`}>{option.key}</span>
            <span>{option.text}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Karar bloğunun etkileşimli kısmı: soru, üç seçenek, "Seçmeden göster" ve
 * "Gerçekte". Gerçekte içeriği (children) sunucuda render ediliyor: JS
 * kapalıyken görünür ve indekslenir, JS açıksa seçime kadar gizli
 * (`.js .choice-reveal`). Seçim sadece bu bileşenin state'inde.
 */
export default function ChoiceDecision({ options, record, labels, children }: ChoiceDecisionProps) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);

  // "Seçmeden göster" kaybolunca odak açılan bölüme geçer.
  useEffect(() => {
    if (skipped) revealRef.current?.focus();
  }, [skipped]);

  const result = chosen ? (chosen === record ? labels.match : labels.noMatch) : "";

  return (
    <>
      <p className="mt-7 mb-0 font-display text-[22px] leading-[1.2] font-extrabold tracking-[-0.015em]">{labels.ask}</p>
      <ChoiceOptions
        options={options}
        chosen={chosen}
        groupLabel={labels.ask}
        onChoose={(key) => {
          setChosen(key);
          setOpen(true);
        }}
      />
      {!open && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setSkipped(true);
          }}
          className={`${monoText} mt-[14px] min-h-11 cursor-pointer border-0 bg-transparent p-0 text-stone underline underline-offset-4`}
        >
          {labels.skip}
        </button>
      )}
      <div ref={revealRef} tabIndex={-1} data-open={open ? "" : undefined} className="choice-reveal mt-[26px] border-t border-rule pt-[22px]">
        <p aria-live="polite" className={`${monoText} m-0 flex items-center gap-[10px] empty:hidden ${result ? "mb-[14px]" : ""}`}>
          {result && (
            <>
              <i aria-hidden="true" className="inline-block size-[10px] bg-ink" />
              <span>{result}</span>
            </>
          )}
        </p>
        <p className={`${monoText} mt-[14px] mb-[14px] text-stone`}>{labels.revealLabel}</p>
        {children}
      </div>
    </>
  );
}
