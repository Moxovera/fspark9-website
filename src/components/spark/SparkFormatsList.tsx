import FormatCard from "@/components/spark/FormatCard";
import type { SparkFormatSummary } from "@/types/content";

interface SparkFormatsListProps {
  formats: SparkFormatSummary[];
}

/**
 * Format listesi — sadece yayınlanmış format kadar kart render eder.
 * Henüz var olmayan bir format için sahte/"coming soon" kart YOK.
 * max-w tek format varken kartın koca bir şerit gibi gerilmesini
 * önlüyor; birden fazla format geldiğinde grid'e doğal olarak yan
 * yana oturuyorlar.
 */
export default function SparkFormatsList({ formats }: SparkFormatsListProps) {
  if (formats.length === 0) return null;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
      {formats.map((format) => (
        <div key={format.slug} className="max-w-[480px]">
          <FormatCard format={format} />
        </div>
      ))}
    </div>
  );
}
