import type { HomePage } from "@/types/content";

export const tr: HomePage = {
  seo: {
    title: "",
    description: "",
  },
  hero: {
    eyebrow: "GÜVEN PAZARLANMAZ. KURULUR.",
    headlinePrimary: "Bankacılık tarafını bir kere kurun.",
    headlineAccent: "Doğru kurun.",
    bullets: [
      "Doğru fırsatı bulun.",
      "Doğru partnerle çalışın.",
      "Müşteriyi ilk günden kazanın.",
    ],
    closingLine: "Ben kuran tarafım, sadece tavsiye veren değil.",
    ctaLabel: "30 dakikalık ücretsiz görüşme ayarla",
    ctaHref: "/book",
    ctaNote:
      "İlk görüşme ücretsiz. Doğru kişi değilsem bunu görüşmede açıkça söylerim.",
    scrollLabel: "Kaydır",
  },
  framework: {
    steps: [
      {
        id: "decide",
        label: "Strateji",
        description:
          "Gerçek gelir kaynaklarını belirlemek ve önce neyin kurulacağını netleştirmek.",
      },
      {
        id: "setup",
        label: "Altyapı",
        description:
          "Partner ağı, regülasyon uyumu ve lisans mimarisinin kurgulanması.",
      },
      {
        id: "ship",
        label: "Ürün",
        description:
          "Arayüzler, canlı işlem akışları ve baştan sona kayıt deneyiminin inşası.",
      },
    ],
  },
  proofStrip: {
    kicker: "Bu işi nerede yaptım",
    roles: "Ürün ve büyüme liderliği · Dijital bankacılık · Pazara giriş",
    items: [
      {
        name: "insha",
        line: "Avrupa'nın ilk faizsiz dijital bankası. Önerme, BaaS partnerleri, deneyim ve büyüme, sıfırdan.",
        order: 1,
      },
      {
        name: "RUUT",
        line: "Bir İşbank şirketi. Para transferi uygulamasından dijital bankaya, oradan İngiltere pazarına.",
        order: 2,
      },
      {
        name: "Turkcell",
        line: "Paycell ve Financell, uluslararası pazar açılımı.",
        order: 3,
      },
      {
        name: "Albaraka",
        line: "Dijital strateji ve rekabet araştırmaları.",
        order: 4,
      },
    ],
    link: { label: "Gerçekte ne kurulduğunu görün →", href: "/work" },
  },
  familiar: { heading: "", points: [], closingLine: "" },
  caseStudies: { items: [], pairingNote: "" },
  services: {
    heading: "",
    items: [],
    fullEngagementHeading: "",
    fullEngagementBody: "",
  },
  comparison: {
    columnLabels: { decide: "", setup: "", ship: "", staysUntilLive: "" },
    rows: [],
  },
  approach: { blocks: [] },
  testimonials: { items: [] },
  audience: {
    heading: "",
    labels: { problem: "", do: "", result: "" },
    cards: [],
  },
  story: { heading: "", paragraphs: [] },
  process: { heading: "", steps: [] },
  media: { heading: "", intro: "", items: [] },
  faq: { heading: "", items: [] },
  closingCta: { headline: "", ctaLabel: "", ctaHref: "" },
};
