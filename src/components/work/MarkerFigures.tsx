import Reveal from "@/components/ui/Reveal";
import CountUpValue from "@/components/work/CountUpValue";
import type { FigureItem } from "@/types/content";

interface MarkerFiguresProps {
  figures: FigureItem[];
  locale: string;
}

/**
 * Vaka rakamları (brand book v3 §5 "Marker block", board CaseInsha): sayfanın
 * sol kenarından gelen tek Flare blok, sağ kenarı eğik (masaüstü 64px,
 * mobil 36px), rakamlar Ink, aralarında 1px Ink çizgi. Board'daki 96px
 * rakamlar üç sütuna ancak 1280px'ten itibaren sığıyor; altında mobil
 * düzen (alt alta) kullanılıyor. Görünür olunca blok soldan açılır, sonra
 * rakamlar sayar.
 */
export default function MarkerFigures({ figures, locale }: MarkerFiguresProps) {
  return (
    <section className="bg-white pt-12 pb-10 min-[1280px]:py-24">
      <Reveal className="marker-wipe mr-5 flex flex-col gap-[18px] bg-flare pt-8 pr-14 pb-9 pl-5 [--slant:36px] [clip-path:polygon(0_0,100%_0,calc(100%-var(--slant))_100%,0_100%)] min-[900px]:mr-16 min-[900px]:pl-8 min-[1280px]:mr-[120px] min-[1280px]:flex-row min-[1280px]:gap-10 min-[1280px]:pt-14 min-[1280px]:pr-[120px] min-[1280px]:pb-[60px] min-[1280px]:pl-16 min-[1280px]:[--slant:64px]">
        {figures.map((figure, i) => (
          <div
            key={figure.label}
            className={`flex flex-1 flex-col gap-[6px] min-[1280px]:gap-3 ${
              i > 0 ? "border-t border-ink pt-[18px] min-[1280px]:border-t-0 min-[1280px]:border-l min-[1280px]:pt-0 min-[1280px]:pl-10" : ""
            }`}
          >
            <CountUpValue
              value={figure.value}
              locale={locale}
              className="font-display text-[52px] leading-none font-extrabold tracking-[-0.04em] whitespace-nowrap text-ink min-[900px]:text-[72px] min-[1280px]:text-[96px] min-[1280px]:leading-[0.95] min-[1280px]:tracking-[-0.05em]"
            />
            <span className="font-mono text-[11px] leading-[normal] font-medium tracking-[0.08em] text-ink uppercase min-[1280px]:text-[12px] min-[1280px]:tracking-[0.1em]">
              {figure.label}
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
