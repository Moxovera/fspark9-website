import SparkMark from "@/components/spark/newsletter/SparkMark";
import SparkSubscribe from "@/components/spark/newsletter/SparkSubscribe";
import type { NewsletterStripProps } from "@/types/content";

/**
 * Her zaman açık tek satırlık bülten formu (Ink zeminde). Footer'da
 * `id="bulten"` ile durur (menü girişleri ve sabit kutu buna bağlı);
 * dil bilmeyen 404'te iki dil için birer tane, id'siz.
 */
export default function NewsletterStrip({ newsletter, locale, id, className }: NewsletterStripProps) {
  return (
    <div
      id={id}
      className={`flex scroll-mt-24 flex-col gap-4 border-t border-inkrule pt-6 min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between min-[900px]:gap-10 ${className ?? ""}`}
    >
      <div className="flex flex-col gap-2 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-5">
        <div className="flex items-center gap-[10px]">
          <SparkMark />
          <h2 className="m-0 font-display text-[22px] leading-[1.2] font-extrabold tracking-[-0.02em] text-paper">{newsletter.footerHeading}</h2>
        </div>
        <p className="m-0 font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] text-dust uppercase">{newsletter.footerLabel}</p>
      </div>
      <SparkSubscribe variant="inline-dark" size="footer" locale={locale} content={newsletter} className="w-full min-[900px]:max-w-[480px]" />
    </div>
  );
}
