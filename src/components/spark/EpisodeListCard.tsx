import { Link } from "@/i18n/navigation";
import type { LastDayEpisodeSummary } from "@/types/content";

interface EpisodeListCardProps {
  episode: LastDayEpisodeSummary;
}

/**
 * Format sayfasındaki bölüm listesi kartı — bölüm numarası, konu,
 * pazar, gün sayısı başlığı (mono) ve standfirst'ün ilk cümlesi.
 * /spark/[formatSlug]/[episodeSlug] templated bir route — bkz.
 * FormatCard.tsx'teki aynı desen.
 */
export default function EpisodeListCard({ episode }: EpisodeListCardProps) {
  return (
    <Link
      href={{
        pathname: "/spark/[formatSlug]/[episodeSlug]",
        params: { formatSlug: episode.formatSlug, episodeSlug: episode.episodeSlug },
      }}
      className="group block border border-ivory/12 p-8 transition-[border-color,background-color] duration-200 hover:border-bronze/50 hover:bg-ivory/[0.03]"
    >
      <p className="mb-3 font-mono text-xs tracking-[0.14em] text-bronze uppercase">
        {String(episode.number).padStart(2, "0")} ·{" "}
        {/* market lokalize edilmemiş sabit İngilizce özel isim — bkz.
            RecordBlock.tsx'teki aynı gerekçe. */}
        <span lang="en">{episode.market}</span>
      </p>
      <h3 className="mb-2 font-display text-[1.6rem] leading-[1.2] font-medium text-ivory">
        {episode.subject}
      </h3>
      <p className="mb-4 font-mono text-sm tracking-[0.04em] text-ivory/60">
        {episode.dayCountLabel}
      </p>
      <p className="max-w-[58ch] text-[0.98rem] leading-[1.6] text-ivory/72">
        {episode.firstSentence}
      </p>
    </Link>
  );
}
