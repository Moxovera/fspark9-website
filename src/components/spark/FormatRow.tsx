import { Link } from "@/i18n/navigation";
import DayMeasure from "@/components/spark/day/DayMeasure";
import type { SparkFormatSummary } from "@/types/content";

interface FormatRowProps {
  format: SparkFormatSummary;
  locale: "en" | "tr";
}

/**
 * Hub'daki format 01 satırı — tam genişlik, kart DEĞİL (bkz. Spark
 * revizyon brief §4: "Formats become full width rows, not a two up
 * card grid"). Tüm satır TEK bir link hedefi: format'ın liste sayfası.
 * Envanter (Bó / United Kingdom / 156 days) burada, tıklanmadan önce
 * görünür — "a visitor cannot see how many episodes exist... without
 * clicking" sorununun düzeltmesi.
 *
 * Hover/focus: SADECE sol kenarda bir bronz çizginin tam yüksekliğe
 * uzaması (bkz. globals.css'e eklenmeyen, burada inline Tailwind ile
 * çözülen tek hover efekti — no lift, no shadow, no scale).
 */
export default function FormatRow({ format, locale }: FormatRowProps) {
  const episodeCount = format.episodes.length;
  const statusLine =
    episodeCount > 0
      ? `${episodeCount} ${episodeCount === 1 ? format.statusLineSingular : format.statusLinePlural}`
      : null;

  return (
    <Link
      href={{ pathname: "/spark/[formatSlug]", params: { formatSlug: format.slug } }}
      className="group relative block border-t border-ivory/12 py-10 pl-8 transition-colors duration-200 focus-visible:outline-none md:py-14"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-full w-[3px] origin-top scale-y-0 bg-bronze transition-transform duration-300 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100"
      />
      <span className="pointer-events-none absolute inset-0 rounded-sm opacity-0 outline outline-2 outline-offset-2 outline-bronze group-focus-visible:opacity-100" />

      <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <span className="font-mono text-xs tracking-[0.14em] text-bronze">
          {String(format.number).padStart(2, "0")}
        </span>
        <h2 className="font-display text-[clamp(1.9rem,4vw,2.6rem)] leading-[1.1] font-medium text-ivory">
          {format.name}
        </h2>
      </div>

      <p className="mb-4 max-w-[62ch] text-[1.02rem] leading-[1.65] text-ivory/75">
        {format.subjectLine}
      </p>
      <p className="mb-8 max-w-[62ch] text-[1.02rem] leading-[1.65] text-ivory/75">
        {format.whatIsInside}
      </p>

      {format.episodes.length > 0 && (
        <div className="mb-8 flex flex-col gap-3">
          {format.episodes.map((episode) => (
            <div
              key={episode.episodeSlug}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-1"
            >
              <span className="font-display text-lg text-ivory">{episode.subject}</span>
              <span className="text-sm text-ivory/60">{episode.country}</span>
              <DayMeasure
                launchDate={episode.launchDate}
                closureDate={episode.closureDate}
                singular={format.dayCountSingular}
                plural={format.dayCountPlural}
                notEstablishedLabel={format.dayNotEstablishedLabel}
                variant="figure"
                tone="onNavy"
                locale={locale}
              />
            </div>
          ))}
        </div>
      )}

      {statusLine && (
        <div className="max-w-[280px] border-t border-ivory/10 pt-4">
          <p className="font-mono text-xs tracking-[0.04em] text-ivory/60">{statusLine}</p>
        </div>
      )}
    </Link>
  );
}
