import type { Locale, SparkDecisionEpisode } from "@/types/content";

/**
 * Son Gün Nº 02 · Nuri (karar blokları şablonu). Metin tek kaynaktan:
 * Spark/Nuri/son-gun-02-nuri-metin-tr-en-v2.md; metin dosyasının sessiz
 * kaldığı etiketler (cetvel yazıları, saat, "Seçmeden göster", sonuç
 * satırları, görüş etiketi, hizmet bloğu) board'dan
 * (_design/v2/boards/son-gun-02-nuri-v2.html). Tarihler saatin ilerlemesi
 * ve cetvel izleri için. Site bunu Sanity'den okuyor; bu dosya seed-v3'ün
 * kaynağı ve check:drift'in aynası.
 */
export const nuri: Record<Locale, SparkDecisionEpisode> = {
  en: {
    number: 2,
    subject: "Nuri",
    hook: "Formerly Bitwala.",
    seo: {
      title: "Nuri · The Last Day Nº 02 · fspark9",
      description: "Born as Bitwala, died as Nuri, back as Bitwala. Seven years and five decisions at a Berlin crypto fintech. Take the chair."
    },
    opening: {
      label: "The Last Day · Nº 02",
      meta: "Formerly Bitwala · Berlin · October 2015 to 18 December 2022",
      figure: "7",
      figureLabel: "years, first day to last"
    },
    ruler: {
      ticks: [
        {
          date: "2015-10-01",
          label: "Oct 2015",
          caption: "Bitwala opens"
        },
        {
          date: "2018-01-05",
          label: "Jan 2018",
          caption: "The cards stop"
        },
        {
          date: "2018-11-15",
          label: "",
          caption: ""
        },
        {
          date: "2021-05-19",
          label: "May 2021",
          caption: "It becomes Nuri"
        },
        {
          date: "2022-03-01",
          label: "",
          caption: ""
        },
        {
          date: "2022-06-12",
          label: "",
          caption: ""
        },
        {
          date: "2022-08-09",
          label: "",
          caption: ""
        },
        {
          date: "2022-12-18",
          label: "18 Dec 2022",
          caption: "The last day"
        }
      ],
      after: "Nine months later · September 2023 · Back as Bitwala"
    },
    standfirst: "They built the first product in Germany that kept bitcoin and euros in the same account. Born as Bitwala, it died as Nuri, and nine months later it was born again as Bitwala. In between there are five decisions, and you are in the chair.",
    provenance: "Built from the public record · Last checked 28 September 2026",
    clock: {
      rangeLabel: "2015 to 2023",
      start: "2015-10-01",
      end: "2023-11-30"
    },
    intro: "You run a crypto fintech in Berlin called Bitwala. Five decisions are in front of you, and after each one you'll see what really happened.",
    labels: {
      ask: "What do you do?",
      skip: "Show without choosing",
      match: "Your call matches the record.",
      noMatch: "The record went the other way.",
      revealLabel: "What really happened",
      sourcesLabel: "Sources"
    },
    decisions: [
      {
        date: "2018-01-05",
        when: "5 January 2018",
        label: "Decision 1",
        title: "The cards stopped one morning",
        paragraphs: [
          "Your customers spend their bitcoin with a Visa card. Behind the card sits WaveCrest, an infrastructure provider based in Gibraltar. That morning Visa ends WaveCrest's membership for repeatedly breaking its rules, and every card stops at once. Neither Visa nor WaveCrest gives you time to prepare."
        ],
        options: [
          {
            key: "A",
            text: "Find another card infrastructure provider fast and bring the product back within months."
          },
          {
            key: "B",
            text: "Stop. Rebuild everything with a bank partner."
          },
          {
            key: "C",
            text: "Start working towards your own licence. Slow, but you depend on nobody."
          }
        ],
        record: "B",
        reveal: [
          "Bitwala chose B and signed with Solarisbank in October 2018. In November it relaunched with a product that combined bitcoin and euros in one German bank account. By early 2021 it had more than 200,000 customers in 32 countries and was described as Germany's third largest neobank."
        ],
        sources: [
          {
            label: "Cointelegraph, 5 January 2018",
            href: "https://cointelegraph.com/news/visa-suspends-wavecrest-status-stopping-some-crypto-credit-cards"
          },
          {
            label: "American Banker, 8 January 2018",
            href: "https://www.americanbanker.com/payments/news/why-did-visa-shut-down-multiple-crypto-cards-in-one-day"
          },
          {
            label: "Wikipedia: Bitwala",
            href: "https://en.wikipedia.org/wiki/Bitwala"
          }
        ]
      },
      {
        date: "2021-05-19",
        when: "Spring 2021",
        label: "Decision 2",
        title: "Leave the niche, or strengthen the base?",
        paragraphs: [
          "Everyone in your niche knows your name. The first German product to hold bitcoin and euros in the same account is yours. You closed a €15 million round in winter 2020, and another €9 million came in on top in mid 2021."
        ],
        options: [
          {
            key: "A",
            text: "Spend it on growth. New name, new design, a broad audience."
          },
          {
            key: "B",
            text: "Spend it on the base. Grow support, operations and the groundwork for your own licence."
          },
          {
            key: "C",
            text: "Stay in your niche and sell deeper products to bitcoin users."
          }
        ],
        record: "A",
        reveal: [
          "Bitwala chose A. In May 2021 it became Nuri, the design turned colourful, and the goal was announced as offering financial products to a broad, diverse audience. When the name changed there were no new features yet. The CEO said the new brand would be the foundation for the products to come.",
          "The growth came too. The customer count, 250,000 at the rename, was close to 500,000 within a year. But what carried that growth was investor money. Customers doubled while the product and the revenue model stood still. How long does growth bought with money stand once the money stops?",
          "Part of the bill landed on support. The same week as the rename, one user wrote that his support requests went unanswered and that he'd leave at the first chance. On Trustpilot, the company itself admitted in its replies that the load was slowing its answers.",
          "In the money business, if support doesn't grow as fast as the customer count, trust starts to wear away. If you can't answer someone who trusted you with their money, you're staying silent. Stay silent and you die slowly."
        ],
        sources: [
          {
            label: "The Paypers: the €9 million extension",
            href: "https://thepaypers.com/cryptocurrencies/nuri-raises-eur-9-mln--1250070"
          },
          {
            label: "Trending Topics, 19 May 2021",
            href: "https://www.trendingtopics.eu/krypto-startup-bitwala-benennt-sich-in-nuri-um-und-setzt-auf-defi/"
          },
          {
            label: "BTC-ECHO, 20 May 2021",
            href: "https://www.btc-echo.de/schlagzeilen/rebranding-bitwala-heisst-ab-sofort-nuri-118997/"
          },
          {
            label: "Finance Forward, 13 June 2022",
            href: "https://financefwd.com/de/nuri-celsius/"
          },
          {
            label: "verbloggt.de, 21 May 2021",
            href: "https://www.verbloggt.de/schlechte-erfahrung-mit-bitwala-your-coins-your-problems/"
          },
          {
            label: "Trustpilot: Nuri",
            href: "https://de.trustpilot.com/review/bitwala.com"
          }
        ]
      },
      {
        date: "2021-05-20",
        when: "May 2021",
        label: "Decision 3",
        title: "Interest, but which interest?",
        paragraphs: [
          "Look at the market first. German banks pay no interest on deposits, and some charge for them. Verivox counts 149 banks and savings banks with negative rates for private customers. Even ING charges 0.5% above €100,000 on new accounts from February 2021.",
          "Crypto turns the picture around. Celsius pays 6.2% a year on bitcoin on its own site, and BlockFi pays 5% on up to 0.5 bitcoin.",
          "Most people, though, are heading into ETFs. Following Trade Republic, flatex and ING stop charging for ETF savings plans in spring 2021. In April 2021 almost 2.5 million ETF savings plans run in Germany, and by September the number is close to 3 million. The broad audience escapes zero interest by buying ETFs every month."
        ],
        options: [
          {
            key: "A",
            text: "Partner with a crypto lender and offer bitcoin interest inside your app."
          },
          {
            key: "B",
            text: "Go where the broad audience is going. Build regular savings plans for bitcoin and ETFs."
          },
          {
            key: "C",
            text: "Do both, but don't tie the interest product to a single partner."
          }
        ],
        record: "A",
        reveal: [
          "Nuri chose A first. Behind the Bitcoin Ertragskonto, which promised up to 3%, was Celsius. Nuri passed customers' bitcoin to Celsius, and Celsius lent it to others for interest. In Nuri's own example the rate was 3.45%, so the customer got roughly half of what Celsius paid its own customers.",
          "B came later. The crypto savings plan opened in August 2021, and Nuri Pots, which brought ETFs together, only arrived in 2022 as the market was turning.",
          "While the broad audience bought ETFs every month, bitcoin interest spoke to people who already held bitcoin. Was this really what the market wanted?",
          "On top of that, the account had no deposit protection. If Celsius failed, customers would have to claim their money from Celsius in the US."
        ],
        sources: [
          {
            label: "t-online, 4 November 2020",
            href: "https://www.t-online.de/finanzen/aktuelles/id_88877830/neue-konditionen-direktbank-ing-fuehrt-negativzinsen-fuer-hohe-guthaben-ein.html"
          },
          {
            label: "Benzinga, February 2021",
            href: "https://benzinga.com/markets/cryptocurrency/21/02/19430335/5-cryptocurrency-wallets-that-pay-big-interest"
          },
          {
            label: "The Next Web, 8 December 2021",
            href: "https://thenextweb.com/news/crypto-savings-account-huge-interest-at-what-cost"
          },
          {
            label: "justETF: the ETF year 2021",
            href: "https://www.justetf.com/de/academy/das-etf-jahr-2021.html"
          },
          {
            label: "extraETF, April 2021",
            href: "https://cdn.extraetf.com/downloads/research/2021/extraETF-Research-ETF-Marktstatistik-Apr-2021.pdf"
          },
          {
            label: "extraETF, September 2021",
            href: "https://cdn.extraetf.com/downloads/research/2021/extraETF-Studie-ETF-Marktstatistik-September-2021.pdf"
          },
          {
            label: "Finance Forward, 2 July 2021",
            href: "https://financefwd.com/de/krypto-lending/"
          },
          {
            label: "Geldanlageportal",
            href: "https://www.geldanlageportal.de/angebot/nuri-geldanlage-in-kryptowaehrungen-bankkonto-krypto-wallet.html"
          },
          {
            label: "Decrypt, 10 August 2022",
            href: "https://decrypt.co/107141/german-crypto-bank-nuri-files-insolvency-says-all-funds-are-safe"
          },
          {
            label: "Kryptokenner",
            href: "https://kryptokenner.de/reviews/nuri/"
          }
        ]
      },
      {
        date: "2022-03-01",
        when: "March 2022",
        label: "Decision 4",
        title: "Let's look at the revenue model",
        paragraphs: [
          "The account and the card are both free. Most of your revenue is the 1% you take on every crypto trade, so you earn when people trade. When trading slows, revenue slows, but what you pay your bank partner for each customer stays where it is. Nothing else in the product brings in regular income.",
          "You now have close to half a million customers, and the rented banking infrastructure that was cheap when you were small is expensive at this scale. You've decided to build your own bank and the paperwork is ready. For capital and runway you need €50 million.",
          "You go out to raise a Series C two months late, and the war in Ukraine begins. Funds that asked you in January for a more aggressive growth plan come back six weeks later asking whether you can be profitable in one year instead of four."
        ],
        options: [
          {
            key: "A",
            text: "Cut costs, shrink the team, rewrite the strategy around profit in one year."
          },
          {
            key: "B",
            text: "Shelve the licence plan and renegotiate the price with your bank partner."
          },
          {
            key: "C",
            text: "Start charging for the account and the card, and accept losing some customers."
          }
        ],
        record: "A",
        reveal: [
          "Nuri chose A. At the end of May it parted ways with 20% of its staff and drew up a new product roadmap aimed at the mass market. The CEO wrote that it was the hardest decision in the company's history.",
          "When was the right time to move to your own licence? With €24 million freshly raised and the market rising, or in these weeks, as the funds pull back?"
        ],
        sources: [
          {
            label: "FinTech Futures, 2019",
            href: "https://www.fintechfutures.com/blockchain-crypto-digital-assets/blockchain-focused-challenger-bitwala-raises-13m"
          },
          {
            label: "BitcoinBlog.de, 2 October 2023",
            href: "https://bitcoinblog.de/2023/10/02/die-berliner-bitcoin-app-bitwala-wagt-den-neustart/"
          },
          {
            label: "Sifted, 6 June 2023",
            href: "https://sifted.eu/articles/nuri-berlin-crypto-bankrupt-lessons"
          },
          {
            label: "The Block, 13 June 2022",
            href: "https://www.theblock.co/post/151737/german-fintech-nuris-bitcoin-interest-product-affected-by-celsius-withdrawal-freeze"
          },
          {
            label: "CEO letter, May 2022",
            href: "https://www.linkedin.com/posts/kristina-walcker-mayer-b3760143_a-letter-from-our-ceo-kristina-activity-6935174808934465536-92mT"
          }
        ]
      },
      {
        date: "2022-06-12",
        when: "12 June 2022, Sunday evening",
        label: "Decision 5",
        title: "Celsius stops withdrawals",
        paragraphs: [
          "You have close to 500,000 customers, and some of them have bitcoin locked at Celsius right now. At the same time, talks for a funding round are still going."
        ],
        options: [
          {
            key: "A",
            text: "Freeze the interest account, tell customers plainly what you know, and keep talking to investors."
          },
          {
            key: "B",
            text: "Announce you'll cover the locked bitcoin from your own funds. You protect trust but burn cash."
          },
          {
            key: "C",
            text: "Chase Celsius on your customers' behalf. Run the claims process for them and write every week about where it stands."
          }
        ],
        record: "A",
        reveal: [
          "Nuri chose A. Withdrawals and new investments in the interest account were paused, and it announced that all other features were working. Still, that week the headlines put two companies side by side: Nuri, the Berlin fintech, and Celsius, which had frozen withdrawals."
        ],
        sources: [
          {
            label: "The Block, 13 June 2022",
            href: "https://www.theblock.co/post/151737/german-fintech-nuris-bitcoin-interest-product-affected-by-celsius-withdrawal-freeze"
          },
          {
            label: "Startbase, 14 June 2022",
            href: "https://www.startbase.com/news/turbulenzen-bei-nuri/"
          },
          {
            label: "Finance Forward, 13 June 2022",
            href: "https://financefwd.com/de/nuri-celsius/"
          }
        ]
      }
    ],
    records: [
      {
        date: "2022-08-09",
        when: "9 August 2022",
        label: "The countdown",
        paragraphs: [
          "Neither Pavilion Capital, seen as a possible investor, nor the existing shareholders could find the money needed in the short term, and Nuri filed for insolvency. Customer money was unaffected, because it sat with Solarisbank.",
          "The decision to close came on 18 October. In her farewell letter the CEO wrote that the insolvency of one of the company's main partners had pushed it over the edge, and everyone assumed it was Celsius.",
          "Customers were pointed to Vivid Money, and those who moved were promised free premium membership until the end of the year. Nobody ever said how many actually moved. Customers had until 18 December 2022 to withdraw their money, and that became Nuri's last day."
        ],
        sources: [
          {
            label: "Startbase, 10 August 2022",
            href: "https://www.startbase.com/news/nuri-meldet-insolvenz-an/"
          },
          {
            label: "Decrypt, 10 August 2022",
            href: "https://decrypt.co/107141/german-crypto-bank-nuri-files-insolvency-says-all-funds-are-safe"
          },
          {
            label: "Finance Magnates, 19 October 2022",
            href: "https://www.financemagnates.com/fintech/nuri-previously-bitwala-is-closing-down/"
          },
          {
            label: "FONDS professionell, 19 October 2022",
            href: "https://www.fondsprofessionell.de/news/unternehmen/headline/neobank-vivid-nimmt-kunden-von-insolventem-mitbewerber-auf-219355/"
          },
          {
            label: "The Paypers, 24 October 2022",
            href: "https://thepaypers.com/online-mobile-banking/vivid-money-takes-over-customer-base-from-nuri--1258852"
          }
        ]
      },
      {
        date: "2023-09-18",
        when: "September 2023",
        label: "Bitwala again",
        paragraphs: [
          "The story didn't end there. In September 2023 co-founder Jan Goslicki and Nuri's former head of trading, Dennis Daiber, reopened the app with a team of nine. The name was Bitwala again, and they started out with a piece of Nuri's insolvency estate.",
          "The new Bitwala left behind everything Nuri had added while growing. The team stripped all banking and lending code out of the app. In November it signed with Striga, an Estonian infrastructure company, and went back to buying and selling bitcoin and ether in 29 European countries. According to Goslicki, that was what customers wanted most anyway: to buy, sell and spend bitcoin."
        ],
        sources: [
          {
            label: "Decrypt, 18 September 2023",
            href: "https://decrypt.co/197596/rising-from-ashes-berlin-crypto-veterans-bitwala-make-surprise-comeback"
          },
          {
            label: "Börsen-Zeitung, 9 November 2023",
            href: "https://www.boersen-zeitung.de/banken-finanzen/bitwala-setzt-comeback-mit-kartengeschaeft-fort"
          },
          {
            label: "PR Newswire, 8 November 2023",
            href: "https://www.prnewswire.com/news-releases/striga-unterstutzt-bitwalas-comeback-in-der-europaischen-krypto-welt-301978916.html"
          }
        ]
      }
    ],
    twist: {
      date: "2023-10-02",
      when: "October 2023",
      label: "Another story",
      paragraphs: [
        "In an interview after the relaunch, Daiber pushed back on the story everyone knew. In his view Celsius had no economic impact on Nuri. The bitcoin sat with Celsius, and Nuri carried no liability. The damage Celsius did was to the reputation.",
        "In finance, reputation is everything. Once trust is damaged, it is very hard to put back."
      ],
      sources: [],
      poll: {
        question: "So what really stopped the company? Where do you think the brake was?",
        options: [
          {
            key: "A",
            text: "The trust wound Celsius opened"
          },
          {
            key: "B",
            text: "The funding round that never closed"
          },
          {
            key: "C",
            text: "Dependence on the bank partner"
          },
          {
            key: "D",
            text: "None of these. I think it was something else"
          }
        ],
        freeKey: "D",
        freeLabel: "What do you think it was?",
        freePlaceholder: "Write what's on your mind. Up to 250 words.",
        counterTemplate: "{n} / 250 words",
        emailLabel: "Your email (optional, if you'd like a reply)",
        submitLabel: "Send my answer",
        sendingLabel: "Sending",
        privacyLine: "Your answer reaches us by email. It is not published on the site.",
        thanks: "Your answer reached us. Thank you.",
        tooLong: "You're over 250 words. Please cut it down a little.",
        emptyText: "Please write something, even a few words.",
        error: "It didn't go through. Try again in a moment or write to info@fspark9.com.",
        sourceLabel: "Read the source",
        sourceHref: "https://bitcoinblog.de/2023/10/02/die-berliner-bitcoin-app-bitwala-wagt-den-neustart/"
      }
    },
    view: {
      date: "2023-11-30",
      when: "Our view",
      label: "fspark9 · Our view",
      paragraphs: [
        "Bitwala was born for bitcoin users, and when it was born again it went back to them. In the seven years between, it tried a broad audience, an interest product and a bank of its own. Each was a reasonable idea, and each was built on rented infrastructure and investor money.",
        "Rented banking infrastructure gets you going fast. As customers grow, so does its cost, and every problem your partner has becomes yours too. Along the way, support has to grow as fast as the customers, because in the money business trust is also measured by how fast you answer."
      ]
    },
    service: {
      label: "Service · Product & Strategy",
      heading: "Your own licence: when, with which partner, on which revenue model?",
      body: "The decisions on Nuri's table sit on many fintech tables today. In Product & Strategy we settle them with your team and a clear recommendation: when to move to your own licence, which bank partner to choose, and whether the revenue model can carry both.",
      ctaLabel: "See Product & Strategy",
      service: "product-strategy" as const
    }
  },
  tr: {
    number: 2,
    subject: "Nuri",
    hook: "Eski adıyla Bitwala.",
    seo: {
      title: "Nuri · Son Gün Nº 02 · fspark9",
      description: "Bitwala olarak doğdu, Nuri olarak öldü, yine Bitwala olarak geri döndü. Berlinli kripto fintech'inin yedi yılı ve beş kararı. Masaya sen otur."
    },
    opening: {
      label: "Son Gün · Nº 02",
      meta: "Eski adıyla Bitwala · Berlin · Ekim 2015 ile 18 Aralık 2022",
      figure: "7",
      figureLabel: "yıl, ilk günden son güne"
    },
    ruler: {
      ticks: [
        {
          date: "2015-10-01",
          label: "Ekim 2015",
          caption: "Bitwala açılır"
        },
        {
          date: "2018-01-05",
          label: "Ocak 2018",
          caption: "Kartlar kapanır"
        },
        {
          date: "2018-11-15",
          label: "",
          caption: ""
        },
        {
          date: "2021-05-19",
          label: "Mayıs 2021",
          caption: "Adı Nuri olur"
        },
        {
          date: "2022-03-01",
          label: "",
          caption: ""
        },
        {
          date: "2022-06-12",
          label: "",
          caption: ""
        },
        {
          date: "2022-08-09",
          label: "",
          caption: ""
        },
        {
          date: "2022-12-18",
          label: "18 Aralık 2022",
          caption: "Son gün"
        }
      ],
      after: "Dokuz ay sonra · Eylül 2023 · Bitwala adıyla geri döner"
    },
    standfirst: "Almanya'da bitcoin ile euroyu aynı hesapta buluşturan ilk ürünü onlar yaptı. Bitwala olarak doğdu, Nuri olarak öldü, dokuz ay sonra yine Bitwala olarak doğdu. Arada beş karar var ve masada sen oturuyorsun.",
    provenance: "Kamu kayıtlarından derlendi · Son kontrol 28 Eylül 2026",
    clock: {
      rangeLabel: "2015 ile 2023 arası",
      start: "2015-10-01",
      end: "2023-11-30"
    },
    intro: "Berlin'de Bitwala adında bir kripto fintech'i yönetiyorsun. Önünde beş karar var ve her birinden sonra gerçekte ne olduğunu göreceksin.",
    labels: {
      ask: "Ne yaparsın?",
      skip: "Seçmeden göster",
      match: "Seçimin kayıttakiyle aynı.",
      noMatch: "Kayıt başka yöne gitti.",
      revealLabel: "Gerçekte",
      sourcesLabel: "Kaynaklar"
    },
    decisions: [
      {
        date: "2018-01-05",
        when: "5 Ocak 2018",
        label: "Karar 1",
        title: "Kartlar bir sabah kapandı",
        paragraphs: [
          "Müşterilerin bitcoinlerini bir Visa kartıyla harcıyor. Kartın arkasında Cebelitarık merkezli altyapı sağlayıcısı WaveCrest var. O sabah Visa, kurallarına defalarca uymadığı için WaveCrest'in üyeliğini sonlandırıyor ve kartların hepsi bir anda kapanıyor. Ne Visa ne WaveCrest sana hazırlanman için zaman tanıyor."
        ],
        options: [
          {
            key: "A",
            text: "Hemen başka bir kart altyapı sağlayıcısı bulur, ürünü birkaç ayda geri getirirsin."
          },
          {
            key: "B",
            text: "Durursun. Her şeyi bir banka ortağıyla baştan kurarsın."
          },
          {
            key: "C",
            text: "Kendi lisansın için yola çıkarsın. Yavaş ama kimseye bağlı değilsin."
          }
        ],
        record: "B",
        reveal: [
          "Bitwala B'yi seçti ve Ekim 2018'de Solarisbank ile anlaştı. Kasım'da bitcoin ile euroyu tek bir Alman banka hesabında birleştiren ürünle yeniden açıldı. 2021 başına gelindiğinde 32 ülkede 200 binden fazla müşterisi vardı ve Almanya'nın üçüncü büyük neobankası olarak anılıyordu."
        ],
        sources: [
          {
            label: "Cointelegraph, 5 Ocak 2018",
            href: "https://cointelegraph.com/news/visa-suspends-wavecrest-status-stopping-some-crypto-credit-cards"
          },
          {
            label: "American Banker, 8 Ocak 2018",
            href: "https://www.americanbanker.com/payments/news/why-did-visa-shut-down-multiple-crypto-cards-in-one-day"
          },
          {
            label: "Wikipedia: Bitwala",
            href: "https://en.wikipedia.org/wiki/Bitwala"
          }
        ]
      },
      {
        date: "2021-05-19",
        when: "2021 baharı",
        label: "Karar 2",
        title: "Nişten çıkmak mı, temeli sağlamlaştırmak mı?",
        paragraphs: [
          "Nişinde herkesin bildiği isimsin. Bitcoin ile euroyu aynı hesapta tutan ilk Alman ürünü senin. 2020 kışında 15 milyon euroluk bir tur kapattın, 2021 ortasında üstüne 9 milyon euro daha geldi."
        ],
        options: [
          {
            key: "A",
            text: "Parayı büyümeye yatırırsın. Yeni isim, yeni tasarım, geniş kitle."
          },
          {
            key: "B",
            text: "Parayı temele yatırırsın. Destek ekibini, operasyonu ve kendi lisans hazırlığını büyütürsün."
          },
          {
            key: "C",
            text: "Nişinde kalır, bitcoin kullanıcılarına daha derin ürünler satarsın."
          }
        ],
        record: "A",
        reveal: [
          "Bitwala A'yı seçti. Mayıs 2021'de adı Nuri oldu, tasarım renklendi ve hedef geniş, çeşitli bir kitleye finans ürünleri sunmak olarak açıklandı. İsim değiştiğinde henüz yeni bir özellik yoktu. CEO, yeni markanın gelecek ürünlerin temeli olacağını söylüyordu.",
          "Büyüme de geldi. İsim değiştiğinde 250 bin olan müşteri sayısı bir yıl içinde 500 bine yaklaştı. Ama bu büyümeyi taşıyan yatırımcı parasıydı. Müşteri iki katına çıkarken ürün de gelir modeli de yerinde saydı. Parayla alınan büyüme, para kesildiğinde ne kadar ayakta kalır?",
          "Faturanın bir kısmı da destek tarafına çıktı. İsim değişikliğiyle aynı hafta bir kullanıcı, destek taleplerinin cevapsız kaldığını ve ilk fırsatta ayrılacağını yazdı. Şirket de Trustpilot'taki cevaplarında yoğunluk yüzünden geç döndüğünü kabul ediyordu.",
          "Para işinde müşteri sayısı büyürken destek aynı hızda büyümezse güven erimeye başlar. Parasını sana emanet eden birine cevap veremiyorsan sessiz kalıyorsun demektir. Sessiz kalırsan yavaşça ölürsün."
        ],
        sources: [
          {
            label: "The Paypers: 9 milyon euroluk ek tur",
            href: "https://thepaypers.com/cryptocurrencies/nuri-raises-eur-9-mln--1250070"
          },
          {
            label: "Trending Topics, 19 Mayıs 2021",
            href: "https://www.trendingtopics.eu/krypto-startup-bitwala-benennt-sich-in-nuri-um-und-setzt-auf-defi/"
          },
          {
            label: "BTC-ECHO, 20 Mayıs 2021",
            href: "https://www.btc-echo.de/schlagzeilen/rebranding-bitwala-heisst-ab-sofort-nuri-118997/"
          },
          {
            label: "Finance Forward, 13 Haziran 2022",
            href: "https://financefwd.com/de/nuri-celsius/"
          },
          {
            label: "verbloggt.de, 21 Mayıs 2021",
            href: "https://www.verbloggt.de/schlechte-erfahrung-mit-bitwala-your-coins-your-problems/"
          },
          {
            label: "Trustpilot: Nuri",
            href: "https://de.trustpilot.com/review/bitwala.com"
          }
        ]
      },
      {
        date: "2021-05-20",
        when: "Mayıs 2021",
        label: "Karar 3",
        title: "Faiz, ama hangi faiz?",
        paragraphs: [
          "Önce piyasaya bak. Alman bankaları mevduata faiz vermiyor, bazıları üstüne para kesiyor. Verivox'un saydığı 149 banka ve tasarruf sandığı bireysel müşterilere eksi faiz uyguluyor. ING bile Şubat 2021'den itibaren yeni hesaplarda 100 bin euronun üstüne yüzde 0,5 kesinti getiriyor.",
          "Kripto tarafında tablo tersine dönüyor. Celsius kendi sitesinde bitcoine yıllık yüzde 6,2 veriyor, BlockFi 0,5 bitcoine kadar yüzde 5.",
          "İnsanların çoğu ise ETF'lere yöneliyor. Trade Republic'in açtığı yoldan giden flatex ve ING, 2021 baharında ETF birikim planlarından ücret almayı bırakıyor. Almanya'da Nisan 2021'de 2,5 milyona yakın ETF birikim planı işleniyor, Eylül'de bu sayı 3 milyona dayanıyor. Geniş kitle sıfır faizden kaçmanın yolunu her ay düzenli ETF almakta buluyor."
        ],
        options: [
          {
            key: "A",
            text: "Bir kripto borç verme platformuyla ortak olur, bitcoin faizini kendi uygulamanda sunarsın."
          },
          {
            key: "B",
            text: "Geniş kitlenin gittiği yere gidersin. Bitcoin ve ETF için düzenli birikim planları kurarsın."
          },
          {
            key: "C",
            text: "İkisini de yaparsın ama faiz ürününde tek bir ortağa bağlanmazsın."
          }
        ],
        record: "A",
        reveal: [
          "Nuri önce A'yı seçti. Yüzde 3'e varan getiri vaat eden Bitcoin Ertragskonto'nun arkasında Celsius vardı. Nuri müşterinin bitcoinini Celsius'a aktarıyor, Celsius da bunları faizle başkalarına borç veriyordu. Nuri'nin kendi örnek hesabında oran yüzde 3,45'ti, yani müşteri Celsius'un kendi müşterisine verdiğinin yaklaşık yarısını alıyordu.",
          "B sonradan geldi. Kripto birikim planı Ağustos 2021'de açıldı, ETF'leri bir araya getiren Nuri Pots ise ancak 2022'de, piyasa dönerken çıktı.",
          "Geniş kitle her ay ETF alırken bitcoin faizi zaten bitcoin tutan insanlara sesleniyordu. Piyasanın istediği gerçekten bu muydu?",
          "Üstelik bu hesapta mevduat güvencesi yoktu. Celsius batarsa müşteri parasını ABD'de Celsius'tan talep etmek zorunda kalacaktı."
        ],
        sources: [
          {
            label: "t-online, 4 Kasım 2020",
            href: "https://www.t-online.de/finanzen/aktuelles/id_88877830/neue-konditionen-direktbank-ing-fuehrt-negativzinsen-fuer-hohe-guthaben-ein.html"
          },
          {
            label: "Benzinga, Şubat 2021",
            href: "https://benzinga.com/markets/cryptocurrency/21/02/19430335/5-cryptocurrency-wallets-that-pay-big-interest"
          },
          {
            label: "The Next Web, 8 Aralık 2021",
            href: "https://thenextweb.com/news/crypto-savings-account-huge-interest-at-what-cost"
          },
          {
            label: "justETF: 2021 ETF yılı",
            href: "https://www.justetf.com/de/academy/das-etf-jahr-2021.html"
          },
          {
            label: "extraETF, Nisan 2021",
            href: "https://cdn.extraetf.com/downloads/research/2021/extraETF-Research-ETF-Marktstatistik-Apr-2021.pdf"
          },
          {
            label: "extraETF, Eylül 2021",
            href: "https://cdn.extraetf.com/downloads/research/2021/extraETF-Studie-ETF-Marktstatistik-September-2021.pdf"
          },
          {
            label: "Finance Forward, 2 Temmuz 2021",
            href: "https://financefwd.com/de/krypto-lending/"
          },
          {
            label: "Geldanlageportal",
            href: "https://www.geldanlageportal.de/angebot/nuri-geldanlage-in-kryptowaehrungen-bankkonto-krypto-wallet.html"
          },
          {
            label: "Decrypt, 10 Ağustos 2022",
            href: "https://decrypt.co/107141/german-crypto-bank-nuri-files-insolvency-says-all-funds-are-safe"
          },
          {
            label: "Kryptokenner",
            href: "https://kryptokenner.de/reviews/nuri/"
          }
        ]
      },
      {
        date: "2022-03-01",
        when: "Mart 2022",
        label: "Karar 4",
        title: "Gelir modeline bakalım",
        paragraphs: [
          "Hesap da kart da ücretsiz. Gelirin büyük kısmı her kripto alım satımından aldığın yüzde 1'den geliyor, yani insanlar işlem yaptıkça kazanıyorsun. İşlemler yavaşlayınca gelir de yavaşlıyor ama her müşteri için banka ortağına ödediğin para yerinde duruyor. Üründe düzenli gelir getiren başka bir şey yok.",
          "Artık yarım milyona yakın müşterin var ve küçükken ucuz olan kiralık banka altyapısı bu ölçekte pahalıya geliyor. Kendi bankanı kurmaya karar verdin, dosyalar hazır. Sermaye ve yol parası için 50 milyon euro gerekiyor.",
          "Series C turuna iki ay geç çıkıyorsun ve Ukrayna'da savaş başlıyor. Ocak'ta senden daha agresif bir büyüme planı isteyen fonlar, altı hafta sonra dört yıl yerine bir yılda kâra geçip geçemeyeceğini soruyor."
        ],
        options: [
          {
            key: "A",
            text: "Masrafları keser, ekibi küçültür, stratejiyi bir yılda kâra göre yeniden yazarsın."
          },
          {
            key: "B",
            text: "Lisans planını rafa kaldırır, banka ortağınla fiyatı yeniden konuşursun."
          },
          {
            key: "C",
            text: "Hesap ve kart için ücret almaya başlarsın. Bir kısım müşteriyi kaybetmeyi göze alırsın."
          }
        ],
        record: "A",
        reveal: [
          "Nuri A'yı seçti. Mayıs sonunda çalışanların yüzde 20'siyle yollar ayrıldı ve kitlesel pazara dönük yeni bir ürün yol haritası çizildi. CEO bunun şirket tarihindeki en zor karar olduğunu yazdı.",
          "Kendi lisansına geçmek için doğru zaman hangisiydi? 24 milyon euro yeni toplanmışken ve piyasa yükselirken mi, yoksa fonların geri çekildiği bu günlerde mi?"
        ],
        sources: [
          {
            label: "FinTech Futures, 2019",
            href: "https://www.fintechfutures.com/blockchain-crypto-digital-assets/blockchain-focused-challenger-bitwala-raises-13m"
          },
          {
            label: "BitcoinBlog.de, 2 Ekim 2023",
            href: "https://bitcoinblog.de/2023/10/02/die-berliner-bitcoin-app-bitwala-wagt-den-neustart/"
          },
          {
            label: "Sifted, 6 Haziran 2023",
            href: "https://sifted.eu/articles/nuri-berlin-crypto-bankrupt-lessons"
          },
          {
            label: "The Block, 13 Haziran 2022",
            href: "https://www.theblock.co/post/151737/german-fintech-nuris-bitcoin-interest-product-affected-by-celsius-withdrawal-freeze"
          },
          {
            label: "CEO mektubu, Mayıs 2022",
            href: "https://www.linkedin.com/posts/kristina-walcker-mayer-b3760143_a-letter-from-our-ceo-kristina-activity-6935174808934465536-92mT"
          }
        ]
      },
      {
        date: "2022-06-12",
        when: "12 Haziran 2022, Pazar akşamı",
        label: "Karar 5",
        title: "Celsius çekimleri durduruyor",
        paragraphs: [
          "500 bine yakın müşterin var ve bir kısmının bitcoini şu an Celsius'ta kilitli. Bir yandan da yatırım turu için görüşmeler sürüyor."
        ],
        options: [
          {
            key: "A",
            text: "Faiz hesabını dondurur, müşteriye ne bildiğini açıkça yazar, yatırımcılarla görüşmeye devam edersin."
          },
          {
            key: "B",
            text: "Kilitli bitcoinleri kendi kasandan karşılayacağını açıklarsın. Güveni korursun ama nakdi yakarsın."
          },
          {
            key: "C",
            text: "Müşterilerin adına Celsius'un peşine düşersin. Alacak sürecini sen yürütür, her hafta nerede olduğunu yazarsın."
          }
        ],
        record: "A",
        reveal: [
          "Nuri A'yı seçti. Faiz hesabında çekimler ve yeni yatırımlar durduruldu, diğer bütün özelliklerin çalıştığı duyuruldu. Yine de o hafta haberlerde iki şirketin adı yan yana geçti: Berlinli fintech Nuri ve çekimleri donduran Celsius."
        ],
        sources: [
          {
            label: "The Block, 13 Haziran 2022",
            href: "https://www.theblock.co/post/151737/german-fintech-nuris-bitcoin-interest-product-affected-by-celsius-withdrawal-freeze"
          },
          {
            label: "Startbase, 14 Haziran 2022",
            href: "https://www.startbase.com/news/turbulenzen-bei-nuri/"
          },
          {
            label: "Finance Forward, 13 Haziran 2022",
            href: "https://financefwd.com/de/nuri-celsius/"
          }
        ]
      }
    ],
    records: [
      {
        date: "2022-08-09",
        when: "9 Ağustos 2022",
        label: "Geri sayım",
        paragraphs: [
          "Potansiyel yatırımcı Pavilion Capital de mevcut hissedarlar da kısa vadede gereken parayı bulamadı ve Nuri iflas başvurusu yaptı. Müşterilerin parası Solarisbank'ta durduğu için etkilenmedi.",
          "Kapanış kararı 18 Ekim'de geldi. CEO veda mektubunda ana iş ortaklarından birinin iflasının şirketi uçurumdan ittiğini yazdı ve herkes bunun Celsius olduğunu düşündü.",
          "Müşteriler Vivid Money'ye yönlendirildi, geçenlere yıl sonuna kadar ücretsiz premium üyelik sözü verildi. Kaç kişinin gerçekten geçtiğini ise kimse açıklamadı. Paralarını çekmek için 18 Aralık 2022'ye kadar vakitleri vardı ve Nuri'nin son günü o gün oldu."
        ],
        sources: [
          {
            label: "Startbase, 10 Ağustos 2022",
            href: "https://www.startbase.com/news/nuri-meldet-insolvenz-an/"
          },
          {
            label: "Decrypt, 10 Ağustos 2022",
            href: "https://decrypt.co/107141/german-crypto-bank-nuri-files-insolvency-says-all-funds-are-safe"
          },
          {
            label: "Finance Magnates, 19 Ekim 2022",
            href: "https://www.financemagnates.com/fintech/nuri-previously-bitwala-is-closing-down/"
          },
          {
            label: "FONDS professionell, 19 Ekim 2022",
            href: "https://www.fondsprofessionell.de/news/unternehmen/headline/neobank-vivid-nimmt-kunden-von-insolventem-mitbewerber-auf-219355/"
          },
          {
            label: "The Paypers, 24 Ekim 2022",
            href: "https://thepaypers.com/online-mobile-banking/vivid-money-takes-over-customer-base-from-nuri--1258852"
          }
        ]
      },
      {
        date: "2023-09-18",
        when: "Eylül 2023",
        label: "Yeniden Bitwala",
        paragraphs: [
          "Hikaye orada bitmedi. Eylül 2023'te kurucu ortak Jan Goslicki ile Nuri'nin eski alım satım sorumlusu Dennis Daiber, dokuz kişilik bir ekiple uygulamayı yeniden açtı. İsim yine Bitwala'ydı ve yola Nuri'nin iflas masasından devraldıkları bir parçayla çıkmışlardı.",
          "Yeni Bitwala, Nuri'nin büyürken eklediği her şeyi geride bıraktı. Bankacılık ve borç verme kodunu uygulamadan tamamen çıkardılar. Kasım'da Estonyalı altyapı şirketi Striga ile anlaşıp 29 Avrupa ülkesinde bitcoin ve ether alım satımına döndüler. Goslicki'ye göre müşteriler zaten en çok bitcoin almak, satmak ve harcamak istiyordu."
        ],
        sources: [
          {
            label: "Decrypt, 18 Eylül 2023",
            href: "https://decrypt.co/197596/rising-from-ashes-berlin-crypto-veterans-bitwala-make-surprise-comeback"
          },
          {
            label: "Börsen-Zeitung, 9 Kasım 2023",
            href: "https://www.boersen-zeitung.de/banken-finanzen/bitwala-setzt-comeback-mit-kartengeschaeft-fort"
          },
          {
            label: "PR Newswire, 8 Kasım 2023",
            href: "https://www.prnewswire.com/news-releases/striga-unterstutzt-bitwalas-comeback-in-der-europaischen-krypto-welt-301978916.html"
          }
        ]
      }
    ],
    twist: {
      date: "2023-10-02",
      when: "Ekim 2023",
      label: "Başka bir hikaye",
      paragraphs: [
        "Yeniden açılışın ardından verdiği bir röportajda Daiber, herkesin bildiği hikayeye itiraz etti. Ona göre Celsius'un Nuri'ye ekonomik bir etkisi olmamıştı. Bitcoinler Celsius'taydı ve Nuri'nin bir sorumluluğu yoktu. Celsius'un verdiği zarar itibaraydı.",
        "Finansta itibar her şeydir. Güven bir kez zedelendi mi yerine koymak çok zor."
      ],
      sources: [],
      poll: {
        question: "Peki şirketi asıl durduran neydi? Sence fren neredeydi?",
        options: [
          {
            key: "A",
            text: "Celsius'un açtığı güven yarası"
          },
          {
            key: "B",
            text: "Kapanmayan yatırım turu"
          },
          {
            key: "C",
            text: "Banka ortağına bağımlılık"
          },
          {
            key: "D",
            text: "Hiçbiri. Bence asıl sebep başka"
          }
        ],
        freeKey: "D",
        freeLabel: "Sence asıl sebep neydi?",
        freePlaceholder: "Aklından geçeni yaz. En fazla 250 kelime.",
        counterTemplate: "{n} / 250 kelime",
        emailLabel: "E-postan (isteğe bağlı, cevap istersen)",
        submitLabel: "Cevabımı gönder",
        sendingLabel: "Gönderiliyor",
        privacyLine: "Cevabın bize e-posta olarak gelir, sitede yayınlanmaz.",
        thanks: "Cevabın bize ulaştı, teşekkürler.",
        tooLong: "250 kelimeyi geçtin. Biraz kısaltman gerekiyor.",
        emptyText: "Birkaç kelimeyle de olsa yazman gerekiyor.",
        error: "Gönderilemedi. Birazdan tekrar dene ya da info@fspark9.com adresine yaz.",
        sourceLabel: "Kaynağa bak",
        sourceHref: "https://bitcoinblog.de/2023/10/02/die-berliner-bitcoin-app-bitwala-wagt-den-neustart/"
      }
    },
    view: {
      date: "2023-11-30",
      when: "Görüşümüz",
      label: "fspark9 · Görüşümüz",
      paragraphs: [
        "Bitwala bitcoin kullanıcıları için doğdu ve yeniden doğduğunda yine onlara döndü. Aradaki yedi yılda geniş kitleye açılmak, faiz ürünü ve kendi banka hayali denendi. Hepsi makul fikirlerdi ama hepsi kiralık bir altyapının ve yatırımcı parasının üstüne kuruldu.",
        "Kiralık banka altyapısı seni hızlı başlatır. Müşteri arttıkça maliyeti de artar ve ortağının her sorunu senin de sorunun olur. Bu yolda destek ekibi de müşteri kadar hızlı büyümeli, çünkü para işinde güven cevap hızıyla da ölçülür."
      ]
    },
    service: {
      label: "Hizmet · Ürün ve Strateji",
      heading: "Kendi lisansın ne zaman, hangi ortakla, hangi gelir modeliyle?",
      body: "Nuri'nin masasındaki kararlar bugün birçok fintech'in masasında duruyor. Kendi lisansına geçme zamanını, banka ortağı seçimini ve gelir modelinin bunları taşıyıp taşımadığını Ürün ve Strateji'de ekibinle birlikte, net bir öneriyle bağlıyoruz.",
      ctaLabel: "Ürün ve Strateji'ye göz at",
      service: "product-strategy" as const
    }
  }
};
