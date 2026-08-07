import type { WorkPage } from "@/types/content";

// dc.html: t.pages.work (satır 1338/1626, hero). Kart içeriği
// content/en.ts + content/tr.ts'teki HomePage.caseStudies'ten geliyor —
// burada tekrarlanmıyor.
export const en: WorkPage = {
  hero: {
    eyebrow: "Case studies",
    title: "What was actually built.",
    intro:
      "Two brands, two different problems. What they had in common is that each one needed somebody who could decide, set it up and ship it without handing the work to somebody else halfway through.",
  },
};

export const tr: WorkPage = {
  hero: {
    eyebrow: "Vaka İncelemeleri",
    title: "Gerçekte ne kuruldu.",
    intro:
      "İki marka, iki farklı problem. Ortak noktaları, her birinin karar veren, kuran ve işi yarı yolda başkasına devretmeden çıkaran birine ihtiyacı olmasıydı.",
  },
};
