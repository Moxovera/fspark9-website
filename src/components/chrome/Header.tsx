import Image from "next/image";
import { Link } from "@/i18n/navigation";
import HeaderFrame from "@/components/chrome/HeaderFrame";
import LocaleSwitcher from "@/components/chrome/LocaleSwitcher";
import MobileNav from "@/components/chrome/MobileNav";
import BookingCta from "@/components/booking/BookingCta";
import type { SiteSettings } from "@/types/content";

interface HeaderProps {
  settings: SiteSettings;
  locale: string;
}

/**
 * Server component — logo/nav/CTA/dil değiştirici hiçbiri scroll veya
 * tıklamaya bağlı değil, sadece <header> etiketinin kendisi (scroll
 * state) ve hamburger (tıklama state) client. Bkz. HeaderFrame.tsx,
 * MobileNav.tsx, LocaleSwitcher.tsx.
 *
 * Üç kırılım noktasından SADECE 1180px (`compact` eşiği) header'ı
 * ilgilendiriyor — dc.html'de bu JS ile (`st.w < 1180`) hesaplanıyor,
 * burada saf CSS breakpoint'i (`min-[1180px]:`) yeterli. 900px eşiği
 * (`narrow`) sadece footer'ın altındaki sabit mobil CTA bar'ını
 * ilgilendiriyor — o ayrı, bu turun kapsamı dışında (bkz. DURUM.md).
 */
export default function Header({ settings, locale }: HeaderProps) {
  const { nav, ctaLabel } = settings;

  return (
    <HeaderFrame>
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
          <LocaleSwitcher locale={locale} />

          <BookingCta className="hidden bg-bronze px-5 py-3 text-sm font-medium whitespace-nowrap text-ivory min-[1180px]:block">
            {ctaLabel}
          </BookingCta>

          <MobileNav nav={nav} ctaLabel={ctaLabel} />
        </div>
      </div>
    </HeaderFrame>
  );
}
