import Label from "@/components/brand/Label";
import Reveal from "@/components/ui/Reveal";
import type { HomeContent } from "@/types/content";

interface StartWhereYouAreProps {
  content: HomeContent["startWhereYouAre"];
}

/**
 * "Start where you are" (board Main #start / HomeMobile). Üç kart, link
 * yok (copy: "No links inside the cards"). Alt boşluk yok: bölüm doğrudan
 * Four services'e akıyor.
 */
export default function StartWhereYouAre({ content }: StartWhereYouAreProps) {
  return (
    <section className="bg-paper px-5 pt-20 min-[900px]:px-8 min-[900px]:pt-[136px] min-[1280px]:px-16">
      <Reveal className="flex flex-col gap-10 min-[900px]:gap-16">
        <div className="flex flex-col gap-4 min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-end min-[900px]:gap-x-6">
          <div className="flex flex-col gap-4 min-[900px]:col-span-6 min-[900px]:gap-5">
            <Label>{content.label}</Label>
            <h2 className="m-0 font-display text-[36px] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink min-[900px]:text-[56px] min-[900px]:leading-none">
              {content.heading}
            </h2>
          </div>
          <p className="m-0 text-[17px] leading-[1.55] text-ink min-[900px]:col-span-5 min-[900px]:col-start-8 min-[900px]:text-[19px] min-[900px]:leading-[1.5]">
            {content.text}
          </p>
        </div>

        <div className="flex flex-col gap-12 min-[900px]:grid min-[900px]:grid-cols-3 min-[900px]:gap-x-6">
          {content.items.map((item) => (
            <div key={item.title} className="flex flex-col gap-[14px] border-t-2 border-ink pt-5 min-[900px]:gap-4 min-[900px]:pt-6">
              <h3 className="m-0 font-display text-[26px] leading-[1.05] font-extrabold tracking-[-0.03em] text-ink min-[900px]:text-[32px]">
                {item.title}
              </h3>
              <p className="m-0 text-[17px] leading-[1.55] text-ink">{item.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
