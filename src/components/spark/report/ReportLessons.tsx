"use client";

import { useState } from "react";
import type { ReportLessonsProps } from "@/types/content";

/**
 * Karşılıklı dersler (prototip `.lesson`): iki sütun, her biri akordeon,
 * ilk ders açık. Başlıklar <button aria-expanded>, klavye ile çalışır.
 * Artı/eksi işareti inline SVG.
 */
export default function ReportLessons({ groups }: ReportLessonsProps) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(groups.map((_, g) => `${g}-0`)));
  const toggle = (key: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (!next.delete(key)) next.add(key);
      return next;
    });

  return (
    <div className="grid grid-cols-1 gap-[clamp(24px,4vw,56px)] min-[901px]:grid-cols-2">
      {groups.map((group, g) => (
        <div key={group.heading}>
          <h3 className="m-0 border-b-2 border-ink pb-3.5 font-display text-[21px] leading-[1.15] font-extrabold tracking-[-0.015em]">
            {group.heading}
          </h3>
          {group.items.map((item, i) => {
            const key = `${g}-${i}`;
            const isOpen = open.has(key);
            return (
              <div key={key} className="border-b border-rule">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`lesson-${key}`}
                  onClick={() => toggle(key)}
                  className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-4 text-left font-display text-[18px] font-bold tracking-[-0.01em] text-ink"
                >
                  {item.title}
                  <span
                    aria-hidden="true"
                    className={`grid size-7 flex-none place-items-center border-[1.5px] border-ink transition-colors duration-[160ms] ease-brand ${
                      isOpen ? "bg-ink text-paper" : "bg-transparent text-ink"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M5 12h14" />
                      {!isOpen && <path d="M12 5v14" />}
                    </svg>
                  </span>
                </button>
                <div id={`lesson-${key}`} aria-hidden={!isOpen} data-open={isOpen} className="lesson-panel">
                  <div className="overflow-hidden">
                    <p className="m-0 max-w-[58ch] pb-[18px] text-[15.5px]">{item.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
