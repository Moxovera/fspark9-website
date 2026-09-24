import { Link } from "@/i18n/navigation";
import Logo from "@/components/brand/Logo";
import type { SiteChrome } from "@/types/content";

interface FooterProps {
  chrome: SiteChrome;
}

/**
 * Footer (board Main, Legal, HomeMobile): Ink zemin, üstte InkRule çizgi.
 * Masaüstünde tek satır (logo, e-posta, LinkedIn, boşluk, Imprint,
 * copyright), mobilde alt alta. Sadece Imprint linki var; Privacy, Cookies
 * ve Terms yasal sayfalardaki sekmelerden açılıyor (brief v4 §5).
 *
 * Board'da footer, NextStep'in olduğu sayfalarda aynı Ink bölümün
 * içinde duruyor. Burada ayrı bir blok: üst boşluğu (40px / 32px) yasal
 * sayfalardaki haliyle aynı, NextStep kendi alt boşluğunu buna göre
 * ayarlayacak. 900px altında MobileBookingBar'ın altında kalmaması için
 * alt boşluk çubuğun yüksekliği kadar büyüyor.
 */
export default function Footer({ chrome }: FooterProps) {
  const { brandName, footer } = chrome;

  return (
    <footer className="on-ink bg-ink px-5 pt-8 pb-[105px] min-[768px]:px-16 min-[768px]:pt-10 min-[900px]:pb-12">
      <div className="flex flex-col gap-[14px] border-t border-inkrule pt-6 text-[15px] leading-[normal] text-paper min-[768px]:flex-row min-[768px]:items-center min-[768px]:gap-6 min-[1024px]:gap-10 min-[768px]:whitespace-nowrap min-[768px]:pt-7 min-[768px]:text-[14px]">
        <Logo tone="paper" label={brandName} className="h-[22px] self-start" />
        <a href={`mailto:${footer.email}`} className="mt-2 text-paper no-underline min-[768px]:mt-0">
          {footer.email}
        </a>
        <a href={footer.linkedinHref} target="_blank" rel="noopener" className="text-paper no-underline">
          {footer.linkedinLabel}
        </a>
        <div className="hidden flex-grow min-[768px]:block" />
        <div className="flex flex-wrap items-center gap-x-5 text-[14px] text-dust">
          {footer.legalLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex min-h-11 items-center text-dust no-underline min-[768px]:min-h-0"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <span className="text-[14px] text-dust">{footer.copyright}</span>
      </div>
    </footer>
  );
}
