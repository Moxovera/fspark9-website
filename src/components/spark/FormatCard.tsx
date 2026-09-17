import { Link } from "@/i18n/navigation";
import type { SparkFormatSummary } from "@/types/content";

interface FormatCardProps {
  format: SparkFormatSummary;
}

/**
 * Tek bir format kartı (ör. "The Last Day"). Değişmeden yeni format
 * eklenmesini kaldırabilmesi için sabit metin yok — build prompt'un
 * "hold more entries without changes" kabul kriteri.
 *
 * /spark/[formatSlug] next-intl pathnames'te templated bir route —
 * href düz string olarak geçilemez ("Insufficient params" hatası
 * verir), bkz. CaseCard.tsx'teki aynı desen.
 */
export default function FormatCard({ format }: FormatCardProps) {
  return (
    <Link
      href={{ pathname: "/spark/[formatSlug]", params: { formatSlug: format.slug } }}
      className="group block border border-ivory/12 p-8 transition-[border-color,background-color] duration-200 hover:border-bronze/50 hover:bg-ivory/[0.03]"
    >
      <h3 className="mb-3 font-display text-[1.5rem] leading-[1.2] font-medium text-ivory">
        {format.name}
      </h3>
      <p className="mb-5 text-[0.98rem] leading-[1.6] text-ivory/72">{format.description}</p>
      <p className="font-mono text-xs tracking-[0.1em] text-bronze uppercase">
        {format.episodeCountLabel}
      </p>
    </Link>
  );
}
