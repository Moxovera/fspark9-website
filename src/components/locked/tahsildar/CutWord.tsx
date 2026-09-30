import type { TsdCutWordProps } from "@/types/content";

// Başlıktaki tek Flare kesim. Yüklemede bir kez 480 ms açılır (brand
// easing, tahsildar.css .cut); reduced-motion'da animasyon yok.
export function CutWord({ text }: TsdCutWordProps) {
  return <span className="cut">{text}</span>;
}
