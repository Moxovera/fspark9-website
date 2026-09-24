import type { LabelProps } from "@/types/content";

/**
 * Mono etiket (brand book v3 §4): Spline Sans Mono 500, 12px, büyük harf,
 * +0.08em. Renk zeminden gelir: Ink zeminde Dust, açık zeminde Stone.
 * `strong` Ink (Ink zeminde Paper) verir, board'larda kart üst satırları
 * gibi yerlerde kullanılıyor.
 */
export default function Label({ children, ground = "paper", strong = false, as: Tag = "div", className }: LabelProps) {
  const color = strong
    ? ground === "ink" ? "text-paper" : "text-ink"
    : ground === "ink" ? "text-dust" : "text-stone";

  return (
    <Tag className={`m-0 font-mono text-[12px] leading-[normal] font-medium tracking-[0.08em] uppercase ${color} ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
