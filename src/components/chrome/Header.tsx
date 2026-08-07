import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { SiteSettings } from "@/types/content";

interface HeaderProps {
  settings: SiteSettings;
  locale: string;
}

/**
 * dc.html: header her zaman `position: fixed`, arka planı `dark` state'ine
 * göre saydam/koyu geçiş yapıyor (`st.scrolled || page !== 'home'`). Bu
 * geçişte header sabit koyu başlıyor — scroll/alt sayfa mantığı Geçiş
 * C'de.
 *
 * Üç kırılım noktasından SADECE 1180px (`compact` eşiği) header'ı
 * ilgilendiriyor — dc.html'de bu JS ile (`st.w < 1180`) hesaplanıyor,
 * burada saf CSS breakpoint'i (`min-[1180px]:`) yeterli, JS/state
 * gerekmiyor. 900px eşiği (`narrow`) sadece footer'ın altındaki sabit
 * mobil CTA bar'ını ilgilendiriyor — o ayrı, bu turun kapsamı dışında.
 *
 * Hamburger ikonu burada kasıtlı olarak <button> değil, düz <div> —
 * henüz hiçbir tıklama/aç-kapa mantığı yok (Geçiş C'de FaqAccordion
 * presedanındaki gibi gerçek erişilebilir <button>'a çevrilecek).
 */
export default function Header({ settings, locale }: HeaderProps) {
  const { nav, ctaLabel, ctaHref } = settings;

  return (
    <header className="fixed inset-x-0 top-0 z-[95] border-b border-ivory/10 bg-[color-mix(in_srgb,color-mix(in_srgb,var(--navy)_75%,black_25%)_88%,transparent)] backdrop-blur-[14px]">
      <div className="mx-auto flex h-[90px] max-w-[1280px] items-center justify-between gap-[26px] px-7">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/assets/lockup-reversed.svg"
            alt="fspark9"
            width={152}
            height={43}
            className="h-auto w-[152px]"
          />
        </Link>

        <nav className="hidden items-center gap-[26px] min-[1180px]:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14.5px] whitespace-nowrap text-ivory/82"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-[18px]">
          <div className="flex items-center gap-[7px] font-mono text-[12.5px] tracking-[0.08em]">
            <Link
              href="/"
              locale="en"
              className={locale === "en" ? "text-ivory" : "text-ivory/45"}
            >
              EN
            </Link>
            <span className="text-ivory/30">|</span>
            <Link
              href="/"
              locale="tr"
              className={locale === "tr" ? "text-ivory" : "text-ivory/45"}
            >
              TR
            </Link>
          </div>

          <Link
            href={ctaHref}
            className="hidden bg-bronze px-5 py-3 text-sm font-medium whitespace-nowrap text-ivory min-[1180px]:block"
          >
            {ctaLabel}
          </Link>

          <div className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] min-[1180px]:hidden">
            <span className="block h-[1.5px] w-6 bg-ivory" />
            <span className="block h-[1.5px] w-6 bg-ivory" />
            <span className="block h-[1.5px] w-6 bg-ivory" />
          </div>
        </div>
      </div>
    </header>
  );
}
