import { ArrowRightIcon } from "@/components/icons";
import type { GoButtonProps } from "@/types/content";

// Board ölçüleri: kutu 64/48/44/40, içindeki ok glyph'i 26/20/18/16px.
const SIZE = {
  64: "size-16 text-[26px]",
  48: "size-12 text-[20px]",
  44: "size-11 text-[18px]",
  40: "size-10 text-[16px]",
} as const;

/**
 * Kare Ink kutu, Paper ok (brand book v3 §6 "Clickable rows"). Sadece
 * görsel: etiketi satırın kendisi taşıyor, bu yüzden aria-hidden ve
 * içinde link yok. Satırın hover durumunda okun 4px kayması (brief §10)
 * Geçiş C'de `group` üzerinden eklenecek.
 *
 * Ok 0.8em: uzunluğu board’daki mono glyph’le aynı. Çizgi kalınlığı ev
 * kuralı gereği 1.8 (CLAUDE.md "İkonlar"), glyph’ten biraz ince, bilinçli.
 */
export default function GoButton({ size, className }: GoButtonProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex flex-none items-center justify-center bg-ink text-paper ${SIZE[size]} ${className ?? ""}`}
    >
      <ArrowRightIcon className="size-[0.8em]" />
    </span>
  );
}
