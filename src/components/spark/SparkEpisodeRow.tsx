import DayMeasure from "@/components/spark/day/DayMeasure";
import QuietLink from "@/components/ui/QuietLink";
import type { SparkEpisodeSummary } from "@/types/content";

interface SparkEpisodeRowProps {
  episode: SparkEpisodeSummary;
  dayCountSingular: string;
  dayCountPlural: string;
  dayNotEstablishedLabel: string;
  hookLabel: string;
  locale: "en" | "tr";
  tone: "onNavy" | "onIvory";
  isLast: boolean;
}

/**
 * Liste sayfasındaki tek bir giriş — dikey liste (grid DEĞİL). Gün
 * ölçüsü satırdaki en büyük öğe, konu adının (Fraunces) önünde bölüm
 * numarası (hub'daki format numarasıyla aynı stil), ülke altında düz
 * bir kelime olarak. Tek girişle de sayfa bitmiş görünmeli (bkz. Spark
 * revizyon brief §4: "Build and screenshot the single entry case
 * first").
 *
 * Her satır kendi tam genişlik arka planını taşıyor, navy/ivory
 * arasında SIRAYLA alterniyor (bkz. SparkEpisodeList.tsx) — kullanıcı
 * geri bildirimi, 18 Eylül 2026: hem hero'nun (navy) hemen altında
 * kaynaşmış görünüyordu hem de birden fazla bölüm olduğunda satırları
 * renkten ayırt etmenin bir yolu yoktu. `isLast` true olduğunda sayfanın
 * alt boşluğunu (`pb-[120px]`) kendi renkli arka planının içinde taşır
 * — eskiden bunu sarmalayıcı section taşıyordu.
 */
export default function SparkEpisodeRow({
  episode,
  dayCountSingular,
  dayCountPlural,
  dayNotEstablishedLabel,
  hookLabel,
  locale,
  tone,
  isLast,
}: SparkEpisodeRowProps) {
  const isOnIvory = tone === "onIvory";

  return (
    <div
      className={`border-t ${isOnIvory ? "border-charcoal/[0.08] bg-ivory" : "border-ivory/12 bg-navy"} ${
        isLast ? "pb-[120px]" : ""
      }`}
    >
      <div className="mx-auto max-w-[1000px] px-7">
        <div className="py-10 md:py-12">
          <div className="flex flex-wrap items-start gap-x-8 gap-y-5">
            <DayMeasure
              launchDate={episode.launchDate}
              closureDate={episode.closureDate}
              singular={dayCountSingular}
              plural={dayCountPlural}
              notEstablishedLabel={dayNotEstablishedLabel}
              variant="bar"
              tone={tone}
              locale={locale}
              className="shrink-0"
            />
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-xs tracking-[0.14em] text-bronze">
                  {String(episode.number).padStart(2, "0")}
                </span>
                <h2
                  className={`font-display text-[1.6rem] leading-[1.2] font-medium ${
                    isOnIvory ? "text-navy" : "text-ivory"
                  }`}
                >
                  {episode.subject}
                </h2>
              </div>
              <p className={`text-sm ${isOnIvory ? "text-muted" : "text-ivory/60"}`}>{episode.country}</p>
            </div>
          </div>

          <p
            className={`mt-6 max-w-[62ch] text-[1.02rem] leading-[1.65] ${
              isOnIvory ? "text-charcoal/85" : "text-ivory/75"
            }`}
          >
            {episode.hook}
          </p>

          <QuietLink
            href={{
              pathname: "/spark/[formatSlug]/[episodeSlug]",
              params: { formatSlug: episode.formatSlug, episodeSlug: episode.episodeSlug },
            }}
            label={hookLabel}
            tone={tone}
            className="mt-5"
          />
        </div>
      </div>
    </div>
  );
}
