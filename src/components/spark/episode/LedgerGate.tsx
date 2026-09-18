"use client";

import type { ReactNode } from "react";
import { useLastDayState } from "@/hooks/useLastDayState";

interface LedgerGateProps {
  children: ReactNode;
}

/**
 * Ledger modunda (Show the record only) gizlenmesi gereken sunucu
 * render'lı içeriği (ReadingBlock, ExpertNotes) sarmalar. Kendisi
 * client, çocukları server component kalabilir (RSC'de children prop
 * olarak geçildiği için) — bkz. final interaction brief §7: "Ledger
 * mode hides all ten interactive moments, every reading and the expert
 * notes. Records and gaps stay."
 */
export default function LedgerGate({ children }: LedgerGateProps) {
  const state = useLastDayState();
  if (state.ledger) return null;
  return <>{children}</>;
}
