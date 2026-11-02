import kycJson from "./sector/kyc-kyb.json";
import type { Locale, SparkKycReport } from "@/types/content";

/**
 * Spark sektör raporları Nº 04 · KYC ve KYB (layout "kyc"). Metin
 * kelimesi kelimesine Spark/sector reports/fspark9-sector-report-kyc-kyb-v1.html
 * (EN) ve fspark9-sektor-raporu-kyc-kyb-tr-v1.html'den (TR), iki dil yan
 * yana src/content/sector/kyc-kyb.json'da. Site bunu Sanity'den okuyor
 * (sparkEpisode.reportBody); bu dosya seed-v3'ün kaynağı ve check:drift'in aynası.
 */
export const kyc = kycJson as Record<Locale, SparkKycReport>;
