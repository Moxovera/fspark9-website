"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

// Açılışı Paper olan sayfalar: header'ları hep açık (board Legal, ThankYou).
// Diğer her sayfa Ink açılışla başlıyor, header koyu başlayıp 80px'ten
// sonra açığa dönüyor.
const LIGHT_ROUTES = new Set(["/impressum", "/terms", "/privacy", "/cookies", "/thank-you"]);
const SCROLL_THRESHOLD = 80;
const HOVER_DELAY = 120;

interface HeaderStateValue {
  servicesOpen: boolean;
  openServices: () => void;
  closeServices: (returnFocus?: boolean) => void;
  toggleServices: () => void;
  scheduleOpenServices: () => void;
  cancelScheduledOpen: () => void;
  registerServicesButton: (el: HTMLButtonElement | null) => void;
}

const HeaderStateContext = createContext<HeaderStateValue | null>(null);

export function useHeaderState() {
  const ctx = useContext(HeaderStateContext);
  if (!ctx) throw new Error("useHeaderState must be used within HeaderFrame");
  return ctx;
}

/**
 * Header'ın client kısmı (brief v4 §5). İçerik server'da (Header.tsx)
 * üretilip children olarak geliyor; burada sadece <header> etiketi ve
 * iki durum var:
 *
 * - Ton: `data-tone="dark"` Ink açılışın üstünde, `light` 80px kaydırınca,
 *   açık sayfalarda ve Services menüsü açıkken. Çocuklar renklerini
 *   `group-data-[tone=light]/header:` ile bundan alıyor.
 * - Services menüsü: tıklama/klavye ile açılır, üzerine gelince 120ms
 *   sonra açılır; Escape, dışarı tıklama ve sayfa değişimi kapatır.
 *
 * Scroll dinleyicisi passive ve rAF ile kısılmış, her olayda layout
 * okumuyor.
 */
export default function HeaderFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const hoverTimer = useRef<number | null>(null);

  useEffect(() => {
    let rafId: number | null = null;
    const apply = () => {
      rafId = null;
      const next = window.scrollY > SCROLL_THRESHOLD;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const cancelScheduledOpen = useCallback(() => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }, []);

  const closeServices = useCallback(
    (returnFocus = false) => {
      cancelScheduledOpen();
      setServicesOpen(false);
      if (returnFocus) buttonRef.current?.focus();
    },
    [cancelScheduledOpen],
  );

  // Sayfa değişince menü kapanır.
  useEffect(() => {
    closeServices();
  }, [pathname, closeServices]);

  // Açıkken: Escape ve header dışına tıklama kapatır.
  useEffect(() => {
    if (!servicesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeServices(true);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) closeServices();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [servicesOpen, closeServices]);

  useEffect(() => cancelScheduledOpen, [cancelScheduledOpen]);

  const value = useMemo<HeaderStateValue>(
    () => ({
      servicesOpen,
      openServices: () => setServicesOpen(true),
      closeServices,
      toggleServices: () => setServicesOpen((open) => !open),
      scheduleOpenServices: () => {
        cancelScheduledOpen();
        hoverTimer.current = window.setTimeout(() => setServicesOpen(true), HOVER_DELAY);
      },
      cancelScheduledOpen,
      registerServicesButton: (el) => {
        buttonRef.current = el;
      },
    }),
    [servicesOpen, closeServices, cancelScheduledOpen],
  );

  const light = LIGHT_ROUTES.has(pathname) || scrolled || servicesOpen;

  return (
    <HeaderStateContext.Provider value={value}>
      <header
        ref={headerRef}
        data-tone={light ? "light" : "dark"}
        onMouseLeave={() => {
          cancelScheduledOpen();
          if (servicesOpen) closeServices();
        }}
        className={`group/header fixed inset-x-0 top-0 z-[95] border-b transition-[background-color,border-color] duration-[240ms] ease-brand ${
          light ? "border-rule bg-paper" : "on-ink border-headrule bg-ink"
        }`}
      >
        {children}
      </header>
    </HeaderStateContext.Provider>
  );
}
