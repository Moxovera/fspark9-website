"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface MediaSliderProps {
  children: ReactNode[];
}

/**
 * dc.html: setupMediaSlider() — özel scrollbar (bar/thumb) sürükleme +
 * prev/next okları. Kartların kendisi (Reveal dahil) server'da
 * (Media.tsx) üretilip children olarak geçiriliyor; bu bileşen yalnızca
 * track/bar/thumb/ok mekanizmasını taşır — StickyStack'teki "children
 * klonlanmaz, sadece dış kapsayıcıya ref" deseniyle aynı.
 *
 * dc.html'in track scroll → sync() çağrısı throttle'sız; burada
 * StickyStack/Familiar'daki dirty flag + tek rAF tick dersi uygulanıyor
 * (trackpad'de saniyede onlarca scroll event'i olabilir).
 */
export default function MediaSlider({ children }: MediaSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const bar = barRef.current;
    const thumb = thumbRef.current;
    const prevBtn = prevRef.current;
    const nextBtn = nextRef.current;
    if (!track || !bar || !thumb || !prevBtn || !nextBtn) return;

    const maxScroll = () =>
      Math.max(track.scrollWidth - track.clientWidth, 1);

    const sync = () => {
      const ratio = track.clientWidth / Math.max(track.scrollWidth, 1);
      const w = Math.max(60, bar.clientWidth * ratio);
      thumb.style.width = `${w}px`;
      thumb.style.left = `${(track.scrollLeft / maxScroll()) * (bar.clientWidth - w)}px`;
    };

    let dirty = true;
    let tickScheduled = false;
    let rafId: number | null = null;
    const scheduleSync = () => {
      dirty = true;
      if (tickScheduled) return;
      tickScheduled = true;
      rafId = requestAnimationFrame(() => {
        tickScheduled = false;
        if (dirty) {
          dirty = false;
          sync();
        }
      });
    };

    track.addEventListener("scroll", scheduleSync, { passive: true });
    const resizeObserver = new ResizeObserver(scheduleSync);
    resizeObserver.observe(track);

    const step = () =>
      (track.querySelector("a")?.getBoundingClientRect().width ?? 320) + 24;
    const onPrevClick = () =>
      track.scrollBy({ left: -step(), behavior: "smooth" });
    const onNextClick = () =>
      track.scrollBy({ left: step(), behavior: "smooth" });
    prevBtn.addEventListener("click", onPrevClick);
    nextBtn.addEventListener("click", onNextClick);

    let dragging = false;
    const setFromX = (clientX: number) => {
      const r = bar.getBoundingClientRect();
      const w = thumb.offsetWidth;
      const p = Math.min(
        Math.max((clientX - r.left - w / 2) / Math.max(r.width - w, 1), 0),
        1,
      );
      track.scrollLeft = p * maxScroll();
    };
    const onThumbPointerDown = (e: PointerEvent) => {
      dragging = true;
      thumb.style.cursor = "grabbing";
      e.preventDefault();
    };
    const onBarPointerDown = (e: PointerEvent) => {
      if (e.target !== thumb) setFromX(e.clientX);
    };
    const onWindowPointerMove = (e: PointerEvent) => {
      if (dragging) setFromX(e.clientX);
    };
    const onWindowPointerUp = () => {
      dragging = false;
      thumb.style.cursor = "grab";
    };
    thumb.addEventListener("pointerdown", onThumbPointerDown);
    bar.addEventListener("pointerdown", onBarPointerDown);
    window.addEventListener("pointermove", onWindowPointerMove, {
      passive: true,
    });
    window.addEventListener("pointerup", onWindowPointerUp);

    scheduleSync();
    // dc.html'deki ilk 60ms gecikmeli sync — mount anında layout henüz
    // yerleşmemiş olabileceği için bir kare sonra tekrar dener.
    const settleId = setTimeout(scheduleSync, 60);

    return () => {
      track.removeEventListener("scroll", scheduleSync);
      resizeObserver.disconnect();
      prevBtn.removeEventListener("click", onPrevClick);
      nextBtn.removeEventListener("click", onNextClick);
      thumb.removeEventListener("pointerdown", onThumbPointerDown);
      bar.removeEventListener("pointerdown", onBarPointerDown);
      window.removeEventListener("pointermove", onWindowPointerMove);
      window.removeEventListener("pointerup", onWindowPointerUp);
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(settleId);
    };
  }, []);

  return (
    <>
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto pb-1 [scroll-snap-type:x_mandatory] [scrollbar-width:none]"
      >
        {children}
      </div>

      <div className="mt-[30px] flex items-center gap-7">
        <div
          ref={barRef}
          className="relative h-1 flex-1 cursor-pointer rounded-full bg-navy/[0.12]"
        >
          <div
            ref={thumbRef}
            className="absolute -top-1 left-0 h-3 w-[90px] cursor-grab rounded-full bg-bronze"
          />
        </div>
        <div className="flex flex-none gap-2.5">
          <button
            ref={prevRef}
            type="button"
            aria-label="Previous media item"
            className="media-nav-btn flex h-11 w-11 items-center justify-center rounded-full border border-navy/[0.22] text-navy"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: "currentColor" }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            ref={nextRef}
            type="button"
            aria-label="Next media item"
            className="media-nav-btn flex h-11 w-11 items-center justify-center rounded-full border border-navy/[0.22] text-navy"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: "currentColor" }}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
