import { Link } from "@/i18n/navigation";
import type { PageHero } from "@/types/content";

interface SubpageHeroProps {
  hero: PageHero;
  backLabel: string;
}

/**
 * dc.html: tüm alt sayfaların (isSub) ortak üst bloğu (satır 713-725).
 * Home'un Hero'sundan farklı olarak hiçbir alanı data-reveal değil —
 * sayfa yüklendiğinde zaten görünür durumda, scroll'a bağlı animasyon
 * yok.
 *
 * "Geri" pill'i dc.html'de goBackHome() ile ana sayfaya dönüp önceki
 * scroll pozisyonunu geri yüklüyor (SPA'nın kendi bellek hack'i) —
 * burada kasıtlı bir sapma: basit <Link href="/">, scroll hafızası
 * taşınmadı (Next.js'in kendi route/scroll davranışı yeterli).
 *
 * Henüz hiçbir route'ta kullanılmıyor — alt sayfalar kurulunca
 * bağlanacak.
 */
export default function SubpageHero({ hero, backLabel }: SubpageHeroProps) {
  const { eyebrow, title, intro } = hero;

  return (
    <section className="bg-navy px-7 pt-[182px] pb-24">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-[11px] rounded-full border border-ivory/22 py-2.5 pr-[18px] pl-3"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ stroke: "var(--bronze)" }}
          >
            <line x1="20" y1="12" x2="5" y2="12" />
            <polyline points="11 5 4 12 11 19" />
          </svg>
          <span className="font-mono text-xs tracking-[0.1em] text-ivory/80 uppercase">
            {backLabel}
          </span>
        </Link>

        <p className="mb-[22px] font-mono text-xs tracking-[0.14em] text-bronze uppercase">
          {eyebrow}
        </p>
        <h1 className="mb-[26px] max-w-[22ch] font-display text-[clamp(2.3rem,5vw,4rem)] leading-[1.08] font-medium tracking-[-0.01em] text-ivory">
          {title}
        </h1>
        <p className="max-w-[62ch] text-[1.08rem] leading-[1.68] text-ivory/74">
          {intro}
        </p>
      </div>
    </section>
  );
}
