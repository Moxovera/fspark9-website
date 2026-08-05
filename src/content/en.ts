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
    heading: "If this sounds like you, you are in the right place.",
    labels: { problem: "The problem", do: "What I do", result: "The result" },
    cards: [
      {
        title: "Fintechs who want the banking side taken off their plate",
        problem:
          "Your team's week goes to partner calls, compliance questions and integration detail. There is nothing left for marketing and operations. The launch date moves a little further out every month, and the honest answer to why is that nobody in the room has done this before.",
        do: "You hand the banking product side to me. I decide the route, find the partner, negotiate the terms and run the process. When you want it, my team ships the product itself.",
        result:
          "Your team gets back to its own work. The product stops slipping, and at the end of every month you can see exactly where things stand on one page.",
      },
      {
        title:
          "Companies who want to give their own customers a financial product",
        problem:
          "You already have the customer base and the brand. You want to turn that into a new revenue line. It sounds simple and it is not. Without banking experience, the wrong partner and the wrong business model end the project inside the first few months, and most companies find that out after the money is gone.",
        do: "We get clear on which product genuinely fits your customers, which business model actually earns at your real volume, and which partner suits you. After that I either hand your team the plan or run the build myself.",
        result:
          "A new revenue line from customers you already have. And because you started on the right footing, you are not rebuilding the whole thing in year two.",
      },
      {
        title: "Banks boxed in by their own compliance load",
        problem:
          "The appetite is there. New products get discussed, so do fintech partnerships. But the energy goes to reporting, audits and compliance questions, and the resource never quite reaches the new work. Ideas sit on the shelf and a competitor gets there first.",
        do: "I know where the regulation stops and where the flexibility begins, so I shape the idea to hold up from day one. I find the partner and carry the work between the lawyers and your internal team, so the project moves while your people keep doing their own jobs.",
        result:
          "Ideas that have been sitting on the shelf get built. New partnerships and new revenue channels open, without adding to anyone’s load.",
      },
    ],
  },
  story: { heading: "", paragraphs: [] },
  process: { heading: "", steps: [] },
  media: { heading: "", intro: "", items: [] },
  faq: { heading: "", items: [] },
  closingCta: { headline: "", ctaLabel: "", ctaHref: "" },
};
