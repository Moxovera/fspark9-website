import type { CutWordProps } from "@/types/content";

/**
 * Başlık içinde tek kelimenin arkasındaki Flare blok (brand book v3 §5
 * "Cut"). Eğim yazı boyutuna oranlı (.32em), dolgu board'dakiyle aynı.
 * Soldan silme animasyonuyla gelir (brief §10, globals.css .cut-wipe);
 * Reveal içindeyse görünür olunca başlar.
 */
export default function CutWord({ children, className }: CutWordProps) {
  return (
    <span
      className={`cut-wipe inline-block bg-flare pt-0 pr-[0.42em] pb-[0.04em] pl-[0.12em] text-ink [clip-path:polygon(0_0,100%_0,calc(100%-0.32em)_100%,0_100%)] ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
