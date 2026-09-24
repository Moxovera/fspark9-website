import type { Locale, NextStepContent, ServiceSummary, SiteChrome } from "@/types/content";

/**
 * v2 site çerçevesinin metni. Kaynak: `_design/v2/fspark9-site-copy-v2.md`
 * §0 (menü, buton, footer) ve §1.3 (dört hizmet). Site bu metni Sanity'den okuyor; bu dosya seed-v3'ün kaynağı ve
 * check:drift'in karşılaştırdığı ayna.
 *
 * Copy dosyasında olmayan tek metinler ekran okuyucu etiketleri
 * (homeLabel, menuLabel, menuOpenLabel, menuCloseLabel): görünmüyorlar, board'daki
 * aria-label'lardan alındı, TR karşılıkları eklendi.
 */
export const chrome: Record<Locale, SiteChrome> = {
  en: {
    brandName: "fspark9",
    homeLabel: "fspark9 home",
    servicesLabel: "Services",
    nav: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Spark", href: "/spark" },
    ],
    servicesMenu: {
      label: "Four services",
      heading: "One ring. Four ways in.",
    },
    bookLabel: "Book a call",
    menuLabel: "Menu",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    footer: {
      email: "info@fspark9.com",
      linkedinHref: "https://linkedin.com/in/mdikmen",
      linkedinLabel: "linkedin.com/in/mdikmen",
      legalLinks: [{ label: "Imprint", href: "/impressum" }],
      copyright: "© 2026 fspark9",
    },
    booking: {
      title: "Book a call",
      meta: "Free · 30 minutes",
      closeLabel: "Close",
      poweredBy: "Scheduling by cal.com",
    },
    legal: {
      backLabel: "Home",
      tabsLabel: "Legal pages",
      tabs: [
        { label: "Imprint", href: "/impressum" },
        { label: "Privacy", href: "/privacy" },
        { label: "Cookies", href: "/cookies" },
        { label: "Terms of use", href: "/terms" },
      ],
    },
  },
  tr: {
    brandName: "fspark9",
    homeLabel: "fspark9 ana sayfa",
    servicesLabel: "Hizmetler",
    nav: [
      { label: "İşler", href: "/work" },
      { label: "Hakkımda", href: "/about" },
      { label: "Spark", href: "/spark" },
    ],
    servicesMenu: {
      label: "Dört hizmet",
      heading: "Tek halka. Dört kapı.",
    },
    bookLabel: "Görüşme ayarla",
    menuLabel: "Menü",
    menuOpenLabel: "Menüyü aç",
    menuCloseLabel: "Menüyü kapat",
    footer: {
      email: "info@fspark9.com",
      linkedinHref: "https://linkedin.com/in/mdikmen",
      linkedinLabel: "linkedin.com/in/mdikmen",
      legalLinks: [{ label: "Künye", href: "/impressum" }],
      copyright: "© 2026 fspark9",
    },
    booking: {
      title: "Görüşme ayarla",
      meta: "Ücretsiz · 30 dakika",
      closeLabel: "Kapat",
      poweredBy: "Takvim cal.com ile",
    },
    legal: {
      backLabel: "Ana sayfa",
      tabsLabel: "Yasal sayfalar",
      tabs: [
        { label: "Künye", href: "/impressum" },
        { label: "Gizlilik", href: "/privacy" },
        { label: "Çerezler", href: "/cookies" },
        { label: "Kullanım şartları", href: "/terms" },
      ],
    },
  },
};

/**
 * Dört hizmetin özeti: Services menüsü, ana sayfa Four services ve
 * /services. Dilimler copy dosyasındaki dilim haritasından (§ Slice map).
 * Sıra copy dosyasındaki sıra.
 */
export const services: Record<Locale, ServiceSummary[]> = {
  en: [
    {
      slug: "zero-to-live",
      name: "Zero to Live",
      shortLine: "A new fintech or bank, from the first decision to the day it goes live.",
      audience: "Fintechs, new banks",
      slices: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
      slug: "product-strategy",
      name: "Product & Strategy",
      shortLine: "The product and strategy calls that are stuck, made with a clear recommendation.",
      audience: "Banks, fintechs",
      slices: [1, 2, 4, 5, 6],
    },
    {
      slug: "embedded-finance",
      name: "Embedded Finance",
      shortLine: "A financial product that runs quietly inside your business.",
      audience: "Companies with customers",
      slices: [2, 4, 5, 6],
    },
    {
      slug: "expansion-gtm",
      name: "Expansion & GTM",
      shortLine: "A way into a new market, and your first customers there.",
      audience: "Fintechs, banks",
      slices: [3, 4, 7, 8],
    },
  ],
  tr: [
    {
      slug: "zero-to-live",
      name: "Sıfırdan Canlıya",
      shortLine: "Yeni bir fintech ya da banka, ilk karardan canlıya çıktığı güne kadar.",
      audience: "Fintechler, yeni bankalar",
      slices: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
      slug: "product-strategy",
      name: "Ürün ve Strateji",
      shortLine: "Tıkanan ürün ve strateji kararları, net bir öneriyle.",
      audience: "Bankalar, fintechler",
      slices: [1, 2, 4, 5, 6],
    },
    {
      slug: "embedded-finance",
      name: "Gömülü Finans",
      shortLine: "İşinizin içinde sessizce çalışan bir finansal ürün.",
      audience: "Müşterisi olan şirketler",
      slices: [2, 4, 5, 6],
    },
    {
      slug: "expansion-gtm",
      name: "Açılım ve Pazara Çıkış",
      shortLine: "Yeni bir pazara giriş yolu ve oradaki ilk müşterileriniz.",
      audience: "Fintechler, bankalar",
      slices: [3, 4, 7, 8],
    },
  ],
};

/**
 * Kapanış bloğu, her sayfada (yasal, thank-you ve 404 hariç). Copy §1.6.
 * Etiket ana sayfada numaralı ("05 · Next step"), diğer sayfalarda
 * numarasız: kullanıcı kararı, 24 Eylül 2026. TR'de Flare kesimi alan
 * kelime copy'de işaretli değil, EN'deki "live." karşılığı seçildi.
 */
export const nextStep: Record<Locale, NextStepContent> = {
  en: {
    label: "Next step",
    homeLabel: "05 · Next step",
    headlineLead: "Step nine is",
    headlineCut: "live.",
    steps: ["A free 30 minute call.", "A written proposal, with the price."],
    ctaLabel: "Book a call",
  },
  tr: {
    label: "Sonraki adım",
    homeLabel: "05 · Sonraki adım",
    headlineLead: "Dokuzuncu adım",
    headlineCut: "canlıya çıkış.",
    steps: ["30 dakikalık ücretsiz görüşme.", "Fiyatıyla birlikte yazılı teklif."],
    ctaLabel: "Görüşme ayarla",
  },
};
