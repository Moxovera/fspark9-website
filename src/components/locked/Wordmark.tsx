import Image from "next/image";

/**
 * Theme-aware fspark9 logo for the locked report. Both variants render at
 * all times and CSS toggles visibility (.wm-light/.wm-dark, same pattern as
 * the --logo-ink/--ground light/dark tokens in locked-report.css) so there
 * is no JS-driven flash and it stays correct with prefers-color-scheme or
 * a future data-theme override. Files are used exactly as provided in
 * public/assets/fspark9-logo/ — not redrawn or recolored.
 */
export function Wordmark({ height, className }: { height: number; className?: string }) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center" }}>
      <Image
        src="/assets/fspark9-logo/fspark9-lockup-primary.svg"
        alt="fspark9"
        height={height}
        width={height * (3387 / 964)}
        className="wm-light"
        style={{ height, width: "auto" }}
      />
      <Image
        src="/assets/fspark9-logo/fspark9-lockup-reversed.svg"
        alt="fspark9"
        height={height}
        width={height * (4953 / 2530)}
        className="wm-dark"
        style={{ height, width: "auto" }}
      />
    </span>
  );
}

// Uses the shared fs9-sym-light/fs9-sym-dark defs ((locked)/layout.tsx) via
// <use> rather than next/image, so it can also be embedded inside other
// raw SVGs (HouseIllustration) — not just HTML contexts like Note's icon.
export function BrandSymbolIcon({ height, className }: { height: number; className?: string }) {
  const width = height * (64 / 100);
  return (
    <svg viewBox="18 0 64 100" width={width} height={height} className={className} aria-hidden="true">
      <use href="#fs9-sym-light" className="wm-light" />
      <use href="#fs9-sym-dark" className="wm-dark" />
    </svg>
  );
}
