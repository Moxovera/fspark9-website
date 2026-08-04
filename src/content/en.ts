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
  familiar: {
    heading: "Any of this sound familiar?",
    points: [
      {
        text: "The launch date moves out by a month, every month.",
        order: 1,
      },
      {
        text: "The business case is a spreadsheet somebody filled with assumptions, and the one assumption that decides whether this makes money has never been tested.",
        order: 2,
      },
      {
        text: "There are three product ideas on the table and no honest way, from the inside, to tell which one earns at your real volume.",
        order: 3,
      },
      {
        text: "Three providers sent proposals. On paper they look identical, the prices are far apart, nobody explains why, and you still cannot tell which one will hurt you in year two.",
        order: 4,
      },
      {
        text: "The board has asked which country is next and nobody in the room can answer it with numbers.",
        order: 5,
      },
      {
        text: "You took the product that works here into the new market. In month four somebody worked out it cannot legally operate in the shape it was built.",
        order: 6,
      },
      {
        text: "The app looks good and people still start opening an account and never finish.",
        order: 7,
      },
      {
        text: "The designer's flow came back from legal with changes nobody understands. It got redrawn. It came back again.",
        order: 8,
      },
      {
        text: "The strategy deck was excellent. Six months later nobody in the building knows how to turn it into a live product.",
        order: 9,
      },
    ],
    closingLine:
      "None of this means the idea is wrong. Usually it means one early decision was made by somebody who had never made it before.",
  },
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
