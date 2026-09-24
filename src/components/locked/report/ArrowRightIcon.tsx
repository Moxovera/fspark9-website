// Kilitli raporların ok ikonu. v1 ServicesAccordion'dan taşındı, çizim
// aynen korunuyor (/locked değişmiyor): 24x24 viewBox, stroke="currentColor".
export function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="13 5 20 12 13 19" />
    </svg>
  );
}
