"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import type { ApproachBlock } from "@/types/content";

interface ApproachAccordionProps {
  blocks: ApproachBlock[];
}

// Mobilde (<900px) her blok kapalı başlar, sadece numara+başlık görünür.
// dc.html'de mobil kart her zaman açık (masaüstündeki :has() hover-
// accordion'ın mobil karşılığı yok) — bu kasıtlı bir sapma, sayfanın
// aşırı uzamasını önlemek için (Services'teki aynı kararla tutarlı,
// bkz. FSPARK9-DURUM.md "Bilinçli tasarım sapmaları").
//
// AudienceAccordion/ServicesAccordion'daki openIndex deseniyle aynı:
// tıklama doğrudan set ediyor (toggle değil), bir bloğu açmak diğerini
// otomatik kapatıyor. Kapatma ayrı bir ✕ butonuyla (.accordion-close-btn,
// üç accordion'ın da paylaştığı jenerik class).
//
// Masaüstündeki .approach-row/.approach-panel ağacı (Approach.tsx,
// hover-accordion, :has() ile sıfır JS) bu bileşenden tamamen bağımsız
// — iki ayrı ağaç, CSS breakpoint'le seçiliyor, birbirini etkilemiyor.
export default function ApproachAccordion({ blocks }: ApproachAccordionProps) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="mt-14 flex flex-col gap-[30px]">
      {blocks.map((block, i) => {
        const isOpen = openIndex === i;
        const numberText = String(block.number).padStart(2, "0");

        return (
          <Reveal
            key={block.number}
            className="rounded-[14px] bg-[color-mix(in_srgb,var(--bronze)_3%,var(--ivory)_97%)] p-[26px]"
          >
            {isOpen ? (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-3 font-mono text-xs tracking-[0.12em] text-bronze">
                      {numberText}
                    </p>
                    <h4 className="font-display text-[1.22rem] leading-[1.3] font-semibold text-navy">
                      {block.title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(-1)}
                    aria-label="Close"
                    className="accordion-close-btn focus-visible:outline-bronze flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-transparent text-[17px] leading-none text-navy focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    ✕
                  </button>
                </div>
                <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.65] text-charcoal">
                  {block.body}
                </p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-expanded={false}
                className="focus-visible:outline-bronze flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <div className="min-w-0">
                  <p className="mb-3 font-mono text-xs tracking-[0.12em] text-bronze">
                    {numberText}
                  </p>
                  <h4 className="font-display text-[1.22rem] leading-[1.3] font-semibold text-navy">
                    {block.title}
                  </h4>
                </div>
                <span className="shrink-0 text-xl text-bronze">→</span>
              </button>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
