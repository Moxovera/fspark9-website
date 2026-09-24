import type { HomeContent, Locale } from "@/types/content";

/**
 * Ana sayfa (v2). Kaynak: `_design/v2/fspark9-site-copy-v2.md` §1 ve §6c.
 * Site bu metni Sanity'den okuyor; bu dosya seed-v3'ün kaynağı ve
 * check:drift'in karşılaştırdığı ayna.
 *
 * Spark kartları Sanity'de bölümlerden kuruluyor; Bó kartındaki tarih
 * publishedAt'ten, buradaki değer aynı tarihin yazılı hali.
 */
export const home: Record<Locale, HomeContent> = {
  en: {
    seo: {
      title: "fspark9 · Fintech and digital banking advisory, Berlin",
      description:
        "I’ve built two digital banks. I work with fintechs, banks and companies that want to launch a financial product, and stay until it’s live.",
    },
    opening: {
      eyebrowParts: ["Mehmet Burak Dikmen", "Fintech and digital banking", "Berlin"],
      headlineSentences: ["I help teams get financial products live."],
      cutWord: "live.",
      intro:
        "I work with fintechs, banks and companies that want to launch a financial product. I join your team and stay until it’s live.",
      ctaLabel: "Book a call",
      secondaryLinkLabel: "See what I do",
      portraitAlt: "Mehmet Burak Dikmen",
    },
    startWhereYouAre: {
      label: "01 · Which one are you?",
      heading: "Start where you are.",
      text: "Most people who call me are in one of three places.",
      items: [
        {
          title: "I run a fintech",
          text: "The product, the bank partner, the regulator and the app are all moving at different speeds. Someone has to pull them together.",
        },
        {
          title: "I run a bank",
          text: "Your team spends the week on compliance. The new product you promised the board is still waiting.",
        },
        {
          title: "I have customers",
          text: "Thousands of people already trust you. There’s a financial product they would use, and you don’t offer it yet.",
        },
      ],
    },
    fourServices: {
      label: "02 · Four services",
      heading: "One ring. Four ways in.",
      intro:
        "Zero to Live is the whole ring. The other three take the slices they need. Finding the right partner and working with them is part of all four.",
    },
    work: {
      label: "03 · Work",
      heading: "Built, launched, live.",
      allLinkLabel: "All cases",
      featured: {
        slug: "insha",
        label: "insha · Zero to Live",
        heading: "Europe’s first interest free digital bank. Built from zero.",
        text: "Proposition, BaaS partners, experience and growth. Live in Germany on solarisBank, with a Mastercard debit card.",
        figures: [
          { value: "300%+", label: "user growth through 2020" },
          { value: "40,000+", label: "users in Germany" },
          { value: "6 months", label: "to live" },
        ],
        linkLabel: "Read the case",
        screens: [
          { src: "/assets/insha-screenshot-1.webp", alt: "insha app home screen" },
          { src: "/assets/insha-screenshot-2.webp", alt: "insha card screen" },
        ],
      },
      rows: [
        {
          slug: "ruut",
          name: "RUUT",
          line: "A digital bank built on top of a money transfer app. Now live in the UK.",
          tags: "Zero to Live, Expansion",
        },
      ],
      alsoLabel: "Also",
      also: [
        { title: "Turkcell", text: "Paycell and Financell, international expansion" },
        { title: "Albaraka", text: "Digital strategy" },
      ],
    },
    withMe: {
      label: "04 · What you get with me",
      heading: "Money can’t be sold like chocolate. It’s earned through trust.",
      text: "At insha we built a bank in a country where nobody knew our name. The team went to people’s weddings before anyone handed over their money. No deck teaches you that part. I lead every project myself, and a small delivery team builds with me.",
      points: [
        {
          title: "Ten years at your table",
          text: "I’ve spent more than ten years building fintech and digital banking products. You get that straight from me.",
        },
        {
          title: "I’ve had the same headaches",
          text: "The wrong partner, a flow sent back by compliance, a launch date that keeps slipping. I’ve lived through all of them.",
        },
        {
          title: "A recommendation with every decision",
          text: "You get a clear call, the reasons behind it and what it costs. Something your board can say yes to.",
        },
        {
          title: "Inside your team until it’s live",
          text: "I work from inside the team and clear what’s stuck. I stay until the product is out.",
        },
      ],
      portraitAlt: "Mehmet Burak Dikmen",
    },
    spark: {
      label: "Spark",
      heading: "Short, sharp formats that get companies moving.",
      text: "Postmortems of companies that stopped, and sector reports. Numbered and dated.",
      linkLabel: "Read Spark",
      cards: [
        {
          format: "The Last Day",
          number: "Nº 01",
          title: "Bó",
          line: "NatWest’s digital bank, read from the public record up to its last day of trading.",
          date: "24 Sep 2026",
          linkLabel: "Read the episode",
          href: {
            pathname: "/spark/[formatSlug]/[episodeSlug]",
            params: { formatSlug: "the-last-day", episodeSlug: "01-bo" },
          },
        },
        {
          format: "The Last Day",
          number: "Nº 02",
          title: "Nuri",
          line: "Formerly Bitwala. The next company in the series.",
          status: "Coming next",
        },
        {
          format: "Sector report",
          number: "Nº 01",
          title: "Sector reports",
          line: "A market read with our own notes and a clear view at the end.",
          status: "In preparation",
        },
      ],
    },
  },
  tr: {
    seo: {
      title: "fspark9 · Fintech ve dijital bankacılık danışmanlığı, Berlin",
      description:
        "İki dijital banka kurdum. Finansal ürün çıkarmak isteyen fintechler, bankalar ve şirketlerle çalışıyorum, ürün canlıya çıkana kadar kalıyorum.",
    },
    opening: {
      eyebrowParts: ["Mehmet Burak Dikmen", "Fintech ve dijital bankacılık", "Berlin"],
      headlineSentences: ["Ekiplerin finansal ürünlerini canlıya çıkarmasına yardım ediyorum."],
      cutWord: "canlıya",
      intro:
        "Finansal ürün çıkarmak isteyen fintechler, bankalar ve şirketlerle çalışıyorum. Ekibinize katılıyorum ve ürün canlıya çıkana kadar kalıyorum.",
      ctaLabel: "Görüşme ayarla",
      secondaryLinkLabel: "Neler yaptığıma bakın",
      portraitAlt: "Mehmet Burak Dikmen",
    },
    startWhereYouAre: {
      label: "01 · Hangisi sizsiniz?",
      heading: "Bulunduğunuz yerden başlayalım.",
      text: "Beni arayanların çoğu şu üç durumdan birinde oluyor.",
      items: [
        {
          title: "Fintech yönetiyorum",
          text: "Ürün, banka partneri, regülatör ve uygulama ekibi farklı hızlarda ilerliyor. Birinin bunları bir araya getirmesi gerekiyor.",
        },
        {
          title: "Banka yönetiyorum",
          text: "Ekibin haftası uyumla geçiyor. Yönetim kuruluna söz verilen yeni ürün hâlâ sırada bekliyor.",
        },
        {
          title: "Müşterilerim var",
          text: "Binlerce kişi size zaten güveniyor. Kullanacakları bir finansal ürün var ve siz onu henüz sunmuyorsunuz.",
        },
      ],
    },
    fourServices: {
      label: "02 · Dört hizmet",
      heading: "Tek halka. Dört kapı.",
      intro:
        "Sıfırdan Canlıya halkanın tamamı. Diğer üçü ihtiyaç duydukları dilimleri alıyor. Doğru partneri bulmak ve onunla çalışmak dördünün de içinde.",
    },
    work: {
      label: "03 · İşler",
      heading: "Kuruldu, çıktı, canlıda.",
      allLinkLabel: "Tüm işler",
      featured: {
        slug: "insha",
        label: "insha · Sıfırdan Canlıya",
        heading: "Avrupa’nın ilk faizsiz dijital bankası. Sıfırdan kuruldu.",
        text: "Önerme, BaaS partnerleri, deneyim ve büyüme. Almanya’da solarisBank altyapısıyla ve Mastercard banka kartıyla canlıda.",
        // Copy TR'de rakamlar cümle olarak yazılmış; değer ve etiket
        // EN'deki bölünmeye göre ayrıldı (bkz. teslim notu).
        figures: [
          { value: "%300+", label: "2020 boyunca kullanıcı artışı" },
          { value: "40.000+", label: "Almanya’da kullanıcı" },
          { value: "6 ay", label: "canlıya çıkış" },
        ],
        linkLabel: "Vakayı okuyun",
        screens: [
          { src: "/assets/insha-screenshot-1.webp", alt: "insha uygulaması ana ekran" },
          { src: "/assets/insha-screenshot-2.webp", alt: "insha kart ekranı" },
        ],
      },
      rows: [
        {
          slug: "ruut",
          name: "RUUT",
          line: "Bir para transferi uygulamasının üzerine kurulan dijital banka. Artık İngiltere’de canlıda.",
          tags: "Sıfırdan Canlıya, Açılım",
        },
      ],
      alsoLabel: "Ayrıca",
      also: [
        { title: "Turkcell", text: "Paycell ve Financell, uluslararası açılım" },
        { title: "Albaraka", text: "Dijital strateji" },
      ],
    },
    withMe: {
      label: "04 · Benimle çalışınca",
      heading: "Para çikolata gibi satılmaz. Güvenle kazanılır.",
      text: "insha’yı adımızı kimsenin bilmediği bir ülkede kurduk. İnsanlar paralarını bize emanet etmeden önce ekip onların düğünlerine gitti. Bu kısmı hiçbir sunum öğretmiyor. Her projeyi kendim yönetiyorum, küçük bir ekip de benimle birlikte kuruyor.",
      points: [
        {
          title: "On yıl, masanızda",
          text: "On yılı aşkın süredir fintech ve dijital bankacılık ürünleri kuruyorum. Bu tecrübe size doğrudan benden geliyor.",
        },
        {
          title: "Aynı dertleri ben de yaşadım",
          text: "Yanlış partner, uyumdan geri dönen akış, sürekli kayan lansman tarihi. Hepsini bizzat yaşadım.",
        },
        {
          title: "Her kararın yanında bir öneri",
          text: "Net bir karar, gerekçesi ve bedeli. Yönetim kurulunuzun evet diyebileceği bir şey.",
        },
        {
          title: "Canlıya çıkana kadar ekibinizin içinde",
          text: "Ekibin içinden çalışıyorum, tıkanan yeri açıyorum. Ürün çıkana kadar kalıyorum.",
        },
      ],
      portraitAlt: "Mehmet Burak Dikmen",
    },
    spark: {
      label: "Spark",
      heading: "Şirketleri harekete geçiren kısa ve keskin formatlar.",
      text: "Kapanan şirketlerin son günleri ve sektör raporları. Numaralı ve tarihli.",
      linkLabel: "Spark’ı okuyun",
      cards: [
        {
          format: "Son Gün",
          number: "Nº 01",
          title: "Bó",
          line: "NatWest’in dijital bankası, kamu kayıtlarından son işlem gününe kadar.",
          date: "24 Eyl 2026",
          linkLabel: "Bölümü okuyun",
          href: {
            pathname: "/spark/[formatSlug]/[episodeSlug]",
            params: { formatSlug: "son-gun", episodeSlug: "01-bo" },
          },
        },
        {
          format: "Son Gün",
          number: "Nº 02",
          title: "Nuri",
          line: "Eski adıyla Bitwala. Serinin sıradaki şirketi.",
          status: "Sırada",
        },
        {
          format: "Sektör raporu",
          number: "Nº 01",
          title: "Sektör raporları",
          line: "Kendi notlarımız ve sonunda net bir görüşle bir pazar okuması.",
          status: "Hazırlanıyor",
        },
      ],
    },
  },
};
