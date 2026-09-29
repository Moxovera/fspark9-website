/**
 * Canlıya çıkmadan önce bir bölümü staging'de yayındaki gibi göstermek
 * için (sparkEpisode.previewLive). Staging ve canlı aynı Sanity veri
 * setini okuyor: `status: coming` + `previewLive: true` canlı sitede
 * "sırada" kalır, preview ve yerel ortamda yayındaki gibi görünür.
 * Spark sorgularına `$preview` parametresi olarak geçer.
 */
export const PREVIEW_EPISODES = process.env.VERCEL_ENV !== "production";
