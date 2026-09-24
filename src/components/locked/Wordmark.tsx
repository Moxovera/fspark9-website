import { LOGO_LETTERS, LOGO_NINE_BODY, LOGO_NINE_SLICE, LOGO_NINE_TRANSFORM } from "@/components/brand/Logo";
import type { LockedMarkProps } from "@/types/content";

/**
 * Kilitli raporun fspark9 logosu: v2 wordmark (logo dosyasının path'leri,
 * Logo.tsx ile aynı kaynak). Gövde var(--logo-ink), dokuzuncu dilim her
 * zaman Flare. Rapor tek temalı olduğu için tek çizim yeterli; .wm-light
 * sınıfı mevcut CSS kancalarıyla uyum için duruyor.
 */
export function Wordmark({ height, className }: LockedMarkProps) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center" }}>
      <svg
        viewBox="0 -1577 7420 2014"
        height={height}
        width={height * (7420 / 2014)}
        role="img"
        aria-label="fspark9"
        className="wm-light"
        style={{ height, width: "auto" }}
      >
        <g fill="var(--logo-ink)">
          {LOGO_LETTERS.map((d) => (
            <path key={d.slice(0, 12)} d={d} />
          ))}
        </g>
        <g transform={LOGO_NINE_TRANSFORM}>
          <path d={LOGO_NINE_BODY[0]} fill="var(--logo-ink)" />
          <path d={LOGO_NINE_SLICE} fill="var(--flare)" />
          <path d={LOGO_NINE_BODY[1]} fill="var(--logo-ink)" />
        </g>
      </svg>
    </span>
  );
}

// Paylaşılan fs9-sym-light/fs9-sym-dark tanımlarını ((locked)/layout.tsx)
// <use> ile kullanıyor, böylece başka SVG'lerin (HouseIllustration) içine
// de gömülebiliyor.
export function BrandSymbolIcon({ height, className }: LockedMarkProps) {
  const width = height * (64 / 100);
  return (
    <svg viewBox="18 0 64 100" width={width} height={height} className={className} aria-hidden="true">
      <use href="#fs9-sym-light" className="wm-light" />
      <use href="#fs9-sym-dark" className="wm-dark" />
    </svg>
  );
}
