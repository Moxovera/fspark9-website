"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/icons";
import VideoModal from "@/components/ui/VideoModal";
import { useClipPreview } from "@/hooks/useClipPreview";
import { SLOWER_CONNECTIONS } from "@/lib/videoPreview";
import type { SparkFilmCardProps } from "@/types/content";

/**
 * Spark sayfasının siyah açılışındaki film kartı (4:5, masaüstünde 400x500).
 * Sayfa açılırken sadece küçük poster iner (canvas'a çizilir: LCP "Spark"
 * yazısı kalsın); sayfa `load` olayını verip tarayıcı boşa çıkınca 4 saniyelik
 * sessiz önizleme bir kez oynar, üstteki 3px çizgi klibin gerçek
 * currentTime / duration değeriyle dolar, klip bitince 600 ms'de postere
 * geçilir, %38 Ink perde ve oynat düğmesi gelir. Tıklayınca film pencerede
 * (VideoModal, 4:5) sesli açılır; YouTube sadece o zaman istenir. Akış
 * Four services halkasıyla ortak: hooks/useClipPreview.ts. Kimlik boşsa
 * sayfa bu bileşeni hiç çizmez.
 *
 * Sarı kuralı: sayfada Flare "Spark" yazısı ve filmin kendi karesi; çizgi ve
 * düğme Paper.
 */
export default function SparkFilmCard({ film, preview, sparkLabel }: SparkFilmCardProps) {
  const [open, setOpen] = useState(false);
  const [posterShown, setPosterShown] = useState(false);
  const posterRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Çizgiyi doğrudan çizer (her karede React render'ı olmasın).
  const drawLine = useCallback((progress: number) => {
    const line = lineRef.current;
    if (line) line.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  }, []);

  const { phase, stageRef, clipRef, halt, clipMounted, settled } = useClipPreview<HTMLButtonElement>({
    start: "afterLoad",
    threshold: 0.25,
    blockedConnections: SLOWER_CONNECTIONS,
    onProgress: drawLine,
  });

  // Poster canvas'a çizilir: <img> olsaydı 400x500'lük poster LCP adayı olur ve
  // LCP "Spark" yazısından posterin yüklenmesine kayardı (canvas aday değil).
  // Hidrasyondan sonra, düşük öncelikle iner; AVIF desteklenmezse WebP.
  useEffect(() => {
    const canvas = posterRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let cancelled = false;
    const load = (src: string, fallback?: string) => {
      const image = new Image();
      image.decoding = "async";
      image.fetchPriority = "low";
      image.onload = () => {
        if (cancelled) return;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        setPosterShown(true);
      };
      if (fallback) image.onerror = () => load(fallback);
      image.src = src;
    };
    load(preview.posterAvif ?? preview.poster, preview.posterAvif ? preview.poster : undefined);
    return () => {
      cancelled = true;
    };
  }, [preview.poster, preview.posterAvif]);

  // Klip oynarken de tıklanabilir: önizleme durur, pencere açılır.
  const openVideo = useCallback(() => {
    halt();
    setOpen(true);
  }, [halt]);
  const closeVideo = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        ref={(node) => {
          stageRef.current = node;
          buttonRef.current = node;
        }}
        type="button"
        onClick={openVideo}
        aria-label={film.ariaLabel}
        className="film-card block w-full max-w-[400px] cursor-pointer border-0 bg-transparent p-0 text-left"
      >
        <span className="block h-[3px] w-full bg-stone" aria-hidden="true">
          <span ref={lineRef} className="block h-full origin-left bg-paper" style={{ transform: "scaleX(0)" }} />
        </span>
        <span className="relative block aspect-[4/5] w-full overflow-hidden bg-ink">
          <canvas
            ref={posterRef}
            width={544}
            height={680}
            aria-hidden="true"
            className={`film-poster absolute inset-0 size-full ${posterShown ? "is-shown" : ""}`}
          />
          {clipMounted && (
            <video
              ref={clipRef}
              className={`film-clip absolute inset-0 size-full object-cover ${phase === "playing" ? "is-playing" : ""} ${phase === "ending" ? "is-ending" : ""}`}
              muted
              playsInline
              preload="none"
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
              tabIndex={-1}
            >
              {/* MP4 önce: iOS'ta en güvenlisi. */}
              <source src={preview.mp4} type="video/mp4" />
              <source src={preview.webm} type="video/webm" />
            </video>
          )}
          {/* JS yoksa düğme çalışmaz: perde ve düğme hiç görünmez, poster kalır. */}
          <span aria-hidden="true" className={`film-veil video-only absolute inset-0 bg-[color-mix(in_srgb,var(--ink)_38%,transparent)] ${settled ? "is-on" : ""}`} />
          <span
            aria-hidden="true"
            className={`film-play video-only absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 min-[640px]:bottom-8 min-[640px]:gap-[18px] ${settled ? "is-on" : ""}`}
          >
            <span className="film-circle flex size-[60px] items-center justify-center rounded-full bg-paper text-ink min-[640px]:size-[76px]">
              <PlayIcon className="size-5 translate-x-[1px] min-[640px]:size-[26px]" />
            </span>
            <span className="flex items-baseline gap-2 bg-ink px-3 py-2">
              <span className="font-sans text-[13px] leading-none font-bold text-paper min-[640px]:text-[15px]">{film.buttonLabel}</span>
              <span className="font-mono text-[11px] leading-none font-medium text-dust min-[640px]:text-[12px]">{film.durationLabel}</span>
            </span>
          </span>
        </span>
      </button>
      <VideoModal
        youtubeId={film.youtubeId}
        title={film.modalTitle}
        eyebrow={`${sparkLabel} · ${film.durationLabel}`}
        aspect={4 / 5}
        closeLabel={film.closeLabel}
        open={open}
        onClose={closeVideo}
        returnFocusRef={buttonRef}
      />
    </>
  );
}
