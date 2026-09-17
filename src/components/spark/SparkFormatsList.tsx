import FormatCard from "@/components/spark/FormatCard";
import ComingSoonTile from "@/components/spark/ComingSoonTile";
import type { SparkFormatSummary } from "@/types/content";

interface SparkFormatsListProps {
  formats: SparkFormatSummary[];
  comingSoonLabel: string;
}

/**
 * Format listesi — "01", "02" şeklinde numaralı (kullanıcı geri
 * bildirimi). Yayınlanmış formatların hemen ardından tek bir "coming
 * soon" yer tutucusu gelir ki insanlar daha fazlasının geleceğini
 * anlasın — bu TEK istisna, başka sahte kart YOK. max-w tek format
 * varken kartın koca bir şerit gibi gerilmesini önlüyor.
 */
export default function SparkFormatsList({ formats, comingSoonLabel }: SparkFormatsListProps) {
  if (formats.length === 0) return null;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
      {formats.map((format, i) => (
        <div key={format.slug} className="max-w-[480px]">
          <FormatCard format={format} index={i + 1} />
        </div>
      ))}
      <div className="max-w-[480px]">
        <ComingSoonTile index={formats.length + 1} label={comingSoonLabel} />
      </div>
    </div>
  );
}
