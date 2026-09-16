// Ported from the reference's HOUSE svg constant (scratchpad
// script2.js:211-222). The embedded "9" symbol used <use href="#fs9-sym">
// against the reference's own placeholder defs — replaced here with the
// real symbol files (theme-toggled the same way as Wordmark.tsx).
export function HouseIllustration() {
  return (
    <svg viewBox="0 0 420 340" fill="none" aria-hidden="true">
      <line x1={10} y1={320} x2={410} y2={320} stroke="var(--rule-strong)" strokeWidth={1} />
      <g stroke="var(--heading)" strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round">
        <path d="M70 320 V160 L210 50 L350 160 V320" />
        <path d="M40 180 L210 40 L380 180" />
        <path d="M290 95 V60 H322 V120" />
        <rect x={102} y={190} width={58} height={52} />
        <line x1={131} y1={190} x2={131} y2={242} />
        <line x1={102} y1={216} x2={160} y2={216} />
        <rect x={260} y={190} width={58} height={52} />
        <line x1={289} y1={190} x2={289} y2={242} />
        <line x1={260} y1={216} x2={318} y2={216} />
      </g>
      <g stroke="var(--heading)" strokeWidth={0.7} opacity={0.45}>
        <line x1={70} y1={270} x2={350} y2={270} />
        <line x1={70} y1={290} x2={350} y2={290} />
        <line x1={70} y1={160} x2={350} y2={160} />
      </g>
      <path d="M184 320 V236 a26 26 0 0 1 52 0 V320" stroke="var(--bronze)" strokeWidth={1.8} fill="var(--zone)" />
      <circle cx={226} cy={282} r={3.2} fill="var(--bronze)" />
      <g transform="translate(196 86) scale(0.4375) translate(-18 0)">
        <use href="#fs9-sym-light" className="wm-light" />
        <use href="#fs9-sym-dark" className="wm-dark" />
      </g>
    </svg>
  );
}
