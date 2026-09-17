"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { LastDayCallsState } from "@/types/content";

// Tek store, versiyonlu localStorage anahtarı — bkz. build prompt: "One
// store, persisted to localStorage under a versioned key such as
// fspark9.lastday.v1". zustand ya da başka bir state kütüphanesi
// EKLENMEDİ (repoda hiçbiri yok) — useReveal.ts'teki paylaşılan modül
// seviyesi state deseniyle aynı yaklaşım, React'in kendi
// useSyncExternalStore API'si üzerine kurulu.
const STORAGE_KEY = "fspark9.lastday.v1";

let state: LastDayCallsState = { calls: {}, ledger: false };
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

// SSR/hydration sırasında her zaman aynı boş varsayılan — gerçek değer
// yalnızca mount sonrası bir efektte okunur, hydration mismatch olmaz.
// Sabit bir modül seviyesi referans: her çağrıda yeni bir obje
// dönülürse React "getServerSnapshot should be cached" uyarısı verir.
const SERVER_SNAPSHOT: LastDayCallsState = { calls: {}, ledger: false };
function getServerSnapshot(): LastDayCallsState {
  return SERVER_SNAPSHOT;
}

function load(): LastDayCallsState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { calls: {}, ledger: false };
    const parsed = JSON.parse(raw) as Partial<LastDayCallsState>;
    return { calls: parsed.calls ?? {}, ledger: Boolean(parsed.ledger) };
  } catch {
    // Private pencere, engellenmiş site verisi vb. — bellekteki
    // varsayılanla devam edilir, sayfa kırılmaz.
    return { calls: {}, ledger: false };
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Yazılamıyorsa sessizce yut — bu oturum boyunca bellekte kalır.
  }
}

export function useLastDayCalls() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (hydrated) return;
    hydrated = true;
    state = load();
    emit();
  }, []);

  const answerCall = useCallback((callId: string, answer: "rule" | "decision") => {
    state = { ...state, calls: { ...state.calls, [callId]: answer } };
    persist();
    emit();
  }, []);

  const setLedger = useCallback((ledger: boolean) => {
    state = { ...state, ledger };
    persist();
    emit();
  }, []);

  return { calls: snapshot.calls, ledger: snapshot.ledger, answerCall, setLedger };
}
