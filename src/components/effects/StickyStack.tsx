"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

interface StickyStackProps {
  className?: string; // dış sarmalayıcı (flex column)
  cardClassName?: string; // her kartın paylaştığı Tailwind sınıfları
  cardStyle?: CSSProperties; // her kartın paylaştığı statik stil (border, background, box-shadow)
  children: ReactNode[]; // her kart için iç içerik (numara + metin) — server'dan geliyor, klonlanmıyor
}

interface CardGeometry {
  naturalTop: number; // scrollY + rect.top ölçülürken sticky geçici olarak kapatılır
  height: number;
}

const BASE_RATIO = 0.1; // dc.html: base = window.innerHeight * 0.1
const STEP = 30; // dc.html: step = 30

/**
 * dc.html: setupStack() (support.js / DCLogic script) davranışının React'e
 * göre yeniden kurulmuş hali — birebir port değil. Farklar:
 *  - setInterval(tick,16) yerine: IntersectionObserver ile aktif/pasif
 *    kapısı + { passive: true } scroll dinleyicisi + rAF'la kısılmış tek tetik.
 *  - Kart geometrisi (doğal top/height) her karede değil, mount +
 *    ResizeObserver'da BİR KEZ ölçülür; her scroll karesinde sadece
 *    window.scrollY ile aritmetik hesap yapılır, DOM okuması yok.
 *  - document.getElementById/querySelectorAll yerine ref dizisi.
 *  - Sticky pozisyonlanan, ref'lenen kart div'i burada (client) oluşturuluyor
 *    — server'dan gelen children sadece iç içerik, klonlanıp ref enjekte
 *    edilmiyor (Next.js'te server component'ten client'a geçen children'a
 *    cloneElement ile ref eklemek güvenilir çalışmıyor).
 * p (örtüşme oranı) formülü ve kozmetik geçişler (scale/brightness/
 * opacity/box-shadow/border-color) dc.html'deki değerlerle birebir aynı.
 */
export default function StickyStack({
  className,
  cardClassName,
  cardStyle,
  children,
}: StickyStackProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const geometryRef = useRef<CardGeometry[]>([]);
  const wrapGeometryRef = useRef({ docTop: 0, height: 0 });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let active = false;
    let dirty = true;
    let tickScheduled = false;
    let rafId: number | null = null;

    function measure() {
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => !!c);
      const scrollY = window.scrollY;
      geometryRef.current = cards.map((card) => {
        const prevPosition = card.style.position;
        card.style.position = "static";
        const rect = card.getBoundingClientRect();
        card.style.position = prevPosition;
        return { naturalTop: rect.top + scrollY, height: rect.height };
      });
      const wrapRect = wrap!.getBoundingClientRect();
      wrapGeometryRef.current = {
        docTop: wrapRect.top + scrollY,
        height: wrapRect.height,
      };
      dirty = true;
    }

    function computeAndApply() {
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => !!c);
      const geometry = geometryRef.current;
      if (!cards.length || geometry.length !== cards.length) return;

      const scrollY = window.scrollY;
      const base = window.innerHeight * BASE_RATIO;
      const wrapBottomViewport =
        wrapGeometryRef.current.docTop + wrapGeometryRef.current.height - scrollY;

      const viewportTops = geometry.map((g) => g.naturalTop - scrollY);
      const tops = viewportTops.map((top, i) =>
        Math.max(top, Math.min(base + i * STEP, wrapBottomViewport - geometry[i].height)),
      );

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const h = geometry[i].height;
        let p = 0;
        if (i + 1 < cards.length) {
          p = Math.max(0, Math.min(1, (tops[i] + h - tops[i + 1]) / Math.max(h, 1)));
        }
        card.style.transform = `translateY(${tops[i] - viewportTops[i]}px) scale(${1 - 0.05 * p})`;
        card.style.filter = `brightness(${1 - 0.22 * p})`;
        card.style.opacity = String(1 - 0.2 * p);
        card.style.boxShadow = `0 ${26 - 12 * p}px ${70 - 26 * p}px color-mix(in srgb, color-mix(in srgb, var(--navy) 35%, black) ${(0.5 - 0.16 * p) * 100}%, transparent)`;
        card.style.borderColor = `color-mix(in srgb, var(--ivory) ${(0.14 - 0.05 * p) * 100}%, transparent)`;
      }
    }

    function scheduleTick() {
      if (tickScheduled) return;
      tickScheduled = true;
      rafId = requestAnimationFrame(() => {
        tickScheduled = false;
        if (dirty) {
          dirty = false;
          computeAndApply();
        }
      });
    }

    const onScrollOrResize = () => {
      dirty = true;
      scheduleTick();
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      scheduleTick();
    });
    resizeObserver.observe(wrap);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!active) {
            active = true;
            measure();
            window.addEventListener("scroll", onScrollOrResize, { passive: true });
            window.addEventListener("resize", onScrollOrResize, { passive: true });
            scheduleTick();
          }
        } else if (active) {
          active = false;
          window.removeEventListener("scroll", onScrollOrResize);
          window.removeEventListener("resize", onScrollOrResize);
          if (rafId !== null) cancelAnimationFrame(rafId);
          tickScheduled = false;
        }
      },
      { rootMargin: "200px 0px 200px 0px", threshold: 0 },
    );
    intersectionObserver.observe(wrap);

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={cardClassName}
          style={{
            position: "sticky",
            top: `calc(10vh + ${i * 30}px)`,
            transformOrigin: "50% 0%",
            willChange: "transform",
            transition: "box-shadow .4s ease, border-color .4s ease",
            ...cardStyle,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
