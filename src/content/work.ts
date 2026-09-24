import type { CaseContent, Locale, WorkPageContent } from "@/types/content";

/** Copy §3.1 ve §6c. */
export const workPage: Record<Locale, WorkPageContent> = {
  en: {
    seo: {
      title: "Work: fintech and digital bank launches | fspark9",
      description:
        "Built, launched, live. Each case shows where the client was stuck, what we did and what happened next.",
    },
    backLabel: "Home",
    label: "Work",
    heading: "Built, launched, live.",
    lead: "Real work, newest first. Each case shows where the client was stuck, what we did and what happened next.",
    readLabel: "Read the case",
    caseLabel: "Case",
    caseBackLabel: "Work",
    sourcesLabel: "Sources",
    nextCaseLabel: "Next case",
  },
  tr: {
    seo: {
      title: "İşler: fintech ve dijital banka lansmanları | fspark9",
      description:
        "Kuruldu, çıktı, canlıda. Her vakada müşterinin nerede tıkandığı, ne yaptığımız ve sonra ne olduğu var.",
    },
    backLabel: "Ana sayfa",
    label: "İşler",
    heading: "Kuruldu, çıktı, canlıda.",
    lead: "Gerçek işler, en yenisi en üstte. Her vakada müşterinin nerede tıkandığı, ne yaptığımız ve sonra ne olduğu var.",
    readLabel: "Vakayı okuyun",
    caseLabel: "Vaka",
    caseBackLabel: "İşler",
    sourcesLabel: "Kaynaklar",
    nextCaseLabel: "Sonraki vaka",
  },
};

/**
 * Copy §3.2, §3.3 ve §6c. Sıra: en yeni en üstte, copy'deki sırayla.
 * Kartların ilk cümlesi lead olarak ayrıldı (board CaseInsha). insha EN
 * "What happened" board'daki sözcüklerle; pazar satırı board'dan.
 */
export const cases: Record<Locale, CaseContent[]> = {
  en: [
    {
      slug: "insha",
      seo: {
        title: "insha: Europe’s first interest free digital bank | fspark9",
        description:
          "Albaraka Türk wanted to serve Europe’s Muslim community. insha went live in Germany in six months and passed 40,000 users.",
      },
      name: "insha",
      subtitle: "Europe’s first interest free, digital only bank.",
      market: "Germany",
      tags: "Zero to Live",
      services: ["zero-to-live"],
      problem: {
        label: "Where they were stuck",
        lead: "Albaraka Türk wanted to serve Europe’s Muslim community.",
        body: "All it had was the intention. No product, no infrastructure, no European partner and no local trust.",
      },
      actions: {
        label: "What we did",
        items: [
          "Defined what the product was and who would pay for it, before any code was written.",
          "Chose and negotiated the BaaS and card partners, and put the product under a BaFin licensed institution.",
          "Designed the whole digital experience, including an account people could open on their phone in one sitting, with no paperwork.",
          "Built growth on the ground, because a bank nobody has heard of can’t buy trust with ads.",
        ],
      },
      delivered: {
        label: "What happened",
        lead: "It went live in Germany, on solarisBank with a Mastercard debit card.",
        body: "Europe’s first interest free digital only bank. It went live six months after we started. Users grew more than 300% through 2020 to over 40,000.",
      },
      figures: [
        { value: "300%+", label: "user growth through 2020" },
        { value: "40,000+", label: "users in Germany" },
        { value: "6 months", label: "to live" },
      ],
      proof: { value: "40,000+", label: "users in Germany" },
      sources: ["FinTech Futures", "Finextra", "EU-Startups"],
    },
    {
      slug: "ruut",
      seo: {
        title: "RUUT: from transfer app to digital bank in the UK | fspark9",
        description: "A money transfer app for Turks in Germany and Austria became a digital bank, now live in the UK.",
      },
      name: "RUUT",
      subtitle: "From a money transfer app to a digital bank, now live in the UK.",
      market: "Germany, Austria, UK",
      tags: "Zero to Live, Expansion & GTM",
      services: ["zero-to-live", "expansion-gtm"],
      problem: {
        label: "Where they were stuck",
        lead: "RUUT was a single purpose transfer app for Turks in Germany and Austria.",
        body: "The board wanted a full digital bank for the diaspora across Europe, and then the UK. That meant a new proposition, new products, new partners, a new regulatory position and a new market, all at once.",
      },
      actions: {
        label: "What we did",
        items: [
          "Turned a one product app into a digital banking proposition, and decided which products earned their place.",
          "Rebuilt the brand and the customer experience, every screen and every flow, and shipped it.",
          "Chose and managed the partners behind the new products, and kept those relationships through delivery.",
          "Ran the UK entry, including the partner and regulatory structure that lets the brand trade while the full licence is built underneath.",
        ],
      },
      delivered: {
        label: "What happened",
        lead: "A digital banking brand with cross border payments open to all EU citizens and residents.",
        body: "And a service now live in the UK for a Turkish community of close to one million people, with retail and business accounts, cards and remittances.",
      },
      proof: { value: "UK", label: "live today" },
      sources: ["FinTech Futures", "UKTN", "Tech.eu"],
    },
  ],
  tr: [
    {
      slug: "insha",
      seo: {
        title: "insha: Avrupa’nın ilk faizsiz dijital bankası | fspark9",
        description:
          "Albaraka Türk Avrupa’daki Müslüman topluluğa ulaşmak istiyordu. insha altı ayda Almanya’da canlıya çıktı ve 40.000 kullanıcıyı geçti.",
      },
      name: "insha",
      subtitle: "Avrupa’nın ilk faizsiz ve sadece dijital bankası.",
      market: "Almanya",
      tags: "Sıfırdan Canlıya",
      services: ["zero-to-live"],
      problem: {
        label: "Nerede tıkanmışlardı",
        lead: "Albaraka Türk, Avrupa’daki Müslüman topluluğa ulaşmak istiyordu.",
        body: "Elde sadece niyet vardı. Ürün yok, altyapı yok, Avrupa’da partner yok, yerel güven yok.",
      },
      actions: {
        label: "Ne yaptık",
        items: [
          "Tek satır kod yazılmadan ürünün ne olduğunu ve kimin para ödeyeceğini netleştirdik.",
          "BaaS ve kart partnerlerini seçip pazarlığını yaptık, ürünü BaFin lisanslı bir kurumun altına oturttuk.",
          "Dijital deneyimin tamamını tasarladık. Telefonda, tek oturuşta, evraksız açılan hesap dahil.",
          "Büyümeyi sahada kurduk, çünkü adını kimsenin duymadığı bir banka güveni reklamla alamaz.",
        ],
      },
      delivered: {
        label: "Ne oldu",
        lead: "Avrupa’nın ilk faizsiz ve sadece dijital bankası Almanya’da solarisBank altyapısıyla ve Mastercard banka kartıyla canlıya çıktı.",
        body: "Başladıktan altı ay sonra canlıdaydı. Kullanıcı sayısı 2020 boyunca %300’ün üzerinde artarak 40.000’i geçti.",
      },
      figures: [
        { value: "%300+", label: "2020 boyunca kullanıcı artışı" },
        { value: "40.000+", label: "Almanya’da kullanıcı" },
        { value: "6 ay", label: "canlıya çıkış" },
      ],
      proof: { value: "40.000+", label: "Almanya’da kullanıcı" },
      sources: ["FinTech Futures", "Finextra", "EU-Startups"],
    },
    {
      slug: "ruut",
      seo: {
        title: "RUUT: İngiltere’de canlı bir dijital banka | fspark9",
        description: "Almanya ve Avusturya’daki Türkler için bir transfer uygulaması dijital bankaya dönüştü, şimdi İngiltere’de canlıda.",
      },
      name: "RUUT",
      subtitle: "Para transferi uygulamasından dijital bankaya, şimdi İngiltere’de canlıda.",
      market: "Almanya, Avusturya, İngiltere",
      tags: "Sıfırdan Canlıya, Açılım ve Pazara Çıkış",
      services: ["zero-to-live", "expansion-gtm"],
      problem: {
        label: "Nerede tıkanmışlardı",
        lead: "RUUT, Almanya ve Avusturya’daki Türkler için tek işlevli bir transfer uygulamasıydı.",
        body: "Yönetim önce Avrupa’daki diaspora, sonra İngiltere için tam bir dijital banka istiyordu. Bu da aynı anda yeni bir önerme, yeni ürünler, yeni partnerler, yeni bir regülasyon pozisyonu ve yeni bir pazar demekti.",
      },
      actions: {
        label: "Ne yaptık",
        items: [
          "Tek ürünlü uygulamayı dijital bankacılık önermesine çevirdik, hangi ürünün yerini hak ettiğine karar verdik.",
          "Markayı ve müşteri deneyimini her ekran ve her akışla yeniden kurduk ve yayına aldık.",
          "Yeni ürünlerin arkasındaki partnerleri seçip yönettik, ilişkileri teslimata kadar taşıdık.",
          "İngiltere girişini yürüttük. Tam lisans altta kurulurken markanın çalışmasını sağlayan partner ve regülasyon yapısı dahil.",
        ],
      },
      delivered: {
        label: "Ne oldu",
        lead: "Tüm AB vatandaşlarına ve AB’de yaşayanlara açık sınır ötesi ödemeleri olan bir dijital bankacılık markası.",
        body: "Ve bir milyona yakın Türk topluluğuna bireysel ve ticari hesap, kart ve para transferi sunan, İngiltere’de canlıda bir hizmet.",
      },
      proof: { value: "İngiltere", label: "bugün canlıda" },
      sources: ["FinTech Futures", "UKTN", "Tech.eu"],
    },
  ],
};
