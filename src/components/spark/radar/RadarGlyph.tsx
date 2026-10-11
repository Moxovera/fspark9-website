import type { ReactNode } from "react";
import type { RadarGlyphProps } from "@/types/content";

const line = "fill-none stroke-ink stroke-[1.5]";
const solid = "fill-ink";
const quiet = "fill-white stroke-rule stroke-[1.5]";

/**
 * "Bir sayı nasıl okunur" kutularındaki Ink glifler (prototip GLYPH):
 * tahmin, nasıl çalışıyor, tuval, taşıyıcı taş, zayıf halka, radar.
 * Dekoratif; 44px.
 */
export default function RadarGlyph({ index }: RadarGlyphProps) {
  const svg = (viewBox: string, children: ReactNode) => (
    <svg viewBox={viewBox} aria-hidden="true" className="size-11 flex-none">
      {children}
    </svg>
  );
  switch (index) {
    case 0:
      return svg(
        "0 0 44 44",
        <>
          <rect className={line} x="3" y="3" width="17" height="17" />
          <rect className={solid} x="24" y="3" width="17" height="17" />
          <rect className={line} x="3" y="24" width="17" height="17" />
          <rect className={line} x="24" y="24" width="17" height="17" />
        </>,
      );
    case 1:
      return svg(
        "0 0 44 44",
        <>
          <rect className={solid} x="3" y="14" width="12" height="16" />
          <rect className={line} x="29" y="14" width="12" height="16" />
          <path className={line} d="M16 19h11M23 15.5 27 19l-4 3.5" />
          <path className={line} strokeDasharray="2 2" d="M28 26H17" />
        </>,
      );
    case 2:
      return svg(
        "0 0 44 44",
        <>
          <rect className={solid} x="2" y="2" width="8" height="26" />
          <rect className={quiet} x="12" y="2" width="8" height="12" />
          <rect className={solid} x="12" y="16" width="8" height="12" />
          <rect className={solid} x="22" y="2" width="8" height="26" />
          <rect className={quiet} x="32" y="2" width="10" height="26" />
          <rect className={quiet} x="2" y="31" width="19" height="11" />
          <rect className={solid} x="23" y="31" width="19" height="11" />
        </>,
      );
    case 3:
      return svg(
        "0 0 44 44",
        <>
          <rect className={line} x="8" y="4" width="22" height="8" />
          <rect className={solid} x="18" y="18" width="22" height="8" />
          <rect className={line} x="8" y="32" width="22" height="8" />
          <path className={line} strokeDasharray="2 2" d="M8 18h8v8H8z" />
        </>,
      );
    case 4:
      return svg(
        "0 0 44 44",
        <>
          <rect className={line} x="3" y="6" width="38" height="8" />
          <rect className={solid} x="3" y="18" width="38" height="8" />
          <rect className={line} x="3" y="30" width="38" height="8" />
        </>,
      );
    default:
      return svg(
        "-24 -24 48 48",
        <>
          <polygon className={`${line} [stroke-linejoin:miter]`} points="0,-20 19,-6.2 11.8,16.2 -11.8,16.2 -19,-6.2" />
          <polygon className={solid} points="0,-14 14,-4.5 6,8 -9,12 -12,-4" />
        </>,
      );
  }
}
