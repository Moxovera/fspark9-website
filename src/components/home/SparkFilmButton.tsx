"use client";

import { useCallback, useRef, useState } from "react";
import { PlayIcon } from "@/components/icons";
import VideoModal from "@/components/ui/VideoModal";
import type { SparkFilmButtonProps } from "@/types/content";

/**
 * Ana sayfa Spark bölümündeki "Spark nedir? İzleyin" düğmesi. Sitedeki Flare oynat hapı (açılış filmi, halka videosu). Sıfır yük:
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
        className="spark-watch video-only inline-flex h-[50px] cursor-pointer items-center gap-[10px] rounded-full border-4 border-ink bg-flare pr-4 pl-1 font-sans text-[14px] leading-none font-bold whitespace-nowrap text-ink min-[640px]:text-[16px]"
      >
        <span className="flex size-[34px] flex-none items-center justify-center rounded-full bg-ink text-flare">
          <PlayIcon className="size-[18px] translate-x-[1px]" />
        </span>
        <span>{film.homeButtonLabel}</span>
        <span className="font-mono text-[11px] font-medium min-[640px]:text-[12px]">{film.durationLabel}</span>
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
