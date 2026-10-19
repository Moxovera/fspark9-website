/**
 * Sessiz önizleme klipleri için ortak kurallar (ana sayfa açılış filmi ve
 * Four services halkası). Klip bu sürede oynamaya hazır olmazsa hiç
 * gösterilmez; hareket azaltma, veri tasarrufu ya da yavaş bağlantıda hiç inmez.
 */
export const READY_TIMEOUT_MS = 3000;

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** Hiç klip indirilmeyen bağlantı türleri; Spark film kartı 3g'yi de bırakıyor (kart sayfanın en üstünde). */
export const SLOW_CONNECTIONS = ["slow-2g", "2g"];
export const SLOWER_CONNECTIONS = [...SLOW_CONNECTIONS, "3g"];

export function previewAllowed(blocked: string[] = SLOW_CONNECTIONS): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;
  return !blocked.includes(connection?.effectiveType ?? "");
}
