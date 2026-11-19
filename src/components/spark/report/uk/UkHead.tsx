import Psd3Text from "@/components/spark/report/psd3/Psd3Text";
import { monoText } from "@/components/spark/decisions/styles";
import type { UkHeadProps } from "@/types/content";

/** Bölüm başı, Nº 05 ile aynı: 2px üst çizgi, mono numara ve etiket, başlık, giriş. */
export default function UkHead({ head, id, template, ground = "paper" }: UkHeadProps) {
  const ink = ground === "ink";
  return (
    <div className={`mb-[clamp(28px,4vw,48px)] grid gap-2.5 border-t-2 pt-[18px] ${ink ? "border-paper" : "border-ink"}`}>
      <div className={`${monoText} flex flex-wrap gap-3.5 ${ink ? "text-dust" : ""}`}>
        {head.index && <span>{head.index}</span>} <span>{head.label}</span>
      </div>
      <h2 id={id} className="m-0 max-w-[24ch] font-display text-[clamp(28px,3.8vw,46px)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance">
        {head.title}
      </h2>
      {head.lede && (
        <p className={`mt-1 mb-0 max-w-[62ch] ${ink ? "text-dust" : "text-stone"}`}>
          <Psd3Text text={head.lede} template={template} />
        </p>
      )}
    </div>
  );
}
