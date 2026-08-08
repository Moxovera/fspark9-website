"use client";

import { useEffect, useRef } from "react";

const POINT_COUNT = 26; // dc.html: N

// dc.html: rgb(166,124,61) = var(--bronze) tam olarak — kuyrukta bu renk,
// başa (imlecin şu anki konumuna) doğru daha açık/altın bir tona parlıyor.
// Canvas 2D API CSS custom property okuyamadığı için (strokeStyle'da
// var(--bronze) geçersiz) doğrudan RGB kullanılıyor — bkz. globals.css'teki
// off-brand renk notu.
const BRONZE_R = 166;
const BRONZE_G = 124;
const BRONZE_B = 61;

/**
 * dc.html: #fs-trail + setupTrail() (satır 431, 1888-1932). "The side that
 * builds it" bölümünün DOM'unda duruyor ama position:fixed olduğu için
 * görsel olarak tüm viewport'u kaplıyor — dc.html'de tek componentDidMount
 * çağrısıyla kurulup Home'un tamamında aktif kalıyor. Burada aynı davranış
 * page.tsx'in üst seviyesinde, sadece Home'da mount edilerek sağlanıyor.
 *
 * dc.html'deki ox/oy scroll-offset hesabı taşınmadı: canvas zaten
 * position:fixed;inset:0 olduğu için getBoundingClientRect() her zaman
 * {left:0,top:0} döner, o senkronizasyon dc.html'de de fiilen ölü kod.
 *
 * ResizeObserver document.documentElement'i gözlüyor — window.resize değil
 * (CLAUDE.md kuralı). fit() yine de window.innerWidth/innerHeight okuyor,
 * bu yüzden observer'ın hangi sebeple tetiklendiği (viewport resize veya
 * sayfa içeriğinin boyu değişmesi) sonucu etkilemiyor.
 */
export default function CanvasField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dokunmatik cihazda ve prefers-reduced-motion'da hiç kurulmuyor.
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(document.documentElement);

    const points: { x: number; y: number }[] = [];
    let mx = -200;
    let my = -200;
    let px = -200;
    let py = -200;
    let vx = 0;
    let vy = 0;
    let speed = 0;
    let active = false;
    for (let i = 0; i < POINT_COUNT; i++) points.push({ x: px, y: py });

    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      active = true;
    };
    const onPointerLeave = () => {
      active = false;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    let rafId = 0;
    const tick = () => {
      vx += (mx - px) * 0.42;
      vy += (my - py) * 0.42;
      vx *= 0.58;
      vy *= 0.58;
      px += vx;
      py += vy;
      speed += (Math.min(Math.hypot(vx, vy), 42) - speed) * 0.14;
      points.unshift({ x: px, y: py });
      if (points.length > POINT_COUNT) points.pop();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (active && speed > 0.6) {
        for (let i = 1; i < points.length; i++) {
          const a = points[i - 1];
          const b = points[i];
          const tt = 1 - i / points.length;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineWidth = Math.max(0.4, (1.1 + speed * 0.16) * tt) + 2;
          ctx.lineCap = "round";
          ctx.strokeStyle = `rgba(${Math.round(BRONZE_R + 60 * tt)}, ${Math.round(BRONZE_G + 90 * tt)}, ${Math.round(BRONZE_B + 90 * tt)}, ${(0.55 * tt).toFixed(3)})`;
          ctx.stroke();
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90] h-full w-full"
    />
  );
}
