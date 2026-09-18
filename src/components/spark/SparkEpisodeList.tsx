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
 * Dikey liste — grid DEĞİL (bkz. Spark revizyon brief §4). Satırlar
 * navy/ivory arasında SIRAYLA alterniyor, ilk satır her zaman ivory
 * (üstündeki hero her zaman navy) — bkz. SparkEpisodeRow.tsx yorumu.
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
      {episodes.map((episode, index) => (
        <SparkEpisodeRow
          key={episode.episodeSlug}
          episode={episode}
          dayCountSingular={dayCountSingular}
          dayCountPlural={dayCountPlural}
          dayNotEstablishedLabel={dayNotEstablishedLabel}
          hookLabel={hookLabel}
          locale={locale}
          tone={index % 2 === 0 ? "onIvory" : "onNavy"}
          isLast={index === episodes.length - 1}
        />
      ))}
    </div>
  );
}
