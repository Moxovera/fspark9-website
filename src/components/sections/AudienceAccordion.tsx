"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import type { AudienceCard } from "@/types/content";

interface AudienceAccordionProps {
  cards: AudienceCard[];
  labels: { problem: string; do: string; result: string };
}

// dc.html'deki üç sabit, index'e bağlı SVG ikon (stroke=navy, dolgu yok;
// üçüncü ikonun ortasındaki dikdörtgen ivory dolgulu). Veriden gelmiyor,
// bu yüzden content.ts'te yer almıyor (bkz. AudienceCard yorumu).
function NetworkIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ stroke: "var(--navy)" }} strokeWidth={1.2}>
      <circle cx="26" cy="12" r="5" />
      <circle cx="12" cy="38" r="5" />
      <circle cx="40" cy="38" r="5" />
      <path d="M26 17v10M22 30 15 34M30 30l7 4" />
    </svg>
  );
}

function DeviceIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ stroke: "var(--navy)" }} strokeWidth={1.2}>
      <rect x="15" y="6" width="22" height="40" rx="3" />
      <path d="M22 40h8M19 30l5-6 5 5 5-9" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ stroke: "var(--navy)" }} strokeWidth={1.2}>
      <path d="M9 20 26 9l17 11M13 20v18M39 20v18M9 42h34M21 38v-10M31 38v-10" />
      <rect x="21" y="27" width="10" height="8" rx="1.5" style={{ fill: "var(--ivory)" }} />
    </svg>
  );
}

const ICONS = [NetworkIcon, DeviceIcon, BankIcon];

/**
 * dc.html: state.who (açık kart index'i, -1 = hiçbiri) + state.whoHov
 * (hover'daki kart index'i, -1 = yok) — React karşılığı openIndex/hoverIndex.
 * whoOpen{i}() her zaman `who`'yu doğrudan i'ye set eder (toggle değil), bu
 * yüzden bir karta tıklamak diğerini otomatik kapatır. Kapatma sadece ×
 * butonuyla (whoClose, who: -1).
 *
 * Erişilebilirlik — dc.html'den kasıtlı sapma: kapalı satırın tamamı
 * dc.html'de <div onClick> (buton değil, klavye erişimi yok). CLAUDE.md'nin
 * accordion kuralı gereği burada gerçek <button> kullanılıyor, aria-expanded
 * ile.
 */
export default function AudienceAccordion({ cards, labels }: AudienceAccordionProps) {
  const [openIndex, setOpenIndex] = useState(-1);
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <div className="border-t border-navy/14">
      {cards.map((card, i) => {
        const isOpen = openIndex === i;
        const isHovered = hoverIndex === i;
        const numberText = String(i + 1).padStart(2, "0");
        const Icon = ICONS[i];

        const rowStyle: CSSProperties = {
          padding: isOpen ? "38px 4px 44px" : isHovered ? "32px 4px" : "28px 4px",
          background: isOpen
            ? "color-mix(in srgb, var(--navy) 3.5%, transparent)"
            : isHovered
              ? "color-mix(in srgb, var(--navy) 2%, transparent)"
              : "transparent",
          transition: "padding .4s cubic-bezier(.2,.8,.2,1), background .35s ease",
        };

        const peekStyle: CSSProperties = {
          overflow: "hidden",
          maxHeight: isHovered ? "110px" : "0px",
          opacity: isHovered ? 1 : 0,
          transition: "max-height .45s cubic-bezier(.2,.8,.2,1), opacity .35s ease",
        };

        const iconStyle: CSSProperties = {
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateY(0)" : "translateY(6px)",
          transition: "opacity .4s ease, transform .4s ease",
          paddingTop: "2px",
        };

        return (
          <div
            key={card.title}
            className="border-b border-navy/14"
            style={rowStyle}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(-1)}
          >
            {isOpen ? (
              <div className="grid grid-cols-[76px_1fr] gap-5">
                <span className="pt-1.5 font-mono text-[13px] tracking-[0.1em] text-bronze">
                  {numberText}
                </span>
                <div>
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="max-w-[30ch] font-display text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.22] font-medium text-navy">
                      {card.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(-1)}
                      aria-label="Close"
                      className="accordion-close-btn focus-visible:outline-bronze flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-transparent text-[17px] leading-none text-navy focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-7 flex max-w-[68ch] flex-col gap-[22px]">
                    <div>
                      <p className="mb-2 font-mono text-[11px] tracking-[0.12em] text-bronze uppercase">
                        {labels.problem}
                      </p>
                      <p className="text-[15.5px] leading-[1.65] text-charcoal">
                        {card.problem}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                        {labels.do}
                      </p>
                      <p className="text-[15.5px] leading-[1.65] text-charcoal">
                        {card.do}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
                        {labels.result}
                      </p>
                      <p className="text-[15.5px] leading-[1.65] text-charcoal">
                        {card.result}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-expanded={false}
                className="focus-visible:outline-bronze grid w-full cursor-pointer grid-cols-[76px_1fr_auto_44px] items-start gap-5 border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span className="pt-2 font-mono text-[13px] tracking-[0.1em] text-bronze">
                  {numberText}
                </span>
                <div>
                  <h3 className="max-w-[34ch] font-display text-[clamp(1.25rem,1.9vw,1.6rem)] leading-[1.28] font-medium text-navy">
                    {card.title}
                  </h3>
                  <div style={peekStyle}>
                    <p className="mt-4 mb-[7px] font-mono text-[11px] tracking-[0.12em] text-bronze uppercase">
                      {labels.problem}
                    </p>
                    <p
                      className="max-w-[58ch] text-[14.5px] leading-[1.6] text-muted"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {card.problem}
                    </p>
                  </div>
                </div>
                <div style={iconStyle}>
                  <Icon />
                </div>
                <span className="pt-1 text-right text-xl text-bronze">→</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
