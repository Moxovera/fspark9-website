"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import Logo from "@/components/brand/Logo";
import Dial from "@/components/brand/Dial";
import CutButton from "@/components/brand/CutButton";
import LocaleSwitcher from "@/components/chrome/LocaleSwitcher";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { useMobileMenu } from "@/components/chrome/MobileMenuContext";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import type { ServiceSummary, SiteChrome } from "@/types/content";

interface MobileNavProps {
  chrome: SiteChrome;
  services: ServiceSummary[];
  locale: string;
}

const BIG_LINK =
  "block border-b border-inkrule py-[18px] font-display text-[28px] leading-[normal] font-extrabold tracking-[-0.03em] text-paper no-underline";

/**
 * Mobil menü (board MobileMenu): 900px altında burger, açılınca tam ekran
 * Ink katman. Odak katmanın içinde kalır, Escape ve kapatma butonu
 * kapatır, odak burger'a döner, sayfa kaymaz (useDialogFocus). Sayfa
 * değişince ve "Book a call"a basınca kapanır.
 */
export default function MobileNav({ chrome, services, locale }: MobileNavProps) {
  const { isOpen, setOpen } = useMobileMenu();
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), [setOpen]);

  useDialogFocus(isOpen, sheetRef, burgerRef, close);

  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        aria-label={chrome.menuOpenLabel}
        aria-expanded={isOpen}
        onClick={() => setOpen(true)}
        className="flex size-11 cursor-pointer items-center justify-end text-paper group-data-[tone=light]/header:text-ink min-[900px]:hidden"
      >
        <MenuIcon className="size-6" strokeWidth="2" strokeLinecap="butt" />
      </button>

      {isOpen && (
        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label={chrome.menuLabel}
          className="on-ink sheet-in-right fixed inset-0 z-[110] flex flex-col overflow-y-auto bg-ink min-[900px]:hidden"
        >
          <div className="flex h-16 flex-none items-center justify-between border-b border-headrule px-5">
            <Link href="/" aria-label={chrome.homeLabel} className="flex min-h-11 items-center">
              <Logo tone="paper" label={chrome.brandName} className="h-[22px]" />
            </Link>
            <button
              type="button"
              aria-label={chrome.menuCloseLabel}
              onClick={close}
              className="flex size-11 cursor-pointer items-center justify-end text-paper"
            >
              <CloseIcon className="size-[22px]" strokeWidth="2.2" strokeLinecap="butt" />
            </button>
          </div>

          <nav className="flex flex-grow flex-col px-5 pt-2 pb-8">
            <div className="border-b border-inkrule py-[18px]">
              <button
                type="button"
                aria-expanded={servicesExpanded}
                aria-controls="mobile-services"
                onClick={() => setServicesExpanded((open) => !open)}
                className="flex w-full cursor-pointer items-center justify-between font-display text-[28px] leading-[normal] font-extrabold tracking-[-0.03em] text-paper"
              >
                {chrome.servicesLabel}
                <ChevronDownIcon className={`size-[19px] flex-none ${servicesExpanded ? "rotate-180" : ""}`} />
              </button>
              <div id="mobile-services" hidden={!servicesExpanded} className="flex flex-col pt-3">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={{ pathname: "/services/[slug]", params: { slug: service.slug } }}
                    className="flex items-center gap-[14px] py-3 text-[17px] text-paper no-underline"
                  >
                    <Dial lit={service.slices} size={28} tone="ink" />
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            {chrome.nav.map((item) => (
              <Link key={item.label} href={item.href} className={BIG_LINK}>
                {item.label}
              </Link>
            ))}

            <div className="flex-grow" />

            <div className="flex flex-col gap-6 pt-8">
              <LocaleSwitcher locale={locale} ground="ink" />
              <div onClickCapture={close}>
                <CutButton label={chrome.bookLabel} className="w-full" />
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
