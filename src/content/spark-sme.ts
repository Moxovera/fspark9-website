import smeJson from "./sector/de-sme.json";
import type { Locale, SparkSmeReport } from "@/types/content";

/**
 * Spark sektör raporları Nº 05 · Almanya KOBİ bankacılığı (layout "sme").
 * Kaynak taslak Spark/sector reports/Almanya SME Bankacılığı Pazarı Sektör
 * Raporu (İlk Taslak).md; sayfa 14 bölümü 7 durakta anlatıyor. İki dil yan
 * yana src/content/sector/de-sme.json'da. Site bunu Sanity'den okuyor
 * (sparkEpisode.reportBody); bu dosya seed-v3'ün kaynağı ve check:drift'in aynası.
 */
export const sme = smeJson as Record<Locale, SparkSmeReport>;
