import SparkEpisodeRow from "@/components/spark/SparkEpisodeRow";
import type { SparkEpisodeSummary } from "@/types/content";

interface SparkEpisodeListProps {
  episodes: SparkEpisodeSummary[];
  dayCountSingular: string;
  dayCountPlural: string;
  dayNotEstablishedLabel: string;
  hookLabel: string;
  locale: "en" | "tr";
}

/**
 * Dikey liste — grid DEĞİL (bkz. Spark revizyon brief §4).
 */
export default function SparkEpisodeList({
  episodes,
  dayCountSingular,
  dayCountPlural,
  dayNotEstablishedLabel,
  hookLabel,
  locale,
}: SparkEpisodeListProps) {
  if (episodes.length === 0) return null;

  return (
    <div className="flex flex-col">
      {episodes.map((episode) => (
        <SparkEpisodeRow
          key={episode.episodeSlug}
          episode={episode}
          dayCountSingular={dayCountSingular}
          dayCountPlural={dayCountPlural}
          dayNotEstablishedLabel={dayNotEstablishedLabel}
          hookLabel={hookLabel}
          locale={locale}
        />
      ))}
    </div>
  );
}
