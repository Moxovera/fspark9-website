"use client";

import { useSyncExternalStore } from "react";

// Final interaction brief §7. Anahtar `fspark9.lastday.v2`. v1'den
// sessiz göç destekleniyor (brief'in açık talimatı) ama bu kod
// tabanında v1 hiç canlıya çıkmadı — "engaging layer" v2 hub/list
// yeniden yapılanmasında tamamen kaldırılmıştı, bu yüzden pratikte bu
// dal hemen hiç tetiklenmeyecek, sadece brief'e sadakat için var.
//
// Her okuma/yazma try/catch içinde (brief: "Every read and write in
// try/catch. A private window gets a fully working page with nothing
// recorded."). Hiçbir şey ağa gönderilmiyor, sadece localStorage.
//
// getServerSnapshot AYNI referansı döner her seferinde — bkz. bu
// projede daha önce yaşanmış "getServerSnapshot returning new object
// each call" React uyarısı, sabit modül seviyesi obje ile çözülüyor.

const STORAGE_KEY = "fspark9.lastday.v2";
const LEGACY_STORAGE_KEY = "fspark9.lastday.v1";

export type CallAnswer = "rule" | "decision";

export interface LastDayState {
  calls: Record<string, CallAnswer>;
  estimates: Record<string, string>;
  weighs: Record<string, string>;
  signals: Record<string, string>;
  opinions: Record<string, string>;
  allocations: Record<string, number>;
}

const EMPTY_STATE: LastDayState = {
  calls: {},
  estimates: {},
  weighs: {},
  signals: {},
  opinions: {},
  allocations: {},
};

let cachedState: LastDayState = EMPTY_STATE;
let cachedRaw: string | null | undefined;
const listeners = new Set<() => void>();

function readLegacyV1(): Partial<LastDayState> {
  try {
    const raw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return {};
    const legacy = JSON.parse(raw) as { calls?: Record<string, CallAnswer> };
    return { calls: legacy.calls ?? {} };
  } catch {
    return {};
  }
}

function readFromStorage(): LastDayState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedState;
    cachedRaw = raw;

    if (!raw) {
      const migrated = readLegacyV1();
      cachedState = { ...EMPTY_STATE, ...migrated };
      return cachedState;
    }

    const parsed = JSON.parse(raw) as Partial<LastDayState>;
    cachedState = {
      calls: parsed.calls ?? {},
      estimates: parsed.estimates ?? {},
      weighs: parsed.weighs ?? {},
      signals: parsed.signals ?? {},
      opinions: parsed.opinions ?? {},
      allocations: parsed.allocations ?? {},
    };
    return cachedState;
  } catch {
    cachedState = EMPTY_STATE;
    return cachedState;
  }
}

function writeToStorage(next: LastDayState) {
  cachedState = next;
  try {
    cachedRaw = JSON.stringify(next);
    window.localStorage.setItem(STORAGE_KEY, cachedRaw);
  } catch {
    // Private pencere ya da kota dolu — state bellekte kalır, sayfa
    // çalışmaya devam eder, sadece kalıcı olmaz.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getServerSnapshot(): LastDayState {
  return EMPTY_STATE;
}

export function setCallAnswer(blockId: string, answer: CallAnswer) {
  const current = readFromStorage();
  writeToStorage({ ...current, calls: { ...current.calls, [blockId]: answer } });
}

export function setEstimateAnswer(blockId: string, bracket: string) {
  const current = readFromStorage();
  writeToStorage({ ...current, estimates: { ...current.estimates, [blockId]: bracket } });
}

export function setWeighAnswer(blockId: string, optionLabel: string) {
  const current = readFromStorage();
  writeToStorage({ ...current, weighs: { ...current.weighs, [blockId]: optionLabel } });
}

export function setSignalAnswer(blockId: string, optionLabel: string) {
  const current = readFromStorage();
  writeToStorage({ ...current, signals: { ...current.signals, [blockId]: optionLabel } });
}

export function setOpinionAnswer(blockId: string, optionLabel: string) {
  const current = readFromStorage();
  writeToStorage({ ...current, opinions: { ...current.opinions, [blockId]: optionLabel } });
}

export function setAllocationValue(blockId: string, valueA: number) {
  const current = readFromStorage();
  writeToStorage({ ...current, allocations: { ...current.allocations, [blockId]: valueA } });
}

/** Bölümler arası koşan toplam etkileşim sayısı — Scorecard'ın "running cross episode count" alanı. */
export function countInteractions(state: LastDayState): number {
  return (
    Object.keys(state.calls).length +
    Object.keys(state.estimates).length +
    Object.keys(state.weighs).length +
    Object.keys(state.signals).length +
    Object.keys(state.opinions).length +
    Object.keys(state.allocations).length
  );
}

export function useLastDayState(): LastDayState {
  return useSyncExternalStore(subscribe, readFromStorage, getServerSnapshot);
}
