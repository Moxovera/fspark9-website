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
      title: "fspark9 · Fintech and digital banking advisory",
      description:
        "We help teams get financial products live. We’ve built two digital banks and work with fintechs, banks and companies from the first decision to launch day.",
    },
    opening: {
      eyebrowParts: ["fspark9", "Fintech and digital banking advisory"],
      headlineSentences: ["We help you get financial products live."],
      cutWord: "live.",
      intro:
        "We work with fintechs, banks and companies that want to launch a financial product. We join your team and stay until it’s live.",
      ctaLabel: "Book a call",
      secondaryLinkLabel: "See what we do",
      portraitAlt: "Mehmet Burak Dikmen",
      heroTextMobile: "We work with fintechs, banks and companies launching a financial product. We stay in your team until it’s live.",
      proof: [
        { value: "2", label: "Digital banks built" },
        { value: "65,000+", label: "Users · Germany" },
        { value: "6 months", label: "Zero to live" },
      ],
    },
    heroVideo: {
      youtubeId: "mHTk5Mw1UBQ",
      durationLabel: "1:31",
      buttonLabel: "fspark9 in one minute",
      ariaLabel: "Watch the fspark9 film, 1 minute 31 seconds",
      title: "When does your financial product go live?",
      caption: "When do you go live?",
      closeLabel: "Close",
    },
    servicesVideo: {
      youtubeId: "Pr4kIn4GgPg",
      durationLabel: "0:30",
      buttonLabel: "Explore the services",
      ariaLabel: "Explore the services, 30 seconds",
      title: "One ring. Four offers",
    },
    startWhereYouAre: {
      label: "01 · Which one are you?",
      heading: "Start where you are.",
      text: "Most people who call us are in one of three places.",
      items: [
        {
          title: "Fintech",
          text: "The product, partners, the regulator and the app are all moving at different speeds. Someone has to pull them together.",
        },
        {
          title: "Bank",
          text: "Team spends the week on compliance. The new product you promised the board is still waiting.",
        },
        {
          title: "Non-Fintechs",
          text: "Thousands of people already trust you. There’s a financial product they would use, and you don’t offer it yet.",
        },
      ],
    },
    fourServices: {
      label: "02 · Four services",
      heading: "One ring. Four offers",
      intro:
        "Zero to Live is the whole ring. The other three take the slices they need. ",
    },
    work: {
      label: "03 · Work",
      heading: "Built and launched.",
      allLinkLabel: "All cases",
      featured: {
        slug: "insha",
        label: "insha · Zero to Live",
        heading: "Europe’s first interest free digital bank. Built from zero.",
        text: "Proposition, BaaS partners, experience and growth. Live in Germany on solarisBank, with a Mastercard debit card.",
        figures: [
          { value: "300%+", label: "user growth through 2020" },
          { value: "65,000+", label: "users in Germany" },
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
        { title: "Albaraka", text: "Strategy" },
      ],
    },
    withMe: {
      label: "04 · What you get with us",
      heading: "Money can’t be sold like chocolate. It’s earned through trust.",
      text: "We've built banks in a countries where nobody knew the brands. The team went to people’s weddings before anyone handed over their money. Grilled with them. No deck teaches you this part. ",
      points: [
        {
          title: "+10 years intense experience",
          text: "We’ve spent more than ten years building fintech and digital banking products. You get that experience first hand.",
        },
        {
          title: "We’ve had the same headaches",
          text: "The wrong partner, a flow sent back by compliance, a launch date that keeps slipping. We’ve lived through all of them.",
        },
        {
          title: "A recommendation with every decision",
          text: "You get a clear call, the reasons behind it and what it costs. Something your board can say yes to.",
        },
        {
          title: "Inside your team until it’s live",
          text: "We work from inside the team and clear what’s stuck. We stay until the product is out.",
        },
      ],
      portraitAlt: "Mehmet Burak Dikmen",
    },
    spark: {
      // Yayın tarihine göre yeniden eskiye (ilk kart büyük), en yeni üç. Sanity'deki sıralamayla aynı.
      cards: [
        {
          format: "Sector report",
          number: "Nº 06",
          title: "UK SME banking",
          line: "The account now opens in an app. Credit, cards and the books still sit behind other doors.",
          date: "19 Nov 2026",
          linkLabel: "Read the report",
          href: {
            pathname: "/spark/[formatSlug]/[episodeSlug]",
            params: { formatSlug: "sector-reports", episodeSlug: "uk-sme" },
          },
        },
        {
          format: "Sector report",
          number: "Nº 05",
          title: "Germany SME banking",
          line: "Germany has 3.87 million SMEs. Apps run their daily money, Sparkassen still hold their loans. Nobody stands in between.",
          date: "6 Nov 2026",
          linkLabel: "Read the report",
          href: {
            pathname: "/spark/[formatSlug]/[episodeSlug]",
            params: { formatSlug: "sector-reports", episodeSlug: "de-sme" },
          },
        },
        {
          format: "Sector report",
          number: "Nº 04",
          title: "Europe's KYC rules are changing",
          line: "Europe's new rules put eID first. What it means for KYC and KYB providers, banks and fintechs, with the UK side by side.",
          date: "2 Nov 2026",
          linkLabel: "Read the report",
          href: {
            pathname: "/spark/[formatSlug]/[episodeSlug]",
            params: { formatSlug: "sector-reports", episodeSlug: "kyc-kyb" },
          },
        },
      ],
    },
  },
  tr: {
    seo: {
      title: "fspark9 · Fintech ve dijital bankacılık danışmanlığı",
      description:
        "Ekiplerin finansal ürünlerini canlıya çıkarmasına yardım ediyoruz. İki dijital banka kurduk. Fintechler, bankalar ve şirketlerle lansmana kadar çalışıyoruz.",
    },
    opening: {
      eyebrowParts: ["fspark9", "Fintech ve dijital bankacılık danışmanlığı"],
      headlineSentences: ["Finansal ürünleri canlıya çıkarmanıza yardım ediyoruz."],
      cutWord: "canlıya",
      intro:
        "Finansal ürün çıkarmak isteyen fintechler, bankalar ve şirketlerle çalışıyoruz. Ekibinize katılıyor, ürün canlıya çıkana kadar kalıyoruz.",
      ctaLabel: "Görüşme ayarla",
      secondaryLinkLabel: "Neler yaptığımıza bakın",
      portraitAlt: "Mehmet Burak Dikmen",
      heroTextMobile:
        "Fintechler, bankalar ve finansal ürün çıkarmak isteyen şirketlerle çalışıyoruz. Ürün canlıya çıkana kadar ekibinizde kalıyoruz.",
      proof: [
        { value: "2", label: "Dijital banka kurduk" },
        { value: "65.000+", label: "Kullanıcı · Almanya" },
        { value: "6 ay", label: "Sıfırdan canlıya" },
      ],
    },
    heroVideo: {
      youtubeId: "Khy5smJWi6E",
      durationLabel: "1:31",
      buttonLabel: "1 dakikada fspark9",
      ariaLabel: "fspark9 tanıtım filmini izle, 1 dakika 31 saniye",
      title: "Finansal ürününüz ne zaman canlıda?",
      caption: "Ne zaman canlıdasınız?",
      closeLabel: "Kapat",
    },
    servicesVideo: {
      youtubeId: "cDtyn01dpGM",
      durationLabel: "0:30",
      buttonLabel: "Hizmetleri inceleyin",
      ariaLabel: "Hizmetleri inceleyin, 30 saniye",
      title: "Tek halka. Dört teklif.",
    },
    startWhereYouAre: {
      label: "01 · Hangisi sizsiniz?",
      heading: "Bulunduğunuz yerden başlayalım.",
      text: "Bizi arayanların çoğu şu üç durumdan birinde oluyor.",
      items: [
        {
          title: "Fintech",
          text: "Ürün, partnerler, regülatör ve uygulama ekibi farklı hızlarda ilerliyor. Birinin bunları bir araya getirmesi gerekiyor.",
        },
        {
          title: "Banka",
          text: "Ekibin haftası uyumla geçiyor. Yönetim kuruluna söz verilen yeni ürün hâlâ sırada bekliyor.",
        },
        {
          title: "Fintech harici şirketler",
          text: "Binlerce kişi size zaten güveniyor. Kullanacakları bir finansal ürün var ve siz onu henüz sunmuyorsunuz.",
        },
      ],
    },
    fourServices: {
      label: "02 · Dört hizmet",
      heading: "Tek halka. Dört teklif.",
      intro:
        "Sıfırdan Canlıya halkanın tamamı. Diğer üçü ihtiyaç duydukları dilimleri alıyor. ",
    },
    work: {
      label: "03 · İşler",
      heading: "Kuruldu ve çıktı.",
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
          { value: "65.000+", label: "Almanya’da kullanıcı" },
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
        { title: "Albaraka", text: "Strateji" },
      ],
    },
    withMe: {
      label: "04 · Bizimle çalışınca",
      heading: "Para çikolata gibi satılmaz. Güvenle kazanılır.",
      text: "Adını kimsenin bilmediği ülkelerde bankalar kurduk. İnsanlar paralarını bize emanet etmeden önce ekip onların düğünlerine gitti. Onlarla mangal yaptık. Bu detayları size hiçbir sunum öğretemez.",
      points: [
        {
          title: "+10 yıllık yoğun tecrübe",
          text: "On yılı aşkın süredir fintech ve dijital bankacılık ürünleri kuruyoruz. Bu tecrübe size doğrudan geliyor.",
        },
        {
          title: "Aynı dertleri biz de yaşadık",
          text: "Yanlış partner, uyumdan geri dönen akış, sürekli kayan lansman tarihi. Hepsini bizzat yaşadık.",
        },
        {
          title: "Her kararın yanında bir öneri",
          text: "Net bir karar, gerekçesi ve bedeli. Yönetim kurulunuzun evet diyebileceği bir şey.",
        },
        {
          title: "Canlıya çıkana kadar ekibinizin içinde",
          text: "Ekibin içinden çalışıyor, tıkanan yeri açıyoruz. Ürün çıkana kadar kalıyoruz.",
        },
      ],
      portraitAlt: "Mehmet Burak Dikmen",
    },
    spark: {
      // Yayın tarihine göre yeniden eskiye (ilk kart büyük), en yeni üç. Sanity'deki sıralamayla aynı.
      cards: [
        {
          format: "Sektör raporu",
          number: "Nº 06",
          title: "İngiltere KOBİ bankacılığı",
          line: "Hesap artık bir uygulamada açılıyor. Kredi, kart ve defter hâlâ ayrı kapılarda.",
          date: "19 Kas 2026",
          linkLabel: "Raporu okuyun",
          href: {
            pathname: "/spark/[formatSlug]/[episodeSlug]",
            params: { formatSlug: "sektor-raporlari", episodeSlug: "uk-sme" },
          },
        },
        {
          format: "Sektör raporu",
          number: "Nº 05",
          title: "Almanya KOBİ bankacılığı",
          line: "Almanya'da 3,87 milyon KOBİ var. Günlük parasını uygulamalar yönetiyor, kredisini hâlâ Sparkasse veriyor. Arada kimse yok.",
          date: "6 Kas 2026",
          linkLabel: "Raporu okuyun",
          href: {
            pathname: "/spark/[formatSlug]/[episodeSlug]",
            params: { formatSlug: "sektor-raporlari", episodeSlug: "de-sme" },
          },
        },
        {
          format: "Sektör raporu",
          number: "Nº 04",
          title: "Avrupa'da KYC kuralları değişiyor",
          line: "Avrupa'nın yeni kuralları eID'yi öne alıyor. KYC ve KYB sağlayıcıları, bankalar ve fintechler için ne değişiyor, İngiltere ile birlikte.",
          date: "2 Kas 2026",
          linkLabel: "Raporu okuyun",
          href: {
            pathname: "/spark/[formatSlug]/[episodeSlug]",
            params: { formatSlug: "sektor-raporlari", episodeSlug: "kyc-kyb" },
          },
        },
      ],
    },
  },
};
