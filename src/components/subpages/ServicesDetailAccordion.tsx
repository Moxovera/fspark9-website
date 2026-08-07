"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import type { Service, ServicesSection } from "@/types/content";

interface ServicesDetailAccordionProps {
  items: Service[];
  labels: ServicesSection["labels"];
}

// dc.html: /services narrow görünümü (satır 775-792) her kartı hep açık
// gösteriyor. Home'un ServicesAccordion.tsx'inde zaten kurulan kapalı
// başlayan accordion deseni (bkz. o dosyadaki yorum — sayfanın aşırı
// uzamasını önlemek için bilinçli sapma) burada da uygulanıyor, aynı
// gerekçeyle: 4 kart × 4 satır, hep açık olsaydı çok daha uzun olurdu.
// dc.html'de numara rozeti YOK (svcTabs'ta `num` alanı yok) — bu yüzden
// ServicesAccordion'daki "01 · Decide" değil, sadece tag gösteriliyor.
const ROW_ACCENTS = [
  "var(--bronze)",
  "var(--muted)",
  "var(--navy)",
  "color-mix(in srgb, var(--bronze) 80%, var(--navy) 20%)",
];

function rowsFor(item: Service, labels: ServicesSection["labels"]) {
  return [
    { label: labels.rightDoor, text: item.rightDoor },
    { label: labels.notRightDoor, text: item.notRightDoor },
    { label: labels.duration, text: item.duration },
    { label: labels.runsOn, text: item.runsOn },
  ];
}

export default function ServicesDetailAccordion({ items, labels }: ServicesDetailAccordionProps) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="flex flex-col gap-5">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const rows = rowsFor(item, labels);

        return (
          <Reveal
            key={item.slug}
            className="overflow-hidden rounded-[18px] border border-navy/12 bg-[color-mix(in_srgb,var(--ivory)_50%,white_50%)]"
          >
            {isOpen ? (
              <div>
                <div className="flex items-start justify-between gap-4 bg-navy px-6 py-6">
                  <div>
                    <p className="mb-2 font-mono text-[11.5px] tracking-[0.14em] text-bronze uppercase">
                      {item.tag}
                    </p>
                    <h2 className="font-display text-[1.4rem] leading-[1.16] font-medium text-ivory">
                      {item.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(-1)}
                    aria-label="Close"
                    className="accordion-close-btn focus-visible:outline-bronze flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-transparent text-[17px] leading-none text-ivory focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
                  {rows.map((row, j) => (
                    <div
                      key={row.label}
                      className="border-t border-navy/[0.09] px-6 py-6"
                      style={{
                        background: j % 2
                          ? "color-mix(in srgb, var(--bronze) 3%, var(--ivory) 97%)"
                          : "color-mix(in srgb, var(--ivory) 50%, white 50%)",
                      }}
                    >
                      <p
                        className="mb-2 font-mono text-[11px] tracking-[0.12em] uppercase"
                        style={{ color: ROW_ACCENTS[j % 4] }}
                      >
                        {row.label}
                      </p>
                      <p className="text-[15px] leading-[1.62] text-charcoal">{row.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-expanded={false}
                className="focus-visible:outline-bronze flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent p-[26px] text-left focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <div>
                  <p className="mb-3 font-mono text-[11.5px] tracking-[0.14em] text-bronze uppercase">
                    {item.tag}
                  </p>
                  <h2 className="font-display text-[1.45rem] leading-[1.18] font-medium text-navy">
                    {item.title}
                  </h2>
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
