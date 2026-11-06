import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import type { SmeReadingProps } from "@/types/content";

/**
 * "Bizim okumamız" işareti: fspark9'un yorumu kaynaklı bilgiden ayrı
 * dursun diye mono etiket, yanında Flare nokta (metin değil, Paper'da da
 * izinli), altında yorum cümlesi. Ink zeminde etiket Dust.
 */
export default function SmeReading({ label, text, template, ground = "paper", className = "" }: SmeReadingProps) {
  return (
    <div className={`grid min-w-0 gap-1.5 border-l-2 border-flare pl-3.5 ${className}`}>
      <span
        className={`flex items-center gap-2 font-mono text-[11.5px] leading-[1.4] font-medium tracking-[0.08em] uppercase ${ground === "ink" ? "text-dust" : "text-stone"}`}
      >
        <span aria-hidden="true" className="size-2 flex-none rounded-full bg-flare" />
        {label}
      </span>{" "}
      <p className="m-0 text-[15.5px] leading-[1.5]">
        <Psd3Text text={text} template={template} />
      </p>
    </div>
  );
}
