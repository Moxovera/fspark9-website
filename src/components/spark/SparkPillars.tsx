import Reveal from "@/components/ui/Reveal";
import type { SparkPillar } from "@/types/content";

interface SparkPillarsProps {
  pillars: SparkPillar[];
}

/**
 * Standfirst'ün altındaki 3 kısa satır (THE RECORD / YOUR CALL / THE
 * GAPS) — mono etiket + Inter gövde. Sabit metin yok, hepsi
 * sparkSection.pillars'tan geliyor (Sanity, tam olarak 3 öğe zorunlu).
 */
export default function SparkPillars({ pillars }: SparkPillarsProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10">
      {pillars.map((pillar) => (
        <Reveal key={pillar.label}>
          <p className="mb-3 font-mono text-xs tracking-[0.14em] text-bronze uppercase">
            {pillar.label}
          </p>
          <p className="text-[0.98rem] leading-[1.62] text-ivory/76">{pillar.body}</p>
        </Reveal>
      ))}
    </div>
  );
}
