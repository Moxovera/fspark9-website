"use client";

import { useLastDayCalls } from "@/hooks/useLastDayCalls";
import type { LastDayReadingBlock } from "@/types/content";

interface ReadingBlockProps {
  block: LastDayReadingBlock;
  label: string; // "READING" / "OKUMA"
  dayWord: string;
  restsOnLabel: string;
}

/**
 * Sol çizgi: bronze, solid, 3px. Ledger modunda (Show the record only)
 * tamamen kaybolur — bkz. build prompt kabul kriteri 7.
 */
export default function ReadingBlock({ block, label, dayWord, restsOnLabel }: ReadingBlockProps) {
  const { ledger } = useLastDayCalls();
  if (ledger) return null;

  return (
    <div className="border-l-[3px] border-solid border-bronze bg-bronze/[0.04] py-6 pl-6">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-xs tracking-[0.14em] text-bronze uppercase">{label}</span>
        <span className="font-mono text-xs tracking-[0.06em] text-muted">
          {dayWord} {block.day >= 0 ? String(block.day).padStart(3, "0") : block.day}
        </span>
      </div>
      <h3 className="mb-2 font-display text-[1.25rem] leading-[1.3] font-medium text-charcoal">
        {block.heading}
      </h3>
      <p className="mb-3 text-[0.98rem] leading-[1.66] text-charcoal/85">{block.body}</p>
      {block.restsOn.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] tracking-[0.05em] text-muted uppercase">
            {restsOnLabel}
          </span>
          {block.restsOn.map((heading) => (
            <span
              key={heading}
              className="rounded-full border border-navy/25 px-2.5 py-0.5 font-mono text-[11px] text-navy"
            >
              {heading}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
