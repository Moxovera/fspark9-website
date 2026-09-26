import { Link } from "@/i18n/navigation";
import GoButton from "@/components/brand/GoButton";
import type { SparkEpisodeRowProps } from "@/types/content";

/**
 * Son Gün bölüm satırı (prototip son-gun-01-bo-v3 `.ep`): solda küçük kart
 * (yayındaysa Flare, çipin çerçevesiyle; sıradaysa kesikli Rule çerçeve),
 * ad, tek satır, mono Nº ve kare ok. Yayındaki satır link, üzerine gelince
 * ok Flare'e döner ve 4px kayar. Sıradaki satır Stone, linksiz, oksuz.
 * Format sayfası listesinde ve bölüm sonundaki "sıradaki" satırında.
 */
export default function SparkEpisodeRow({ title, line, meta, href }: SparkEpisodeRowProps) {
  const body = (
    <>
      {href ? (
        <span aria-hidden="true" className="relative h-[62px] w-10 bg-flare">
          <span className="absolute top-[10px] left-[7px] h-[9px] w-[11px] border-[1.5px] border-ink" />
        </span>
      ) : (
        <span aria-hidden="true" className="h-[62px] w-10 border-2 border-dashed border-rule" />
      )}
      <span className="flex min-w-0 flex-col">
        <span className="font-display text-[28px] leading-[1.1] font-bold tracking-[-0.02em]">{title}</span>
        <span className="text-[16px] leading-[1.6] text-stone">{line}</span>
      </span>
      <span className="hidden font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] whitespace-nowrap uppercase min-[761px]:block">
        {meta}
      </span>
      {href ? <GoButton size={44} className="go-flare min-[761px]:size-12 min-[761px]:text-[20px]" /> : <span />}
    </>
  );
  const row =
    "grid grid-cols-[48px_1fr_44px] items-center gap-6 border-b border-rule py-6 no-underline min-[761px]:grid-cols-[72px_1fr_auto_52px]";

  return href ? (
    <Link href={href} className={`group text-ink ${row}`}>
      {body}
    </Link>
  ) : (
    <div className={`text-stone ${row}`}>{body}</div>
  );
}
