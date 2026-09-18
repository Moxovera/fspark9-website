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
 *
 * Bilerek AÇIK (ivory) — Story de navy olduğu için ikisi arka arkaya
 * gelince tek bir bloğa kaynaşmış gibi görünüyordu (kullanıcı geri
 * bildirimi, 18 Eylül 2026). Faq/Services/ProofStrip'in aynı ivory-üstü
 * renk kalıbı (text-navy başlık, text-charcoal gövde) burada da
 * kullanılıyor.
 */
export default function SparkHome({ title, intro, teaser, linkLabel }: SparkHomeProps) {
  return (
    <section className="border-t border-charcoal/[0.08] bg-ivory px-7 py-[104px]">
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <h2 className="mb-[22px] font-display text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.12] font-medium text-navy">
            {title}
          </h2>
          <p className="mb-10 max-w-[62ch] text-[1.02rem] leading-[1.68] text-charcoal/85">
            {intro}
          </p>
          {teaser && (
            <div className="mb-10">
              <SparkCard teaser={teaser} />
            </div>
          )}
          <QuietLink href="/spark" label={linkLabel} tone="onIvory" />
        </Reveal>
      </div>
    </section>
  );
}
