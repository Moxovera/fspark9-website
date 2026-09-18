import { Link } from "@/i18n/navigation";
import type { SparkTeaser } from "@/types/content";

interface SparkCardProps {
  teaser: SparkTeaser;
}

/**
 * "The spark" teaser — büyük mono rakam + tek cümle, en güncel
 * yayınlanmış bölüme link verir. Reusable: birden fazla format
 * yayına girdiğinde her biri kendi en güncel bölümü için bu bileşeni
 * kullanabilir (bkz. build prompt: "Build this as a SparkCard
 * component, reusable").
 *
 * /spark/[formatSlug]/[episodeSlug] templated bir route — bkz.
 * FormatCard.tsx'teki aynı desen.
 */
export default function SparkCard({ teaser }: SparkCardProps) {
  return (
    <Link
      href={{
        pathname: "/spark/[formatSlug]/[episodeSlug]",
        params: { formatSlug: teaser.formatSlug, episodeSlug: teaser.episodeSlug },
      }}
      className="group block border border-bronze/30 bg-navy/[0.03] p-10 transition-[border-color,background-color] duration-200 hover:border-bronze/60 hover:bg-navy/[0.05]"
    >
      <p className="mb-4 font-mono text-[clamp(2.2rem,5vw,3.4rem)] leading-none tracking-[-0.01em] text-bronze">
        {teaser.figure}
      </p>
      <p className="max-w-[58ch] text-[1.02rem] leading-[1.66] text-charcoal/85">{teaser.line}</p>
    </Link>
  );
}
