import type { Locale, SparkEpisodeStory, SparkHubContent } from "@/types/content";

/**
 * Spark hub ve format sayfalarının metni (v2). Copy §5, §6 ve §6c.
 * Bölümler (Bó) Sanity'de: konu, gün sayısı (computeDayCount), tarih.
 * Buradaki sıradaki sayılar (Nuri, Sector reports Nº 01) Sanity'de
 * `coming` durumlu bölümler olarak duruyor. Site bu metni Sanity'den okuyor; bu dosya seed-v3'ün kaynağı ve
 * check:drift'in karşılaştırdığı ayna.
 *
 * Copy'de TR karşılığı olmayan etiketler (readLabel, showAllLabel,
 * allIssuesLabel) teslim notunda onaya sunuldu.
 */
export const spark: Record<Locale, SparkHubContent> = {
  en: {
    seo: {
      title: "Spark: fintech postmortems and sector reports | fspark9",
      description:
        "Short, sharp formats that get companies moving. The Last Day and sector reports, numbered and dated.",
    },
    bigWord: "Spark",
    heading: "Short, sharp formats that get companies moving.",
    tickerItems: [
      "The Last Day Nº 01 · Bó",
      "The Last Day Nº 02 · Nuri · Coming next",
      "Sector report Nº 01 · In preparation",
    ],
    tickerTail: "Numbered and dated",
    readLabel: "Read",
    backLabel: "Home",
    sparkLabel: "Spark",
    formatsLabel: "Formats",
    launchDateLabel: "[Launch date]",
    episode: {
      yourPickTemplate: "Your pick · {key}",
      roadTemplate: "Road {key}",
      otherRoadsLabel: "Show the other roads",
      noteLabel: "fspark9 note",
      dayTemplate: "Day {n}",
      nextTemplate: "Next: {name}",
      footnoteTemplate: "Source {n}",
      sourceJoiner: ", and ",
    },
    formats: [
      {
        number: "01",
        name: "The Last Day",
        slug: "the-last-day",
        status: "live",
        seo: {
          title: "The Last Day: stories of fintechs and banks that closed | fspark9",
          description: "Stories of fintechs and banks that closed. In every episode, the key calls are yours.",
        },
        description: "The last months of fintechs and banks that closed, read from the public record.",
        openLabel: "Open The Last Day",
        comingIssues: [{ number: "Nº 02", subject: "Nuri", hook: "Formerly Bitwala. Germany.", statusLabel: "Coming next" }],
        allIssuesLabel: "All {n} issues",
        daysUnit: "days",
        line: "Stories of fintechs and banks that closed. In every episode, the key calls are yours.",
        startLabel: "First story: Bó",
        howLabel: "How to read",
        howHeading: "A ten minute story. A few hard calls along the way.",
        howSteps: [
          { title: "Read the story.", body: "A product's road from idea to last day, in short chapters." },
          {
            title: "Make the call.",
            body: "At key moments we stop and ask: if the company were yours, what would you do? We talk it through based on your choice.",
          },
          {
            title: "Back to your own plan.",
            body: "Every episode ends with a few clear lessons you can use on your own product.",
          },
        ],
        episodesLabel: "Episodes",
        closeHeading: "If your story is just starting, let's talk.",
      },
      {
        number: "02",
        name: "Sector reports",
        slug: "sector-reports",
        status: "preparing",
        seo: {
          title: "Sector reports | fspark9 Spark",
          description: "Market reads with our own notes and a clear view at the end. The first report is in preparation.",
        },
        description: "Market reads with our own notes and a clear view at the end.",
        preparingLine: "First issue in preparation",
        comingIssues: [
          { number: "Nº 01", subject: "Sector reports", hook: "", statusLabel: "In preparation" },
        ],
        allIssuesLabel: "All {n} issues",
        daysUnit: "days",
        line: "Market reads with our own notes and a clear view at the end.",
        howSteps: [],
        episodesLabel: "Issues",
      },
    ],
  },
  tr: {
    seo: {
      title: "Spark: fintech otopsileri ve sektör raporları | fspark9",
      description:
        "Şirketleri harekete geçiren kısa ve net formatlar. Son Gün ve sektör raporları, numaralı ve tarihli.",
    },
    bigWord: "Spark",
    heading: "Şirketleri harekete geçiren kısa ve net formatlar.",
    tickerItems: [
      "Son Gün Nº 01 · Bó",
      "Son Gün Nº 02 · Nuri · Sırada",
      "Sektör raporu Nº 01 · Hazırlanıyor",
    ],
    tickerTail: "Numaralı ve tarihli",
    readLabel: "Okuyun",
    backLabel: "Ana sayfa",
    sparkLabel: "Spark",
    formatsLabel: "Formatlar",
    launchDateLabel: "[Canlıya çıkış tarihi]",
    episode: {
      yourPickTemplate: "Sizin seçiminiz · {key}",
      roadTemplate: "{key} yolu",
      otherRoadsLabel: "Diğer yolları da göster",
      noteLabel: "fspark9 notu",
      dayTemplate: "Gün {n}",
      nextTemplate: "Sıradaki: {name}",
      footnoteTemplate: "Kaynak {n}",
      sourceJoiner: " ve ",
    },
    formats: [
      {
        number: "01",
        name: "Son Gün",
        slug: "son-gun",
        status: "live",
        seo: {
          title: "Son Gün: kapanan fintech ve bankaların hikâyeleri | fspark9",
          description: "Kapanan fintech ve bankaların hikâyeleri. Her bölümde kritik kararları siz veriyorsunuz.",
        },
        description: "Kapanan fintech ve bankaların son aylarını kamuya açık kayıtlardan okuyoruz.",
        openLabel: "Son Gün’ü açın",
        comingIssues: [{ number: "Nº 02", subject: "Nuri", hook: "Eski adıyla Bitwala. Almanya.", statusLabel: "Sırada" }],
        allIssuesLabel: "{n} sayının tümü",
        daysUnit: "gün",
        line: "Kapanan fintech ve bankaların hikâyeleri. Her bölümde kritik kararları siz veriyorsunuz.",
        startLabel: "İlk hikâye: Bó",
        howLabel: "Nasıl okunur",
        howHeading: "On dakikalık bir hikâye. Arada birkaç zor karar.",
        howSteps: [
          { title: "Hikâyeyi okuyun.", body: "Bir ürünün fikirden son güne kadar yolu, kısa bölümler halinde." },
          {
            title: "Kararı siz verin.",
            body: "Kritik anlarda duruyoruz. Şirket sizin olsaydı ne yapardınız? Seçiminize göre konuşuyoruz.",
          },
          {
            title: "Kendi planınıza dönün.",
            body: "Her bölüm, kendi ürününüz için işe yarayacak birkaç net dersle biter.",
          },
        ],
        episodesLabel: "Bölümler",
        closeHeading: "Kendi hikâyenizin başındaysanız konuşalım.",
      },
      {
        number: "02",
        name: "Sektör raporları",
        slug: "sektor-raporlari",
        status: "preparing",
        seo: {
          title: "Sektör raporları | fspark9 Spark",
          description: "Kendi notlarımızla pazar okumaları, sonunda net bir görüş. İlk rapor hazırlanıyor.",
        },
        description: "Kendi notlarımızla pazar okumaları, sonunda net bir görüş.",
        preparingLine: "İlk sayı hazırlanıyor",
        comingIssues: [{ number: "Nº 01", subject: "Sektör raporları", hook: "", statusLabel: "Hazırlanıyor" }],
        allIssuesLabel: "{n} sayının tümü",
        daysUnit: "gün",
        line: "Kendi notlarımızla pazar okumaları, sonunda net bir görüş.",
        howSteps: [],
        episodesLabel: "Sayılar",
      },
    ],
  },
};

const SOURCES = {
  finextra: "https://www.finextra.com/newsarticle/34850/natwest-launches-digital-challenger-b",
  wikipedia: "https://en.wikipedia.org/wiki/B%C3%B3_(bank)",
  fintechFutures: "https://www.fintechfutures.com/challenger-banks/rbs-neobank-b-reissues-cards-due-to-authentication-issue",
  techCrunch: "https://techcrunch.com/2020/05/01/bo-shutter/",
  computerWeekly:
    "https://www.computerweekly.com/news/252482560/NatWest-Bank-shutters-its-app-based-bank-after-five-months",
  verdict: "https://www.verdict.co.uk/bo-digital-bank-rbs-natwest/",
};

/**
 * Son Gün bölümleri (v3, prototip _design/v2/boards/son-gun-01-bo-v3.html).
 * TR metin prototipten, EN metin brief'in 6. bölümünden. Paragraflardaki
 * "[n]" kaynak listesindeki n'inci kaynağa dipnot. Site bunları Sanity'den
 * (sparkEpisode) okuyor; bu dizi seed-v3'ün kaynağı ve check:drift'in aynası.
 * Anahtar EN bölüm slug'ı ("01-bo").
 */
export const sparkEpisodes: Record<Locale, Record<string, SparkEpisodeStory>> = {
  en: {
    "01-bo": {
      number: 1,
      subject: "Bó",
      hook: "The digital bank that came out of a bank. United Kingdom.",
      seo: {
        title: "Bó: 156 days of a yellow card | The Last Day",
        description:
          "A bank built a new bank inside itself. 156 days later it closed. The story, and the calls you would have made.",
      },
      hero: {
        label: "The Last Day · Nº 01",
        title: "A bank built a new bank inside itself.",
        sub: "The card was yellow and portrait. The slogan was Do Money Better. It closed 156 days later.",
        invite:
          "In this story, you are the one building the bank. At four key moments the call is yours. Decide first, then we will look at what happened.",
        startLabel: "Let's begin",
        cardDay: "000",
        cardState: "Day 000 · 27.11.2019",
      },
      chapters: [
        {
          id: "ch1",
          label: "Chapter 1 · Before launch",
          title: "The idea",
          lead: "In the UK, banking was moving onto the phone. New names like Monzo and Starling were the talk of the market.",
          paragraphs: [
            "The RBS group, today's NatWest Group, was preparing its own answer: a digital bank with its own name, its own brand and its own app. It would be called Bó.",
            "This is where the first big question comes up. Before what the product will be, how it gets built.",
          ],
          card: { mode: "draft", day: "?", state: "Not yet", caption: "Before launch", barTitle: "Idea" },
          decision: {
            label: "You're building the bank",
            question: "How would you build the new digital bank?",
            options: [
              {
                key: "A",
                text: "On the parent bank's licence, from inside the group.",
                answer:
                  "The fast road. No waiting for a licence, the balance sheet and the trust are already there. But the parent's processes come in the box too: compliance, risk, approval chains. You gain speed and give up some agility.",
              },
              {
                key: "B",
                text: "Separate licence, separate company. From scratch.",
                answer:
                  "A clean sheet. Your own culture, your own pace. The price is time: the licence process stretches the plan, launch day moves back, and the market doesn't wait.",
              },
              {
                key: "C",
                text: "Partner with, or buy, an existing fintech.",
                answer:
                  "Possibly the fastest road. But you also buy someone else's product, tech debt and culture. Here, choosing the partner is everything.",
              },
            ],
            didLabel: "What Bó did",
            didTitle: "It took road A.",
            didBody: [
              "Bó ran on the parent bank's licence. It was built in the cloud and had its own Faster Payments connection. Development was reported at 18 months and a £100m budget.[1]",
              "On 27 November 2019, after a beta period with staff, it opened to everyone.[1]",
            ],
            note: "All three roads have good examples. What matters is which one fits your goal: speed, independence or a ready customer base? If that answer isn't written down before launch, the same debate reopens at the first hard moment.",
            services: [
              { name: "Zero to Live", service: "zero-to-live" },
              { name: "Partner selection", service: "zero-to-live" },
            ],
          },
        },
        {
          id: "ch2",
          label: "Chapter 2 · Day 000",
          title: "The promise",
          lead: "On launch day there's a bright yellow, portrait card in your hand. The promise is clear: Do Money Better.",
          paragraphs: [
            "The aim is to help people who struggle to manage their money.[4] The app has real time spending alerts, a savings pot and free card use abroad.[5] There's no overdraft and no joint account.[1]",
            "In the same period, Monzo and Starling offer similar features in their apps.[5] The stage is crowded.",
          ],
          card: { mode: "live", day: "000", state: "27 November 2019", caption: "Launch day", barTitle: "Promise" },
          decision: {
            label: "The promise is yours to write",
            question: "You're entering a crowded market. How would you stand out?",
            options: [
              {
                key: "A",
                text: "Same features, a better experience.",
                answer:
                  "Experience makes a difference, but it is also easy to copy. A rival catches up in the next release. On this road your speed matters as much as your product.",
              },
              {
                key: "B",
                text: "Pick a narrow, clear audience and solve their problem better than anyone.",
                answer:
                  "You start small and go deep. A product that solves one group's problem best grows by word of mouth. The hard part is staying patient while the numbers look small in the first months.",
              },
              {
                key: "C",
                text: "Start with the parent bank's existing customers.",
                answer:
                  "Your biggest card is already in your hand: trust and distribution. The hard part is managing two brands pulling at each other's customers.",
              },
            ],
            didLabel: "What Bó did",
            didTitle: "It went to the app stores as an app open to everyone.",
            didBody: ["On the App Store and Google Play, with its own brand and its own promise.[1]"],
            note: "In digital banking a feature list doesn't make the difference on its own. The difference is what the customer feels in the first week. The hard part of a strong promise is that a rival can say the same sentence. So behind the promise there has to be something others can't easily do.",
            services: [{ name: "Product & Strategy", service: "product-strategy" }],
          },
        },
        {
          id: "ch3",
          label: "Chapter 3 · Day 037",
          title: "A line on the calendar",
          lead: "37 days after launch there's a date on the calendar: 3 January 2020.",
          paragraphs: [
            "Europe's payments rule PSD2 and its strong customer authentication requirement reach cards too. Cards issued after this date meet the new requirements. Earlier ones don't.[2]",
            "So the card in the pocket of the first customers, the ones who believed in the product most, has to change.",
          ],
          card: { mode: "live", day: "037", state: "3 January 2020", caption: "A line on the calendar", barTitle: "Calendar" },
          decision: {
            label: "This call is yours",
            question: "Your first customers' cards have to change. How would you handle it?",
            options: [
              {
                key: "A",
                text: "Send the new card and switch off the old one on a set date. Clean and quick.",
                answer:
                  "Operationally the simplest road. But from the customer's side, someone who just arrived is activating a second time before settling in. Every extra step is a door out.",
              },
              {
                key: "B",
                text: "Turn it into a moment. The new card arrives with a small surprise and a personal note.",
                answer:
                  "Turning a required job into a relationship. It costs a bit more, but first customers are a brand's best ambassadors. This road can be how you win them.",
              },
              {
                key: "C",
                text: "Build the launch date around this line from the start.",
                answer:
                  "The cheapest fix is always the one seen on the calendar in advance. Sometimes it means a few weeks' slip, sometimes no problem at all. What matters is having the date in the plan from day one.",
              },
            ],
            didLabel: "What Bó did",
            didTitle: "6,000 cards were reissued.",
            didBody: [
              "Announced on 5 February 2020. Customers who opened accounts after 3 January already had a compliant card. The earlier cards were switched off on 14 March 2020.[2]",
            ],
            note: "Reissuing cards looks like a plastic cost. The real price is paid on the customer side. Next to every launch plan there should be a compliance calendar: which rule changes which card, which flow, in the next twelve months? That conversation with card and payment partners happens before launch.",
            services: [
              { name: "Compliance bridge", service: "zero-to-live" },
              { name: "Partner management", service: "zero-to-live" },
            ],
          },
        },
        {
          id: "ch4",
          label: "Chapter 4 · Day 108",
          title: "Spring",
          lead: "March 2020. The old cards are switched off, and the world changes overnight.",
          paragraphs: ["The UK goes into lockdown on 23 March. The product isn't even four months old."],
          card: { mode: "flipped", day: "108", state: "14 March 2020", caption: "The world is changing", barTitle: "Spring" },
          decision: {
            label: "You're at the wheel",
            question: "The product is 108 days old and everything is uncertain. What would you do?",
            options: [
              {
                key: "A",
                text: "Push harder. Everyone is at home, it's digital banking's moment.",
                answer:
                  "Bold, and sometimes right. But pushing for growth in uncertainty is the road that burns the most budget on the hardest days. First you need to know which number proves what.",
              },
              {
                key: "B",
                text: "Slow down, cut costs, wait for the uncertainty to pass.",
                answer:
                  "You gain cash and patience. The price is momentum: in a product that slows down, both the team and the customers can lose faith in the story.",
              },
              {
                key: "C",
                text: "Move the team and the technology to a bigger goal inside the group.",
                answer:
                  "Protecting what was built along the way rather than the product itself. The team, the infrastructure, the learning. That's the biggest advantage of being inside a group.",
              },
            ],
            didLabel: "What happened",
            didTitle: "Day 156. 1 May 2020.",
            didBody: [
              "On the day NatWest Group announced its first quarter results, it also announced that Bó would close. It had 11,413 customers that day. Customers were given 60 days to move their money.[3]",
              "The team moved to Mettle, the group's business banking app.[3] NatWest's then CEO Alison Rose told journalists that Bó had not failed and would be merged with Mettle.[5]",
            ],
            note: "Closing is a decision too, and often the hardest one. In this story the team and the technology didn't disappear, they moved to another product. A team that writes down up front what happens if a given number isn't reached by a given date lives this moment with a plan, not in a panic.",
            services: [{ name: "Product & Strategy", service: "product-strategy" }],
          },
        },
        {
          id: "ch5",
          label: "Chapter 5 · Day 156",
          title: "What 156 days leave behind",
          lead: "The yellow card isn't in anyone's pocket anymore. But the decisions made in those 156 days are still in front of many teams today.",
          paragraphs: [],
          card: { mode: "closed", day: "156", state: "Last day", caption: "1 May 2020", barTitle: "Last day" },
        },
      ],
      interlude: {
        afterChapter: "ch3",
        text: "The cards changed. The story goes on.",
        card: { mode: "flipped", day: "070", state: "New card", caption: "6,000 cards reissued", barTitle: "New card" },
      },
      lessons: [
        {
          heading: "The road comes before the product.",
          body: "Licence, structure and partner choice set the product's speed, cost and flexibility from day one.",
        },
        {
          heading: "The promise has to be felt in the first week.",
          body: "In a crowded market customers don't compare features. They notice where they feel better.",
        },
        {
          heading: "The calendar needs the rules' dates too.",
          body: "Read the launch plan and the compliance calendar together. Otherwise your most loyal customers walk through the door twice.",
        },
      ],
      finalQuestion: {
        label: "One last question",
        title: "So what's in front of you right now?",
        ctaLabel: "Book a call",
        options: [
          {
            text: "I'm building a fintech or digital bank from scratch.",
            service: "zero-to-live",
            serviceName: "Zero to Live",
            heading: "From idea to the first live product.",
            body: "I work with your team from structure, licence and partner choice through to launch. The first decision in this story becomes our first week.",
          },
          {
            text: "We're launching a new product at our bank or fintech.",
            service: "product-strategy",
            serviceName: "Product & Strategy",
            heading: "A new product with a clear promise.",
            body: "We write together who it's for, why, and how it stands out. Which number proves what, by which date, is part of the plan.",
          },
          {
            text: "We want to offer a financial product to our customers under our own brand.",
            service: "embedded-finance",
            serviceName: "Embedded Finance",
            heading: "Your customers are already with you.",
            body: "We place the financial product quietly inside your brand, with the right partner, the right flow and a business model that moves revenue.",
          },
          {
            text: "We're expanding into a new market.",
            service: "expansion-gtm",
            serviceName: "Expansion & GTM",
            heading: "New market, new rules.",
            body: "Not everything that works at home works in a new market. We get the rules, the partners and the go to market plan clear before launch.",
          },
        ],
      },
      next: { number: "Nº 02", name: "Nuri", line: "Formerly Bitwala. A story from Germany." },
      sourcesLabel: "This story is built from public reporting",
      sources: [
        {
          n: 1,
          links: [
            { label: "Finextra, launch report", href: SOURCES.finextra },
            { label: "Wikipedia, Bó (bank)", href: SOURCES.wikipedia },
          ],
        },
        { n: 2, links: [{ label: "FinTech Futures, 5 February 2020", href: SOURCES.fintechFutures }] },
        { n: 3, links: [{ label: "TechCrunch, 1 May 2020", href: SOURCES.techCrunch }] },
        { n: 4, links: [{ label: "Computer Weekly, May 2020", href: SOURCES.computerWeekly }] },
        { n: 5, links: [{ label: "Verdict, May 2020", href: SOURCES.verdict }] },
      ],
      correctionLine: "If you spot an error, write to info@fspark9.com and we'll fix it and note the change.",
      closeHeading: "If your story is just starting, let's build it together.",
    },
  },
  tr: {
    "01-bo": {
      number: 1,
      subject: "Bó",
      hook: "Bir bankanın içinden çıkan dijital banka. Birleşik Krallık.",
      seo: {
        title: "Bó: sarı kartın 156 günü | Son Gün",
        description:
          "Bir banka kendi içinden yeni bir banka çıkardı. 156 gün sonra kapandı. Hikâyesi ve sizin vereceğiniz kararlar.",
      },
      hero: {
        label: "Son Gün · Nº 01",
        title: "Bir banka, kendi içinden yeni bir banka çıkardı.",
        sub: "Kartı sarı ve dikeydi. Sloganı Do Money Better'dı. 156 gün sonra kapandı.",
        invite:
          "Bu hikâyede bankayı siz kuruyorsunuz. Dört kritik anda son söz sizde. Önce siz karar verin, sonra ne olduğuna birlikte bakalım.",
        startLabel: "Başlayalım",
        cardDay: "000",
        cardState: "Gün 000 · 27.11.2019",
      },
      chapters: [
        {
          id: "ch1",
          label: "Bölüm 1 · Lansmandan önce",
          title: "Fikir",
          lead: "Birleşik Krallık'ta bankacılık telefona taşınıyordu. Monzo ve Starling gibi yeni isimler konuşuluyordu.",
          paragraphs: [
            "RBS grubu, bugünkü adıyla NatWest Group, kendi cevabını hazırlıyordu. Ayrı adı, ayrı markası, ayrı uygulaması olan bir dijital banka. Adı Bó olacaktı.",
            "Burada ilk büyük soru çıkıyor. Ürünün ne olacağından önce, nasıl kurulacağı.",
          ],
          card: { mode: "draft", day: "?", state: "Henüz yok", caption: "Lansmandan önce", barTitle: "Fikir" },
          decision: {
            label: "Bankayı siz kuruyorsunuz",
            question: "Yeni dijital bankayı nasıl kurardınız?",
            options: [
              {
                key: "A",
                text: "Ana bankanın lisansıyla, grubun içinden.",
                answer:
                  "Hızlı yol. Lisans beklemezsiniz, bilanço ve güven hazır. Ama ana bankanın süreçleri de pakete dahil: uyum, risk, onay zincirleri. Hız kazanırsınız, çeviklikten biraz verirsiniz.",
              },
              {
                key: "B",
                text: "Ayrı lisans, ayrı şirket. Sıfırdan.",
                answer:
                  "Temiz sayfa. Kendi kültürünüz, kendi hızınız. Bedeli zaman: lisans süreci takvimi uzatır, lansman günü ileri kayar ve o sırada pazar beklemez.",
              },
              {
                key: "C",
                text: "Hazır bir fintech'le ortaklık ya da satın alma.",
                answer:
                  "En hızlı yol olabilir. Ama başkasının ürününü, teknik borcunu ve kültürünü de satın alırsınız. Burada partner seçimi her şeydir.",
              },
            ],
            didLabel: "Bó ne yaptı",
            didTitle: "A yolunu seçti.",
            didBody: [
              "Bó, ana bankanın lisansıyla çalıştı. Bulut üzerinde kurulmuştu ve kendi Faster Payments bağlantısı vardı. Geliştirmenin 18 ay sürdüğü, bütçenin 100 milyon sterlin olduğu basına yansıdı.[1]",
              "27 Kasım 2019'da, çalışanlarla yapılan bir beta döneminin ardından herkese açıldı.[1]",
            ],
            note: "Üç yolun da iyi örnekleri var. Asıl mesele hangisinin sizin hedefinize uyduğu: hız mı, bağımsızlık mı, hazır müşteri mi? Bu cevap lansmandan önce yazılı değilse, ilk zorlukta aynı tartışma yeniden açılır.",
            services: [
              { name: "Zero to Live", service: "zero-to-live" },
              { name: "Partner seçimi", service: "zero-to-live" },
            ],
          },
        },
        {
          id: "ch2",
          label: "Bölüm 2 · Gün 000",
          title: "Vaat",
          lead: "Lansman günü elinizde parlak sarı, dikey bir kart var. Vaat net: Do Money Better.",
          paragraphs: [
            "Hedef, parasını yönetmekte zorlanan insanlara yardım etmek.[4] Uygulamada anlık harcama bildirimleri, birikim için bir kumbara ve yurt dışında ücretsiz kart kullanımı var.[5] Kredili hesap ve ortak hesap ise yok.[1]",
            "Aynı dönemde Monzo ve Starling'in uygulamalarında da benzer özellikler bulunuyor.[5] Yani sahne kalabalık.",
          ],
          card: { mode: "live", day: "000", state: "27 Kasım 2019", caption: "Lansman günü", barTitle: "Vaat" },
          decision: {
            label: "Vaadi siz yazıyorsunuz",
            question: "Kalabalık bir pazara giriyorsunuz. Neyle öne çıkardınız?",
            options: [
              {
                key: "A",
                text: "Aynı özellikler, daha iyi bir deneyim.",
                answer:
                  "Deneyim fark yaratır, ama kopyalanması da kolaydır. Rakip bir sonraki sürümde yetişir. Bu yolda hızınız ürününüz kadar önemli.",
              },
              {
                key: "B",
                text: "Dar ve net bir kitle seçer, onun derdini herkesten iyi çözerim.",
                answer:
                  "Küçük başlar, derine inersiniz. Belli bir kitlenin derdini en iyi çözen ürün ağızdan ağıza büyür. Zor tarafı, ilk aylarda sayıların küçük görünmesine sabretmek.",
              },
              {
                key: "C",
                text: "Ana bankanın mevcut müşterilerinden başlarım.",
                answer:
                  "En büyük kozunuz zaten elinizde: güven ve dağıtım. Zor tarafı, iki markanın birbirinin müşterisini çekiştirmesini yönetmek.",
              },
            ],
            didLabel: "Bó ne yaptı",
            didTitle: "Herkese açık bir uygulama olarak mağazalara çıktı.",
            didBody: ["App Store ve Google Play'de, kendi markası ve kendi vaadiyle.[1]"],
            note: "Dijital bankacılıkta özellik listesi tek başına fark yaratmıyor. Fark, müşterinin ilk haftada hissettiği şey. Güçlü bir vaadin zor tarafı şu: rakip de aynı cümleyi kurabilir. Bu yüzden vaadin arkasında, başkasının kolayca yapamayacağı bir şey durmalı.",
            services: [{ name: "Product & Strategy", service: "product-strategy" }],
          },
        },
        {
          id: "ch3",
          label: "Bölüm 3 · Gün 037",
          title: "Takvimdeki çizgi",
          lead: "Lansmandan 37 gün sonra takvimde bir tarih var: 3 Ocak 2020.",
          paragraphs: [
            "Avrupa'nın ödeme kuralı PSD2 ve onun güçlü müşteri doğrulaması şartı kartları da kapsıyor. Bu tarihten sonra basılan kartlar yeni şartlara uygun. Öncesindekiler değil.[2]",
            "Yani ilk haftalarda gelen, ürüne en çok inanan müşterilerin cebindeki kart değişmek zorunda.",
          ],
          card: { mode: "live", day: "037", state: "3 Ocak 2020", caption: "Takvimde bir çizgi", barTitle: "Takvim" },
          decision: {
            label: "Bu karar sizin",
            question: "İlk müşterilerinizin kartı değişecek. Nasıl yönetirdiniz?",
            options: [
              {
                key: "A",
                text: "Yeni kartı gönderir, eskisini bir tarihte kapatırım. Temiz ve hızlı.",
                answer:
                  "Operasyonel olarak en sade yol. Ama müşteri gözünden yeni gelmiş biri, alışmadan ikinci kez aktivasyon yapıyor. Her ek adım, vazgeçilebilecek bir kapı.",
              },
              {
                key: "B",
                text: "Bunu bir fırsata çeviririm. Yeni kartla birlikte küçük bir sürpriz, kişisel bir mesaj.",
                answer:
                  "Zorunlu bir işi ilişkiye çevirmek. Maliyeti biraz artar ama ilk müşteriler bir markanın en iyi elçileridir. Bu yol onları kazanmanın yolu olabilir.",
              },
              {
                key: "C",
                text: "Lansman tarihini baştan bu çizgiye göre kurarım.",
                answer:
                  "En ucuz çözüm takvimde önceden görülen çözümdür. Bazen birkaç haftalık kayma demek, bazen hiç sorun çıkmaz. Önemli olan tarihin baştan planda durması.",
              },
            ],
            didLabel: "Bó ne yaptı",
            didTitle: "6.000 kart yeniden basıldı.",
            didBody: [
              "5 Şubat 2020'de duyuruldu. 3 Ocak'tan sonra hesap açanlara uyumlu kart zaten gitmişti. Önceki kartlar 14 Mart 2020'de kapandı.[2]",
            ],
            note: "Kart yenilemek plastik maliyeti gibi görünür. Asıl bedel müşteri tarafında ödenir. Bir lansman planının yanında her zaman bir uyum takvimi durmalı: önümüzdeki on iki ayda hangi kural, hangi kartı, hangi akışı değiştiriyor? Kart ve ödeme partnerleriyle bu konuşma lansmandan önce yapılır.",
            services: [
              { name: "Uyum köprüsü", service: "zero-to-live" },
              { name: "Partner yönetimi", service: "zero-to-live" },
            ],
          },
        },
        {
          id: "ch4",
          label: "Bölüm 4 · Gün 108",
          title: "Bahar",
          lead: "Mart 2020. Eski kartlar kapanıyor ve dünya da bir anda değişiyor.",
          paragraphs: ["Birleşik Krallık 23 Mart'ta evlere kapanıyor. Ürün henüz dört aylık bile değil."],
          card: { mode: "flipped", day: "108", state: "14 Mart 2020", caption: "Dünya değişiyor", barTitle: "Bahar" },
          decision: {
            label: "Direksiyon sizde",
            question: "Ürün 108 günlük ve her şey belirsiz. Ne yapardınız?",
            options: [
              {
                key: "A",
                text: "Gaza basarım. Herkes evde, dijital bankacılığın tam zamanı.",
                answer:
                  "Cesur ve bazen doğru. Ama belirsizlikte büyümeye yüklenmek, bütçeyi en zor günlerde en çok yakan yoldur. Önce hangi sayının neyi kanıtlayacağını bilmek gerekir.",
              },
              {
                key: "B",
                text: "Yavaşlar, masrafı keser, belirsizliğin geçmesini beklerim.",
                answer:
                  "Nakit ve sabır kazanırsınız. Bedeli ivme: yavaşlayan bir üründe ekip de, müşteri de hikâyeye olan inancını kaybedebilir.",
              },
              {
                key: "C",
                text: "Ekibi ve teknolojiyi grubun daha büyük bir hedefine taşırım.",
                answer:
                  "Ürünün kendisini değil, ürünü kurarken biriken şeyi korumak. Ekip, altyapı, öğrenilenler. Bir grubun içinde olmanın en büyük avantajı bu.",
              },
            ],
            didLabel: "Ne oldu",
            didTitle: "Gün 156. 1 Mayıs 2020.",
            didBody: [
              "NatWest Group ilk çeyrek sonuçlarını açıkladığı gün Bó'nun kapanacağını da duyurdu. O gün 11.413 müşteri vardı. Müşterilere paralarını taşımaları için 60 gün verildi.[3]",
              "Ekip, grubun işletme bankacılığı uygulaması Mettle'a geçti.[3] NatWest'in o dönemki CEO'su Alison Rose gazetecilere Bó'nun başarısız olmadığını, Mettle ile birleşeceğini söyledi.[5]",
            ],
            note: "Kapatmak da bir karardır ve çoğu zaman en zoru. Bu hikâyede ekip ve teknoloji yok olmadı, başka bir ürüne taşındı. Hangi sayı hangi tarihte görülmezse ne yapılacağını baştan yazan ekip, bu anı panikle değil planla yaşar.",
            services: [{ name: "Product & Strategy", service: "product-strategy" }],
          },
        },
        {
          id: "ch5",
          label: "Bölüm 5 · Gün 156",
          title: "156 günden kalanlar",
          lead: "Sarı kart artık kimsenin cebinde değil. Ama o 156 günde verilen kararlar bugün de birçok ekibin önünde.",
          paragraphs: [],
          card: { mode: "closed", day: "156", state: "Son gün", caption: "1 Mayıs 2020", barTitle: "Son gün" },
        },
      ],
      interlude: {
        afterChapter: "ch3",
        text: "Kartlar değişti. Hikâye devam ediyor.",
        card: { mode: "flipped", day: "070", state: "Yeni kart", caption: "6.000 kart yenilendi", barTitle: "Yeni kart" },
      },
      lessons: [
        {
          heading: "Yol, üründen önce gelir.",
          body: "Lisans, yapı ve partner seçimi ürünün hızını, maliyetini ve esnekliğini ilk günden belirler.",
        },
        {
          heading: "Vaat ilk haftada hissedilmeli.",
          body: "Kalabalık bir pazarda müşteri özellikleri karşılaştırmaz. Kendini nerede daha iyi hissettiğine bakar.",
        },
        {
          heading: "Takvimde kuralların tarihi de olmalı.",
          body: "Lansman planı ile uyum takvimi birlikte okunmalı. Aksi halde en sadık müşteri iki kez kapıdan geçer.",
        },
      ],
      finalQuestion: {
        label: "Son bir soru",
        title: "Peki şu an sizin önünüzde ne var?",
        ctaLabel: "Görüşme ayarla",
        options: [
          {
            text: "Sıfırdan bir fintech ya da dijital banka kuruyorum.",
            service: "zero-to-live",
            serviceName: "Zero to Live",
            heading: "Fikirden ilk canlı ürüne.",
            body: "Yapı, lisans ve partner seçiminden lansmana kadar ekibinizle birlikte çalışırım. Bu hikâyedeki ilk karar, bizim ilk haftamız olur.",
          },
          {
            text: "Mevcut bankamızda ya da fintech'imizde yeni bir ürün çıkarıyoruz.",
            service: "product-strategy",
            serviceName: "Product & Strategy",
            heading: "Yeni ürün, net bir vaat.",
            body: "Kime, neden ve neyle öne çıkacağınızı birlikte yazarız. Hangi sayının hangi tarihte neyi kanıtlayacağı da bu planın parçası.",
          },
          {
            text: "Müşterilerimize kendi markamızla finansal bir ürün sunmak istiyoruz.",
            service: "embedded-finance",
            serviceName: "Embedded Finance",
            heading: "Müşteriniz zaten sizde.",
            body: "Finansal ürünü markanızın içine sessizce yerleştiririz. Doğru partner, doğru akış ve gelire dokunan bir iş modeliyle.",
          },
          {
            text: "Yeni bir pazara açılıyoruz.",
            service: "expansion-gtm",
            serviceName: "Expansion & GTM",
            heading: "Yeni pazar, yeni kurallar.",
            body: "Evde işe yarayan her şey yeni pazarda işe yaramaz. Kuralları, partnerleri ve pazara giriş planını lansmandan önce netleştiririz.",
          },
        ],
      },
      next: { number: "Nº 02", name: "Nuri", line: "Eski adıyla Bitwala. Almanya'dan bir hikâye." },
      sourcesLabel: "Bu hikâye kamuya açık haberlerden derlendi",
      sources: [
        {
          n: 1,
          links: [
            { label: "Finextra, lansman haberi", href: SOURCES.finextra },
            { label: "Wikipedia, Bó (bank)", href: SOURCES.wikipedia },
          ],
        },
        { n: 2, links: [{ label: "FinTech Futures, 5 Şubat 2020", href: SOURCES.fintechFutures }] },
        { n: 3, links: [{ label: "TechCrunch, 1 Mayıs 2020", href: SOURCES.techCrunch }] },
        { n: 4, links: [{ label: "Computer Weekly, Mayıs 2020", href: SOURCES.computerWeekly }] },
        { n: 5, links: [{ label: "Verdict, Mayıs 2020", href: SOURCES.verdict }] },
      ],
      correctionLine: "Bir yerde hata görürseniz info@fspark9.com adresine yazın, düzeltip notunu düşeriz.",
      closeHeading: "Sizin hikâyeniz daha başındaysa, birlikte kuralım.",
    },
  },
};
