"use client";

import { useLastDayCalls } from "@/hooks/useLastDayCalls";

interface LedgerToggleProps {
  label: string;
}

/**
 * "Show the record only" — role="switch" + aria-checked, klavye ile
 * çalışır (native <button>), durumunu duyurur (bkz. kabul kriteri 16).
 */
export default function LedgerToggle({ label }: LedgerToggleProps) {
  const { ledger, setLedger } = useLastDayCalls();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={ledger}
      onClick={() => setLedger(!ledger)}
      className="inline-flex items-center gap-3 rounded-full border border-charcoal/25 px-4 py-2 transition-colors duration-200 hover:border-navy"
    >
      <span
        aria-hidden="true"
        className={`relative h-[18px] w-[32px] rounded-full transition-colors duration-200 motion-reduce:transition-none ${
          ledger ? "bg-navy" : "bg-charcoal/20"
        }`}
      >
        <span
          className={`absolute top-[2px] h-[14px] w-[14px] rounded-full bg-ivory transition-[left] duration-200 motion-reduce:transition-none ${
            ledger ? "left-[16px]" : "left-[2px]"
          }`}
        />
      </span>
      <span className="font-mono text-xs tracking-[0.06em] text-charcoal uppercase">{label}</span>
    </button>
  );
}
