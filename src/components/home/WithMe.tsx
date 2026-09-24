import Label from "@/components/brand/Label";
import Reveal from "@/components/ui/Reveal";
import Portrait from "@/components/brand/Portrait";
import type { HomeContent } from "@/types/content";

interface WithMeProps {
  content: HomeContent["withMe"];
}

/**
 * "What you get with me" (board Main #why / HomeMobile). Paper zemin,
 * metin ve yuvarlak portre (masaüstü 400px, mobil 200px), altında dört
 * numarasız madde (copy: "The four points have no numbers").
 */
export default function WithMe({ content }: WithMeProps) {
  return (
    <section className="bg-paper px-5 pt-16 pb-14 min-[900px]:px-8 min-[900px]:py-[136px] min-[1280px]:px-16">
      <Reveal className="flex flex-col gap-12 min-[900px]:gap-24">
        <div className="flex flex-col gap-12 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6">
          <div className="flex flex-col gap-4 min-[900px]:col-span-7 min-[900px]:gap-6">
            <Label>{content.label}</Label>
            <h2 className="m-0 font-display text-[36px] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink min-[900px]:text-[56px] min-[900px]:leading-none">
              {content.heading}
            </h2>
            <p className="m-0 text-[17px] leading-[1.55] text-ink min-[900px]:mt-2 min-[900px]:max-w-[600px] min-[900px]:text-[19px]">
              {content.text}
            </p>
          </div>
          <Portrait
            alt={content.portraitAlt}
            sizes="(min-width: 900px) 400px, 200px"
            className="relative size-[200px] min-[900px]:col-span-4 min-[900px]:col-start-9 min-[900px]:size-auto min-[900px]:aspect-square min-[900px]:w-full min-[900px]:max-w-[400px]"
          />
        </div>

        <div className="flex flex-col gap-9 min-[900px]:grid min-[900px]:grid-cols-4 min-[900px]:gap-x-6 min-[900px]:gap-y-10">
          {content.points.map((point) => (
            <div key={point.title} className="flex flex-col gap-[10px] border-t-2 border-ink pt-4 min-[900px]:gap-3 min-[900px]:pt-5">
              <h3 className="m-0 font-display text-[22px] leading-[1.15] font-bold tracking-[-0.02em] text-ink min-[900px]:min-h-14 min-[900px]:text-[24px]">
                {point.title}
              </h3>
              <p className="m-0 text-[16px] leading-[1.55] text-ink min-[900px]:text-[17px]">{point.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
