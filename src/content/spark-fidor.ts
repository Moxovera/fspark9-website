import type { Locale, SparkEpisodeStory } from "@/types/content";

/**
 * Son Gün Nº 03 · Fidor Bank (hikâye şablonu, kart yerine gün saati).
 * Metin tek kaynaktan: Spark/Fidor/son-gun-fidor-icerik-tr-en.md; dipnotlar
 * ve metin dosyasının sessiz kaldığı etiketler (gün saati, şerit
 * başlıkları, çerçeve rakam satırı, SEO başlığı, kaynaklar ve düzeltme
 * satırı) prototipten (Spark/Fidor/son-gun-fidor.html). Elle yazılmadı,
 * prototipten çıkarıldı ve her cümle metin dosyasına karşı doğrulandı.
 * Site bunu Sanity'den okuyor; bu dosya seed-v3'ün kaynağı ve
 * check:drift'in aynası.
 */
export const fidor: Record<Locale, SparkEpisodeStory> = {
  en: {
    number: 3,
    subject: "Fidor Bank",
    hook: "Germany's community bank.",
    seo: {
      title: "Fidor Bank: the community's bank, 2394 days | The Last Day",
      description: "The bank that paid interest on Facebook likes. 2394 days after it was bought, it announced its closure.",
    },
    hero: {
      label: "The Last Day · Nº 03 · Fidor Bank · Germany",
      title: "The community's bank, inside a big family.",
      sub: "The bank that paid interest on Facebook likes. 2394 days after it was bought, it announced its closure.",
      invite: "In this story, you sit at the table. At five critical moments the last word is yours. Decide first, then we look at what happened together.",
      startLabel: "Let's begin",
      cardDay: "",
      cardState: "",
      figure: "2394",
      figureLabel: "days · acquisition to closure",
    },
    dayClock: {
      label: "Day",
      ofLabel: "of 2394",
    },
    chapters: [
      {
        id: "ch1",
        label: "Chapter 1 · Before Day 0 · 2009 to 2016",
        title: "The community bank",
        lead: "In 2009 Matthias Kröner founds a licensed internet bank in Munich and names it Fidor. The idea is new for its time: a community bank.",
        paragraphs: [
          "Customers don't just open an account, they become part of a community inside the bank. In a forum they ask each other money questions, suggest product ideas and rate each other's advice.[1]",
          "In 2012 comes \"Likezins\": every 2,000 likes on Fidor's Facebook page add 10 basis points to the savings rate. On the account screen, gold, crypto and even World of Warcraft gold sit next to deposits. A new sign up costs Fidor about 1 euro.[2]",
          "The community grows: 160,000 people in mid 2013, 310,000 at the end of 2015. 100,000 of them are full account holders. Deposits grow 48 percent in a year to 400 million euros. The bank is small but profitable: 2.4 million euros of profit in 2014, 0.2 million in 2015.[1,3]",
          "But Fidor's real secret sits on the side nobody sees. The software that runs the bank, fidorOS, is open through APIs. That means Fidor can sell the same platform to other brands.",
        ],
        card: {
          mode: "live",
          day: "2009",
          state: "Munich",
          caption: "Before Day 0",
          barTitle: "The community bank",
          progress: 0,
          barDay: "Before Day 0",
        },
        decision: {
          label: "It's 2015 · Your call",
          question: "You have a small, profitable, well loved bank and a platform you could sell. Where does the first growth money go?",
          options: [
            {
              key: "A",
              text: "A new market. The UK is big and open to digital banks.",
              answer: "A big market, a big opportunity. But in a new country, brand, customers and risk knowledge are built from scratch. A model that works at home may not work there on day one.",
            },
            {
              key: "B",
              text: "Other brands. A telco or a retailer gives its own customers a bank account, the platform comes from me.",
              answer: "You grow your platform with someone else's customers. Fast scale, low acquisition cost. The hard part: the brand isn't yours, and the relationship sits with the partner.",
            },
            {
              key: "C",
              text: "Deeper at home. I turn the German community into full customers and deposits into lending.",
              answer: "The community is already your strongest asset. Turning it into full customers is slow but solid. The cost: from the outside, growth looks quiet.",
            },
          ],
          didLabel: "What Fidor did",
          didTitle: "It chose A and B at the same time.",
          didBody: [
            "It opened in the UK in September 2015 and in 2016 launched o2 Banking with Telefónica Deutschland. In its first months in the UK it had won around 1,000 customers.[3,4]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch2",
        label: "Chapter 2 · Day 000 · 28 July 2016",
        title: "The big family",
        lead: "An announcement from Paris: Groupe BPCE is buying Fidor Bank.",
        paragraphs: [
          "The announcement carries no price; the press reports about 140 million euros.[5,6]",
          "BPCE says clearly what it wants: to use Fidor's API based platform inside the group, to speed up its digital transformation and to support Fidor's international growth. Fidor will stay independent, under its own brand and led by Kröner.[5]",
          "Kröner's line is on the record too: in a world of increasing volatility, it is important to be a member of a strong group.[5]",
        ],
        card: {
          mode: "live",
          day: "000",
          state: "28 July 2016",
          caption: "Day 0",
          barTitle: "The big family",
          progress: 0,
        },
        decision: {
          label: "You are the group's digital team",
          question: "You have just been handed a working banking platform and a community of 350,000 people. Where does the first project go?",
          options: [
            {
              key: "A",
              text: "Into the group's own banks. fidorOS goes under the Banque Populaire and Caisse d'Epargne apps.",
              answer: "You bring speed to millions of the group's customers. But putting a platform underneath large, long established banks is an integration job that takes years.",
            },
            {
              key: "B",
              text: "Into France. A new digital bank for young people under the Fidor brand.",
              answer: "Fidor's brand and culture get tested in a new market. The hard part: walking toward the same customer as the group's own digital brands.",
            },
            {
              key: "C",
              text: "Into other brands. Fidor becomes the group's banking engine in Europe; telcos, retailers and apps open accounts through it.",
              answer: "You grow something Fidor already does with the strength of the group. It needs its own team, its own sales force and patience.",
            },
          ],
          didLabel: "What happened",
          didTitle: "Fidor did not move into France.",
          didBody: [
            "Two years later, the picture in the press is this: BPCE directed its digital investment to its own brands.[6] We found no public record of fidorOS being used in the group's banks.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch3",
        label: "Chapter 3 · 2017",
        title: "A loan book",
        lead: "Fidor closes 2017 with a pre tax loss of 110 million euros. In the years before, profit sat between 0.2 and 2.4 million.",
        paragraphs: [
          "Where does the gap come from? Most of the loss comes from a lending business in the UK. There, Fidor had extended corporate loans to two companies that finance used car buyers, its business partners in that market.[7]",
          "When both companies ran into difficulty, 88 million euros had to be written off in 2017. The companies are not named in public sources. In 2018 the loss falls to 41 million euros; we could not find that year's breakdown in a public source.[7]",
        ],
        card: {
          mode: "flipped",
          day: "2017",
          state: "A loan book",
          caption: "First full year after the deal",
          barTitle: "Loan book",
          progress: 14.16,
          barDay: "2017",
        },
        decision: {
          label: "Your call",
          question: "You are in a new market. Deposits are coming in, but you have few borrowers of your own. How do you grow the loan book?",
          options: [
            {
              key: "A",
              text: "With my own customers and my own scoring. Slower, but I see the risk.",
              answer: "You see the risk every day and learn from your own data. The book grows slowly, but with few surprises.",
            },
            {
              key: "B",
              text: "Through a partner who knows the market. Faster, but the risk sits in the partner's hands.",
              answer: "Speed and ready made customers. But you have to trust how well the partner knows its own customers; the risk still sits on your balance sheet.",
            },
            {
              key: "C",
              text: "No lending in year one. Payments and deposits first, credit later.",
              answer: "The most careful path. You get to know customers and their behaviour first. The cost: deposits sit for a while without earning.",
            },
          ],
          didLabel: "What Fidor did",
          didTitle: "It was built the B way.",
          didBody: [
            "Fidor's large UK loan exposure was built through partners, and most of the 2017 loss came from there. BPCE stood behind the bank with capital and a loss guarantee.[7]",
            "Lending through a partner is sometimes the right path, as long as it is clear from the start where the risk sits.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch4",
        label: "Chapter 4 · Day 830 to 1144",
        title: "Two departures",
        lead: "In November 2018 Fidor is put up for sale.",
        paragraphs: [
          "On 2 April 2019 it is announced that founder and CEO Matthias Kröner is leaving after ten years. His goodbye goes to the staff: they always worked with all their heart, and together we wrote a page of banking history.[8]",
          "On 1 July Fidor announces it is leaving the UK, and services close on 15 September. The reason given is uncertainty in the UK market.[9]",
        ],
        card: {
          mode: "flipped",
          day: "830",
          state: "November 2018",
          caption: "Two departures",
          barTitle: "Two departures",
          progress: 34.67,
        },
      },
      {
        id: "ch5",
        label: "Chapter 5 · Day 1371 · 29 April 2020",
        title: "One in five",
        lead: "The middle of the pandemic. Telefónica Deutschland and Fidor part ways on o2 Banking.",
        paragraphs: [
          "Since 2016 Fidor had been behind the accounts sold under the o2 brand. About 70,000 customers, one in five of all Fidor customers.[11]",
          "The official reason is short: both sides will now pursue their goals separately. o2 says the new partnership will open new options for developing its banking offer. On 31 May o2 Banking relaunches with comdirect; the new package has a free girocard and Visa card, free ATM withdrawals worldwide, Apple Pay and Google Pay.[10,12]",
          "Was the real reason the product package, the cost, or something else? We don't know. Neither side said. There is also no public figure on whether the business was profitable for Fidor.",
        ],
        card: {
          mode: "flipped",
          day: "1371",
          state: "29 April 2020",
          caption: "One in five",
          barTitle: "One in five",
          progress: 57.27,
        },
        decision: {
          label: "Your call",
          question: "You give a telco a bank account under its own brand. What is the first thing you write into the contract?",
          options: [
            {
              key: "A",
              text: "Whose customer is it? The licence is mine, the brand is theirs.",
              answer: "The foundation of everything. Customer data, communication and the right to move customers at the end all depend on this answer.",
            },
            {
              key: "B",
              text: "The product roadmap. When, and with whose money, I build the card, wallet and ATM features the partner will ask for.",
              answer: "As the partner grows, it asks for more. If who builds what, and when, isn't written down, one day the request gets answered somewhere else.",
            },
            {
              key: "C",
              text: "The day we part. Where customers go, who moves them, and how fast.",
              answer: "Nobody wants to talk about parting on day one. But for the customer, the hardest day is a parting day with no plan.",
            },
          ],
          didLabel: "What happened",
          didTitle: "Customers moved their accounts themselves.",
          didBody: [
            "When the partnership ended, customers did not move to comdirect automatically. Fidor told customers it would send details on closing the account and next steps within a few days.[11] We don't know what the contract said.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch6",
        label: "Chapter 6 · Day 1467 to 1617",
        title: "The pieces go their own way",
        lead: "In August 2020 BPCE enters talks to sell the bank to Ripplewood. By the end of the year Fidor is split in two.[13]",
        paragraphs: [
          "The software side, Fidor Solutions and fidorOS, moves to Sopra Banking Software on 31 December 2020. That sale completes. In Sopra's words, Fidor Solutions brings ten years of experience pioneering APIs and building digital banks from zero to success. The platform serves banks in Europe, Africa, the Middle East and Asia.[14]",
          "The sale of the bank to Ripplewood does not complete. Neither side has given a public explanation. What we know: when the closure was announced, BPCE still owned Fidor Bank.[15]",
        ],
        card: {
          mode: "flipped",
          day: "1617",
          state: "31 December 2020",
          caption: "The pieces go their own way",
          barTitle: "The pieces",
          progress: 67.54,
        },
      },
      {
        id: "ch7",
        label: "Chapter 7 · Day 2394 · 16 February 2023",
        title: "The decision",
        lead: "The announcement goes out. Fidor will end its banking business within 2023. About 160,000 customers.[16]",
        paragraphs: [
          "The message is calm: you don't need to do anything right now, we will contact you soon to start closing your account, and you will have enough time to move your banking elsewhere.[17]",
        ],
        card: {
          mode: "closed",
          day: "2394",
          state: "Last day",
          caption: "16 February 2023",
          barTitle: "The decision",
          progress: 100,
        },
        decision: {
          label: "Your call",
          question: "The decision to close is made. 160,000 people have their salary, rent and direct debits in these accounts. What do you offer them?",
          options: [
            {
              key: "A",
              text: "A clear timeline. Everyone picks their own bank, I explain the process step by step.",
              answer: "Simple and fair. But the load stays with the customer; they move the salary, the rent, the direct debits.",
            },
            {
              key: "B",
              text: "A ready new home. I agree with a partner bank and offer an account that opens in a few taps, with direct debits already moved.",
              answer: "The easiest path for the customer. Finding the right partner and setting up the move properly takes time and effort.",
            },
            {
              key: "C",
              text: "The community. I keep the forum open until the last day so customers can help each other.",
              answer: "The answer closest to Fidor's spirit. Even in the last days, customers show each other the way.",
            },
          ],
          didLabel: "What Fidor did",
          didTitle: "Path A was taken.",
          didBody: [
            "Customers moved their accounts themselves; the record shows no recommended partner bank.[16]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "left",
        label: "Last day · 16 February 2023",
        title: "What was left",
        lead: "Fidor had three parts, and the three went three different ways.",
        paragraphs: [],
        card: {
          mode: "closed",
          day: "2394",
          state: "Last day",
          caption: "16 February 2023",
          barTitle: "What was left",
          progress: 100,
        },
      },
    ],
    lessons: [
      {
        heading: "The platform lives on.",
        body: "fidorOS became part of Sopra Banking Software's digital banking platform and kept running underneath other banks.",
      },
      {
        heading: "The B2B customer left.",
        body: "o2 Banking moved to comdirect.",
      },
      {
        heading: "The bank and its customers dispersed.",
        body: "The bank that stayed with BPCE closed, and 160,000 customers chose their own way. We found no public record of Fidor's platform or customers moving into BPCE's own banks.",
      },
    ],
    note: {
      label: "fspark9 note",
      paragraphs: [
        "Fidor had two strong things: a loyal community and a platform it could sell to other brands. Looking back, the question on our mind is this: would the story have changed if both had grown on a more patient plan?",
        "On the community side, keeping something that worked going for longer, and more stubbornly, was an option. The loan book could have grown from within the community, more calmly and more slowly. New markets could have waited until the model had fully settled at home. When lending grows first in a market you know well, with your own customers, it is much easier to see where the risk sits.",
        "On the platform side, the o2 split looks like a fork in the road. A bank like this could be thought of as three separate businesses: a BaaS bank serving other brands, a community based digital bank, and the software underneath both. Each could run with its own goals, its own team and its own numbers, and if needed some could be sold and some kept. A large group with capital, patience and distribution is one of the best places to carry a split like that.",
        "None of these are easy calls in the conditions of the day, and looking from the outside is always easier. But when a strategy writes down from day one which business grows when, and which market opens when, there is a map in hand on the hard days.",
      ],
    },
    lastDay: {
      label: "Last day · 16 February 2023",
      text: "Thursday. The Fidor app still opens, the cards still work. But now everyone knows. The clock stops at 2394.",
    },
    finalQuestion: {
      label: "One last question",
      title: "It's 2015 and you are at Fidor's table. What is your plan for the next three years?",
      lead: "You have a community, a small but profitable bank and a platform you can sell to others.",
      ctaLabel: "Book a call",
      options: [
        {
          text: "Go deeper at home first. Grow the community, and grow lending from it, slowly.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Let's write the order of growth together.",
          body: "If you have a working product and need to decide the order of growth, Product & Strategy and Expansion & GTM are built for exactly that. Together we write down which business grows first, and which market you enter, when and with which model.",
        },
        {
          text: "Split the business in three. BaaS, digital bank and software, each with its own goals.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Let's write the order of growth together.",
          body: "If you have a working product and need to decide the order of growth, Product & Strategy and Expansion & GTM are built for exactly that. Together we write down which business grows first, and which market you enter, when and with which model.",
        },
        {
          text: "Expand fast. Grow with new markets and new partners.",
          service: "expansion-gtm",
          serviceName: "Expansion & GTM",
          heading: "A new market, at the right time.",
          body: "If you have a working product and need to decide the order of growth, Product & Strategy and Expansion & GTM are built for exactly that. Together we write down which business grows first, and which market you enter, when and with which model.",
        },
        {
          text: "Put the platform first. The bank takes second place.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Let's write the order of growth together.",
          body: "If you have a working product and need to decide the order of growth, Product & Strategy and Expansion & GTM are built for exactly that. Together we write down which business grows first, and which market you enter, when and with which model.",
        },
      ],
    },
    sourcesLabel: "This story is built from public sources",
    sources: [
      {
        n: 1,
        links: [
          {
            label: "ICAEW economia, Fidor: banking with friends, 2013",
            href: "https://economia.icaew.com/features/july-2013/fidor-banking-with-friends",
          },
        ],
      },
      {
        n: 2,
        links: [
          {
            label: "Chris Skinner, Fidor Bank, 15 June 2012",
            href: "https://thefinanser.com/2012/06/fidor-bank-from-one-extreme-to-another",
          },
        ],
      },
      {
        n: 3,
        links: [
          {
            label: "Börsen-Zeitung, 2015 results, 11 February 2016",
            href: "https://www.boersen-zeitung.de/banken-finanzen/gewinn-der-fidor-bank-fallt-zuruck",
          },
        ],
      },
      {
        n: 4,
        links: [
          {
            label: "Wikipedia, Fidor Bank",
            href: "https://en.wikipedia.org/wiki/Fidor_Bank",
          },
        ],
      },
      {
        n: 5,
        links: [
          {
            label: "Groupe BPCE, acquisition of Fidor Bank, 28 July 2016",
            href: "https://www.globenewswire.com/news-release/2016/07/28/1770098/0/en/BPCE-Acquisition-of-Fidor-Bank-by-Groupe-BPCE.html",
          },
        ],
      },
      {
        n: 6,
        links: [
          {
            label: "Finextra, BPCE and Fidor head for breakup, 2018",
            href: "https://www.finextra.com/newsarticle/32940/bpce-and-fidor-head-for-breakup",
          },
        ],
      },
      {
        n: 7,
        links: [
          {
            label: "Börsen-Zeitung, 110 million euro loss, 25 February 2019",
            href: "https://www.boersen-zeitung.de/banken-finanzen/110-mill-euro-miese",
          },
        ],
      },
      {
        n: 8,
        links: [
          {
            label: "FinTech Futures, Fidor CEO leaves, 2 April 2019",
            href: "https://www.fintechfutures.com/bankingtech/fidor-ceo-leaves-as-bpce-sells-bank",
          },
        ],
      },
      {
        n: 9,
        links: [
          {
            label: "FinTech Futures, Fidor to shut down in the UK, 2 July 2019",
            href: "https://www.fintechfutures.com/bankingtech/troubled-fidor-bank-to-shut-down-in-the-uk",
          },
        ],
      },
      {
        n: 10,
        links: [
          {
            label: "teltarif, o2 Banking changes partner, 29 April 2020",
            href: "https://www.teltarif.de/o2-banking-umzug-partnerwechsel/news/80452.html",
          },
        ],
      },
      {
        n: 11,
        links: [
          {
            label: "FinTech Futures, Fidor loses O2 contract, 13 May 2020",
            href: "https://www.fintechfutures.com/digital-banking/fidor-bank-loses-o2-mobile-banking-contract",
          },
        ],
      },
      {
        n: 12,
        links: [
          {
            label: "mobiflip, comdirect is o2 Banking's new partner, 27 May 2020",
            href: "https://www.mobiflip.de/shortnews/o2-banking-comdirect/",
          },
        ],
      },
      {
        n: 13,
        links: [
          {
            label: "Groupe BPCE, exclusive talks with Ripplewood, 3 August 2020",
            href: "https://www.globenewswire.com/news-release/2020/08/03/2071867/0/en/Bpce-BPCE-today-announced-it-has-entered-into-exclusive-negotiations-with-Ripplewood-Advisors-LLC-related-to-the-proposed-disposal-of-the-entire-share-capital-of-Fidor-Bank-AG.html",
          },
        ],
      },
      {
        n: 14,
        links: [
          {
            label: "Sopra Banking Software, Fidor Solutions acquisition completed, 31 December 2020",
            href: "https://sbs-software.com/news/sopra-banking-software-completes-the-acquisition-of-fidor-solutions-the-software-subsidiary-and-digital-banking-specialist-of-next-generation-bank-fidor-bank/",
          },
        ],
      },
      {
        n: 15,
        links: [
          {
            label: "modern-banking.de, Fidor sold in two parts, 23 December 2020",
            href: "https://www.modern-banking.de/n/2012231.htm",
          },
        ],
      },
      {
        n: 16,
        links: [
          {
            label: "Verbraucherzentrale Hamburg, Fidor ends operations, 17 February 2023",
            href: "https://www.vzhh.de/themen/finanzen/konto-karte/fidor-bank-stellt-geschaeftsbetrieb-ein",
          },
        ],
      },
      {
        n: 17,
        links: [
          {
            label: "mobilebanking.de, Fidor closes in 2023, 16 February 2023",
            href: "https://www.mobilebanking.de/news/fidor-bank-schliesst.html",
          },
        ],
      },
    ],
    correctionLine: "If you spot a mistake, write to info@fspark9.com and we will correct it with a note.",
    closeHeading: "If your story is just beginning, let's build it together.",
  },
  tr: {
    number: 3,
    subject: "Fidor Bank",
    hook: "Almanya'nın topluluk bankası.",
    seo: {
      title: "Fidor Bank: topluluğun bankası, 2394 gün | Son Gün",
      description: "Facebook beğenisiyle faiz veren banka. Satın alındıktan 2394 gün sonra kapanışını duyurdu.",
    },
    hero: {
      label: "Son Gün · Nº 03 · Fidor Bank · Almanya",
      title: "Topluluğun bankası, büyük bir ailenin içinde.",
      sub: "Facebook beğenisiyle faiz veren banka. Satın alındıktan 2394 gün sonra kapanışını duyurdu.",
      invite: "Bu hikâyede masada siz oturuyorsunuz. Beş kritik anda son söz sizde. Önce siz karar verin, sonra ne olduğuna birlikte bakalım.",
      startLabel: "Başlayalım",
      cardDay: "",
      cardState: "",
      figure: "2394",
      figureLabel: "gün · satın almadan kapanışa",
    },
    dayClock: {
      label: "Gün",
      ofLabel: "2394 içinden",
    },
    chapters: [
      {
        id: "ch1",
        label: "Bölüm 1 · Gün 0'dan önce · 2009 ile 2016",
        title: "Topluluk bankası",
        lead: "2009'da Matthias Kröner Münih'te lisanslı bir internet bankası kuruyor ve adını Fidor koyuyor. Fikir o yıllar için yeni: bir topluluk bankası.",
        paragraphs: [
          "Müşteriler sadece hesap açmıyor, bankanın içindeki bir topluluğun parçası oluyor. Forumda birbirine para soruları soruyor, ürün fikri veriyor, birbirinin tavsiyesini puanlıyor.[1]",
          "2012'de \"Likezins\" geliyor: Fidor'un Facebook sayfası 2.000 beğeni aldıkça tasarruf faizi 10 baz puan artıyor. Hesap ekranında mevduatın yanında altın, kripto, hatta World of Warcraft altını duruyor. Yeni bir kayıt Fidor'a yaklaşık 1 euroya mal oluyor.[2]",
          "Topluluk büyüyor: 2013 ortasında 160 bin, 2015 sonunda 310 bin kişi. Bunların 100 bini tam hesap sahibi. Mevduat bir yılda yüzde 48 artıp 400 milyon euroya çıkıyor. Banka küçük ama kârlı: 2014'te 2,4 milyon, 2015'te 0,2 milyon euro kâr.[1,3]",
          "Ama Fidor'un asıl sırrı görünmeyen tarafta. Bankayı çalıştıran yazılım, fidorOS, API'lerle dışarıya açık. Yani Fidor aynı altyapıyı başka markalara da satabiliyor.",
        ],
        card: {
          mode: "live",
          day: "2009",
          state: "Münih",
          caption: "Gün 0'dan önce",
          barTitle: "Topluluk bankası",
          progress: 0,
          barDay: "Gün 0'dan önce",
        },
        decision: {
          label: "Yıl 2015 · Masa sizin",
          question: "Küçük, kârlı, sevilen bir bankanız ve satılabilir bir altyapınız var. Büyümek için ilk parayı nereye koyarsınız?",
          options: [
            {
              key: "A",
              text: "Yeni bir pazara. İngiltere büyük, dijital bankaya açık.",
              answer: "Büyük pazar, büyük fırsat. Ama yeni bir ülkede marka, müşteri ve risk bilgisi sıfırdan kurulur. Evde çalışan model orada ilk günden çalışmayabilir.",
            },
            {
              key: "B",
              text: "Başka markalara. Bir telekom ya da perakendeci kendi müşterisine banka hesabı versin, altyapı benden.",
              answer: "Altyapınızı başkasının müşterisiyle büyütürsünüz. Hızlı ölçek, düşük edinme maliyeti. Zor tarafı, marka sizin değil; müşteriyle ilişki partnerin elinde.",
            },
            {
              key: "C",
              text: "Evde derinleşmeye. Almanya'daki topluluğu tam müşteriye, mevduatı krediye çeviririm.",
              answer: "Topluluk zaten en güçlü varlığınız. Onu tam müşteriye çevirmek yavaş ama sağlam bir yol. Bedeli, dışarıdan bakınca büyümenin sakin görünmesi.",
            },
          ],
          didLabel: "Fidor ne yaptı",
          didTitle: "A ve B'yi aynı anda seçti.",
          didBody: [
            "Eylül 2015'te İngiltere'de açıldı, 2016'da Telefónica Deutschland ile o2 Banking'i kurdu. İngiltere'deki ilk aylarında yaklaşık bin müşteri kazanmıştı.[3,4]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch2",
        label: "Bölüm 2 · Gün 000 · 28 Temmuz 2016",
        title: "Büyük aile",
        lead: "Paris'ten bir duyuru: Groupe BPCE, Fidor Bank'ı satın alıyor.",
        paragraphs: [
          "Duyuruda fiyat yok, basın yaklaşık 140 milyon euro yazıyor.[5,6]",
          "BPCE ne istediğini açık söylüyor. Fidor'un API tabanlı altyapısını grubun içinde kullanmak, dijital dönüşümü hızlandırmak, Fidor'un uluslararası büyümesine destek olmak. Fidor kendi markasıyla, Kröner'in yönetiminde bağımsız kalacak.[5]",
          "Kröner'in cümlesi de kayıtta: belirsizliğin arttığı bir dünyada güçlü bir grubun parçası olmak önemli.[5]",
        ],
        card: {
          mode: "live",
          day: "000",
          state: "28 Temmuz 2016",
          caption: "Gün 0",
          barTitle: "Büyük aile",
          progress: 0,
        },
        decision: {
          label: "Grubun dijital ekibi sizsiniz",
          question: "Elinize çalışan bir banka altyapısı ve 350 bin kişilik bir topluluk geçti. İlk projeyi nerede yaparsınız?",
          options: [
            {
              key: "A",
              text: "Grubun kendi bankalarında. fidorOS, Banque Populaire ve Caisse d'Epargne uygulamalarının altına girer.",
              answer: "Grubun milyonlarca müşterisine hız kazandırırsınız. Ama bir altyapıyı büyük ve köklü bankaların altına yerleştirmek yıllar süren bir entegrasyon işidir.",
            },
            {
              key: "B",
              text: "Fransa'da. Fidor markasıyla gençlere yeni bir dijital banka açılır.",
              answer: "Fidor'un markası ve kültürü yeni bir pazarda denenir. Zor tarafı, grubun kendi dijital markalarıyla aynı müşteriye yürümek.",
            },
            {
              key: "C",
              text: "Başka markalarda. Fidor, grubun Avrupa'daki banka hizmeti motoru olur; telekomlar, perakendeciler, uygulamalar onun üzerinden hesap açar.",
              answer: "Fidor'un zaten yaptığı bir işi grubun gücüyle büyütürsünüz. Bunun için ayrı bir ekip, ayrı bir satış gücü ve sabır gerekir.",
            },
          ],
          didLabel: "Ne oldu",
          didTitle: "Fidor Fransa'ya taşınmadı.",
          didBody: [
            "İki yıl sonra basına yansıyan tablo şu: BPCE dijital yatırımlarını kendi markalarına yönlendirdi.[6] fidorOS'un grubun bankalarında kullanıldığına dair kamuya açık bir kayıt bulamadık.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch3",
        label: "Bölüm 3 · 2017",
        title: "Bir kredi defteri",
        lead: "Fidor 2017'yi vergi öncesi 110 milyon euro zararla kapatıyor. Önceki yıllarda kâr 0,2 milyon ile 2,4 milyon arasındaydı.",
        paragraphs: [
          "Bu fark nereden geliyor? Zararın büyük kısmı İngiltere'deki bir kredi işinden. Fidor orada, ikinci el araç alanlara finansman sağlayan iki şirkete, yani o pazardaki iş ortaklarına, kurumsal kredi açmıştı.[7]",
          "Bu iki şirket zora girince 2017'de 88 milyon euro silinmesi gerekti. Şirketlerin adları kamuya açık kaynaklarda geçmiyor. 2018'de zarar 41 milyon euroya iniyor; o yılın kalemlerini kamuya açık bir kaynakta bulamadık.[7]",
        ],
        card: {
          mode: "flipped",
          day: "2017",
          state: "Bir kredi defteri",
          caption: "Satın alımdan sonraki ilk tam yıl",
          barTitle: "Kredi defteri",
          progress: 14.16,
          barDay: "2017",
        },
        decision: {
          label: "Masa sizin",
          question: "Yeni bir pazardasınız. Mevduat geliyor ama kendi kredi müşteriniz az. Kredi defterini nasıl büyütürsünüz?",
          options: [
            {
              key: "A",
              text: "Kendi müşterime, kendi skorlamamla. Yavaş ama riski görerek.",
              answer: "Riski her gün görürsünüz, kendi verinizle öğrenirsiniz. Defter yavaş büyür ama sürprizi az olur.",
            },
            {
              key: "B",
              text: "Pazarı bilen bir partner üzerinden. Hızlı, ama risk partnerin ellerinde.",
              answer: "Hız ve hazır müşteri gelir. Ama partnerin kendi müşterisini ne kadar iyi tanıdığına güvenmek zorundasınız; risk yine sizin bilançonuzda durur.",
            },
            {
              key: "C",
              text: "İlk yıl kredi vermem. Önce ödeme ve mevduat, kredi sonra.",
              answer: "En temkinli yol. Önce müşteriyi ve davranışını tanırsınız. Bedeli, mevduatın bir süre gelir üretmeden beklemesi.",
            },
          ],
          didLabel: "Fidor ne yaptı",
          didTitle: "B yoluyla kuruldu.",
          didBody: [
            "Fidor'un İngiltere'deki büyük kredi kalemi partnerler üzerinden kuruldu ve 2017 zararının büyük kısmı oradan geldi. BPCE sermaye ve zarar garantisiyle bankanın arkasında durdu.[7]",
            "Partner üzerinden kredi bazen doğru yol, yeter ki riskin nerede durduğu baştan net olsun.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch4",
        label: "Bölüm 4 · Gün 830 ile 1144",
        title: "İki ayrılık",
        lead: "Kasım 2018'de Fidor satışa çıkarılıyor.",
        paragraphs: [
          "2 Nisan 2019'da kurucu ve CEO Matthias Kröner'in on yılın ardından ayrıldığı duyuruluyor. Veda cümlesi çalışanlara: hep tüm kalpleriyle çalıştılar, birlikte bankacılık tarihinden bir sayfa yazdık.[8]",
          "1 Temmuz'da Fidor İngiltere'den çekildiğini duyuruyor, hizmetler 15 Eylül'de kapanıyor. Gerekçe İngiltere pazarındaki belirsizlikler.[9]",
        ],
        card: {
          mode: "flipped",
          day: "830",
          state: "Kasım 2018",
          caption: "İki ayrılık",
          barTitle: "İki ayrılık",
          progress: 34.67,
        },
      },
      {
        id: "ch5",
        label: "Bölüm 5 · Gün 1371 · 29 Nisan 2020",
        title: "Beşte bir",
        lead: "Pandeminin ortası. Telefónica Deutschland, o2 Banking için Fidor ile yollarını ayırıyor.",
        paragraphs: [
          "2016'dan beri o2 markası altındaki hesapların arkasında Fidor vardı. Yaklaşık 70 bin müşteri, yani Fidor müşterilerinin beşte biri.[11]",
          "Resmî gerekçe kısa: iki taraf hedeflerini artık ayrı ayrı izleyecek. o2 de yeni ortaklığın banka teklifinin gelişimi için yeni seçenekler açacağını söylüyor. 31 Mayıs'ta o2 Banking comdirect ile yeniden açılıyor; yeni pakette ücretsiz girocard ve Visa kart, dünya çapında ücretsiz ATM, Apple Pay ve Google Pay var.[10,12]",
          "Ayrılığın asıl nedeni ürün paketi miydi, maliyet mi, başka bir şey mi, bilmiyoruz. Taraflar açıklamadı. Fidor'un bu işten kâr edip etmediğine dair de kamuya açık bir rakam yok.",
        ],
        card: {
          mode: "flipped",
          day: "1371",
          state: "29 Nisan 2020",
          caption: "Beşte bir",
          barTitle: "Beşte bir",
          progress: 57.27,
        },
        decision: {
          label: "Masa sizin",
          question: "Bir telekom şirketine onun markası altında banka hesabı veriyorsunuz. Sözleşmeye ilk neyi yazarsınız?",
          options: [
            {
              key: "A",
              text: "Müşteri kimin? Lisans benim, ama marka onun.",
              answer: "Her şeyin temeli. Müşteri verisi, iletişim ve ayrılıkta taşıma hakkı bu cevaba bağlıdır.",
            },
            {
              key: "B",
              text: "Ürün yol haritası. Partnerin isteyeceği kart, cüzdan, ATM gibi özellikleri ne zaman ve kimin parasıyla yapacağım.",
              answer: "Partner büyüdükçe daha fazlasını ister. Kimin neyi ne zaman yapacağı yazılı değilse, istek bir gün başka bir yerde karşılanır.",
            },
            {
              key: "C",
              text: "Ayrılık günü. Müşteri nereye gidecek, kim taşıyacak, ne kadar sürede.",
              answer: "Kimse ilk gün ayrılığı konuşmak istemez. Ama müşteri için en zor gün, planı olmayan ayrılık günüdür.",
            },
          ],
          didLabel: "Ne oldu",
          didTitle: "Müşteriler hesaplarını kendileri taşıdı.",
          didBody: [
            "Ayrılıkta müşteriler comdirect'e otomatik geçmedi. Fidor müşterilere hesap kapatma ve sonraki adımlar hakkında birkaç gün içinde bilgi vereceğini yazdı.[11] Sözleşmede ne yazdığını bilmiyoruz.",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "ch6",
        label: "Bölüm 6 · Gün 1467 ile 1617",
        title: "Parçalar dağılıyor",
        lead: "Ağustos 2020'de BPCE bankayı Ripplewood'a satmak için görüşmeye başlıyor. Aynı yılın sonunda Fidor ikiye bölünüyor.[13]",
        paragraphs: [
          "Yazılım tarafı, Fidor Solutions ve fidorOS, 31 Aralık 2020'de Sopra Banking Software'e geçiyor. Bu satış tamamlanıyor. Sopra'nın anlatımıyla Fidor Solutions'ın on yıllık deneyimi var; dijital bankaları sıfırdan kurup büyütmekte API'lerin öncüsü. Platform Avrupa, Afrika, Orta Doğu ve Asya'da bankalara hizmet veriyor.[14]",
          "Banka tarafının Ripplewood'a satışı ise tamamlanmıyor. Neden tamamlanmadığına dair tarafların kamuya açık bir açıklaması yok. Bildiğimiz şu: kapanış duyurulduğunda BPCE hâlâ Fidor Bank'ın sahibiydi.[15]",
        ],
        card: {
          mode: "flipped",
          day: "1617",
          state: "31 Aralık 2020",
          caption: "Parçalar dağılıyor",
          barTitle: "Parçalar",
          progress: 67.54,
        },
      },
      {
        id: "ch7",
        label: "Bölüm 7 · Gün 2394 · 16 Şubat 2023",
        title: "Karar",
        lead: "Duyuru çıkıyor. Fidor bankacılık işini 2023 içinde bitirecek. Yaklaşık 160 bin müşteri var.[16]",
        paragraphs: [
          "Mesaj sakin: şu an bir şey yapmanıza gerek yok, hesap kapatma sürecini başlatmak için yakında sizinle iletişime geçeceğiz, bankacılık ilişkinizi taşımak için yeterli zamanınız olacak.[17]",
        ],
        card: {
          mode: "closed",
          day: "2394",
          state: "Son gün",
          caption: "16 Şubat 2023",
          barTitle: "Karar",
          progress: 100,
        },
        decision: {
          label: "Masa sizin",
          question: "Kapanış kararı verildi. 160 bin kişinin maaşı, kirası, otomatik ödemeleri bu hesaplarda. Müşteriye ne sunarsınız?",
          options: [
            {
              key: "A",
              text: "Net bir takvim. Herkes kendi bankasını seçer, ben süreci adım adım anlatırım.",
              answer: "Sade ve adil. Ama yük müşteride kalır; maaşı, kirayı, otomatik ödemeleri o taşır.",
            },
            {
              key: "B",
              text: "Hazır bir yeni ev. Bir partner bankayla anlaşır, birkaç tıkla açılan, otomatik ödemeleri taşınmış bir hesap sunarım.",
              answer: "Müşteri için en kolay yol. Doğru partneri bulmak ve devri düzgün kurmak zaman ve emek ister.",
            },
            {
              key: "C",
              text: "Topluluk. Forumu son güne kadar açık tutar, müşterilerin birbirine yardım etmesini sağlarım.",
              answer: "Fidor'un ruhuna en yakın cevap. Son günlerde bile müşteriler birbirine yol gösterir.",
            },
          ],
          didLabel: "Fidor ne yaptı",
          didTitle: "A yolu seçildi.",
          didBody: [
            "Müşteriler hesaplarını kendileri taşıdı, kayıtta önerilen bir partner banka yok.[16]",
          ],
          note: "",
          services: [],
        },
      },
      {
        id: "left",
        label: "Son gün · 16 Şubat 2023",
        title: "Geriye ne kaldı",
        lead: "Fidor'un üç parçası vardı ve üçü üç ayrı yere gitti.",
        paragraphs: [],
        card: {
          mode: "closed",
          day: "2394",
          state: "Son gün",
          caption: "16 Şubat 2023",
          barTitle: "Geriye ne kaldı",
          progress: 100,
        },
      },
    ],
    lessons: [
      {
        heading: "Altyapı yaşıyor.",
        body: "fidorOS, Sopra Banking Software'in dijital bankacılık platformunun parçası oldu ve başka bankaların altında çalışmaya devam etti.",
      },
      {
        heading: "B2B müşteri gitti.",
        body: "o2 Banking comdirect'e taşındı.",
      },
      {
        heading: "Banka ve müşteriler dağıldı.",
        body: "BPCE'nin elinde kalan banka kapandı, 160 bin müşteri kendi yolunu seçti. Fidor'un altyapısının ya da müşterilerinin BPCE'nin kendi bankalarına taşındığına dair kamuya açık bir kayıt bulamadık.",
      },
    ],
    note: {
      label: "fspark9 notu",
      paragraphs: [
        "Fidor'un elinde iki güçlü şey vardı: sadık bir topluluk ve başka markalara satılabilen bir altyapı. Geriye dönüp baktığımızda aklımıza takılan soru şu: bu iki şey daha sabırlı bir planla büyüseydi hikâye değişir miydi?",
        "Topluluk tarafında, iyi çalışan bir şeyi daha uzun süre ve daha ısrarla sürdürmek bir seçenekti. Kredi tabanı topluluğun içinden, daha sakin ve daha yavaş genişleyebilirdi. Yeni pazar açılımları da model evde tam oturana kadar biraz beklenebilirdi. Kredi önce iyi bilinen pazarda, kendi müşteriyle büyüdüğünde riskin nerede durduğunu görmek çok daha kolay olur.",
        "Altyapı tarafında, o2 ayrılığı bir yol ayrımı gibi duruyor. Bu tip bir banka üç ayrı iş olarak düşünülebilirdi: başka markalara hizmet veren bir BaaS bankası, topluluğa dayanan klasik bir dijital banka ve bunların altındaki yazılım. Her biri kendi hedefi, kendi ekibi ve kendi rakamlarıyla çalışabilir, gerekirse bir kısmı satılıp bir kısmı tutulabilirdi. Sermayesi, sabrı ve dağıtım gücü olan büyük bir grup, böyle bir ayrımı taşıyabilecek yerlerin başında gelir.",
        "Bunların hiçbiri o günün koşullarında kolay kararlar değil ve dışarıdan bakmak her zaman daha kolay. Ama bir strateji ilk günden hangi işin ne zaman büyüyeceğini, hangi pazara ne zaman açılınacağını yazdığında, zor günlerde elde bir harita olur.",
      ],
    },
    lastDay: {
      label: "Son gün · 16 Şubat 2023",
      text: "Perşembe. Fidor'un uygulaması hâlâ açılıyor, kartlar hâlâ çalışıyor. Ama artık herkes biliyor. Sayaç 2394'te duruyor.",
    },
    finalQuestion: {
      label: "Son bir soru",
      title: "2015'tesiniz ve Fidor'un masasındasınız. Önümüzdeki üç yıl için planınız ne?",
      lead: "Elinizde bir topluluk, küçük ama kârlı bir banka ve başkalarına satılabilen bir altyapı var.",
      ctaLabel: "Görüşme ayarla",
      options: [
        {
          text: "Önce evde derinleşirim. Topluluğu büyütür, krediyi ondan ve yavaş büyütürüm.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Büyümenin sırasını birlikte yazalım.",
          body: "Elinizde çalışan bir ürün var ve büyümenin sırasına karar vermeniz gerekiyorsa, Product & Strategy ve Expansion & GTM tam bunun için. Hangi işin önce büyüyeceğini, hangi pazara ne zaman ve hangi modelle gireceğinizi birlikte yazıyoruz.",
        },
        {
          text: "İşi üçe ayırırım. BaaS, dijital banka ve yazılım, her biri kendi hedefiyle.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Büyümenin sırasını birlikte yazalım.",
          body: "Elinizde çalışan bir ürün var ve büyümenin sırasına karar vermeniz gerekiyorsa, Product & Strategy ve Expansion & GTM tam bunun için. Hangi işin önce büyüyeceğini, hangi pazara ne zaman ve hangi modelle gireceğinizi birlikte yazıyoruz.",
        },
        {
          text: "Hızla açılırım. Yeni pazarlar ve yeni partnerlerle büyürüm.",
          service: "expansion-gtm",
          serviceName: "Expansion & GTM",
          heading: "Yeni pazar, doğru zamanda.",
          body: "Elinizde çalışan bir ürün var ve büyümenin sırasına karar vermeniz gerekiyorsa, Product & Strategy ve Expansion & GTM tam bunun için. Hangi işin önce büyüyeceğini, hangi pazara ne zaman ve hangi modelle gireceğinizi birlikte yazıyoruz.",
        },
        {
          text: "Altyapıyı öne koyarım. Banka ikinci planda kalır.",
          service: "product-strategy",
          serviceName: "Product & Strategy",
          heading: "Büyümenin sırasını birlikte yazalım.",
          body: "Elinizde çalışan bir ürün var ve büyümenin sırasına karar vermeniz gerekiyorsa, Product & Strategy ve Expansion & GTM tam bunun için. Hangi işin önce büyüyeceğini, hangi pazara ne zaman ve hangi modelle gireceğinizi birlikte yazıyoruz.",
        },
      ],
    },
    sourcesLabel: "Bu hikâye kamuya açık kaynaklardan derlendi",
    sources: [
      {
        n: 1,
        links: [
          {
            label: "ICAEW economia, Fidor: banking with friends, Temmuz 2013",
            href: "https://economia.icaew.com/features/july-2013/fidor-banking-with-friends",
          },
        ],
      },
      {
        n: 2,
        links: [
          {
            label: "Chris Skinner, Fidor Bank, 15 Haziran 2012",
            href: "https://thefinanser.com/2012/06/fidor-bank-from-one-extreme-to-another",
          },
        ],
      },
      {
        n: 3,
        links: [
          {
            label: "Börsen-Zeitung, 2015 sonuçları, 11 Şubat 2016",
            href: "https://www.boersen-zeitung.de/banken-finanzen/gewinn-der-fidor-bank-fallt-zuruck",
          },
        ],
      },
      {
        n: 4,
        links: [
          {
            label: "Wikipedia, Fidor Bank",
            href: "https://en.wikipedia.org/wiki/Fidor_Bank",
          },
        ],
      },
      {
        n: 5,
        links: [
          {
            label: "Groupe BPCE, Fidor Bank'ın satın alınması, 28 Temmuz 2016",
            href: "https://www.globenewswire.com/news-release/2016/07/28/1770098/0/en/BPCE-Acquisition-of-Fidor-Bank-by-Groupe-BPCE.html",
          },
        ],
      },
      {
        n: 6,
        links: [
          {
            label: "Finextra, BPCE ve Fidor ayrılığa gidiyor, 2018",
            href: "https://www.finextra.com/newsarticle/32940/bpce-and-fidor-head-for-breakup",
          },
        ],
      },
      {
        n: 7,
        links: [
          {
            label: "Börsen-Zeitung, 110 milyon euro zarar, 25 Şubat 2019",
            href: "https://www.boersen-zeitung.de/banken-finanzen/110-mill-euro-miese",
          },
        ],
      },
      {
        n: 8,
        links: [
          {
            label: "FinTech Futures, Kröner ayrılıyor, 2 Nisan 2019",
            href: "https://www.fintechfutures.com/bankingtech/fidor-ceo-leaves-as-bpce-sells-bank",
          },
        ],
      },
      {
        n: 9,
        links: [
          {
            label: "FinTech Futures, Fidor İngiltere'den çekiliyor, 2 Temmuz 2019",
            href: "https://www.fintechfutures.com/bankingtech/troubled-fidor-bank-to-shut-down-in-the-uk",
          },
        ],
      },
      {
        n: 10,
        links: [
          {
            label: "teltarif, o2 Banking partner değiştiriyor, 29 Nisan 2020",
            href: "https://www.teltarif.de/o2-banking-umzug-partnerwechsel/news/80452.html",
          },
        ],
      },
      {
        n: 11,
        links: [
          {
            label: "FinTech Futures, Fidor o2 sözleşmesini kaybediyor, 13 Mayıs 2020",
            href: "https://www.fintechfutures.com/digital-banking/fidor-bank-loses-o2-mobile-banking-contract",
          },
        ],
      },
      {
        n: 12,
        links: [
          {
            label: "mobiflip, o2 Banking'in yeni ortağı comdirect, 27 Mayıs 2020",
            href: "https://www.mobiflip.de/shortnews/o2-banking-comdirect/",
          },
        ],
      },
      {
        n: 13,
        links: [
          {
            label: "Groupe BPCE, Ripplewood ile münhasır görüşmeler, 3 Ağustos 2020",
            href: "https://www.globenewswire.com/news-release/2020/08/03/2071867/0/en/Bpce-BPCE-today-announced-it-has-entered-into-exclusive-negotiations-with-Ripplewood-Advisors-LLC-related-to-the-proposed-disposal-of-the-entire-share-capital-of-Fidor-Bank-AG.html",
          },
        ],
      },
      {
        n: 14,
        links: [
          {
            label: "Sopra Banking Software, Fidor Solutions devri tamamlandı, 31 Aralık 2020",
            href: "https://sbs-software.com/news/sopra-banking-software-completes-the-acquisition-of-fidor-solutions-the-software-subsidiary-and-digital-banking-specialist-of-next-generation-bank-fidor-bank/",
          },
        ],
      },
      {
        n: 15,
        links: [
          {
            label: "modern-banking.de, Fidor iki parça halinde satıldı, 23 Aralık 2020",
            href: "https://www.modern-banking.de/n/2012231.htm",
          },
        ],
      },
      {
        n: 16,
        links: [
          {
            label: "Verbraucherzentrale Hamburg, Fidor faaliyetini durduruyor, 17 Şubat 2023",
            href: "https://www.vzhh.de/themen/finanzen/konto-karte/fidor-bank-stellt-geschaeftsbetrieb-ein",
          },
        ],
      },
      {
        n: 17,
        links: [
          {
            label: "mobilebanking.de, Fidor 2023'te kapanıyor, 16 Şubat 2023",
            href: "https://www.mobilebanking.de/news/fidor-bank-schliesst.html",
          },
        ],
      },
    ],
    correctionLine: "Bir yerde hata görürseniz info@fspark9.com adresine yazın, düzeltip notunu düşeriz.",
    closeHeading: "Sizin hikâyeniz daha başındaysa, birlikte kuralım.",
  },
};
