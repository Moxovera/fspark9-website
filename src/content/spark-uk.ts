import ukJson from "./sector/uk-sme.json";
import type { Locale, SparkUkReport } from "@/types/content";

/**
 * Spark sektör raporları Nº 06 · İngiltere KOBİ bankacılığı (layout "uksme").
 * Metin Spark/sector reports/spark-uk-sme-icerik-tr-en.md (tek kaynak);
 * iki dil yan yana src/content/sector/uk-sme.json'da, referans
 * spark-uk-sme.html'in DATA'sından betikle çıkarıldı (sadece "[n]" ve "&"
 * dönüştürüldü), her cümle metin dosyasına karşı doğrulandı. Site bunu
 * Sanity'den okuyor (sparkEpisode.reportBody); bu dosya seed-v3'ün kaynağı
 * ve check:drift'in aynası.
 */
export const uk = ukJson as Record<Locale, SparkUkReport>;
