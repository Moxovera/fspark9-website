
import type { IntroTextProps } from "@/types/content";

/** Açılışın altındaki büyük giriş paragrafı (board ServiceZTL, WorkList): Paper, 26px (mobil 20px). */
export default function IntroText({ text }: IntroTextProps) {
  return (
    <section className="bg-paper px-5 pt-14 pb-6 min-[900px]:px-8 min-[900px]:pt-24 min-[1280px]:px-16">
      <div className="min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:gap-x-6">
        <p className="m-0 text-[20px] leading-[1.5] text-ink min-[900px]:col-span-8 min-[900px]:max-w-[640px] min-[900px]:text-[26px] min-[900px]:leading-[1.45] min-[900px]:tracking-[-0.005em]">
          {text}
        </p>
      </div>
    </section>
  );
}
