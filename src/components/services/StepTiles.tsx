import Dial from "@/components/brand/Dial";
import Label from "@/components/brand/Label";
import Reveal from "@/components/ui/Reveal";
import type { ServiceStep } from "@/types/content";

interface StepTilesProps {
  label: string;
  steps: ServiceStep[];
}

/**
 * "What we do together" (board ServiceZTL, brand book "Work tile"): White
 * kutular Paper üstünde, masaüstünde üçlü. Her kutuda adımın kendi
 * dilimleriyle küçük kadran, sıra numarası, adım adı ve bir satır.
 * Copy'de adı olmayan adımlarda (Zero to Live dışındaki üç hizmet) sadece
 * satır duruyor. Kadranlar görünür olunca dilim dilim dolar (brief §10).
 */
export default function StepTiles({ label, steps }: StepTilesProps) {
  return (
    <section className="flex flex-col gap-5 bg-paper px-5 pt-12 pb-[72px] min-[900px]:gap-8 min-[900px]:px-8 min-[900px]:pt-24 min-[900px]:pb-[136px] min-[1280px]:px-16">
      <Label>{label}</Label>
      <Reveal className="dial-fill flex flex-col gap-2 border-t-2 border-ink pt-3 min-[900px]:grid min-[900px]:grid-cols-3 min-[900px]:gap-6 min-[900px]:pt-6">
        {steps.map((step, i) => (
          <div key={step.line} className="flex flex-col gap-[10px] bg-white px-5 pt-5 pb-[22px] min-[900px]:gap-[14px] min-[900px]:px-8 min-[900px]:pt-8 min-[900px]:pb-9">
            <div className="flex items-center justify-between">
              <Dial lit={step.slices} size={36} className="min-[900px]:size-12" />
              <span className="font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-stone">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            {step.title && (
              <h3 className="m-0 mt-2 font-display text-[22px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink min-[900px]:mt-4 min-[900px]:text-[26px]">
                {step.title}
              </h3>
            )}
            <p
              className={`m-0 leading-[1.55] ${step.title ? "text-[15px] text-stone min-[900px]:text-[16px]" : "mt-2 text-[17px] text-ink min-[900px]:mt-4"}`}
            >
              {step.line}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
