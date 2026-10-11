import CutButton from "@/components/brand/CutButton";
import RadarRich from "@/components/spark/radar/RadarRich";
import { mono } from "@/components/spark/radar/styles";
import type { RadarCloseProps } from "@/types/content";

/** Ink kapanış: sıradaki adım etiketi, başlık, tek cümle ve sitenin randevu penceresini açan Flare cut düğmesi. */
export default function RadarClose({ text, nextLabel, template }: RadarCloseProps) {
  return (
    <section className="on-ink bg-ink px-5 text-[17px] leading-[1.55] text-paper min-[900px]:px-8 min-[1280px]:px-16">
      <div className="mx-auto flex max-w-[1312px] flex-col items-start gap-[22px] pt-16 pb-[72px]">
        <span className={`${mono} text-dust`}>{nextLabel}</span>
        <h2 className="m-0 max-w-[20ch] font-display text-[clamp(26px,3.6vw,34px)] leading-[1.1] font-bold tracking-[-0.025em] text-balance text-paper">
          <RadarRich text={text.close.title} template={template} />
        </h2>
        <p className="m-0 max-w-[52ch] text-[18px]">
          <RadarRich text={text.close.line} template={template} />
        </p>
        <CutButton label={text.close.cta} />
      </div>
    </section>
  );
}
