import CutButton from "@/components/brand/CutButton";
import CutWord from "@/components/brand/CutWord";
import Label from "@/components/brand/Label";
import Reveal from "@/components/ui/Reveal";
import type { NextStepContent } from "@/types/content";

interface NextStepProps {
  content: NextStepContent;
  /** Sadece ana sayfada numaralı etiket (kullanıcı kararı, 24 Eylül 2026). */
  numbered?: boolean;
}

/**
 * Ink kapanış bloğu (brief v4 §5 NextStep, board Main #next / HomeMobile).
 * Yasal sayfalar, thank-you ve 404 hariç her sayfanın sonunda. Board'da
 * footer aynı Ink bölümün içinde; burada footer ayrı bir blok ve kendi üst
 * boşluğunu (40px / 32px) taşıyor, bu yüzden alt boşluk board'daki
 * 144px / 80px aralıktan o kadar eksik.
 */
export default function NextStep({ content, numbered = false }: NextStepProps) {
  return (
    <section className="on-ink bg-ink px-5 pt-[88px] pb-12 min-[900px]:px-8 min-[900px]:pt-[152px] min-[900px]:pb-[104px] min-[1280px]:px-16">
      <Reveal className="flex flex-col gap-6 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-start min-[900px]:gap-x-6">
          <div className="contents min-[900px]:col-span-7 min-[900px]:flex min-[900px]:flex-col min-[900px]:gap-8">
            <Label ground="ink">{numbered ? content.homeLabel : content.label}</Label>
            <h2 className="m-0 font-display text-[52px] leading-[0.95] font-extrabold tracking-[-0.04em] text-paper min-[900px]:text-[clamp(80px,7.778vw,112px)] min-[900px]:leading-[0.93] min-[900px]:tracking-[-0.045em]">
              {content.headlineLead} <CutWord>{content.headlineCut}</CutWord>
            </h2>
            <div className="order-last mt-2 min-[900px]:order-none">
              <CutButton label={content.ctaLabel} />
            </div>
          </div>
          <ol className="m-0 mt-2 list-none border-b border-inkrule p-0 min-[900px]:col-span-5 min-[900px]:col-start-8 min-[900px]:mt-14">
            {content.steps.map((step, i) => (
              <li
                key={step}
                className="flex items-baseline gap-[18px] border-t border-inkrule py-[18px] min-[900px]:gap-6 min-[900px]:py-[22px]"
              >
                <span className="font-mono text-[12px] leading-[normal] font-medium text-dust min-[900px]:text-[13px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[18px] leading-[1.4] text-paper min-[900px]:text-[21px]">{step}</span>
              </li>
            ))}
          </ol>
      </Reveal>
    </section>
  );
}
