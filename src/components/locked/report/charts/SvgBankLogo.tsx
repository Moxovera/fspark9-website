import { useId } from "react";
import { resolveBankLogoFile, isPendingBankLogo } from "../BankLogo";

// SVG-embeddable bank logo mark for chart axis labels (capital/points/rates
// charts) — ported from the reference's svgLogo() (scratchpad
// script2.js:310-316). BankLogo.tsx uses next/image for HTML contexts;
// inside an <svg> we need real <image>/<clipPath> elements instead.
export function SvgBankLogo({ slug, cx, cy, r }: { slug: string | null | undefined; cx: number; cy: number; r: number }) {
  const clipId = useId();
  if (!slug) return null;
  const file = resolveBankLogoFile(slug);

  if (file) {
    return (
      <g>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
        <circle cx={cx} cy={cy} r={r} fill="#fff" />
        <image href={file} x={cx - r} y={cy - r} width={2 * r} height={2 * r} clipPath={`url(#${clipId})`} preserveAspectRatio="xMidYMid meet" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--rule)" />
      </g>
    );
  }
  if (isPendingBankLogo(slug)) {
    return <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--rule-strong)" strokeDasharray="2 2" />;
  }
  return <circle cx={cx} cy={cy} r={r} fill="var(--surface-2)" stroke="var(--rule)" />;
}
