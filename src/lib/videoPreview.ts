/**
 * Sessiz önizleme klipleri için ortak kurallar (ana sayfa açılış filmi ve
 * Four services halkası). Klip bu sürede oynamaya hazır olmazsa hiç
 * gösterilmez; hareket azaltma, veri tasarrufu ya da yavaş bağlantıda hiç inmez.
 */
export const READY_TIMEOUT_MS = 3000;

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

export function previewAllowed(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;
  return connection?.effectiveType !== "2g" && connection?.effectiveType !== "slow-2g";
}
