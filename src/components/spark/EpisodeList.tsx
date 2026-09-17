import EpisodeListCard from "@/components/spark/EpisodeListCard";
import type { LastDayEpisodeSummary } from "@/types/content";

interface EpisodeListProps {
  episodes: LastDayEpisodeSummary[];
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  if (episodes.length === 0) return null;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
      {episodes.map((episode) => (
        <EpisodeListCard key={episode.episodeSlug} episode={episode} />
      ))}
    </div>
  );
}
