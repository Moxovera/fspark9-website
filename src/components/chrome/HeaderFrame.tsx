"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface HeaderFrameProps {
  children: ReactNode;
}

/**
 * dc.html: dark = st.scrolled || page !== 'home', scrolled = scrollY > 40.
 * Sadece header'ın kendi arka plan/backdrop-filter/border rengini
 * etkiliyor — logo/nav/CTA/dil değiştirici hiçbiri scroll'a bağlı değil,
 * bu yüzden onlar server'da (Header.tsx) üretilip children olarak
 * geçiyor, sadece <header> etiketinin kendisi burada (StickyStack'teki
 * "children klonlanmaz, sadece dış kapsayıcıya state" deseniyle aynı).
 *
 * dc.html'in kendi scroll dinleyicisi throttle'sız; burada Familiar/
 * StickyStack/MediaSlider'daki dirty flag + tek rAF tick dersi
 * uygulanıyor.
 *
 * Alt sayfalar henüz yok (page !== 'home' koşulu şimdilik anlamsız) —
 * bu yüzden forceDark gibi bir prop eklenmedi, alt sayfalar kurulunca
 * tek satırlık bir ek olur.
 */
export default function HeaderFrame({ children }: HeaderFrameProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let dirty = false;
    let tickScheduled = false;
    let rafId: number | null = null;

    const apply = () => {
      const next = window.scrollY > 40;
      setScrolled((prev) => (prev === next ? prev : next));
    };

    const scheduleTick = () => {
      dirty = true;
      if (tickScheduled) return;
      tickScheduled = true;
      rafId = requestAnimationFrame(() => {
        tickScheduled = false;
        if (dirty) {
          dirty = false;
          apply();
        }
      });
    };

    window.addEventListener("scroll", scheduleTick, { passive: true });
    scheduleTick();

    return () => {
      window.removeEventListener("scroll", scheduleTick);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const headerStyle: CSSProperties = {
    background: scrolled
      ? "color-mix(in srgb, color-mix(in srgb, var(--navy) 75%, black 25%) 88%, transparent)"
      : "transparent",
    backdropFilter: scrolled ? "blur(14px)" : "none",
    borderBottomColor: scrolled
      ? "color-mix(in srgb, var(--ivory) 10%, transparent)"
      : "transparent",
    transition:
      "background .4s ease, backdrop-filter .4s ease, border-color .4s ease",
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-[95] border-b"
      style={headerStyle}
    >
      {children}
    </header>
  );
}
