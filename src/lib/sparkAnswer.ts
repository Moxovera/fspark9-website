// Okur cevabının sınırları (Son Gün Nº 02 brief §5). İstemcide ve
// /api/spark-answer'da aynı kurallar: metin en fazla 250 kelime ve 2.000
// karakter, serbest metin seçeneğinde zorunlu; sayfa açıldıktan 3
// saniyeden önce gelen gönderim reddedilir.

export const ANSWER_MAX_WORDS = 250;
export const ANSWER_MAX_CHARS = 2000;
export const ANSWER_MIN_ELAPSED_MS = 3000;
/** Serbest metni zorunlu kılan seçenek. */
export const ANSWER_FREE_KEY = "D";

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
