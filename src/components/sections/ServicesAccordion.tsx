"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import type { Service } from "@/types/content";

interface ServicesAccordionProps {
  items: Service[];
  labels: { problem: string; action: string; outcome: string };
}

// Mobilde (<900px) her hizmet kapalı başlar, sadece numara+tag+başlık
// görünür. dc.html'de mobil kart her zaman açık (accordion yok) — bu
// kasıtlı bir sapma, sayfanın dikeyde çok uzamasını önlemek için
// (bkz. FSPARK9-DURUM.md "Bilinçli tasarım sapmaları").
//
// AudienceAccordion'daki openIndex deseniyle aynı: tıklama doğrudan set
// ediyor (toggle değil), bir kartı açmak diğerini otomatik kapatıyor.
// Kapatma ayrı bir ✕ butonuyla (AudienceAccordion'daki whoClose ile
// aynı). AudienceAccordion'ın hover-peek animasyonu (hoverIndex,
// peekStyle, iconStyle) buraya taşınmadı — mouse hover'a bağlı, bu
// dokunmatik/mobil-öncelikli bağlamda karşılığı yok.
export default function ServicesAccordion({ items, labels }: ServicesAccordionProps) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="flex flex-col gap-5">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const numberText = String(item.number).padStart(2, "0");

        return (
          <Reveal
            key={item.slug}
            className="rounded-[18px] border border-navy/12 bg-[color-mix(in_srgb,var(--ivory)_50%,white_50%)] p-[26px]"
          >
            {isOpen ? (
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-3 font-mono text-[11.5px] tracking-[0.14em] text-bronze uppercase">
                      {numberText} · {item.tag}
                    </p>
                    <h3 className="font-display text-[1.45rem] leading-[1.18] font-medium text-navy">
                      {item.title}
                    </h3>
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
                <div className="mt-5">
                  <p className="mb-2 font-mono text-[11.5px] tracking-[0.12em] text-muted uppercase">
                    {labels.problem}
                  </p>
                  <p className="mb-5 text-[15px] leading-[1.62] text-charcoal">{item.problem}</p>
                  <p className="mb-2 font-mono text-[11.5px] tracking-[0.12em] text-muted uppercase">
                    {labels.action}
                  </p>
                  <p className="mb-5 text-[15px] leading-[1.62] text-charcoal">{item.action}</p>
                  <p className="mb-2 font-mono text-[11.5px] tracking-[0.12em] text-bronze uppercase">
                    {labels.outcome}
                  </p>
                  <p className="text-[15px] leading-[1.62] text-charcoal">{item.outcome}</p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-expanded={false}
                className="focus-visible:outline-bronze flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <div>
                  <p className="mb-3 font-mono text-[11.5px] tracking-[0.14em] text-bronze uppercase">
                    {numberText} · {item.tag}
                  </p>
                  <h3 className="font-display text-[1.45rem] leading-[1.18] font-medium text-navy">
                    {item.title}
                  </h3>
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
