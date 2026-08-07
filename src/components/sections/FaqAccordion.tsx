"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import type { FaqItem } from "@/types/content";

interface FaqAccordionProps {
  items: FaqItem[];
}

/**
 * dc.html: state.faq (tek açık index, -1 = hiçbiri), toggle:
 * setState({ faq: st.faq === i ? -1 : i }). AudienceAccordion/
 * ServicesAccordion'daki openIndex desenden farkı: orada ayrı bir ✕
 * kapatma butonu var (tıklama her zaman doğrudan set), burada dc.html'de
 * ayrı kapatma kontrolü yok — aynı satır aynı handler'la hem açılıyor hem
 * kapanıyor, bu yüzden gerçek toggle: aynı soruya tekrar tıklamak kapatır.
 */
export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        const iconStyle: CSSProperties = {
          transition: "transform .3s ease",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
        };

        return (
          <div key={item.order} className="border-t border-charcoal/[0.13]">
            <button
              type="button"
              onClick={() =>
                setOpenIndex((current) => (current === i ? -1 : i))
              }
              aria-expanded={isOpen}
              className="focus-visible:outline-bronze flex w-full cursor-pointer items-baseline justify-between gap-5 border-0 bg-transparent py-[22px] text-left focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <p className="font-display text-[clamp(1.08rem,1.5vw,1.3rem)] leading-[1.35] text-navy">
                {item.question}
              </p>
              <span
                className="flex-none font-mono text-[18px] text-bronze"
                style={iconStyle}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p
                className="fs-fade mb-[26px] max-w-[68ch] text-base leading-[1.7] text-charcoal"
                style={{ animationDuration: "0.35s" }}
              >
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
