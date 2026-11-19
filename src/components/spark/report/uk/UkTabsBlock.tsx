"use client";

import { useState } from "react";
import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { pill } from "@/components/spark/report/uk/pill";
import type { UkTabsBlockProps } from "@/types/content";

/** 10 Ekip: beş ekip büyüklüğü, altında seçilenin başlığı, metni ve listesi. İlk sekme açık başlar. */
export default function UkTabsBlock({ block, template, tone }: UkTabsBlockProps) {
  const [cur, setCur] = useState(0);
  const item = block.items[cur];
  return (
    <div className="grid gap-3.5">
      <div className="flex flex-wrap gap-2">
        {block.items.map((x, i) => (
          <button key={x.label} type="button" aria-pressed={i === cur} onClick={() => setCur(i)} className={pill(i === cur)}>
            {x.label}
          </button>
        ))}
      </div>
      <div aria-live="polite" className={`grid gap-3 border-t-2 border-ink p-[clamp(20px,3vw,28px)] ${tone === "white" ? "bg-paper" : "bg-white"}`}>
        <h4 className="m-0 font-display text-[clamp(21px,2.4vw,24px)] leading-[1.2] font-extrabold tracking-[-0.015em]">{item.title}</h4>
        <p className="m-0 max-w-[70ch] text-stone">
          <Psd3Text text={item.text} template={template} />
        </p>
        {item.list.length > 0 && (
          <ul className="m-0 grid gap-1 pl-5 text-[15.5px] text-stone">
            {item.list.map((l) => (
              <li key={l}>
                <Psd3Text text={l} template={template} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
