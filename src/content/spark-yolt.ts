import type { Locale, SparkEpisodeStory } from "@/types/content";

/**
 * Son Gün Nº 04 · Yolt (hikâye şablonu, kart yerine gün saati; Fidor ile aynı).
 * Metin tek kaynaktan: Spark/Yolt/son-gun-yolt-icerik-tr-en.md; dipnot
 * işaretleri, rail etiketleri, SEO başlığı, kaynaklar ve düzeltme satırı
 * prototipten (Spark/Yolt/son-gun-yolt.html). Elle yazılmadı, prototipten
 * çıkarıldı ve her cümle metin dosyasına karşı doğrulandı. Site bunu
 * Sanity'den okuyor; bu dosya seed-v3'ün kaynağı ve check:drift'in aynası.
 */
export const yolt: Record<Locale, SparkEpisodeStory> = {
  en: {
    number: 4,
    subject: "Yolt",
    hook: "ING's money app.",
    seo: {
      title: "Yolt: everyone's money on one screen, 1560 days | The Last Day",
      description: "A free app that 1.5 million people signed up for. 1560 days after opening to everyone, it announced its closure.",
    },
    hero: {
      label: "The Last Day · Nº 04 · Yolt · United Kingdom",
      title: "Everyone's money, on one screen.",
      sub: "A free app that 1.5 million people signed up for. 1560 days after opening to everyone, it announced its closure.",
      invite: "In this story, you sit at the table. At five critical moments the last word is yours. Decide first, then we look at what happened together.",
      startLabel: "Let's begin",
      cardDay: "",
      cardState: "",
      figure: "1560",
      figureLabel: "days · launch to closure",
    },
    dayClock: {
      label: "Day",
      ofLabel: "of 1560",
    },
    chapters: [
      {
        id: "ch1",
        label: "Chapter 1 · Before Day 0 · 2016",
        title: "A startup inside a bank",
        lead: "In 2016 Frank Jan Risseeuw starts a small team inside ING. The project is called Yolt.[1]",
        paragraphs: [
          "ING had left UK retail banking in 2012. Yolt is its way back, but not as a bank. It comes out of ING's innovation lab as a separate money app, and ING's own products are not even in it.[17]",
          "The timing is not random. A new European rule, the second Payment Services Directive, is on its way. With the customer's permission, banks will have to open account data to other companies.[1]",
          "The idea is simple: all your bank accounts and cards in one app, whichever bank they are with. In October 2016 a closed beta starts in the UK.[2]",
        ],
        card: {
          mode: "live",
          day: "2016",
          state: "ING",
          caption: "Before Day 0",
          barTitle: "A startup inside a bank",
          progress: 0,
          barDay: "Before Day 0",
        },
      },
      {
        id: "ch2",
        label: "Chapter 2 · Day 000 · 1 June 2017",
        title: "Free for everyone",
        lead: "Yolt opens to everyone in the UK. iOS and Android, free.[2]",
        paragraphs: [
          "Your accounts and cards sit on one screen. Spending is grouped by shop, upcoming payments are listed, and the app tells you how much is left until payday.[2]",
          "Partners come with it. The first one is an energy price comparison tool; money transfers abroad are on the way.[2,3]",
          "Risseeuw's line is on the record: instant gratification is the norm, people want convenience, speed and customisation.[2] In the first six months 100,000 people sign up.[4]",
        ],
        card: {
          mode: "live",
          day: "000",
          state: "1 June 2017",
          caption: "Day 0",
          barTitle: "Free for everyone",
          progress: 0,
        },
        decision: {
          label: "It's 2017 · Your call",
          question: "You have an app people like, and it is free. ING is behind you, so no investor is in a hurry. Where does the money come from?",
          options: [
            {
              key: "A",
              text: "From partners. A commission every time a user moves to an energy deal, a savings account or a loan.",
              answer: "It fits the app's nature: you help people find a better deal and earn when they do. The hard part: the commission depends on how many people switch, and most people look more than they switch.",
            },
            {
              key: "B",
              text: "From users. The basics stay free, the smarter features are paid.",
              answer: "Clear income from day one. The cost: in a market where similar apps are free, a paywall slows growth.",
            },
            {
              key: "C",
              text: "From nowhere, for now. Users first, the revenue model later.",
              answer: "The fastest way to grow. But the longer the model waits, the harder it gets to ask users to pay, or to put something in front of them they didn't sign up for.",
            },
          ],
          didLabel: "What Yolt did",
          didTitle: "It chose A.",
          didBody: [
            "The plan is said out loud at launch: energy suppliers will pay to be promoted in the app. Risseeuw says product comes before profit, and break even will come once there are enough users.[17]",
            "Over the years the shelf grows: bill switching, insurance, investments, pension consolidation, then savings from Raisin's partner banks. When a user takes one of these deals, Yolt earns a commission.[18,19] How much this brought in was never published.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch3",
        label: "Chapter 3 · Day 226 · 13 January 2018",
        title: "The doors open",
        lead: "Open Banking starts in the UK. Nine large banks, the CMA9, must now open account data through standard APIs when the customer agrees.[5]",
        paragraphs: [
          "For an app like Yolt this rule is not a wall, it is fuel. Data that used to be pulled in clumsy ways now comes through a proper door.",
          "Yolt connects to Monzo, RBS and Lloyds Banking Group through the new APIs. Nine months after launch, 250,000 people have signed up.[4]",
        ],
        card: {
          mode: "flipped",
          day: "226",
          state: "13 January 2018",
          caption: "The doors open",
          barTitle: "The doors open",
          progress: 14.49,
        },
      },
      {
        id: "ch4",
        label: "Chapter 4 · Day 365 · June 2018",
        title: "Two new countries",
        lead: "One year, 300,000 registered users. ING announces that Yolt is going to France and Italy.[6]",
        paragraphs: [
          "ING's chief innovation officer Benoît Legrand puts it this way: launching something is one thing, taking it to the next level is another.[6]",
          "The goal is written down too: a money app for the whole of Europe.[6]",
        ],
        card: {
          mode: "flipped",
          day: "365",
          state: "June 2018",
          caption: "Two new countries",
          barTitle: "Two new countries",
          progress: 23.4,
        },
        decision: {
          label: "It's 2018 · Your call",
          question: "You have 300,000 users and the number is growing fast. The revenue model is still not settled. What is the next step?",
          options: [
            {
              key: "A",
              text: "New markets. I open in Europe and grow the user base.",
              answer: "PSD2 opens the same door in every EU country, so the timing is right. The cost: each new market brings its own banks, its own language and its own marketing budget, before the model has proven itself at home.",
            },
            {
              key: "B",
              text: "Deeper at home. No new country until one feature in the UK earns money.",
              answer: "The slowest path from the outside, the safest from the inside. Once you know what earns, every new country is a copy of something that works.",
            },
            {
              key: "C",
              text: "Sell the engine. Connecting to banks is hard work; I offer it to other companies too.",
              answer: "You turn your hardest work into a product. The hard part: business clients want a different team, a different sales process and a different kind of patience.",
            },
          ],
          didLabel: "What Yolt did",
          didTitle: "It chose A, and eight months later added C.",
          didBody: [
            "France and Italy are announced in June 2018.[6] In February 2019 Yolt for Business opens.[7]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch5",
        label: "Chapter 5 · Day 623 · 14 February 2019",
        title: "The second business",
        lead: "After six months of testing, Yolt for Business opens: the same bank connections, offered to financial companies across Europe through APIs.[7]",
        paragraphs: [
          "Yolt says demand is already there. Every week financial firms ask for Open Banking, but don't have the team to manage the APIs themselves.[7]",
          "The app keeps moving too. In spring 2019 Yolt Pay goes into beta: payments and transfers between your own accounts, from inside the app.[8] By December, more than a million people have signed up across three countries.[1]",
          "In February 2020 Risseeuw goes back to ING to lead its Model Bank programme. The new CEO is Nicolas Weng Kan, who comes from Google Compare and Confused.com.[1,9]",
        ],
        card: {
          mode: "flipped",
          day: "623",
          state: "14 February 2019",
          caption: "The second business",
          barTitle: "The second business",
          progress: 39.94,
        },
        decision: {
          label: "Your call",
          question: "Companies knock on your door every week asking for your bank connections. How do you set up this second business?",
          options: [
            {
              key: "A",
              text: "One team, one roadmap. The app and the business clients share everything.",
              answer: "Cheap and fast at first. But when a business client and an app feature need the same engineer in the same week, someone has to wait.",
            },
            {
              key: "B",
              text: "A separate unit. Its own name, its own sales team, its own numbers.",
              answer: "Each business is measured on its own and sold on its own terms. The cost: two teams, two budgets, and a question that will come one day: which one gets the next euro?",
            },
            {
              key: "C",
              text: "Keep it small. The app stays the main business, the engine is extra income.",
              answer: "Focus stays on the consumer. The risk: if business demand is real, a half hearted offer leaves it to someone else.",
            },
          ],
          didLabel: "What happened",
          didTitle: "It got its own name.",
          didBody: [
            "The business becomes Yolt Technology Services. In February 2020 it handles 14 million API calls a week; a few months later, more than 22 million.[21,9]",
            "In the same months the app grows from just over one million registered users at the end of 2019 to 1.5 million in October 2020.[1,10] How the team and the budget were split between the two businesses is not public.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch6",
        label: "Chapter 6 · Day 1237 · 20 October 2020",
        title: "A card and a jar",
        lead: "The middle of the pandemic. Yolt now has 1.5 million registered users.[10]",
        paragraphs: [
          "The app gets its first card: a contactless Mastercard issued with PPS, on an electronic money account.[11]",
          "The licence behind the card is not Yolt's. PPS, a company of the Edenred group, holds UK and European electronic money licences and a Mastercard issuing licence. Customer money sits in a safeguarded account at Barclays.[22,14]",
          "Next to it comes the Money Jar. Purchases are rounded up, cashback from selected shops is collected, and when a refund or a bonus lands, the app suggests putting it in the jar.[10]",
          "Chief product officer Pauline van Brakel says people's relationship with money has changed dramatically in 2020.[10] The app is no longer only a window on your accounts. It wants to be a place where your money sits.",
        ],
        card: {
          mode: "flipped",
          day: "1237",
          state: "20 October 2020",
          caption: "A card and a jar",
          barTitle: "A card and a jar",
          progress: 79.29,
        },
        decision: {
          label: "Your call",
          question: "1.5 million people look at their money in your app. Few of them keep their money there. What makes the app part of their daily life?",
          options: [
            {
              key: "A",
              text: "A card and an account. Salary comes in, spending goes out, through me.",
              answer: "The strongest bond there is. But to become someone's main account you compete with every bank and every digital bank in the country.",
            },
            {
              key: "B",
              text: "A marketplace. Savings, energy and insurance from partners, inside the app.",
              answer: "You earn from what you already do well: showing people a better option. The hard part is choosing partners users trust, and keeping the advice honest.",
            },
            {
              key: "C",
              text: "Sharper insight. A paid tier that tells you what to do next with your money.",
              answer: "It builds on the habit users already have. The question is whether enough people will pay for advice they can get for free elsewhere.",
            },
          ],
          didLabel: "What Yolt did",
          didTitle: "It chose A.",
          didBody: [
            "The card and the Money Jar go live, first on iOS, then on Android.[10,11] It is a prepaid card on an electronic money account, not a current account; salaries don't land on it.[14,20]",
            "How many users took the card was never published. What we can see: registered users go from 1.5 million in October 2020 to around 1.6 million in September 2021, about 100,000 in eleven months.[10,14] Our estimate from these numbers is that the card did not visibly speed up growth. Ten and a half months later comes the announcement.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch7",
        label: "Chapter 7 · Day 1484 · 24 June 2021",
        title: "The race",
        lead: "While Yolt runs two businesses at once, the engine side of the market turns into a race. In June 2020 Mastercard agrees to buy the US data aggregator Finicity for 825 million dollars.[23]",
        paragraphs: [
          "Visa's 5.3 billion dollar deal for Plaid is called off in early 2021 after regulatory pushback. On 24 June 2021 Visa turns to Europe and agrees to buy Tink for 1.8 billion euros. Six months earlier Tink was valued at 680 million euros; it connects to 3,400 banks, 8,000 developers use its APIs, and it processes around a million payments a month in five markets.[24,27]",
          "In April TrueLayer raises 70 million dollars, 142 million in total.[25] Salt Edge says it is connected to more than 5,000 financial institutions in over 50 countries.[26]",
          "Yolt Technology Services has handled more than 2 billion API calls by then.[12] The rivals don't publish a comparable call count, so we can't line the numbers up side by side. What we can say: they do only this one thing, while Yolt's engine shares a roof with a consumer app of 1.6 million users.",
        ],
        card: {
          mode: "flipped",
          day: "1484",
          state: "24 June 2021",
          caption: "The race",
          barTitle: "The race",
          progress: 95.13,
        },
      },
      {
        id: "ch8",
        label: "Chapter 8 · Day 1560 · 8 September 2021",
        title: "The decision",
        lead: "A short note on ING's news page: the Yolt app will close.[12]",
        paragraphs: [
          "The reason is one sentence. The app is unlikely to reach the preferred scale in its market within a reasonable time. Demand for the business side is stronger, so Yolt will focus on Yolt Technology Services.[12]",
          "Weng Kan's line: our mission has always been to speed up the adoption of Open Banking, and focusing on Yolt Technology Services is a faster and more effective way of driving change.[12]",
          "At that moment the app has around 1.6 million users in the UK, France and Italy, most of them in the UK.[14]",
        ],
        card: {
          mode: "closed",
          day: "1560",
          state: "Last day",
          caption: "8 September 2021",
          barTitle: "The decision",
          progress: 100,
        },
        decision: {
          label: "Your call",
          question: "The decision is made. 1.6 million people use the app, and some of them have money on the card. What do you put first?",
          options: [
            {
              key: "A",
              text: "A firm date. Uncertainty is the worst news.",
              answer: "People plan around dates. The cost: a date announced too early can't be moved without breaking trust.",
            },
            {
              key: "B",
              text: "The way out for the money. Step by step, how to move it.",
              answer: "It answers the question everyone asks first. But it still leaves people to find their own next app.",
            },
            {
              key: "C",
              text: "A new home. An app or a bank they can move to in a few taps.",
              answer: "The easiest path for the user. Finding the right partner and setting up the move properly takes time.",
            },
          ],
          didLabel: "What Yolt did",
          didTitle: "Reassurance first, the date a month later.",
          didBody: [
            "The first message: your money and your data are safe, we will be in touch once the decision is final.[12]",
            "On 7 October the date arrives: 4 December. Money can be moved out in the app, or taken from an ATM, up to 100 pounds a day. Statements can be exported.[14] Accounts opened with partners such as Raisin, Wealthify and PensionBee stay open with those providers.[20] For everything else, the record shows no recommended alternative app.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "left",
        label: "Last day · 8 September 2021",
        title: "What was left",
        lead: "Yolt had two parts, and in the end both closed.",
        paragraphs: [],
        card: {
          mode: "closed",
          day: "1560",
          state: "Last day",
          caption: "8 September 2021",
          barTitle: "What was left",
          progress: 100,
          barDay: "Last day",
        },
      },
    ],
    lessons: [
      {
        heading: "The app closed.",
        body: "It shut on 4 December 2021. The helpline stayed open after the last day.",
      },
      {
        heading: "The engine followed.",
        body: "On 1 September 2022 ING announced it would phase out Yolt Technology Services as well, by the end of April 2023. 48 people were affected, 19 of them contractors.",
      },
      {
        heading: "The founder was back at the bank.",
        body: "Yolt's first CEO had returned to ING in 2020 to lead Model Bank, the programme moving several ING countries onto one banking platform.",
      },
    ],
    note: {
      label: "fspark9 note",
      paragraphs: [
        "Yolt had a lot going for it: a product people liked, the wind at its back and a strong investor. What level were the financial expectations at? Or was it designed as a strong testing ground for the bank itself on the open banking side?",
        "A free money app has no natural bridge between users and revenue. People look every day, but they don't generate income. The bridge is built with a card and an account, or with partner products, and each of those is a business of its own. The first method tried was commission from partner sales. As if to show that this was not enough, Yolt launched its card in its fourth year. But did the card give users a good enough reason to switch? What exactly was expected from it? What kind of revenue was it meant to bring?",
        "The second fork is the roof. A consumer app and the engine under it share code, but not customers, sales or patience. Inside one company they compete for the same budget and the same attention. Treating them from the start as two businesses, each with its own goal and its own numbers, makes the day you have to choose one much easier. By its nature, open banking fed and grew the API side. Putting energy and effort into both may have worn the team out. Would focusing on one early, and entering the race early, have changed how it ended?",
        "None of these are easy calls in the conditions of the day, and looking from the outside and judging is always easier.",
      ],
    },
    lastDay: {
      label: "Last day · 8 September 2021",
      text: "Wednesday. The app still opens, the cards still work, the jars still fill. But now everyone knows. The clock stops at 1560.",
    },
    finalQuestion: {
      label: "One last question",
      title: "It's June 2018 and you are at Yolt's table. 300,000 people have signed up. What is your plan for the next three years?",
      lead: "You have a free app people like, Open Banking on your side and bank connections other companies want.",
      ctaLabel: "Book a call",
      options: [
        {
          text: "Find the income first. No new country until one feature in the UK earns money.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Let's write where the money comes from.",
          body: "If users are coming but the revenue model is still on the table, Product & Strategy and Embedded Finance are built for exactly that. Together we write where the money comes from, which partner sits inside your product, and which business grows first.",
        },
        {
          text: "Make the app the main account. Card, salary and savings, in that order.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Let's write where the money comes from.",
          body: "If users are coming but the revenue model is still on the table, Product & Strategy and Embedded Finance are built for exactly that. Together we write where the money comes from, which partner sits inside your product, and which business grows first.",
        },
        {
          text: "Bring partners inside. Savings, energy and insurance in the app, on commission.",
          service: "embedded-finance",
          serviceName: "Embedded Finance",
          heading: "The right partner, inside the right product.",
          body: "If users are coming but the revenue model is still on the table, Product & Strategy and Embedded Finance are built for exactly that. Together we write where the money comes from, which partner sits inside your product, and which business grows first.",
        },
        {
          text: "Sell the connections. The engine becomes the business, the app becomes its showcase.",
          service: "embedded-finance",
          serviceName: "Embedded Finance",
          heading: "The right partner, inside the right product.",
          body: "If users are coming but the revenue model is still on the table, Product & Strategy and Embedded Finance are built for exactly that. Together we write where the money comes from, which partner sits inside your product, and which business grows first.",
        },
      ],
    },
    sourcesLabel: "This story is built from public sources",
    sources: [
      {
        n: 1,
        links: [
          {
            label: "FStech, Yolt CEO departs to lead ING's Model Bank, 5 December 2019",
            href: "https://www.fstech.co.uk/fst/Yolt_CEO_Departs_To_Lead_ING_Model_Bank.php",
          },
        ],
      },
      {
        n: 2,
        links: [
          {
            label: "FStech, Yolt launches UK open beta, 1 June 2017",
            href: "https://www.fstech.co.uk/fst/Yolt_Launches_UK_Open_Beta.php",
          },
        ],
      },
      {
        n: 3,
        links: [
          {
            label: "Finextra, ING backed money management app launches in the UK, 2017",
            href: "https://www.finextra.com/newsarticle/30646/ing-backed-money-management-app-launches-in-the-uk",
          },
        ],
      },
      {
        n: 4,
        links: [
          {
            label: "Finextra, Yolt hits 250,000 user mark, 2018",
            href: "https://www.finextra.com/pressarticle/73461/yolt-hits-250000-user-mark",
          },
        ],
      },
      {
        n: 5,
        links: [
          {
            label: "Open Banking, UK's Open Banking to launch on 13 January 2018, 19 December 2017",
            href: "https://www.openbanking.org.uk/news/uks-open-banking-launch-13-january-2018/",
          },
        ],
      },
      {
        n: 6,
        links: [
          {
            label: "ING, Yolt expands to France and Italy, June 2018",
            href: "https://www.ing.com/Newsroom/News/INGs-money-management-platform-Yolt-expands-to-France-and-Italy.htm",
          },
        ],
      },
      {
        n: 7,
        links: [
          {
            label: "FStech, Yolt launches Open Banking API for businesses, 14 February 2019",
            href: "https://www.fstech.co.uk/fst/Yolt_Launches_Open_Banking_API_Business.php",
          },
        ],
      },
      {
        n: 8,
        links: [
          {
            label: "Open Banking Expo, Yolt Pay in final beta stage, 25 June 2019",
            href: "https://www.openbankingexpo.com/news/yolt-pay-in-final-beta-stage-with-nationwide-santander-and-barclays/",
          },
        ],
      },
      {
        n: 9,
        links: [
          {
            label: "Finextra, Yolt names Nicolas Weng Kan CEO, 2020",
            href: "https://www.finextra.com/newsarticle/36187/yolt-names-nicolas-weng-kan-ceo",
          },
        ],
      },
      {
        n: 10,
        links: [
          {
            label: "FStech, Yolt updates app with new card and account features, 20 October 2020",
            href: "https://fstech.co.uk/fst/Yolt_Updates_App_Card_Account_Features.php",
          },
        ],
      },
      {
        n: 11,
        links: [
          {
            label: "FinTech Global, Yolt teams up with PPS for its new card, 29 October 2020",
            href: "https://fintech.global/2020/10/29/yolt-teams-up-with-pps-for-the-launch-of-its-new-card/",
          },
        ],
      },
      {
        n: 12,
        links: [
          {
            label: "ING, Yolt intends to close its smart money app, 8 September 2021",
            href: "https://ing.com/news/2021/09/yolt-to-focus-on-growth-of-yolt-technology-services-as-it-intends-to-close-its-smart-money-app.html",
          },
        ],
      },
      {
        n: 13,
        links: [
          {
            label: "Finextra, Yolt to close consumer app, September 2021",
            href: "https://www.finextra.com/newsarticle/38794/yolt-to-close-consumer-app-to-focus-on-open-banking-tech-platform",
          },
        ],
      },
      {
        n: 14,
        links: [
          {
            label: "MoneySavingExpert, Yolt to close on Saturday 4 December, 7 October 2021",
            href: "https://www.moneysavingexpert.com/news/2021/10/yolt-is-closing-down-its-app-from-december---here-s-everything-y/",
          },
        ],
      },
      {
        n: 15,
        links: [
          {
            label: "ING, Yolt to phase out its business to business open banking operations, 1 September 2022",
            href: "https://ing.com/news/2022/09/yolt-to-phase-out-its-business-to-business-open-banking-operations.html",
          },
        ],
      },
      {
        n: 16,
        links: [
          {
            label: "FinTech Futures, ING to shut down Yolt's open banking operations, 2 September 2022",
            href: "https://www.fintechfutures.com/open-banking/ing-to-shut-down-yolt-s-open-banking-operations",
          },
        ],
      },
      {
        n: 17,
        links: [
          {
            label: "Banken.nl, ING back in UK retail banking with Yolt, 9 June 2017",
            href: "https://www.banken.nl/nieuws/20286/ing-terug-op-uk-retail-banking-markt-met-geldmanagementapp-yolt",
          },
        ],
      },
      {
        n: 18,
        links: [
          {
            label: "Good With Money, What you need to know about Yolt, 2 November 2020",
            href: "https://good-with-money.com/2020/11/02/what-you-need-to-know-about-yolt/",
          },
        ],
      },
      {
        n: 19,
        links: [
          {
            label: "Raisin, Yolt launches deposit products with Raisin",
            href: "https://www.raisin.com/en/press/yolt-launches-all-markets",
          },
        ],
      },
      {
        n: 20,
        links: [
          {
            label: "Which?, Yolt app closing in December, 18 October 2021",
            href: "https://www.which.co.uk/news/article/yolt-app-closing-in-december-what-you-need-to-do-before-the-deadline-a6eo14q7dTNc",
          },
        ],
      },
      {
        n: 21,
        links: [
          {
            label: "Banken.nl, ING moves deeper into the Open Banking ecosystem, 27 February 2020",
            href: "https://www.banken.nl/nieuws/22228/ing-begeeft-zich-steeds-nadrukkelijker-in-open-banking-ecosysteem",
          },
        ],
      },
      {
        n: 22,
        links: [
          {
            label: "PaymentExpert, Edenred subsidiary PrePay Solutions becomes PPS, 28 January 2020",
            href: "https://paymentexpert.com/2020/01/28/edenred-subsidiary-prepay-solutions-unveils-pps-rebranding/",
          },
        ],
      },
      {
        n: 23,
        links: [
          {
            label: "Banking Dive, Mastercard to buy Finicity for 825 million dollars, 2020",
            href: "https://www.bankingdive.com/news/mastercard-finicity-acquisition/580454/",
          },
        ],
      },
      {
        n: 24,
        links: [
          {
            label: "TechCrunch, Visa to acquire Tink, 24 June 2021",
            href: "https://techcrunch.com/2021/06/24/visa-to-acquire-open-banking-platform-tink-for-more-than-2-billion/",
          },
        ],
      },
      {
        n: 25,
        links: [
          {
            label: "CNBC, TrueLayer raises 70 million dollars, 8 April 2021",
            href: "https://www.cnbc.com/2021/04/08/british-fintech-start-up-truelayer-raises-70-million.html",
          },
        ],
      },
      {
        n: 26,
        links: [
          {
            label: "Salt Edge, press release, 27 April 2021",
            href: "https://www.prnewswire.com/news-releases/salt-edge-paves-the-way-for-businesses-to-leverage-open-banking-301276958.html",
          },
        ],
      },
      {
        n: 27,
        links: [
          {
            label: "TechCrunch, Tink raises 103 million dollars, 11 December 2020",
            href: "https://techcrunch.com/2020/12/11/swedens-tink-raises-103m-as-its-open-banking-platform-grows-to-3400-banks-and-250m-customers/",
          },
        ],
      },
    ],
    correctionLine: "If you spot a mistake, write to info@fspark9.com and we will correct it with a note.",
    closeHeading: "If your story is just beginning, let's build it together.",
  },
  tr: {
    number: 4,
    subject: "Yolt",
    hook: "ING'nin para uygulaması.",
    seo: {
      title: "Yolt: herkesin parası tek ekranda, 1560 gün | Son Gün",
      description: "1,5 milyon kişinin kaydolduğu ücretsiz bir uygulama. Herkese açıldıktan 1560 gün sonra kapanışını duyurdu.",
    },
    hero: {
      label: "Son Gün · Nº 04 · Yolt · Birleşik Krallık",
      title: "Herkesin parası, tek ekranda.",
      sub: "1,5 milyon kişinin kaydolduğu ücretsiz bir uygulama. Herkese açıldıktan 1560 gün sonra kapanışını duyurdu.",
      invite: "Bu hikâyede masada siz oturuyorsunuz. Beş kritik anda son söz sizde. Önce siz karar verin, sonra ne olduğuna birlikte bakalım.",
      startLabel: "Başlayalım",
      cardDay: "",
      cardState: "",
      figure: "1560",
      figureLabel: "gün · lansmandan kapanışa",
    },
    dayClock: {
      label: "Gün",
      ofLabel: "1560 içinden",
    },
    chapters: [
      {
        id: "ch1",
        label: "Bölüm 1 · Gün 0'dan önce · 2016",
        title: "Bankanın içinde bir girişim",
        lead: "2016'da Frank Jan Risseeuw, ING'nin içinde küçük bir ekip kuruyor. Projenin adı Yolt.[1]",
        paragraphs: [
          "ING, İngiltere'deki bireysel bankacılıktan 2012'de çekilmişti. Yolt oraya dönüşün yolu, ama banka olarak değil. ING'nin inovasyon laboratuvarından ayrı bir para uygulaması olarak çıkıyor; içinde ING'nin kendi ürünleri bile yok.[17]",
          "Zamanlama tesadüf değil. Avrupa'da yeni bir kural, ikinci Ödeme Hizmetleri Direktifi yolda. Müşteri izin verirse bankalar hesap verisini başka şirketlere açmak zorunda kalacak.[1]",
          "Fikir sade: hangi bankada olursa olsun bütün hesaplarınız ve kartlarınız tek bir uygulamada. Ekim 2016'da İngiltere'de kapalı beta başlıyor.[2]",
        ],
        card: {
          mode: "live",
          day: "2016",
          state: "ING",
          caption: "Gün 0'dan önce",
          barTitle: "Bankanın içinde bir girişim",
          progress: 0,
          barDay: "Gün 0'dan önce",
        },
      },
      {
        id: "ch2",
        label: "Bölüm 2 · Gün 000 · 1 Haziran 2017",
        title: "Herkese ücretsiz",
        lead: "Yolt İngiltere'de herkese açılıyor. iOS ve Android, ücretsiz.[2]",
        paragraphs: [
          "Hesaplarınız ve kartlarınız tek ekranda. Harcamalar mağazaya göre ayrılıyor, yaklaşan ödemeler listeleniyor, maaşa kadar ne kadar paranız kaldığını uygulama söylüyor.[2]",
          "Yanında partnerler de geliyor. İlki bir enerji fiyatı karşılaştırma aracı; yurt dışına para transferi de yolda.[2,3]",
          "Risseeuw'un cümlesi kayıtta: anında sonuç artık normal, insanlar kolaylık, hız ve kendine göre ayar istiyor.[2] İlk altı ayda 100 bin kişi kaydoluyor.[4]",
        ],
        card: {
          mode: "live",
          day: "000",
          state: "1 Haziran 2017",
          caption: "Gün 0",
          barTitle: "Herkese ücretsiz",
          progress: 0,
        },
        decision: {
          label: "Yıl 2017 · Masa sizin",
          question: "İnsanların sevdiği bir uygulamanız var ve ücretsiz. Arkanızda ING var, yani acele eden bir yatırımcı yok. Para nereden gelecek?",
          options: [
            {
              key: "A",
              text: "Partnerlerden. Kullanıcı bir enerji teklifine, bir tasarruf hesabına ya da bir krediye geçtikçe komisyon.",
              answer: "Uygulamanın doğasına uyuyor: insanlara daha iyi bir teklif buldurursunuz, onlar geçtikçe siz kazanırsınız. Zor tarafı, komisyon geçen kişi sayısına bağlı ve çoğu insan geçmekten çok bakar.",
            },
            {
              key: "B",
              text: "Kullanıcıdan. Temel özellikler ücretsiz, daha akıllı olanlar ücretli.",
              answer: "İlk günden net bir gelir. Bedeli, benzer uygulamaların ücretsiz olduğu bir pazarda ödeme duvarı büyümeyi yavaşlatır.",
            },
            {
              key: "C",
              text: "Şimdilik hiçbir yerden. Önce kullanıcı, gelir modeli sonra.",
              answer: "Büyümenin en hızlı yolu. Ama model ne kadar beklerse, kullanıcıdan para istemek ya da önüne kaydolurken görmediği bir şey koymak o kadar zorlaşır.",
            },
          ],
          didLabel: "Yolt ne yaptı",
          didTitle: "A'yı seçti.",
          didBody: [
            "Plan lansmanda açıkça söyleniyor: enerji şirketleri uygulamada öne çıkarılmak için para ödeyecek. Risseeuw'a göre önce ürün geliyor, yeterince kullanıcıya ulaşınca başa baş noktası da gelecek.[17]",
            "Yıllar içinde raf büyüyor: fatura değiştirme, sigorta, yatırım, emeklilik birleştirme, sonra Raisin'in partner bankalarından mevduat. Kullanıcı bu tekliflerden birini aldığında Yolt komisyon kazanıyor.[18,19] Bunun ne kadar gelir getirdiği hiç açıklanmadı.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch3",
        label: "Bölüm 3 · Gün 226 · 13 Ocak 2018",
        title: "Kapılar açılıyor",
        lead: "İngiltere'de Open Banking başlıyor. CMA9 denen dokuz büyük banka, müşteri onay verirse hesap verisini standart API'lerle açmak zorunda.[5]",
        paragraphs: [
          "Yolt gibi bir uygulama için bu kural duvar değil, yakıt. Eskiden zahmetli yollarla çekilen veri artık düzgün bir kapıdan geliyor.",
          "Yolt yeni API'lerle Monzo, RBS ve Lloyds Banking Group'a bağlanıyor. Lansmandan dokuz ay sonra kayıtlı kullanıcı sayısı 250 bin.[4]",
        ],
        card: {
          mode: "flipped",
          day: "226",
          state: "13 Ocak 2018",
          caption: "Kapılar açılıyor",
          barTitle: "Kapılar açılıyor",
          progress: 14.49,
        },
      },
      {
        id: "ch4",
        label: "Bölüm 4 · Gün 365 · Haziran 2018",
        title: "İki yeni ülke",
        lead: "Bir yıl, 300 bin kayıtlı kullanıcı. ING, Yolt'un Fransa ve İtalya'ya açılacağını duyuruyor.[6]",
        paragraphs: [
          "ING'nin inovasyon direktörü Benoît Legrand'ın cümlesi şöyle: bir şeyi başlatmak bir şeydir, onu bir sonraki seviyeye taşımak başka bir şey.[6]",
          "Hedef de yazılı: bütün Avrupa için bir para uygulaması.[6]",
        ],
        card: {
          mode: "flipped",
          day: "365",
          state: "Haziran 2018",
          caption: "İki yeni ülke",
          barTitle: "İki yeni ülke",
          progress: 23.4,
        },
        decision: {
          label: "Yıl 2018 · Masa sizin",
          question: "300 bin kullanıcınız var ve sayı hızla artıyor. Gelir modeli hâlâ oturmadı. Bir sonraki adım ne?",
          options: [
            {
              key: "A",
              text: "Yeni pazarlar. Avrupa'ya açılır, kullanıcı tabanını büyütürüm.",
              answer: "PSD2 her AB ülkesinde aynı kapıyı açıyor, zamanlama doğru. Bedeli, her yeni pazar kendi bankalarını, kendi dilini, kendi pazarlama bütçesini getirir; hem de model evde kendini kanıtlamadan.",
            },
            {
              key: "B",
              text: "Evde derinleşmek. İngiltere'de para kazandıran tek bir özellik bulmadan yeni ülke yok.",
              answer: "Dışarıdan bakınca en yavaş yol, içeriden bakınca en sağlamı. Neyin kazandırdığını bildiğinizde her yeni ülke çalışan bir şeyin kopyası olur.",
            },
            {
              key: "C",
              text: "Motoru satmak. Bankalara bağlanmak zor bir iş, bunu başka şirketlere de sunarım.",
              answer: "En zor işinizi bir ürüne çevirirsiniz. Zor tarafı, kurumsal müşteri başka bir ekip, başka bir satış süreci ve başka türlü bir sabır ister.",
            },
          ],
          didLabel: "Yolt ne yaptı",
          didTitle: "A'yı seçti, sekiz ay sonra C'yi de ekledi.",
          didBody: [
            "Fransa ve İtalya Haziran 2018'de duyuruluyor.[6] Şubat 2019'da Yolt for Business açılıyor.[7]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch5",
        label: "Bölüm 5 · Gün 623 · 14 Şubat 2019",
        title: "İkinci iş",
        lead: "Altı aylık testin ardından Yolt for Business açılıyor: aynı banka bağlantıları, API üzerinden Avrupa'daki finans şirketlerine.[7]",
        paragraphs: [
          "Yolt talebin zaten orada olduğunu söylüyor. Her hafta Open Banking isteyen ama API'leri kendi yönetecek ekibi olmayan finans şirketlerinden soru geliyor.[7]",
          "Uygulama da yerinde durmuyor. 2019 baharında Yolt Pay betaya çıkıyor: kendi hesaplarınız arasında transfer ve ödeme, uygulamanın içinden.[8] Aralık geldiğinde üç ülkede kayıtlı kullanıcı bir milyonu geçmiş.[1]",
          "Şubat 2020'de Risseeuw, ING'nin Model Bank programını yönetmek için bankaya dönüyor. Yeni CEO, Google Compare ve Confused.com'dan gelen Nicolas Weng Kan.[1,9]",
        ],
        card: {
          mode: "flipped",
          day: "623",
          state: "14 Şubat 2019",
          caption: "İkinci iş",
          barTitle: "İkinci iş",
          progress: 39.94,
        },
        decision: {
          label: "Masa sizin",
          question: "Her hafta şirketler kapınızı çalıp banka bağlantılarınızı istiyor. Bu ikinci işi nasıl kurarsınız?",
          options: [
            {
              key: "A",
              text: "Tek ekip, tek yol haritası. Uygulama ve kurumsal müşteri her şeyi paylaşır.",
              answer: "Başta ucuz ve hızlı. Ama aynı hafta bir kurumsal müşteri ve bir uygulama özelliği aynı mühendisi istediğinde biri beklemek zorunda kalır.",
            },
            {
              key: "B",
              text: "Ayrı bir birim. Kendi adı, kendi satış ekibi, kendi rakamları.",
              answer: "Her iş kendi başına ölçülür, kendi şartlarıyla satılır. Bedeli, iki ekip, iki bütçe ve bir gün mutlaka gelecek bir soru: bir sonraki euro hangisine gidecek?",
            },
            {
              key: "C",
              text: "Küçük tutarım. Ana iş uygulama, motor ek gelir.",
              answer: "Odak tüketicide kalır. Riski, kurumsal talep gerçekse yarım gönüllü bir teklif o talebi başkasına bırakır.",
            },
          ],
          didLabel: "Ne oldu",
          didTitle: "Kendi adını aldı.",
          didBody: [
            "İş Yolt Technology Services adını alıyor. Şubat 2020'de haftada 14 milyon API çağrısı işliyor, birkaç ay sonra 22 milyonun üzerinde.[21,9]",
            "Aynı aylarda uygulama 2019 sonundaki bir milyonun biraz üzerindeki kayıtlı kullanıcıdan Ekim 2020'de 1,5 milyona çıkıyor.[1,10] Ekibin ve bütçenin iki iş arasında nasıl bölündüğü kamuya açık değil.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch6",
        label: "Bölüm 6 · Gün 1237 · 20 Ekim 2020",
        title: "Bir kart, bir kumbara",
        lead: "Pandeminin ortası. Yolt'un kayıtlı kullanıcı sayısı 1,5 milyon.[10]",
        paragraphs: [
          "Uygulama ilk kartını alıyor: PPS ile çıkarılan, elektronik para hesabına bağlı temassız bir Mastercard.[11]",
          "Kartın arkasındaki lisans Yolt'un değil. Edenred grubunun şirketi PPS'in İngiltere ve Avrupa elektronik para lisansları ve Mastercard kart çıkarma lisansı var. Müşterinin parası Barclays'te ayrı tutulan, korumalı bir hesapta duruyor.[22,14]",
          "Yanında Money Jar, yani bir kumbara geliyor. Alışverişler yukarı yuvarlanıp kumbaraya atılıyor, seçili mağazalardan gelen nakit iadesi toplanıyor, bir iade ya da prim yattığında uygulama bunu kumbaraya koymayı öneriyor.[10]",
          "Ürün direktörü Pauline van Brakel, 2020'de insanların parayla ilişkisinin kökten değiştiğini söylüyor.[10] Uygulama artık sadece hesaplarınıza baktığınız bir pencere değil. Paranızın durduğu bir yer olmak istiyor.",
        ],
        card: {
          mode: "flipped",
          day: "1237",
          state: "20 Ekim 2020",
          caption: "Bir kart, bir kumbara",
          barTitle: "Kart ve kumbara",
          progress: 79.29,
        },
        decision: {
          label: "Masa sizin",
          question: "1,5 milyon kişi paralarına sizin uygulamanızdan bakıyor. Ama çok azı parasını orada tutuyor. Uygulamayı günlük hayatın parçası ne yapar?",
          options: [
            {
              key: "A",
              text: "Bir kart ve bir hesap. Maaş bana gelsin, harcama benden çıksın.",
              answer: "Kurulabilecek en güçlü bağ. Ama birinin ana hesabı olmak için ülkedeki her bankayla ve her dijital bankayla yarışırsınız.",
            },
            {
              key: "B",
              text: "Bir pazar yeri. Partnerlerden tasarruf, enerji ve sigorta, uygulamanın içinde.",
              answer: "Zaten iyi yaptığınız işten kazanırsınız: insanlara daha iyi bir seçenek göstermek. Zor tarafı, kullanıcının güveneceği partnerleri seçmek ve tavsiyeyi dürüst tutmak.",
            },
            {
              key: "C",
              text: "Daha keskin bir bakış. Paranızla ne yapmanız gerektiğini söyleyen ücretli bir paket.",
              answer: "Kullanıcının zaten edindiği alışkanlığın üstüne kurulur. Soru şu: başka yerde ücretsiz bulunan bir tavsiyeye yeterince insan para öder mi?",
            },
          ],
          didLabel: "Yolt ne yaptı",
          didTitle: "A'yı seçti.",
          didBody: [
            "Kart ve kumbara önce iOS'ta, sonra Android'de yayına giriyor.[10,11] Bu bir vadesiz hesap değil, elektronik para hesabına bağlı ön ödemeli bir kart; maaş buraya yatmıyor.[14,20]",
            "Kaç kullanıcının kartı aldığı hiç açıklanmadı. Görebildiğimiz şu: kayıtlı kullanıcı Ekim 2020'de 1,5 milyon, Eylül 2021'de yaklaşık 1,6 milyon. On bir ayda 100 bin kadar.[10,14] Bu rakamlardan bizim tahminimiz, kartın büyümeyi gözle görülür biçimde hızlandırmadığı. On buçuk ay sonra duyuru geliyor.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch7",
        label: "Bölüm 7 · Gün 1484 · 24 Haziran 2021",
        title: "Yarış",
        lead: "Yolt iki işi birden yürütürken pazarın motor tarafı bir yarışa dönüyor. Haziran 2020'de Mastercard, ABD'li veri toplayıcı Finicity'yi 825 milyon dolara almak için anlaşıyor.[23]",
        paragraphs: [
          "Visa'nın Plaid için yaptığı 5,3 milyar dolarlık anlaşma, regülatör itirazından sonra 2021 başında iptal ediliyor. 24 Haziran 2021'de Visa yönünü Avrupa'ya çeviriyor ve Tink'i 1,8 milyar euroya almak için anlaşıyor. Altı ay önce Tink'in değeri 680 milyon euroydu; 3.400 bankaya bağlı, API'lerini 8.000 geliştirici kullanıyor, beş pazarda ayda bir milyon kadar ödeme işliyor.[24,27]",
          "Nisan'da TrueLayer 70 milyon dolar topluyor, toplamda 142 milyon.[25] Salt Edge, 50'den fazla ülkede 5.000'i aşkın finans kurumuna bağlı olduğunu söylüyor.[26]",
          "Yolt Technology Services o güne kadar 2 milyarı aşkın API çağrısı işlemiş.[12] Rakipler karşılaştırılabilir bir çağrı sayısı açıklamıyor, o yüzden rakamları yan yana koyamıyoruz. Söyleyebileceğimiz şu: onlar sadece bu tek işi yapıyor, Yolt'un motoru ise 1,6 milyon kullanıcılı bir tüketici uygulamasıyla aynı çatıyı paylaşıyor.",
        ],
        card: {
          mode: "flipped",
          day: "1484",
          state: "24 Haziran 2021",
          caption: "Yarış",
          barTitle: "Yarış",
          progress: 95.13,
        },
      },
      {
        id: "ch8",
        label: "Bölüm 8 · Gün 1560 · 8 Eylül 2021",
        title: "Karar",
        lead: "ING'nin haber sayfasında kısa bir not: Yolt uygulaması kapanacak.[12]",
        paragraphs: [
          "Gerekçe tek cümle. Uygulamanın makul bir sürede pazarında istenen ölçeğe ulaşması pek olası görünmüyor. Kurumsal taraftaki talep daha güçlü, Yolt bundan sonra Yolt Technology Services'a odaklanacak.[12]",
          "Weng Kan'ın cümlesi şu: misyonumuz hep Open Banking'in yayılmasını hızlandırmaktı, Yolt Technology Services'a odaklanmak değişimi sürmenin daha hızlı ve daha etkili yolu.[12]",
          "O gün uygulamanın İngiltere, Fransa ve İtalya'da yaklaşık 1,6 milyon kullanıcısı var, çoğu İngiltere'de.[14]",
        ],
        card: {
          mode: "closed",
          day: "1560",
          state: "Son gün",
          caption: "8 Eylül 2021",
          barTitle: "Karar",
          progress: 100,
        },
        decision: {
          label: "Masa sizin",
          question: "Karar verildi. 1,6 milyon kişi uygulamayı kullanıyor, bir kısmının kartında parası var. Neyi öne koyarsınız?",
          options: [
            {
              key: "A",
              text: "Kesin bir tarih. Belirsizlik en kötü haber.",
              answer: "İnsanlar tarihe göre plan yapar. Bedeli, erken duyurulan bir tarihi güveni sarsmadan değiştiremezsiniz.",
            },
            {
              key: "B",
              text: "Paranın çıkış yolu. Nasıl taşınacağını adım adım.",
              answer: "Herkesin ilk sorduğu soruyu cevaplar. Ama bir sonraki uygulamayı bulmak yine kullanıcıya kalır.",
            },
            {
              key: "C",
              text: "Yeni bir ev. Birkaç dokunuşla geçebilecekleri bir uygulama ya da banka.",
              answer: "Kullanıcı için en kolay yol. Doğru partneri bulmak ve geçişi düzgün kurmak zaman ister.",
            },
          ],
          didLabel: "Yolt ne yaptı",
          didTitle: "Önce güvence, tarih bir ay sonra.",
          didBody: [
            "İlk mesaj şu: paranız ve verileriniz güvende, karar kesinleşince size haber vereceğiz.[12]",
            "7 Ekim'de tarih geliyor: 4 Aralık. Para uygulamadan transferle ya da ATM'den, günde en fazla 100 sterlin çekilebiliyor. Hesap dökümleri indirilebiliyor.[14] Raisin, Wealthify, PensionBee gibi partnerlerde açılan hesaplar o kurumlarda açık kalıyor.[20] Geri kalanı için kayıtta önerilen bir alternatif uygulama yok.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "left",
        label: "Son gün · 8 Eylül 2021",
        title: "Geriye ne kaldı",
        lead: "Yolt'un iki parçası vardı ve sonunda ikisi de kapandı.",
        paragraphs: [],
        card: {
          mode: "closed",
          day: "1560",
          state: "Son gün",
          caption: "8 Eylül 2021",
          barTitle: "Geriye ne kaldı",
          progress: 100,
          barDay: "Son gün",
        },
      },
    ],
    lessons: [
      {
        heading: "Uygulama kapandı.",
        body: "4 Aralık 2021'de kapandı. Yardım hattı son günden sonra da açık kaldı.",
      },
      {
        heading: "Motor da arkasından gitti.",
        body: "1 Eylül 2022'de ING, Yolt Technology Services'ı da Nisan 2023 sonuna kadar kapatacağını duyurdu. 19'u sözleşmeli 48 kişi etkilendi.",
      },
      {
        heading: "Kurucu bankaya dönmüştü.",
        body: "Yolt'un ilk CEO'su 2020'de ING'ye dönüp birkaç ülkedeki ING bankalarını tek bir altyapıya taşıyan Model Bank programının başına geçmişti.",
      },
    ],
    note: {
      label: "fspark9 notu",
      paragraphs: [
        "Yolt'un elinde çok şey vardı: insanların sevdiği bir ürün, arkadan esen bir rüzgar ve güçlü bir yatırımcı. Finansal beklentiler ne seviyedeydi, yoksa açık bankacılık tarafında bankanın kendisi için güçlü bir deneyim alanı olarak mı tasarlanmıştı?",
        "Ücretsiz bir para uygulamasında kullanıcı ile gelir arasında doğal bir köprü yok. İnsanlar her gün bakıyor ama gelir üretmiyor. Köprü ya bir kart ve hesapla ya da partner ürünleriyle kurulur ve ikisi de başlı başına bir iştir. Başlangıçta denenen yöntem partner satışlarından gelen komisyondu. Bunun yetmediğini gösterir şekilde Yolt kartını dördüncü yılında çıkardı. Ama bu kart kullanıcılara geçiş için yeterli sebep veriyor muydu? Bu karttan beklenti tam olarak neydi? Nasıl bir gelir bekleniyordu?",
        "İkinci yol ayrımı çatı. Tüketici uygulaması ve altındaki motor aynı kodu paylaşır ama aynı müşteriyi, aynı satışı, aynı sabrı paylaşmaz. Aynı şirketin içinde aynı bütçe ve aynı dikkat için yarışırlar. İkisini en baştan kendi hedefi ve kendi rakamları olan iki ayrı iş gibi düşünmek, birini seçmek zorunda kalınan günü çok kolaylaştırır. Açık bankacılık doğası gereği API tarafını besledi ve büyüttü. İki tarafa birden enerji ve emek harcamak ekibi yormuş olabilir. Birine erkenden odaklanmak ve yarışa erken girmek son durumu değiştirir miydi?",
        "Bunların hiçbiri o günün koşullarında kolay kararlar değil ve dışarıdan bakıp yorumlamak her zaman daha kolay.",
      ],
    },
    lastDay: {
      label: "Son gün · 8 Eylül 2021",
      text: "Çarşamba. Uygulama hâlâ açılıyor, kartlar hâlâ çalışıyor, kumbaralar hâlâ doluyor. Ama artık herkes biliyor. Sayaç 1560'ta duruyor.",
    },
    finalQuestion: {
      label: "Son bir soru",
      title: "Haziran 2018'desiniz ve Yolt'un masasındasınız. 300 bin kişi kaydolmuş. Önümüzdeki üç yıl için planınız ne?",
      lead: "Elinizde insanların sevdiği ücretsiz bir uygulama, arkanızda Open Banking ve başka şirketlerin istediği banka bağlantıları var.",
      ctaLabel: "Görüşme ayarla",
      options: [
        {
          text: "Önce geliri bulurum. İngiltere'de para kazandıran bir özellik olmadan yeni ülke yok.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Paranın nereden geleceğini birlikte yazalım.",
          body: "Kullanıcı geliyor ama gelir modeli hâlâ masadaysa, Product & Strategy ve Embedded Finance tam bunun için. Paranın nereden geleceğini, ürününüzün içine hangi partnerin gireceğini ve hangi işin önce büyüyeceğini birlikte yazıyoruz.",
        },
        {
          text: "Uygulamayı ana hesap yaparım. Önce kart, sonra maaş, sonra birikim.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Paranın nereden geleceğini birlikte yazalım.",
          body: "Kullanıcı geliyor ama gelir modeli hâlâ masadaysa, Product & Strategy ve Embedded Finance tam bunun için. Paranın nereden geleceğini, ürününüzün içine hangi partnerin gireceğini ve hangi işin önce büyüyeceğini birlikte yazıyoruz.",
        },
        {
          text: "Partnerleri içeri alırım. Tasarruf, enerji, sigorta uygulamanın içinde, komisyonla.",
          service: "embedded-finance",
          serviceName: "Embedded Finance",
          heading: "Doğru partner, doğru ürünün içinde.",
          body: "Kullanıcı geliyor ama gelir modeli hâlâ masadaysa, Product & Strategy ve Embedded Finance tam bunun için. Paranın nereden geleceğini, ürününüzün içine hangi partnerin gireceğini ve hangi işin önce büyüyeceğini birlikte yazıyoruz.",
        },
        {
          text: "Bağlantıları satarım. Asıl iş motor olur, uygulama onun vitrini.",
          service: "embedded-finance",
          serviceName: "Embedded Finance",
          heading: "Doğru partner, doğru ürünün içinde.",
          body: "Kullanıcı geliyor ama gelir modeli hâlâ masadaysa, Product & Strategy ve Embedded Finance tam bunun için. Paranın nereden geleceğini, ürününüzün içine hangi partnerin gireceğini ve hangi işin önce büyüyeceğini birlikte yazıyoruz.",
        },
      ],
    },
    sourcesLabel: "Bu hikâye kamuya açık kaynaklardan derlendi",
    sources: [
      {
        n: 1,
        links: [
          {
            label: "FStech, Yolt CEO'su ING Model Bank'a geçiyor, 5 Aralık 2019",
            href: "https://www.fstech.co.uk/fst/Yolt_CEO_Departs_To_Lead_ING_Model_Bank.php",
          },
        ],
      },
      {
        n: 2,
        links: [
          {
            label: "FStech, Yolt İngiltere'de açık betada, 1 Haziran 2017",
            href: "https://www.fstech.co.uk/fst/Yolt_Launches_UK_Open_Beta.php",
          },
        ],
      },
      {
        n: 3,
        links: [
          {
            label: "Finextra, ING destekli para uygulaması İngiltere'de, 2017",
            href: "https://www.finextra.com/newsarticle/30646/ing-backed-money-management-app-launches-in-the-uk",
          },
        ],
      },
      {
        n: 4,
        links: [
          {
            label: "Finextra, Yolt 250 bin kullanıcıya ulaştı, 2018",
            href: "https://www.finextra.com/pressarticle/73461/yolt-hits-250000-user-mark",
          },
        ],
      },
      {
        n: 5,
        links: [
          {
            label: "Open Banking, İngiltere'de Open Banking 13 Ocak 2018'de başlıyor, 19 Aralık 2017",
            href: "https://www.openbanking.org.uk/news/uks-open-banking-launch-13-january-2018/",
          },
        ],
      },
      {
        n: 6,
        links: [
          {
            label: "ING, Yolt Fransa ve İtalya'ya açılıyor, Haziran 2018",
            href: "https://www.ing.com/Newsroom/News/INGs-money-management-platform-Yolt-expands-to-France-and-Italy.htm",
          },
        ],
      },
      {
        n: 7,
        links: [
          {
            label: "FStech, Yolt kurumsal Open Banking API'sini açıyor, 14 Şubat 2019",
            href: "https://www.fstech.co.uk/fst/Yolt_Launches_Open_Banking_API_Business.php",
          },
        ],
      },
      {
        n: 8,
        links: [
          {
            label: "Open Banking Expo, Yolt Pay betanın son aşamasında, 25 Haziran 2019",
            href: "https://www.openbankingexpo.com/news/yolt-pay-in-final-beta-stage-with-nationwide-santander-and-barclays/",
          },
        ],
      },
      {
        n: 9,
        links: [
          {
            label: "Finextra, Yolt'un yeni CEO'su Nicolas Weng Kan, 2020",
            href: "https://www.finextra.com/newsarticle/36187/yolt-names-nicolas-weng-kan-ceo",
          },
        ],
      },
      {
        n: 10,
        links: [
          {
            label: "FStech, Yolt'a kart ve kumbara geliyor, 20 Ekim 2020",
            href: "https://fstech.co.uk/fst/Yolt_Updates_App_Card_Account_Features.php",
          },
        ],
      },
      {
        n: 11,
        links: [
          {
            label: "FinTech Global, Yolt ve PPS'ten ilk kart, 29 Ekim 2020",
            href: "https://fintech.global/2020/10/29/yolt-teams-up-with-pps-for-the-launch-of-its-new-card/",
          },
        ],
      },
      {
        n: 12,
        links: [
          {
            label: "ING, Yolt uygulamasını kapatma kararı, 8 Eylül 2021",
            href: "https://ing.com/news/2021/09/yolt-to-focus-on-growth-of-yolt-technology-services-as-it-intends-to-close-its-smart-money-app.html",
          },
        ],
      },
      {
        n: 13,
        links: [
          {
            label: "Finextra, Yolt tüketici uygulamasını kapatıyor, Eylül 2021",
            href: "https://www.finextra.com/newsarticle/38794/yolt-to-close-consumer-app-to-focus-on-open-banking-tech-platform",
          },
        ],
      },
      {
        n: 14,
        links: [
          {
            label: "MoneySavingExpert, Yolt 4 Aralık'ta kapanıyor, 7 Ekim 2021",
            href: "https://www.moneysavingexpert.com/news/2021/10/yolt-is-closing-down-its-app-from-december---here-s-everything-y/",
          },
        ],
      },
      {
        n: 15,
        links: [
          {
            label: "ING, Yolt kurumsal open banking işini kapatıyor, 1 Eylül 2022",
            href: "https://ing.com/news/2022/09/yolt-to-phase-out-its-business-to-business-open-banking-operations.html",
          },
        ],
      },
      {
        n: 16,
        links: [
          {
            label: "FinTech Futures, ING Yolt'un open banking işini kapatıyor, 2 Eylül 2022",
            href: "https://www.fintechfutures.com/open-banking/ing-to-shut-down-yolt-s-open-banking-operations",
          },
        ],
      },
      {
        n: 17,
        links: [
          {
            label: "Banken.nl, ING Yolt ile İngiltere bireysel bankacılığına dönüyor, 9 Haziran 2017",
            href: "https://www.banken.nl/nieuws/20286/ing-terug-op-uk-retail-banking-markt-met-geldmanagementapp-yolt",
          },
        ],
      },
      {
        n: 18,
        links: [
          {
            label: "Good With Money, Yolt hakkında bilmeniz gerekenler, 2 Kasım 2020",
            href: "https://good-with-money.com/2020/11/02/what-you-need-to-know-about-yolt/",
          },
        ],
      },
      {
        n: 19,
        links: [
          {
            label: "Raisin, Yolt'ta Raisin mevduat ürünleri",
            href: "https://www.raisin.com/en/press/yolt-launches-all-markets",
          },
        ],
      },
      {
        n: 20,
        links: [
          {
            label: "Which?, Yolt Aralık'ta kapanıyor, 18 Ekim 2021",
            href: "https://www.which.co.uk/news/article/yolt-app-closing-in-december-what-you-need-to-do-before-the-deadline-a6eo14q7dTNc",
          },
        ],
      },
      {
        n: 21,
        links: [
          {
            label: "Banken.nl, ING Open Banking ekosistemine daha çok giriyor, 27 Şubat 2020",
            href: "https://www.banken.nl/nieuws/22228/ing-begeeft-zich-steeds-nadrukkelijker-in-open-banking-ecosysteem",
          },
        ],
      },
      {
        n: 22,
        links: [
          {
            label: "PaymentExpert, Edenred şirketi PrePay Solutions PPS oluyor, 28 Ocak 2020",
            href: "https://paymentexpert.com/2020/01/28/edenred-subsidiary-prepay-solutions-unveils-pps-rebranding/",
          },
        ],
      },
      {
        n: 23,
        links: [
          {
            label: "Banking Dive, Mastercard Finicity'yi 825 milyon dolara alıyor, 2020",
            href: "https://www.bankingdive.com/news/mastercard-finicity-acquisition/580454/",
          },
        ],
      },
      {
        n: 24,
        links: [
          {
            label: "TechCrunch, Visa Tink'i alıyor, 24 Haziran 2021",
            href: "https://techcrunch.com/2021/06/24/visa-to-acquire-open-banking-platform-tink-for-more-than-2-billion/",
          },
        ],
      },
      {
        n: 25,
        links: [
          {
            label: "CNBC, TrueLayer 70 milyon dolar topluyor, 8 Nisan 2021",
            href: "https://www.cnbc.com/2021/04/08/british-fintech-start-up-truelayer-raises-70-million.html",
          },
        ],
      },
      {
        n: 26,
        links: [
          {
            label: "Salt Edge, basın bülteni, 27 Nisan 2021",
            href: "https://www.prnewswire.com/news-releases/salt-edge-paves-the-way-for-businesses-to-leverage-open-banking-301276958.html",
          },
        ],
      },
      {
        n: 27,
        links: [
          {
            label: "TechCrunch, Tink 103 milyon dolar topluyor, 11 Aralık 2020",
            href: "https://techcrunch.com/2020/12/11/swedens-tink-raises-103m-as-its-open-banking-platform-grows-to-3400-banks-and-250m-customers/",
          },
        ],
      },
    ],
    correctionLine: "Bir yerde hata görürseniz info@fspark9.com adresine yazın, düzeltip notunu düşeriz.",
    closeHeading: "Sizin hikâyeniz daha başındaysa, birlikte kuralım.",
  },
};
