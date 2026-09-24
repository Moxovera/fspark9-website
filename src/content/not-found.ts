import type { NotFoundPage } from "@/types/content";

// 404 (v2, copy §6b, board NotFound / NotFoundM). Global 404 dili
// bilemiyor, iki dili birden gösteriyor (`both`); site içi 404
// (`[locale]/not-found.tsx`) tek dilde (`en` / `tr`). SEO §6c, noindex.
export const both: NotFoundPage = {
  seoTitle: "Page not found | fspark9",
  label: "404",
  heading: "This page does not exist. The other ones do.",
  secondLine: { text: "Böyle bir sayfa yok. Diğerleri var.", lang: "tr" },
  links: [
    { label: "Take me to the homepage", href: "/" },
    { label: "Ana sayfaya dön", href: "/tr", lang: "tr" },
  ],
};

export const en: NotFoundPage = {
  seoTitle: "Page not found | fspark9",
  label: "404",
  heading: "This page does not exist. The other ones do.",
  links: [{ label: "Take me to the homepage", href: "/" }],
};

export const tr: NotFoundPage = {
  seoTitle: "Sayfa bulunamadı | fspark9",
  label: "404",
  heading: "Böyle bir sayfa yok. Diğerleri var.",
  links: [{ label: "Ana sayfaya dön", href: "/tr" }],
};
