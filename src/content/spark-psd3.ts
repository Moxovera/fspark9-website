import psd3Json from "./sector/psd3-fida.json";
import type { Locale, SparkPsd3Report } from "@/types/content";

/**
 * Spark sektör raporları Nº 03 · PSD3, PSR ve FiDA (layout "psd3"). Metin
 * kelimesi kelimesine Spark/sector reports/fspark9-sector-report-psd3-fida-v1.html
 * (EN) ve fspark9-sektor-raporu-psd3-fida-tr-v1.html'den (TR), iki dil yan
 * yana src/content/sector/psd3-fida.json'da. Site bunu Sanity'den okuyor
 * (sparkEpisode.reportBody); bu dosya seed-v3'ün kaynağı ve check:drift'in aynası.
 */
export const psd3 = psd3Json as Record<Locale, SparkPsd3Report>;
