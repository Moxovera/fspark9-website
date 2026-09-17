import Reveal from "@/components/ui/Reveal";
import SparkCard from "@/components/spark/SparkCard";
import QuietLink from "@/components/ui/QuietLink";
import type { SparkTeaser } from "@/types/content";

interface SparkHomeProps {
  title: string;
  intro: string; // standfirst'ün ilk iki cümlesi — bkz. queries.ts:toSparkHomeIntro
  teaser?: SparkTeaser;
  linkLabel: string;
}

/**
 * Ana sayfadaki Spark modülü — Story'nin hemen altında, closing CTA'nın
 * üstünde. Standfirst'ün tamamını değil ilk iki cümlesini gösterir
 * (build prompt: "the standfirst's first two sentences"). Hiç
 * yayınlanmış bölüm yoksa teaser kartı render edilmez.
 */
export default function SparkHome({ title, intro, teaser, linkLabel }: SparkHomeProps) {
  return (
    <section className="border-t border-ivory/[0.08] bg-navy px-7 py-[104px]">
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <h2 className="mb-[22px] font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.12] font-medium text-ivory">
            {title}
          </h2>
          <p className="mb-10 max-w-[62ch] text-[1.02rem] leading-[1.68] text-ivory/76">
            {intro}
          </p>
          {teaser && (
            <div className="mb-10">
              <SparkCard teaser={teaser} />
            </div>
          )}
          <QuietLink href="/spark" label={linkLabel} />
        </Reveal>
      </div>
    </section>
  );
}
