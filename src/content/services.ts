import type { Locale, ServicePageContent, ServicesIndexContent, ServicesPage } from "@/types/content";

// dc.html: t.pages.services (satır 1337/1625, hero). Satır/panel içeriği
// (Service[] + ServicesSection.labels) content/en.ts + content/tr.ts'teki
// HomePage.services'ten geliyor — burada tekrarlanmıyor.
export const en: ServicesPage = {
  hero: {
    eyebrow: "Services",
    title: "Four places where money and months usually go missing.",
    intro:
      "Every one of these came out of a build I was inside of. The mistakes below are not theory. They are things I either made myself or watched from a metre away. Pick the one that sounds like your quarter.",
  },
};

export const tr: ServicesPage = {
  hero: {
    eyebrow: "Hizmetler",
    title: "Paranın ve zamanın en çok kaybolduğu dört yer.",
    intro:
      "Aşağıdakilerin hepsi içinde bulunduğum işlerden çıktı. Bunlar teori değil. Ya bizzat yaptığım ya da bir metre öteden izlediğim hatalar. Hangisi sizin çeyreğinize benziyorsa oradan başlayın.",
  },
};

// ─────────────────────────────────────────────
// v2 (brief v4 §7.3, §7.6). Yukarıdaki ServicesPage eski /services
// sayfasının, o sayfa v2'ye geçince silinecek.
// ─────────────────────────────────────────────

/**
 * /services index. Copy dosyasında bu sayfanın kendi metni yok (brief
 * §7.6 "board yok"): açılış ana sayfadaki Four services bloğunun metni,
 * etiket numarasız. SEO copy §6c'den.
 */
export const servicesIndex: Record<Locale, ServicesIndexContent> = {
  en: {
    seo: {
      title: "Services | fspark9",
      description:
        "Four ways to work together, from a full launch to a single decision. Zero to Live, Product & Strategy, Embedded Finance, Expansion & GTM.",
    },
    backLabel: "Home",
    opening: {
      label: "Four services",
      heading: "One ring. Four ways in.",
      intro:
        "Zero to Live is the whole ring. The other three take the slices they need. Finding the right partner and working with them is part of all four.",
    },
  },
  tr: {
    seo: {
      title: "Hizmetler | fspark9",
      description:
        "Birlikte çalışmanın dört yolu, tam bir lansmandan tek bir karara kadar. Sıfırdan Canlıya, Ürün ve Strateji, Gömülü Finans, Açılım ve Pazara Çıkış.",
    },
    backLabel: "Ana sayfa",
    opening: {
      label: "Dört hizmet",
      heading: "Tek halka. Dört kapı.",
      intro:
        "Sıfırdan Canlıya halkanın tamamı. Diğer üçü ihtiyaç duydukları dilimleri alıyor. Doğru partneri bulmak ve onunla çalışmak dördünün de içinde.",
    },
  },
};

/**
 * Dört hizmet sayfası, copy §2. Zero to Live'ın altı adımının dilimleri
 * copy'deki dilim haritasından. Diğer üç hizmetin adımları copy'de
 * başlıksız ve dilimsiz: buradaki dilim eşlemesi GEÇİCİ, onay bekliyor
 * (her hizmetin birleşimi kendi dilim setini veriyor).
 */
export const servicePages: Record<Locale, ServicePageContent[]> = {
  en: [
    {
      slug: "zero-to-live",
      seo: {
        title: "Zero to Live: launch a fintech or digital bank | fspark9",
        description:
          "From the first decision to launch day. Strategy, business model, compliance, partners, product and go to market, led by someone who has done it twice.",
      },
      backLabel: "Home",
      opening: {
        label: "Service · Zero to Live · For fintechs and new digital banks",
        heading: "From the first decision to launch day.",
        intro:
          "You’re building a fintech or a bank from scratch. The idea is clear and the money is there. The work needs someone who has done it before and can hold all the pieces at once.",
      },
      stepsLabel: "What we do together",
      steps: [
        { title: "Strategy", line: "Who the product is for, how it makes money and where it can win.", slices: [1] },
        { title: "Business model and first product", line: "What launches first and what waits.", slices: [2] },
        {
          title: "Compliance bridge",
          line: "I sit between the business, your lawyers and the regulator, so legal requirements shape the product from day one and stop surprising you at the end.",
          slices: [3],
        },
        { title: "Partners", line: "Choose the bank, BaaS and card partners, and run those conversations.", slices: [4] },
        {
          title: "Product and experience",
          line: "Shape the product with your tech team and design a flow people actually finish.",
          slices: [5, 6],
        },
        { title: "Go to market and launch", line: "Plan how you reach your first customers, and take it live.", slices: [7, 8] },
      ],
      otherServicesLabel: "Other services",
      keepLabel: "What you walk away with",
      keep: "A live product, with every decision behind it written down.",
      ctaLabel: "Book a call",
    },
    {
      slug: "product-strategy",
      seo: {
        title: "Product & Strategy for banks and fintechs | fspark9",
        description:
          "The decisions that keep moving to next quarter. A new product, a new flow or a big strategic choice, settled with your team and taken forward.",
      },
      backLabel: "Home",
      opening: {
        label: "Service · Product & Strategy · For banks and fintechs",
        heading: "The decisions that keep moving to next quarter.",
        intro:
          "You already run a bank or a fintech. A new product, a new flow or a big strategic choice is stuck, and the team is busy with everything else.",
      },
      stepsLabel: "What we do together",
      steps: [
        { line: "Look at the business case and find the one assumption it rests on.", slices: [1] },
        { line: "Decide the product, the first release and what to leave out.", slices: [2] },
        { line: "Find the right partner and handle the talks.", slices: [4] },
        { line: "Design the flow and the customer experience.", slices: [5, 6] },
        { line: "Shape how the product is launched and sold.", slices: [1] },
      ],
      otherServicesLabel: "Other services",
      keepLabel: "What you walk away with",
      keep: "A decision your board can approve, a plan your team can build, and someone close by while they build it.",
      ctaLabel: "Book a call",
    },
    {
      slug: "embedded-finance",
      seo: {
        title: "Embedded Finance for platforms and retailers | fspark9",
        description:
          "Your customers already trust you. Add the right financial product, pick the right partner, and earn revenue without adding work for your customers.",
      },
      backLabel: "Home",
      opening: {
        label: "Service · Embedded Finance · For companies with customers",
        heading: "Your customers already trust you. Give them one more reason to stay.",
        intro:
          "You run a marketplace, an online store, a platform or a telecom. You have customers and you know them well. The right financial product can add revenue without adding work for them.",
      },
      stepsLabel: "What we do together",
      steps: [
        { line: "Pick the financial product that adds the most to your revenue and margin.", slices: [2] },
        { line: "Run the numbers before anything gets built.", slices: [2] },
        { line: "Find the partner who carries the licence and the risk.", slices: [4] },
        { line: "Plan the integration so it runs quietly in the background.", slices: [5] },
        { line: "Design the experience inside your own app or site.", slices: [6] },
      ],
      otherServicesLabel: "Other services",
      keepLabel: "What you walk away with",
      keep: "A financial product that sits inside your business, runs in the background and shows up in your numbers.",
      ctaLabel: "Book a call",
    },
    {
      slug: "expansion-gtm",
      seo: {
        title: "Expansion & GTM for fintechs and banks | fspark9",
        description:
          "Taking a fintech or bank into a new country. A new regulator, new partners and new customers, planned and launched with you.",
      },
      backLabel: "Home",
      opening: {
        label: "Service · Expansion & Go to Market · For fintechs and banks",
        heading: "It works at home. Now it has to work somewhere new.",
        intro:
          "You’re taking a fintech or a bank into a new country. The regulator is different, the partners are different and the customers expect something else.",
      },
      stepsLabel: "What we do together",
      steps: [
        {
          line: "Choose the entry route and the regulatory position. With your own licence, while you apply for one, or through a partner’s.",
          slices: [3],
        },
        { line: "Build the partner structure that route needs.", slices: [4] },
        { line: "Decide what changes locally and what stays.", slices: [3] },
        { line: "Plan how you reach your first customers.", slices: [7] },
        { line: "Stay with the team through launch.", slices: [8] },
      ],
      otherServicesLabel: "Other services",
      keepLabel: "What you walk away with",
      keep: "A clear way into the market that fits where you are, and your first customers there.",
      ctaLabel: "Book a call",
    },
  ],
  tr: [
    {
      slug: "zero-to-live",
      seo: {
        title: "Sıfırdan Canlıya: fintech ve dijital banka kurmak | fspark9",
        description:
          "İlk karardan lansman gününe. Strateji, iş modeli, regülasyon, partnerler, ürün ve pazara çıkış, bunu iki kez yapmış biriyle.",
      },
      backLabel: "Ana sayfa",
      opening: {
        label: "Hizmet · Sıfırdan Canlıya · Fintechler ve yeni dijital bankalar için",
        heading: "İlk karardan lansman gününe.",
        intro:
          "Sıfırdan bir fintech ya da banka kuruyorsunuz. Fikir net, para hazır. Bu iş, bunu daha önce yapmış ve bütün parçaları aynı anda tutabilecek birini gerektiriyor.",
      },
      stepsLabel: "Birlikte ne yapıyoruz",
      steps: [
        { title: "Strateji", line: "Ürün kimin için, nasıl para kazanıyor, nerede kazanabilir.", slices: [1] },
        { title: "İş modeli ve ilk ürün", line: "Önce ne çıkacak, ne bekleyecek.", slices: [2] },
        {
          title: "Uyum köprüsü",
          line: "İş tarafı, avukatlarınız ve regülatör arasında duruyorum. Böylece hukuki gereklilikler ilk günden ürüne yön veriyor, son anda sürpriz çıkarmıyor.",
          slices: [3],
        },
        { title: "Partnerler", line: "Banka, BaaS ve kart partnerlerini seçiyoruz, görüşmeleri yürütüyoruz.", slices: [4] },
        {
          title: "Ürün ve deneyim",
          line: "Ürünü teknik ekibinizle şekillendiriyoruz, insanların sonuna kadar tamamladığı bir akış tasarlıyoruz.",
          slices: [5, 6],
        },
        {
          title: "Pazara çıkış ve lansman",
          line: "İlk müşterilere nasıl ulaşacağınızı planlıyoruz ve ürünü canlıya çıkarıyoruz.",
          slices: [7, 8],
        },
      ],
      otherServicesLabel: "Diğer hizmetler",
      keepLabel: "Elinizde ne kalıyor",
      keep: "Canlıda bir ürün ve arkasındaki her kararın yazılı hali.",
      ctaLabel: "Görüşme ayarla",
    },
    {
      slug: "product-strategy",
      seo: {
        title: "Bankalar ve fintechler için Ürün ve Strateji | fspark9",
        description:
          "Sürekli bir sonraki çeyreğe kalan kararlar. Yeni bir ürün, yeni bir akış ya da büyük bir stratejik seçim, ekibinizle netleşip ileri taşınıyor.",
      },
      backLabel: "Ana sayfa",
      opening: {
        label: "Hizmet · Ürün ve Strateji · Bankalar ve fintechler için",
        heading: "Sürekli bir sonraki çeyreğe kalan kararlar.",
        intro:
          "Zaten bir banka ya da fintech yönetiyorsunuz. Yeni bir ürün, yeni bir akış ya da büyük bir stratejik seçim tıkanmış durumda, ekip de başka işlere gömülü.",
      },
      stepsLabel: "Birlikte ne yapıyoruz",
      steps: [
        { line: "İş modeline bakıyoruz, dayandığı o tek varsayımı buluyoruz.", slices: [1] },
        { line: "Ürüne, ilk sürüme ve dışarıda kalacaklara karar veriyoruz.", slices: [2] },
        { line: "Doğru partneri buluyoruz, görüşmeleri yürütüyoruz.", slices: [4] },
        { line: "Akışı ve müşteri deneyimini tasarlıyoruz.", slices: [5, 6] },
        { line: "Ürünün nasıl çıkacağını ve nasıl satılacağını kurguluyoruz.", slices: [1] },
      ],
      otherServicesLabel: "Diğer hizmetler",
      keepLabel: "Elinizde ne kalıyor",
      keep: "Yönetim kurulunun onaylayabileceği bir karar, ekibinizin kurabileceği bir plan ve kurarken yanınızda duran biri.",
      ctaLabel: "Görüşme ayarla",
    },
    {
      slug: "embedded-finance",
      seo: {
        title: "Platformlar ve perakende için Gömülü Finans | fspark9",
        description:
          "Müşterileriniz size zaten güveniyor. Doğru finansal ürünü ve doğru partneri seçin, müşterinize iş çıkarmadan gelir kazanın.",
      },
      backLabel: "Ana sayfa",
      opening: {
        label: "Hizmet · Gömülü Finans · Müşterisi olan şirketler için",
        heading: "Müşterileriniz size zaten güveniyor. Kalmaları için bir sebep daha verin.",
        intro:
          "Bir pazar yeri, bir online mağaza, bir platform ya da bir telekom şirketi yönetiyorsunuz. Müşterileriniz var ve onları iyi tanıyorsunuz. Doğru finansal ürün, onlara iş çıkarmadan size gelir getirebilir.",
      },
      stepsLabel: "Birlikte ne yapıyoruz",
      steps: [
        { line: "Gelirinize ve kârınıza en çok katkı yapacak finansal ürünü seçiyoruz.", slices: [2] },
        { line: "Bir şey kurulmadan önce hesabı yapıyoruz.", slices: [2] },
        { line: "Lisansı ve riski taşıyacak partneri buluyoruz.", slices: [4] },
        { line: "Entegrasyonu arka planda sessizce çalışacak şekilde planlıyoruz.", slices: [5] },
        { line: "Deneyimi kendi uygulamanızın ya da sitenizin içinde tasarlıyoruz.", slices: [6] },
      ],
      otherServicesLabel: "Diğer hizmetler",
      keepLabel: "Elinizde ne kalıyor",
      keep: "İşinizin içine oturan, arka planda çalışan ve rakamlarınızda görünen bir finansal ürün.",
      ctaLabel: "Görüşme ayarla",
    },
    {
      slug: "expansion-gtm",
      seo: {
        title: "Fintech ve bankalar için Açılım ve Pazara Çıkış | fspark9",
        description:
          "Bir fintech ya da bankayı yeni bir ülkeye taşımak. Yeni regülatör, yeni partnerler, yeni müşteriler, sizinle birlikte planlanıp canlıya alınıyor.",
      },
      backLabel: "Ana sayfa",
      opening: {
        label: "Hizmet · Açılım ve Pazara Çıkış · Fintechler ve bankalar için",
        heading: "Kendi pazarınızda çalışıyor. Şimdi yeni bir yerde çalışması gerekiyor.",
        intro:
          "Bir fintech ya da bankayı yeni bir ülkeye taşıyorsunuz. Regülatör farklı, partnerler farklı, müşterinin beklentisi farklı.",
      },
      stepsLabel: "Birlikte ne yapıyoruz",
      steps: [
        {
          line: "Giriş rotasını ve regülasyon pozisyonunu seçiyoruz. Kendi lisansınızla, lisans sürecindeyken ya da bir partnerin lisansıyla.",
          slices: [3],
        },
        { line: "Bu rotanın gerektirdiği partner yapısını kuruyoruz.", slices: [4] },
        { line: "Yerelde neyin değişeceğine, neyin kalacağına karar veriyoruz.", slices: [3] },
        { line: "İlk müşterilere nasıl ulaşacağınızı planlıyoruz.", slices: [7] },
        { line: "Lansmana kadar ekiple birlikte kalıyoruz.", slices: [8] },
      ],
      otherServicesLabel: "Diğer hizmetler",
      keepLabel: "Elinizde ne kalıyor",
      keep: "Durumunuza uyan net bir giriş yolu ve oradaki ilk müşterileriniz.",
      ctaLabel: "Görüşme ayarla",
    },
  ],
};
