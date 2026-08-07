import type { ServicesPage } from "@/types/content";

// dc.html: t.pages.services (satır 1337/1625, hero). Satır/panel içeriği
// (Service[] + ServicesSection.labels) content/en.ts + content/tr.ts'teki
// HomePage.services'ten geliyor — burada tekrarlanmıyor.
export const en: ServicesPage = {
  hero: {
    eyebrow: "Services",
    title: "Four places where money and months usually go missing.",
    intro:
      "Every one of these came out of a build I was inside of. The mistakes below are not theory. They are things I either made myself or watched from a metre away. Pick the one that sounds like your quarter.",
  },
};

export const tr: ServicesPage = {
  hero: {
    eyebrow: "Hizmetler",
    title: "Paranın ve zamanın en çok kaybolduğu dört yer.",
    intro:
      "Aşağıdakilerin hepsi içinde bulunduğum işlerden çıktı. Bunlar teori değil. Ya bizzat yaptığım ya da bir metre öteden izlediğim hatalar. Hangisi sizin çeyreğinize benziyorsa oradan başlayın.",
  },
};
