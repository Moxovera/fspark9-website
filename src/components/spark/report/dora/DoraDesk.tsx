"use client";

import { useState } from "react";
import { ChoiceOptions } from "@/components/spark/decisions/ChoiceDecision";
import type { DoraDeskProps } from "@/types/content";

/**
 * "Sen olsan ne yapardın?" masası (görev §6): üç seçenek, seçince "Bizim
 * bakışımız" açılır. Seçim değiştirilebilir; doğru/yanlış işareti, puan ve
 * başka okurların oyları yok, hiçbir şey gönderilmez ya da saklanmaz.
 * Bakış sunucuda render ediliyor (JS kapalıyken görünür), JS açıksa seçime
 * kadar gizli (`.js .choice-reveal`).
 */
export default function DoraDesk({ options, groupLabel, children }: DoraDeskProps) {
  const [chosen, setChosen] = useState<string | null>(null);
  return (
    <>
      <ChoiceOptions options={options} chosen={chosen} onChoose={setChosen} groupLabel={groupLabel} />
      <div aria-live="polite" data-open={chosen ? "" : undefined} className="choice-reveal mt-5 border-t border-rule pt-5">
        {children}
      </div>
    </>
  );
}
