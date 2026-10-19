"use client";

import { useCallback, useRef, useState } from "react";
import { PlayIcon } from "@/components/icons";
import VideoModal from "@/components/ui/VideoModal";
import type { SparkFilmButtonProps } from "@/types/content";

/**
 * Ana sayfa Spark bölümündeki "Spark nedir? İzleyin" düğmesi. Sıfır yük:
 * resim, klip, poster yok. Tıklayınca Spark sayfasına gitmez, aynı
 * VideoModal (4:5) ana sayfada açılır ve film sesli oynar; YouTube sadece
 * tıklamadan sonra istenir. Kimlik boşsa sayfa bu bileşeni çizmez.
 */
export default function SparkFilmButton({ film, sparkLabel }: SparkFilmButtonProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const openVideo = useCallback(() => setOpen(true), []);
  const closeVideo = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={openVideo}
        className="spark-watch video-only inline-flex min-h-11 cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left whitespace-nowrap text-ink"
      >
        <span className="watch-circle flex size-10 flex-none items-center justify-center rounded-full bg-ink text-paper">
          <PlayIcon className="size-[14px] translate-x-[0.5px]" />
        </span>
        <span className="watch-label pb-[2px] font-sans text-[18px] leading-[normal] font-bold">{film.homeButtonLabel}</span>
        <span className="font-mono text-[13px] leading-[normal] font-medium text-stone">{film.durationLabel}</span>
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
