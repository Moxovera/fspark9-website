import type { NotFoundPage } from "@/types/content";

// dc.html: t.notFound (satır 1324/1612). app/global-not-found.tsx
// [locale] layout'unu (dolayısıyla next-intl'in locale çözümlemesini)
// bypass ettiği için, hangi dilin istendiğini güvenilir şekilde bilemiyor
// — bu yüzden sadece `en` kullanılıyor (CLAUDE.md: "EN birincil"). `tr`
// yine de burada duruyor, projenin geri kalanındaki en.ts/tr.ts
// desenine uyması ve ileride daha iyi bir çözüm bulunursa hazır olması için.
export const en: NotFoundPage = {
  title: "This page does not exist. The other ones do.",
  linkLabel: "Take me to the homepage →",
};

export const tr: NotFoundPage = {
  title: "Böyle bir sayfa yok. Diğerleri var.",
  linkLabel: "Ana sayfaya dön →",
};
