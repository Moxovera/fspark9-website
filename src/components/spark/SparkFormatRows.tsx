import FormatRow from "@/components/spark/FormatRow";
import ComingSoonRow from "@/components/spark/ComingSoonRow";
import type { SparkFormatSummary } from "@/types/content";

interface SparkFormatRowsProps {
  formats: SparkFormatSummary[];
  comingSoonLabel: string;
  locale: "en" | "tr";
}

/**
 * Tam genişlik satırlar (bkz. Spark revizyon brief §4) — kart grid
 * DEĞİL. Format 02 her zaman son sırada, numarası canlı format
 * sayısına göre hesaplanıyor (bugün sadece format 01 var, bu yüzden
 * "02" — ileride başka bir gerçek format yayına girerse otomatik
 * kayar).
 *
 * Satırlar navy/ivory arasında SIRAYLA alterniyor (kullanıcı geri
 * bildirimi, 18 Eylül 2026: "her bir yeni format... bir kapalı bi açık
 * renk gelsin") — ilk satır her zaman ivory, çünkü üstündeki hero her
 * zaman navy; bu tek format varken bile hero'yla kaynaşma sorununu
 * çözüyor, birden fazla format olduğunda da renkten ayırt edilebilir
 * hale getiriyor. Coming Soon satırı da sıradaki index'in tonunu alır.
 */
export default function SparkFormatRows({ formats, comingSoonLabel, locale }: SparkFormatRowsProps) {
  return (
    <div className="flex flex-col">
      {formats.map((format, index) => (
        <FormatRow
          key={format.slug}
          format={format}
          locale={locale}
          tone={index % 2 === 0 ? "onIvory" : "onNavy"}
        />
      ))}
      <ComingSoonRow
        index={formats.length + 1}
        label={comingSoonLabel}
        tone={formats.length % 2 === 0 ? "onIvory" : "onNavy"}
      />
    </div>
  );
}
