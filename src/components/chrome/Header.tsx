import { Link } from "@/i18n/navigation";
import Logo from "@/components/brand/Logo";
import Dial from "@/components/brand/Dial";
import Label from "@/components/brand/Label";
import CutButton from "@/components/brand/CutButton";
import HeaderFrame from "@/components/chrome/HeaderFrame";
import LocaleSwitcher from "@/components/chrome/LocaleSwitcher";
import MobileNav from "@/components/chrome/MobileNav";
import { ServicesMenuButton, ServicesMenuPanel } from "@/components/chrome/ServicesMenu";
import type { ServiceSummary, SiteChrome } from "@/types/content";

interface HeaderProps {
  chrome: SiteChrome;
  services: ServiceSummary[];
  locale: string;
}

const NAV_LINK =
  "border-b-2 border-transparent pt-[6px] pb-1 text-[15px] leading-[normal] font-medium text-paper no-underline group-data-[tone=light]/header:text-ink";

/**
 * Header (brief v4 §5, board Main / HeaderSticky / ServicesMenu /
 * HomeMobile). Server component: içerik burada, ton ve menü durumu
 * HeaderFrame'de. Ink açılışın üstünde koyu (Paper metin, Paper buton),
 * 80px kaydırınca açık (Ink metin, Ink buton).
 *
 * 900px ve üstü masaüstü düzen, altı logo ve burger. Board ölçüleri
 * (64px kenar, 64px ara, 40px nav arası) 1280px'ten itibaren birebir;
 * 900 ile 1280 arasında aynı sıra daha dar aralıklarla sığıyor.
 */
export default function Header({ chrome, services, locale }: HeaderProps) {
  return (
    <HeaderFrame>
      <div className="flex h-[63px] items-center justify-between px-5 min-[900px]:h-[83px] min-[900px]:justify-start min-[900px]:gap-8 min-[900px]:px-8 min-[1280px]:gap-16 min-[1280px]:px-16">
        <Link
          href="/"
          aria-label={chrome.homeLabel}
          className="block text-paper group-data-[tone=light]/header:text-ink"
        >
          <Logo label={chrome.brandName} className="h-[22px] min-[900px]:h-[27px]" />
        </Link>

        <nav className="hidden items-center gap-7 min-[900px]:flex min-[1280px]:gap-10">
          <ServicesMenuButton label={chrome.servicesLabel} />
          {chrome.nav.map((item) => (
            <Link key={item.label} href={item.href} className={NAV_LINK}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-grow min-[900px]:block" />

        <div className="hidden min-[900px]:block">
          <LocaleSwitcher locale={locale} />
        </div>

        <div className="hidden min-[900px]:block">
          <CutButton
            label={chrome.bookLabel}
            tone="paper"
            size="header"
            className="transition-colors duration-[240ms] ease-brand group-data-[tone=light]/header:bg-ink group-data-[tone=light]/header:text-paper"
          />
        </div>

        <MobileNav chrome={chrome} services={services} locale={locale} />
      </div>

      <ServicesMenuPanel>
        <div className="grid grid-cols-[260px_repeat(4,minmax(0,1fr))] gap-8 px-8 pt-10 pb-12 min-[1280px]:px-16">
          <Link href="/services" className="flex flex-col gap-[14px] self-start no-underline">
            <Label>{chrome.servicesMenu.label}</Label>
            <span className="font-display text-[22px] leading-[1.15] font-bold tracking-[-0.02em] text-ink">
              {chrome.servicesMenu.heading}
            </span>
          </Link>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={{ pathname: "/services/[slug]", params: { slug: service.slug } }}
              className="flex flex-col gap-[14px] border-t-2 border-ink pt-5 no-underline"
            >
              <Dial lit={service.slices} size={44} />
              <span className="font-display text-[22px] leading-[1.1] font-extrabold tracking-[-0.025em] text-ink">
                {service.name}
              </span>
              <span className="text-[15px] leading-[1.5] text-ink">{service.shortLine}</span>
              <Label>{service.audience}</Label>
            </Link>
          ))}
        </div>
      </ServicesMenuPanel>
    </HeaderFrame>
  );
}
