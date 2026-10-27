import type { Locale, SparkEpisodeStory } from "@/types/content";

/**
 * Son Gün Nº 05 · Xinja Bank (hikâye şablonu, kart yerine gün saati).
 * lastdayspark9 skill'inin derleyicisi episode.json'dan üretti; prototip
 * (son-gun-xinja.html) ve metin dosyası aynı kaynaktan geliyor. Elle
 * düzenleme: metin değişecekse episode.json'dan yeniden derlenir.
 * Site bunu Sanity'den okuyor; bu dosya seed-v3'ün kaynağı ve check:drift'in aynası.
 */
export const xinja: Record<Locale, SparkEpisodeStory> = {
  en: {
    number: 5,
    subject: "Xinja Bank",
    hook: "The bank that ran out of savings accounts.",
    seo: {
      title: "Xinja Bank: 100 million in 19 days, gone in 464, 464 days | The Last Day",
      description: "It raised 100 million dollars in 19 days, almost a whole year's target. 464 days after its full banking licence, it stopped being a bank.",
    },
    hero: {
      label: "The Last Day · Nº 05 · Xinja Bank · Australia",
      title: "Everyone wanted to save here.",
      sub: "It raised 100 million dollars in 19 days, almost a whole year's target. 464 days after its full banking licence, it stopped being a bank.",
      invite: "In this story, you sit at the table. At four critical moments the last word is yours. Decide first, then we look at what happened together.",
      startLabel: "Let's begin",
      cardDay: "",
      cardState: "",
      figure: "464",
      figureLabel: "days · full licence to closure",
    },
    dayClock: {
      label: "Day",
      ofLabel: "of 464",
    },
    chapters: [
      {
        id: "ch1",
        label: "Chapter 1 · Before Day 0 · 2017 to 2019",
        title: "Customers become owners",
        lead: "In 2017 former NAB executive Eric Wilson sets out to build Australia's first independent bank that lives only on the phone. He calls it Xinja. It comes from ninja; the team liked Money Ninja but wanted a name starting with X.[1,2]",
        paragraphs: [
          "In January 2018 Xinja becomes the first company in Australia to raise money through retail equity crowdfunding. 500,000 dollars arrive in the first 18 hours. More than 1,200 people buy in at 1.25 dollars a share, and a year later 1,500 more join. All amounts in this story are Australian dollars.[3,4,5]",
          "In March 2018 the first product ships: a prepaid card and an app, which need no banking licence. A credit licence came in February, and Iress was picked to process home loans. In December APRA grants a restricted banking licence. By then there are 22,000 customers.[6,8,9]",
        ],
        card: {
          mode: "live",
          day: "2017",
          state: "Sydney",
          caption: "Before Day 0",
          title: "Customers as owners",
          progress: 0,
          barDay: "Before Day 0",
        },
        decision: {
          label: "It's 2018 · Your call",
          question: "You have a card people love, a waitlist, a credit licence and customers who own a piece of you. The full licence is coming. Which product opens the bank?",
          options: [
            {
              key: "A",
              text: "A savings account with the best rate in the country. Nothing brings people in faster.",
              answer: "Deposits arrive fast and the brand is famous overnight. The cost: every dollar wants interest from day one, and you need somewhere to put it to work.",
            },
            {
              key: "B",
              text: "Home loans through brokers. The bank earns from the very first loan.",
              answer: "Revenue from the start and a ready channel. The hard part: home loans need capital, a risk team and a lot of patience before the first approval.",
            },
            {
              key: "C",
              text: "An everyday account where salaries land. Slower, but it becomes the main bank.",
              answer: "The strongest base a bank can have. It grows slowly and rarely makes headlines.",
            },
          ],
          didLabel: "What Xinja did",
          title: "C first, then A right after. B was left for later.",
          body: [
            "It opened everyday accounts in September 2019, and the savings account came four months later. Lending was planned for the first quarter of 2020.[11]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch2",
        label: "Chapter 2 · Bonus · 2018 to 2020",
        title: "The idea book",
        lead: "Remembering Xinja only for its interest rate would be unfair. The team kept trying new things in banking, and it shipped a good number of them.",
        paragraphs: [
          "A card that glows in the dark. Wilson first thought it was a gimmick. The idea came from women customers who kept grabbing the wrong card from a dark bag at night. Shipped.[7]",
          "A box that sticks its tongue out. The debit card arrives sticking out of a Xinja character's mouth, with stickers, coasters and sticky notes for setting savings goals. Shipped.[12]",
          "Xinja.Me. You share a link and a friend tops up your card instantly; splitting a bill works from the same place. Shipped.[13]",
          "No credit cards. Banks only make money on them, Wilson said, when customers make poor decisions. Promise kept: Xinja never issued one.[11]",
          "A home loan rate made for you. A rate worked out from your own data instead of one rate for everyone, and loyal customers would never end up paying more. Stayed on paper, because lending never opened.[15]",
          "A marketplace inside the app. Other companies' products were going to be sold through Xinja. Also stayed on paper.[14]",
        ],
        card: {
          mode: "live",
          day: "Bonus",
          state: "The idea book",
          caption: "Bonus",
          title: "The idea book",
          progress: 0,
          barDay: "Bonus",
        },
      },
      {
        id: "ch3",
        label: "Chapter 3 · Day 000 · 9 September 2019",
        title: "A real bank",
        lead: "APRA grants Xinja a full banking licence, without restrictions. The same day, everyday accounts open for the first customers.[10,11]",
        paragraphs: [
          "28,000 people have signed up, 12,000 prepaid cards are out and there are around 65 permanent staff. The plan is on the record: a savings account called Stash first, lending in the first quarter of 2020.[11]",
        ],
        card: {
          mode: "live",
          day: "000",
          state: "9 September 2019",
          caption: "Day 0",
          title: "A real bank",
          progress: 0,
        },
      },
      {
        id: "ch4",
        label: "Chapter 4 · Day 128 · 15 January 2020",
        title: "Stash",
        lead: "Stash goes live. 2.25 percent on every dollar up to 245,000. No conditions, no intro period, no minimum. The big banks are cutting their rates at the same time.[17]",
        paragraphs: [
          "30 million dollars arrive in seven days, 100 million in 19. In Wilson's own words, the plan was about 120 million for the whole year.[18,19]",
          "More than half the money comes from the big four banks. The average Stash holds 11,500 dollars.[17]",
        ],
        card: {
          mode: "flipped",
          day: "128",
          state: "15 January 2020",
          caption: "Stash goes live",
          title: "Stash",
          progress: 27.59,
        },
        decision: {
          label: "Day 147 · Your call",
          question: "Money is arriving six times faster than planned. Every dollar costs you 2.25 percent, and lending isn't there yet. What do you do this week?",
          options: [
            {
              key: "A",
              text: "Keep the door open. A moment like this doesn't come twice; lending will catch up.",
              answer: "You win the whole market's attention. But the bill grows every day, and faster if rates move.",
            },
            {
              key: "B",
              text: "Lower the rate for newcomers, keep 2.25 for those already in.",
              answer: "Growth slows, early customers stay happy. Two prices for one product is a story you have to tell well.",
            },
            {
              key: "C",
              text: "Put a ceiling on it. A limit on new accounts or balances until lending opens.",
              answer: "Cost stays under control and you grow at the speed of lending. The price: saying no to people who want to bank with you.",
            },
          ],
          didLabel: "What happened",
          title: "The door stayed open for seven weeks.",
          body: [
            "Stash collected around 400 million dollars in eight weeks. Then March came, and the market made the call.[20]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch5",
        label: "Chapter 5 · Day 178 to 197",
        title: "Like toilet paper",
        lead: "On 3 March 2020 the Reserve Bank cuts the cash rate to 0.50 percent. Two days later Xinja keeps Stash at 2.25 for existing customers and stops opening new Stash accounts.[21,22]",
        paragraphs: [
          "Wilson explains it on the blog with the pandemic's empty shelves: just as the supermarkets ran out of toilet paper, Xinja has run out of Stash accounts. No new accounts, no new cost. On 19 March the rate drops to 0.25 percent.[21,23]",
          "On 24 March comes the big news: Dubai's World Investments will invest 433 million dollars over two years, 160 million of it right away once approvals arrive. Lending will open within the year.[20]",
        ],
        card: {
          mode: "flipped",
          day: "178",
          state: "5 March 2020",
          caption: "The pause button",
          title: "The pause button",
          progress: 38.36,
        },
      },
      {
        id: "ch6",
        label: "Chapter 6 · Day 245 to 316",
        title: "Shares before loans",
        lead: "On 11 May Stash drops to 1.8 percent. Xinja tells customers it was probably the only bank still paying 2.25 after two cuts, but a variable rate can't hold that forever.[24]",
        paragraphs: [
          "By May there are more than 47,000 accounts and over 500 million in deposits. Still no lending.[25]",
          "On 21 July a new product is announced: Dabble. US shares inside the app, 8 dollars a month for unlimited trades, slices of a share from 1 dollar. It is due at the end of August. In September it is ready and waiting for APRA to sign off.[26,27]",
        ],
        card: {
          mode: "flipped",
          day: "245",
          state: "11 May 2020",
          caption: "The second product",
          title: "Second product",
          progress: 52.8,
        },
        decision: {
          label: "Your call",
          question: "Deposits cost you every day, lending isn't ready, and the team has a second product almost built. What gets the next three months?",
          options: [
            {
              key: "A",
              text: "Lending. The smallest version first, staff and friends, then everyone.",
              answer: "This is the product the deposits are waiting for. It needs capital and the regulator's approval, and the first loans are small.",
            },
            {
              key: "B",
              text: "Dabble. Fee income, and a reason to open the app every day.",
              answer: "A new line of income and a fresh story. But trading fees can't cover an interest bill this size for long.",
            },
            {
              key: "C",
              text: "Neither. Cut costs and make the live products pay their way.",
              answer: "The calmest path. The price: no new reason for customers to stay.",
            },
          ],
          didLabel: "What happened",
          title: "B was built first, A came last.",
          body: [
            "Dabble still hadn't launched by mid November. The lending pilot with staff started at the end of October.[28,31]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch7",
        label: "Chapter 7 · Day 421 · 3 November 2020",
        title: "The auditor's note",
        lead: "The accounts for the year to June are out. 55 million was raised that year, yet the loss is 36 million dollars, leaving about 25 million in net assets. The auditor, PwC, writes that Xinja is highly dependent on new capital and that there is material uncertainty about whether it can continue.[28,29]",
        paragraphs: [
          "Wilson says the Dubai investor was hit hard by COVID and its checks were delayed; four Xinja staff are in Dubai working on it. Lending is now live in production, with staff testing it.[28]",
          "On 23 November the interest cap on Stash drops from 150,000 to 50,000 dollars, and the rate is already 1.5 percent. The money from Dubai never arrives before the end.[30,32]",
        ],
        card: {
          mode: "flipped",
          day: "421",
          state: "3 November 2020",
          caption: "The auditor's note",
          title: "Auditor's note",
          progress: 90.73,
        },
      },
      {
        id: "ch8",
        label: "Chapter 8 · Day 464 · 16 December 2020",
        title: "Stopping being a bank",
        lead: "Wednesday morning. Xinja announces it will close the bank account, Stash and every service around them, and hand back its licence. In its own words, it is effectively stopping being a bank.[33]",
        paragraphs: [
          "The reason given: a year marked by COVID and an ever harder environment for raising capital. Wilson thanks customers for opening an account in the first place and says he is gutted not to carry on.[33,25]",
          "The dates are clear. Stash stopped earning interest on 14 December and closes on 23 December. Empty accounts close from 30 December, and the cards stop on 15 January.[33]",
        ],
        card: {
          mode: "closed",
          day: "464",
          state: "Last day",
          caption: "16 December 2020",
          title: "The decision",
          progress: 100,
        },
        decision: {
          label: "Your call",
          question: "The decision is made. Around 38,000 people keep savings and everyday money here, and Stash closes in a week. What do you give them?",
          options: [
            {
              key: "A",
              text: "A clear calendar. Exact dates, regular reminders, everyone moves their own money.",
              answer: "Simple and honest. But the work stays with the customer, and someone always misses an email.",
            },
            {
              key: "B",
              text: "A ready new home. A partner bank opens accounts and moves balances for whoever wants it.",
              answer: "The easiest road for the customer. Setting it up with another bank in a few weeks is hard work.",
            },
            {
              key: "C",
              text: "A reason to stay. Keep the app alive with Dabble, so the relationship doesn't end with the account.",
              answer: "The brand outlives the bank. But a product that hasn't launched is a thin bridge.",
            },
          ],
          didLabel: "What Xinja did",
          title: "A, with a small B at the very end.",
          body: [
            "By 19 January 2021, 99.97 percent of 252 million dollars was back with 37,884 customers. For the last 65,000 dollars nobody had claimed, an account was opened for each customer at NAB.[34]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "left",
        label: "Last day · 16 December 2020",
        title: "What was left",
        lead: "Xinja stopped being a bank, and three things were left.",
        paragraphs: [],
        card: {
          mode: "closed",
          day: "464",
          state: "Last day",
          caption: "16 December 2020",
          title: "What was left",
          progress: 100,
        },
      },
    ],
    lessons: [
      {
        heading: "The money went home.",
        body: "Five weeks after the announcement almost every dollar was back with its owner; the rest waits at NAB.",
      },
      {
        heading: "The company stayed, the bank didn't.",
        body: "Xinja said it would carry on as a fintech and focus on Dabble.",
      },
      {
        heading: "The crowd owners.",
        body: "More than 2,700 people bought shares in the two crowdfunding rounds. Their shares now sit in a company that is no longer a bank.",
      },
    ],
    note: {
      label: "fspark9 note",
      paragraphs: [
        "Looking at Xinja, one question stays with us: when people queued up to bring their money in, was it clear where that money would go to work?",
        "Banking rests on something old and simple. You gather money at a fair cost, lend it to the right people, and the gap between the two keeps you alive. Xinja did the first half better than anyone. The second half never came. Without a balance between deposits and loans, every new dollar made the bill bigger. The spell of fast growth hid that for a while; 100 million in 19 days looked like a win.",
        "Looking from the outside is always easier. What came out later also suggests the problems were not only on the strategy table; we won't go into those here. But this story throws a hard truth in our faces: however loved the app is, a bank only lives as long as it can put the money it gathers to work in the right place.",
      ],
    },
    lastDay: {
      label: "Last day · 16 December 2020",
      text: "Wednesday. The app still opens, the glowing cards still work. Stash has stopped earning. But now everyone knows. The clock stops at 464.",
    },
    finalQuestion: {
      label: "One last question",
      title: "It's September 2019 and the full licence is in your hand. What's your plan for the first year?",
      lead: "28,000 people are waiting, the bank runs in the cloud and you hold a credit licence.",
      ctaLabel: "Book a call",
      options: [
        {
          text: "Lending first. Open home loans through brokers and let deposits grow only as fast as loans.",
          service: "zero-to-live",
          serviceName: "Zero to Live",
          heading: "From licence to a bank that earns.",
          body: "If you are about to launch a bank or a new financial product, Zero to Live and Product & Strategy are built for exactly that. Together we decide which product pays the bills and in what order the rest arrives, and we stay with you until it is live.",
        },
        {
          text: "Deposits with a ceiling. A good rate, but only as much money as lending can use.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Which product comes first, written down.",
          body: "If you are about to launch a bank or a new financial product, Zero to Live and Product & Strategy are built for exactly that. Together we decide which product pays the bills and in what order the rest arrives, and we stay with you until it is live.",
        },
        {
          text: "Everyday banking first. Win the salary account, add savings and loans step by step.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Which product comes first, written down.",
          body: "If you are about to launch a bank or a new financial product, Zero to Live and Product & Strategy are built for exactly that. Together we decide which product pays the bills and in what order the rest arrives, and we stay with you until it is live.",
        },
        {
          text: "Deposits first, and fast. The best rate in the country, lending follows.",
          service: "zero-to-live",
          serviceName: "Zero to Live",
          heading: "From licence to a bank that earns.",
          body: "If you are about to launch a bank or a new financial product, Zero to Live and Product & Strategy are built for exactly that. Together we decide which product pays the bills and in what order the rest arrives, and we stay with you until it is live.",
        },
      ],
    },
    sourcesLabel: "This story is built from public sources",
    sources: [
      {
        n: 1,
        links: [
          {
            label: "FinTech Futures, Xinja drops ninja mode, 2017",
            href: "https://www.fintechfutures.com/digital-banking/xinja-drops-ninja-mode-to-reveal-new-mobile-only-bank",
          },
        ],
      },
      {
        n: 2,
        links: [
          {
            label: "FinTech Futures, interview with Eric Wilson, May 2018",
            href: "https://www.fintechfutures.com/2018/05/interview-eric-wilson-xinja-upbeat-down-under/",
          },
        ],
      },
      {
        n: 3,
        links: [
          {
            label: "SmartCompany, first equity crowdfunding raises 500,000 in 18 hours, 16 January 2018",
            href: "https://www.smartcompany.com.au/startupsmart/news/first-equity-crowdfunding-campaign-raises-500000-18-hours-digital-banking-startup-xinja/",
          },
        ],
      },
      {
        n: 4,
        links: [
          {
            label: "Equitise, Xinja crowdfund case study",
            href: "https://equitise.com/blog/successful-case-study-xinja",
          },
        ],
      },
      {
        n: 5,
        links: [
          {
            label: "Retail Banker International, Xinja capital raise, March 2020",
            href: "https://www.retailbankerinternational.com/news/xinja-capital-raise/",
          },
        ],
      },
      {
        n: 6,
        links: [
          {
            label: "Canstar, Xinja launches its prepaid card, 20 March 2018",
            href: "https://www.canstar.com.au/online-banking/digital-bank-xinja-launches-first-prepaid-travel-spending-card/",
          },
        ],
      },
      {
        n: 7,
        links: [
          {
            label: "Tier One People, interview with Eric Wilson, June 2018",
            href: "https://tieronepeople.com/2018/06/11/eric-wilson-xinja/",
          },
        ],
      },
      {
        n: 8,
        links: [
          {
            label: "FinTech Futures, Xinja still tapping Iress for home loans, 28 August 2018",
            href: "https://www.fintechfutures.com/lendtech/xinja-still-tapping-iress-for-home-loans",
          },
        ],
      },
      {
        n: 9,
        links: [
          {
            label: "FinTech Futures, Xinja gets a restricted licence, December 2018",
            href: "https://www.fintechfutures.com/2018/12/xinja-grows-up-to-be-a-bank-with-apra-licence/",
          },
        ],
      },
      {
        n: 10,
        links: [
          {
            label: "APRA, licence granted to Xinja Bank, 9 September 2019",
            href: "https://www.apra.gov.au/news-and-publications/apra-grants-new-authorised-deposit-taking-institution-licence-to-xinja-bank",
          },
        ],
      },
      {
        n: 11,
        links: [
          {
            label: "Startup Daily, Xinja launches app accounts, September 2019",
            href: "https://www.startupdaily.net/topic/new-digital-banks-xinja-and-86-400-are-launching-retail-app-accounts/",
          },
        ],
      },
      {
        n: 12,
        links: [
          {
            label: "Good Design Australia, Xinja debit card and welcome pack",
            href: "https://good-design.org/projects/xinja-debit-card-welcome-pack/",
          },
        ],
      },
      {
        n: 13,
        links: [
          {
            label: "Travel with Bender, Xinja card review",
            href: "https://travelwithbender.com/product-reviews/xinja-review-australian-prepaid-travel-card",
          },
        ],
      },
      {
        n: 14,
        links: [
          {
            label: "FinTech Futures, Xinja launches card and app, 2018",
            href: "https://www.fintechfutures.com/challenger-banks/australian-neobank-xinja-launches-card-and-app",
          },
        ],
      },
      {
        n: 15,
        links: [
          {
            label: "The Adviser, new bank outlines support of broker channel, September 2019",
            href: "https://www.theadviser.com.au/broker/39523-neolender-granted-full-banking-licence",
          },
        ],
      },
      {
        n: 16,
        links: [
          {
            label: "Xinja, submission to the Senate Select Committee on Financial Technology, 2019",
            href: "https://www.aph.gov.au/DocumentStore.ashx?id=6fd0fe7b-f457-4c09-8a1d-b1fc58292d1c&subId=676896",
          },
        ],
      },
      {
        n: 17,
        links: [
          {
            label: "Australian Fintech, Xinja release on 100 million in deposits, February 2020",
            href: "https://australianfintech.com.au/big-four-bank-customers-flock-to-xinja-deposits-exceed-100m/",
          },
        ],
      },
      {
        n: 18,
        links: [
          {
            label: "Retail Banker International, 30 million in the first 7 days, January 2020",
            href: "https://www.retailbankerinternational.com/news/xinja-bank-exceeds-30m-savings-account/",
          },
        ],
      },
      {
        n: 19,
        links: [
          {
            label: "FinTech Futures, 100 million in deposits after 19 days, February 2020",
            href: "https://www.fintechfutures.com/2020/02/aussie-neobank-xinja-hits-100m-in-deposits-after-19-days/",
          },
        ],
      },
      {
        n: 20,
        links: [
          {
            label: "Startup Daily, 433 million from World Investments, March 2020",
            href: "https://www.startupdaily.net/topic/neobank-xinja-lands-a-whopping-433-million-from-emirati-investors/",
          },
        ],
      },
      {
        n: 21,
        links: [
          {
            label: "Xinja blog, why we paused new Stash accounts, 5 March 2020",
            href: "https://xinja.com.au/news/2020/why-we-paused-new-stash-accounts/",
          },
        ],
      },
      {
        n: 22,
        links: [
          {
            label: "Broker Daily, Xinja suspends uptake of savings product, 9 March 2020",
            href: "https://www.brokerdaily.au/lender/14321-xinja-suspends-uptake-of-savings-product",
          },
        ],
      },
      {
        n: 23,
        links: [
          {
            label: "FinTech Futures, Xinja and its interest rates, December 2020",
            href: "https://www.fintechfutures.com/challenger-banks/aussie-neobank-xinja-crumbles-under-unfeasible-interest-rates",
          },
        ],
      },
      {
        n: 24,
        links: [
          {
            label: "Savings.com.au, Stash rate cut to 1.80%, 7 May 2020",
            href: "https://www.savings.com.au/news/neobank-xinja-drops-stash-savings-account-rate-to-1-8",
          },
        ],
      },
      {
        n: 25,
        links: [
          {
            label: "Reuters via Nasdaq, Xinja to give up banking licence, 16 December 2020",
            href: "https://www.nasdaq.com/articles/australias-xinja-bank-to-give-up-banking-license-return-deposits-2020-12-15",
          },
        ],
      },
      {
        n: 26,
        links: [
          {
            label: "Savings.com.au, Dabble announced, 21 July 2020",
            href: "https://www.savings.com.au/news/xinja-to-expand-product-suite-with-us-share-trading",
          },
        ],
      },
      {
        n: 27,
        links: [
          {
            label: "Banking Day, Xinja waits on APRA for Dabble, September 2020",
            href: "https://www.bankingday.com/xinja-waits-on-apra-for-dabble",
          },
        ],
      },
      {
        n: 28,
        links: [
          {
            label: "Crowdfund Insider, Xinja's auditor and the Dubai investment, 3 November 2020",
            href: "https://www.crowdfundinsider.com/2020/11/168715-australian-neobank-xinja-is-working-on-finalizing-433-million-investment-deal-from-dubais-world-investment-group/",
          },
        ],
      },
      {
        n: 29,
        links: [
          {
            label: "Startup Daily, Xinja is shutting down, December 2020",
            href: "https://www.startupdaily.net/topic/fintech/neobank-xinja-is-shutting-down/",
          },
        ],
      },
      {
        n: 30,
        links: [
          {
            label: "Savings.com.au, interest cap cut to 50,000, 16 November 2020",
            href: "https://www.savings.com.au/news/xinja-to-limit-its-maximum-interest-rate-to-50000",
          },
        ],
      },
      {
        n: 31,
        links: [
          {
            label: "ACS Information Age, Xinja winds up operations, December 2020",
            href: "https://ia.acs.org.au/article/2020/neobank-xinja-winds-up-operations.html",
          },
        ],
      },
      {
        n: 32,
        links: [
          {
            label: "Kapronasia, Xinja reaches the end of the line, December 2020",
            href: "https://kapronasia.com/insight/blogs/banking-research/asia-banking-research/xinja-reaches-the-end-of-the-line",
          },
        ],
      },
      {
        n: 33,
        links: [
          {
            label: "Savings.com.au, Xinja to hand back its licence, 16 December 2020",
            href: "https://www.savings.com.au/news/xinja-to-no-longer-offer-savings-and-transaction-accounts",
          },
        ],
      },
      {
        n: 34,
        links: [
          {
            label: "Savings.com.au, all customer deposits returned, 19 January 2021",
            href: "https://www.savings.com.au/news/xinja-says-farewell-as-all-customer-deposits-returned",
          },
        ],
      },
    ],
    correctionLine: "If you spot a mistake, write to info@fspark9.com and we will correct it with a note.",
    closeHeading: "If your story is just beginning, let's build it together.",
  },
  tr: {
    number: 5,
    subject: "Xinja Bank",
    hook: "Tasarruf hesabı tükenen banka.",
    seo: {
      title: "Xinja Bank: 19 günde 100 milyon, 464 günde son, 464 gün | Son Gün",
      description: "19 günde 100 milyon dolar topladı, bir yıllık hedefin neredeyse tamamı. Tam banka lisansından 464 gün sonra banka olmayı bıraktı.",
    },
    hero: {
      label: "Son Gün · Nº 05 · Xinja Bank · Avustralya",
      title: "Herkes parasını buraya koymak istedi.",
      sub: "19 günde 100 milyon dolar topladı, bir yıllık hedefin neredeyse tamamı. Tam banka lisansından 464 gün sonra banka olmayı bıraktı.",
      invite: "Bu hikâyede masada siz oturuyorsunuz. Dört kritik anda son söz sizde. Önce siz karar verin, sonra ne olduğuna birlikte bakalım.",
      startLabel: "Başlayalım",
      cardDay: "",
      cardState: "",
      figure: "464",
      figureLabel: "gün · tam lisanstan kapanışa",
    },
    dayClock: {
      label: "Gün",
      ofLabel: "464 içinden",
    },
    chapters: [
      {
        id: "ch1",
        label: "Bölüm 1 · Gün 0'dan önce · 2017 ile 2019",
        title: "Müşteriler ortak oluyor",
        lead: "2017'de eski NAB yöneticisi Eric Wilson, Avustralya'nın sadece telefonda yaşayan ilk bağımsız bankasını kurmaya giriyor. Adı Xinja. Ninjadan geliyor; ekip Money Ninja'yı sevmiş ama X ile başlayan bir isim istemiş.[1,2]",
        paragraphs: [
          "Ocak 2018'de Xinja, Avustralya'da halka açık kitle fonlamasıyla para toplayan ilk şirket oluyor. İlk 18 saatte 500 bin dolar geliyor. 1.200'ü aşkın kişi hisse başına 1,25 dolardan ortak oluyor, bir yıl sonra 1.500 kişi daha geliyor. Bu hikâyedeki bütün tutarlar Avustralya doları.[3,4,5]",
          "Mart 2018'de ilk ürün çıkıyor: banka lisansı gerektirmeyen bir ön ödemeli kart ve uygulama. Kredi lisansı da Şubat'ta alınmış, konut kredileri için Iress seçilmiş. Aralık'ta APRA kısıtlı banka lisansını veriyor. O gün 22 bin müşteri var.[6,8,9]",
        ],
        card: {
          mode: "live",
          day: "2017",
          state: "Sidney",
          caption: "Gün 0'dan önce",
          title: "Müşteriler ortak",
          progress: 0,
          barDay: "Gün 0'dan önce",
        },
        decision: {
          label: "Yıl 2018 · Masa sizin",
          question: "Sevilen bir kartınız, bir bekleme listeniz, bir kredi lisansınız ve size ortak olmuş müşterileriniz var. Tam lisans yolda. Bankayı hangi ürünle açarsınız?",
          options: [
            {
              key: "A",
              text: "Ülkenin en iyi faizini veren tasarruf hesabıyla. İnsanları hiçbir şey bu kadar hızlı getirmez.",
              answer: "Mevduat hızla gelir, marka bir gecede tanınır. Bedeli şu: her dolar ilk günden faiz ister ve onu çalıştıracak bir yer bulmanız gerekir.",
            },
            {
              key: "B",
              text: "Aracılar üzerinden konut kredisiyle. Banka ilk krediden itibaren kazanır.",
              answer: "Baştan gelir, hazır bir kanal. Zor tarafı, konut kredisi ilk onaydan önce sermaye, risk ekibi ve epey sabır ister.",
            },
            {
              key: "C",
              text: "Maaşın yattığı günlük hesapla. Daha yavaş, ama ana banka olur.",
              answer: "Bir bankanın sahip olabileceği en sağlam temel. Yavaş büyür, pek manşete çıkmaz.",
            },
          ],
          didLabel: "Xinja ne yaptı",
          title: "Önce C, hemen ardından A. B sonraya kaldı.",
          body: [
            "Eylül 2019'da günlük hesabı açtı, tasarruf hesabı dört ay sonra geldi. Kredi 2020'nin ilk çeyreğine planlandı.[11]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch2",
        label: "Bölüm 2 · Bonus · 2018 ile 2020",
        title: "Fikir defteri",
        lead: "Xinja'yı sadece faiziyle hatırlamak haksızlık olur. Ekip bankacılığa yeni şeyler getirmeye çalışıyordu ve fikirlerin bir kısmını gerçekten hayata geçirdi.",
        paragraphs: [
          "Karanlıkta parlayan kart. Wilson önce bunu bir numara sanmış. Fikir, gece çantada doğru kartı bulamayan kadın müşterilerden gelmiş. Hayata geçti.[7]",
          "Dil çıkaran kutu. Banka kartı, bir Xinja karakterinin ağzından dil gibi uzanarak geliyor. Yanında çıkartmalar, bardak altlıkları ve birikim hedefi koymak için yapışkan notlar. Hayata geçti.[12]",
          "Xinja.Me. Bir link paylaşıyorsunuz, arkadaşınız kartınıza anında para yüklüyor; hesabı bölüşmek de aynı yerden. Hayata geçti.[13]",
          "Kredi kartı yok. Wilson'a göre bankalar kredi kartından ancak müşteri kötü karar verdiğinde para kazanıyor. Söz tutuldu, Xinja hiç kredi kartı çıkarmadı.[11]",
          "Size özel konut kredisi faizi. Herkese aynı oran yerine verinize bakıp sizin için hesaplanan bir oran; sadık müşteri zamanla daha kötü fiyat almayacak. Kâğıtta kaldı, çünkü kredi hiç açılmadı.[15]",
          "Uygulamanın içinde bir pazar yeri. Başka şirketlerin ürünleri Xinja'nın içinden satılacaktı. Bu da kâğıtta kaldı.[14]",
        ],
        card: {
          mode: "live",
          day: "Bonus",
          state: "Fikir defteri",
          caption: "Bonus",
          title: "Fikir defteri",
          progress: 0,
          barDay: "Bonus",
        },
      },
      {
        id: "ch3",
        label: "Bölüm 3 · Gün 000 · 9 Eylül 2019",
        title: "Gerçek bir banka",
        lead: "APRA, Xinja'ya kısıtsız tam banka lisansı veriyor. Aynı gün ilk müşterilere günlük hesaplar açılıyor.[10,11]",
        paragraphs: [
          "28 bin kişi kayıtlı, 12 bin ön ödemeli kart dağıtılmış, 65 civarında kadrolu çalışan var. Plan kayıtta: önce Stash adlı tasarruf hesabı, 2020'nin ilk çeyreğinde de kredi.[11]",
        ],
        card: {
          mode: "live",
          day: "000",
          state: "9 Eylül 2019",
          caption: "Gün 0",
          title: "Gerçek bir banka",
          progress: 0,
        },
      },
      {
        id: "ch4",
        label: "Bölüm 4 · Gün 128 · 15 Ocak 2020",
        title: "Stash",
        lead: "Stash yayında. 245 bin dolara kadar her dolara yüzde 2,25. Şart yok, tanıtım dönemi yok, asgari tutar yok. Büyük bankalar o sırada faiz indiriyor.[17]",
        paragraphs: [
          "Yedi günde 30 milyon dolar geliyor, 19 günde 100 milyon. Wilson'ın kendi sözüyle plan, bütün bir yılda 120 milyon civarıydı.[18,19]",
          "Paranın yarısından fazlası dört büyük bankadan geliyor. Ortalama Stash hesabında 11.500 dolar duruyor.[17]",
        ],
        card: {
          mode: "flipped",
          day: "128",
          state: "15 Ocak 2020",
          caption: "Stash yayında",
          title: "Stash",
          progress: 27.59,
        },
        decision: {
          label: "Gün 147 · Masa sizin",
          question: "Para plandan altı kat hızlı geliyor. Her dolar size yüzde 2,25'e mal oluyor ve kredi henüz yok. Bu hafta ne yaparsınız?",
          options: [
            {
              key: "A",
              text: "Kapıyı açık tutarım. Böyle bir an iki kez gelmez, kredi arkadan yetişir.",
              answer: "Bütün pazarın ilgisini kazanırsınız. Ama fatura her gün büyür, faizler oynarsa daha da hızlı.",
            },
            {
              key: "B",
              text: "Yeni gelene faizi düşürürüm, içeridekiler 2,25'te kalır.",
              answer: "Büyüme yavaşlar, ilk müşteriler memnun kalır. Aynı ürüne iki fiyatı ise iyi anlatmanız gerekir.",
            },
            {
              key: "C",
              text: "Bir tavan koyarım. Kredi açılana kadar yeni hesaplara ya da bakiyelere sınır.",
              answer: "Maliyet kontrolde kalır, krediyle aynı hızda büyürsünüz. Bedeli, sizinle çalışmak isteyenlere hayır demek.",
            },
          ],
          didLabel: "Ne oldu",
          title: "Kapı yedi hafta açık kaldı.",
          body: [
            "Stash sekiz haftada 400 milyon dolar civarında para topladı. Sonra Mart geldi ve kararı piyasa verdi.[20]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch5",
        label: "Bölüm 5 · Gün 178 ile 197",
        title: "Tuvalet kâğıdı gibi",
        lead: "3 Mart 2020'de merkez bankası faizi yüzde 0,50'ye indiriyor. İki gün sonra Xinja, mevcut müşteriler için Stash'i 2,25'te tutuyor ve yeni Stash hesabı açmayı durduruyor.[21,22]",
        paragraphs: [
          "Wilson bunu blogda pandeminin boş raflarıyla anlatıyor: marketlerde tuvalet kâğıdı bittiği gibi Xinja'da da Stash hesabı bitti. Yeni hesap yoksa yeni maliyet de yok. 19 Mart'ta faiz yüzde 0,25'e iniyor.[21,23]",
          "24 Mart'ta büyük haber: Dubai merkezli World Investments, iki yılda 433 milyon dolar yatıracak. 160 milyonu onaylar gelince hemen. Krediler yıl içinde açılacak.[20]",
        ],
        card: {
          mode: "flipped",
          day: "178",
          state: "5 Mart 2020",
          caption: "Duraklat düğmesi",
          title: "Duraklat düğmesi",
          progress: 38.36,
        },
      },
      {
        id: "ch6",
        label: "Bölüm 6 · Gün 245 ile 316",
        title: "Önce hisse geldi",
        lead: "11 Mayıs'ta Stash yüzde 1,8'e iniyor. Xinja müşterilere, iki indirime rağmen 2,25 ödeyen muhtemelen tek banka olduğunu ama değişken faizin bunu sonsuza kadar taşıyamayacağını yazıyor.[24]",
        paragraphs: [
          "Mayıs'ta 47 binden fazla hesap ve 500 milyonu aşan mevduat var. Kredi hâlâ yok.[25]",
          "21 Temmuz'da yeni ürün duyuruluyor: Dabble. Uygulamanın içinde ABD hisseleri, ayda 8 dolara sınırsız işlem, 1 dolarlık hisse dilimleri. Ağustos sonunda açılacak. Eylül'de ürün hazır, APRA onayını bekliyor.[26,27]",
        ],
        card: {
          mode: "flipped",
          day: "245",
          state: "11 Mayıs 2020",
          caption: "İkinci ürün",
          title: "İkinci ürün",
          progress: 52.8,
        },
        decision: {
          label: "Masa sizin",
          question: "Mevduat size her gün para kaybettiriyor, kredi daha yok, ekibin elinde neredeyse bitmiş ikinci bir ürün var. Önümüzdeki üç ay neye gider?",
          options: [
            {
              key: "A",
              text: "Krediye. Önce en küçük hali, çalışanlar ve dostlar, sonra herkes.",
              answer: "Mevduatın beklediği ürün bu. Sermaye ve regülatör onayı ister, ilk krediler küçük olur.",
            },
            {
              key: "B",
              text: "Dabble'a. Ücret geliri ve uygulamayı her gün açmak için bir sebep.",
              answer: "Yeni bir gelir kalemi, taze bir hikâye. Ama işlem ücretleri bu büyüklükte bir faiz faturasını uzun süre karşılayamaz.",
            },
            {
              key: "C",
              text: "Hiçbirine. Maliyeti keserim, yayındaki ürünleri kendini döndürür hale getiririm.",
              answer: "En sakin yol. Bedeli, müşterinin kalması için yeni bir sebep olmaması.",
            },
          ],
          didLabel: "Ne oldu",
          title: "Önce B kuruldu, A en sona kaldı.",
          body: [
            "Dabble Kasım ortasında hâlâ açılmamıştı. Çalışanlarla kredi pilotu Ekim sonunda başladı.[28,31]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch7",
        label: "Bölüm 7 · Gün 421 · 3 Kasım 2020",
        title: "Denetçinin notu",
        lead: "Haziran'da biten yılın hesapları çıkıyor. Aynı yıl 55 milyon toplanmış, ama zarar 36 milyon dolar. Geriye 25 milyon civarında net varlık kalmış. Denetçi PwC, Xinja'nın yeni sermayeye büyük ölçüde bağlı olduğunu ve devam edip edemeyeceği konusunda ciddi bir belirsizlik olduğunu yazıyor.[28,29]",
        paragraphs: [
          "Wilson'a göre Dubai'deki yatırımcı COVID'den çok etkilenmiş, inceleme gecikmiş; dört Xinja çalışanı bunun için Dubai'de. Kredi artık canlı ortamda, çalışanlar test ediyor.[28]",
          "23 Kasım'da Stash'te faiz işleyen tavan 150 binden 50 bine iniyor, faiz zaten yüzde 1,5. Dubai'den beklenen para ise kapanışa kadar gelmiyor.[30,32]",
        ],
        card: {
          mode: "flipped",
          day: "421",
          state: "3 Kasım 2020",
          caption: "Denetçinin notu",
          title: "Denetçinin notu",
          progress: 90.73,
        },
      },
      {
        id: "ch8",
        label: "Bölüm 8 · Gün 464 · 16 Aralık 2020",
        title: "Banka olmayı bırakmak",
        lead: "Çarşamba sabahı. Xinja banka hesabını, Stash'i ve bağlı bütün hizmetleri kapatacağını, lisansını iade edeceğini duyuruyor. Kendi ifadesiyle, fiilen banka olmayı bırakıyor.[33]",
        paragraphs: [
          "Gerekçe: COVID'le geçen bir yıl ve giderek zorlaşan sermaye ortamı. Wilson müşterilere hesap açtıkları için teşekkür ediyor, devam edemediği için çok üzgün olduğunu söylüyor.[33,25]",
          "Takvim net. Stash 14 Aralık'ta faiz işletmeyi bırakmış, 23 Aralık'ta kapanıyor. 30 Aralık'tan itibaren boş hesaplar kapanıyor, 15 Ocak'ta kartlar duruyor.[33]",
        ],
        card: {
          mode: "closed",
          day: "464",
          state: "Son gün",
          caption: "16 Aralık 2020",
          title: "Karar",
          progress: 100,
        },
        decision: {
          label: "Masa sizin",
          question: "Karar verildi. Yaklaşık 38 bin kişinin birikimi ve günlük parası burada, Stash bir hafta sonra kapanıyor. Onlara ne sunarsınız?",
          options: [
            {
              key: "A",
              text: "Net bir takvim. Kesin tarihler, düzenli hatırlatmalar, herkes parasını kendisi taşır.",
              answer: "Sade ve dürüst. Ama iş müşteride kalır, bazıları her zaman bir maili kaçırır.",
            },
            {
              key: "B",
              text: "Hazır bir yeni ev. Bir partner banka isteyene hesap açar, bakiyeyi taşır.",
              answer: "Müşteri için en kolay yol. Bunu birkaç haftada başka bir bankayla kurmak zahmetli.",
            },
            {
              key: "C",
              text: "Kalmak için bir sebep. Uygulamayı Dabble ile yaşatırım, ilişki hesapla birlikte bitmez.",
              answer: "Marka bankadan uzun yaşar. Ama henüz açılmamış bir ürün ince bir köprü.",
            },
          ],
          didLabel: "Xinja ne yaptı",
          title: "A, en sonda küçük bir B ile.",
          body: [
            "19 Ocak 2021'e kadar 252 milyon doların yüzde 99,97'si 37.884 müşteriye döndü. Kimsenin almadığı son 65 bin dolar için her müşteriye NAB'de bir hesap açıldı.[34]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "left",
        label: "Son gün · 16 Aralık 2020",
        title: "Geriye ne kaldı",
        lead: "Xinja banka olmayı bıraktı, geriye üç şey kaldı.",
        paragraphs: [],
        card: {
          mode: "closed",
          day: "464",
          state: "Son gün",
          caption: "16 Aralık 2020",
          title: "Geriye ne kaldı",
          progress: 100,
        },
      },
    ],
    lessons: [
      {
        heading: "Para evine döndü.",
        body: "Duyurudan beş hafta sonra neredeyse her dolar sahibine dönmüştü; kalanı NAB'de bekliyor.",
      },
      {
        heading: "Şirket kaldı, banka gitti.",
        body: "Xinja bir fintech olarak devam edip Dabble'a odaklanacağını söyledi.",
      },
      {
        heading: "Kalabalık ortaklar.",
        body: "İki kitle fonlaması turunda 2.700'ü aşkın kişi Xinja'ya ortak oldu. Hisseleri artık banka olmayan bir şirkette duruyor.",
      },
    ],
    note: {
      label: "fspark9 notu",
      paragraphs: [
        "Xinja'ya bakınca aklımıza tek bir soru takılıyor: insanlar paralarını getirmek için sıraya girdiğinde, o paranın nerede çalışacağı belli miydi?",
        "Bankacılığın temeli eski ve sade. Uygun maliyetle para toplarsınız, doğru kişiye doğru krediyi verirsiniz, aradaki fark sizi yaşatır. Xinja ilk yarıyı herkesten iyi yaptı, ikinci yarı hiç gelmedi. Mevduat ile kredi arasındaki dengeyi kuramayınca her yeni dolar faturayı büyüttü. Hızlı büyümenin büyüsü de bunu bir süre gizledi; 19 günde gelen 100 milyon bir zafer gibi göründü.",
        "Dışarıdan bakmak her zaman daha kolay. Sonradan ortaya çıkanlar, sorunların sadece strateji masasında olmadığını da düşündürüyor; onlara burada girmeyeceğiz. Ama bu hikâye acı bir gerçeği yüzümüze çarpıyor: uygulama ne kadar sevilirse sevilsin, bir banka ancak topladığı parayı doğru yerde çalıştırabildiği kadar yaşar.",
      ],
    },
    lastDay: {
      label: "Son gün · 16 Aralık 2020",
      text: "Çarşamba. Uygulama hâlâ açılıyor, karanlıkta parlayan kartlar hâlâ çalışıyor. Stash faiz işletmeyi bırakmış. Ama artık herkes biliyor. Sayaç 464'te duruyor.",
    },
    finalQuestion: {
      label: "Son bir soru",
      title: "Eylül 2019'dasınız ve tam lisans elinizde. İlk yıl için planınız ne?",
      lead: "28 bin kişi bekliyor, banka bulutta çalışıyor ve elinizde bir kredi lisansı var.",
      ctaLabel: "Görüşme ayarla",
      options: [
        {
          text: "Önce kredi. Konut kredisini aracılarla açarım, mevduat ancak kredi kadar büyür.",
          service: "zero-to-live",
          serviceName: "Zero to Live",
          heading: "Lisanstan, para kazanan bir bankaya.",
          body: "Bir banka ya da yeni bir finansal ürün açmak üzereyseniz, Zero to Live ve Product & Strategy tam bunun için. Faturayı hangi ürünün ödeyeceğine, gerisinin hangi sırayla geleceğine birlikte karar veriyoruz ve ürün yayına girene kadar yanınızda kalıyoruz.",
        },
        {
          text: "Tavanlı mevduat. İyi bir faiz, ama sadece kredinin kullanabileceği kadar para.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Hangi ürün önce gelir, yazılı olarak.",
          body: "Bir banka ya da yeni bir finansal ürün açmak üzereyseniz, Zero to Live ve Product & Strategy tam bunun için. Faturayı hangi ürünün ödeyeceğine, gerisinin hangi sırayla geleceğine birlikte karar veriyoruz ve ürün yayına girene kadar yanınızda kalıyoruz.",
        },
        {
          text: "Önce günlük bankacılık. Maaş hesabını kazanırım, tasarrufu ve krediyi adım adım eklerim.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Hangi ürün önce gelir, yazılı olarak.",
          body: "Bir banka ya da yeni bir finansal ürün açmak üzereyseniz, Zero to Live ve Product & Strategy tam bunun için. Faturayı hangi ürünün ödeyeceğine, gerisinin hangi sırayla geleceğine birlikte karar veriyoruz ve ürün yayına girene kadar yanınızda kalıyoruz.",
        },
        {
          text: "Önce mevduat, hem de hızla. Ülkenin en iyi faizi, kredi arkadan gelir.",
          service: "zero-to-live",
          serviceName: "Zero to Live",
          heading: "Lisanstan, para kazanan bir bankaya.",
          body: "Bir banka ya da yeni bir finansal ürün açmak üzereyseniz, Zero to Live ve Product & Strategy tam bunun için. Faturayı hangi ürünün ödeyeceğine, gerisinin hangi sırayla geleceğine birlikte karar veriyoruz ve ürün yayına girene kadar yanınızda kalıyoruz.",
        },
      ],
    },
    sourcesLabel: "Bu hikâye kamuya açık kaynaklardan derlendi",
    sources: [
      {
        n: 1,
        links: [
          {
            label: "FinTech Futures, Xinja gizlilikten çıkıyor, 2017",
            href: "https://www.fintechfutures.com/digital-banking/xinja-drops-ninja-mode-to-reveal-new-mobile-only-bank",
          },
        ],
      },
      {
        n: 2,
        links: [
          {
            label: "FinTech Futures, Eric Wilson söyleşisi, Mayıs 2018",
            href: "https://www.fintechfutures.com/2018/05/interview-eric-wilson-xinja-upbeat-down-under/",
          },
        ],
      },
      {
        n: 3,
        links: [
          {
            label: "SmartCompany, ilk kitle fonlaması 18 saatte 500 bin, 16 Ocak 2018",
            href: "https://www.smartcompany.com.au/startupsmart/news/first-equity-crowdfunding-campaign-raises-500000-18-hours-digital-banking-startup-xinja/",
          },
        ],
      },
      {
        n: 4,
        links: [
          {
            label: "Equitise, Xinja kitle fonlaması vaka çalışması",
            href: "https://equitise.com/blog/successful-case-study-xinja",
          },
        ],
      },
      {
        n: 5,
        links: [
          {
            label: "Retail Banker International, Xinja sermaye turu, Mart 2020",
            href: "https://www.retailbankerinternational.com/news/xinja-capital-raise/",
          },
        ],
      },
      {
        n: 6,
        links: [
          {
            label: "Canstar, Xinja ön ödemeli kartını çıkarıyor, 20 Mart 2018",
            href: "https://www.canstar.com.au/online-banking/digital-bank-xinja-launches-first-prepaid-travel-spending-card/",
          },
        ],
      },
      {
        n: 7,
        links: [
          {
            label: "Tier One People, Eric Wilson söyleşisi, Haziran 2018",
            href: "https://tieronepeople.com/2018/06/11/eric-wilson-xinja/",
          },
        ],
      },
      {
        n: 8,
        links: [
          {
            label: "FinTech Futures, Xinja konut kredisinde Iress ile devam ediyor, 28 Ağustos 2018",
            href: "https://www.fintechfutures.com/lendtech/xinja-still-tapping-iress-for-home-loans",
          },
        ],
      },
      {
        n: 9,
        links: [
          {
            label: "FinTech Futures, Xinja kısıtlı lisans alıyor, Aralık 2018",
            href: "https://www.fintechfutures.com/2018/12/xinja-grows-up-to-be-a-bank-with-apra-licence/",
          },
        ],
      },
      {
        n: 10,
        links: [
          {
            label: "APRA, Xinja Bank'a lisans verildi, 9 Eylül 2019",
            href: "https://www.apra.gov.au/news-and-publications/apra-grants-new-authorised-deposit-taking-institution-licence-to-xinja-bank",
          },
        ],
      },
      {
        n: 11,
        links: [
          {
            label: "Startup Daily, Xinja uygulama hesaplarını açıyor, Eylül 2019",
            href: "https://www.startupdaily.net/topic/new-digital-banks-xinja-and-86-400-are-launching-retail-app-accounts/",
          },
        ],
      },
      {
        n: 12,
        links: [
          {
            label: "Good Design Australia, Xinja banka kartı ve karşılama paketi",
            href: "https://good-design.org/projects/xinja-debit-card-welcome-pack/",
          },
        ],
      },
      {
        n: 13,
        links: [
          {
            label: "Travel with Bender, Xinja kart incelemesi",
            href: "https://travelwithbender.com/product-reviews/xinja-review-australian-prepaid-travel-card",
          },
        ],
      },
      {
        n: 14,
        links: [
          {
            label: "FinTech Futures, Xinja kartını ve uygulamasını çıkarıyor, 2018",
            href: "https://www.fintechfutures.com/challenger-banks/australian-neobank-xinja-launches-card-and-app",
          },
        ],
      },
      {
        n: 15,
        links: [
          {
            label: "The Adviser, yeni banka aracı kanalını anlatıyor, Eylül 2019",
            href: "https://www.theadviser.com.au/broker/39523-neolender-granted-full-banking-licence",
          },
        ],
      },
      {
        n: 16,
        links: [
          {
            label: "Xinja, Senato Finansal Teknoloji Komitesine sunum, 2019",
            href: "https://www.aph.gov.au/DocumentStore.ashx?id=6fd0fe7b-f457-4c09-8a1d-b1fc58292d1c&subId=676896",
          },
        ],
      },
      {
        n: 17,
        links: [
          {
            label: "Australian Fintech, Xinja'nın 100 milyon mevduat bülteni, Şubat 2020",
            href: "https://australianfintech.com.au/big-four-bank-customers-flock-to-xinja-deposits-exceed-100m/",
          },
        ],
      },
      {
        n: 18,
        links: [
          {
            label: "Retail Banker International, ilk 7 günde 30 milyon, Ocak 2020",
            href: "https://www.retailbankerinternational.com/news/xinja-bank-exceeds-30m-savings-account/",
          },
        ],
      },
      {
        n: 19,
        links: [
          {
            label: "FinTech Futures, 19 günde 100 milyon mevduat, Şubat 2020",
            href: "https://www.fintechfutures.com/2020/02/aussie-neobank-xinja-hits-100m-in-deposits-after-19-days/",
          },
        ],
      },
      {
        n: 20,
        links: [
          {
            label: "Startup Daily, World Investments'tan 433 milyon, Mart 2020",
            href: "https://www.startupdaily.net/topic/neobank-xinja-lands-a-whopping-433-million-from-emirati-investors/",
          },
        ],
      },
      {
        n: 21,
        links: [
          {
            label: "Xinja blog, yeni Stash hesaplarını neden durdurduk, 5 Mart 2020",
            href: "https://xinja.com.au/news/2020/why-we-paused-new-stash-accounts/",
          },
        ],
      },
      {
        n: 22,
        links: [
          {
            label: "Broker Daily, Xinja tasarruf ürününe yeni müşteri almıyor, 9 Mart 2020",
            href: "https://www.brokerdaily.au/lender/14321-xinja-suspends-uptake-of-savings-product",
          },
        ],
      },
      {
        n: 23,
        links: [
          {
            label: "FinTech Futures, Xinja ve faiz oranları, Aralık 2020",
            href: "https://www.fintechfutures.com/challenger-banks/aussie-neobank-xinja-crumbles-under-unfeasible-interest-rates",
          },
        ],
      },
      {
        n: 24,
        links: [
          {
            label: "Savings.com.au, Stash faizi yüzde 1,80'e iniyor, 7 Mayıs 2020",
            href: "https://www.savings.com.au/news/neobank-xinja-drops-stash-savings-account-rate-to-1-8",
          },
        ],
      },
      {
        n: 25,
        links: [
          {
            label: "Reuters (Nasdaq), Xinja lisansını bırakıyor, 16 Aralık 2020",
            href: "https://www.nasdaq.com/articles/australias-xinja-bank-to-give-up-banking-license-return-deposits-2020-12-15",
          },
        ],
      },
      {
        n: 26,
        links: [
          {
            label: "Savings.com.au, Dabble duyuruldu, 21 Temmuz 2020",
            href: "https://www.savings.com.au/news/xinja-to-expand-product-suite-with-us-share-trading",
          },
        ],
      },
      {
        n: 27,
        links: [
          {
            label: "Banking Day, Xinja Dabble için APRA'yı bekliyor, Eylül 2020",
            href: "https://www.bankingday.com/xinja-waits-on-apra-for-dabble",
          },
        ],
      },
      {
        n: 28,
        links: [
          {
            label: "Crowdfund Insider, Xinja'nın denetçisi ve Dubai yatırımı, 3 Kasım 2020",
            href: "https://www.crowdfundinsider.com/2020/11/168715-australian-neobank-xinja-is-working-on-finalizing-433-million-investment-deal-from-dubais-world-investment-group/",
          },
        ],
      },
      {
        n: 29,
        links: [
          {
            label: "Startup Daily, Xinja kapanıyor, Aralık 2020",
            href: "https://www.startupdaily.net/topic/fintech/neobank-xinja-is-shutting-down/",
          },
        ],
      },
      {
        n: 30,
        links: [
          {
            label: "Savings.com.au, faiz tavanı 50 bine iniyor, 16 Kasım 2020",
            href: "https://www.savings.com.au/news/xinja-to-limit-its-maximum-interest-rate-to-50000",
          },
        ],
      },
      {
        n: 31,
        links: [
          {
            label: "ACS Information Age, Xinja faaliyetini sonlandırıyor, Aralık 2020",
            href: "https://ia.acs.org.au/article/2020/neobank-xinja-winds-up-operations.html",
          },
        ],
      },
      {
        n: 32,
        links: [
          {
            label: "Kapronasia, Xinja yolun sonunda, Aralık 2020",
            href: "https://kapronasia.com/insight/blogs/banking-research/asia-banking-research/xinja-reaches-the-end-of-the-line",
          },
        ],
      },
      {
        n: 33,
        links: [
          {
            label: "Savings.com.au, Xinja lisansını iade ediyor, 16 Aralık 2020",
            href: "https://www.savings.com.au/news/xinja-to-no-longer-offer-savings-and-transaction-accounts",
          },
        ],
      },
      {
        n: 34,
        links: [
          {
            label: "Savings.com.au, bütün mevduat iade edildi, 19 Ocak 2021",
            href: "https://www.savings.com.au/news/xinja-says-farewell-as-all-customer-deposits-returned",
          },
        ],
      },
    ],
    correctionLine: "Bir yerde hata görürseniz info@fspark9.com adresine yazın, düzeltip notunu düşeriz.",
    closeHeading: "Sizin hikâyeniz daha başındaysa, birlikte kuralım.",
  },
};
