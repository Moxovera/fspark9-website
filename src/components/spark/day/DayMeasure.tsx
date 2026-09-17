import { computeDayCount, splitIntoYearLines } from "@/components/spark/day/dayMath";

interface DayMeasureProps {
  launchDate: string | null | undefined;
  closureDate: string | null | undefined;
  singular: string;
  plural: string;
  notEstablishedLabel: string;
  variant: "figure" | "bar" | "full";
  tone: "onNavy" | "onIvory";
  locale: "en" | "tr";
  className?: string;
}

/**
 * Gün mekaniğinin TEK bileşeni — üç yerleşimde de bu kullanılıyor
 * (bkz. revizyon brief 4b): hub envanter satırı ("figure"), liste
 * sayfası girişi ("bar"), bölüm sayfası başlığı ("full"). Sayı hiçbir
 * yerde elle girilmiyor, her zaman launchDate/closureDate'ten
 * hesaplanıyor (bkz. dayMath.ts).
 *
 * Ölçek sabit: 365 gün, bir çentikle işaretli. 365'ten uzun bir süre
 * çubuğun ikinci satırına taşar, her satır bir yıl.
 *
 * Dürüst kenar durumları: tarihlerden biri eksikse "not established"
 * render edilir ve çubuk tamamen atlanır — asla kırık bir çubuk, asla
 * bir tahmin.
 */
export default function DayMeasure({
  launchDate,
  closureDate,
  singular,
  plural,
  notEstablishedLabel,
  variant,
  tone,
  locale,
  className,
}: DayMeasureProps) {
  const days = computeDayCount(launchDate, closureDate);
  const figureColor = tone === "onNavy" ? "text-ivory" : "text-navy";
  const mutedColor = tone === "onNavy" ? "text-ivory/60" : "text-muted";
  const trackColor = tone === "onNavy" ? "bg-ivory/15" : "bg-navy/10";
  const tickColor = tone === "onNavy" ? "bg-ivory/50" : "bg-navy/40";

  if (days === null) {
    return <p className={`font-mono text-sm ${mutedColor} ${className ?? ""}`}>{notEstablishedLabel}</p>;
  }

  const word = days === 1 ? singular : plural;
  const figureText = `${days} ${word}`;

  if (variant === "figure") {
    return (
      <p className={`font-mono text-sm tracking-[0.02em] ${mutedColor} ${className ?? ""}`}>
        {figureText}
      </p>
    );
  }

  const lines = splitIntoYearLines(days);
  const dateFormatter = new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className={className}>
      <p
        className={`font-mono leading-none tracking-[-0.01em] ${figureColor} ${
          variant === "full" ? "text-[clamp(1.8rem,4vw,2.6rem)]" : "text-[clamp(2rem,6vw,3.4rem)]"
        }`}
      >
        {figureText}
      </p>
      <div className="mt-3 flex flex-col gap-1.5">
        {lines.map((line, i) => (
          <div key={i} className={`relative h-1 w-full max-w-[280px] rounded-full ${trackColor}`}>
            <div
              className="h-full rounded-full bg-bronze motion-reduce:transition-none"
              style={{ width: `${line.filledFraction * 100}%` }}
            />
            <div
              aria-hidden="true"
              className={`absolute top-1/2 right-0 h-3 w-px -translate-y-1/2 ${tickColor}`}
            />
          </div>
        ))}
      </div>
      {variant === "full" && launchDate && (
        <p className={`mt-2 font-mono text-xs tracking-[0.04em] ${mutedColor}`}>
          {dateFormatter.format(new Date(launchDate))}
          {closureDate ? ` - ${dateFormatter.format(new Date(closureDate))}` : ""}
        </p>
      )}
    </div>
  );
}
