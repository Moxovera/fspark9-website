import type { Locale, PageSeo } from "@/types/content";

// Copy §6c: yasal sayfaların ve bölümlerin başlık/açıklamaları.
// Sayfa gövdeleri Sanity'den ya da src/content/legal'dan geliyor, SEO
// çiftleri Sanity pass'e kadar burada. Bölüm anahtarı EN bölüm slug'ı,
// her iki dilde de aynı ("01-bo").
type LegalSlug = "impressum" | "privacy" | "cookies" | "terms";

export const legalSeo: Record<Locale, Record<LegalSlug, PageSeo>> = {
  en: {
    impressum: { title: "Imprint | fspark9", description: "Legal information about fspark9, Mehmet Burak Dikmen, Berlin." },
    privacy: { title: "Privacy | fspark9", description: "What happens to your data when you visit fspark9.com or book a call." },
    cookies: { title: "Cookies | fspark9", description: "Which cookies fspark9.com sets, and why." },
    terms: { title: "Terms of use | fspark9", description: "The terms for using fspark9.com." },
  },
  tr: {
    impressum: { title: "Künye | fspark9", description: "fspark9 ve Mehmet Burak Dikmen, Berlin hakkında yasal bilgiler." },
    privacy: { title: "Gizlilik | fspark9", description: "fspark9.com’u ziyaret ettiğinizde ya da görüşme ayarladığınızda verinize ne oluyor." },
    cookies: { title: "Çerezler | fspark9", description: "fspark9.com hangi çerezleri yerleştiriyor ve neden." },
    terms: { title: "Kullanım şartları | fspark9", description: "fspark9.com’un kullanım şartları." },
  },
};

export const episodeSeo: Record<Locale, Record<string, PageSeo>> = {
  en: {
    "01-bo": {
      title: "Bó: 156 days of NatWest’s digital bank | The Last Day",
      description:
        "A hundred million pounds and eighteen months to build. 11,413 customers when it closed. The record of Bó, from launch to its last day.",
    },
  },
  tr: {
    "01-bo": {
      title: "Bó: NatWest’in dijital bankasının 156 günü | Son Gün",
      description:
        "Yüz milyon sterlin ve on sekiz aylık bir inşa. Kapandığında 11.413 müşteri. Bó’nun lansmandan son gününe kaydı.",
    },
  },
};
