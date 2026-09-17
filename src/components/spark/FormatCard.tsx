import { Link } from "@/i18n/navigation";
import type { SparkFormatSummary } from "@/types/content";

interface FormatCardProps {
  format: SparkFormatSummary;
  index: number; // 1-based — kart üstündeki "01" etiketi için
}

// CLAUDE.md'deki ok ikonu kalıbı (24×24, stroke="currentColor",
// strokeWidth 1.8, round cap/join) — yönü çapraz (yukarı-sağ), bu
// yüzden ServicesAccordion'daki yatay ArrowRightIcon yerine ayrı bir
// ikon: kartın hover hareketi de çapraz (translate-x + -translate-y).
function ArrowUpRightIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="8 7 17 7 17 16" />
    </svg>
  );
}

/**
 * Bir format vitrin kartı (ör. "The Last Day") — bilerek büyük ve sade:
 * tek satır açıklama dışında metin yok, bölüm sayısı ya da "more are
 * coming" gibi bir sayaç/özür cümlesi YOK (kullanıcı geri bildirimi).
 * Grid otomatik sarıyor (bkz. SparkFormatsList) — yeni bir format
 * eklendiğinde bu kart değişmeden yanına başka bir tane daha oturur.
 *
 * /spark/[formatSlug] next-intl pathnames'te templated bir route —
 * href düz string olarak geçilemez ("Insufficient params" hatası
 * verir), bkz. CaseCard.tsx'teki aynı desen.
 */
export default function FormatCard({ format, index }: FormatCardProps) {
  return (
    <Link
      href={{ pathname: "/spark/[formatSlug]", params: { formatSlug: format.slug } }}
      className="group relative block overflow-hidden border border-ivory/14 bg-ivory/[0.02] p-10 transition-[border-color,background-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-bronze/60 hover:bg-ivory/[0.04] hover:shadow-[0_24px_60px_-20px_rgba(166,124,61,0.45)] sm:p-12"
    >
      <p className="mb-4 font-mono text-xs tracking-[0.14em] text-bronze">
        {String(index).padStart(2, "0")}
      </p>
      <div className="mb-8 flex items-start justify-between gap-4">
        <h3 className="font-display text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.1] font-medium text-ivory">
          {format.name}
        </h3>
        <span
          aria-hidden="true"
          className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bronze/40 text-bronze transition-[transform,background-color,border-color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-bronze group-hover:bg-bronze/10"
        >
          <ArrowUpRightIcon />
        </span>
      </div>
      <p className="max-w-[46ch] text-[1rem] leading-[1.6] text-ivory/70">{format.description}</p>
    </Link>
  );
}
