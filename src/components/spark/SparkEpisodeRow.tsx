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
}

/**
 * Liste sayfasındaki tek bir giriş — dikey liste (grid DEĞİL). Gün
 * ölçüsü satırdaki en büyük öğe, konu adı (Fraunces) yanında, ülke düz
 * bir kelime olarak. Tek girişle de sayfa bitmiş görünmeli (bkz. Spark
 * revizyon brief §4: "Build and screenshot the single entry case
 * first").
 */
export default function SparkEpisodeRow({
  episode,
  dayCountSingular,
  dayCountPlural,
  dayNotEstablishedLabel,
  hookLabel,
  locale,
}: SparkEpisodeRowProps) {
  return (
    <div className="border-t border-ivory/12 py-10 md:py-12">
      <div className="flex flex-wrap items-start gap-x-8 gap-y-5">
        <DayMeasure
          launchDate={episode.launchDate}
          closureDate={episode.closureDate}
          singular={dayCountSingular}
          plural={dayCountPlural}
          notEstablishedLabel={dayNotEstablishedLabel}
          variant="bar"
          tone="onNavy"
          locale={locale}
          className="shrink-0"
        />
        <div className="flex flex-col gap-1 pt-1">
          <h2 className="font-display text-[1.6rem] leading-[1.2] font-medium text-ivory">
            {episode.subject}
          </h2>
          <p className="text-sm text-ivory/60">{episode.country}</p>
        </div>
      </div>

      <p className="mt-6 max-w-[62ch] text-[1.02rem] leading-[1.65] text-ivory/75">
        {episode.hook}
      </p>

      <QuietLink
        href={{
          pathname: "/spark/[formatSlug]/[episodeSlug]",
          params: { formatSlug: episode.formatSlug, episodeSlug: episode.episodeSlug },
        }}
        label={hookLabel}
        className="mt-5"
      />
    </div>
  );
}
