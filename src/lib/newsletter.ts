/** Footer'daki bülten şeridinin id'si (menü girişleri ve sabit kutu buna bağlı). */
export const NEWSLETTER_ID = "bulten";

/**
 * Bülten şeridine yumuşak kayar (reduced-motion'da anında), kayma bitince
 * mail alanına odaklanır. Sayfa değişmez: o sayfanın footer'ı.
 */
export function jumpToNewsletter() {
  const target = document.getElementById(NEWSLETTER_ID);
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const focusField = () => target.querySelector<HTMLInputElement>('input[type="email"]')?.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  if (reduce) {
    focusField();
    return;
  }
  // Kayma bitince (konum 120 ms değişmezse ya da 5 sn dolarsa) odaklan.
  const started = performance.now();
  let lastY = window.scrollY;
  let stableSince = started;
  const watch = (now: number) => {
    if (window.scrollY !== lastY) {
      lastY = window.scrollY;
      stableSince = now;
    }
    if (now - stableSince > 120 || now - started > 5000) {
      focusField();
      return;
    }
    window.requestAnimationFrame(watch);
  };
  window.requestAnimationFrame(watch);
}
