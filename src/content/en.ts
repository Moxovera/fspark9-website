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
  caseStudies: {
    heading: "Case studies",
    intro:
      "One was built from nothing and became a first in Europe. The other was already running, too small, and had to become something else in a market it had never traded in.",
    linkLabel: "Read the case →",
    items: [
      {
        slug: "insha",
        name: "insha, Berlin",
        subtitle: "Europe's first interest free, digital only bank",
        body: "From an intention with no proposition, no infrastructure and no European partner, to a live bank on a BaFin licensed institution, with account opening a customer could finish on a phone in one sitting.",
        coverImage: {
          url: "/assets/case-study-insha.svg",
          alt: "insha",
          width: 1600,
          height: 1000,
        },
        tags: ["Proposition", "Partner Selection", "Experience", "Expansion"],
        problemHeading: "The problem",
        problem:
          "Albaraka Türk wanted Europe's Muslim community. What existed was an intention. No proposition, no infrastructure, no European partner, no local trust, and a brand that meant something in Türkiye and nothing in Germany.",
        actionsHeading: "What I did",
        actions: [
          {
            label: "Proposition.",
            description:
              "Defined what the product actually was and who would pay for it, before a line of code was written.",
          },
          {
            label: "Partner.",
            description:
              "Selected and negotiated the BaaS and card partners from zero, and put the product under a BaFin licensed institution.",
          },
          {
            label: "Experience.",
            description:
              "Designed and ran the end to end digital experience, including account opening a customer could complete on a phone in one sitting.",
          },
          {
            label: "Expansion and growth.",
            description:
              "Built the growth engine and took it to the ground, because a bank nobody has heard of cannot buy trust with advertising.",
          },
        ],
        deliveredHeading: "What was delivered",
        delivered:
          "Europe's first interest free digital only bank, live in Germany, on solarisBank infrastructure with a Mastercard debit card. Users grew more than 300% through 2020 to over 40,000 in Germany, and the company raised €2.5 million to expand across Europe.",
        screens: [],
        order: 1,
      },
      {
        slug: "ruut",
        name: "RUUT, an İşbank company",
        subtitle: "From one money transfer product to a digital bank, and into the UK",
        body: "A single purpose remittance app turned into a full digital banking proposition, rebuilt screen by screen, and taken into a new market on a structure that lets the brand trade while the licence is built underneath it.",
        coverImage: {
          url: "/assets/case-study-ruut.svg",
          alt: "RUUT",
          width: 1600,
          height: 1000,
        },
        tags: ["Proposition", "Experience", "Partner Selection", "Expansion"],
        problemHeading: "The problem",
        problem:
          "A single purpose remittance app for Turks in Germany and Austria. The board wanted a full digital bank for the diaspora across Europe, and then the UK. That is not a roadmap item. It is a new proposition, a new product set, new partners, a new regulatory position and a new market, all at the same time.",
        actionsHeading: "What I did",
        actions: [
          {
            label: "Proposition.",
            description:
              "Turned a one product transfer app into a digital banking proposition, and worked out which products earned their place.",
          },
          {
            label: "Experience.",
            description:
              "Rebuilt the brand and the customer experience end to end, every screen and every flow, shipped rather than presented.",
          },
          {
            label: "Partner.",
            description:
              "Selected and managed the partners behind the new products, and held those relationships through delivery.",
          },
          {
            label: "Expansion.",
            description:
              "Ran the UK market entry, including the partner and regulatory architecture that lets the brand operate on a distributor position while the full licence is built out underneath it.",
          },
        ],
        deliveredHeading: "What was delivered",
        delivered:
          "A digital banking brand with cross border payments open to all EU citizens and residents, and a UK entry aimed at a Turkish community of close to one million people, with retail and business accounts, cards and remittances, on a route to a fully licensed position.",
        screens: [],
        order: 2,
      },
    ],
  },
  services: {
    heading: "Four ways to start",
    intro: "Most people come in through one of these and then hand me the rest.",
    labels: {
      problem: "The problem",
      action: "What I do",
      outcome: "You get",
    },
    items: [
      {
        slug: "proposition-blueprint",
        number: 1,
        title: "Proposition and Product Blueprint",
        tag: "Decide",
        problem:
          "You are about to spend real money on a build, and the business case behind it is a spreadsheet somebody made assumptions into. Nobody in the room has launched a financial product before, so every estimate comes back with a different number and a different date.",
        action:
          "I pressure test the commercial model and the customer proposition before you commit a development budget. Which product genuinely fits your customers, which one earns money at your real volume, what to launch first and what to leave out.",
        outcome:
          "A validated proposition and commercial model, the revenue logic behind it, the assumption most likely to be wrong and what to do about it, and a build sequence with the first release defined.",
      },
      {
        slug: "partner-selection",
        number: 2,
        title: "Partner Selection",
        tag: "Set up",
        problem:
          "Three providers sent proposals. On paper they look the same, the prices are far apart and nobody explains why. The thing that hurts you in year two is never in the proposal. It is in the exit clause, the volume tiers and the risk appetite mismatch.",
        action:
          "I choose the commercial engine, not the API. Selection runs on your real volume, your risk appetite and the costs that do not appear on the rate card. If you want, I sit in the negotiation.",
        outcome:
          "A shortlist with the reason each name is on it, a comparison on real terms, the questions to put to each one and what a bad answer sounds like, the clauses worth fighting for, and a written recommendation.",
      },
      {
        slug: "market-expansion",
        number: 3,
        title: "New Market Expansion",
        tag: "Set up and ship",
        problem:
          "The product works at home. In the new country the regulator is different, the partner structure is different, and what customers there expect is different. Most expansions stall because the team lifts the working product and finds out in month four that it cannot legally operate in the shape it was built.",
        action:
          "I design the entry so the brand can trade while the regulatory position is being built underneath it, instead of waiting for a licence before earning anything. Partner architecture, regulatory route and the local proposition, decided together rather than in sequence.",
        outcome:
          "The entry route with the regulatory position at each stage, the partner structure that supports it, what the product has to change locally and what it does not, and the plan that gets you trading before the full licence lands.",
      },
      {
        slug: "experience-build",
        number: 4,
        title: "Digital Native Experience Build",
        tag: "Ship",
        problem:
          "The app looks good and people still do not finish opening the account. Your designer’s flow comes back from legal with changes nobody understands, gets redrawn, and comes back again. Two cycles later the launch date has moved.",
        action:
          "I design flows that pass compliance review the first time. Because I know which parts of a journey exist because of regulation and which parts are just bad decisions, my team and I spend the effort where it actually lifts completion.",
        outcome:
          "The full customer facing experience, screens and flows, production ready and handed to your developers. Built to convert and built to clear compliance in one pass, with the reason behind each design decision written down.",
      },
    ],
    fullEngagementHeading: "And when you want the whole build",
    fullEngagementBody:
      "These four are doors, not the house. Most clients come in through one and then hand me the whole build. Partner, licence route, regulatory structure, the product itself and the launch. I run it until it is live, and I do not hand the middle of it to an agency or a subcontractor. I am in your team while it happens, and I leave when it is finished.",
    link: {
      label: "See what each of these looks like in practice →",
      href: "/services",
    },
  },
  comparison: {
    heading: "The side that builds it.",
    intro:
      "Four kinds of supplier sit around this problem. Here is what each one actually hands you.",
    scrollHint: "Scroll to compare",
    columnLabels: { decide: "Decide", setup: "Set up", ship: "Ship" },
    rows: [
      {
        label: "Strategy firms",
        decide: { state: "yes" },
        setup: { state: "no" },
        ship: { state: "partial", note: "A concept deck" },
      },
      {
        label: "Design agencies",
        decide: { state: "no" },
        setup: { state: "no" },
        ship: { state: "partial", note: "Screens that fail compliance review" },
      },
      {
        label: "Build shops",
        decide: { state: "no" },
        setup: { state: "no" },
        ship: { state: "partial", note: "Only what you specify" },
      },
      {
        label: "fspark9",
        isUs: true,
        decide: { state: "yes" },
        setup: { state: "yes" },
        ship: { state: "yes" },
      },
    ],
  },
  approach: {
    heading: "What I do differently",
    blocks: [
      {
        number: 1,
        title: "I do not leave a deck on the table",
        body: "Most people in this market deliver a document and go. The document is not the problem. The problem is the six months after it, when nobody in the building knows how to turn it into a live product. I take the work from the decision through to the launch, and the middle of it does not go to an agency or a subcontractor.",
      },
      {
        number: 2,
        title: "Nine is the bridge",
        body: "Nine is the last step, the point right before something is finished. The gap between a strategy and a live product, between an idea and a customer using it. Most projects stall exactly there, and that gap is where I work. Spark is what gets it moving again.",
      },
      {
        number: 3,
        title: "I sit at the partner table, not behind you",
        body: "Licence conversations, BaaS negotiations, regulator questions, compliance reviews. I have been on both sides of those tables and I go into them with you, not with advice about how to go into them.",
      },
      {
        number: 4,
        title: "My team ships, I do not just draw",
        body: "Experience design, UX and UI, delivered by people who do this properly, run by someone who knows what regulation will and will not allow on a screen. Production ready, not a concept.",
      },
    ],
  },
  testimonials: {
    items: [
      {
        headline: "Want the banking side taken off your plate?",
        quote:
          '"He identified new business opportunities and developed creative solutions that moved our objectives forward, inside the limits both sides actually had. He drove the market analysis and the strategic planning, and then he built and held the partnership itself rather than handing it on."',
        attribution: "Head of Digital Banking · European BaaS partner",
        ctaLabel: "Book a call",
        order: 1,
      },
      {
        headline: "Still deciding which partner to sign?",
        quote:
          '"He arrived with the shortlist already narrowed and a reason behind every name on it. A decision we had been circling for months was made in one meeting, and it held."',
        attribution: "Founder · Payments startup",
        ctaLabel: "Book a call",
        order: 2,
      },
      {
        headline: "Flows stuck in compliance review?",
        quote:
          '"The onboarding flows cleared compliance on the first review. In four years here, that had not happened once."',
        attribution: "Chief Product Officer · Licensed e-money institution",
        ctaLabel: "Book a call",
        order: 3,
      },
      {
        headline: "Need someone who stays until it is live?",
        quote:
          '"On a cross border project with teams in several countries, he drove the communication and the allocation of work, and he did it with a level of detail on the payments side that you rarely find in one person."',
        attribution: "Programme Director · Cross border payments",
        ctaLabel: "Book a call",
        order: 4,
      },
    ],
  },
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
  story: {
    heading: "Why I do this",
    lead: "Money can't be sold like chocolate. It's earned through trust.",
    paragraphs: [
      "I learned that building a bank from scratch in a new country. We had no name and no history behind us. So we went to the ground. We met people face to face, we grilled with them, we went to their weddings. Because before anyone hands over their money, they want to know there is a real person on the other side.",
      "Fintechs sometimes underestimate this. Banks do something else. They built their whole system on trust, then let comfort and the regulation trap stop them from developing it any further.",
      "I started fspark9 to take what I learned in the field, the hard way, and turn it into something that saves you the same pain.",
      "That is where the name comes from too. Nine is the last step, the point right before something is finished. Most projects stall exactly there. Spark is what gets it moving again.",
    ],
    link: { label: "Read the whole story →", href: "/story" },
    media: {
      type: "image",
      image: {
        url: "/assets/portrait.jpg",
        alt: "Portrait of Mehmet Burak Dikmen, founder of fspark9",
        width: 2829,
        height: 4241,
      },
    },
  },
  process: {
    heading: "How I work",
    steps: [
      {
        number: 1,
        title: "A free 30 minute call",
        description:
          "You tell me where things stand. We look at whether I can genuinely add value.",
        detail:
          "If I cannot, I will say so plainly and point you to whatever will actually help. No deck, no pitch, no follow up sequence.",
      },
      {
        number: 2,
        title: "A proposal written for you",
        description:
          "After the call I put together the solution, the process, the timeline and the price, and send it over.",
        detail:
          "Not a catalogue. A plan written for your situation, with the number on it before you commit to anything.",
      },
      {
        number: 3,
        title: "If we agree, we start",
        description: "A clear output and a clear invoice every month.",
        detail:
          "You will not have to chase a meeting to find out where we are. You can stop or continue with your eyes open.",
      },
    ],
    ctaLabel: "Book the call →",
    ctaHref: "/book",
  },
  media: { heading: "", intro: "", items: [] },
  faq: { heading: "", items: [] },
  closingCta: { headline: "", ctaLabel: "", ctaHref: "" },
};
