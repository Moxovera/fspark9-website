import type { HomePage, SiteSettings } from "@/types/content";

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
        text: "The board has asked which country is next, and proving it takes someone who has run this playbook before.",
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
        text: "The strategy deck was excellent, and turning it into a live product takes hands on experience, not another deck.",
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
          url: "/assets/case-study-insha.jpg",
          alt: "insha Mastercard debit card held in hand",
          width: 1083,
          height: 650,
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
        detailEyebrow: "Case study",
        detailIntro:
          "Europe's first interest free, digital only bank, built from an intention with no proposition, no infrastructure and no European partner.",
        screens: [
          {
            url: "/assets/insha-screenshot-1.webp",
            alt: "insha app screen: pay and withdraw money worldwide with your Visa debit card",
            width: 810,
            height: 1440,
          },
          {
            url: "/assets/insha-screenshot-2.webp",
            alt: "insha app dashboard showing account balance and recent transactions",
            width: 810,
            height: 1440,
          },
          {
            url: "/assets/insha-screenshot-3.webp",
            alt: "insha app payments screen for local and international money transfers",
            width: 750,
            height: 1334,
          },
          {
            url: "/assets/insha-screenshot-4.webp",
            alt: "insha app inSave savings goals screen",
            width: 750,
            height: 1334,
          },
          {
            url: "/assets/insha-screenshot-5.webp",
            alt: "insha app inSight spending tracker with budget breakdown by category",
            width: 750,
            height: 1334,
          },
          {
            url: "/assets/insha-screenshot-6.webp",
            alt: "insha app inShare donation tool showing charity options",
            width: 750,
            height: 1334,
          },
        ],
        order: 1,
      },
      {
        slug: "ruut",
        name: "RUUT, an İşbank company",
        subtitle: "From one money transfer product to a digital bank, and into the UK",
        body: "A single purpose remittance app turned into a full digital banking proposition, rebuilt screen by screen, and taken into a new market on a structure that lets the brand trade while the licence is built underneath it.",
        coverImage: {
          url: "/assets/RUUT.avif",
          alt: "RUUT banking app shown on two phones",
          width: 1360,
          height: 1720,
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
        detailEyebrow: "Case study",
        detailIntro:
          "From one money transfer product to a full digital bank, rebuilt screen by screen, and taken into the UK.",
        screens: [
          {
            url: "/assets/RUUT2.avif",
            alt: "Collage of RUUT app screens: transactions, quick actions, account balance and cards",
            width: 2800,
            height: 2000,
          },
          {
            url: "/assets/RUUT4.avif",
            alt: "RUUT app send money transaction details screen",
            width: 750,
            height: 1624,
          },
          {
            url: "/assets/RUUT5.avif",
            alt: "Collage of RUUT app transaction list and filter screens",
            width: 2800,
            height: 1784,
          },
        ],
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
      rightDoor: "When this is the right door",
      notRightDoor: "When it is not",
      duration: "How long",
      runsOn: "What it runs on",
    },
    items: [
      {
        slug: "proposition-blueprint",
        number: 1,
        title: "Proposition and Product Blueprint",
        tag: "Decide",
        problem:
          "The business case behind it is a spreadsheet somebody made assumptions into. What it needs is someone who has actually launched financial products before, and knows which assumption to test first.",
        action:
          "I pressure test the commercial model and the customer proposition before you commit a development budget. Which product genuinely fits your customers, which one earns money at your real volume, what to launch first and what to leave out.",
        outcome:
          "A validated proposition and commercial model, the revenue logic behind it, the assumption most likely to be wrong and what to do about it, and a build sequence with the first release defined.",
        rightDoor:
          "You have budget approval or you are about to ask for it. There is more than one product idea on the table. Somebody has produced a business case and it takes someone who has actually launched one to call it with confidence.",
        notRightDoor:
          "You have already validated the model and signed the partner. In that case you want Partner Selection or the Experience Build, not this.",
        duration: "Typically four to eight weeks, to be confirmed against scope.",
        runsOn:
          "Your numbers, your customer data if you have it, and conversations with the people who will actually have to sell and support the thing.",
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
        rightDoor:
          "Proposals are in, or you are about to go out to market for them. Or you already have a partner and you are starting to suspect the fit is wrong, which is worth having early rather than at renewal.",
        notRightDoor:
          "You have not settled what the product is yet. Choosing a partner before the proposition is a common and expensive order to do things in.",
        duration: "Typically four to six weeks, to be confirmed against scope.",
        runsOn:
          "Your projected volumes, your risk appetite, and an honest read of what your engineering team can absorb.",
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
        rightDoor:
          "The board has asked which country is next. Or the country has been chosen and the plan is being written. Earlier is better and cheaper, because most of the expensive decisions get made in the first three weeks.",
        notRightDoor:
          "You are already trading in the new market and the problem is growth rather than structure. That is a different piece of work and I will say so.",
        duration:
          "Choosing the country and the route takes weeks. A licence and a launch takes months, and that depends more on the regulator than on either of us.",
        runsOn:
          "Your current regulatory position, your appetite for holding your own licence versus operating under someone else’s, and what you can afford to spend before the first customer arrives.",
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
        rightDoor:
          "You have a flow that is not converting, or you are about to design one. This is also the door for a bank that knows the experience is the problem and cannot get a fix through its own compliance function.",
        notRightDoor:
          "The problem is acquisition rather than completion. If people are not arriving at the flow at all, redesigning the flow will not fix it, and I will tell you that before you pay for it.",
        duration: "Typically eight to twelve weeks, to be confirmed against scope.",
        runsOn:
          "Your current flow, your drop off data, and access to whoever owns compliance on your side. The last one matters more than the first two.",
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
          "Your team's week goes to partner calls, compliance questions and integration detail. There is nothing left for marketing and operations. The launch date moves every month, and closing that gap takes ten plus years of doing exactly this.",
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
  media: {
    heading: "fspark9 in the media",
    intro:
      "Where I have talked about this work, and where other people have written about it.",
    items: [
      {
        source: "Recorded talk",
        headline: "Building neo banks across three markets",
        description:
          "Lessons from building digital banks in three countries under three regulators.",
        note: "Video",
        href: "https://www.youtube.com/watch?v=sZvavBuMzLg",
        isVideo: true,
        order: 1,
      },
      {
        source: "The Fintech Magazine, FF News",
        headline: "Money and Morals",
        description:
          "An interview on building Europe's first interest free digital bank, and what an ethical proposition has to do differently.",
        note: "",
        href: "https://ffnews.com/thought-leadership/exclusive-money-and-morals-mehmet-burak-dikmen-insha-in-the-fintech-magazine",
        order: 2,
      },
      {
        source: "Fintech Istanbul",
        headline: "An analysis of remote customer onboarding: Bank Ident",
        description:
          "On how remote identification works in practice, and where the friction actually sits.",
        note: "In Turkish",
        href: "https://fintechistanbul.org/2022/01/09/uzaktan-musteri-tanima-sureclerine-dair-bir-analiz-bank-ident/",
        order: 3,
      },
      {
        source: "Panel, recorded",
        headline: "Growth and product in digital banking",
        description:
          "How growth and product decisions actually get made inside a digital bank.",
        note: "Video",
        href: "https://www.youtube.com/watch?v=nTPafclEZ7c",
        isVideo: true,
        order: 4,
      },
      {
        source: "Conference talk, recorded",
        headline: "Next generation digital banking",
        description:
          "A conference talk on what the next generation of digital banking actually requires.",
        note: "Video · In Turkish",
        href: "https://www.youtube.com/watch?v=wxjHsjcIgws",
        isVideo: true,
        order: 5,
      },
    ],
  },
  faq: {
    heading: "Questions people ask before we talk",
    items: [
      {
        question: "What does this cost?",
        answer:
          "There is no price list, because there is no standard job. After the first call I send you a proposal with the scope, the timeline and the price on it. You see the number before you commit to anything, and it does not move afterwards.",
        order: 1,
      },
      {
        question: "Do you only advise, or do you do the work too?",
        answer:
          "Both, and you choose. Some clients want the decision made properly and take it from there. Others hand me the partner negotiations, the licence route, the integration and the launch, and I run it until it is live. The middle of it does not go to a subcontractor.",
        order: 2,
      },
      {
        question: "Why one person instead of a firm?",
        answer:
          "A firm sends a partner to sell the work and a junior to do it. Here, the person you meet is the person doing the work. That is the whole difference, and it is also why I only take on a few clients at a time. On the delivery side I work with a small team I have shipped with before, and I run them myself.",
        order: 3,
      },
      {
        question: "Are we too early for this?",
        answer:
          "Sometimes, yes. If you are still testing whether anyone wants the product, you do not need me yet and I will tell you that on the call. If you have decided to build and money is about to move, this is exactly the right moment.",
        order: 4,
      },
      {
        question: "Which markets do you cover?",
        answer:
          "I live in Europe and work across Europe and the UK. Turkey and MENA are where I was born, raised and worked, so I know how decisions really get made there. Outside those, I will tell you honestly where my knowledge ends before you pay me anything.",
        order: 5,
      },
      {
        question: "We already have a team. Where do you fit?",
        answer:
          "I bring ten plus years building financial products, a network across the sector, and the problem solving to close the gaps a normal team hits for the first time.",
        order: 6,
      },
      {
        question: "Our information is sensitive.",
        answer:
          "I sign an NDA before we go into any detail. I also do not take on two clients competing for the same customers in the same market at the same time. If there is a conflict, you will hear it on the first call, not later.",
        order: 7,
      },
      {
        question: "How long does an engagement run?",
        answer:
          "It depends on the work. A partner selection can take weeks. A licence and a launch takes months, and that depends more on the regulator than on either of us. Either way you get a clear output and a clear invoice every month.",
        order: 8,
      },
      {
        question:
          "We are going into a second country. When should we talk?",
        answer:
          "Before the country is chosen, not after. Most of the expensive decisions in a market entry get made in the first three weeks, usually by people who have never made them before. If you have already picked the country, we can still work. We just start with what is still fixable and what is not.",
        order: 9,
      },
    ],
  },
  closingCta: {
    quote:
      '"On a cross border project with teams in several countries, he drove the communication and the allocation of work, and he did it with a level of detail on the payments side that you rarely get from one person. That combination is why the project landed."',
    quoteAttribution: "Programme Director · Cross border payments",
    headline: "In your team until it's live.",
    body: "Not a report, not a retainer, not a subcontractor in the middle. I come in at the decision and I leave when customers are using it. The first call is free. Tell me where things stand and we will see together whether I can help. If I cannot, you will still leave with two or three things worth doing.",
    ctaLabel: "Book a free 30 minute call",
    ctaHref: "/book",
    note: "The first call is free. If I am not the right person for this, I will say so on the call.",
  },
};

export const siteSettings: SiteSettings = {
  nav: [
    { label: "Why fspark9", href: "/story" },
    { label: "Services", href: "/services" },
    { label: "Case studies", href: "/work" },
    { label: "Media", href: "/#media" },
    { label: "Contact", href: "/book" },
  ],
  backLabel: "Back",
  ctaLabel: "Book a free call",
  ctaHref: "/book",
  booking: {
    calLink: "mburakdikmen/quick-chat",
    title: "A free 30 minute call",
    body: "Pick a time that works. Before we talk, it helps if you can tell me in two lines where you are and what is stuck.",
    meta1: "30 min · Video call",
    meta2: "Europe / Istanbul · timezone detected",
  },
  subpageCta: {
    headline: "In your team until it's live.",
    body: "Not a report, not a retainer, not a subcontractor in the middle. I come in at the decision and I leave when customers are using it. The first call is free. Tell me where things stand and we will see together whether I can help. If I cannot, you will still leave with two or three things worth doing.",
    ctaLabel: "Book a free call",
    ctaHref: "/book",
  },
  footer: {
    tagline: "Fintech and digital banking advisory",
    nine: "Nine is the last step. Spark is what lights it.",
    signature: "TRUST ISN'T MARKETED. IT'S BUILT.",
    email: "mehmetburakdikmen@gmail.com",
    linkedin: "https://www.linkedin.com/in/mdikmen/",
    nav: [
      { label: "Services", href: "/services" },
      { label: "Case studies", href: "/work" },
      { label: "Why I do this", href: "/story" },
      { label: "Book a call", href: "/book" },
    ],
    legalLinks: [
      { label: "Impressum", href: "/impressum" },
      { label: "Privacy", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
      { label: "Terms of use", href: "/terms" },
    ],
    legal:
      "fspark9 · Mehmet Burak Dikmen, sole trader · Beusselstrasse 31, 10553 Berlin, Germany",
    copyright: "© 2026 fspark9",
  },
  defaultOgImage: {
    url: "/assets/lockup-reversed.svg",
    alt: "fspark9",
    width: 3387,
    height: 964,
  },
};
