"use client";

import { setLedgerMode, useLastDayState } from "@/hooks/useLastDayState";

interface LedgerToggleProps {
  label: string;
}

/**
 * "Show the record only" — tek global toggle. Ledger açıkken her
 * Reading, her mekanik ve ExpertNotes gizlenir, Record/Gap kalır (bkz.
 * LedgerGate.tsx ve her mekaniğin kendi `if (state.ledger) return null`
 * kontrolü). Native <button aria-pressed> — durumunu kendiliğinden
 * duyurur, ekstra canlı bölge gerekmez.
 */
export default function LedgerToggle({ label }: LedgerToggleProps) {
  const state = useLastDayState();

  return (
    <button
      type="button"
      aria-pressed={state.ledger}
      onClick={() => setLedgerMode(!state.ledger)}
      className={`inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-sm transition-colors ${
        state.ledger ? "border-navy bg-navy text-ivory" : "border-navy/25 text-charcoal hover:border-navy/50"
      }`}
    >
      <span
        aria-hidden="true"
        className={`relative h-4 w-8 rounded-full transition-colors ${state.ledger ? "bg-ivory/30" : "bg-navy/15"}`}
      >
        <span
          className={`absolute top-0.5 h-3 w-3 rounded-full bg-current transition-transform ${
            state.ledger ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
      {label}
    </button>
  );
}
