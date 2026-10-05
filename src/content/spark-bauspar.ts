import type { Locale, SparkReport } from "@/types/content";

/**
 * Spark sektör raporları Nº 01 · Bauspar (rapor şablonu). Metin tek
 * kaynaktan: Spark/sector reports/fspark9-sektor-raporu-bauspar-icerik-tr-en.md;
 * kaynak bağlantıları, grafik serisi ve karşılaştırma tablosu prototipten
 * (fspark9-sektor-raporu-bauspar.html, #report-data). Elle yazılmadı,
 * prototipten çıkarıldı. Hiçbir rakam, tarih ya da isim değiştirilmez.
 * Site bunu Sanity'den okuyor (sparkEpisode.reportBody); bu dosya
 * seed-v3'ün kaynağı ve check:drift'in aynası.
 */
export const bauspar: Record<Locale, SparkReport> = {
  en: {
    number: 1,
    subject: "Bauspar",
    hook: "Two countries, one pool.",
    seo: {
      title: "Two countries, one pool | fspark9",
      description:
        "Germany's Bauspar market and Türkiye's savings finance model, with two product proposals that can be built across the two countries.",
    },
    nav: [
      {
        id: "kisa",
        label: "Short version",
      },
      {
        id: "kullanici",
        label: "Simulator",
      },
      {
        id: "pazar",
        label: "Market",
      },
      {
        id: "model",
        label: "Model",
      },
      {
        id: "oyuncular",
        label: "Players",
      },
      {
        id: "kullanim",
        label: "Renovation and vehicles",
      },
      {
        id: "iki-ulke",
        label: "Two countries",
      },
      {
        id: "dersler",
        label: "Lessons",
      },
      {
        id: "oneriler",
        label: "Proposals",
      },
      {
        id: "kaynaklar",
        label: "Sources",
      },
    ],
    hero: {
      meta: ["Spark", "02 Sector reports", "October 2026"],
      bigNo: "02",
      titleLead: "Two countries,",
      titleCut: "one pool.",
      sub: "Germany's hundred year old Bauspar system is shrinking and still making money. In Türkiye, the interest free version of the same idea doubled in a year. This report puts the two markets side by side, shows the gap between them and proposes two products that can be built across them.",
      left: {
        label: "Germany",
        figures: [
          {
            value: "20.1m",
            to: 20.1,
            decimals: 1,
            template: "{n}m",
            label: "Bauspar contracts, down from 26.1m in 2019 [1][2]",
          },
          {
            value: "0.67%",
            to: 0.67,
            decimals: 2,
            template: "{n}%",
            label: "energy renovation rate for homes, a record low [14]",
          },
        ],
      },
      right: {
        label: "Türkiye",
        figures: [
          {
            value: "112%",
            to: 112,
            decimals: 0,
            template: "{n}%",
            label: "growth in savings finance customers, in one year [18]",
          },
          {
            value: "60%+",
            to: 60,
            decimals: 0,
            template: "{n}%+",
            label: "savings finance share of vehicle finance [19]",
          },
        ],
      },
      simulatorLabel: "Try the pool with your own numbers",
      proposalsLabel: "Go to the two product proposals",
    },
    short: {
      head: {
        index: "01",
        label: "The short version",
        title:
          "Same idea, two different stories. In between, a gap big enough for two products.",
      },
      cards: [
        {
          tag: "Germany",
          first: "The market shrinks, the Bausparkassen make money.",
          body: "New contracts fell 19.7 percent in 2025. Savings collected in the low rate years now turn into loans at higher rates, so the market leader doubled its profit. [3][4]",
        },
        {
          tag: "Türkiye",
          first: "The interest free pool is growing fast.",
          body: "High interest rates made fee based collective pools attractive. The customer count more than doubled in a year. A similar model is common in Brazil too. [18][21]",
        },
        {
          tag: "The bridge",
          first: "What one country lacks, the other already has.",
          body: "Germany has no interest free home savings product. Türkiye has no pool for renovation and earthquake strengthening. Both can be built with a model the other country already knows.",
        },
      ],
      view: {
        tag: "Our view",
        first:
          "Put Germany's transparent allocation system together with Türkiye's speed and interest free model, and you get products nobody offers today in either market.",
        linkLabel: "Read the proposals",
      },
    },
    simulator: {
      head: {
        index: "02",
        label: "Through a customer's eyes",
        title: "If Germany had an interest free pool, would it work for you?",
        lede: "We took Türkiye's savings finance model, an interest free home pool that runs on a fee, and moved it to Germany. Start with two families, then enter your own numbers.",
      },
      storyLabel: "Pick a story",
      values: {
        price: 200000,
        monthly: 1000,
        feePct: 8,
        bankRate: 3.5,
        depositRate: 2,
        rent: 1000,
      },
      presets: [
        {
          key: "early",
          name: "Selin and Murat",
          down: 80000,
          month: 3,
          usesInterest: true,
        },
        {
          key: "late",
          name: "Lukas and Anna",
          down: 40000,
          month: 72,
          usesInterest: true,
        },
      ],
      interestLabel: "Is an interest bearing loan an option for you?",
      yes: "Yes",
      no: "No",
      downLabel: "Down payment",
      monthLabel: "Month you get the home",
      feeLabel: "Pool fee",
      moreLabel: "Other assumptions",
      bankRateLabel: "Bank rate %",
      depositRateLabel: "Savings return %",
      rentLabel: "Monthly rent €",
      note: 'This is a model. The fee, rates, return and rent are assumptions, not the terms of a real product. With "Yes", the pool is compared with someone who moves in the same month and takes a bank loan for the rest. With "No", it is compared with someone who saves on their own, interest free, and rents until they can buy. If interest free bank financing is available, the result moves towards the "Yes" path. Rising house prices are not included; waiting makes that risk bigger.',
      stories: [
        {
          tag: "Selin and Murat, Frankfurt",
          first: "With an €80,000 down payment, the home comes in month 3.",
          body: "They pay the remaining €120,000 over ten years, €1,000 a month, with no interest. If they moved in the same month and borrowed the rest from a bank, they would pay about €20,800 in net interest. The pool fee is €16,000, an advantage of about €4,800. For early receivers, the model works well.",
        },
        {
          tag: "Lukas and Anna, Cologne",
          first: "With a €40,000 down payment, the home comes in month 72.",
          body: "Over six years they pay €112,000 into the pool. Saving the same money themselves and borrowing the rest from a bank would cost them about €1,100 net; the pool costs €16,000. That is a loss of about €14,900. For a family that does not want to pay interest, the picture changes: they move into a home 88 months before their own savings would buy it in month 160.",
        },
      ],
      math: {
        tag: "The maths in one line",
        first:
          "There is no interest in the pool, but the late receivers' money funds the early receivers' interest free loan.",
        body: "German Bausparen balances this by paying a small rate on savings and charging interest on loans. In an interest free pool, only the fee and the order do that job. If everyone pays the same fee, a late member who could take a bank loan loses. For a member who does not want to pay interest, the pool means a home years earlier.",
      },
      texts: {
        monthValue: "Month {t}",
        hint: "The plan runs {n} months. {x} goes into the pool before you get the home.",
        yesPositive:
          "The pool costs {x} less than moving in the same month and borrowing the rest from a bank.",
        yesNegative:
          "The pool costs {x} more than moving in the same month and borrowing the rest from a bank.",
        no: "Saving alone without interest, the home would come in month {n}. In the pool it comes in month {t}: {d} months sooner.",
        poolFee: "Pool fee",
        ownSaved: "Own way: savings return up to month {t}",
        ownLoan: "Own way: interest on a {l} bank loan",
        ownNet: "Net cost of your own way",
        rentValue: "Rent value of moving in early",
        difference: "Difference",
        waiting: "{t} months of waiting",
        home: "at home, {d} months of interest free payments",
        lastInstalment: "Month {n}, last instalment",
        signing: "Signing",
        custom: "Your numbers",
        constants: "Home €200,000, instalment €1,000 a month",
      },
    },
    market: {
      head: {
        index: "03",
        label: "The market",
        title:
          "Fewer people sign contracts, and those who do choose bigger amounts.",
      },
      figures: [
        {
          value: "13",
          label: "Bausparkassen: 8 private, 5 public (LBS) [1]",
        },
        {
          value: "€968.7bn",
          label: "total target amount of all contracts [1]",
        },
        {
          value: "€176.6bn",
          label: "Bauspar deposits [1]",
        },
        {
          value: "~€61bn",
          label: "new contract volume in 2025, estimate [4]",
        },
      ],
      metrics: [
        {
          key: "contracts",
          label: "Contracts",
          valueTemplate: "{n}m",
          decimals: 2,
          title: "Bauspar contracts, 2019 to 2025",
        },
        {
          key: "sum",
          label: "Total target amount",
          valueTemplate: "€{n}bn",
          decimals: 1,
          title: "Bauspar total target amount, 2019 to 2025",
        },
      ],
      years: ["2019", "2020", "2021", "2022", "2023", "2025"],
      contracts: [26.05, 24.92, 23.76, 22.59, 21.84, 20.13],
      sum: [909, 910.2, 907.8, 923.8, 956, 968.7],
      caption:
        "Year end stock. 2024 is not in this series. Source: Deutsche Bundesbank [1][2]",
      rows: [
        {
          key: "2022 and 2023",
          text: "Rates went up and demand hit a record. Customers signed contracts to lock in a low loan rate.",
        },
        {
          key: "2024",
          text: "About 1.3 million new contracts and €78.1bn. Down 13.2 percent in number and 21.1 percent in amount. [3]",
        },
        {
          key: "2025",
          text: "1.12 million new contracts. Down 19.7 percent in number and 25.9 percent in amount applied for. [3]",
        },
        {
          key: "Meanwhile",
          text: "Demand for Bauspar loans went up. Schwäbisch Hall raised its pre tax profit from €64m to €122m. [4]",
        },
      ],
    },
    model: {
      head: {
        index: "04",
        label: "How the model works",
        title:
          "The customer is buying a loan rate locked in for the future. The savings return is not the point.",
        lede: "The system is a closed pool. Savers' money funds the borrowers.",
      },
      stepLabel: "Step",
      steps: [
        {
          title: "Signing",
          body: "The customer picks a target amount. The loan rate is fixed that day. A contract fee of 1 to 1.6 percent of the target is charged.",
        },
        {
          title: "Saving",
          body: "The customer pays in regularly and earns a low rate. The state premium and employer savings contributions can go in here.",
        },
        {
          title: "Score",
          body: "A score rises with how much and how long the customer saves. Extra payments speed it up.",
        },
        {
          title: "Allocation",
          body: "Usually once 40 to 50 percent of the target is saved and the score and waiting time are reached, the right to the loan comes, depending on cash in the pool.",
        },
        {
          title: "Loan",
          body: "The savings are paid out, plus a loan for the rest at the rate fixed on signing day.",
        },
      ],
      order: {
        heading: "How the order is set",
        items: [
          {
            key: "Germany: score",
            text: "A score that runs for the whole contract. The customer can see how much each step brings the allocation forward.",
          },
          {
            key: "Türkiye: plan and draw",
            text: "A bigger down payment can bring delivery forward, but that is fixed at signing. After that, a draw or the payment order decides.",
          },
        ],
      },
      earns: {
        heading: "Where the Bausparkasse earns",
        items: [
          {
            key: "Contract fee",
            text: "Charged up front and kept even if the loan is never used. Sales commissions are paid from it.",
          },
          {
            key: "Interest margin",
            text: "A low rate on savings, a higher rate on loans. Both fixed from the start.",
          },
          {
            key: "Account fee",
            text: "Small per contract, large across millions of contracts.",
          },
          {
            key: "Unused rights",
            text: "Savers who never take the loan give the Bausparkasse cheap funding for years.",
          },
          {
            key: "Other loans",
            text: "Bridge loans and regular mortgages, at higher rates.",
          },
        ],
      },
      risks: [
        {
          tag: "Risk",
          first: "The model depends on the rate cycle.",
          body: "When rates are at the bottom, loan demand disappears while the Bausparkasse keeps paying old savings rates. In the 2010s this is why they cancelled old high rate contracts.",
        },
        {
          tag: "State support",
          first: "It exists, but it is small.",
          body: "10 percent of yearly savings, up to €70 (€140 for married couples). Income limit €35,000 for singles, €70,000 for couples. [13]",
        },
        {
          tag: "Number of contracts",
          first: "No limit per person.",
          body: "One person can hold several contracts and split a large amount across different allocation dates. In Türkiye, the limit is one vehicle and one home contract per company. [20]",
        },
      ],
    },
    consumers: {
      head: {
        index: "05",
        label: "Consumers",
        title:
          "Germans trust the product, but they have less money left to save.",
      },
      figures: [
        {
          value: "26%",
          label:
            "name a Bausparvertrag as a savings product they use, shares 24% [11]",
        },
        {
          value: "38.8%",
          label:
            "name a home as a savings goal, up from 33.0% a year earlier [11]",
        },
        {
          value: "4.2%",
          label:
            "of those planning to save more give a home as the reason, down from 14.2% [11]",
        },
        {
          value: "1 / 5",
          label: "Germans holds a contract, more in rural areas [12]",
        },
      ],
    },
    players: {
      head: {
        index: "06",
        label: "Players and channels",
        title: "The market belongs to whoever owns the branch network.",
        lede: "The product is mostly sold in bank branches, next to a mortgage or salary account conversation. Digital sales are a small share.",
      },
      share: [
        {
          label: "Schwäbisch Hall 33.3%",
          basis: 33.3,
        },
        {
          label: "LBS ~35%",
          basis: 35,
        },
        {
          label: "Others ~32%",
          basis: 31.7,
        },
      ],
      legend:
        "Share of new business, as stated by the companies. They may measure it differently. [4][6]",
      channelLabel: "Channel",
      noteLabel: "Note",
      items: [
        {
          name: "Schwäbisch Hall",
          group: "Cooperative banks (DZ Bank)",
          channel:
            "Almost every Volksbank and Raiffeisenbank branch, about 3,000 field staff [5]",
          note: "2025 new business €20.5bn, about 6 million customers [5]",
        },
        {
          name: "Landesbausparkassen",
          group: "Sparkassen group",
          channel: "Sparkasse branches",
          note: "5 institutions, €12.6bn paid out in 2025 [6]",
        },
        {
          name: "Wüstenrot",
          group: "W&W",
          channel: "Own field staff, brokers and corporate partners",
          note: "The oldest Bausparkasse (1924), 2024 gross new business about €11bn [9][10]",
        },
        {
          name: "BHW",
          group: "Deutsche Bank",
          channel: "Deutsche Bank and Postbank branches, financial advisers",
          note: "2.2 million contracts, 2025 new business €4.5bn [7]",
        },
        {
          name: "Badenia, Debeka, BKM",
          group: "Insurers and independent groups",
          channel: "Insurance field staff, independent brokers",
          note: "Badenia 2025 new business €2.7bn [8]",
        },
      ],
    },
    uses: {
      head: {
        index: "07",
        label: "Renovation and vehicles",
        title:
          "Renovation is the strongest reason to sign, but it is stuck. Vehicles are out of the picture.",
      },
      renovation: {
        tag: "Renovation",
        first: "For every 100 home renovations needed, only 57 were done.",
        meter: [
          {
            label: "2022 rate",
            value: "0.88%",
            width: 44,
          },
          {
            label: "2025 rate",
            value: "0.67%",
            width: 33.5,
          },
          {
            label: "Target rate",
            value: "~2%",
            width: 100,
            target: true,
          },
        ],
        paragraphs: [
          "In 2025, 460,000 homes needed renovating and 260,000 were done. Unrenovated buildings can sell at up to 40 percent less. [14]",
          "Bausparkassen have an edge here: they can offer renovation loans of up to 20 years. Schwäbisch Hall puts the yearly need for energy renovation at €80bn. [15][5]",
        ],
      },
      vehicles: {
        tag: "Vehicles",
        first:
          "You cannot buy a car with Bauspar. The law ties the loan to housing.",
        figures: [
          {
            value: "€23.7bn",
            label: "vehicle finance by loan and lease, first half 2026 [16]",
          },
          {
            value: "919k",
            label: "vehicles, same period [16]",
          },
        ],
        paragraphs: [
          "Banks, carmakers' own banks and leasing companies finance vehicles. About half of new cars and a third of used cars are bought on loan or lease. [17]",
          "Carmakers can offer very low rates in campaigns, so there is no gap for an interest free car pool. In Türkiye, high rates made savings finance the main channel for vehicles.",
        ],
      },
    },
    compare: {
      head: {
        index: "08",
        label: "Germany and Türkiye",
        title:
          "The same thing drives demand. Who carries the risk is what changes.",
        lede: "High market rates make both models attractive. In Germany the customer pays interest, but the rate is fixed years ahead and the Bausparkasse carries the risk. In Türkiye the customer pays a fee, and the cost of waiting stays with the customer.",
      },
      measureLabel: "Measure",
      columns: ["Germany", "Türkiye"],
      rows: [
        {
          measure: "Structure",
          cells: [
            "Savings plus a fixed rate loan",
            "Interest free pool, organisation fee",
          ],
        },
        {
          measure: "Order",
          cells: [
            "Allocation by savings score",
            "Draw, payment order or a plan set by the down payment",
          ],
        },
        {
          measure: "Contracts per person",
          cells: ["No limit", "Up to 1 vehicle and 1 home per company [20]"],
        },
        {
          measure: "Scale",
          cells: [
            "20.1 million contracts, €968.7bn in stock [1]",
            "1.34 million customers, total assets TRY 379bn [18]",
          ],
        },
        {
          measure: "Yearly volume",
          cells: [
            "About €61bn in new contracts (2025) [4]",
            "TRY 1.21 trillion in transactions (2025) [18]",
          ],
        },
        {
          measure: "Direction",
          cells: ["Shrinking", "Customer count up 112 percent [18]"],
        },
        {
          measure: "Main use",
          cells: [
            "Housing, renovation and down payments",
            "Mostly vehicles, a share above 60 percent [19]",
          ],
        },
        {
          measure: "Regulator",
          cells: ["BaFin, Bausparkassengesetz", "BDDK, Law No. 6361"],
        },
        {
          measure: "State support",
          cells: ["Yes, small", "None"],
        },
        {
          measure: "Amount limits",
          cells: ["None", "TRY 6.25m for vehicles, TRY 62.5m for homes [20]"],
        },
      ],
      note: "Türkiye figures are in Turkish lira, not converted.",
    },
    lessons: {
      head: {
        index: "09",
        label: "What each can learn",
        title: "Each country needs something the other already knows.",
      },
      groups: [
        {
          heading: "What Türkiye can take from Germany",
          items: [
            {
              title: "A transparent allocation score",
              body: 'In Türkiye, money already affects the order, but it is fixed at signing. A score that runs through the contract can tell the customer "pay extra and your home comes this many months sooner". That rewards extra saving and reduces the uncertainty of the draw.',
            },
            {
              title: "A focus on housing and renovation",
              body: "The German model is tied to housing on purpose. In Türkiye, the weight on vehicles sped up growth and also made the regulator step on the brake. Renovation is still unused in Türkiye; combined with earthquake strengthening and energy efficiency it becomes a serious product.",
            },
            {
              title: "The bank channel",
              body: "In Germany the product is sold in trusted bank branches. In Türkiye, independent companies and broker networks lead. Distribution with a bank group solves the trust question quickly.",
            },
            {
              title: "Long term trust",
              body: "The German system is a hundred years old. In Türkiye the sector is new and growing fast. Clear fees and clear customer rights make that growth last.",
            },
          ],
        },
        {
          heading: "What Germany can take from Türkiye",
          items: [
            {
              title: "An interest free option",
              body: "Germany has customers who avoid interest and fit no Bauspar product. As far as we know there is no interest free collective home savings product, and interest free home finance is offered by only a few banks.",
            },
            {
              title: "Speed and digital sales",
              body: "In Türkiye the customer count more than doubled in a year. In Germany the product is still sold through branches and field staff, and struggles to reach younger customers. The fast digital sign up of Turkish companies can be used directly.",
            },
            {
              title: "Simple product language",
              body: 'German tariffs are complex: scores, several fees, tariff variants. "Known fee, known plan" is a language German customers would understand too.',
            },
          ],
        },
      ],
    },
    proposals: {
      head: {
        index: "10",
        label: "Two product proposals",
        title: "Closing one country's gap with what the other knows.",
      },
      items: [
        {
          tag: "For Türkiye",
          first: "A renovation and earthquake strengthening pool",
          body: "Take the savings finance model beyond buying and open it to strengthening and insulating the home people already have. No pool in Türkiye does this today.",
          details: [
            {
              key: "Who for",
              text: "Families who own a home but lack the savings to strengthen or insulate it, and building managements.",
            },
            {
              key: "Taken from Germany",
              text: "Long term loans built for renovation, and a transparent score that runs through the contract.",
            },
            {
              key: "First step",
              text: "Clarify how far the current licence covers renovation, and run a pilot with a contractor or building inspection network.",
            },
          ],
        },
        {
          tag: "For Germany",
          first: "A fairly priced interest free home pool",
          body: "A design that brings the Turkish model to Germany and makes the late member's loss smaller. The audience: families who avoid interest and sit outside Bauspar today.",
          details: [
            {
              key: "Design",
              text: "A fee that depends on delivery time, sharing the interest free return on waiting money with late members, and a transparent score in place of a draw.",
            },
            {
              key: "Taken from Türkiye",
              text: "Fast digital sign up, simple product language and the interest free structure.",
            },
            {
              key: "First step",
              text: "Regulatory work on which licence it can run under, and a distribution partnership with a bank.",
            },
          ],
        },
      ],
      bridge: {
        tag: "The bridge",
        first:
          "Both products need the same thing: knowing both markets and interest free finance together.",
        points: [
          "For a savings finance company in Türkiye, a renovation product is new growth the regulator is likely to welcome.",
          "For a bank or Bausparkasse in Germany, an interest free pool opens a group of customers it cannot reach today.",
          "For a Turkish company expanding to Germany, the gap in this report is a ready starting point.",
        ],
      },
    },
    view: {
      head: {
        index: "11",
        label: "Our view",
        title:
          "Classic Bauspar will not grow. Growth sits with whoever combines the two countries' models.",
      },
      paragraphs: [
        "In Germany, Bausparkassen try to grow through mortgages, renovation finance and platform services instead of new contracts. Vehicles are outside the model. The model travels to other countries only with three things: long term trust, a steady flow of new savings and stable rules. When Hungary ended state support in 2018, its market shrank. [22]",
        "Growth in Türkiye depends on high rates. Where demand goes when rates fall is this market's main question. Products tied to a need that does not depend on rates, like renovation, are less exposed to it.",
      ],
      expert: {
        tag: "Expert note",
        quote:
          "Millions of families in Türkiye want to strengthen their homes, and no pool is built for it. I see a serious opportunity here.",
        body: "I have built two banks in Germany and launched banking and fintech products in Türkiye. I know both markets from the inside, and when I look at them closely I see the same thing: a problem one country has solved is still open in the other. Bauspar's transparent score answers the uncertainty of Türkiye's draw. Türkiye's speed and interest free model answer a German product that cannot leave the branch.",
        signature: "Mehmet Burak Dikmen, fspark9",
        initials: "MB",
      },
    },
    close: {
      label: "Next step",
      title: "Two markets, two gaps. Let's build the first product together.",
      body: "fspark9 works with banks and fintechs on product, partner and market entry decisions between Türkiye and Germany.",
      bookLabel: "Book a call",
      backLabel: "Back to the simulator",
    },
    sources: {
      head: {
        index: "",
        label: "Sources",
        title: "Where every figure comes from.",
      },
      items: [
        {
          label:
            "Deutsche Bundesbank, Bankenstatistiken, Bausparkassen, September 2026",
          href: "https://www.bundesbank.de/resource/blob/807852/d61d66a4bc89c2b1c2b98bee06249e50/472B63F073F071307366337C94F8C870/bf1d00a3-data.pdf",
        },
        {
          label:
            "Deutsche Bundesbank, Bankenstatistiken, Bausparkassen series 2019 to 2023",
          href: "https://bundesbank.de/resource/blob/807852/8a3ff1fd994269109e158b0c2740d751/472B63F073F071307366337C94F8C870/bf1d00a3-data.pdf",
        },
        {
          label:
            "Verband der Privaten Bausparkassen, Bauspar new business data 2024 and 2025",
        },
        {
          label:
            "Bausparkasse Schwäbisch Hall, 2025 results release, February 2026",
          href: "https://bankinformation.de/geno-meldung/schwaebisch-hall-ergebnis-verdoppelt-marktfuehrerschaft-behauptet/65877/",
        },
        {
          label:
            "Bausparkasse Schwäbisch Hall, investor presentation, August 2026",
          href: "https://www.schwaebisch-hall.de/content/dam/dambsh/unternehmen/investor-relations/ir-präsentationen-/2026-08-11%20DEU%20Investorenpraesentation-Bausparkasse-Schwaebisch-Hall-AG%20.pdf",
        },
        {
          label: "DSGV, Bilanzzahlen 2025 der Sparkassen-Finanzgruppe",
        },
        {
          label: "BHW Bausparkasse, Geschäftsbericht 2025",
          href: "https://www.bhw.de/dam/bhwde/pdf/GB2025.pdf",
        },
        {
          label: "Deutsche Bausparkasse Badenia, Geschäftsbericht 2025",
        },
        {
          label: "Versicherungsbote, Bausparkassen product quality study, 2025",
          href: "https://www.versicherungsbote.de/id/4940394/Diese-Bausparkassen-ueberzeugen-mit-ihrer-Produktqualitaet/",
        },
        {
          label: "W&W, 100 Jahre Wüstenrot Bausparkasse, 2024",
        },
        {
          label:
            "Verband der Privaten Bausparkassen and Kantar, savings survey, spring 2026",
        },
        {
          label: "YouGov Deutschland, Bausparer audience analysis",
        },
        {
          label: "Wohnungsbau-Prämiengesetz, 2026 terms",
        },
        {
          label: "BuVEG, Sanierungsquote 2025",
          href: "https://buveg.de/sanierungsquote/",
        },
        {
          label:
            "WirtschaftsWoche, financing modernisation with Bausparkassen, 2026",
          href: "https://www.wiwo.de/finanzen/immobilien/bausparkassen-guenstig-die-immobilienmodernisierung-finanzieren/100231832.html",
        },
        {
          label: "Bankenfachverband, Kreditbanken first half 2026, autohaus.de",
          href: "https://www.autohaus.de/nachrichten/autohandel/kreditbanken-mit-919-000-fahrzeugen-kfz-finanzierung-bleibt-wachstumstreiber-3907405",
        },
        {
          label:
            "Bankenfachverband, share of private cars financed by loan or lease, 2023",
          href: "https://de.statista.com/statistik/daten/studie/1065113/umfrage/anteil-der-per-kredit-oder-leasing-finanzierten-privaten-pkw-in-deutschland/",
        },
        {
          label: "Finansal Kurumlar Birliği data, Hürriyet, 2026",
        },
        {
          label: "Central Bank of the Republic of Türkiye data, March 2026",
        },
        {
          label: "BDDK, savings finance regulation, August 2026",
        },
        {
          label: "ABAC, Consórcio de imóveis 2025",
          href: "https://blog.abac.org.br/drops-de-mercado/consorcio-de-imoveis-mantem-lideranca-em-creditos-contratados",
        },
        {
          label:
            "bne IntelliNews and 444.hu, Hungary ends Bauspar subsidy, October 2018",
        },
      ],
      note: 'Data checked on 5 October 2026. Figures marked "about" or "estimate" are calculated from source data. The simulator and stories in section 2 are a model based on assumptions.',
    },
  },
  tr: {
    number: 1,
    subject: "Bauspar",
    hook: "İki ülke, tek havuz.",
    seo: {
      title: "İki ülke, tek havuz | fspark9",
      description:
        "Almanya'nın Bauspar pazarı ve Türkiye'nin tasarruf finansman modeli, iki ülke arasında kurulabilecek iki ürün önerisiyle.",
    },
    nav: [
      {
        id: "kisa",
        label: "Kısaca",
      },
      {
        id: "kullanici",
        label: "Simülatör",
      },
      {
        id: "pazar",
        label: "Pazar",
      },
      {
        id: "model",
        label: "Model",
      },
      {
        id: "oyuncular",
        label: "Oyuncular",
      },
      {
        id: "kullanim",
        label: "Tadilat ve taşıt",
      },
      {
        id: "iki-ulke",
        label: "İki ülke",
      },
      {
        id: "dersler",
        label: "Dersler",
      },
      {
        id: "oneriler",
        label: "Öneriler",
      },
      {
        id: "kaynaklar",
        label: "Kaynaklar",
      },
    ],
    hero: {
      meta: ["Spark", "02 Sektör raporları", "Ekim 2026"],
      bigNo: "02",
      titleLead: "İki ülke,",
      titleCut: "tek havuz.",
      sub: "Almanya'nın yüz yıllık Bauspar sistemi küçülürken kâr ediyor. Türkiye'de aynı fikrin faizsiz hali bir yılda iki katına çıktı. Bu rapor iki pazarı yan yana koyuyor, aradaki boşluğu gösteriyor ve iki ülke arasında kurulabilecek iki ürünü öneriyor.",
      left: {
        label: "Almanya",
        figures: [
          {
            value: "20,1 mn",
            to: 20.1,
            decimals: 1,
            template: "{n} mn",
            label: "Bauspar sözleşmesi, 2019'da 26,1 milyondu [1][2]",
          },
          {
            value: "%0,67",
            to: 0.67,
            decimals: 2,
            template: "%{n}",
            label: "konutlarda enerji tadilatı oranı, tarihin en düşüğü [14]",
          },
        ],
      },
      right: {
        label: "Türkiye",
        figures: [
          {
            value: "%112",
            to: 112,
            decimals: 0,
            template: "%{n}",
            label: "tasarruf finansman müşteri artışı, bir yılda [18]",
          },
          {
            value: "%60+",
            to: 60,
            decimals: 0,
            template: "%{n}+",
            label: "taşıt finansmanında tasarruf finansmanın payı [19]",
          },
        ],
      },
      simulatorLabel: "Havuzu kendi rakamlarınla dene",
      proposalsLabel: "İki ürün önerisine geç",
    },
    short: {
      head: {
        index: "01",
        label: "Kısaca",
        title:
          "Aynı fikir, iki farklı hikaye. Arada iki ürünlük bir boşluk var.",
      },
      cards: [
        {
          tag: "Almanya",
          first: "Pazar daralıyor, kasalar kâr ediyor.",
          body: "Yeni sözleşmeler 2025'te yüzde 19,7 düştü. Düşük faiz döneminde toplanan birikim şimdi daha yüksek faizle krediye dönüyor, bu yüzden lider kasanın kârı ikiye katlandı. [3][4]",
        },
        {
          tag: "Türkiye",
          first: "Faizsiz havuz hızla büyüyor.",
          body: "Yüksek faiz, ücretle çalışan kolektif havuzları cazip yaptı. Müşteri sayısı bir yılda iki katını aştı. Benzer bir model Brezilya'da da yaygın. [18][21]",
        },
        {
          tag: "Köprü",
          first: "Her ülkenin eksiği, diğerinde var.",
          body: "Almanya'da faizsiz bir konut tasarrufu yok. Türkiye'de tadilat ve deprem güçlendirmesi için bir havuz yok. İkisi de diğer ülkenin bildiği bir modelle kurulabilir.",
        },
      ],
      view: {
        tag: "Görüşümüz",
        first:
          "Almanya'nın şeffaf tahsis sistemi ile Türkiye'nin hızı ve faizsiz modeli birleştiğinde, iki pazarda da bugün kimsenin sunmadığı ürünler çıkıyor.",
        linkLabel: "Önerileri oku",
      },
    },
    simulator: {
      head: {
        index: "02",
        label: "Bir kullanıcının gözünden",
        title: "Almanya'da faizsiz bir havuz olsaydı, senin için işler miydi?",
        lede: "Türkiye'deki tasarruf finansman modelini, yani faizsiz ve ücretle çalışan bir konut havuzunu Almanya'ya taşıdık. İki aileyle başla, sonra kendi rakamlarını gir.",
      },
      storyLabel: "Hazır hikaye",
      values: {
        price: 200000,
        monthly: 1000,
        feePct: 8,
        bankRate: 3.5,
        depositRate: 2,
        rent: 1000,
      },
      presets: [
        {
          key: "early",
          name: "Selin ve Murat",
          down: 80000,
          month: 3,
          usesInterest: true,
        },
        {
          key: "late",
          name: "Lukas ve Anna",
          down: 40000,
          month: 72,
          usesInterest: true,
        },
      ],
      interestLabel: "Faizli kredi senin için bir seçenek mi?",
      yes: "Evet",
      no: "Hayır",
      downLabel: "Peşinat",
      monthLabel: "Evin teslim ayı",
      feeLabel: "Organizasyon ücreti",
      moreLabel: "Diğer varsayımlar",
      bankRateLabel: "Banka faizi %",
      depositRateLabel: "Mevduat getirisi %",
      rentLabel: "Aylık kira €",
      note: 'Hesap bir modeldir. Ücret, faiz, getiri ve kira varsayımdır, gerçek bir ürünün koşulu değildir. "Evet" seçildiğinde havuz, aynı ay eve girip kalan tutar için banka kredisi kullanan biriyle karşılaştırılır. "Hayır" seçildiğinde, faizsiz kendi birikimiyle evi alana kadar kirada kalan biriyle karşılaştırılır. Faizsiz banka finansmanı kullanılabiliyorsa sonuç "Evet" yoluna yaklaşır. Ev fiyatlarındaki artış hesaba katılmadı; beklemek bu riski büyütür.',
      stories: [
        {
          tag: "Selin ve Murat, Frankfurt",
          first: "80.000 € peşinatla ev 3. ayda geliyor.",
          body: "Kalan 120.000 €'yu on yılda, ayda 1.000 € faizsiz ödüyorlar. Aynı ay eve girip kalanı bankadan alsalar net yaklaşık 20.800 € faiz ödeyeceklerdi. Havuzun ücreti 16.000 €, yani yaklaşık 4.800 € avantaj. Erken teslim alan için model iyi çalışıyor.",
        },
        {
          tag: "Lukas ve Anna, Köln",
          first: "40.000 € peşinatla ev 72. ayda geliyor.",
          body: "Altı yılda havuza 112.000 € yatırıyorlar. Aynı parayı kendileri biriktirip kalanı bankadan alsalar net maliyetleri yaklaşık 1.100 € olacaktı; havuz 16.000 €. Yani yaklaşık 14.900 € kayıp. Faiz kullanmak istemeyen bir aile için ise tablo değişiyor: kendi birikimiyle 160. ayda alacağı eve 88 ay erken giriyor.",
        },
      ],
      math: {
        tag: "Matematiğin özü",
        first:
          "Havuzda faiz yok, ama erken teslim alanın faizsiz kredisini geç teslim alanların parası finanse ediyor.",
        body: "Alman Bausparen bu dengeyi birikime küçük bir faiz verip krediden faiz alarak kuruyor. Faizsiz havuzda dengeyi sadece ücret ve sıra kuruyor. Ücret herkese aynıysa, faizli krediyi seçenek olarak gören geç katılımcı kaybediyor. Faiz kullanmak istemeyen katılımcı için ise havuz yıllarca erken ev demek.",
      },
      texts: {
        monthValue: "{t}. ay",
        hint: "Plan {n} ay sürüyor. Teslime kadar havuza {x} yatırılıyor.",
        yesPositive:
          "Havuz, aynı ay eve girip kalanı bankadan alan birine göre {x} daha ucuz.",
        yesNegative:
          "Havuz, aynı ay eve girip kalanı bankadan alan birine göre {x} daha pahalı.",
        no: "Faizsiz kendi birikimiyle ev {n}. ayda gelirdi. Havuzda {t}. ayda geliyor: {d} ay erken.",
        poolFee: "Havuz ücreti",
        ownSaved: "Kendi yolu: {t}. aya kadar biriktirme getirisi",
        ownLoan: "Kendi yolu: {l} banka kredisinin faizi",
        ownNet: "Kendi yolunun net maliyeti",
        rentValue: "Erken taşınmanın kira karşılığı",
        difference: "Fark",
        waiting: "{t} ay bekleme",
        home: "evde, {d} ay faizsiz ödeme",
        lastInstalment: "{n}. ay, son taksit",
        signing: "İmza",
        custom: "Senin rakamların",
        constants: "Ev 200.000 €, taksit ayda 1.000 €",
      },
    },
    market: {
      head: {
        index: "03",
        label: "Pazar",
        title:
          "Daha az kişi sözleşme açıyor, açanlar daha büyük tutar seçiyor.",
      },
      figures: [
        {
          value: "13",
          label: "Bausparkasse: 8 özel, 5 kamu (LBS) [1]",
        },
        {
          value: "968,7 mr €",
          label: "sözleşmelerin toplam hedef tutarı [1]",
        },
        {
          value: "176,6 mr €",
          label: "Bauspar mevduatı [1]",
        },
        {
          value: "~61 mr €",
          label: "2025 yeni sözleşme hacmi, tahmin [4]",
        },
      ],
      metrics: [
        {
          key: "contracts",
          label: "Sözleşme sayısı",
          valueTemplate: "{n} mn",
          decimals: 2,
          title: "Bauspar sözleşme sayısı, 2019 ile 2025",
        },
        {
          key: "sum",
          label: "Toplam hedef tutar",
          valueTemplate: "{n} mr €",
          decimals: 1,
          title: "Bauspar toplam hedef tutar, 2019 ile 2025",
        },
      ],
      years: ["2019", "2020", "2021", "2022", "2023", "2025"],
      contracts: [26.05, 24.92, 23.76, 22.59, 21.84, 20.13],
      sum: [909, 910.2, 907.8, 923.8, 956, 968.7],
      caption:
        "Yıl sonu stok. 2024 bu seride yer almıyor. Kaynak: Deutsche Bundesbank [1][2]",
      rows: [
        {
          key: "2022 ve 2023",
          text: "Faizler yükselince rekor talep geldi. Müşteriler düşük kredi faizini kilitlemek için sözleşme açtı.",
        },
        {
          key: "2024",
          text: "Yaklaşık 1,3 milyon yeni sözleşme ve 78,1 milyar €. Sayıda yüzde 13,2, tutarda yüzde 21,1 düşüş. [3]",
        },
        {
          key: "2025",
          text: "1,12 milyon yeni sözleşme. Sayıda yüzde 19,7, başvuru tutarında yüzde 25,9 düşüş. [3]",
        },
        {
          key: "Aynı dönemde",
          text: "Bauspar kredisine talep arttı. Schwäbisch Hall vergi öncesi kârını 64 milyon €'dan 122 milyon €'ya çıkardı. [4]",
        },
      ],
    },
    model: {
      head: {
        index: "04",
        label: "Model nasıl işler",
        title:
          "Müşteri birikim getirisi almıyor, geleceğe kilitlenmiş bir kredi faizi alıyor.",
        lede: "Sistem kapalı bir havuz. Biriktirenlerin parası, kredi kullananları finanse ediyor.",
      },
      stepLabel: "Adım",
      steps: [
        {
          title: "İmza",
          body: "Hedef tutar seçilir. Kredi faizi o gün sabitlenir. Hedef tutarın yüzde 1 ile 1,6'sı sözleşme ücreti olarak alınır.",
        },
        {
          title: "Birikim",
          body: "Müşteri düzenli öder, birikimine düşük faiz alır. Devlet primi ve işveren katkısı buraya yatabilir.",
        },
        {
          title: "Puan",
          body: "Ne kadar ve ne kadar süre biriktirdiğine göre bir puan yükselir. Ekstra ödeme puanı hızlandırır.",
        },
        {
          title: "Tahsis",
          body: "Genelde hedefin yüzde 40 ile 50'si birikmiş, puan ve bekleme süresi dolmuşsa havuzdaki likiditeye göre hak gelir.",
        },
        {
          title: "Kredi",
          body: "Birikim ve kalan tutar kadar kredi, imza günündeki faizle verilir.",
        },
      ],
      order: {
        heading: "Sıra nasıl belirlenir",
        items: [
          {
            key: "Almanya: puan",
            text: "Sözleşme boyunca işleyen bir puan. Müşteri hangi adımın tahsisi ne kadar öne çekeceğini görür.",
          },
          {
            key: "Türkiye: plan ve kura",
            text: "Yüksek peşinatla teslim öne çekilebilir, ama bu imzada sabitlenir. Sonrası kura ya da vade sırası.",
          },
        ],
      },
      earns: {
        heading: "Kasa nereden kazanır",
        items: [
          {
            key: "Sözleşme ücreti",
            text: "Peşin alınır, kredi kullanılmasa da iade edilmez. Satış komisyonları buradan ödenir.",
          },
          {
            key: "Faiz marjı",
            text: "Birikime düşük, krediye daha yüksek faiz. İkisi de baştan sabit.",
          },
          {
            key: "Hesap ücreti",
            text: "Sözleşme başına küçük, milyonlarca sözleşmede büyük.",
          },
          {
            key: "Kullanılmayan hak",
            text: "Krediyi hiç kullanmayanların birikimi kasaya yıllarca ucuz kaynak olur.",
          },
          {
            key: "Ek krediler",
            text: "Köprü kredisi ve klasik konut kredisi, daha yüksek faizle.",
          },
        ],
      },
      risks: [
        {
          tag: "Risk",
          first: "Model faiz döngüsüne bağlı.",
          body: "Faizler dipteyken kredi talebi kaybolur, kasa eski birikim faizlerini ödemeye devam eder. 2010'larda kasalar bu yüzden eski yüksek faizli sözleşmeleri feshetti.",
        },
        {
          tag: "Devlet desteği",
          first: "Var, ama sembolik.",
          body: "Yıllık birikimin yüzde 10'u, en fazla 70 € (evlilerde 140 €). Gelir sınırı bekarlarda 35.000 €, evlilerde 70.000 €. [13]",
        },
        {
          tag: "Sözleşme sayısı",
          first: "Kişi başına sınır yok.",
          body: "Aynı kişi birden fazla sözleşme tutabilir, büyük tutarı farklı tahsis zamanlarına bölebilir. Türkiye'de ise aynı şirkette en fazla bir taşıt ve bir konut. [20]",
        },
      ],
    },
    consumers: {
      head: {
        index: "05",
        label: "Tüketici",
        title: "Almanlar ürüne güveniyor, ama biriktirecek para azalıyor.",
      },
      figures: [
        {
          value: "%26",
          label:
            "Bausparvertrag'ı kullandığı birikim aracı olarak sayıyor, hisse senedi %24 [11]",
        },
        {
          value: "%38,8",
          label:
            "tasarruf hedefi olarak konutu gösteriyor, bir yıl önce %33,0 [11]",
        },
        {
          value: "%4,2",
          label:
            "daha fazla biriktirmek isteyenlerden konutu sebep gösteren, bir yıl önce %14,2 [11]",
        },
        {
          value: "1 / 5",
          label:
            "Almandan biri sözleşme sahibi, kırsalda oran daha yüksek [12]",
        },
      ],
    },
    players: {
      head: {
        index: "06",
        label: "Oyuncular ve kanallar",
        title: "Pazar, şube ağına sahip olanın pazarı.",
        lede: "Ürün çoğunlukla banka şubesinde, konut kredisi ya da maaş hesabı görüşmesinin yanında satılıyor. Dijital satışın payı küçük.",
      },
      share: [
        {
          label: "Schwäbisch Hall %33,3",
          basis: 33.3,
        },
        {
          label: "LBS ~%35",
          basis: 35,
        },
        {
          label: "Diğerleri ~%32",
          basis: 31.7,
        },
      ],
      legend:
        "Yeni işte pay, kurumların kendi açıklamaları. Ölçüm tabanları farklı olabilir. [4][6]",
      channelLabel: "Kanal",
      noteLabel: "Not",
      items: [
        {
          name: "Schwäbisch Hall",
          group: "Kooperatif bankalar (DZ Bank)",
          channel:
            "Neredeyse tüm Volksbank ve Raiffeisenbank şubeleri, yaklaşık 3.000 kişilik saha ekibi [5]",
          note: "2025 yeni iş 20,5 milyar €, yaklaşık 6 milyon müşteri [5]",
        },
        {
          name: "Landesbausparkassen",
          group: "Sparkassen grubu",
          channel: "Sparkasse şubeleri",
          note: "5 kurum, 2025'te 12,6 milyar € ödeme [6]",
        },
        {
          name: "Wüstenrot",
          group: "W&W",
          channel: "Kendi saha ekibi, aracılar ve kurumsal ortaklar",
          note: "En eski kasa (1924), 2024 brüt yeni iş yaklaşık 11 milyar € [9][10]",
        },
        {
          name: "BHW",
          group: "Deutsche Bank",
          channel: "Deutsche Bank ve Postbank şubeleri, finans danışmanları",
          note: "2,2 milyon sözleşme, 2025 yeni iş 4,5 milyar € [7]",
        },
        {
          name: "Badenia, Debeka, BKM",
          group: "Sigorta ve bağımsız gruplar",
          channel: "Sigorta saha ekipleri, bağımsız aracılar",
          note: "Badenia 2025 yeni iş 2,7 milyar € [8]",
        },
      ],
    },
    uses: {
      head: {
        index: "07",
        label: "Tadilat ve taşıt",
        title:
          "Tadilat en güçlü gerekçe ama yerinde sayıyor. Taşıt ise tamamen dışarıda.",
      },
      renovation: {
        tag: "Tadilat",
        first: "Gereken her 100 konut tadilatından sadece 57'si yapıldı.",
        meter: [
          {
            label: "2022 oranı",
            value: "%0,88",
            width: 44,
          },
          {
            label: "2025 oranı",
            value: "%0,67",
            width: 33.5,
          },
          {
            label: "Hedef oran",
            value: "~%2",
            width: 100,
            target: true,
          },
        ],
        paragraphs: [
          "2025'te 460 bin konutun tadil edilmesi gerekirken 260 bini yapıldı. Tadil edilmemiş binalar piyasada yüzde 40'a kadar değer kaybedebiliyor. [14]",
          "Kasalar burada avantajlı: tadilat kredilerinde 20 yıla varan vade sunabiliyorlar. Schwäbisch Hall yıllık enerji tadilatı ihtiyacını 80 milyar € olarak hesaplıyor. [15][5]",
        ],
      },
      vehicles: {
        tag: "Taşıt",
        first: "Bauspar ile araba alınmaz. Yasa krediyi konuta bağlıyor.",
        figures: [
          {
            value: "23,7 mr €",
            label: "kredi ve leasingle taşıt finansmanı, 2026 ilk yarı [16]",
          },
          {
            value: "919 bin",
            label: "araç, aynı dönemde [16]",
          },
        ],
        paragraphs: [
          "Taşıt finansmanını bankalar, markaların kendi bankaları ve leasing şirketleri yapıyor. Yeni arabaların yaklaşık yarısı, ikinci el araçların üçte biri kredi ya da leasingle alınıyor. [17]",
          "Markalar kampanyalarda çok düşük faizli kredi verebildiği için faizsiz bir araç havuzuna talep yaratacak boşluk yok. Türkiye'de ise yüksek faiz, tasarruf finansmanını taşıtın ana kanalı yaptı.",
        ],
      },
    },
    compare: {
      head: {
        index: "08",
        label: "Almanya ve Türkiye",
        title: "Talebi aynı şey büyütüyor. Riski taşıyan taraf değişiyor.",
        lede: "İki modeli de yüksek piyasa faizi cazip yapıyor. Almanya'da müşteri faiz öder ama oran yıllar önceden sabittir, risk kasadadır. Türkiye'de müşteri ücret öder, beklemenin maliyeti müşteride kalır.",
      },
      measureLabel: "Gösterge",
      columns: ["Almanya", "Türkiye"],
      rows: [
        {
          measure: "Yapı",
          cells: [
            "Birikim artı sabit faizli kredi",
            "Faizsiz havuz, organizasyon ücreti",
          ],
        },
        {
          measure: "Sıra",
          cells: [
            "Birikim puanına göre tahsis",
            "Kura, vade sırası ya da peşinata göre plan",
          ],
        },
        {
          measure: "Kişi başı sözleşme",
          cells: [
            "Sınır yok",
            "Aynı şirkette en fazla 1 taşıt ve 1 konut [20]",
          ],
        },
        {
          measure: "Ölçek",
          cells: [
            "20,1 milyon sözleşme, 968,7 milyar € stok [1]",
            "1,34 milyon müşteri, aktif büyüklük 379 milyar TL [18]",
          ],
        },
        {
          measure: "Yıllık hacim",
          cells: [
            "Yaklaşık 61 milyar € yeni sözleşme (2025) [4]",
            "1,21 trilyon TL işlem hacmi (2025) [18]",
          ],
        },
        {
          measure: "Gidişat",
          cells: ["Daralıyor", "Müşteri sayısı yüzde 112 arttı [18]"],
        },
        {
          measure: "Ana kullanım",
          cells: [
            "Konut, tadilat ve peşinat",
            "Ağırlık taşıtta, payı yüzde 60'ın üzerinde [19]",
          ],
        },
        {
          measure: "Düzenleyici",
          cells: ["BaFin, Bausparkassengesetz", "BDDK, 6361 sayılı Kanun"],
        },
        {
          measure: "Devlet desteği",
          cells: ["Var, sembolik", "Yok"],
        },
        {
          measure: "Tutar sınırı",
          cells: ["Yok", "Taşıtta 6,25 milyon TL, konutta 62,5 milyon TL [20]"],
        },
      ],
      note: "Türkiye rakamları TL cinsindendir, kur dönüşümü yapılmadı.",
    },
    lessons: {
      head: {
        index: "09",
        label: "Karşılıklı dersler",
        title: "Her iki ülke de diğerinin bildiği bir şeye ihtiyaç duyuyor.",
      },
      groups: [
        {
          heading: "Türkiye'nin Almanya'dan alabilecekleri",
          items: [
            {
              title: "Şeffaf tahsis puanı",
              body: 'Türkiye\'de para sırayı zaten etkiliyor, ama imzada sabitleniyor. Sözleşme boyunca işleyen bir puan müşteriye "ek ödeme yaparsan evin şu kadar ay önce gelir" diyebilir. Bu, ek tasarrufu teşvik eder ve kura belirsizliğini azaltır.',
            },
            {
              title: "Konut ve tadilat odağı",
              body: "Almanya modeli bilinçli olarak konuta bağlı. Türkiye'de taşıt ağırlığı büyümeyi hızlandırdı ama düzenleyiciyi frene bastırdı. Tadilat Türkiye'de henüz kullanılmayan bir alan; deprem güçlendirmesi ve enerji verimliliğiyle birleşince ciddi bir ürün olur.",
            },
            {
              title: "Banka kanalı",
              body: "Almanya'da ürün güvenilen banka şubelerinde satılıyor. Türkiye'de bağımsız şirket ve aracı ağları baskın. Bir banka grubuyla ortak dağıtım güven sorununu hızla çözer.",
            },
            {
              title: "Uzun vadeli güven",
              body: "Almanya'da sistem yüz yıllık. Türkiye'de sektör yeni ve hızlı büyüyor. Şeffaf ücretler ve net müşteri hakları bu büyümeyi kalıcı yapar.",
            },
          ],
        },
        {
          heading: "Almanya'nın Türkiye'den alabilecekleri",
          items: [
            {
              title: "Faizsiz seçenek",
              body: "Almanya'da faize hassas ve hiçbir Bauspar ürününe uymayan bir kitle var. Bildiğimiz kadarıyla faizsiz kolektif bir konut tasarruf ürünü yok, faizsiz konut finansmanı ise sınırlı sayıda bankada var.",
            },
            {
              title: "Hız ve dijital satış",
              body: "Türkiye'de müşteri sayısı bir yılda iki katını aştı. Almanya'da ürün hâlâ şube ve saha ekibiyle satılıyor ve genç müşteriye ulaşmakta zorlanıyor. Türk şirketlerinin hızlı dijital başvurusu doğrudan uygulanabilir.",
            },
            {
              title: "Basit ürün dili",
              body: 'Alman tarifeleri karmaşık: puan sistemi, birden fazla ücret, tarif varyantları. "Ücret belli, plan belli" sadeliği Alman müşterinin de anlayacağı bir dil.',
            },
          ],
        },
      ],
    },
    proposals: {
      head: {
        index: "10",
        label: "İki ürün önerisi",
        title: "Bir ülkenin bildiğiyle diğerinin boşluğunu kapatmak.",
      },
      items: [
        {
          tag: "Türkiye için",
          first: "Tadilat ve deprem güçlendirme havuzu",
          body: "Tasarruf finansman modelini alımdan çıkarıp mevcut evin güçlendirilmesine ve enerji verimliliğine açmak. Türkiye'de bugün bu amaçla çalışan bir havuz yok.",
          details: [
            {
              key: "Kim için",
              text: "Evi olan ama güçlendirme ya da yalıtım için birikimi yetmeyen aileler, site yönetimleri.",
            },
            {
              key: "Almanya'dan alınan",
              text: "Tadilata özel, uzun vadeli kredi mantığı ve sözleşme boyunca işleyen şeffaf puan.",
            },
            {
              key: "İlk adım",
              text: "Mevcut lisans kapsamının tadilatı ne ölçüde taşıdığını netleştirmek ve bir müteahhit ya da yapı denetim ağıyla pilot kurmak.",
            },
          ],
        },
        {
          tag: "Almanya için",
          first: "Adil fiyatlanan faizsiz konut havuzu",
          body: "Türk modelini Almanya'ya taşırken geç katılımcının kaybını küçülten bir tasarım. Hedef kitle faize hassas ve bugün Bauspar dışında kalan aileler.",
          details: [
            {
              key: "Tasarım",
              text: "Teslim zamanına göre ücret, bekleyen paranın faizsiz getirisinin geç katılımcıyla paylaşılması, kura yerine şeffaf puan.",
            },
            {
              key: "Türkiye'den alınan",
              text: "Hızlı dijital başvuru, sade ürün dili ve faizsiz yapı.",
            },
            {
              key: "İlk adım",
              text: "Hangi lisansla sunulabileceğine dair düzenleyici çalışma ve bir banka kanalıyla dağıtım ortaklığı.",
            },
          ],
        },
      ],
      bridge: {
        tag: "Köprü",
        first:
          "İki ürünün de ortak noktası aynı: iki pazarı ve faizsiz finansı birlikte bilmek.",
        points: [
          "Türkiye'deki bir tasarruf finansman şirketi için tadilat ürünü, yeni ve düzenleyicinin hoş karşılayacağı bir büyüme alanı.",
          "Almanya'daki bir banka ya da Bausparkasse için faizsiz havuz, bugün ulaşamadığı bir kitleye giriş.",
          "Türkiye'deki bir şirketin Almanya'ya açılması için bu rapordaki boşluk, hazır bir başlangıç noktası.",
        ],
      },
    },
    view: {
      head: {
        index: "11",
        label: "Görüşümüz",
        title:
          "Klasik Bauspar büyümeyecek. Büyüme, iki ülkenin modelini birleştirenlerde.",
      },
      paragraphs: [
        "Almanya'da kasalar yeni sözleşme yerine konut kredisi, tadilat finansmanı ve platform hizmetleriyle büyümeye çalışıyor. Taşıt bu modelin dışında. Model başka ülkelere ancak üç koşulla taşınıyor: uzun vadeli güven, sürekli yeni birikim akışı ve istikrarlı düzenleme. Macaristan 2018'de devlet desteğini kaldırınca pazar küçüldü. [22]",
        "Türkiye'deki büyüme yüksek faize bağlı. Faizler düştüğünde talebin nereye gideceği bu pazarın ana sorusu. Tadilat gibi faizden bağımsız bir ihtiyaca bağlanan ürünler bu sorudan daha az etkilenir.",
      ],
      expert: {
        tag: "Uzman notu",
        quote:
          "Türkiye'de evini güçlendirmek isteyen milyonlarca aile var ve bunun için kurulmuş bir havuz yok. Ben burada ciddi bir fırsat görüyorum.",
        body: "Almanya'da iki banka kurdum, Türkiye'de bankacılık ve fintech ürünleri hayata geçirdim. İki pazarı da içeriden biliyorum ve ikisine yakından bakınca aynı şeyi görüyorum: bir ülkenin çözdüğü sorun, diğerinde hâlâ açık duruyor. Bauspar'ın şeffaf puanı Türkiye'nin kura belirsizliğine cevap. Türkiye'nin hızı ve faizsiz modeli de Almanya'da şube dışına çıkamayan bir ürüne.",
        signature: "Mehmet Burak Dikmen, fspark9",
        initials: "MB",
      },
    },
    close: {
      label: "Sonraki adım",
      title: "İki pazar, iki boşluk. İlk ürünü birlikte kuralım.",
      body: "fspark9, Türkiye ve Almanya arasında ürün, partner ve pazara giriş kararlarında bankalar ve fintech'lerle birlikte çalışıyor.",
      bookLabel: "Görüşme ayarla",
      backLabel: "Simülatöre dön",
    },
    sources: {
      head: {
        index: "",
        label: "Kaynaklar",
        title: "Her rakamın geldiği yer.",
      },
      items: [
        {
          label:
            "Deutsche Bundesbank, Bankenstatistiken, Bausparkassen, Eylül 2026",
          href: "https://www.bundesbank.de/resource/blob/807852/d61d66a4bc89c2b1c2b98bee06249e50/472B63F073F071307366337C94F8C870/bf1d00a3-data.pdf",
        },
        {
          label:
            "Deutsche Bundesbank, Bankenstatistiken, Bausparkassen 2019 ile 2023 serisi",
          href: "https://bundesbank.de/resource/blob/807852/8a3ff1fd994269109e158b0c2740d751/472B63F073F071307366337C94F8C870/bf1d00a3-data.pdf",
        },
        {
          label:
            "Verband der Privaten Bausparkassen, Bauspar yeni iş verileri 2024 ve 2025",
        },
        {
          label:
            "Bausparkasse Schwäbisch Hall, 2025 yıl sonu açıklaması, Şubat 2026",
          href: "https://bankinformation.de/geno-meldung/schwaebisch-hall-ergebnis-verdoppelt-marktfuehrerschaft-behauptet/65877/",
        },
        {
          label:
            "Bausparkasse Schwäbisch Hall, Investorenpräsentation, Ağustos 2026",
          href: "https://www.schwaebisch-hall.de/content/dam/dambsh/unternehmen/investor-relations/ir-präsentationen-/2026-08-11%20DEU%20Investorenpraesentation-Bausparkasse-Schwaebisch-Hall-AG%20.pdf",
        },
        {
          label: "DSGV, Bilanzzahlen 2025 der Sparkassen-Finanzgruppe",
        },
        {
          label: "BHW Bausparkasse, Geschäftsbericht 2025",
          href: "https://www.bhw.de/dam/bhwde/pdf/GB2025.pdf",
        },
        {
          label: "Deutsche Bausparkasse Badenia, Geschäftsbericht 2025",
        },
        {
          label:
            "Versicherungsbote, Bausparkassen ürün kalitesi çalışması, 2025",
          href: "https://www.versicherungsbote.de/id/4940394/Diese-Bausparkassen-ueberzeugen-mit-ihrer-Produktqualitaet/",
        },
        {
          label: "W&W, 100 Jahre Wüstenrot Bausparkasse, 2024",
        },
        {
          label:
            "Verband der Privaten Bausparkassen ve Kantar, tasarruf anketi, bahar 2026",
        },
        {
          label: "YouGov Deutschland, Bausparer hedef kitle analizi",
        },
        {
          label: "Wohnungsbau-Prämiengesetz, 2026 koşulları",
        },
        {
          label: "BuVEG, Sanierungsquote 2025",
          href: "https://buveg.de/sanierungsquote/",
        },
        {
          label:
            "WirtschaftsWoche, Bausparkassen ile modernizasyon finansmanı, 2026",
          href: "https://www.wiwo.de/finanzen/immobilien/bausparkassen-guenstig-die-immobilienmodernisierung-finanzieren/100231832.html",
        },
        {
          label: "Bankenfachverband, Kreditbanken 2026 ilk yarı, autohaus.de",
          href: "https://www.autohaus.de/nachrichten/autohandel/kreditbanken-mit-919-000-fahrzeugen-kfz-finanzierung-bleibt-wachstumstreiber-3907405",
        },
        {
          label:
            "Bankenfachverband, kredi ve leasingle finanse edilen özel otomobillerin payı, 2023",
          href: "https://de.statista.com/statistik/daten/studie/1065113/umfrage/anteil-der-per-kredit-oder-leasing-finanzierten-privaten-pkw-in-deutschland/",
        },
        {
          label: "Finansal Kurumlar Birliği verileri, Hürriyet, 2026",
        },
        {
          label: "TCMB verileri, Mart 2026",
        },
        {
          label: "BDDK, tasarruf finansman düzenlemesi, Ağustos 2026",
        },
        {
          label: "ABAC, Consórcio de imóveis 2025",
          href: "https://blog.abac.org.br/drops-de-mercado/consorcio-de-imoveis-mantem-lideranca-em-creditos-contratados",
        },
        {
          label:
            "bne IntelliNews ve 444.hu, Macaristan'da Bauspar desteğinin kaldırılması, Ekim 2018",
        },
      ],
      note: 'Veriler 5 Ekim 2026 itibarıyla kontrol edildi. "Yaklaşık" ve "tahmin" olarak işaretli rakamlar kaynaklardaki verilerden hesaplandı. Bölüm 2\'deki simülatör ve hikayeler varsayımlara dayalı bir modeldir.',
    },
  },
};
