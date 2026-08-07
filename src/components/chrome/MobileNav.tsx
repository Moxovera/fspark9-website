"use client";

import { useState } from "react";
import type { CSSProperties, ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { useBooking } from "@/hooks/useBooking";
import type { Link as NavLink } from "@/types/content";

interface MobileNavProps {
  nav: NavLink[];
  ctaLabel: string;
}

// bkz. Header.tsx — content.ts'in genel Link[] tipi next-intl'in
// pathnames union'ıyla birebir örtüşmüyor.
type LinkHref = ComponentProps<typeof Link>["href"];

/**
 * dc.html: state.menu (tek boolean), toggleMenu = !menu — Faq'daki gibi
 * tek kontrol hem açar hem kapatır, ayrı bir ✕ butonu yok. Panel
 * `sc-if`, gerçek mount/unmount (display:none değil). Hamburger
 * ikonunun çubukları dc.html'in bar() fonksiyonuyla birebir aynı
 * transform/transition değerlerini kullanıyor.
 *
 * ≥1180px'te hem buton hem panel CSS ile gizli (min-[1180px]:hidden) —
 * dc.html'deki `compact &&` şartının CSS karşılığı, resize dinleyicisi
 * gerekmiyor (responsive geçiş zaten Geçiş A'da saf CSS'e bağlandı).
 */
export default function MobileNav({ nav, ctaLabel }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const { open: openBooking } = useBooking();

  const topBarStyle: CSSProperties = {
    transition: "transform .3s ease, opacity .2s ease",
    transform: open ? "rotate(45deg) translateY(6.5px)" : "none",
  };
  const midBarStyle: CSSProperties = {
    transition: "opacity .2s ease",
    opacity: open ? 0 : 1,
  };
  const botBarStyle: CSSProperties = {
    transition: "transform .3s ease, opacity .2s ease",
    transform: open ? "rotate(-45deg) translateY(-6.5px)" : "none",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label="Menu"
        className="focus-visible:outline-bronze flex h-11 w-11 flex-col items-center justify-center gap-[5px] focus-visible:outline-2 focus-visible:outline-offset-2 min-[1180px]:hidden"
      >
        <span className="block h-[1.5px] w-6 bg-ivory" style={topBarStyle} />
        <span className="block h-[1.5px] w-6 bg-ivory" style={midBarStyle} />
        <span className="block h-[1.5px] w-6 bg-ivory" style={botBarStyle} />
      </button>

      {open && (
        <div
          className="fs-fade absolute inset-x-0 top-full border-t border-ivory/10 bg-[color-mix(in_srgb,color-mix(in_srgb,var(--navy)_75%,black_25%)_97%,transparent)] px-7 pt-[22px] pb-[30px] backdrop-blur-[14px] min-[1180px]:hidden"
          style={{ animationDuration: "0.25s" }}
        >
          <nav className="mx-auto flex max-w-[1280px] flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href as LinkHref}
                onClick={() => setOpen(false)}
                className="border-b border-ivory/[0.08] py-3 font-display text-[1.35rem] text-ivory"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className="mt-5 block w-full bg-bronze px-[22px] py-4 text-center text-[15px] font-medium text-ivory"
            >
              {ctaLabel}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
