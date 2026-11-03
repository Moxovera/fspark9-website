"use client";

import { useSyncExternalStore } from "react";
import {
  getGateLocked,
  getReaderSnapshot,
  getServerReaderSnapshot,
  subscribeGate,
  subscribeReader,
} from "@/lib/sparkReader";
import type { ReaderSnapshot } from "@/lib/sparkReader";

/** Okurun tarayıcıdaki durumu (localStorage, sekmeler arası senkron). SSR'da `ready` false. */
export function useSparkReader(): ReaderSnapshot {
  return useSyncExternalStore(subscribeReader, getReaderSnapshot, getServerReaderSnapshot);
}

/** Sayfada kilitli bir rapor var mı (sabit bülten kutusu bu sırada gizli). */
export function useGateLocked(): boolean {
  return useSyncExternalStore(subscribeGate, getGateLocked, () => false);
}
