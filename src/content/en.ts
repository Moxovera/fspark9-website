import type { HomePage } from "@/types/content";

export const en: HomePage = {
  seo: {
    title: "",
    description: "",
  },
  hero: {
    eyebrow: "TRUST ISN'T MARKETED. IT'S BUILT.",
    headlinePrimary: "Build the banking side once.",
    headlineAccent: "Get it right.",
    bullets: [
      "Find the right opportunity.",
      "Work with the right partner.",
      "Win the customer on day one.",
    ],
    closingLine:
      "I'm the side that builds it, not the one that just advises.",
    ctaLabel: "Book a free 30 minute call",
    ctaHref: "/book",
    ctaNote:
      "The first call is free. If I am not the right person for this, I will say so on the call.",
    scrollLabel: "Scroll",
  },
  framework: {
    steps: [
      {
        id: "decide",
        label: "Strategy",
        description:
          "Identifying true revenue drivers and defining what to build first.",
      },
      {
        id: "setup",
        label: "Infrastructure",
        description:
          "Structuring partner networks, regulatory compliance, and licensing architecture.",
      },
      {
        id: "ship",
        label: "Product",
        description:
          "Crafting user interfaces, live transactional flows, and complete onboarding experiences.",
      },
    ],
  },
  proofStrip: {
    kicker: "Where I did the work",
    roles: "Product & growth leadership · Digital banking · Market entry",
    items: [
      {
        name: "insha",
        line: "Europe's first interest free digital bank. Proposition, BaaS partners, experience and growth, built from zero.",
        order: 1,
      },
      {
        name: "RUUT",
        line: "An İşbank company. A money transfer app turned into a digital bank, and taken into the UK.",
        order: 2,
      },
      {
        name: "Turkcell",
        line: "Paycell and Financell, international market expansion.",
        order: 3,
      },
      {
        name: "Albaraka",
        line: "Digital strategy and competitive research.",
        order: 4,
      },
    ],
    link: { label: "See what was actually built →", href: "/work" },
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
