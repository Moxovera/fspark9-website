import type { CSSProperties } from "react";
import { EIGHT_SLICES, slicePath } from "@/lib/dial";
import type { DialProps } from "@/types/content";

/**
 * Dokuz dilimli kadran (brand book v3 §5). Dokuzuncu dilim her zaman
 * Flare. Diğer sekizi `lit` içindeyse Ink (Ink zeminde Paper), değilse
 * Rule (Ink zeminde InkRule). Tamamen dekoratif.
 *
 * Her path `data-slice` ve sırası (`--slice-i`) taşıyor: `.dial-fill`
 * içindeki kadranlar görünür olunca dilim dilim dolar (brief §10,
 * globals.css).
 */
export default function Dial({ lit, size, tone = "paper", className }: DialProps) {
  const litFill = tone === "ink" ? "fill-paper" : "fill-ink";
  const offFill = tone === "ink" ? "fill-inkrule" : "fill-rule";

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`dial-live block flex-none overflow-visible ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      {EIGHT_SLICES.map((i) => (
        <path
          key={i}
          d={slicePath(i)}
          data-slice={i}
          data-lit={lit.includes(i) ? "" : undefined}
          style={{ "--slice-i": i - 1 } as CSSProperties}
          className={lit.includes(i) ? litFill : offFill}
        />
      ))}
      <path d={slicePath(9)} data-slice={9} className="slice-live fill-flare" />
    </svg>
  );
}
