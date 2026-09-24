import CutButton from "@/components/brand/CutButton";
import Label from "@/components/brand/Label";
import Reveal from "@/components/ui/Reveal";

interface ServiceCloseProps {
  label: string;
  text: string;
  ctaLabel: string;
}

/**
 * Hizmet sayfasının Ink kapanışı (board ServiceZTL): "What you walk away
 * with", tek cümle ve randevu butonu. Board'da bu sayfalarda NextStep
 * yok, kapanışı bu blok yapıyor. Alt boşluk footer'ın kendi üst boşluğu
 * düşülerek board'daki aralığa denk.
 */
export default function ServiceClose({ label, text, ctaLabel }: ServiceCloseProps) {
  return (
    <section className="on-ink bg-ink px-5 pt-20 pb-12 min-[900px]:px-8 min-[900px]:pt-[136px] min-[900px]:pb-[88px] min-[1280px]:px-16">
      <Reveal className="flex flex-col gap-6 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6">
        <div className="flex flex-col gap-6 min-[900px]:col-span-9 min-[900px]:gap-7">
          <Label ground="ink">{label}</Label>
          <h2 className="m-0 font-display text-[36px] leading-[1.02] font-extrabold tracking-[-0.035em] text-paper min-[900px]:text-[64px] min-[900px]:leading-none min-[900px]:tracking-[-0.04em]">
            {text}
          </h2>
          <div className="mt-2">
            <CutButton label={ctaLabel} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
