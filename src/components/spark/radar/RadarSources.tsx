import RadarRich from "@/components/spark/radar/RadarRich";
import { sectionLabel } from "@/components/spark/radar/styles";
import type { RadarSourcesProps } from "@/types/content";

/** Sayfanın en altı: numaralı kaynaklar (metindeki [n] işaretleri buraya gelir) ve feragat cümlesi. */
export default function RadarSources({ sources, label, disclaimer, template }: RadarSourcesProps) {
  return (
    <footer className="px-5 text-[17px] leading-[1.55] min-[900px]:px-8 min-[1280px]:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-3 pt-10 pb-16">
        <span className={sectionLabel}>{label}</span>
        <ol className="m-0 flex max-w-[90ch] list-decimal flex-col gap-[6px] pl-[22px] font-mono text-[12px] text-stone">
          {sources.map((source, i) => (
            <li key={source.url} id={`source-${i + 1}`} className="scroll-mt-[108px] [overflow-wrap:anywhere]">
              <a href={source.url} target="_blank" rel="noopener" className="text-stone">
                {source.title}
              </a>
            </li>
          ))}
        </ol>
        <p className="m-0 max-w-[90ch] border-t border-rule pt-[14px] text-[13px] text-stone">
          <RadarRich text={disclaimer} template={template} />
        </p>
      </div>
    </footer>
  );
}
