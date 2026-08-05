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
  naturalTop: number; // scrollY + rect.top ölçülürken sticky VE transform geçici olarak kapatılır
  height: number;
}

const BASE_RATIO = 0.1; // dc.html: base = window.innerHeight * 0.1
const STEP = 30; // dc.html: step = 30
const SAFETY_REMEASURES = 3; // aktivasyondan sonra ek güvenlik ölçümü sayısı

/**
 * dc.html: setupStack() (support.js / DCLogic script) davranışının React'e
 * göre yeniden kurulmuş hali — birebir port değil. Farklar:
 *  - setInterval(tick,16) yerine: IntersectionObserver ile aktif/pasif
 *    kapısı + { passive: true } scroll dinleyicisi + rAF'la kısılmış tek tetik.
 *  - Kart geometrisi (doğal top/height) her karede değil, aktivasyonda
 *    (+ ResizeObserver'da) ölçülür; her scroll karesinde sadece
 *    window.scrollY ile aritmetik hesap yapılır, DOM okuması yok.
 *  - document.getElementById/querySelectorAll yerine ref dizisi.
 *  - Sticky pozisyonlanan, ref'lenen kart div'i burada (client) oluşturuluyor
 *    — server'dan gelen children sadece iç içerik, klonlanıp ref enjekte
 *    edilmiyor (Next.js'te server component'ten client'a geçen children'a
 *    cloneElement ile ref eklemek güvenilir çalışmıyor).
 * p (örtüşme oranı) formülü ve kozmetik geçişler (scale/brightness/
 * opacity/box-shadow/border-color) dc.html'deki değerlerle birebir aynı.
 *
 * KONUMLANDIRMA — KRİTİK: Kartların konumunu YALNIZCA CSS `position: sticky`
 * belirler. JS asla translateY yazmaz.
 *
 * Bu bir bug düzeltmesinin sonucu: JS önceden `translateY(tops[i] -
 * viewportTops[i])` yazıyordu. dc.html'in setupStack()'i geometriyi ölçerken
 * sadece transform'u sıfırlar, `position: sticky`'yi AÇIK bırakır — yani
 * oradaki `f.top` zaten PİNLENMİŞ konumdur ve `tops[i] - f.top` pratikte ≈0,
 * etkisiz bir düzeltmedir. Buradaki measure() ise position'ı da `static`
 * yapıp GERÇEK doğal konumu ölçüyor; dolayısıyla `tops[i] - viewportTops[i]`
 * TAM sticky ofseti oluyordu ve CSS'in zaten yaptığı işi ikinci kez
 * uyguluyordu. Ölçüm: +900px scroll'da CSS kartı top=90'a pinliyor, JS
 * translateY(456.6) ile onu top=547'ye geri itiyordu — sticky etkisi görsel
 * olarak iptal oluyor ("kartlar yığılmıyor, normal akışta kayıp gidiyor") ve
 * kartlar yanlış konumlara itildiği için metinler üst üste biniyordu
 * ("hayalet/çift metin"). Hata scroll derinliğiyle büyüdüğü için "bazen
 * çalışıyor" gibi görünüyordu.
 *
 * Artık JS `tops[i]`'yi yalnızca p'yi (örtüşme oranı) türetmek için hesaplar
 * ve sadece kozmetik yazar: scale / brightness / opacity / box-shadow /
 * border-color. Konumlandırma tamamen CSS'e ait.
 *
 * Ayrıca measure() hem position hem transform'u sıfırlar: ResizeObserver
 * spec gereği .observe() sonrası garanti bir ilk callback tetikler; bu,
 * kartlara stil uygulandıktan sonra gelirse dönüştürülmüş kutuyu ölçerdi.
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
    let activationToken = 0;

    function measure() {
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => !!c);
      const scrollY = window.scrollY;
      geometryRef.current = cards.map((card) => {
        const prevPosition = card.style.position;
        const prevTransform = card.style.transform;
        card.style.position = "static";
        card.style.transform = "none";
        const rect = card.getBoundingClientRect();
        card.style.position = prevPosition;
        card.style.transform = prevTransform;
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

      // tops[i] = tarayıcının CSS sticky ile kartı ZATEN render ettiği konum.
      // Bunu yeniden uygulamıyoruz (bkz. yukarıdaki KONUMLANDIRMA notu);
      // sadece p'yi (bir sonraki kartın bu kartı ne kadar örttüğü) türetmek
      // için hesaplıyoruz.
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
        card.style.transform = `scale(${1 - 0.05 * p})`;
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

    function startLoop() {
      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      window.addEventListener("resize", onScrollOrResize, { passive: true });
      scheduleTick();
    }

    function stopLoop() {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      tickScheduled = false;
    }

    function activate() {
      active = true;
      const token = ++activationToken;
      const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
      fontsReady.then(() => {
        if (token !== activationToken || !active) return;
        requestAnimationFrame(() => {
          if (token !== activationToken || !active) return;
          measure();
          startLoop();
          // Fontlar "ready" olsa bile geç bir layout yerleşmesi ihtimaline
          // karşı birkaç kare daha yeniden ölç — artık measure() transform'u
          // da sıfırladığı için bunu tekrar tekrar çağırmak güvenli.
          let safetyChecks = 0;
          const safetyTick = () => {
            if (token !== activationToken || !active) return;
            safetyChecks++;
            measure();
            scheduleTick();
            if (safetyChecks < SAFETY_REMEASURES) {
              requestAnimationFrame(safetyTick);
            }
          };
          requestAnimationFrame(safetyTick);
        });
      });
    }

    // ResizeObserver spec'i gereği .observe() sonrası boyut değişmese bile
    // garanti bir "ilk" callback gelir — bunu, activate() zaten kendi
    // ölçümünü yaptığı için görmezden geliyoruz (gereksiz tekrar).
    let resizeCallCount = 0;
    const resizeObserver = new ResizeObserver(() => {
      resizeCallCount++;
      if (resizeCallCount === 1) return;
      measure();
      scheduleTick();
    });
    resizeObserver.observe(wrap);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!active) activate();
        } else if (active) {
          active = false;
          activationToken++;
          stopLoop();
        }
      },
      { rootMargin: "200px 0px 200px 0px", threshold: 0 },
    );
    intersectionObserver.observe(wrap);

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      active = false;
      activationToken++;
      stopLoop();
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
            zIndex: i + 1,
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
