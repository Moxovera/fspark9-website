import type { Locale, PageSeo } from "@/types/content";

// Copy §6c: yasal sayfaların başlık/açıklamaları. Site bunları Sanity'den
// (legalPage.seo) okuyor; bu dosya seed-v3'ün kaynağı ve check:drift'in
// aynası. Spark bölümlerinin SEO'su hikâyeyle birlikte src/content/spark.ts'te.
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
