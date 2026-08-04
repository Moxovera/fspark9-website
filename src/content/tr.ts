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
  proofStrip: { items: [], closingLine: "" },
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
