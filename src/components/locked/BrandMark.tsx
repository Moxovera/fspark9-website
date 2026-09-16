/**
 * TEMPORARY placeholder for the fspark9 wordmark inside the locked report.
 *
 * Ports fuzul-report-standalone.html's own typographic stand-in 1:1 (the
 * letter-spacing spans + the fs9-sym SVG defs rendered once in
 * (locked)/layout.tsx). The brief calls for the real logo files instead —
 * primary lockup on light backgrounds, reversed lockup on dark, and the
 * symbol alone for the small note icon — but only symbol-reversed.svg and
 * lockup-reversed.svg exist in public/assets/ (the whole main site sits on
 * a dark background, so a light-background lockup was never needed there).
 * Swap this component for <Image> of the real files once the primary/light
 * versions are provided. Do not redraw the logo.
 */
export function BrandSymbol({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="18 0 64 100" aria-hidden="true" className={className} style={style}>
      <use href="#fs9-sym" />
    </svg>
  );
}

export function BrandMark({ size, className }: { size: number; className?: string }) {
  return (
    <span
      aria-label="fspark9"
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "flex-end",
        fontFamily: "var(--f-body)",
        fontWeight: 700,
        lineHeight: 1,
        color: "var(--logo-ink)",
        fontSize: size,
      }}
    >
      <span
        style={{
          letterSpacing: ".028em",
          display: "inline-block",
          transform: "scaleX(1.04)",
          transformOrigin: "left bottom",
        }}
      >
        f
      </span>
      <span style={{ letterSpacing: ".004em" }}>s</span>
      <span style={{ letterSpacing: "-.006em" }}>p</span>
      <span>a</span>
      <span style={{ letterSpacing: "-.014em" }}>r</span>
      <span>k</span>
      <BrandSymbol
        style={{ height: "0.7em", width: "0.448em", margin: "0 0 0.095em -0.015em", flex: "none" }}
      />
    </span>
  );
}
