// Okur cevabının sınırları (Son Gün Nº 02). Cevap tarayıcıdan doğrudan
// Web3Forms'a gidiyor, sunucu tarafı yok: metin en fazla 250 kelime ve
// 2.000 karakter, serbest metin seçeneğinde zorunlu; sayfa açıldıktan 3
// saniyeden önce gönderilmez.

export const ANSWER_MAX_WORDS = 250;
export const ANSWER_MAX_CHARS = 2000;
export const ANSWER_MIN_ELAPSED_MS = 3000;
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
